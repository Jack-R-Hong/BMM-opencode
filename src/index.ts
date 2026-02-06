import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";
import { convert } from "bmad-opencode-converter";
import type { OpenCodeAgent, OpenCodeSkill } from "bmad-opencode-converter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const bundledAgentsDir = join(packageRoot, ".opencode", "agents");
const bundledSkillsDir = join(packageRoot, ".opencode", "skills");
const bmadSourceDir = join(packageRoot, "_bmad");

interface ConversionCache {
  agents: OpenCodeAgent[];
  skills: OpenCodeSkill[];
  timestamp: number;
}

let conversionCache: ConversionCache | null = null;
const CACHE_TTL_MS = 60000;

function hasBmadSource(): boolean {
  return existsSync(join(bmadSourceDir, "_config", "agent-manifest.csv"));
}

async function getConvertedResources(): Promise<{ agents: OpenCodeAgent[]; skills: OpenCodeSkill[] }> {
  if (conversionCache && Date.now() - conversionCache.timestamp < CACHE_TTL_MS) {
    return { agents: conversionCache.agents, skills: conversionCache.skills };
  }

  if (hasBmadSource()) {
    try {
      const result = await convert({
        sourceDir: bmadSourceDir,
        outputDir: "",
        verbose: false,
      });
      
      conversionCache = {
        agents: result.agents,
        skills: result.skills,
        timestamp: Date.now(),
      };
      
      return { agents: result.agents, skills: result.skills };
    } catch (err) {
      console.error("Failed to convert from BMAD source:", err);
    }
  }

  return readBundledFiles();
}

function readBundledFiles(): { agents: OpenCodeAgent[]; skills: OpenCodeSkill[] } {
  const agents: OpenCodeAgent[] = [];
  const skills: OpenCodeSkill[] = [];

  if (existsSync(bundledAgentsDir)) {
    for (const file of readdirSync(bundledAgentsDir)) {
      if (file.endsWith(".md")) {
        const content = readFileSync(join(bundledAgentsDir, file), "utf-8");
        const { frontmatter, body } = parseFrontmatter(content);
        agents.push({
          filename: file,
          frontmatter: {
            description: frontmatter.description || "",
            mode: frontmatter.mode as "subagent" | undefined,
            tools: frontmatter.tools,
          },
          prompt: body,
        });
      }
    }
  }

  if (existsSync(bundledSkillsDir)) {
    for (const dir of readdirSync(bundledSkillsDir)) {
      const skillPath = join(bundledSkillsDir, dir, "SKILL.md");
      if (existsSync(skillPath)) {
        const content = readFileSync(skillPath, "utf-8");
        const { frontmatter, body } = parseFrontmatter(content);
        skills.push({
          name: frontmatter.name || dir,
          folder: dir,
          frontmatter: {
            name: frontmatter.name || dir,
            description: frontmatter.description || "",
            license: frontmatter.license,
            compatibility: frontmatter.compatibility,
            metadata: frontmatter.metadata,
          },
          content: body,
        });
      }
    }
  }

  return { agents, skills };
}

function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatter: Record<string, any> = {};
  const fmLines = match[1].split("\n");
  let currentKey = "";
  let inObject = false;
  let objectContent: Record<string, any> = {};

  for (const line of fmLines) {
    if (line.match(/^\s*$/)) continue;
    
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyValueMatch) {
      if (inObject && currentKey) {
        frontmatter[currentKey] = objectContent;
        objectContent = {};
        inObject = false;
      }
      
      const [, key, value] = keyValueMatch;
      if (value === "" || value === undefined) {
        currentKey = key;
        inObject = true;
        objectContent = {};
      } else {
        const cleanValue = value.replace(/^["']|["']$/g, "");
        frontmatter[key] = cleanValue === "true" ? true : cleanValue === "false" ? false : cleanValue;
      }
    } else if (inObject) {
      const nestedMatch = line.match(/^\s+(\w+):\s*(.*)$/);
      if (nestedMatch) {
        const [, key, value] = nestedMatch;
        const cleanValue = value.replace(/^["']|["']$/g, "");
        objectContent[key] = cleanValue === "true" ? true : cleanValue === "false" ? false : cleanValue;
      }
    }
  }

  if (inObject && currentKey) {
    frontmatter[currentKey] = objectContent;
  }

  return { frontmatter, body: match[2] };
}

function writeAgentFile(targetDir: string, agent: OpenCodeAgent): void {
  const agentDir = join(targetDir, "agents");
  mkdirSync(agentDir, { recursive: true });

  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(agent.frontmatter.description)}`);
  if (agent.frontmatter.mode) frontmatterLines.push(`mode: ${agent.frontmatter.mode}`);
  if (agent.frontmatter.tools) {
    frontmatterLines.push("tools:");
    for (const [toolName, enabled] of Object.entries(agent.frontmatter.tools)) {
      if (enabled !== undefined) frontmatterLines.push(`  ${toolName}: ${enabled}`);
    }
  }
  frontmatterLines.push("---");

  const content = frontmatterLines.join("\n") + "\n\n" + agent.prompt;
  writeFileSync(join(agentDir, agent.filename), content);
}

function writeSkillFile(targetDir: string, skill: OpenCodeSkill): void {
  const skillDir = join(targetDir, "skills", skill.folder);
  mkdirSync(skillDir, { recursive: true });

  const frontmatterLines = ["---"];
  frontmatterLines.push(`name: ${skill.frontmatter.name}`);
  frontmatterLines.push(`description: ${JSON.stringify(skill.frontmatter.description)}`);
  if (skill.frontmatter.license) frontmatterLines.push(`license: ${skill.frontmatter.license}`);
  if (skill.frontmatter.compatibility) frontmatterLines.push(`compatibility: ${skill.frontmatter.compatibility}`);
  if (skill.frontmatter.metadata) {
    frontmatterLines.push("metadata:");
    for (const [key, value] of Object.entries(skill.frontmatter.metadata)) {
      frontmatterLines.push(`  ${key}: ${JSON.stringify(value)}`);
    }
  }
  frontmatterLines.push("---");

  const content = frontmatterLines.join("\n") + "\n\n" + skill.content;
  writeFileSync(join(skillDir, "SKILL.md"), content);
}

function formatAgentContent(agent: OpenCodeAgent): string {
  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(agent.frontmatter.description)}`);
  if (agent.frontmatter.mode) frontmatterLines.push(`mode: ${agent.frontmatter.mode}`);
  if (agent.frontmatter.tools) {
    frontmatterLines.push("tools:");
    for (const [toolName, enabled] of Object.entries(agent.frontmatter.tools)) {
      if (enabled !== undefined) frontmatterLines.push(`  ${toolName}: ${enabled}`);
    }
  }
  frontmatterLines.push("---");
  return frontmatterLines.join("\n") + "\n\n" + agent.prompt;
}

function formatSkillContent(skill: OpenCodeSkill): string {
  const frontmatterLines = ["---"];
  frontmatterLines.push(`name: ${skill.frontmatter.name}`);
  frontmatterLines.push(`description: ${JSON.stringify(skill.frontmatter.description)}`);
  if (skill.frontmatter.license) frontmatterLines.push(`license: ${skill.frontmatter.license}`);
  if (skill.frontmatter.compatibility) frontmatterLines.push(`compatibility: ${skill.frontmatter.compatibility}`);
  if (skill.frontmatter.metadata) {
    frontmatterLines.push("metadata:");
    for (const [key, value] of Object.entries(skill.frontmatter.metadata)) {
      frontmatterLines.push(`  ${key}: ${JSON.stringify(value)}`);
    }
  }
  frontmatterLines.push("---");
  return frontmatterLines.join("\n") + "\n\n" + skill.content;
}

export const BMMPlugin: Plugin = async () => {
  return {
    tool: {
      bmm_list: tool({
        description:
          "List all available BMAD-METHOD agents and skills from bmm-opencode",
        args: {},
        async execute() {
          const { agents, skills } = await getConvertedResources();
          const source = hasBmadSource() ? "BMAD source (_bmad/)" : "bundled files (.opencode/)";
          
          return `# BMM-OpenCode Resources
Source: ${source}

## Agents (${agents.length})
${agents.map((a) => `- ${a.filename.replace(".md", "")}: ${a.frontmatter.description}`).join("\n")}

## Skills (${skills.length})
${skills.map((s) => `- ${s.name}: ${s.frontmatter.description}`).join("\n")}

## Usage
- Use \`bmm_agent\` tool to get agent definition
- Use \`bmm_skill\` tool to get skill instructions
- Use \`bmm_install\` with \`global=true\` to install globally (~/.config/opencode/)
- Use \`bmm_install\` to install to current project (.opencode/)`;
        },
      }),

      bmm_agent: tool({
        description: "Get a BMAD-METHOD agent definition by name",
        args: {
          name: tool.schema.string().describe("Agent name (e.g., bmm-dev, bmm-pm)"),
        },
        async execute(args) {
          const { agents } = await getConvertedResources();
          const agent = agents.find(
            (a) => a.filename === `${args.name}.md` || 
                   a.filename.replace(".md", "") === args.name
          );
          
          if (!agent) {
            const available = agents.map((a) => a.filename.replace(".md", "")).join(", ");
            return `Agent "${args.name}" not found.\n\nAvailable agents: ${available}`;
          }

          return formatAgentContent(agent);
        },
      }),

      bmm_skill: tool({
        description: "Get a BMAD-METHOD skill instructions by name",
        args: {
          name: tool.schema.string().describe("Skill name (e.g., bmad-bmm-create-prd)"),
        },
        async execute(args) {
          const { skills } = await getConvertedResources();
          const skill = skills.find(
            (s) => s.name === args.name || s.folder === args.name
          );
          
          if (!skill) {
            const available = skills.map((s) => s.name).join(", ");
            return `Skill "${args.name}" not found.\n\nAvailable skills: ${available}`;
          }

          return formatSkillContent(skill);
        },
      }),

      bmm_install: tool({
        description:
          "Install BMM agents and skills. Use global=true for ~/.config/opencode/ (all projects), or omit for current project's .opencode/",
        args: {
          target: tool.schema
            .string()
            .optional()
            .describe("Target directory (defaults to current project's .opencode/)"),
          global: tool.schema
            .boolean()
            .optional()
            .describe("Install to global ~/.config/opencode/ instead of project"),
          force: tool.schema
            .boolean()
            .optional()
            .describe("Overwrite existing files without warning (default: false)"),
        },
        async execute(args, context) {
          const globalConfigDir = join(homedir(), ".config", "opencode");
          const targetBase = args.global
            ? globalConfigDir
            : args.target || join(context.directory, ".opencode");

          try {
            const targetAgents = join(targetBase, "agents");
            const targetSkills = join(targetBase, "skills");

            const agentsExist = existsSync(targetAgents) && readdirSync(targetAgents).length > 0;
            const skillsExist = existsSync(targetSkills) && readdirSync(targetSkills).length > 0;

            if ((agentsExist || skillsExist) && !args.force) {
              const existing = [];
              if (agentsExist) existing.push(`agents (${readdirSync(targetAgents).length} files)`);
              if (skillsExist) existing.push(`skills (${readdirSync(targetSkills).length} dirs)`);
              return `Existing installation detected at ${targetBase}:
- ${existing.join("\n- ")}

Use \`force=true\` to overwrite, or remove existing files first.`;
            }

            const { agents, skills } = await getConvertedResources();

            let agentsCopied = 0;
            for (const agent of agents) {
              writeAgentFile(targetBase, agent);
              agentsCopied++;
            }

            let skillsCopied = 0;
            for (const skill of skills) {
              writeSkillFile(targetBase, skill);
              skillsCopied++;
            }

            const installType = args.global ? "globally" : "to project";
            const source = hasBmadSource() ? "converted from BMAD source" : "from bundled files";
            
            return `Successfully installed BMM-OpenCode ${installType} (${targetBase}):
- ${agentsCopied} agents copied to ${targetAgents}
- ${skillsCopied} skills copied to ${targetSkills}

Source: ${source}

Restart OpenCode to use the new agents and skills.`;
          } catch (error) {
            return `Installation failed: ${error instanceof Error ? error.message : String(error)}`;
          }
        },
      }),
    },
  };
};

export default BMMPlugin;

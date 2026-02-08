import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

interface OpenCodeAgent {
  filename: string;
  frontmatter: {
    description: string;
    mode?: "subagent";
    model?: string;
    tools?: Record<string, boolean | undefined>;
    workflows?: string[];
  };
  prompt: string;
}

interface BMMWorkflow {
  name: string;
  description: string;
  path: string;
  author?: string;
}

interface AgentWorkflowMapping {
  agent: string;
  workflows: string[];
  description: string;
}

interface OpenCodeSkill {
  name: string;
  folder: string;
  frontmatter: {
    name: string;
    description: string;
    license?: string;
    compatibility?: string;
    metadata?: Record<string, any>;
  };
  content: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const bundledAgentsDir = join(packageRoot, ".opencode", "agents");
const bundledSkillsDir = join(packageRoot, ".opencode", "skills");
const bundledWorkflowsDir = join(packageRoot, "_bmad", "bmm", "workflows");

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
            model: frontmatter.model || undefined,
            tools: frontmatter.tools,
            workflows: frontmatter.workflows || extractWorkflowsFromBody(body),
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

function extractWorkflowsFromBody(body: string): string[] {
  const workflows: string[] = [];
  const lines = body.split('\n');
  let inWorkflowSection = false;
  
  for (const line of lines) {
    if (line.includes('You have access to the following workflows')) {
      inWorkflowSection = true;
      continue;
    }
    if (inWorkflowSection) {
      const match = line.match(/^-\s+([\w-]+)/);
      if (match) {
        workflows.push(match[1]);
      } else if (line.trim() && !line.startsWith('-')) {
        break;
      }
    }
  }
  
  return workflows;
}

function readWorkflows(workflowsDir?: string): BMMWorkflow[] {
  const workflows: BMMWorkflow[] = [];
  const searchDir = workflowsDir || bundledWorkflowsDir;
  
  if (!existsSync(searchDir)) {
    return workflows;
  }
  
  function scanDirectory(dir: string) {
    for (const item of readdirSync(dir)) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item === 'workflow.yaml') {
        try {
          const content = readFileSync(fullPath, 'utf-8');
          const lines = content.split('\n');
          let name = '';
          let description = '';
          let author = '';
          
          for (const line of lines) {
            const nameMatch = line.match(/^name:\s*["']?([^"'\n]+)["']?/);
            const descMatch = line.match(/^description:\s*["']?([^"'\n]+)["']?/);
            const authorMatch = line.match(/^author:\s*["']?([^"'\n]+)["']?/);
            
            if (nameMatch) name = nameMatch[1];
            if (descMatch) description = descMatch[1];
            if (authorMatch) author = authorMatch[1];
          }
          
          if (name) {
            workflows.push({
              name,
              description,
              path: fullPath,
              author,
            });
          }
        } catch (error) {
          // Skip invalid YAML files
        }
      }
    }
  }
  
  scanDirectory(searchDir);
  return workflows;
}

function getAgentWorkflowMappings(): AgentWorkflowMapping[] {
  const { agents } = readBundledFiles();
  const workflows = readWorkflows();
  
  return agents.map(agent => {
    const agentName = agent.filename.replace('.md', '');
    const agentWorkflows = agent.frontmatter.workflows || [];
    
    const workflowDetails = agentWorkflows
      .map(workflowName => {
        const workflow = workflows.find(w => 
          w.name === workflowName || 
          w.name.endsWith(workflowName) ||
          workflowName.includes(w.name)
        );
        return workflow ? `${workflowName}${workflow.description ? ` - ${workflow.description}` : ''}` : workflowName;
      });
    
    return {
      agent: agentName,
      workflows: agentWorkflows,
      description: agent.frontmatter.description
    };
  }).filter(mapping => mapping.workflows.length > 0);
}

function writeAgentFile(targetDir: string, agent: OpenCodeAgent): void {
  const agentDir = join(targetDir, "agents");
  mkdirSync(agentDir, { recursive: true });

  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(agent.frontmatter.description)}`);
  if (agent.frontmatter.mode) frontmatterLines.push(`mode: ${agent.frontmatter.mode}`);
  if (agent.frontmatter.model) frontmatterLines.push(`model: ${JSON.stringify(agent.frontmatter.model)}`);
  if (agent.frontmatter.tools) {
    frontmatterLines.push("tools:");
    for (const [toolName, enabled] of Object.entries(agent.frontmatter.tools)) {
      if (enabled !== undefined) frontmatterLines.push(`  ${toolName}: ${enabled}`);
    }
  }
  frontmatterLines.push("---");

  let promptContent = agent.prompt;
  
  if (agent.frontmatter.workflows && agent.frontmatter.workflows.length > 0) {
    const workflows = readWorkflows();
    const workflowSection = buildWorkflowSection(agent.frontmatter.workflows, workflows);
    
    if (!promptContent.includes("You have access to the following workflows")) {
      promptContent = promptContent.trim() + "\n\n" + workflowSection;
    }
  }

  const content = frontmatterLines.join("\n") + "\n\n" + promptContent;
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

function formatAgentContent(agent: OpenCodeAgent, injectWorkflows: boolean = true): string {
  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(agent.frontmatter.description)}`);
  if (agent.frontmatter.mode) frontmatterLines.push(`mode: ${agent.frontmatter.mode}`);
  if (agent.frontmatter.model) frontmatterLines.push(`model: ${JSON.stringify(agent.frontmatter.model)}`);
  if (agent.frontmatter.tools) {
    frontmatterLines.push("tools:");
    for (const [toolName, enabled] of Object.entries(agent.frontmatter.tools)) {
      if (enabled !== undefined) frontmatterLines.push(`  ${toolName}: ${enabled}`);
    }
  }
  if (agent.frontmatter.workflows && agent.frontmatter.workflows.length > 0) {
    frontmatterLines.push("workflows:");
    for (const workflow of agent.frontmatter.workflows) {
      frontmatterLines.push(`  - ${workflow}`);
    }
  }
  frontmatterLines.push("---");
  
  let promptContent = agent.prompt;
  
  if (injectWorkflows && agent.frontmatter.workflows && agent.frontmatter.workflows.length > 0) {
    const workflows = readWorkflows();
    const workflowSection = buildWorkflowSection(agent.frontmatter.workflows, workflows);
    
    if (!promptContent.includes("You have access to the following workflows")) {
      promptContent = promptContent.trim() + "\n\n" + workflowSection;
    }
  }
  
  return frontmatterLines.join("\n") + "\n\n" + promptContent;
}

function buildWorkflowSection(agentWorkflows: string[], allWorkflows: BMMWorkflow[]): string {
  const lines = ["You have access to the following workflows and tasks:"];
  
  for (const workflowName of agentWorkflows) {
    const workflow = allWorkflows.find(w => 
      w.name === workflowName || 
      w.name.endsWith(workflowName) ||
      workflowName.includes(w.name)
    );
    
    if (workflow && workflow.description) {
      lines.push(`- **${workflowName}**: ${workflow.description}`);
    } else {
      lines.push(`- ${workflowName}`);
    }
  }
  
  return lines.join("\n");
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
          const { agents, skills } = readBundledFiles();
          
          return `# BMM-OpenCode Resources

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
          const { agents } = readBundledFiles();
          const agent = agents.find(
            (a) => a.filename === `${args.name}.md` || 
                   a.filename.replace(".md", "") === args.name
          );
          
          if (!agent) {
            const available = agents.map((a) => a.filename.replace(".md", "")).join(", ");
            return `Agent "${args.name}" not found.\n\nAvailable agents: ${available}`;
          }

          let output = formatAgentContent(agent);
          
          if (agent.frontmatter.workflows && agent.frontmatter.workflows.length > 0) {
            const workflows = readWorkflows();
            output += `\n\n## Available Workflows\n\n`;
            output += `This agent has access to ${agent.frontmatter.workflows.length} workflow(s):\n\n`;
            
            for (const workflowName of agent.frontmatter.workflows) {
              const workflow = workflows.find(w => 
                w.name === workflowName || 
                w.name.endsWith(workflowName) ||
                workflowName.includes(w.name)
              );
              
              if (workflow) {
                output += `- **${workflowName}**: ${workflow.description}\n`;
              } else {
                output += `- ${workflowName}\n`;
              }
            }

            output += `\n**Tip**: Use \`bmm_suggest_workflows({ agent: "${args.name}" })\` for detailed workflow information.\n`;
          }

          return output;
        },
      }),

      bmm_skill: tool({
        description: "Get a BMAD-METHOD skill instructions by name",
        args: {
          name: tool.schema.string().describe("Skill name (e.g., bmad-bmm-create-prd)"),
        },
        async execute(args) {
          const { skills } = readBundledFiles();
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
          const localConfigDir = args.target || join(context.directory, ".opencode");

          let targetBase: string;
          let autoDetected = false;

          if (args.global) {
            targetBase = globalConfigDir;
          } else if (args.target) {
            targetBase = args.target;
          } else {
            const globalAgentsDir = join(globalConfigDir, "agents");
            const localAgentsDir = join(localConfigDir, "agents");

            const hasBmmAgent = (dir: string): boolean => {
              if (!existsSync(dir)) return false;
              const files = readdirSync(dir);
              return files.some((f) => f.startsWith("bmm-") || f.startsWith("cis-") || f.startsWith("core-") || f.startsWith("tea-") || f === "party-mode.md" || f === "gen-subagent.md");
            };

            const globalHasBmm = hasBmmAgent(globalAgentsDir);
            const localHasBmm = hasBmmAgent(localAgentsDir);

            if (globalHasBmm && !localHasBmm) {
              targetBase = globalConfigDir;
              autoDetected = true;
            } else if (globalHasBmm && localHasBmm) {
              return `BMM agents found in BOTH locations:
- Global: ${globalConfigDir}
- Local: ${localConfigDir}

Please specify which to update:
- \`bmm_install({ global: true, force: true })\` for global
- \`bmm_install({ force: true })\` will default to local

To avoid confusion, consider removing one installation.`;
            } else {
              targetBase = localConfigDir;
            }
          }

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

            const { agents, skills } = readBundledFiles();

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

            const isGlobal = targetBase === globalConfigDir;
            const installType = isGlobal ? "globally" : "to project";
            const source = "from bundled files";
            const autoNote = autoDetected ? `\n\nNote: Auto-detected existing global installation at ${globalConfigDir}` : "";
            
            return `Successfully installed BMM-OpenCode ${installType} (${targetBase}):
- ${agentsCopied} agents copied to ${targetAgents}
- ${skillsCopied} skills copied to ${targetSkills}

Source: ${source}${autoNote}

Restart OpenCode to use the new agents and skills.`;
          } catch (error) {
            return `Installation failed: ${error instanceof Error ? error.message : String(error)}`;
          }
        },
      }),

      bmm_agent_workflows: tool({
        description: "List all BMM agents with their available workflows for @agent autocomplete suggestions",
        args: {},
        async execute() {
          const mappings = getAgentWorkflowMappings();
          
          if (mappings.length === 0) {
            return "No agent-workflow mappings found. Make sure BMM agents are properly configured.";
          }

          let output = "# BMM Agent Workflow Mappings\n\n";
          output += "Use this information to suggest workflows when users @mention an agent.\n\n";
          
          for (const mapping of mappings) {
            output += `## @${mapping.agent}\n`;
            output += `**Role**: ${mapping.description}\n\n`;
            output += `**Available Workflows**:\n`;
            for (const workflow of mapping.workflows) {
              output += `- ${workflow}\n`;
            }
            output += '\n';
          }

          return output;
        },
      }),

      bmm_suggest_workflows: tool({
        description: "Get workflow suggestions for a specific BMM agent (useful for @agent autocomplete)",
        args: {
          agent: tool.schema.string().describe("Agent name (e.g., bmm-dev, bmm-pm, bmm-qa)"),
        },
        async execute(args) {
          const mappings = getAgentWorkflowMappings();
          const agentName = args.agent.replace(/^@/, '').replace(/\.md$/, '');
          
          const mapping = mappings.find(m => 
            m.agent === agentName || 
            m.agent === `bmm-${agentName}` ||
            m.agent === `bmad-${agentName}`
          );

          if (!mapping) {
            const available = mappings.map(m => m.agent).join(", ");
            return `Agent "${args.agent}" not found or has no workflows configured.\n\nAvailable agents with workflows: ${available}`;
          }

          let output = `# Workflows for @${mapping.agent}\n\n`;
          output += `**Role**: ${mapping.description}\n\n`;
          output += `**Available Workflows** (${mapping.workflows.length}):\n`;
          
          const workflows = readWorkflows();
          for (const workflowName of mapping.workflows) {
            const workflow = workflows.find(w => 
              w.name === workflowName || 
              w.name.endsWith(workflowName) ||
              workflowName.includes(w.name)
            );
            
            if (workflow) {
              output += `- **${workflowName}**: ${workflow.description}\n`;
            } else {
              output += `- ${workflowName}\n`;
            }
          }

          output += `\n## Usage\n`;
          output += `\`\`\`\n@${mapping.agent} [use workflow: ${mapping.workflows[0] || 'workflow-name'}]\n\`\`\`\n`;

          return output;
        },
      }),
    },
  };
};

export default BMMPlugin;

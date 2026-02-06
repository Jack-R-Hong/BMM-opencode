import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";
import { readFileSync, readdirSync, existsSync, cpSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const agentsDir = join(packageRoot, ".opencode", "agents");
const skillsDir = join(packageRoot, ".opencode", "skills");

function listAgents(): string[] {
  try {
    return readdirSync(agentsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));
  } catch {
    return [];
  }
}

function listSkills(): string[] {
  try {
    return readdirSync(skillsDir).filter((d) =>
      existsSync(join(skillsDir, d, "SKILL.md"))
    );
  } catch {
    return [];
  }
}

function loadAgent(name: string): string {
  try {
    return readFileSync(join(agentsDir, `${name}.md`), "utf-8");
  } catch {
    return `Agent "${name}" not found`;
  }
}

function loadSkill(name: string): string {
  try {
    return readFileSync(join(skillsDir, name, "SKILL.md"), "utf-8");
  } catch {
    return `Skill "${name}" not found`;
  }
}

export const BMMPlugin: Plugin = async () => {
  const agents = listAgents();
  const skills = listSkills();

  return {
    tool: {
      bmm_list: tool({
        description:
          "List all available BMAD-METHOD agents and skills from bmm-opencode",
        args: {},
        async execute() {
          return `# BMM-OpenCode Resources

## Agents (${agents.length})
${agents.map((a) => `- ${a}`).join("\n")}

## Skills (${skills.length})
${skills.map((s) => `- ${s}`).join("\n")}

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
          name: tool.schema.string().describe(`Agent name`),
        },
        async execute(args) {
          return loadAgent(args.name);
        },
      }),

      bmm_skill: tool({
        description: "Get a BMAD-METHOD skill instructions by name",
        args: {
          name: tool.schema.string().describe(`Skill name`),
        },
        async execute(args) {
          return loadSkill(args.name);
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

            mkdirSync(targetAgents, { recursive: true });
            mkdirSync(targetSkills, { recursive: true });

            let agentsCopied = 0;
            for (const agent of agents) {
              const src = join(agentsDir, `${agent}.md`);
              const dest = join(targetAgents, `${agent}.md`);
              cpSync(src, dest);
              agentsCopied++;
            }

            let skillsCopied = 0;
            for (const skill of skills) {
              const src = join(skillsDir, skill);
              const dest = join(targetSkills, skill);
              cpSync(src, dest, { recursive: true });
              skillsCopied++;
            }

            const installType = args.global ? "globally" : "to project";
            return `Successfully installed BMM-OpenCode ${installType} (${targetBase}):
- ${agentsCopied} agents copied to ${targetAgents}
- ${skillsCopied} skills copied to ${targetSkills}

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

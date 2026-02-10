import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin/tool";
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, statSync, unlinkSync, rmdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

interface OpenCodeAgent {
  filename: string;
  frontmatter: {
    description: string;
    mode?: "subagent" | "primary" | "all";
    model?: string;
    temperature?: number;
    top_p?: number;
    color?: string;
    hidden?: boolean;
    tools?: Record<string, boolean | undefined>;
    permission?: Record<string, any>;
    workflows?: string[];
    permittedSkills?: string[];
  };
  prompt: string;
  promptRef?: string;
}

interface CommandMapping {
  commandName: string;
  skillName: string;
  agentName: string;
  description: string;
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
const bundledAgentsJson = join(packageRoot, ".opencode", "agents.json");
const bundledAgentsDir = join(packageRoot, ".opencode", "agents");
const bundledSkillsDir = join(packageRoot, ".opencode", "skills");
const bundledWorkflowsDir = join(packageRoot, "_bmad", "bmm", "workflows");

interface BMMManifest {
  version: string;
  installedFiles: string[];
}

const MANIFEST_FILENAME = "bmm-opencode.json";

const KNOWN_MODELS: { id: string; provider: string; description: string }[] = [
  // Anthropic
  { id: "anthropic/claude-opus-4-6", provider: "Anthropic", description: "Most capable, complex reasoning & coding" },
  { id: "anthropic/claude-sonnet-4-5", provider: "Anthropic", description: "Balanced performance & speed" },
  { id: "anthropic/claude-haiku-4-5", provider: "Anthropic", description: "Fast & cost-effective" },
  // OpenAI
  { id: "openai/o3", provider: "OpenAI", description: "Advanced reasoning model" },
  { id: "openai/o4-mini", provider: "OpenAI", description: "Fast reasoning model" },
  { id: "openai/gpt-5.2-codex", provider: "OpenAI", description: "Coding-optimized GPT" },
  { id: "openai/gpt-4.1", provider: "OpenAI", description: "General-purpose GPT" },
  { id: "openai/gpt-4.1-mini", provider: "OpenAI", description: "Compact GPT" },
  // Google
  { id: "google/gemini-2.5-pro", provider: "Google", description: "Advanced multimodal model" },
  { id: "google/gemini-2.5-flash", provider: "Google", description: "Fast multimodal model" },
  // xAI
  { id: "xai/grok-4", provider: "xAI", description: "Grok flagship model" },
  { id: "xai/grok-3-mini", provider: "xAI", description: "Compact Grok model" },
];

function getPackageVersion(): string {
  try {
    const pkgPath = join(packageRoot, "package.json");
    if (existsSync(pkgPath)) {
      return JSON.parse(readFileSync(pkgPath, "utf-8")).version || "0.0.0";
    }
  } catch { /* fallback */ }
  return "0.0.0";
}

function readManifest(targetDir: string): BMMManifest | null {
  try {
    const p = join(targetDir, MANIFEST_FILENAME);
    if (existsSync(p)) return JSON.parse(readFileSync(p, "utf-8"));
  } catch { /* fallback */ }
  return null;
}

function writeManifest(targetDir: string, manifest: BMMManifest): void {
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, MANIFEST_FILENAME), JSON.stringify(manifest, null, 2));
}

function removeManifestFiles(targetDir: string): number {
  const manifest = readManifest(targetDir);
  if (!manifest) return 0;

  let removed = 0;
  for (const rel of manifest.installedFiles) {
    const full = join(targetDir, rel);
    try {
      if (existsSync(full)) { unlinkSync(full); removed++; }
      const parent = dirname(full);
      if (existsSync(parent) && readdirSync(parent).length === 0) rmdirSync(parent);
    } catch { /* skip */ }
  }
  for (const subdir of ["skills", "agents", "commands"]) {
    try {
      const dir = join(targetDir, subdir);
      if (existsSync(dir) && readdirSync(dir).length === 0) rmdirSync(dir);
    } catch { /* not empty */ }
  }
  try { unlinkSync(join(targetDir, MANIFEST_FILENAME)); } catch { /* skip */ }
  return removed;
}

function resolveSkillTarget(directory: string): string {
  const globalDir = join(homedir(), ".config", "opencode");
  const localDir = join(directory, ".opencode");
  if (readManifest(globalDir)) return globalDir;
  if (readManifest(localDir)) return localDir;
  return globalDir;
}

function autoInstallSkills(targetDir: string): { installed: boolean; skills: number } {
  const ver = getPackageVersion();
  const existing = readManifest(targetDir);
  if (existing && existing.version === ver) return { installed: false, skills: 0 };
  if (existing) removeManifestFiles(targetDir);

  const { skills } = readBundledFiles();
  const installedFiles: string[] = [];
  for (const skill of skills) {
    installedFiles.push(writeSkillFileTracked(targetDir, skill));
  }
  writeManifest(targetDir, { version: ver, installedFiles });
  return { installed: true, skills: skills.length };
}

function writeSkillFileTracked(targetDir: string, skill: OpenCodeSkill): string {
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
  const relPath = join("skills", skill.folder, "SKILL.md");
  writeFileSync(join(targetDir, relPath), content);
  return relPath;
}

function buildAgentPrompt(agent: OpenCodeAgent): string {
  let promptContent = agent.prompt;
  if (agent.frontmatter.workflows && agent.frontmatter.workflows.length > 0) {
    const workflows = readWorkflows();
    const workflowSection = buildWorkflowSection(agent.frontmatter.workflows, workflows);
    if (!promptContent.includes("You have access to the following workflows")) {
      promptContent = promptContent.trim() + "\n\n" + workflowSection;
    }
  }
  return promptContent;
}

function resolveAgentPrompt(def: Record<string, any>, name: string): { prompt: string; promptRef?: string } {
  const raw = def.prompt || "";
  const fileMatch = raw.match(/^\{file:(.+)\}$/);
  if (fileMatch) {
    const relPath = fileMatch[1];
    const absPath = join(packageRoot, relPath);
    if (existsSync(absPath)) {
      const content = readFileSync(absPath, "utf-8");
      const { body } = parseFrontmatter(content);
      return { prompt: body, promptRef: raw };
    }
  }
  return { prompt: raw };
}

function readAgentsFromJson(): OpenCodeAgent[] {
  if (!existsSync(bundledAgentsJson)) return [];

  try {
    const data = JSON.parse(readFileSync(bundledAgentsJson, "utf-8")) as Record<string, any>;
    return Object.entries(data).map(([name, def]) => {
      const { prompt, promptRef } = resolveAgentPrompt(def, name);
      return {
        filename: `${name}.md`,
        frontmatter: {
          description: def.description || "",
          mode: def.mode as OpenCodeAgent["frontmatter"]["mode"],
          model: def.model || undefined,
          temperature: def.temperature,
          top_p: def.top_p,
          color: def.color,
          hidden: def.hidden,
          tools: def.tools,
          permission: def.permission,
          workflows: def.workflows || [],
          permittedSkills: def.permittedSkills || [],
        },
        prompt,
        promptRef,
      };
    });
  } catch {
    return [];
  }
}

function readAgentsFromMarkdown(): OpenCodeAgent[] {
  const agents: OpenCodeAgent[] = [];
  if (!existsSync(bundledAgentsDir)) return agents;

  for (const file of readdirSync(bundledAgentsDir)) {
    if (!file.endsWith(".md")) continue;
    const content = readFileSync(join(bundledAgentsDir, file), "utf-8");
    const { frontmatter, body } = parseFrontmatter(content);
    agents.push({
      filename: file,
      frontmatter: {
        description: frontmatter.description || "",
        mode: frontmatter.mode as OpenCodeAgent["frontmatter"]["mode"],
        model: frontmatter.model || undefined,
        temperature: frontmatter.temperature ? parseFloat(frontmatter.temperature) : undefined,
        top_p: frontmatter.top_p ? parseFloat(frontmatter.top_p) : undefined,
        color: frontmatter.color,
        hidden: frontmatter.hidden,
        tools: frontmatter.tools,
        permission: frontmatter.permission,
        workflows: frontmatter.workflows || extractWorkflowsFromBody(body),
        permittedSkills: extractPermittedSkills(content),
      },
      prompt: body,
    });
  }
  return agents;
}

function readBundledFiles(): { agents: OpenCodeAgent[]; skills: OpenCodeSkill[] } {
  const agents = readAgentsFromJson();
  const fallbackAgents = agents.length > 0 ? agents : readAgentsFromMarkdown();
  const skills: OpenCodeSkill[] = [];

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

  return { agents: fallbackAgents, skills };
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

function extractPermittedSkills(content: string): string[] {
  const skills: string[] = [];
  const lines = content.split('\n');
  let inPermission = false;
  let inSkill = false;
  
  for (const line of lines) {
    if (line === '---' && skills.length > 0) break;
    
    if (line.match(/^permission:\s*$/)) {
      inPermission = true;
      continue;
    }
    if (inPermission && line.match(/^\s+skill:\s*$/)) {
      inSkill = true;
      continue;
    }
    if (inSkill) {
      const skillMatch = line.match(/^\s+"([^"]+)":\s*allow/);
      if (skillMatch) {
        skills.push(skillMatch[1]);
      } else if (line.match(/^\s+\w+:/) && !line.match(/^\s+"/)) {
        inSkill = false;
        inPermission = false;
      } else if (line.match(/^\w/)) {
        inSkill = false;
        inPermission = false;
      }
    }
  }
  
  return skills;
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

function writeAgentFile(targetDir: string, agent: OpenCodeAgent): string {
  const agentDir = join(targetDir, "agents");
  mkdirSync(agentDir, { recursive: true });

  const fm = agent.frontmatter;
  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(fm.description)}`);
  if (fm.mode) frontmatterLines.push(`mode: ${fm.mode}`);
  if (fm.model) frontmatterLines.push(`model: ${JSON.stringify(fm.model)}`);
  if (fm.temperature !== undefined) frontmatterLines.push(`temperature: ${fm.temperature}`);
  if (fm.top_p !== undefined) frontmatterLines.push(`top_p: ${fm.top_p}`);
  if (fm.color) frontmatterLines.push(`color: ${JSON.stringify(fm.color)}`);
  if (fm.hidden !== undefined) frontmatterLines.push(`hidden: ${fm.hidden}`);
  if (fm.tools) {
    frontmatterLines.push("tools:");
    for (const [toolName, enabled] of Object.entries(fm.tools)) {
      if (enabled !== undefined) frontmatterLines.push(`  ${toolName}: ${enabled}`);
    }
  }
  if (fm.permission) {
    frontmatterLines.push("permission:");
    for (const [key, val] of Object.entries(fm.permission)) {
      if (typeof val === "string") {
        frontmatterLines.push(`  ${key}: ${val}`);
      } else if (typeof val === "object" && val !== null) {
        frontmatterLines.push(`  ${key}:`);
        for (const [k, v] of Object.entries(val as Record<string, string>)) {
          frontmatterLines.push(`    "${k}": ${v}`);
        }
      }
    }
  }
  frontmatterLines.push("---");

  let promptContent = agent.prompt;

  if (fm.workflows && fm.workflows.length > 0) {
    const workflows = readWorkflows();
    const workflowSection = buildWorkflowSection(fm.workflows, workflows);

    if (!promptContent.includes("You have access to the following workflows")) {
      promptContent = promptContent.trim() + "\n\n" + workflowSection;
    }
  }

  const content = frontmatterLines.join("\n") + "\n\n" + promptContent;
  writeFileSync(join(agentDir, agent.filename), content);
  return join("agents", agent.filename);
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

function updateModelInAgentsJson(jsonPath: string, agentName: string, newModel: string): void {
  if (!existsSync(jsonPath)) return;
  try {
    const data = JSON.parse(readFileSync(jsonPath, "utf-8"));
    if (data[agentName]) {
      data[agentName].model = newModel;
      writeFileSync(jsonPath, JSON.stringify(data, null, 2) + "\n");
    }
  } catch { /* skip */ }
}

function updateModelInFrontmatter(content: string, newModel: string): string {
  const match = content.match(/^(---\s*\n)([\s\S]*?)(\n---\s*\n)([\s\S]*)$/);
  if (!match) return content;

  const [, open, fm, close, body] = match;
  const lines = fm.split("\n");
  let replaced = false;

  const updatedLines = lines.map((line) => {
    if (line.match(/^model:\s/)) {
      replaced = true;
      return `model: ${newModel}`;
    }
    return line;
  });

  if (!replaced) {
    // Insert model after description line, or as first line
    const descIdx = updatedLines.findIndex((l) => l.match(/^description:\s/));
    const insertAt = descIdx >= 0 ? descIdx + 1 : 0;
    updatedLines.splice(insertAt, 0, `model: ${newModel}`);
  }

  return open + updatedLines.join("\n") + close + body;
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

function getCommandMappings(): CommandMapping[] {
  const { agents, skills } = readBundledFiles();
  const mappings: CommandMapping[] = [];
  const mappedSkills = new Set<string>();

  const agentBaseSkills = new Set<string>();
  for (const a of agents) {
    const name = a.filename.replace('.md', '');
    agentBaseSkills.add(`bmad-${name}`);
    agentBaseSkills.add(name);
  }
  const skipSkills = new Set(['bmad-party-mode']);

  for (const agent of agents) {
    const agentName = agent.filename.replace('.md', '');
    const permitted = agent.frontmatter.permittedSkills || [];
    const workflows = agent.frontmatter.workflows || [];
    const allSkillNames = [...new Set([...permitted, ...workflows])];

    for (const skillName of allSkillNames) {
      if (agentBaseSkills.has(skillName) || skipSkills.has(skillName)) continue;
      if (mappedSkills.has(skillName)) continue;

      const skill = skills.find(s => s.name === skillName || s.folder === skillName);
      if (!skill) continue;

      mappings.push({
        commandName: skillName,
        skillName: skillName,
        agentName: agentName,
        description: skill.frontmatter.description,
      });
      mappedSkills.add(skillName);
    }
  }

  const standaloneSkills = [
    'bmad-help',
    'bmad-index-docs',
    'bmad-shard-doc',
    'bmad-editorial-review-prose',
    'bmad-editorial-review-structure',
    'bmad-review-adversarial-general',
    'bmad-bmm-generate-project-context',
    'bmad-bmm-sprint-status',
  ];

  for (const skillName of standaloneSkills) {
    if (mappedSkills.has(skillName)) continue;
    const skill = skills.find(s => s.name === skillName || s.folder === skillName);
    if (!skill) continue;

    mappings.push({
      commandName: skillName,
      skillName: skillName,
      agentName: '',
      description: skill.frontmatter.description,
    });
    mappedSkills.add(skillName);
  }

  return mappings;
}

function writeCommandFile(targetDir: string, mapping: CommandMapping): string {
  const commandsDir = join(targetDir, "commands");
  mkdirSync(commandsDir, { recursive: true });

  const frontmatterLines = ["---"];
  frontmatterLines.push(`description: ${JSON.stringify(mapping.description)}`);
  if (mapping.agentName) {
    frontmatterLines.push(`agent: ${mapping.agentName}`);
    frontmatterLines.push(`subtask: true`);
  }
  frontmatterLines.push("---");

  const prompt = mapping.agentName
    ? `Load the skill "${mapping.skillName}" and follow its instructions. $ARGUMENTS`
    : `Load the skill "${mapping.skillName}" and follow its instructions. $ARGUMENTS`;

  const content = frontmatterLines.join("\n") + "\n\n" + prompt + "\n";
  const relPath = join("commands", `${mapping.commandName}.md`);
  writeFileSync(join(targetDir, relPath), content);
  return relPath;
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

export const BMMPlugin: Plugin = async ({ directory, client }) => {
  const { agents } = readBundledFiles();

  try {
    autoInstallSkills(resolveSkillTarget(directory));
  } catch { /* skills auto-install failed — still accessible via bmm_skill tool */ }

  return {
    config: async (config: Record<string, any>) => {
      if (!config.agent) config.agent = {};
      for (const agent of agents) {
        const name = agent.filename.replace(".md", "");
        if (config.agent[name]) continue;
        const entry: Record<string, any> = {
          description: agent.frontmatter.description,
          prompt: agent.promptRef || buildAgentPrompt(agent),
        };
        if (agent.frontmatter.mode) entry.mode = agent.frontmatter.mode;
        if (agent.frontmatter.model) entry.model = agent.frontmatter.model;
        if (agent.frontmatter.temperature !== undefined) entry.temperature = agent.frontmatter.temperature;
        if (agent.frontmatter.top_p !== undefined) entry.top_p = agent.frontmatter.top_p;
        if (agent.frontmatter.color) entry.color = agent.frontmatter.color;
        if (agent.frontmatter.hidden !== undefined) entry.hidden = agent.frontmatter.hidden;
        if (agent.frontmatter.tools) {
          const tools: Record<string, boolean> = {};
          for (const [k, v] of Object.entries(agent.frontmatter.tools)) {
            if (v !== undefined) tools[k] = v;
          }
          entry.tools = tools;
        }
        if (agent.frontmatter.permission) entry.permission = agent.frontmatter.permission;
        config.agent[name] = entry;
      }

      if (!config.command) config.command = {};
      for (const cmd of getCommandMappings()) {
        if (config.command[cmd.commandName]) continue;
        const entry: Record<string, any> = {
          template: `Load the skill "${cmd.skillName}" and follow its instructions. $ARGUMENTS`,
          description: cmd.description,
        };
        if (cmd.agentName) {
          entry.agent = cmd.agentName;
          entry.subtask = true;
        }
        config.command[cmd.commandName] = entry;
      }

      if (!config.command["bmad-bmm-set-model"]) {
        config.command["bmad-bmm-set-model"] = {
          description: "View or change agent model assignments",
          template: 'Load the skill "bmad-bmm-set-model" and follow its instructions. $ARGUMENTS',
        };
      }
    },

    tool: {
      bmm_list: tool({
        description:
          "List all available BMAD-METHOD agents, skills, and commands from bmm-opencode",
        args: {},
        async execute() {
          const { agents, skills } = readBundledFiles();
          const commands = getCommandMappings();
          
          const agentCommands = commands.filter(c => c.agentName);
          const standaloneCommands = commands.filter(c => !c.agentName);
          
          return `# BMM-OpenCode Resources

## Agents (${agents.length})
${agents.map((a) => `- ${a.filename.replace(".md", "")}: ${a.frontmatter.description}`).join("\n")}

## Skills (${skills.length})
${skills.map((s) => `- ${s.name}: ${s.frontmatter.description}`).join("\n")}

## Commands (${commands.length})
After \`bmm_install\`, type \`/\` in the TUI to see these workflow commands:

### Agent Workflows (${agentCommands.length})
${agentCommands.map((c) => `- \`/${c.commandName}\` → @${c.agentName}: ${c.description}`).join("\n")}

### Standalone Utilities (${standaloneCommands.length})
${standaloneCommands.map((c) => `- \`/${c.commandName}\`: ${c.description}`).join("\n")}

## Usage
- Use \`bmm_agent\` tool to get agent definition
- Use \`bmm_skill\` tool to get skill instructions
- Use \`bmm_install\` to install agents, skills, and commands
- After install, use \`/command-name\` to invoke workflows directly`;
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

            const installedFiles: string[] = [];

            let agentsCopied = 0;
            for (const agent of agents) {
              installedFiles.push(writeAgentFile(targetBase, agent));
              agentsCopied++;
            }

            let skillsCopied = 0;
            for (const skill of skills) {
              installedFiles.push(writeSkillFileTracked(targetBase, skill));
              skillsCopied++;
            }

            const commandMappings = getCommandMappings();
            let commandsCopied = 0;
            for (const mapping of commandMappings) {
              installedFiles.push(writeCommandFile(targetBase, mapping));
              commandsCopied++;
            }

            writeManifest(targetBase, { version: getPackageVersion(), installedFiles });

            const isGlobal = targetBase === globalConfigDir;
            const installType = isGlobal ? "globally" : "to project";
            const targetCommands = join(targetBase, "commands");
            const autoNote = autoDetected ? `\n\nNote: Auto-detected existing global installation at ${globalConfigDir}` : "";
            
            return `Successfully installed BMM-OpenCode ${installType} (${targetBase}):
- ${agentsCopied} agents copied to ${targetAgents}
- ${skillsCopied} skills copied to ${targetSkills}
- ${commandsCopied} commands copied to ${targetCommands}
- Manifest: ${join(targetBase, MANIFEST_FILENAME)}
${autoNote}
Use \`bmm_uninstall\` to cleanly remove all installed files.
Agents and commands are also injected via config hook (auto-removed when plugin is removed).`;
          } catch (error) {
            return `Installation failed: ${error instanceof Error ? error.message : String(error)}`;
          }
        },
      }),

      bmm_uninstall: tool({
        description:
          "Remove all BMM files (agents, skills, commands) that were installed. Reads bmm-opencode.json manifest for clean removal.",
        args: {
          target: tool.schema
            .string()
            .optional()
            .describe("Target directory to uninstall from (auto-detected if omitted)"),
        },
        async execute(args, context) {
          const globalConfigDir = join(homedir(), ".config", "opencode");
          const localConfigDir = join(context.directory, ".opencode");

          const targets: string[] = [];
          if (args.target) {
            targets.push(args.target);
          } else {
            if (readManifest(globalConfigDir)) targets.push(globalConfigDir);
            if (readManifest(localConfigDir)) targets.push(localConfigDir);
          }

          if (targets.length === 0) {
            return `No BMM installation found. No ${MANIFEST_FILENAME} manifest in:\n- ${globalConfigDir}\n- ${localConfigDir}`;
          }

          const results: string[] = [];
          for (const target of targets) {
            const manifest = readManifest(target);
            if (!manifest) continue;
            const removed = removeManifestFiles(target);
            results.push(`- ${target}: removed ${removed} files (was v${manifest.version})`);
          }

          return `BMM-OpenCode uninstalled:\n${results.join("\n")}\n\nAgents and commands are also injected via config hook — they fully disappear when "bmm-opencode" is removed from opencode.json plugin list.`;
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

      bmm_set_model: tool({
        description:
          "Set the model for a BMM agent. Updates both bundled and installed agent files. Use agent='all' to set model for all agents. Omit model to show current assignments + available models.",
        args: {
          agent: tool.schema
            .string()
            .describe(
              "Agent name (e.g., bmm-dev, bmm-pm) or 'all' to set/view all agents"
            ),
          model: tool.schema
            .string()
            .optional()
            .describe(
              "Model identifier (e.g., anthropic/claude-sonnet-4-5). Omit to show current model + available options."
            ),
        },
        async execute(args, context) {
          const { agents } = readBundledFiles();

          // --- Helper: format available models list ---
          function formatAvailableModels(): string {
            const byProvider = new Map<string, typeof KNOWN_MODELS>();
            for (const m of KNOWN_MODELS) {
              if (!byProvider.has(m.provider)) byProvider.set(m.provider, []);
              byProvider.get(m.provider)!.push(m);
            }
            let out = "## Available Models\n";
            for (const [provider, models] of byProvider) {
              out += `\n### ${provider}\n`;
              for (const m of models) {
                out += `- \`${m.id}\` — ${m.description}\n`;
              }
            }
            out += "\nYou can also use any custom model identifier (e.g., `ollama/llama3`).\n";
            return out;
          }

          // --- List mode: no model provided ---
          if (!args.model) {
            if (args.agent === "all") {
              const lines = agents.map((a) => {
                const name = a.filename.replace(".md", "");
                return `| ${name} | \`${a.frontmatter.model || "(default)"}\` |`;
              });
              return `# Current Agent Models\n\n| Agent | Model |\n|-------|-------|\n${lines.join("\n")}\n\n${formatAvailableModels()}`;
            }
            const agentName = args.agent.replace(/^@/, "").replace(/\.md$/, "");
            const agent = agents.find(
              (a) =>
                a.filename === `${agentName}.md` ||
                a.filename.replace(".md", "") === agentName
            );
            if (!agent) {
              const available = agents
                .map((a) => a.filename.replace(".md", ""))
                .join(", ");
              return `Agent "${args.agent}" not found.\n\nAvailable agents: ${available}`;
            }
            return `Agent **${agentName}** current model: \`${agent.frontmatter.model || "(default)"}\`\n\n${formatAvailableModels()}`;
          }

          // --- Set mode ---
          const model = args.model;
          const targetAgents: OpenCodeAgent[] = [];

          if (args.agent === "all") {
            targetAgents.push(...agents);
          } else {
            const agentName = args.agent.replace(/^@/, "").replace(/\.md$/, "");
            const agent = agents.find(
              (a) =>
                a.filename === `${agentName}.md` ||
                a.filename.replace(".md", "") === agentName
            );
            if (!agent) {
              const available = agents
                .map((a) => a.filename.replace(".md", ""))
                .join(", ");
              return `Agent "${args.agent}" not found.\n\nAvailable agents: ${available}`;
            }
            targetAgents.push(agent);
          }

          const results: string[] = [];

          for (const agent of targetAgents) {
            const agentName = agent.filename.replace(".md", "");
            const oldModel = agent.frontmatter.model || "(default)";

            updateModelInAgentsJson(bundledAgentsJson, agentName, model);

            const bundledPath = join(bundledAgentsDir, agent.filename);
            if (existsSync(bundledPath)) {
              const content = readFileSync(bundledPath, "utf-8");
              const updated = updateModelInFrontmatter(content, model);
              writeFileSync(bundledPath, updated);
            }

            // 2. Update installed agent files (global + local)
            const globalAgentPath = join(
              homedir(),
              ".config",
              "opencode",
              "agents",
              agent.filename
            );
            const localAgentPath = join(
              context.directory,
              ".opencode",
              "agents",
              agent.filename
            );

            for (const installedPath of [globalAgentPath, localAgentPath]) {
              if (existsSync(installedPath)) {
                const content = readFileSync(installedPath, "utf-8");
                const updated = updateModelInFrontmatter(content, model);
                writeFileSync(installedPath, updated);
              }
            }

            results.push(
              `- ${agentName}: ${oldModel} → ${model}`
            );
          }

          return `# Model Updated\n\n${results.join("\n")}\n\nChanges take effect on next agent invocation.`;
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

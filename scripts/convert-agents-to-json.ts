#!/usr/bin/env npx tsx
// Usage: npx tsx scripts/convert-agents-to-json.ts
//
// Merges _bmad agent sources with existing agents.json config overrides.
// - _bmad agents provide: description, prompt {file:} path
// - agents.json provides: model, temperature, tools, permission, etc.

import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const outputPath = join(packageRoot, ".opencode", "agents.json");

interface AgentSource {
  name: string;
  description: string;
  promptPath: string;
}

function parseFrontmatterDescription(filePath: string): string {
  const content = readFileSync(filePath, "utf-8");
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return "";
  const descMatch = match[1].match(/description:\s*"?([^"\n]+)"?/);
  return descMatch ? descMatch[1].trim() : "";
}

function discoverAgents(): AgentSource[] {
  const sources: AgentSource[] = [];

  const scanDir = (dir: string, prefix: string) => {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        const nested = join(full, `${entry}.md`);
        if (existsSync(nested)) {
          const rel = "./" + relative(packageRoot, nested).replace(/\\/g, "/");
          sources.push({
            name: `${prefix}${entry}`,
            description: parseFrontmatterDescription(nested),
            promptPath: rel,
          });
        }
      } else if (entry.endsWith(".md")) {
        const rel = "./" + relative(packageRoot, full).replace(/\\/g, "/");
        const name = entry.replace(".md", "");
        sources.push({
          name: `${prefix}${name}`,
          description: parseFrontmatterDescription(full),
          promptPath: rel,
        });
      }
    }
  };

  scanDir(join(packageRoot, "_bmad", "bmm", "agents"), "bmm-");
  scanDir(join(packageRoot, "_bmad", "core", "agents"), "bmad-");

  return sources;
}

function main() {
  const existing: Record<string, any> = existsSync(outputPath)
    ? JSON.parse(readFileSync(outputPath, "utf-8"))
    : {};

  const sources = discoverAgents();
  if (sources.length === 0) {
    console.error("No _bmad agent sources found.");
    process.exit(1);
  }

  const agents: Record<string, any> = {};

  for (const src of sources) {
    const prev = existing[src.name] || {};
    agents[src.name] = {
      description: prev.description || src.description,
      prompt: `{file:${src.promptPath}}`,
      ...( prev.mode && { mode: prev.mode }),
      ...( prev.model && { model: prev.model }),
      ...( prev.temperature !== undefined && { temperature: prev.temperature }),
      ...( prev.top_p !== undefined && { top_p: prev.top_p }),
      ...( prev.color && { color: prev.color }),
      ...( prev.hidden !== undefined && { hidden: prev.hidden }),
      ...( prev.tools && { tools: prev.tools }),
      ...( prev.permission && { permission: prev.permission }),
    };
    console.log(`  ✓ ${src.name} → ${src.promptPath}`);
  }

  writeFileSync(outputPath, JSON.stringify(agents, null, 2) + "\n");
  console.log(`\nWrote ${sources.length} agents to ${outputPath}`);
}

main();

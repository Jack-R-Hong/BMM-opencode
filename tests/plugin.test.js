import { test, describe } from "node:test";
import assert from "node:assert";
import { mkdtempSync, rmSync, existsSync, readdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const loadPlugin = async () => {
  const mod = await import("../dist/index.js");
  const plugin = mod.default || mod.BMMPlugin;
  return plugin({ directory: process.cwd(), worktree: process.cwd() });
};

describe("BMM-OpenCode Plugin", async () => {
  test("exports a plugin function", async () => {
    const mod = await import("../dist/index.js");
    const plugin = mod.default || mod.BMMPlugin;
    assert.strictEqual(typeof plugin, "function");
  });

  test("returns 4 tools", async () => {
    const result = await loadPlugin();
    const tools = Object.keys(result.tool);
    assert.deepStrictEqual(tools.sort(), [
      "bmm_agent",
      "bmm_install",
      "bmm_list",
      "bmm_skill",
    ]);
  });
});

describe("bmm_list", async () => {
  test("lists 19 agents", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_list.execute({});
    assert.ok(output.includes("## Agents (19)"));
  });

  test("lists 62 skills", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_list.execute({});
    assert.ok(output.includes("## Skills (62)"));
  });
});

describe("bmm_agent", async () => {
  test("returns agent content for valid name", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_agent.execute({ name: "bmm-dev" });
    assert.ok(output.includes("Developer Agent"));
    assert.ok(output.includes("Amelia"));
  });

  test("returns error for invalid name", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_agent.execute({ name: "invalid" });
    assert.ok(output.includes('not found'));
  });
});

describe("bmm_skill", async () => {
  test("returns skill content for valid name", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_skill.execute({
      name: "bmad-bmm-create-prd",
    });
    assert.ok(output.includes("create-prd"));
    assert.ok(output.includes("PRD"));
  });

  test("returns error for invalid name", async () => {
    const result = await loadPlugin();
    const output = await result.tool.bmm_skill.execute({ name: "invalid" });
    assert.ok(output.includes('not found'));
  });
});

describe("bmm_install", async () => {
  test("copies agents and skills to target directory", async () => {
    const result = await loadPlugin();
    const tempDir = mkdtempSync(join(tmpdir(), "bmm-test-"));
    const targetDir = join(tempDir, ".opencode");

    try {
      const output = await result.tool.bmm_install.execute(
        { target: targetDir },
        { directory: tempDir, worktree: tempDir }
      );

      assert.ok(output.includes("Successfully installed"));
      assert.ok(output.includes("19 agents"));
      assert.ok(output.includes("62 skills"));

      assert.ok(existsSync(join(targetDir, "agents")));
      assert.ok(existsSync(join(targetDir, "skills")));

      const agents = readdirSync(join(targetDir, "agents"));
      const skills = readdirSync(join(targetDir, "skills"));

      assert.strictEqual(agents.length, 19);
      assert.strictEqual(skills.length, 62);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

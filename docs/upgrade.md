# BMM-OpenCode Upgrade Guide

## Quick Upgrade (For LLM Agents)

Paste this into your LLM agent session:

```
Upgrade bmm-opencode by following the instructions here:
https://raw.githubusercontent.com/Jack-R-Hong/BMM-opencode/main/docs/upgrade.md
```

---

## Check Current Version

### Method 1: Using bmm_list

```
Use bmm_list to see current version and available agents/skills
```

### Method 2: Check package.json

```bash
npm list bmm-opencode
```

### Method 3: Check installed agents

```bash
ls .opencode/agents/
```

---

## Upgrade Methods

### Method 1: Update Plugin Configuration (Recommended)

Update your `opencode.json` to use the latest version:

```json
{
  "mcp": {
    "bmm": {
      "type": "npm",
      "package": "bmm-opencode@latest"
    }
  }
}
```

Or specify a specific version:

```json
{
  "mcp": {
    "bmm": {
      "type": "npm", 
      "package": "bmm-opencode@1.2.0"
    }
  }
}
```

Then **restart OpenCode** to load the new version.

---

### Method 2: Reinstall Agents & Skills

If you've previously run `bmm_install`, you need to reinstall to get new agents/skills:

#### Via LLM Agent

```
Use bmm_install with force=true to update all agents and skills
```

Or directly:

```
bmm_install({ force: true })
```

#### What This Does

- Overwrites all agents in `.opencode/agents/`
- Overwrites all skills in `.opencode/skills/`
- **Preserves** custom agents/skills (if names don't conflict with BMM agents)

---

### Method 3: Manual npm Update

```bash
# Check current version
npm list bmm-opencode

# Update to latest
npm update bmm-opencode

# Or install specific version
npm install bmm-opencode@1.2.0

# Then reinstall agents/skills
# (via LLM agent)
bmm_install({ force: true })
```

---

### Method 4: Global Installation Update

If you installed globally:

```bash
# Update global installation
npm update -g bmm-opencode

# Reinstall to global config
bmm_install({ global: true, force: true })
```

---

## Upgrade Scenarios

### Scenario 1: First Time After v1.1.0

If upgrading from v1.1.0 or earlier to v1.2.0+:

```
1. Update opencode.json to bmm-opencode@latest
2. Restart OpenCode
3. Run: bmm_install({ force: true })
4. New agents available: party-mode, gen-subagent
```

### Scenario 2: Only Want New Agents

If you only want the new agents without overwriting existing:

```
1. Update opencode.json
2. Restart OpenCode  
3. Use bmm_agent to get specific agent content
4. Manually save to .opencode/agents/
```

Example:
```
Use bmm_agent with name party-mode and save to .opencode/agents/party-mode.md
```

### Scenario 3: Project Has Custom Agents

If you have custom agents you want to preserve:

```bash
# Backup custom agents first
cp -r .opencode/agents/ .opencode/agents-backup/

# Run upgrade
bmm_install({ force: true })

# Restore custom agents (if overwritten)
cp .opencode/agents-backup/my-custom-agent.md .opencode/agents/
```

---

## Version History

| Version | Date | Agents | Skills | Changes |
|---------|------|--------|--------|---------|
| 1.2.0 | 2024-02 | 19 | 61 | Added `party-mode`, `gen-subagent`, upgrade docs |
| 1.1.0 | 2024-02 | 17 | 61 | Added bmad-opencode-converter integration |
| 1.0.1 | 2024-01 | 17 | 61 | Initial release |

---

## New in v1.2.0

### Party Mode Agent

Multi-agent meeting orchestrator with parallel background execution:

```
@party-mode
```

Features:
- Reads agent manifest, displays available agents
- Asks meeting purpose, recommends relevant agents
- Runs agents in parallel background tasks
- Supports dynamic agent addition during meeting (`+agent`)
- Synthesizes results with consensus/conflict analysis

### Gen Subagent Agent

Agent factory for generating new custom agents:

```
@gen-subagent Create a security review agent
```

Features:
- Problem analysis before generation
- Complete configuration schema
- Built-in templates
- Validation checklist

---

## Troubleshooting

### Plugin Not Loading After Update

1. Check `opencode.json` syntax is valid
2. Restart OpenCode completely
3. Check npm package is installed: `npm list bmm-opencode`

### New Agents Not Appearing

1. Confirm `bmm_install` was run with `force: true`
2. Check `.opencode/agents/` directory
3. Try: `bmm_list` to verify agent count

### Conflicts with Custom Agents

If your custom agent has the same name as a BMM agent:

1. Rename your custom agent before upgrade
2. Or skip `bmm_install` and manually copy only needed agents

### Skills Not Loading

1. Check `.opencode/skills/` directory structure
2. Each skill should be in: `.opencode/skills/{name}/SKILL.md`
3. Reinstall: `bmm_install({ force: true })`

---

## Rollback

To rollback to a previous version:

```json
{
  "mcp": {
    "bmm": {
      "type": "npm",
      "package": "bmm-opencode@1.1.0"
    }
  }
}
```

Then restart OpenCode and run:

```
bmm_install({ force: true })
```

---

## Support

- **GitHub Issues**: https://github.com/Jack-R-Hong/BMM-opencode/issues
- **Documentation**: https://github.com/Jack-R-Hong/BMM-opencode#readme

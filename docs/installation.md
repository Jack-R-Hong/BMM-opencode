# BMM-OpenCode Installation Guide

## For Humans

Paste this into your LLM agent session:

```
Install and configure bmm-opencode by following the instructions here:
https://raw.githubusercontent.com/Jack-R-Hong/BMM-opencode/refs/heads/main/docs/installation.md
```

## For LLM Agents

Welcome! You're about to install **BMM-OpenCode** - BMAD-METHOD agents and skills for OpenCode.

This gives your user access to:
- **19 Specialized Agents** (Product Manager, Architect, Developer, QA, etc.)
- **62 Workflow Skills** (PRD creation, architecture design, sprint planning, etc.)

### Step 0: Check Prerequisites

```bash
# Verify OpenCode is installed
if command -v opencode &> /dev/null; then
    echo "OpenCode $(opencode --version) is installed"
else
    echo "OpenCode is not installed. Please install it first: https://opencode.ai/docs"
    exit 1
fi
```

### Step 1: Ask User About Installation Scope

Ask the user:

> **Do you want to install BMM-OpenCode globally (all projects) or just for this project?**
> - **Global** (recommended): Available in all your projects
> - **Project-only**: Only available in the current project

### Step 2: Add Plugin to Config

Based on user's answer:

**For Global Installation:**

```bash
# Check if global config exists
if [ -f ~/.config/opencode/opencode.json ]; then
    echo "Global config exists. Will merge plugin."
else
    mkdir -p ~/.config/opencode
    echo '{"$schema":"https://opencode.ai/config.json","plugin":[]}' > ~/.config/opencode/opencode.json
fi
```

Then read the existing config and add `"bmm-opencode"` to the `plugin` array:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bmm-opencode"]
}
```

**For Project-Level Installation:**

Create or edit `opencode.json` in the project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bmm-opencode"]
}
```

### Step 3: Restart OpenCode

Tell the user to restart OpenCode to load the plugin.

After restart, verify the plugin is loaded:

```
Use bmm_list to verify installation
```

You should see 19 agents and 62 skills listed.

### Step 4: Install Agents & Skills

Now install the agents and skills to make them available via Tab switching and slash commands:

**For Global Installation:**

```
Use bmm_install with global=true
```

This copies agents and skills to `~/.config/opencode/`.

**For Project-Level Installation:**

```
Use bmm_install
```

This copies to the current project's `.opencode/` directory.

**Note:** If existing files are detected, the tool will warn you. Use `force=true` to overwrite:

```
Use bmm_install with global=true and force=true
```

### Step 5: Restart OpenCode Again

Tell the user to restart OpenCode to load the installed agents and skills.

### Step 6: Verify Installation

After restart, verify everything is working:

1. **Check agents**: Press `Tab` to see the agent list. You should see agents like:
   - `bmm-pm` (Product Manager)
   - `bmm-architect` (System Architect)
   - `bmm-dev` (Developer)
   - And 16 more...

2. **Check skills**: Type `/bmad-` to see available slash commands like:
   - `/bmad-bmm-create-prd`
   - `/bmad-bmm-create-architecture`
   - `/bmad-bmm-dev-story`
   - And 59 more...

### Available Tools

After installation, the plugin provides these tools:

| Tool | Description |
|------|-------------|
| `bmm_list` | List all available agents and skills |
| `bmm_agent` | Get agent definition by name |
| `bmm_skill` | Get skill instructions by name |
| `bmm_install` | Install agents/skills (`global=true` for global, `force=true` to overwrite) |

### Say 'Installation Complete!' to the User

Tell the user:

> **Installation Complete!** You now have access to 19 specialized agents and 62 workflow skills.
>
> **Quick Start:**
> - Press `Tab` to switch agents
> - Type `/bmad-bmm-create-prd` to create a PRD
> - Use `@bmm-dev` to invoke the developer agent
>
> Check out the [README](https://github.com/Jack-R-Hong/BMM-opencode#readme) for more usage examples.

---

## Troubleshooting

### Plugin not loading?

1. Check config syntax: `cat ~/.config/opencode/opencode.json`
2. Ensure `"bmm-opencode"` is in the `plugin` array
3. Restart OpenCode

### Agents not showing in Tab menu?

1. Verify installation: `ls ~/.config/opencode/agents/` (or `.opencode/agents/`)
2. Should see 19 `.md` files
3. Restart OpenCode

### Skills not available as slash commands?

1. Verify installation: `ls ~/.config/opencode/skills/` (or `.opencode/skills/`)
2. Should see 62 directories
3. Restart OpenCode

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

### Step 5: Configure LLM Models

Each agent is pre-configured with a default model. Different agents need different capability levels — ask the user which providers they have, then write the best models into the agent files.

OpenCode supports 75+ providers (see [full list](https://opencode.ai/docs/providers/)). The model format is `provider_id/model_id`.

**Ask the user (multi-select):**

> **Which LLM providers do you have access to in OpenCode?** (select all that apply)
> - **Anthropic** (Claude)
> - **OpenAI** (GPT / o-series)
> - **OpenCode Zen** (curated multi-provider gateway by OpenCode)
> - **Google Vertex AI** (Gemini)
> - **Amazon Bedrock**
> - **Azure OpenAI**
> - **DeepSeek**
> - **xAI** (Grok)
> - **OpenRouter**
> - **GitHub Copilot**
> - **Groq**
> - **Other** (specify — see [supported providers](https://opencode.ai/docs/providers/))

#### Agent tiers

| Tier | Agents | Why |
|------|--------|-----|
| **High** | `bmm-dev`, `bmm-architect`, `bmm-quick-flow-solo-dev`, `bmad-bmad-master` | Generate/modify code, complex architectural decisions, multi-step orchestration |
| **Mid** | `bmm-pm`, `bmm-sm`, `bmm-qa`, `bmm-analyst` | Planning, analysis, coordination — need solid reasoning but not peak code-gen |
| **Low** | `bmm-tech-writer`, `bmm-ux-designer` | Documentation, design specs — a fast, cost-effective model works well |

#### Recommended models per provider

Each provider's best model for each tier. **Priority** = recommendation rank (1 = best). Model IDs use the `provider_id/model_id` format that OpenCode expects.

| Provider | High (priority) | Mid (priority) | Low (priority) |
|----------|----------------|----------------|----------------|
| **Anthropic** | `anthropic/claude-opus-4-6` (1) | `anthropic/claude-sonnet-4-5` (1) | `anthropic/claude-haiku-4-5` (1) |
| **OpenAI** | `openai/gpt-5.2-codex` (2) | `openai/gpt-5.1-codex` (2) | `openai/gpt-5-nano` (2) |
| **OpenCode Zen** | `opencode/claude-opus-4-6` (1) | `opencode/claude-sonnet-4-5` (1) | `opencode/claude-haiku-4-5` (1) |
| **Google Vertex AI** | `google-vertex/gemini-3-pro` (3) | `google-vertex/gemini-3-flash` (3) | `google-vertex/gemini-3-flash` (3) |
| **Amazon Bedrock** | `amazon-bedrock/claude-opus-4-6` (2) | `amazon-bedrock/claude-sonnet-4-5` (2) | `amazon-bedrock/claude-haiku-4-5` (2) |
| **Azure OpenAI** | `azure-openai/gpt-5.2-codex` (2) | `azure-openai/gpt-5.1-codex` (2) | `azure-openai/gpt-5-nano` (2) |
| **DeepSeek** | `deepseek/deepseek-r1` (4) | `deepseek/deepseek-chat` (4) | `deepseek/deepseek-chat` (5) |
| **xAI** | `xai/grok-3` (4) | `xai/grok-3-mini` (5) | `xai/grok-3-mini` (5) |
| **OpenRouter** | `openrouter/anthropic/claude-opus-4-6` (2) | `openrouter/anthropic/claude-sonnet-4-5` (2) | `openrouter/anthropic/claude-haiku-4-5` (2) |
| **GitHub Copilot** | `copilot/claude-sonnet-4` (5) | `copilot/gpt-4o` (5) | `copilot/gpt-4o-mini` (4) |
| **Groq** | `groq/qwen3-coder-480b` (4) | `groq/qwen3-coder-480b` (4) | `groq/qwen3-coder-480b` (5) |

> **Note:** Model IDs may vary depending on your provider's region and model access. Run `/models` in OpenCode to see what's available for your connected providers. The IDs above are based on typical configurations — adjust if your provider uses different names.

#### How to resolve models from the user's provider selection

1. For each tier (High / Mid / Low), collect the models from the user's selected providers.
2. Pick the model with the **lowest priority number** (= best) for that tier.
3. The result is three model IDs — one per tier.

#### How to apply — edit agent files directly

After resolving the three models, **you (the LLM agent) must edit the agent files**. Do NOT ask the user to edit manually.

The agent files are located at:
- **Global install:** `~/.config/opencode/agents/<agent-name>.md`
- **Project install:** `.opencode/agents/<agent-name>.md`

Each file has a YAML frontmatter with a `model:` field. Replace the model value for each agent according to the resolved tier.

**File → tier mapping and default values:**

```
# High tier — replace model with resolved High model
agents/bmm-dev.md              → default: "anthropic/claude-opus-4-6"
agents/bmm-architect.md        → default: "anthropic/claude-opus-4-6"
agents/bmm-quick-flow-solo-dev.md → default: "anthropic/claude-opus-4-6"
agents/bmad-bmad-master.md     → default: "anthropic/claude-opus-4-6"

# Mid tier — replace model with resolved Mid model
agents/bmm-pm.md               → default: "anthropic/claude-sonnet-4-5"
agents/bmm-sm.md               → default: "anthropic/claude-sonnet-4-5"
agents/bmm-qa.md               → default: "anthropic/claude-sonnet-4-5"
agents/bmm-analyst.md          → default: "openai/gpt-5.2-codex"

# Low tier — replace model with resolved Low model
agents/bmm-tech-writer.md      → default: "anthropic/claude-haiku-4-5"
agents/bmm-ux-designer.md      → default: "anthropic/claude-haiku-4-5"
```

**For each agent file that needs changing**, find the `model:` line in the frontmatter and replace it:

```yaml
# Before
model: "anthropic/claude-opus-4-6"

# After (example: resolved High = openai/gpt-5.2-codex)
model: "openai/gpt-5.2-codex"
```

**Skip files where the default already matches the resolved model** — no edit needed.

#### Worked examples

**User selects: Anthropic + OpenAI** → This is the default. No edits needed.

**User selects: OpenCode Zen** → Zen uses `opencode/` prefix. Edit all 10 files:
- High agents: set `model: "opencode/claude-opus-4-6"`
- Mid agents: set `model: "opencode/claude-sonnet-4-5"`
- Low agents: set `model: "opencode/claude-haiku-4-5"`

**User selects: Anthropic + Google Vertex AI** → Anthropic wins all tiers (priority 1). Edit only:
- `agents/bmm-analyst.md`: change `model: "openai/gpt-5.2-codex"` → `model: "anthropic/claude-sonnet-4-5"`

**User selects: Google Vertex AI only** → Edit all 10 files:
- High agents: set `model: "google-vertex/gemini-3-pro"`
- Mid agents: set `model: "google-vertex/gemini-3-flash"`
- Low agents: set `model: "google-vertex/gemini-3-flash"`

**User selects: OpenAI + DeepSeek** → OpenAI wins all tiers (priority 2 vs 4). Edit all 10 files:
- High agents: set `model: "openai/gpt-5.2-codex"`
- Mid agents: set `model: "openai/gpt-5.1-codex"`
- Low agents: set `model: "openai/gpt-5-nano"`

**User selects: DeepSeek only** → Edit all 10 files:
- High agents: set `model: "deepseek/deepseek-r1"`
- Mid agents: set `model: "deepseek/deepseek-chat"`
- Low agents: set `model: "deepseek/deepseek-chat"`

#### Other / custom providers

If the user has a provider not listed above (Together AI, Fireworks AI, Cerebras, Ollama, etc.), check the [OpenCode providers directory](https://opencode.ai/docs/providers/) for the correct `provider_id`, then ask the user for their available model IDs and map:

- **High** → their most capable model
- **Mid** → their balanced/general model
- **Low** → their fastest/cheapest model

Apply edits the same way as above.

### Step 6: Restart OpenCode Again

Tell the user to restart OpenCode to load the installed agents and skills.

### Step 7: Verify Installation

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

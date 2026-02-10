---
name: bmad-bmm-set-model
description: "View or change the AI model assigned to each BMM agent"
---

# Task: Set Agent Model

View and change which AI model each BMM agent uses by reading and editing `.opencode/agents.json`.

## Step 1 — Parse Arguments

Check `$ARGUMENTS`:

- **Has agent + model** (e.g. `bmm-dev anthropic/claude-sonnet-4-5`) → go to Step 3
- **Has "all" + model** (e.g. `all anthropic/claude-opus-4-6`) → go to Step 3
- **Empty or agent-only** → go to Step 2

## Step 2 — Interactive Selection (QA)

Read `.opencode/agents.json` and extract each agent's `model` field.

**Step 2a — Select Agent(s)**: Use the `mcp_question` tool to present an interactive choice. Build options dynamically from the agents found in `agents.json`:

- First option: `"all"` with description `"Change ALL agents at once"`
- Then one option per agent, label = agent name, description = `"Currently: {current_model}"`
- Set `multiple: true` so the user can select more than one agent

**Step 2b — Select Model**: Use `mcp_question` again to let the user pick a model. Build options from the Available Models Reference below:

- One option per model, label = Model ID, description = Description text
- Set `multiple: false` (single selection)
- The `custom` input is enabled by default, allowing the user to type a custom model ID (e.g. `ollama/llama3`)

## Step 3 — Apply Change

1. Read `.opencode/agents.json`
2. Update the `model` field for the target agent (or all agents if "all")
3. Write back the updated JSON (preserve formatting with 2-space indent)
4. Confirm what changed: `{agent}: {old_model} → {new_model}`

## Available Models Reference

### Anthropic
| Model ID | Description |
|----------|-------------|
| `anthropic/claude-opus-4-6` | Most capable, complex reasoning & coding |
| `anthropic/claude-sonnet-4-5` | Balanced performance & speed |
| `anthropic/claude-haiku-4-5` | Fast & cost-effective |

### OpenAI
| Model ID | Description |
|----------|-------------|
| `openai/o3` | Advanced reasoning model |
| `openai/o4-mini` | Fast reasoning model |
| `openai/gpt-5.2-codex` | Coding-optimized GPT |
| `openai/gpt-4.1` | General-purpose GPT |
| `openai/gpt-4.1-mini` | Compact GPT |

### Google
| Model ID | Description |
|----------|-------------|
| `google/gemini-2.5-pro` | Advanced multimodal model |
| `google/gemini-2.5-flash` | Fast multimodal model |

### xAI
| Model ID | Description |
|----------|-------------|
| `xai/grok-4` | Grok flagship model |
| `xai/grok-3-mini` | Compact Grok model |

> Custom model IDs are also supported (e.g. `ollama/llama3`).

---
name: bmad-bmm-set-model
description: "View or change the AI model assigned to each BMM agent"
---

# Task: Set Agent Model

View and change which AI model each BMM agent uses.

## Step 1 — Parse Arguments

Check `$ARGUMENTS`:

- **Has agent + model** (e.g. `bmm-dev anthropic/claude-sonnet-4-5`) → go to Step 3
- **Has "all" + model** (e.g. `all anthropic/claude-opus-4-6`) → go to Step 3
- **Empty or agent-only** → go to Step 2

## Step 2 — Show Current + Options

Call `bmm_set_model` tool with `agent: "all"` (no `model`) to get the current assignments, then **ask the user** which agent and model they want to change. Present the question using clear numbered options.

## Step 3 — Apply Change

Call `bmm_set_model` tool with the `agent` and `model` values. Confirm what changed.

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

## BMM Agents

| Agent | Role |
|-------|------|
| bmad-bmad-master | BMad Master Orchestrator |
| bmm-analyst | Business Analyst |
| bmm-architect | Architect |
| bmm-dev | Developer Agent |
| bmm-pm | Product Manager |
| bmm-qa | QA Engineer |
| bmm-quick-flow-solo-dev | Quick Flow Solo Dev |
| bmm-sm | Scrum Master |
| bmm-tech-writer | Technical Writer |
| bmm-ux-designer | UX Designer |

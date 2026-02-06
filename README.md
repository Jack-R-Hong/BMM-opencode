# BMM-OpenCode

[![npm version](https://img.shields.io/npm/v/bmm-opencode.svg)](https://www.npmjs.com/package/bmm-opencode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

BMAD-METHOD agents and skills converted for [OpenCode](https://opencode.ai) - ready-to-use AI agent plugins.

---

## Installation

### For Humans

Paste this into your LLM agent session:

```
Install and configure bmm-opencode by following the instructions here:
https://raw.githubusercontent.com/Jack-R-Hong/BMM-opencode/refs/heads/main/docs/installation.md
```

### For LLM Agents

Fetch the installation guide and follow it:

```bash
curl -s https://raw.githubusercontent.com/Jack-R-Hong/BMM-opencode/refs/heads/main/docs/installation.md
```

---

## Quick Start

After installation, you have access to:

1. **Plugin Tools** - Use `bmm_list`, `bmm_agent`, `bmm_skill` directly
2. **19 Specialized Agents** - After `bmm_install`, switch agents using `Tab` key
3. **61 Workflow Skills** - After `bmm_install`, load skills via slash commands like `/bmad-bmm-create-prd`

---

## What's Included

### Agents (19)

| Agent | Name | Role |
|-------|------|------|
| `bmm-analyst` | Mary | Business Analyst |
| `bmm-architect` | Winston | System Architect |
| `bmm-dev` | Amelia | Senior Software Engineer |
| `bmm-pm` | John | Product Manager |
| `bmm-qa` | Quinn | QA Engineer |
| `bmm-sm` | Bob | Scrum Master |
| `bmm-tech-writer` | Paige | Technical Writer |
| `bmm-ux-designer` | Sally | UX Designer |
| `bmm-quick-flow-solo-dev` | Barry | Quick Flow Solo Dev |
| `cis-brainstorming-coach` | Carson | Brainstorming Specialist |
| `cis-creative-problem-solver` | Dr. Quinn | Problem Solver |
| `cis-design-thinking-coach` | Maya | Design Thinking Expert |
| `cis-innovation-strategist` | Victor | Innovation Strategist |
| `cis-presentation-master` | Caravaggio | Presentation Expert |
| `cis-storyteller` | Sophia | Master Storyteller |
| `core-bmad-master` | BMad Master | Workflow Orchestrator |
| `tea-tea` | Murat | Test Architect |
| `party-mode` | - | Multi-Agent Meeting Orchestrator |
| `gen-subagent` | - | Agent Factory (generates new agents) |

### Skills (61)

#### BMM Module (Development Lifecycle)
- `bmad-bmm-create-product-brief` - Create product briefs
- `bmad-bmm-create-prd` - Create PRD documents
- `bmad-bmm-edit-prd` - Edit existing PRDs
- `bmad-bmm-validate-prd` - Validate PRD quality
- `bmad-bmm-create-architecture` - Design system architecture
- `bmad-bmm-create-ux-design` - Create UX designs
- `bmad-bmm-create-epics-and-stories` - Generate epics and stories
- `bmad-bmm-create-story` - Create user stories
- `bmad-bmm-dev-story` - Develop stories
- `bmad-bmm-code-review` - Adversarial code review
- `bmad-bmm-sprint-planning` - Sprint planning
- `bmad-bmm-sprint-status` - Sprint status tracking
- `bmad-bmm-retrospective` - Sprint retrospectives
- `bmad-bmm-quick-spec` - Quick tech specs
- `bmad-bmm-quick-dev` - Quick development
- `bmad-bmm-qa-automate` - Test automation
- And more...

#### CIS Module (Creative & Innovation)
- `bmad-cis-design-thinking` - Design thinking workflow
- `bmad-cis-innovation-strategy` - Innovation strategy
- `bmad-cis-problem-solving` - Systematic problem solving
- `bmad-cis-storytelling` - Narrative crafting

#### TEA Module (Testing)
- `bmad-tea-testarch-atdd` - ATDD workflow
- `bmad-tea-testarch-automate` - Test automation
- `bmad-tea-testarch-framework` - Test framework setup
- `bmad-tea-testarch-ci` - CI/CD pipeline
- `bmad-tea-teach-me-testing` - Testing education
- And more...

#### Core Tasks
- `bmad-core-task-help` - Get workflow help
- `bmad-core-task-editorial-review-prose` - Prose editing
- `bmad-core-task-editorial-review-structure` - Structure editing
- `bmad-core-task-shard-doc` - Document sharding

---

## Usage

### Using Plugin Tools

```
Use bmm_list to see all available agents and skills
Use bmm_skill with name bmad-bmm-create-prd to get the PRD creation workflow
Use bmm_install to copy everything to my project
```

### Switch to an agent (after bmm_install)

Press `Tab` or use the agent switch keybind, then select an agent.

### Invoke via @ mention

```
@bmm-dev implement the user authentication feature
@bmm-architect review the system design
@cis-brainstorming-coach help me brainstorm product ideas
```

### Load a skill

```
Load the bmad-bmm-create-prd skill and help me create a PRD
```

---

## Update / Upgrade

### Method 1: Update Plugin (Recommended)

Update the npm package in your `opencode.json`:

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

Then restart OpenCode.

### Method 2: Reinstall Agents & Skills

If you've already run `bmm_install`, update the installed files:

```
Use bmm_install with force=true to overwrite existing agents and skills
```

Or via LLM:
```
bmm_install({ force: true })
```

This will:
- Overwrite all agents in `.opencode/agents/`
- Overwrite all skills in `.opencode/skills/`
- Preserve any custom agents/skills you've created (if names don't conflict)

### Method 3: Manual Update

1. Check current version:
   ```bash
   npm list bmm-opencode
   ```

2. Update to latest:
   ```bash
   npm update bmm-opencode
   ```

3. Reinstall agents/skills:
   ```
   bmm_install({ force: true })
   ```

### Check for Updates

```
Use bmm_list to see the current version and available agents/skills
```

### Version History

| Version | Changes |
|---------|---------|
| 1.2.0 | Added `party-mode` (multi-agent meetings) and `gen-subagent` (agent factory) |
| 1.1.0 | Added bmad-opencode-converter integration |
| 1.0.1 | Initial release with 17 agents, 61 skills |

---

## Source

This package is generated from [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) using [BMM-opencode-converter](https://github.com/Jack-R-Hong/BMM-opencode-converter).

## License

MIT

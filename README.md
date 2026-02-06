# BMM-OpenCode

[![npm version](https://img.shields.io/npm/v/bmm-opencode.svg)](https://www.npmjs.com/package/bmm-opencode)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

BMAD-METHOD agents and skills converted for [OpenCode](https://opencode.ai) - ready-to-use AI agent plugins.

---

## Installation

### Plugin Install (Recommended)

Add `bmm-opencode` to your `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bmm-opencode"]
}
```

Restart OpenCode. The plugin provides these tools:

| Tool | Description |
|------|-------------|
| `bmm_list` | List all available agents and skills |
| `bmm_agent` | Get agent definition by name |
| `bmm_skill` | Get skill instructions by name |
| `bmm_install` | Copy agents/skills to your project's `.opencode` folder |

### Installing Agents & Skills to Your Project

After adding the plugin, run:

```
Use the bmm_install tool to install agents and skills
```

This copies all 17 agents and 61 skills to your project's `.opencode/` directory. Restart OpenCode to use them with Tab switching and slash commands.

---

<details>
<summary><b>Alternative: Manual Installation</b></summary>

#### Via git clone

```bash
git clone https://github.com/Jack-R-Hong/BMM-opencode.git
cp -r BMM-opencode/.opencode /path/to/your-project/.opencode
```

#### Via npm pack

```bash
npm pack bmm-opencode
tar -xzf bmm-opencode-*.tgz
cp -r package/.opencode /path/to/your-project/.opencode
rm -rf package bmm-opencode-*.tgz
```

</details>

---

## Quick Start

After installation, you have access to:

1. **Plugin Tools** - Use `bmm_list`, `bmm_agent`, `bmm_skill` directly
2. **17 Specialized Agents** - After `bmm_install`, switch agents using `Tab` key
3. **61 Workflow Skills** - After `bmm_install`, load skills via slash commands like `/bmad-bmm-create-prd`

---

## What's Included

### Agents (17)

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

## Source

This package is generated from [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) using [BMM-opencode-converter](https://github.com/Jack-R-Hong/BMM-opencode-converter).

## License

MIT

# BMM-OpenCode

BMAD-METHOD agents and skills converted for [OpenCode](https://opencode.ai) - ready-to-use AI agent plugins.

## Installation

### Via npm (in opencode.json)

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bmm-opencode"]
}
```

### Via local installation

```bash
# Clone the repository
git clone https://github.com/Jack-R-Hong/BMM-opencode.git

# Copy to your project
cp -r BMM-opencode/.opencode your-project/.opencode
```

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

## Usage

### Switch to an agent

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

## Source

This package is generated from [BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) using [BMM-opencode-converter](https://github.com/Jack-R-Hong/BMM-opencode-converter).

## License

MIT

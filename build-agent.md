# Build Agent - Subagent Generation Rules

> **Purpose**: Define rules for dynamically generating specialized subagents based on problem analysis.  
> **Reference**: [OpenCode Agents](https://opencode.ai/docs/agents/) | [OpenCode Permissions](https://opencode.ai/docs/permissions/) | [OpenCode Skills](https://opencode.ai/docs/skills/)

---

## Phase 1: Problem Analysis (MANDATORY)

Before creating any subagent, analyze the problem to determine:

### 1.1 Problem Classification

| Dimension | Questions to Answer |
|-----------|---------------------|
| **Domain** | Development? Testing? Design? Documentation? Research? Planning? |
| **Complexity** | Trivial (single task) / Moderate (multi-step) / Complex (requires expertise)? |
| **Scope** | Single file / Module / System-wide / Cross-repository? |
| **Skills Required** | What specialized knowledge is needed? |
| **Tool Requirements** | Read-only? Write access? Bash? External APIs? |
| **Risk Level** | Can this break things? Data loss potential? Security implications? |

### 1.2 Subagent Decision Matrix

| Problem Type | Recommended Subagent(s) | Rationale |
|--------------|------------------------|-----------|
| Architecture design | `architect` + `oracle` | Technical decisions need deep reasoning |
| Feature implementation | `dev` + skill-specific | Strict AC adherence |
| Bug investigation | `explore` + `dev` | Find root cause, then fix |
| Test automation | `tea` or `qa` | Testing expertise |
| Documentation | `tech-writer` | Clear, structured output |
| UX/UI work | `ux-designer` | User-centered design |
| Requirements gathering | `analyst` + `pm` | Business context |
| Creative problems | `brainstorming-coach` or `creative-problem-solver` | Unconventional approaches |
| Research (external) | `librarian` | Multi-repo, docs, OSS examples |
| Research (internal) | `explore` | Codebase patterns |

---

## Phase 2: Subagent Configuration Schema

Each subagent MUST be defined with the following properties:

### 2.1 Required Properties

```yaml
# Subagent Definition Schema
---
# IDENTITY (Required)
name: string              # Unique identifier (kebab-case, e.g., "code-reviewer")
description: string       # 1-2 sentence purpose description (REQUIRED by OpenCode)
mode: enum               # "primary" | "subagent" | "all" (default: "subagent")

# PROMPT (Required)
prompt: string           # System prompt - defines agent behavior
                         # Can use {file:./path/to/prompt.txt} for external file

# MODEL CONFIGURATION (Required for specialized tasks)
model: string            # Format: "provider/model-id"
                         # Examples: "anthropic/claude-sonnet-4-20250514"
                         #           "openai/gpt-4o"
temperature: float       # 0.0-1.0 (default: model-specific)
                         # 0.0-0.2: Deterministic (code, analysis)
                         # 0.3-0.5: Balanced (general tasks)
                         # 0.6-1.0: Creative (brainstorming)
top_p: float             # 0.0-1.0 (alternative to temperature)
                         # Lower = focused, Higher = diverse

# EXECUTION LIMITS (Recommended)
steps: integer           # Max agentic iterations (cost control)
                         # Default: unlimited until model stops
```

### 2.2 Tools Configuration

```yaml
tools:
  # Core file operations
  read: boolean          # Read files (default: true)
  write: boolean         # Create new files
  edit: boolean          # Modify existing files
  glob: boolean          # File pattern matching
  grep: boolean          # Content search
  list: boolean          # Directory listing
  
  # Execution
  bash: boolean          # Shell commands
  
  # External
  webfetch: boolean      # Fetch URLs
  websearch: boolean     # Web search
  codesearch: boolean    # Code search
  
  # Agent orchestration
  task: boolean          # Launch subagents
  skill: boolean         # Load skills
  
  # Todo management
  todoread: boolean      # Read todo list
  todowrite: boolean     # Update todo list
  
  # Wildcards
  "mcp_*": boolean       # Enable/disable all MCP tools
```

### 2.3 Permissions Configuration

```yaml
permission:
  # Simple syntax
  edit: "allow" | "ask" | "deny"
  bash: "allow" | "ask" | "deny"
  webfetch: "allow" | "ask" | "deny"
  
  # Granular syntax (glob patterns, last match wins)
  bash:
    "*": "ask"                    # Default: ask for all
    "git status*": "allow"        # Allow git status
    "git log*": "allow"           # Allow git log
    "rm *": "deny"                # Deny all rm commands
    "npm test": "allow"           # Allow npm test
    
  edit:
    "*": "deny"                   # Default: deny all edits
    "src/**/*.ts": "allow"        # Allow editing TypeScript in src/
    "*.config.*": "ask"           # Ask for config files
    
  # Task permissions (which subagents this agent can invoke)
  task:
    "*": "deny"                   # Default: can't invoke others
    "explore": "allow"            # Can invoke explore
    "librarian": "allow"          # Can invoke librarian
```

### 2.4 Skills Configuration

Skills are reusable instruction sets that agents can load on-demand via the `skill` tool.

#### Skill File Structure

```
.opencode/skills/<skill-name>/SKILL.md
~/.config/opencode/skills/<skill-name>/SKILL.md
```

#### SKILL.md Format

```markdown
---
name: skill-name              # Required: 1-64 chars, lowercase, hyphen-separated
description: "Brief description"  # Required: 1-1024 chars
license: MIT                  # Optional
compatibility: opencode       # Optional
metadata:                     # Optional: string-to-string map
  audience: developers
  workflow: implementation
---

## What I do
- Capability 1
- Capability 2

## When to use me
Use this skill when [specific trigger conditions].

## Instructions
[Detailed instructions the agent will follow]
```

#### Skill Name Rules

- 1-64 characters
- Lowercase alphanumeric only
- Single hyphen separators allowed
- Cannot start/end with `-`
- No consecutive `--`
- Must match directory name

Regex: `^[a-z0-9]+(-[a-z0-9]+)*$`

#### Skill Permissions

```yaml
# In opencode.json or agent frontmatter
permission:
  skill:
    "*": "allow"              # Default: allow all
    "internal-*": "deny"      # Deny internal skills
    "experimental-*": "ask"   # Ask for experimental
```

| Permission | Behavior |
|------------|----------|
| `allow` | Skill loads immediately |
| `deny` | Skill hidden, access rejected |
| `ask` | User prompted before loading |

#### Disable Skills for Agent

```yaml
# In agent frontmatter
tools:
  skill: false    # Completely disable skill loading
```

#### Skills Assignment Pattern

```yaml
# When creating subagents, specify relevant skills
skills:
  - name: "bmad-bmm-dev-story"
    trigger: "story implementation"
  - name: "bmad-tea-testarch-atdd"
    trigger: "ATDD workflow"
  - name: "playwright"
    trigger: "browser automation"
```

#### Skill Discovery Locations

| Priority | Location |
|----------|----------|
| 1 | `.opencode/skills/<name>/SKILL.md` (project) |
| 2 | `~/.config/opencode/skills/<name>/SKILL.md` (global) |
| 3 | `.claude/skills/<name>/SKILL.md` (Claude-compatible) |
| 4 | `~/.claude/skills/<name>/SKILL.md` (global Claude) |
| 5 | `.agents/skills/<name>/SKILL.md` (agent-compatible) |
| 6 | `~/.agents/skills/<name>/SKILL.md` (global agent) |

### 2.5 Visual & Metadata

```yaml
# Display properties
hidden: boolean          # Hide from @ autocomplete (default: false)
color: string           # Hex color or theme: "primary", "accent", "warning"
                        # Examples: "#FF5733", "accent"

# BMM metadata (for team orchestration)
displayName: string     # Human name (e.g., "Winston", "Mary")
title: string          # Role title (e.g., "System Architect")
icon: string           # Emoji icon (e.g., "🏗️", "📊")
```

---

## Phase 3: Subagent Templates

### 3.1 Read-Only Research Agent

```yaml
---
name: "researcher"
description: "Explores codebase and gathers information without modifications"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.1
steps: 20
tools:
  read: true
  glob: true
  grep: true
  list: true
  write: false
  edit: false
  bash: false
permission:
  edit: deny
  bash: deny
---

You are a research agent. Your job is to explore, understand, and report.

## Capabilities
- Search files by pattern
- Read and analyze code
- Trace dependencies
- Find patterns across codebase

## Constraints
- NEVER modify files
- NEVER execute commands
- Only observe and report findings

## Output Format
Provide structured findings with:
1. What you found
2. Where you found it (file paths + line numbers)
3. Relevant code snippets
4. Your analysis
```

### 3.2 Implementation Agent

```yaml
---
name: "implementer"
description: "Executes code changes with strict adherence to specifications"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.2
steps: 50
tools:
  read: true
  write: true
  edit: true
  glob: true
  grep: true
  bash: true
permission:
  bash:
    "*": "ask"
    "npm test*": "allow"
    "npm run lint*": "allow"
    "git status": "allow"
    "rm *": "deny"
---

You are an implementation agent. Execute specifications precisely.

## Protocol
1. Read the full specification before starting
2. Implement changes incrementally
3. Run tests after each change
4. Never proceed with failing tests
5. Document all changes made

## Quality Standards
- All tests must pass
- Follow existing code patterns
- No type errors (no `as any`, `@ts-ignore`)
- Clean imports and dependencies
```

### 3.3 Code Review Agent

```yaml
---
name: "code-reviewer"
description: "Performs adversarial code review to find issues"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.1
steps: 30
tools:
  read: true
  glob: true
  grep: true
  write: false
  edit: false
  bash: true
permission:
  edit: deny
  bash:
    "*": "deny"
    "npm test*": "allow"
    "npm run lint*": "allow"
    "git diff*": "allow"
---

You are an adversarial code reviewer. Find problems others missed.

## Review Checklist
- [ ] Type safety (no suppressions)
- [ ] Error handling (no empty catches)
- [ ] Test coverage (all paths tested)
- [ ] Security (input validation, auth)
- [ ] Performance (N+1 queries, memory leaks)
- [ ] Architecture compliance (follows patterns)

## Output Format
For each issue found:
1. **File:Line** - Location
2. **Severity** - Critical/Major/Minor
3. **Issue** - What's wrong
4. **Fix** - Recommended solution
```

### 3.4 Custom Skill Template

```markdown
# .opencode/skills/code-review-checklist/SKILL.md
---
name: code-review-checklist
description: "Comprehensive code review checklist for PR reviews"
license: MIT
compatibility: opencode
metadata:
  audience: reviewers
  workflow: pull-request
---

## What I do
- Guide systematic code review
- Ensure consistent quality checks
- Prevent common issues from reaching main

## When to use me
Use when reviewing pull requests or conducting code audits.

## Review Checklist

### 1. Correctness
- [ ] Logic implements requirements correctly
- [ ] Edge cases handled
- [ ] Error conditions covered

### 2. Security
- [ ] Input validation present
- [ ] No hardcoded secrets
- [ ] Auth/authz enforced

### 3. Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] Resource cleanup

### 4. Maintainability
- [ ] Clear naming
- [ ] Adequate comments
- [ ] Tests included

## Output Format
For each issue: [File:Line] Severity | Issue | Recommendation
```

### 3.5 Party Mode Agent (Multi-Agent Orchestrator)

```yaml
---
description: "Multi-agent conversation orchestrator - brings BMAD agents together for collaborative discussions"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.5
steps: 100
tools:
  read: true
  glob: true
  grep: true
  list: true
  write: false
  edit: false
  bash: false
  task: true      # Can invoke other agents
  skill: true     # Can load skills
permission:
  edit: deny
  bash: deny
  task:
    "*": "allow"  # Can invoke any subagent
---

You are a Party Mode facilitator orchestrating multi-agent discussions.

## Capabilities
- Load agent manifest from `_bmad/_config/agent-manifest.csv`
- Select 2-3 relevant agents per user message
- Generate in-character responses for each agent
- Enable natural cross-talk between agents

## Agent Selection Logic
| Topic Domain | Primary Agents | Complementary |
|--------------|----------------|---------------|
| Architecture | architect | dev, analyst |
| Requirements | analyst, pm | ux-designer |
| Implementation | dev | architect, qa |
| Testing | tea, qa | dev |
| Creative | brainstorming-coach | storyteller |

## Response Format
[Icon] **[Agent Name]**: [In-character response]

## Cross-Talk Patterns
- "As [Agent] mentioned..."
- "Building on [Agent]'s point..."
- "I see it differently than [Agent]..."

## Exit Triggers
`exit`, `goodbye`, `end party`, `quit`
```

**Full implementation**: `.opencode/agents/party-mode.md`

### 3.6 Test Architect Agent

```yaml
---
name: "test-architect"
description: "Designs and implements comprehensive test strategies"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.2
steps: 40
tools:
  read: true
  write: true
  edit: true
  glob: true
  grep: true
  bash: true
permission:
  bash:
    "*": "ask"
    "npm test*": "allow"
    "npx playwright*": "allow"
---

You are a test architect. Design and implement quality gates.

## Principles
- Risk-based testing: depth scales with impact
- Prefer lower test levels (unit > integration > E2E)
- Tests mirror real usage patterns
- Flakiness is critical technical debt

## Test Pyramid
1. Unit tests: Business logic, utilities
2. Integration tests: API endpoints, database
3. E2E tests: Critical user journeys only

## Output
- Test files with meaningful assertions
- Coverage analysis
- Risk assessment
```

---

## Phase 4: Team Composition (Multi-Agent)

### 4.1 Team CSV Format

Reference: `_bmad/bmm/teams/default-party.csv`

```csv
name,displayName,title,icon,role,identity,communicationStyle,principles,module,path
"agent-id","Human Name","Job Title","🔧","Detailed Role","Background/Expertise","How they communicate","Core principles","module-name","path/to/agent.md"
```

### 4.2 Party Mode Orchestration

For complex tasks requiring multiple perspectives:

```yaml
# Team composition for architecture review
team:
  - agent: architect
    role: Lead technical decisions
  - agent: analyst
    role: Business requirements alignment
  - agent: dev
    role: Implementation feasibility
  - agent: tea
    role: Testability assessment

# Discussion protocol
protocol:
  1. Present problem to all agents
  2. Each agent provides perspective
  3. Identify conflicts/gaps
  4. Reach consensus or escalate
```

---

## Phase 5: Generation Rules

### 5.1 When to Create New Subagent

Create a NEW subagent when:
- [ ] Existing agents don't cover the domain
- [ ] Task requires unique combination of tools/permissions
- [ ] Specialized prompt engineering needed
- [ ] Team lacks specific expertise

Do NOT create new subagent when:
- [ ] Existing agent + skill combination works
- [ ] Task is one-time and simple
- [ ] Problem can be solved with direct delegation

### 5.2 Subagent Creation Checklist

```markdown
## Pre-Creation Analysis
- [ ] Problem classified (domain, complexity, scope)
- [ ] Existing agents evaluated
- [ ] Skills inventory checked
- [ ] Tool requirements identified
- [ ] Risk level assessed

## Configuration
- [ ] Name is unique and descriptive
- [ ] Description is concise and actionable
- [ ] Model selected based on task complexity
- [ ] Temperature set appropriately
- [ ] Steps limited for cost control
- [ ] Tools minimized to required only
- [ ] Permissions follow least-privilege
- [ ] Relevant skills assigned

## Prompt Engineering
- [ ] Clear role definition
- [ ] Explicit constraints
- [ ] Output format specified
- [ ] Quality standards defined
- [ ] Edge cases addressed

## Validation
- [ ] Test with sample task
- [ ] Verify tool access works
- [ ] Confirm permissions enforced
- [ ] Check skill loading
```

### 5.3 File Locations

| Content | Location |
|---------|----------|
| OpenCode agents (installed) | `.opencode/agents/{name}.md` |
| BMM source agents | `_bmad/{module}/agents/{name}.md` |
| Team configurations | `_bmad/{module}/teams/default-party.csv` |
| Agent manifest | `_bmad/_config/agent-manifest.csv` |

---

## Phase 6: OpenCode Markdown Format

### 6.1 Agent File Structure

```markdown
---
description: "Brief description of what the agent does"
mode: subagent
model: "anthropic/claude-sonnet-4-20250514"
temperature: 0.2
steps: 30
tools:
  write: true
  edit: true
  bash: true
  read: true
  glob: true
  grep: true
permission:
  edit: allow
  bash:
    "*": "ask"
    "npm *": "allow"
---

{icon} **{title}** - {displayName}

## Role
{role description}

## Identity
{background and expertise}

## Communication Style
{how the agent communicates}

## Principles
- Principle 1
- Principle 2
- Principle 3

## Rules
- Rule 1
- Rule 2
```

### 6.2 Model Selection Guide

| Task Type | Recommended Model | Temperature |
|-----------|-------------------|-------------|
| Code analysis | claude-sonnet | 0.0-0.2 |
| Implementation | claude-sonnet | 0.2-0.3 |
| Architecture | claude-opus | 0.2-0.3 |
| Documentation | claude-sonnet | 0.3-0.4 |
| Brainstorming | claude-sonnet | 0.6-0.8 |
| Quick tasks | claude-haiku | 0.0-0.2 |

### 6.3 Permission Presets

```yaml
# Read-Only Preset
permission_readonly:
  edit: deny
  bash: deny
  webfetch: deny

# Developer Preset
permission_developer:
  edit: allow
  bash:
    "*": "ask"
    "npm *": "allow"
    "git status*": "allow"

# Restricted Preset
permission_restricted:
  edit: ask
  bash:
    "*": "deny"
    "npm test": "allow"
```

---

## Quick Reference

### Subagent Generation Flow

```
1. ANALYZE PROBLEM
   └── Classify domain, complexity, scope
   
2. CHECK EXISTING RESOURCES
   ├── Existing agents → delegate_task()
   └── Existing skills → load_skills=[]

3. IF NEW AGENT NEEDED
   ├── Define identity (name, description, role)
   ├── Configure model (provider, temperature, steps)
   ├── Set tools (minimal required)
   ├── Configure permissions (least privilege)
   ├── Assign skills (domain expertise)
   └── Write prompt (clear, constrained)

4. VALIDATE
   ├── Test with sample task
   └── Verify permissions enforced

5. DOCUMENT
   └── Add to agent-manifest.csv if persistent
```

### Key Principles

1. **Problem-First**: Always analyze before creating
2. **Minimal Tools**: Only enable what's needed
3. **Least Privilege**: Restrict by default, allow explicitly
4. **Clear Prompts**: Explicit > implicit
5. **Cost Control**: Set `steps` limit
6. **Reuse First**: Check existing agents/skills before creating new

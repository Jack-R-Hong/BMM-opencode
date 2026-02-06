# Step 1: Initialize Dev Team Mode

<critical>Read sprint-status.yaml and execute TWO mandatory selection prompts</critical>
<critical>Selection 1: Epic choice (continue/select/autopilot)</critical>
<critical>Selection 2: Execution mode (parallel/sequential)</critical>
<critical>DO NOT skip either selection - both are required before proceeding</critical>

## EXECUTION PROTOCOL

### 1.1 Locate Sprint Status File

<action>Read {sprint_status_file}</action>

<check if="file not found">
  <output>
❌ **sprint-status.yaml not found**

Dev Team Mode requires sprint-status.yaml to orchestrate development.

**To create:** Run `/bmad-bmm-sprint-planning`

**Prerequisites:**
- Epic files in {planning_artifacts}/
- Stories defined within epics
  </output>
  <halt reason="Missing sprint-status.yaml" />
</check>

### 1.2 Parse Sprint Status

<action>Parse development_status section into structured data:</action>

```yaml
# Classification rules:
epic_pattern: "epic-{N}"           # Epic entries
retro_pattern: "epic-{N}-retrospective"  # Retrospective entries  
story_pattern: "{N}-{M}-{name}"    # Story entries

# Build epic_summary object:
epics:
  epic-1:
    status: "in-progress|backlog|done"
    stories: [{key, status}]
    stats: {total, done, ready, in_progress, review, backlog}
```

### 1.3 Display Status Summary

<output>
## 🚀 Dev Team Mode - Sprint Overview

**Project:** {{project}}
**Generated:** {{generated}}

### Epic Status
{{#each epics}}
**{{key}}** ({{status}}) - {{stats.done}}/{{stats.total}} done | {{stats.ready}} ready | {{stats.in_progress}} in-progress | {{stats.review}} review
{{/each}}

### Progress: {{total_done}}/{{total_stories}} ({{completion_percentage}}%)
</output>

---

## SELECTION 1: Epic Choice (MANDATORY)

<action>Determine recommendation based on state:</action>

| Condition | Recommended |
|-----------|-------------|
| Story in `in-progress` | Option 1 (Continue) |
| Story in `review` | Option 1 (Continue) |
| Stories in `ready-for-dev` | Option 2 (Select) |
| All `done` | Exit with congratulations |
| All `backlog` | Halt - need create-story |

<ask>
## Selection 1: Epic Choice

**How do you want to select the epic?**

[1] **Continue** - Resume epic with in-progress/review stories
[2] **Select** - Manually choose a specific epic
[3] **Autopilot** - Auto-select and run continuously until all epics complete

{{#if recommended}}💡 Recommended: {{recommended_option}} - {{recommended_reason}}{{/if}}

Enter [1], [2], [3], or epic name directly:
</ask>

### Handle Selection 1

<switch on="user_choice">
  <case value="1">
    <action>Set selected_epic = epic with in-progress/review stories</action>
    <action>Set epic_mode = "continue"</action>
  </case>
  
  <case value="2">
    <output>
**Available Epics:**
{{#each epics}}
- **{{key}}**: {{status}} ({{stats.ready}} ready, {{stats.done}}/{{stats.total}} done)
{{/each}}
    </output>
    <ask>Enter epic name:</ask>
    <action>Set selected_epic = user input</action>
    <action>Set epic_mode = "selected"</action>
  </case>
  
  <case value="3">
    <action>Set selected_epic = first epic with ready-for-dev (prioritize in-progress)</action>
    <action>Set epic_mode = "autopilot"</action>
    <action>Set autopilot = true</action>
  </case>
  
  <case value="epic-*">
    <action>Validate epic exists</action>
    <action>Set selected_epic = user input</action>
    <action>Set epic_mode = "selected"</action>
  </case>
</switch>

<validate>
  <check if="selected_epic not found">
    <output>❌ Epic not found. Available: {{epic_list}}</output>
    <action>Re-prompt Selection 1</action>
  </check>
</validate>

---

## SELECTION 2: Execution Mode (MANDATORY)

<action>Count actionable stories in selected_epic:</action>

```yaml
actionable:
  ready_for_dev: [list]
  in_progress: [list]
  review: [list]
  total: count
```

<ask>
## Selection 2: Execution Mode

**{{selected_epic}}** has **{{actionable.total}}** actionable stories

**How do you want to execute?**

[1] **Parallel** - Run up to {{max_parallel_agents}} stories simultaneously
    ✅ Faster completion
    ⚠️ Potential merge conflicts
    Best for: Independent stories, no dependencies

[2] **Sequential** - Run one story at a time
    ✅ Stable, no conflicts
    ✅ Each story can reference previous implementation
    Best for: Dependent stories, complex logic

{{#if actionable.total > 1}}💡 Recommended: Parallel - multiple parallelizable stories{{else}}💡 Recommended: Sequential - only one story{{/if}}

Enter [1] or [2]:
</ask>

### Handle Selection 2

<switch on="user_choice">
  <case value="1">
    <action>Set parallel_mode = true</action>
    <action>Set execution_mode = "parallel"</action>
  </case>
  
  <case value="2">
    <action>Set parallel_mode = false</action>
    <action>Set execution_mode = "sequential"</action>
  </case>
</switch>

---

## 1.4 Validate Epic

<check if="no actionable stories (ready-for-dev, in-progress, or review)">
  <output>
⚠️ **{{selected_epic}} has no actionable stories**

Stories are either `backlog` (need create-story) or `done`.

[1] Run `/bmad-bmm-create-story`
[2] Select different epic
[3] Exit
  </output>
  <ask>Choose [1], [2], or [3]:</ask>
</check>

---

## 1.5 Initialize State

<action>Set frontmatter state:</action>

```yaml
workflowType: 'dev-team-mode'
selected_epic: '{{selected_epic}}'
epic_mode: '{{epic_mode}}'
execution_mode: '{{execution_mode}}'
parallel_mode: {{parallel_mode}}
autopilot: {{autopilot}}
max_parallel_agents: {{max_parallel_agents}}
parallel_stories: []
active_agents: []
completed_stories: []
failed_stories: []
retry_counts: {}
loop_count: 0
phase: 'analyzing'
started_at: '{{date}}'
```

<output>
## ✅ Dev Team Mode Initialized

| Setting | Value |
|---------|-------|
| Epic | {{selected_epic}} |
| Epic Mode | {{epic_mode}} |
| Execution Mode | {{execution_mode}} |
| Parallel | {{#if parallel_mode}}Yes (max {{max_parallel_agents}}){{else}}No (sequential){{/if}} |
| Actionable Stories | {{actionable.total}} |

Proceeding to parallelism analysis...
</output>

<action>Load: ./step-02-analyze.md</action>

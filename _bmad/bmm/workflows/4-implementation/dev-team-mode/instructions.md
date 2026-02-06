# Dev Team Mode - Parallel Development Orchestrator

<critical>Workflow engine: {project-root}/_bmad/core/tasks/workflow.xml</critical>
<critical>Config loaded from: {installed_path}/workflow.yaml</critical>
<critical>Language: {communication_language}</critical>

## WORKFLOW OVERVIEW

```
┌─────────────────────────────────────────────────────────────┐
│                     DEV TEAM MODE                           │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │  INIT    │───▶│ ANALYZE  │───▶│ PARALLEL │             │
│   │  Step 1  │    │  Step 2  │    │   DEV    │             │
│   │          │    │          │    │  Step 3  │             │
│   │ 2 prompts│    │dependency│    │          │             │
│   └──────────┘    └──────────┘    └────┬─────┘             │
│                                         │                   │
│   ┌──────────┐    ┌──────────┐    ┌────▼─────┐             │
│   │  SYNC    │◀───│ PARALLEL │◀───│  REVIEW  │             │
│   │  Step 5  │    │  REVIEW  │    │  Step 4  │             │
│   │          │    │  Step 4  │    │          │             │
│   │loop/exit │    │          │    │adversarial│            │
│   └────┬─────┘    └──────────┘    └──────────┘             │
│        │                                                    │
│        ▼                                                    │
│   Continue → Step 2  OR  Exit                              │
└─────────────────────────────────────────────────────────────┘
```

## ENTRY POINT

### Check Saved State

<action>Check for {implementation_artifacts}/dev-team-mode-state.yaml</action>

<check if="saved state exists">
  <output>
## 🔄 Previous Session Found

Saved: {{timestamp}}
Epic: {{selected_epic}}
Progress: {{completed_count}} completed
  </output>
  
  <ask>
[1] **Resume** - Continue from saved state
[2] **Fresh** - Ignore saved, start new
[3] **Delete** - Remove saved state, start new

Choose:
  </ask>
  
  <routing>
    <if value="1">Restore state, load resume_step</if>
    <else>Delete saved state, continue fresh</else>
  </routing>
</check>

### Fresh Start

<load>./steps/step-01-init.md</load>

---

## STEP SEQUENCE

| Step | Purpose | Key Actions |
|------|---------|-------------|
| 1 | Init | 2 selection prompts: epic choice + execution mode |
| 2 | Analyze | Dependency analysis, build parallel batch |
| 3 | Dev | Launch dev-story subagents (background) |
| 4 | Review | Launch code-review subagents (different LLM) |
| 5 | Sync | Update status, loop or exit decision |

---

## TWO-STEP SELECTION (Step 1)

### Selection 1: Epic Choice

| Option | Behavior |
|--------|----------|
| Continue | Resume epic with in-progress/review stories |
| Select | Manual epic selection |
| Autopilot | Auto-select, run until all epics done |

### Selection 2: Execution Mode

| Option | Behavior |
|--------|----------|
| Parallel | Multiple stories concurrent (up to max_parallel_agents) |
| Sequential | One story at a time |

---

## CONFIGURATION

| Setting | Default | Description |
|---------|---------|-------------|
| `max_parallel_agents` | 3 | Max concurrent agents |
| `max_retry_per_story` | 3 | Retries before blocking |
| `dev_category` | deep | delegate_task category for dev |
| `review_category` | ultrabrain | delegate_task category for review |

---

## SUBAGENT DELEGATION

### Dev-Story

```javascript
delegate_task({
  category: "deep",
  load_skills: ["bmad-bmm-dev-story"],
  run_in_background: true,
  prompt: "..."
});
```

### Code-Review

```javascript
delegate_task({
  category: "ultrabrain",
  load_skills: ["bmad-bmm-code-review"],
  run_in_background: true,
  prompt: "..."
});
```

---

## STATE SCHEMA

```yaml
workflowType: 'dev-team-mode'
selected_epic: ''
epic_mode: ''           # continue|selected|autopilot
execution_mode: ''      # parallel|sequential
parallel_mode: false
autopilot: false
parallel_stories: []
stories_to_review: []
blocked_stories: []
active_agents: []
completed_stories: []
failed_stories: []
retry_counts: {}
loop_count: 0
phase: 'init'           # init|analyzing|dev|dev-running|review|review-running|sync
started_at: ''
```

---

## EXIT CONDITIONS

### Automatic Triggers
- `*exit`, `stop`, `quit`, `end team`
- All stories in epic done
- All remaining stories blocked

### Graceful Exit
1. Save state to sprint-status.yaml
2. Display summary
3. Optionally save resumable state
4. Clean up

---

## ERROR HANDLING

| Failure | Action |
|---------|--------|
| Dev fails | Retry up to max_retry_per_story |
| Review fails | Retry with session context |
| Timeout | Mark needs-retry, continue |
| Critical | Block, alert user |

---

## INTEGRATION

| Trigger | Workflow |
|---------|----------|
| No sprint-status | `/bmad-bmm-sprint-planning` |
| Stories in backlog | `/bmad-bmm-create-story` |
| Epic complete | `/bmad-bmm-retrospective` |
| Check progress | `/bmad-bmm-sprint-status` |

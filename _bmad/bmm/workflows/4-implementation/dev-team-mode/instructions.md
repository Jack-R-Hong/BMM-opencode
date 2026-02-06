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
| 1 | Init | 3 selection prompts: epic choice + execution mode + session goal |
| 2 | Analyze | Dependency analysis, build parallel batch |
| 3 | Dev | Launch dev-story subagents (background), track story↔session |
| 4 | Review | Launch code-review subagents (different LLM), track story↔session |
| 5 | Sync | Update status, display story sessions, loop or exit decision |

---

## THREE-STEP SELECTION (Step 1)

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
| Delegate | Dependency-aware auto-scheduling using `depends_on` from sprint-status.yaml. Launches independent stories in parallel, auto-unblocks dependents as stories complete. Regressed stories (sent back by review) get priority. |

### Selection 3: Session Goal

User declares the completion goal for this dev-team-mode session. Displayed in all summaries and exit screens.

---

## CONFIGURATION

| Setting | Default | Description |
|---------|---------|-------------|
| `max_parallel_agents` | 3 | Max concurrent agents |
| `max_retry_per_story` | 3 | Retries before blocking |
| `dev_agent` | bmm-dev | Primary agent for dev-story (Sonnet) |
| `dev_agent_fallbacks` | [bmm-dev] | Fallback agents if dev_agent model unavailable |
| `review_agent` | bmm-dev-reviewer | Primary agent for code-review (Opus) |
| `review_agent_fallbacks` | [bmm-dev] | Fallback agents if review_agent model unavailable |

---

## SUBAGENT DELEGATION

### Dev-Story

```javascript
// Fallback chain: [dev_agent, ...dev_agent_fallbacks]
delegate_task({
  subagent_type: "bmm-dev",           // Sonnet - fast, accurate code generation
  load_skills: ["bmad-bmm-dev-story"],
  run_in_background: true,
  prompt: "..."
});
```

### Code-Review

```javascript
// Fallback chain: [review_agent, ...review_agent_fallbacks]
delegate_task({
  subagent_type: "bmm-dev-reviewer",  // Opus - deep reasoning for adversarial review
  load_skills: ["bmad-bmm-code-review"],
  run_in_background: true,
  prompt: "..."
});
```

### Agent Fallback Behavior

When the primary agent's model is unavailable (capacity exhausted, provider down), the workflow automatically tries the next agent in the fallback chain. The fallback chain is:

| Role | Primary | Fallback | Model Flow |
|------|---------|----------|------------|
| Dev | `bmm-dev` | `bmm-dev` | Sonnet → Sonnet |
| Review | `bmm-dev-reviewer` | `bmm-dev` | Opus → Sonnet |

---

## MONITORING BACKGROUND AGENTS

When agents are running in background, the workflow displays a progress table with **Task ID** and **Session ID** for each agent. Users can check any agent's real-time progress:

```
background_output(task_id="<task_id>")
```

This returns the agent's current status, latest tool calls, and output so far — allowing you to monitor what each dev-story or code-review agent is doing without waiting for completion.

---

## STATE SCHEMA

```yaml
workflowType: 'dev-team-mode'
session_goal: ''            # user-declared completion goal
selected_epic: ''
epic_mode: ''             # continue|selected|autopilot
execution_mode: ''        # parallel|sequential|delegate
parallel_mode: false
delegate_mode: false
autopilot: false
dependency_graph: {}
parallel_stories: []
stories_to_review: []
blocked_stories: []
regressed_stories: []
active_agents: []
completed_stories: []
failed_stories: []
retry_counts: {}
story_sessions: {}        # story_key → { dev_session_id, review_session_id, dev_task_id, review_task_id }
loop_count: 0
phase: 'init'             # init|analyzing|dev|dev-running|review|review-running|sync
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

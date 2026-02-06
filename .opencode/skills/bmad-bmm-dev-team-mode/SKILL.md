---
name: bmad-bmm-dev-team-mode
description: "Orchestrate parallel development of multiple stories within an epic. Reads sprint-status.yaml, asks which epic to work on, spawns parallel dev-story and code-review subagents, and loops until epic completion."
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "dev-team-mode"
  standalone: "false"
---
# Dev Team Mode
Parallel development orchestrator: sprint-status.yaml -> epic selection -> parallel dev-story + code-review subagents -> loop until epic done.

**Author:** BMad

## How to Use
This skill provides a structured workflow. Follow the steps below:

## Instructions
# Dev Team Mode - Parallel Development Orchestrator
<critical>Workflow engine: {project-root}/_bmad/core/tasks/workflow.xml</critical>
<critical>Config loaded from: {installed_path}/workflow.yaml</critical>
<critical>Language: {communication_language}</critical>

## FLOW
```
INIT(Step1) -> ANALYZE(Step2) -> DEV(Step3) -> REVIEW(Step4) -> SYNC(Step5) -> loop to Step2 or Exit
```

## ENTRY POINT
<action>Check for {implementation_artifacts}/dev-team-mode-state.yaml</action>
<check if="saved state exists">
<output>
## Previous Session Found
Saved:{{timestamp}} Epic:{{selected_epic}} Progress:{{completed_count}} completed
</output>
<ask>[1]Resume [2]Fresh [3]Delete saved state - Choose:</ask>
<routing><if value="1">Restore state, load resume_step</if><else>Delete saved state, continue fresh</else></routing>
</check>

---
## STEP 1: INIT
<critical>Read sprint-status.yaml. Execute THREE mandatory selection prompts.</critical>

### 1.1 Locate & Parse Sprint Status
<action>Read {sprint_status_file}</action>
<check if="file not found"><output>sprint-status.yaml not found. Run `/bmad-bmm-sprint-planning` first.</output><halt/></check>
<action>Parse development_status: classify epics (epic-{N}), stories ({N}-{M}-{name}), build epic_summary with stats {total,done,ready,in_progress,review,backlog}</action>

### 1.2 Display Status
<output>
## Dev Team Mode - Sprint Overview
**Project:** {{project}} | **Generated:** {{generated}}
### Epic Status
{{#each epics}}**{{key}}** ({{status}}) - {{stats.done}}/{{stats.total}} done | {{stats.ready}} ready | {{stats.in_progress}} in-progress | {{stats.review}} review{{/each}}
### Progress: {{total_done}}/{{total_stories}} ({{completion_percentage}}%)
</output>

### SELECTION 1: Epic Choice (MANDATORY)
Recommendation logic: in-progress/review stories->Continue | ready-for-dev->Select | all done->Exit | all backlog->Halt(need create-story)

<ask>
## Selection 1: Epic Choice
[1] **Continue** - Resume epic with in-progress/review stories
[2] **Select** - Manually choose epic
[3] **Autopilot** - Auto-select, run until all done
{{#if recommended}}Recommended: {{recommended_option}} - {{recommended_reason}}{{/if}}
Enter [1],[2],[3], or epic name:
</ask>
<switch on="user_choice">
<case value="1">selected_epic=epic with in-progress/review; epic_mode="continue"</case>
<case value="2">Show available epics, ask user; epic_mode="selected"</case>
<case value="3">selected_epic=first epic with ready-for-dev(prioritize in-progress); epic_mode="autopilot"; autopilot=true</case>
<case value="epic-*">Validate exists; epic_mode="selected"</case>
</switch>

### SELECTION 2: Execution Mode (MANDATORY)
<action>Count actionable stories. Check if sprint-status has depends_on data.</action>
<ask>
## Selection 2: Execution Mode
**{{selected_epic}}** has **{{actionable.total}}** actionable stories
[1] **Parallel** - Up to {{max_parallel_agents}} concurrent. Fast but potential merge conflicts.
[2] **Sequential** - One at a time. Stable, each references previous.
[3] **Delegate** - Dependency-aware auto-scheduling via `depends_on`. Max parallelism respecting graph. Regressed stories get priority.
{{#if has_depends_on}}Recommended: Delegate{{else if actionable.total > 1}}Recommended: Parallel{{else}}Recommended: Sequential{{/if}}
Enter [1],[2],[3]:
</ask>
<switch on="user_choice">
<case value="1">parallel_mode=true; execution_mode="parallel"; delegate_mode=false</case>
<case value="2">parallel_mode=false; execution_mode="sequential"; delegate_mode=false</case>
<case value="3">parallel_mode=true; execution_mode="delegate"; delegate_mode=true</case>
</switch>

### SELECTION 3: Session Goal (MANDATORY)
<ask>
## Selection 3: Session Goal
What is the completion goal? Examples: "Complete all stories in epic-2", "Finish 2-1 and 2-2, get 2-3 to review"
Enter goal:
</ask>
<action>Set session_goal = user input</action>

### 1.3 Validate & Initialize
<check if="no actionable stories">Offer: [1]create-story [2]different epic [3]exit</check>
<action>Initialize state (see STATE SCHEMA). Set phase='analyzing'.</action>
<output>
## Initialized
| Setting | Value |
|---------|-------|
| Goal | {{session_goal}} |
| Epic | {{selected_epic}} ({{epic_mode}}) |
| Execution | {{execution_mode}} |
| Parallel | {{#if parallel_mode}}Yes(max {{max_parallel_agents}}){{else}}No{{/if}} |
| Delegate | {{#if delegate_mode}}Yes{{else}}No{{/if}} |
| Actionable | {{actionable.total}} |
</output>

---
## STEP 2: ANALYZE
<critical>Determine which stories run concurrently. Never exceed max_parallel_agents. Respect dependencies.</critical>

### 2.0 Apply Mode
parallel: effective_max_parallel={{max_parallel_agents}} | sequential: effective_max_parallel=1 | delegate: effective_max_parallel={{max_parallel_agents}}

### 2.1 Gather & Categorize Stories
Filter by {{selected_epic}}. Priority order: 1)in-progress 2)review 3)ready-for-dev 4)backlog 5)done(skip)

### 2.2 Handle In-Progress
<check if="in-progress stories exist">
If sequential: batch=[first in_progress], skip to 2.6.
If parallel: ask [1]Focus on in-progress(recommended) [2]Add to batch [3]Skip(mark blocked)
</check>

### 2.3 Handle Review Stories
<check if="review stories exist">
Ask [1]Review first [2]Parallel review+dev [3]Skip reviews
</check>

### 2.4 Analyze Dependencies
<check if="delegate_mode">Read depends_on from sprint-status.yaml entries. Build dependency_graph. Display graph.</check>
<check if="!delegate_mode">Detect dependencies from: explicit depends_on, dev notes references, technical inference (DB schema/API creators->consumers).</check>
Classify: parallelizable(no deps or all deps done) | blocked(unmet deps)

**Dependency Regression Rule:** Dependency met ONLY when status=done. If dependency regresses: not-started->stay blocked, running->let finish then re-block, in-review->complete review then re-queue. Regressed stories get priority. Stories with most downstream dependents sort first.

### 2.5 Build Batch
```python
parallelizable.sort(key=(-regressed, -downstream_dependents, story_number))
dev_batch = parallelizable[:effective_max_parallel]
```

### 2.6 Present Plan & Confirm
Display: dev batch (stories+reasons), review batch, blocked stories, summary (agents/estimated iterations).
<check if="!autopilot"><ask>[Y]Proceed [M]Modify selection [X]Exit</ask></check>

### 2.7 Update State
Set parallel_stories, stories_to_review, blocked_stories, phase='dev'.
Route: review_first->Step4 | dev_stories->Step3 | none->halt(need create-story)

---
## STEP 3: PARALLEL DEV
<critical>Launch dev-story subagents with run_in_background=true. Track task_ids and session_ids.</critical>

### 3.1 Build Prompt (per story)
```
TASK: Implement story {{story_key}} using TDD red-green-refactor
STORY_PATH: {{story_path}}
EXPECTED_OUTCOME: All tasks [x], acceptance criteria met, tests pass, status="review", sprint-status updated
CONTEXT: Project:{project_context} Sprint:{sprint_status_file} Epic:{{selected_epic}}
MUST DO: 1)Read COMPLETE story 2)Follow tasks EXACTLY 3)Failing tests first(red) 4)Minimal code(green) 5)Refactor 6)Update File List 7)Update Dev Agent Record 8)Set status="review" 9)Update sprint-status
MUST NOT: 1)Skip tests 2)Modify unrelated code 3)Use 'as any'/'@ts-ignore' 4)Leave broken state 5)Mark [x] without implementation
HALT IF: 3 consecutive failures, missing config, ambiguous requirements
```

### 3.2 Launch Agents
```javascript
// Fallback chain: [dev_agent, ...dev_agent_fallbacks]
for (const story of dev_batch) {
  for (const agent of agentChain) {
    try {
      result = delegate_task({ subagent_type: agent, load_skills: ["bmad-bmm-dev-story"], run_in_background: true, prompt: buildPrompt(story) });
      active_agents.push({ task_id: result.task_id, session_id: result.session_id, story_key: story.key, agent_used: agent, phase: "dev-story", status: "running" });
      story_sessions[story.key] = { ...story_sessions[story.key], dev_session_id: result.session_id, dev_task_id: result.task_id };
      break;
    } catch (e) { if (MODEL_CAPACITY/UNAVAILABLE) continue; throw e; }
  }
}
```
Set phase='dev-running'.

### 3.3 Monitor
Display progress table per agent: story_key, agent_used, session_id, task_id, status, duration.
Show `background_output(task_id="...")` command for each.
Wait for background_task_completed notifications. On notification: get output, parse, update status.

### 3.4 Process Results
Success(status=review, tasks [x], tests pass): move to completed_stories.
Failure(HALT/error/incomplete): increment retry_counts. If < max_retry: add to retry_queue. If >= max_retry: move to failed_stories.

### 3.5 Retries
```javascript
delegate_task({ session_id: original_session_id, prompt: "RETRY: Previous failed: {{error}}. Fix and continue from failure point." });
```

### 3.6 Batch Complete
When all agents done: display results summary (completed/failed). Set phase='review'. Go Step4.
Sync sprint-status.yaml: completed stories -> "review".

---
## STEP 4: PARALLEL REVIEW
<critical>Launch code-review subagents. Handle: approved->done, needs-fixes->re-dev, blocked->manual.</critical>

### 4.1 Gather Review Stories
From completed dev batch + existing review status. If empty -> Step5.

### 4.2 Build Review Prompt (per story)
```
TASK: ADVERSARIAL code review for {{story_key}}
STORY_PATH: {{story_path}}
EXPECTED_OUTCOME: Find 3-10 issues(NEVER "looks good"). Categorize HIGH/MEDIUM/LOW. MEDIUM+LOW: fix directly during review. HIGH: fix if possible, else create action item. Status: "done" if no unfixed HIGH, else "in-progress". Sync sprint-status.
REVIEW SCOPE: 1)Verify claims(tasks [x] implemented? acceptance criteria? File List?) 2)Code quality(security, performance, error handling, test quality) 3)Architecture compliance(project-context patterns, no rogue deps, separation of concerns)
MUST DO: 1)Read COMPLETE story 2)Verify EVERY [x] task 3)Check git diff vs File List 4)Find MIN 3 issues 5)Fix ALL MEDIUM/LOW directly 6)Attempt HIGH fixes 7)Update status
MUST NOT: 1)Accept "looks good" 2)Ignore security 3)Skip test review 4)Defer MEDIUM/LOW 5)Leave unfixed HIGH without action items
```

### 4.3 Launch Review Agents
```javascript
// Fallback chain: [review_agent, ...review_agent_fallbacks]
for (const story of stories_to_review) {
  for (const agent of agentChain) {
    try {
      result = delegate_task({ subagent_type: agent, load_skills: ["bmad-bmm-code-review"], run_in_background: true, prompt: buildReviewPrompt(story) });
      review_agents.push({ task_id: result.task_id, session_id: result.session_id, story_key: story.key, agent_used: agent, phase: "code-review", status: "running" });
      story_sessions[story.key] = { ...story_sessions[story.key], review_session_id: result.session_id, review_task_id: result.task_id };
      break;
    } catch (e) { if (MODEL_CAPACITY/UNAVAILABLE) continue; throw e; }
  }
}
```
Set phase='review-running'. Display progress table with session quick links (dev+review sessions per story).

### 4.4 Process Review Results
| Outcome | Condition | Action |
|---------|-----------|--------|
| approved | No unfixed HIGH (MEDIUM/LOW fixed in place) | -> done_stories, sprint-status="done" |
| needs-fixes | Unfixed HIGH remains | -> needs_redev_queue |
| blocked | Critical, cannot proceed | -> blocked_stories |

### 4.5 Handle Re-Dev
<check if="needs_redev AND autopilot">Auto re-run dev-story via session_id with only unfixed HIGH items.</check>
<check if="needs_redev AND !autopilot">Ask [1]Auto-fix [2]Skip [3]Manual exit</check>
Re-dev prompt: `RESUME: Review found HIGH issues. MEDIUM/LOW already fixed. UNFIXED HIGH: {{items}}. Fix all, update tests, status back to "review".`
After re-dev -> queue for another review cycle.

### 4.6 Batch Complete
Display summary (done/needs-redev/blocked). Sync sprint-status. Set phase='sync'. Go Step5.

---
## STEP 5: SYNC & LOOP
<critical>Refresh sprint-status (authoritative source). Evaluate completion. Loop or exit.</critical>

### 5.1 Refresh & Recalculate
Re-read sprint-status.yaml. Calculate: total, done, in_progress, review, ready_for_dev, backlog, blocked, completion%.

### 5.2 Display Loop Summary
Increment loop_count. Show:
- Session goal
- Status table (done/in-progress/review/ready/backlog/blocked with story lists)
- Progress bar
- Story sessions (dev_session_id + review_session_id per story)
- Loop stats (dev cycles, review cycles, completed this loop, retries)

### 5.3 Evaluate Completion
| Condition | Result |
|-----------|--------|
| All done | Epic complete -> 5.6 |
| All remaining blocked | Epic blocked -> 5.7 |
| Has review/ready-for-dev | Continue -> 5.4 |
| Only backlog | Need create-story -> 5.5 |

### 5.3.1 Delegate Mode Re-evaluation
<check if="delegate_mode">
Identify regressed stories (was done/review, now in-progress). Re-block downstream dependents. Mark regressed for priority. Identify newly unblocked (all depends_on now done). Auto-continue to Step2.
</check>

### 5.4 Continue Loop
<check if="autopilot">Auto-continue to Step2.</check>
<check if="!autopilot">
<ask>[1]Continue(next batch) [2]Pause(save state) [3]Switch epic [4]Exit - Choose:</ask>
Route: 1->Step2 | 2->5.8 | 3->Step1 | 4->5.9
</check>

### 5.5 Need Story Creation
All actionable done, only backlog remains. Offer [1]Run create-story [2]Switch epic [3]Exit.

### 5.6 Epic Complete
Display: session goal, statistics (stories/loops/dev cycles/review cycles/duration), completed stories with session IDs.
Update sprint-status: epic="done". Offer [1]Retrospective [2]Next epic [3]Exit.

### 5.7 Epic Blocked
Display blocked stories with reasons and retry counts. Offer [1]Details [2]Switch epic [3]Exit.

### 5.8 Save & Pause
Save state to {implementation_artifacts}/dev-team-mode-state.yaml (all state fields + phase="paused" + resume_step="step-02-analyze"). Display progress.

### 5.9 Graceful Exit
Display: session goal, session summary (epic/loops/completed/remaining), all story sessions. Suggest `/bmad-bmm-sprint-status`.

---
## CONFIGURATION
| Setting | Default | Description |
|---------|---------|-------------|
| max_parallel_agents | 3 | Max concurrent agents |
| max_retry_per_story | 3 | Retries before blocking |
| dev_agent | bmm-dev | Primary dev agent (Sonnet) |
| dev_agent_fallbacks | [bmm-dev] | Fallback if dev model unavailable |
| review_agent | bmm-dev-reviewer | Primary review agent (Opus) |
| review_agent_fallbacks | [bmm-dev] | Fallback if review model unavailable |

## AGENT FALLBACK
| Role | Primary | Fallback | Model Flow |
|------|---------|----------|------------|
| Dev | bmm-dev | bmm-dev | Sonnet->Sonnet |
| Review | bmm-dev-reviewer | bmm-dev | Opus->Sonnet |

## STATE SCHEMA
```yaml
workflowType: 'dev-team-mode'
session_goal: ''
selected_epic: ''
epic_mode: ''              # continue|selected|autopilot
execution_mode: ''         # parallel|sequential|delegate
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
story_sessions: {}         # story_key -> {dev_session_id,review_session_id,dev_task_id,review_task_id}
loop_count: 0
phase: 'init'              # init|analyzing|dev|dev-running|review|review-running|sync
started_at: ''
```

## EXIT CONDITIONS
Triggers: `*exit`,`stop`,`quit`,`end team` | All stories done | All remaining blocked
Graceful: 1)Save sprint-status 2)Display summary 3)Optionally save resumable state 4)Clean up

## ERROR HANDLING
| Failure | Action |
|---------|--------|
| Dev fails | Retry up to max_retry_per_story |
| Review fails | Retry with session context |
| Timeout | Mark needs-retry, continue |
| Critical | Block, alert user |

## INTEGRATION
| Trigger | Workflow |
|---------|----------|
| No sprint-status | `/bmad-bmm-sprint-planning` |
| Stories in backlog | `/bmad-bmm-create-story` |
| Epic complete | `/bmad-bmm-retrospective` |
| Check progress | `/bmad-bmm-sprint-status` |
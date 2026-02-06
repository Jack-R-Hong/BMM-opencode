# Step 5: Sync Status and Loop Decision

<critical>Refresh sprint-status.yaml to get authoritative state</critical>
<critical>Evaluate epic completion: all done? blocked? more work?</critical>
<critical>Loop decision: continue, pause, switch epic, or exit</critical>
<critical>If autopilot=true, continue automatically until epic complete</critical>

## EXECUTION PROTOCOL

### 5.1 Refresh Sprint Status

<action>Re-read sprint-status.yaml (authoritative source):</action>

```javascript
const sprintStatus = readFile(sprint_status_file);
const epicStories = filterByEpic(sprintStatus, selected_epic);
```

<action>Recalculate statistics:</action>

```yaml
epic_progress:
  epic: "{{selected_epic}}"
  total: {{count}}
  done: {{done_count}}
  in_progress: {{in_progress_count}}
  review: {{review_count}}
  ready_for_dev: {{ready_count}}
  backlog: {{backlog_count}}
  blocked: {{blocked_count}}
  completion: {{(done / total) * 100}}%
```

---

### 5.2 Display Loop Summary

<action>Increment loop_count</action>

<output>
## 📊 Loop {{loop_count}} Complete

### Epic: {{selected_epic}}

| Status | Count | Stories |
|--------|-------|---------|
| ✅ Done | {{done_count}} | {{done_list}} |
| 🔄 In Progress | {{in_progress_count}} | {{in_progress_list}} |
| 📋 Review | {{review_count}} | {{review_list}} |
| 📝 Ready | {{ready_count}} | {{ready_list}} |
| 📦 Backlog | {{backlog_count}} | {{backlog_list}} |
| ❌ Blocked | {{blocked_count}} | {{blocked_list}} |

### Progress
```
[{{progress_bar}}] {{completion}}%
```

### This Loop
- Dev cycles: {{dev_cycles}}
- Review cycles: {{review_cycles}}
- Stories completed: {{completed_this_loop}}
- Retries: {{retries_this_loop}}
</output>

---

### 5.3 Evaluate Completion

<action>Check epic state:</action>

| Condition | Result |
|-----------|--------|
| All stories `done` | Epic complete 🎉 |
| All remaining `blocked` | Epic blocked |
| Has `review` stories | Continue review |
| Has `ready-for-dev` or `in-progress` | Continue dev |
| Only `backlog` remains | Need create-story |

<routing>
  <if condition="all stories done">
    <goto step="5.6" label="Epic Completion" />
  </if>
  <else-if condition="all remaining blocked">
    <goto step="5.7" label="Epic Blocked" />
  </else-if>
  <else-if condition="has review or ready-for-dev">
    <goto step="5.4" label="Continue Loop" />
  </else-if>
  <else-if condition="only backlog">
    <goto step="5.5" label="Need Story Creation" />
  </else-if>
</routing>

---

### 5.3.1 Context Summarization (Delegated Mode)

<check if="delegated_mode == true">
  <action>Compact context to prevent overflow in long-running loops:</action>
  
  Discard from context:
  - Raw agent outputs from previous loops
  - Verbose error traces (keep one-line summaries)
  - Intermediate status displays
  
  Retain only:
  ```yaml
  loop_history:
    - loop: {{loop_count}}
      dev_completed: [story-keys...]
      dev_failed: [story-keys...]
      review_approved: [story-keys...]
      review_needs_fixes: [story-keys...]
      blocked: [story-keys...]
  ```
  
  <output>📦 Context compacted: {{loop_count}} loops summarized</output>
</check>

---

### 5.4 Continue Loop Decision

<check if="autopilot == true">
  <output>
🤖 **Autopilot:** Continuing to next iteration...

Next batch:
- Dev: {{next_dev_batch}}
- Review: {{next_review_batch}}
  </output>
  
  <action>Increment loop_count</action>
  <action>Reset loop statistics</action>
  <load>./step-02-analyze.md</load>
</check>

<check if="autopilot == false">
  <ask>
## 🔄 Continue?

**Remaining:**
- To develop: {{ready_count + in_progress_count}}
- To review: {{review_count}}

[1] **Continue** - Process next batch
[2] **Pause** - Save state, exit (can resume later)
[3] **Switch** - Work on different epic
[4] **Exit** - End dev-team-mode

Choose:
  </ask>
  
  <switch on="user_choice">
    <case value="1">
      <action>Increment loop_count</action>
      <load>./step-02-analyze.md</load>
    </case>
    <case value="2">
      <goto step="5.8" label="Save and Pause" />
    </case>
    <case value="3">
      <action>Reset selected_epic</action>
      <load>./step-01-init.md</load>
    </case>
    <case value="4">
      <goto step="5.9" label="Graceful Exit" />
    </case>
  </switch>
</check>

---

### 5.5 Need Story Creation

<output>
## 📝 Stories Need Creation

All actionable stories in **{{selected_epic}}** processed.
Remaining are `backlog` - need create-story.

**Backlog:** {{backlog_list}}
</output>

<ask>
[1] **Create** - Run `/bmad-bmm-create-story`
[2] **Switch** - Work on different epic
[3] **Exit**

Choose:
</ask>

<switch on="user_choice">
  <case value="1">
    <output>💡 Run `/bmad-bmm-create-story`, then re-run dev-team-mode.</output>
    <halt reason="Need story creation" />
  </case>
  <case value="2">
    <action>Reset selected_epic</action>
    <load>./step-01-init.md</load>
  </case>
  <case value="3">
    <goto step="5.9" />
  </case>
</switch>

---

### 5.6 Epic Completion

<output>
## 🎉 Epic Complete!

**{{selected_epic}}** fully developed and reviewed!

### Statistics
| Metric | Value |
|--------|-------|
| Total Stories | {{total}} |
| Completed | {{done_count}} |
| Loops | {{loop_count}} |
| Dev Cycles | {{total_dev_cycles}} |
| Review Cycles | {{total_review_cycles}} |
| Duration | {{duration}} |

### Completed Stories
{{#each done_stories}}
- ✅ {{key}}
{{/each}}
</output>

<action>Update sprint-status.yaml: {{selected_epic}} = "done"</action>

<check if="delegated_mode == true">
  <output>
```yaml
DEV_TEAM_MODE_RESULT:
  status: completed
  epic: {{selected_epic}}
  loops: {{loop_count}}
  stories:
    done: [{{done_stories | keys}}]
    failed: [{{failed_stories | keys}}]
    blocked: [{{blocked_stories | keys}}]
    remaining: []
  summary: "Epic {{selected_epic}} fully completed. {{done_count}} stories done in {{loop_count}} loops."
  action_required: none
  next_suggested: "/bmad-bmm-retrospective"
```
  </output>
  <halt reason="Delegated mode: epic complete" />
</check>

<ask>
**What's next?**

[1] **Retrospective** - Review lessons learned
[2] **Next epic** - Continue with another epic
[3] **Exit**

Choose:
</ask>

<switch on="user_choice">
  <case value="1">
    <output>💡 Run `/bmad-bmm-retrospective`</output>
    <halt reason="User will run retrospective" />
  </case>
  <case value="2">
    <action>Reset state for new epic</action>
    <load>./step-01-init.md</load>
  </case>
  <case value="3">
    <goto step="5.9" />
  </case>
</switch>

---

### 5.7 Epic Blocked

<check if="delegated_mode == true">
  <output>
```yaml
DEV_TEAM_MODE_RESULT:
  status: blocked
  epic: {{selected_epic}}
  loops: {{loop_count}}
  stories:
    done: [{{done_stories | keys}}]
    failed: [{{failed_stories | keys}}]
    blocked: [{{blocked_stories | keys}}]
    remaining: [{{remaining_stories | keys}}]
  summary: "Epic {{selected_epic}} blocked. {{done_count}} done, {{blocked_count}} blocked after {{loop_count}} loops."
  action_required: "Resolve blocked stories: {{blocked_stories | reasons}}"
  blocked_details:
{{#each blocked_stories}}
    - story: {{key}}
      reason: "{{reason}}"
      attempts: {{retry_count}}
{{/each}}
```
  </output>
  <halt reason="Delegated mode: epic blocked" />
</check>

<output>
## ❌ Epic Blocked

**{{selected_epic}}** cannot proceed - all remaining stories blocked.

### Blocked Stories
| Story | Reason | Attempts |
|-------|--------|----------|
{{#each blocked_stories}}
| {{key}} | {{reason}} | {{retry_count}} |
{{/each}}

### Recommendations
1. Review blocked stories manually
2. Fix underlying issues
3. Re-run dev-team-mode
</output>

<ask>
[1] **Details** - Show failure information
[2] **Switch** - Work on different epic
[3] **Exit**

Choose:
</ask>

---

### 5.8 Save and Pause

<action>Save workflow state:</action>

```yaml
# {implementation_artifacts}/dev-team-mode-state.yaml
saved_state:
  timestamp: "{{date}}"
  selected_epic: "{{selected_epic}}"
  epic_mode: "{{epic_mode}}"
  execution_mode: "{{execution_mode}}"
  parallel_mode: {{parallel_mode}}
  loop_count: {{loop_count}}
  completed_stories: [{{completed}}]
  failed_stories: [{{failed}}]
  retry_counts: {{retry_counts}}
  phase: "paused"
  resume_step: "step-02-analyze"
```

<output>
## ⏸️ Paused

State saved to `{implementation_artifacts}/dev-team-mode-state.yaml`

**To resume:** Run dev-team-mode again - will detect saved state.

### Progress
- Epic: {{selected_epic}}
- Completed: {{completed_count}}
- Remaining: {{remaining_count}}
</output>

<halt reason="User paused" />

---

### 5.9 Graceful Exit

<check if="delegated_mode == true">
  <output>
```yaml
DEV_TEAM_MODE_RESULT:
  status: paused
  epic: {{selected_epic}}
  loops: {{loop_count}}
  stories:
    done: [{{done_stories | keys}}]
    failed: [{{failed_stories | keys}}]
    blocked: [{{blocked_stories | keys}}]
    remaining: [{{remaining_stories | keys}}]
  summary: "Session ended. {{total_completed}} done, {{total_remaining}} remaining."
  action_required: "Re-run dev-team-mode to continue remaining stories"
```
  </output>
  <action>Clean up workflow state</action>
  <halt reason="Delegated mode: graceful exit" />
</check>

<output>
## 👋 Dev Team Mode Complete

### Session Summary
| Metric | Value |
|--------|-------|
| Epic | {{selected_epic}} |
| Loops | {{loop_count}} |
| Completed | {{total_completed}} |
| Remaining | {{total_remaining}} |

Run `/bmad-bmm-sprint-status` for overall progress.
</output>

<action>Clean up workflow state</action>
<halt reason="Complete" />

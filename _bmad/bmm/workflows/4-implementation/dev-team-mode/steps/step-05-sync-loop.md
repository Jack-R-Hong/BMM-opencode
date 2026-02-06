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

🎯 **Goal:** {{session_goal}}

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

### Story Sessions
{{#each story_sessions}}
#### 📖 {{@key}}
| Phase | Session |
|-------|---------|
{{#if dev_session_id}}| Dev | `{{dev_session_id}}` |{{/if}}
{{#if review_session_id}}| Review | `{{review_session_id}}` |{{/if}}
{{/each}}

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

### 5.3.1 Delegate Mode: Dependency Re-evaluation

<check if="delegate_mode == true">
  <action>Re-evaluate dependency graph against current sprint-status:</action>
  
  ```javascript
  // Identify regressed stories (sent back from review to in-progress)
  const regressed = epicStories.filter(s =>
    s.status === 'in-progress' &&
    completed_stories_prev.includes(s.key)
  );
  
  if (regressed.length > 0) {
    // Re-block all downstream dependents
    for (const story of regressed) {
      const dependents = findDependents(dependency_graph, story.key);
      for (const dep of dependents) {
        if (dep.status !== 'done') {
          blocked_stories.add(dep.key);
        }
      }
    }
    // Mark regressed stories for priority in next batch
    regressed_stories = regressed.map(s => s.key);
  }
  
  // Identify newly unblocked stories (all depends_on now 'done')
  const newlyUnblocked = epicStories.filter(s =>
    s.status === 'ready-for-dev' &&
    s.depends_on.every(dep => sprintStatus[dep].status === 'done')
  );
  ```
  
  <output>
🔀 **Delegate: Dependency Re-evaluation**

{{#if regressed_stories.length}}
⚠️ Regressed (priority re-dev): {{regressed_stories}}
   Downstream re-blocked: {{reblocked_dependents}}
{{/if}}
{{#if newlyUnblocked.length}}
✅ Newly unblocked: {{newlyUnblocked | keys}}
{{/if}}
  </output>
  
  <action>Auto-continue to next analysis cycle with updated graph</action>
  <action>Increment loop_count</action>
  <action>Reset loop statistics</action>
  <load>./step-02-analyze.md</load>
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

🎯 **Goal:** {{session_goal}}

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

### Completed Stories & Sessions
{{#each done_stories}}
#### ✅ {{key}}
| Phase | Session |
|-------|---------|
{{#with ../story_sessions.[key]}}
{{#if dev_session_id}}| Dev | `{{dev_session_id}}` |{{/if}}
{{#if review_session_id}}| Review | `{{review_session_id}}` |{{/if}}
{{/with}}
{{/each}}
</output>

<action>Update sprint-status.yaml: {{selected_epic}} = "done"</action>

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
  session_goal: "{{session_goal}}"
  selected_epic: "{{selected_epic}}"
  epic_mode: "{{epic_mode}}"
  execution_mode: "{{execution_mode}}"
  parallel_mode: {{parallel_mode}}
  loop_count: {{loop_count}}
  completed_stories: [{{completed}}]
  failed_stories: [{{failed}}]
  retry_counts: {{retry_counts}}
  story_sessions: {{story_sessions}}
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

<output>
## 👋 Dev Team Mode Complete

🎯 **Goal:** {{session_goal}}

### Session Summary
| Metric | Value |
|--------|-------|
| Epic | {{selected_epic}} |
| Loops | {{loop_count}} |
| Completed | {{total_completed}} |
| Remaining | {{total_remaining}} |

### All Story Sessions
{{#each story_sessions}}
#### 📖 {{@key}}
| Phase | Session |
|-------|---------|
{{#if dev_session_id}}| Dev | `{{dev_session_id}}` |{{/if}}
{{#if review_session_id}}| Review | `{{review_session_id}}` |{{/if}}
{{/each}}

Run `/bmad-bmm-sprint-status` for overall progress.
</output>

<action>Clean up workflow state</action>
<halt reason="Complete" />

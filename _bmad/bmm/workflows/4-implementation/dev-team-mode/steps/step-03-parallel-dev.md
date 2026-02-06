# Step 3: Parallel Development Execution

<critical>Launch dev-story subagents for each story in parallel_batch.dev_stories</critical>
<critical>Use delegate_task with run_in_background=true for true parallelism</critical>
<critical>Track all task_ids and session_ids for monitoring and continuation</critical>
<critical>Handle failures with retry logic up to max_retry_per_story attempts</critical>

## EXECUTION PROTOCOL

### 3.1 Build Subagent Prompts

<action>For each story in parallel_batch.dev_stories, construct prompt:</action>

```
TASK: Implement story {{story_key}} using TDD red-green-refactor

STORY_PATH: {{story_path}}

EXPECTED_OUTCOME:
- All tasks/subtasks marked [x]
- All acceptance criteria satisfied  
- All tests pass (new + regression)
- Story status = "review"
- sprint-status.yaml updated to "review"

CONTEXT:
- Project: {project_context}
- Sprint: {sprint_status_file}
- Epic: {{selected_epic}}

MUST DO:
1. Read COMPLETE story file first
2. Follow tasks/subtasks EXACTLY as written
3. Write FAILING tests first (red)
4. Implement MINIMAL code to pass (green)
5. Refactor while tests stay green
6. Update File List with ALL changed files
7. Update Dev Agent Record
8. Set story status = "review" when complete
9. Update sprint-status.yaml

MUST NOT:
1. Skip tests or write placeholders
2. Modify unrelated code
3. Use 'as any' or '@ts-ignore'
4. Leave broken state
5. Mark [x] without implementation

HALT IF:
- 3 consecutive failures
- Missing configuration
- Ambiguous requirements
```

---

### 3.2 Launch Agents

<output>
## 🚀 Launching Development Agents

{{#each parallel_batch.dev_stories}}
- Agent {{@index}}: {{key}} → Starting...
{{/each}}
</output>

<action>Execute parallel delegation:</action>

```javascript
// For each story, call delegate_task
for (const story of parallel_batch.dev_stories) {
  const result = delegate_task({
    category: "{{dev_category}}",  // "deep"
    load_skills: ["bmad-bmm-dev-story"],
    run_in_background: true,
    prompt: buildPrompt(story)
  });
  
  active_agents.push({
    task_id: result.task_id,
    session_id: result.session_id,
    story_key: story.key,
    phase: "dev-story",
    status: "running",
    started_at: Date.now()
  });
}
```

<action>Update frontmatter:</action>

```yaml
active_agents: [{{active_agents}}]
phase: 'dev-running'
```

---

### 3.3 Monitor Progress

<output>
## ⏳ Development In Progress

| Story | Task ID | Session ID | Status | Duration |
|-------|---------|------------|--------|----------|
{{#each active_agents}}
| {{story_key}} | `{{task_id}}` | `{{session_id}}` | {{status}} | {{duration}} |
{{/each}}

### 📋 How to Check Progress

View any agent's real-time progress:
```
background_output(task_id="<task_id>")
```

Example:
{{#with active_agents.[0]}}
```
background_output(task_id="{{task_id}}")
```
{{/with}}

System will notify on completion. Continue other work or wait.
</output>

<action>Wait for background_task_completed notifications</action>

**On notification:**
1. Call `background_output(task_id="...")`
2. Parse result
3. Update active_agents status
4. Check if all complete

---

### 3.4 Process Results

<action>For each completed agent, evaluate outcome:</action>

**Success criteria:**
- Story status changed to "review"
- All tasks marked [x]
- "tests pass" in output
- No HALT triggered

**Failure criteria:**
- HALT message present
- Status still "in-progress"
- Error/exception in output
- Tasks incomplete

<switch on="agent_outcome">
  <case value="success">
    <action>Move to completed_stories</action>
    <output>✅ **{{story_key}}** - Complete, ready for review</output>
  </case>
  
  <case value="failure">
    <action>Increment retry_counts[story_key]</action>
    
    <check if="retry_counts[story_key] < max_retry_per_story">
      <output>⚠️ **{{story_key}}** - Failed, retrying ({{retry_count}}/{{max_retry}})</output>
      <action>Add to retry_queue</action>
    </check>
    
    <check if="retry_counts[story_key] >= max_retry_per_story">
      <output>❌ **{{story_key}}** - Failed after {{max_retry}} attempts, blocked</output>
      <action>Move to failed_stories</action>
    </check>
  </case>
</switch>

---

### 3.5 Process Retry Queue

<check if="retry_queue not empty">
  <output>
## 🔄 Retrying Failed Stories

| Story | Attempt | Error |
|-------|---------|-------|
{{#each retry_queue}}
| {{key}} | {{attempt}}/{{max_retry}} | {{error_summary}} |
{{/each}}
  </output>
  
  <action>For each retry:</action>
  
  ```javascript
  delegate_task({
    session_id: original_session_id,  // Continue context
    prompt: `
RETRY: Previous attempt failed: {{error_summary}}

Fix the issue and continue. Do NOT restart - resume from failure point.
    `
  });
  ```
</check>

---

### 3.6 Batch Completion Check

<action>Calculate batch status:</action>

```yaml
batch_status:
  total: {{parallel_batch.dev_stories.length}}
  completed: {{completed_stories.length}}
  failed: {{failed_stories.length}}
  running: {{active_agents.filter(running).length}}
```

<check if="running == 0">
  <output>
## 📊 Development Batch Complete

### Results
- ✅ Completed: {{completed_count}} ready for review
- ❌ Failed: {{failed_count}} need intervention

{{#if completed_stories}}
### Ready for Review
{{#each completed_stories}}
- {{key}}
{{/each}}
{{/if}}

{{#if failed_stories}}
### Failed (manual intervention needed)
{{#each failed_stories}}
- {{key}}: {{failure_reason}}
{{/each}}
{{/if}}
  </output>
  
  <action>Set phase = 'review'</action>
  <load>./step-04-parallel-review.md</load>
</check>

<check if="running > 0">
  <output>⏳ {{running}} agent(s) still running...</output>
  <action>Continue monitoring</action>
</check>

---

### 3.7 Sync Sprint Status

<action>Verify sprint-status.yaml updates:</action>

```javascript
for (const story of completed_stories) {
  const current = sprintStatus[story.key];
  if (current !== 'review') {
    sprintStatus[story.key] = 'review';
    needsSync = true;
  }
}
if (needsSync) writeSprintStatus();
```

<output>✅ Sprint status synced - {{completed_count}} stories now in review</output>

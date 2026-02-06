# Step 4: Parallel Code Review Execution

<critical>Launch code-review subagents for stories in "review" status</critical>
<critical>Use review_category (ultrabrain) for high-quality adversarial review</critical>
<critical>Different LLM category than dev ensures independent verification</critical>
<critical>Handle outcomes: approved → done, needs-fixes → re-dev, blocked → manual</critical>

## EXECUTION PROTOCOL

### 4.1 Gather Review Stories

<action>Collect stories for review:</action>

```yaml
stories_to_review:
  # From completed dev batch
  - key: "2-1-personality-system"
    path: "{story_dir}/2-1-personality-system.md"
    source: "dev-batch"
  # From existing review status
  - key: "1-3-data-model"
    path: "{story_dir}/1-3-data-model.md"
    source: "existing"
```

<check if="stories_to_review empty">
  <output>ℹ️ No stories pending review.</output>
  <load>./step-05-sync-loop.md</load>
</check>

---

### 4.2 Build Review Prompts

<action>For each story, construct adversarial review prompt:</action>

```
TASK: ADVERSARIAL code review for story {{story_key}}

STORY_PATH: {{story_path}}

EXPECTED_OUTCOME:
- Find 3-10 specific issues (NEVER "looks good")
- Categorize: HIGH (must fix), MEDIUM (should fix), LOW (nice to fix)
- Fix issues automatically OR create action items
- Update status: "done" if all fixed, else "in-progress"
- Sync sprint-status.yaml

REVIEW SCOPE:
1. **Verify Claims**
   - Tasks marked [x] actually implemented?
   - ALL acceptance criteria satisfied?
   - File List matches git changes?

2. **Code Quality**
   - Security vulnerabilities
   - Performance issues
   - Error handling gaps
   - Test quality (real assertions, not placeholders)

3. **Architecture Compliance**
   - Follows project-context.md patterns
   - No rogue dependencies
   - Proper separation of concerns

MUST DO:
1. Read COMPLETE story file
2. Verify EVERY [x] task has implementation
3. Check git diff vs File List
4. Find MINIMUM 3 issues
5. Fix HIGH/MEDIUM automatically when possible
6. Update story status based on outcome

MUST NOT:
1. Accept "looks good" without findings
2. Ignore security issues
3. Skip test quality review
4. Leave unfixed issues without action items

AUTO-FIX: Yes - fix and update story
```

---

### 4.3 Launch Review Agents

<output>
## 🔍 Launching Code Review Agents

{{#each stories_to_review}}
- Reviewer {{@index}}: {{key}} → Starting adversarial review...
{{/each}}

💡 Using "{{review_category}}" for high-quality review
</output>

<action>Execute parallel delegation:</action>

```javascript
for (const story of stories_to_review) {
  const result = delegate_task({
    category: "{{review_category}}",  // "ultrabrain"
    load_skills: ["bmad-bmm-code-review"],
    run_in_background: true,
    prompt: buildReviewPrompt(story)
  });
  
  review_agents.push({
    task_id: result.task_id,
    session_id: result.session_id,
    story_key: story.key,
    phase: "code-review",
    status: "running"
  });
}
```

<action>Update frontmatter:</action>

```yaml
active_agents: [{{review_agents}}]
phase: 'review-running'
```

---

### 4.4 Monitor Progress

<output>
## ⏳ Code Reviews In Progress

| Story | Task ID | Session ID | Status |
|-------|---------|------------|--------|
{{#each review_agents}}
| {{story_key}} | `{{task_id}}` | `{{session_id}}` | {{status}} |
{{/each}}

### 📋 How to Check Progress

View any reviewer's real-time progress:
```
background_output(task_id="<task_id>")
```

Example:
{{#with review_agents.[0]}}
```
background_output(task_id="{{task_id}}")
```
{{/with}}
</output>

<action>Wait for completion notifications</action>

---

### 4.5 Process Review Results

<action>Parse each review outcome:</action>

**Outcome types:**

| Outcome | Condition | Action |
|---------|-----------|--------|
| `approved` | All issues fixed, status="done" | → done_stories |
| `needs-fixes` | Action items created, status="in-progress" | → needs_redev_queue |
| `blocked` | Critical issues, cannot proceed | → blocked_stories |

<switch on="review_outcome">
  <case value="approved">
    <output>✅ **{{story_key}}** - Review passed, marked DONE</output>
    <action>Move to done_stories</action>
    <action>Verify sprint-status = "done"</action>
  </case>
  
  <case value="needs-fixes">
    <output>
⚠️ **{{story_key}}** - Issues found

Issues: {{high_count}} High, {{medium_count}} Medium, {{low_count}} Low
{{#if auto_fixed}}Auto-fixed: {{fixed_count}} | Remaining: {{remaining_count}}{{/if}}
    </output>
    
    <action>Add to needs_redev_queue:</action>
    ```yaml
    needs_redev:
      - key: "{{story_key}}"
        review_session_id: "{{session_id}}"
        action_items: [{{items}}]
        high_severity: {{high_count}}
    ```
  </case>
  
  <case value="blocked">
    <output>
❌ **{{story_key}}** - BLOCKED

Blocking Issues:
{{#each blocking_issues}}
- [{{severity}}] {{description}}
{{/each}}

⚠️ Manual intervention required
    </output>
    <action>Move to blocked_stories</action>
  </case>
</switch>

---

### 4.6 Handle Re-Development Queue

<check if="needs_redev_queue not empty AND autopilot">
  <output>
## 🔄 Addressing Review Findings

{{needs_redev_queue.length}} stories need fixes. Auto-pilot: re-running dev-story.
  </output>
  
  <action>For each story:</action>
  
  ```javascript
  delegate_task({
    session_id: original_dev_session_id,
    prompt: `
RESUME: Code review found issues requiring fixes.

REVIEW FINDINGS:
{{action_items}}

TASK: Address ALL [AI-Review] action items

EXPECTED:
- All [AI-Review] tasks marked [x]
- Tests updated for fixes
- Status back to "review"

PRIORITY: Fix HIGH severity first
    `
  });
  ```
  
  <action>After re-dev, queue for another review cycle</action>
</check>

<check if="needs_redev_queue not empty AND NOT autopilot">
  <ask>
## 🔄 Stories Need Fixes

| Story | Issues | High Severity |
|-------|--------|---------------|
{{#each needs_redev_queue}}
| {{key}} | {{action_items.length}} | {{high_count}} |
{{/each}}

[1] **Auto-fix** - Run dev-story to address findings
[2] **Skip** - Continue with other stories
[3] **Manual** - Exit to review yourself

Choose [1], [2], or [3]:
  </ask>
</check>

---

### 4.7 Batch Completion Check

<action>Calculate review batch status:</action>

```yaml
review_status:
  total: {{stories_to_review.length}}
  done: {{done_stories.length}}
  needs_redev: {{needs_redev_queue.length}}
  blocked: {{blocked_stories.length}}
  running: {{review_agents.filter(running).length}}
```

<check if="all reviews finished">
  <output>
## 📊 Review Batch Complete

- ✅ Done: {{done_count}} completed
- 🔄 Needs Fixes: {{redev_count}} returning to dev
- ❌ Blocked: {{blocked_count}} need intervention

{{#if done_stories}}
### Completed
{{#each done_stories}}
- {{key}}: Ready for deployment
{{/each}}
{{/if}}
  </output>
  
  <action>Set phase = 'sync'</action>
  <load>./step-05-sync-loop.md</load>
</check>

---

### 4.8 Sync Sprint Status

<action>Update sprint-status.yaml:</action>

```javascript
for (const story of done_stories) {
  sprintStatus[story.key] = 'done';
}
for (const story of needs_redev_queue) {
  sprintStatus[story.key] = 'in-progress';
}
writeSprintStatus();
```

<output>✅ Sprint status synced after review cycle</output>

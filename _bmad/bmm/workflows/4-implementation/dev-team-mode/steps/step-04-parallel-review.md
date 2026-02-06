# Step 4: Parallel Code Review Execution

<critical>Launch code-review subagents for stories in "review" status</critical>
<critical>Use review_agent (bmm-dev) for high-quality adversarial review</critical>
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
- MEDIUM and LOW: fix directly during review (auto-fix in place)
- HIGH: if fixable during review, fix it; if not, create action item
- Update status: "done" if no unfixed HIGH remains, else "in-progress"
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
5. Fix ALL MEDIUM and LOW issues directly (do not defer)
6. Attempt to fix HIGH issues; create action items only for unfixable HIGH
7. Update story status: "done" if no unfixed HIGH, else "in-progress"

MUST NOT:
1. Accept "looks good" without findings
2. Ignore security issues
3. Skip test quality review
4. Defer MEDIUM/LOW issues to re-dev cycle (fix them now)
5. Leave unfixed HIGH issues without action items

AUTO-FIX RULES:
- MEDIUM/LOW: always fix in place during review
- HIGH: fix if possible; flag back to dev cycle only if reviewer cannot fix
```

---

### 4.3 Launch Review Agents

<output>
## 🔍 Launching Code Review Agents

{{#each stories_to_review}}
- Reviewer {{@index}}: {{key}} → Starting adversarial review...
{{/each}}

💡 Using "{{review_agent}}" agent for high-quality review
</output>

<action>Execute parallel delegation:</action>

```javascript
// Agent fallback chain: [review_agent, ...review_agent_fallbacks]
const agentChain = ["{{review_agent}}", ...{{review_agent_fallbacks}}];

for (const story of stories_to_review) {
  let result = null;
  let usedAgent = null;

  for (const agent of agentChain) {
    try {
      result = delegate_task({
        subagent_type: agent,
        load_skills: ["bmad-bmm-code-review"],
        run_in_background: true,
        prompt: buildReviewPrompt(story)
      });
      usedAgent = agent;
      break;
    } catch (e) {
      if (e.includes("MODEL_CAPACITY") || e.includes("UNAVAILABLE")) {
        console.log(`⚠️ ${agent} unavailable, trying next fallback...`);
        continue;
      }
      throw e;
    }
  }

  if (!result) throw new Error("All agents in fallback chain unavailable");

  review_agents.push({
    task_id: result.task_id,
    session_id: result.session_id,
    story_key: story.key,
    agent_used: usedAgent,
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

<action>Persist review session mapping:</action>

```javascript
for (const agent of review_agents) {
  story_sessions[agent.story_key] = {
    ...story_sessions[agent.story_key],
    review_session_id: agent.session_id,
    review_task_id: agent.task_id
  };
}
```

---

### 4.4 Monitor Progress

<output>
## ⏳ Code Reviews In Progress

🎯 **Goal:** {{session_goal}}

{{#each review_agents}}
### 🔍 {{story_key}}
| Field | Value |
|-------|-------|
| Agent | {{agent_used}} |
| Session | `{{session_id}}` |
| Task ID | `{{task_id}}` |
| Status | {{status}} |

```
background_output(task_id="{{task_id}}")
```
{{/each}}

### 📋 Session Quick Links
| Story | Dev Session | Review Session |
|-------|-------------|----------------|
{{#each review_agents}}
| **{{story_key}}** | `{{story_sessions.[story_key].dev_session_id}}` | `{{session_id}}` |
{{/each}}
</output>

<action>Wait for completion notifications</action>

---

### 4.5 Process Review Results

<action>Parse each review outcome:</action>

**Outcome types:**

| Outcome | Condition | Action |
|---------|-----------|--------|
| `approved` | No unfixed HIGH issues (MEDIUM/LOW all fixed in place) | → done_stories |
| `needs-fixes` | Unfixed HIGH issues remain | → needs_redev_queue |
| `blocked` | Critical issues, cannot proceed | → blocked_stories |

<switch on="review_outcome">
  <case value="approved">
    <output>
✅ **{{story_key}}** - Review passed, marked DONE

Fixed during review: {{medium_fixed}} Medium, {{low_fixed}} Low
{{#if high_count}}HIGH issues fixed during review: {{high_fixed}}{{/if}}
    </output>
    <action>Move to done_stories</action>
    <action>Verify sprint-status = "done"</action>
  </case>
  
  <case value="needs-fixes">
    <output>
⚠️ **{{story_key}}** - Unfixed HIGH issues

Fixed during review: {{medium_fixed}} Medium, {{low_fixed}} Low
Unfixed HIGH: {{unfixed_high_count}} (requires re-dev)
    </output>
    
    <action>Add to needs_redev_queue (HIGH issues only):</action>
    ```yaml
    needs_redev:
      - key: "{{story_key}}"
        review_session_id: "{{session_id}}"
        action_items: [{{high_only_items}}]
        unfixed_high_count: {{unfixed_high_count}}
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
  
  <action>For each story (only unfixed HIGH issues are sent back):</action>
  
  ```javascript
  delegate_task({
    session_id: original_dev_session_id,
    prompt: `
RESUME: Code review found HIGH severity issues that could not be fixed during review.

Note: MEDIUM and LOW issues were already fixed by the reviewer.

UNFIXED HIGH ISSUES:
{{high_only_items}}

TASK: Fix ALL unfixed HIGH severity [AI-Review] action items

EXPECTED:
- All HIGH [AI-Review] tasks marked [x]
- Tests updated for fixes
- Status back to "review"
    `
  });
  ```
  
  <action>After re-dev, queue for another review cycle</action>
</check>

<check if="needs_redev_queue not empty AND NOT autopilot">
  <ask>
## 🔄 Stories Have Unfixed HIGH Issues

| Story | Unfixed HIGH |
|-------|--------------|
{{#each needs_redev_queue}}
| {{key}} | {{unfixed_high_count}} |
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

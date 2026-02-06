# Step 2: Analyze Parallelism

<critical>Determine which stories can run concurrently</critical>
<critical>If parallel_mode=false, set batch_size=1 regardless of available stories</critical>
<critical>Respect dependencies: stories with unmet dependencies MUST wait</critical>
<critical>Never exceed max_parallel_agents</critical>

## EXECUTION PROTOCOL

### 2.0 Apply Execution Mode

<switch on="parallel_mode">
  <case value="true">
    <action>Set effective_max_parallel = {{max_parallel_agents}}</action>
    <output>⚡ **Parallel Mode** - Analyzing dependencies, max {{max_parallel_agents}} concurrent</output>
  </case>
  
  <case value="false">
    <action>Set effective_max_parallel = 1</action>
    <output>📝 **Sequential Mode** - One story at a time</output>
  </case>
</switch>

---

### 2.1 Gather Stories

<action>Filter stories for {{selected_epic}}:</action>

```
Pattern: {epic_num}-{story_num}-{name}
Example: epic-2 → stories 2-1-*, 2-2-*, 2-3-*
```

<action>Categorize by status (processing priority order):</action>

| Priority | Status | Action |
|----------|--------|--------|
| 1 | `in-progress` | Must complete first |
| 2 | `review` | Needs code-review |
| 3 | `ready-for-dev` | Can be developed |
| 4 | `backlog` | Needs create-story |
| 5 | `done` | Skip |

---

### 2.2 Handle In-Progress Stories

<check if="stories with status=in-progress exist">
  <output>
⚠️ **In-progress story found:** {{in_progress_stories}}

Recommendation: Complete in-progress work before starting new stories.
  </output>
  
  <check if="parallel_mode == false">
    <action>Set parallel_batch.dev_stories = [first in_progress story]</action>
    <goto step="2.6" />
  </check>
  
  <ask>
[1] **Continue in-progress** - Focus on {{first_in_progress}} (recommended)
[2] **Add to batch** - Include with new stories (risk: merge conflicts)
[3] **Skip** - Work on other stories, mark this blocked

Choose [1], [2], or [3]:
  </ask>
  
  <switch on="user_choice">
    <case value="1">
      <action>Set parallel_batch.dev_stories = [in_progress_story]</action>
      <goto step="2.6" />
    </case>
    <case value="2">
      <action>Include in_progress_stories in candidate pool</action>
    </case>
    <case value="3">
      <action>Add to blocked_stories</action>
    </case>
  </switch>
</check>

---

### 2.3 Handle Review Stories

<check if="stories with status=review exist">
  <output>📋 **Pending review:** {{review_stories}}</output>
  
  <ask>
[1] **Review first** - Complete reviews before new development
[2] **Parallel review+dev** - Review while developing new stories
[3] **Skip reviews** - Focus on development only

Choose [1], [2], or [3]:
  </ask>
  
  <switch on="user_choice">
    <case value="1">
      <action>Set review_first = true</action>
      <action>Set stories_to_review = review_stories</action>
      <goto step="2.6" />
    </case>
    <case value="2">
      <action>Set parallel_review = true</action>
      <action>Add review_stories to stories_to_review</action>
    </case>
  </switch>
</check>

---

### 2.4 Analyze Dependencies

<action>For each ready-for-dev story, detect dependencies:</action>

**Detection methods:**

1. **Explicit:** `depends_on` field in story metadata
2. **Dev Notes:** References like "requires X-Y", "uses API from X-Y"
3. **Technical inference:**
   - DB schema creators → consumers
   - API endpoint creators → consumers
   - Component builders → extenders

<action>Build dependency graph:</action>

```yaml
dependencies:
  2-3-chat-interface:
    depends_on: [2-1-personality-system]
    reason: "Uses personality engine from 2-1"
  2-4-voice-integration:
    depends_on: [2-2-audio-service, 2-3-chat-interface]
```

<action>Classify stories:</action>

| Category | Criteria |
|----------|----------|
| `parallelizable` | No dependencies OR all dependencies are `done` |
| `blocked` | Has dependencies that are NOT `done` |

---

### 2.5 Build Execution Batch

<action>Apply selection rules:</action>

```python
# Pseudocode
parallelizable = [s for s in ready_stories if s.dependencies_met]
parallelizable.sort(key=lambda s: (
    -len(s.downstream_dependents),  # Blockers first
    s.story_number                   # Then by order
))

batch_size = min(len(parallelizable), effective_max_parallel)
dev_batch = parallelizable[:batch_size]
```

<action>Construct parallel_batch:</action>

```yaml
parallel_batch:
  dev_stories:
    - key: "2-1-personality-system"
      path: "{story_dir}/2-1-personality-system.md"
      reason: "No dependencies, blocks 2-3"
    - key: "2-2-audio-service"
      path: "{story_dir}/2-2-audio-service.md"
      reason: "No dependencies, blocks 2-4"
  
  blocked_stories:
    - key: "2-3-chat-interface"
      blocked_by: ["2-1-personality-system"]
  
  review_stories: []  # If parallel_review=true
```

---

### 2.6 Present Execution Plan

<output>
## 📊 Execution Plan

### Development Batch ({{dev_batch_size}} stories)
| Story | Reason |
|-------|--------|
{{#each parallel_batch.dev_stories}}
| {{key}} | {{reason}} |
{{/each}}

{{#if parallel_batch.review_stories}}
### Review Batch ({{review_batch_size}} stories)
{{#each parallel_batch.review_stories}}
| {{key}} | Pending review |
{{/each}}
{{/if}}

{{#if parallel_batch.blocked_stories}}
### Blocked (next iteration)
| Story | Blocked By |
|-------|------------|
{{#each parallel_batch.blocked_stories}}
| {{key}} | {{blocked_by}} |
{{/each}}
{{/if}}

### Summary
- Parallel agents: {{dev_batch_size}} / {{effective_max_parallel}}
- Estimated iterations: {{estimated_iterations}}
</output>

<check if="autopilot == false">
  <ask>
**Proceed with this plan?**

[Y] Yes - Start execution
[M] Modify - Adjust story selection
[X] Exit - Cancel

Choose:
  </ask>
  
  <switch on="user_choice">
    <case value="M">
      <ask>Enter story keys to include (comma-separated) or "remove X-Y":</ask>
      <action>Update parallel_batch</action>
      <action>Re-display plan</action>
    </case>
    <case value="X">
      <halt reason="User cancelled" />
    </case>
  </switch>
</check>

---

### 2.7 Update State

<action>Update frontmatter:</action>

```yaml
parallel_stories: [{{parallel_batch.dev_stories | keys}}]
stories_to_review: [{{parallel_batch.review_stories | keys}}]
blocked_stories: [{{parallel_batch.blocked_stories | keys}}]
phase: 'dev'
batch_size: {{dev_batch_size}}
```

<output>✅ Analysis complete. Launching {{dev_batch_size}} development agent(s).</output>

<routing>
  <if condition="stories_to_review not empty AND review_first">
    <load>./step-04-parallel-review.md</load>
  </if>
  <else-if condition="parallel_batch.dev_stories not empty">
    <load>./step-03-parallel-dev.md</load>
  </else-if>
  <else>
    <output>⚠️ No actionable stories. Run `/bmad-bmm-create-story`.</output>
    <halt reason="No actionable stories" />
  </else>
</routing>

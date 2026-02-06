# Sprint Planning - Sprint Status Generator

<critical>The workflow execution engine is governed by: {project-root}/_bmad/core/tasks/workflow.xml</critical>
<critical>You MUST have already loaded and processed: {project-root}/_bmad/bmm/workflows/4-implementation/sprint-planning/workflow.yaml</critical>

## 📚 Document Discovery - Full Epic Loading

**Strategy**: Sprint planning needs ALL epics and stories to build complete status tracking.

**Epic Discovery Process:**

1. **Search for whole document first** - Look for `epics.md`, `bmm-epics.md`, or any `*epic*.md` file
2. **Check for sharded version** - If whole document not found, look for `epics/index.md`
3. **If sharded version found**:
   - Read `index.md` to understand the document structure
   - Read ALL epic section files listed in the index (e.g., `epic-1.md`, `epic-2.md`, etc.)
   - Process all epics and their stories from the combined content
   - This ensures complete sprint status coverage
4. **Priority**: If both whole and sharded versions exist, use the whole document

**Fuzzy matching**: Be flexible with document names - users may use variations like `epics.md`, `bmm-epics.md`, `user-stories.md`, etc.

<workflow>

<step n="1" goal="Parse epic files and extract all work items">
<action>Communicate in {communication_language} with {user_name}</action>
<action>Look for all files matching `{epics_pattern}` in {epics_location}</action>
<action>Could be a single `epics.md` file or multiple `epic-1.md`, `epic-2.md` files</action>

<action>For each epic file found, extract:</action>

- Epic numbers from headers like `## Epic 1:` or `## Epic 2:`
- Story IDs and titles from patterns like `### Story 1.1: User Authentication`
- Convert story format from `Epic.Story: Title` to kebab-case key: `epic-story-title`

**Story ID Conversion Rules:**

- Original: `### Story 1.1: User Authentication`
- Replace period with dash: `1-1`
- Convert title to kebab-case: `user-authentication`
- Final key: `1-1-user-authentication`

<action>Build complete inventory of all epics and stories from all epic files</action>
</step>

  <step n="0.5" goal="Discover and load project documents">
    <invoke-protocol name="discover_inputs" />
    <note>After discovery, these content variables are available: {epics_content} (all epics loaded - uses FULL_LOAD strategy)</note>
  </step>

<step n="2" goal="Build sprint status structure with dependencies">
<action>For each epic found, create entries in this order:</action>

1. **Epic entry** - Key: `epic-{num}`, Default status: `backlog`
2. **Story entries** - Key: `{epic}-{story}-{title}`, with `status` and `depends_on`
3. **Retrospective entry** - Key: `epic-{num}-retrospective`, Default status: `optional`

**Story entry format (object, not string):**

```yaml
development_status:
  epic-1: backlog
  1-1-user-authentication:
    status: backlog
    depends_on: []
  1-2-account-management:
    status: backlog
    depends_on: [1-1-user-authentication]
  1-3-plant-data-model:
    status: backlog
    depends_on: [1-1-user-authentication]
  1-4-add-plant-manual:
    status: backlog
    depends_on: [1-2-account-management, 1-3-plant-data-model]
  epic-1-retrospective: optional
```

**Dependency Calculation — Priority Cascade:**

Apply these rules in order. The FIRST matching rule wins for each story:

**Priority 1 — Explicit `Depends On` field in epic file:**
- Look for `**Depends On:**` field on each story
- `**Depends On:** None` → `depends_on: []` (explicitly no dependencies, can start immediately)
- `**Depends On:** Story 1.1, Story 1.3` → `depends_on: [1-1-..., 1-3-...]` (convert to kebab-case keys)
- This is the authoritative source when present. Do NOT override or supplement with inference.

**Priority 2 — Prose-based explicit references (fallback when no `Depends On` field):**
- Scan story title, description, and acceptance criteria for phrases like:
  - "depends on Story X.Y", "requires X.Y", "after X.Y is complete", "builds on X.Y"
- Convert matched references to kebab-case story keys

**Priority 3 — Sequential default (fallback when no explicit or prose references found):**
- Each story depends on the immediately preceding story within the same epic
- Story N.1 → `depends_on: []` (first story in epic always has no intra-epic dependencies)
- Story N.2 → `depends_on: [N-1-...]`
- Story N.3 → `depends_on: [N-2-...]`
- This is a safe default because `create-epics-and-stories` already enforces that stories are ordered so each can be completed based only on previous stories

**Rules that apply to ALL priorities:**

- **Intra-epic only**: Only track dependencies within the same epic. Cross-epic dependencies are handled by epic ordering.
- **Convert story references to kebab-case keys**: `Story 1.2: Account Management` → `1-2-account-management`
- **Validate references**: Every `depends_on` entry must reference a real story key within the same epic. Drop invalid references and warn.

</step>

<step n="3" goal="Apply intelligent status detection">
<action>For each story, detect current status by checking files:</action>

**Story file detection:**

- Check: `{story_location_absolute}/{story-key}.md` (e.g., `stories/1-1-user-authentication.md`)
- If exists → upgrade status to at least `ready-for-dev`

**Preservation rule:**

- If existing `{status_file}` exists and has more advanced status, preserve it
- Never downgrade status (e.g., don't change `done` to `ready-for-dev`)

**Status Flow Reference:**

- Epic: `backlog` → `in-progress` → `done`
- Story: `backlog` → `ready-for-dev` → `in-progress` → `review` → `done`
- Retrospective: `optional` ↔ `done`
  </step>

<step n="4" goal="Generate sprint status file">
<action>Create or update {status_file} with:</action>

**File Structure:**

```yaml
# generated: {date}
# project: {project_name}
# project_key: {project_key}
# tracking_system: {tracking_system}
# story_location: {story_location}

# STATUS DEFINITIONS:
# ==================
# Epic Status:
#   - backlog: Epic not yet started
#   - in-progress: Epic actively being worked on
#   - done: All stories in epic completed
#
# Story Format:
#   status: backlog | ready-for-dev | in-progress | review | done
#   depends_on: [] (list of story keys this story depends on, within same epic)
#
# Story Status Flow:
#   backlog → ready-for-dev → in-progress → review → done
#
# Retrospective Status:
#   - optional: Can be completed but not required
#   - done: Retrospective has been completed
#
# DEPENDENCY NOTES:
# =================
# - depends_on lists story keys that MUST be 'done' before this story can start
# - Only intra-epic dependencies are tracked (cross-epic deps handled by epic ordering)
# - Stories with empty depends_on [] can start immediately
# - dev-team-mode "delegate" execution mode uses depends_on for auto-scheduling
#
# WORKFLOW NOTES:
# ===============
# - Epic transitions to 'in-progress' automatically when first story is created
# - Stories can be worked in parallel if team capacity allows
# - SM typically creates next story after previous one is 'done' to incorporate learnings
# - Dev moves story to 'review', then runs code-review (fresh context, different LLM recommended)

generated: { date }
project: { project_name }
project_key: { project_key }
tracking_system: { tracking_system }
story_location: { story_location }

development_status:
  # All epics, stories (with status + depends_on), and retrospectives in order
```

<action>Write the complete sprint status YAML to {status_file}</action>
<action>CRITICAL: Metadata appears TWICE - once as comments (#) for documentation, once as YAML key:value fields for parsing</action>
<action>Ensure all items are ordered: epic, its stories, its retrospective, next epic...</action>
</step>

<step n="5" goal="Validate and report">
<action>Perform validation checks:</action>

- [ ] Every epic in epic files appears in {status_file}
- [ ] Every story in epic files appears in {status_file}
- [ ] Every epic has a corresponding retrospective entry
- [ ] No items in {status_file} that don't exist in epic files
- [ ] All status values are legal (match state machine definitions)
- [ ] File is valid YAML syntax

<action>Count totals:</action>

- Total epics: {{epic_count}}
- Total stories: {{story_count}}
- Epics in-progress: {{in_progress_count}}
- Stories done: {{done_count}}

<action>Display completion summary to {user_name} in {communication_language}:</action>

**Sprint Status Generated Successfully**

- **File Location:** {status_file}
- **Total Epics:** {{epic_count}}
- **Total Stories:** {{story_count}}
- **Epics In Progress:** {{epics_in_progress_count}}
- **Stories Completed:** {{done_count}}

**Next Steps:**

1. Review the generated {status_file}
2. Use this file to track development progress
3. Agents will update statuses as they work
4. Re-run this workflow to refresh auto-detected statuses

</step>

</workflow>

## Additional Documentation

### Status State Machine

**Epic Status Flow:**

```
backlog → in-progress → done
```

- **backlog**: Epic not yet started
- **in-progress**: Epic actively being worked on (stories being created/implemented)
- **done**: All stories in epic completed

**Story Status Flow:**

```
backlog → ready-for-dev → in-progress → review → done
```

- **backlog**: Story only exists in epic file
- **ready-for-dev**: Story file created (e.g., `stories/1-3-plant-naming.md`)
- **in-progress**: Developer actively working
- **review**: Ready for code review (via Dev's code-review workflow)
- **done**: Completed

**Retrospective Status:**

```
optional ↔ done
```

- **optional**: Ready to be conducted but not required
- **done**: Finished

### Guidelines

1. **Epic Activation**: Mark epic as `in-progress` when starting work on its first story
2. **Sequential Default**: Stories are typically worked in order, but parallel work is supported
3. **Parallel Work Supported**: Multiple stories can be `in-progress` if team capacity allows
4. **Review Before Done**: Stories should pass through `review` before `done`
5. **Learning Transfer**: SM typically creates next story after previous one is `done` to incorporate learnings

---
name: bmad-bmm-quick-dev
description: "Flexible development - execute tech-specs OR direct instructions with optional planning."
---

# Quick Dev Workflow

**Goal:** Execute implementation tasks efficiently, either from a tech-spec or direct user instructions.

**Your Role:** You are an elite full-stack developer executing tasks autonomously. Follow patterns, ship code, run tests. Every response moves the project forward.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for focused execution:

- Each step loads fresh to combat &quot;lost in the middle&quot;
- State persists via variables: &#x60;{baseline_commit}&#x60;, &#x60;{execution_mode}&#x60;, &#x60;{tech_spec_path}&#x60;
- Sequential progression through implementation phases

---

## INITIALIZATION

### Configuration Loading

Load config from &#x60;{project-root}/_bmad/bmm/config.yaml&#x60; and resolve:

- &#x60;user_name&#x60;, &#x60;communication_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;,  &#x60;implementation_artifacts&#x60;
- &#x60;date&#x60; as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Paths

- &#x60;installed_path&#x60; &#x3D; &#x60;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x60;
- &#x60;project_context&#x60; &#x3D; &#x60;**/project-context.md&#x60; (load if exists)

### Related Workflows

- &#x60;quick_spec_workflow&#x60; &#x3D; &#x60;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec/workflow.md&#x60;
- &#x60;party_mode_exec&#x60; &#x3D; &#x60;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x60;
- &#x60;advanced_elicitation&#x60; &#x3D; &#x60;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x60;

---

## EXECUTION

Read fully and follow: &#x60;steps/step-01-mode-detection.md&#x60; to begin the workflow.

---
name: &#x27;step-01-mode-detection&#x27;
description: &#x27;Determine execution mode (tech-spec vs direct), handle escalation, set state variables&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-01-mode-detection.md&#x27;
nextStepFile_modeA: &#x27;./step-03-execute.md&#x27;
nextStepFile_modeB: &#x27;./step-02-context-gathering.md&#x27;
---

# Step 1: Mode Detection

**Goal:** Determine execution mode, capture baseline, handle escalation if needed.

---

## STATE VARIABLES (capture now, persist throughout)

These variables MUST be set in this step and available to all subsequent steps:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start (or &quot;NO_GIT&quot; if not a git repo)
- &#x60;{execution_mode}&#x60; - &quot;tech-spec&quot; or &quot;direct&quot;
- &#x60;{tech_spec_path}&#x60; - Path to tech-spec file (if Mode A)

---

## EXECUTION SEQUENCE

### 1. Capture Baseline

First, check if the project uses Git version control:

**If Git repo exists** (&#x60;.git&#x60; directory present or &#x60;git rev-parse --is-inside-work-tree&#x60; succeeds):

- Run &#x60;git rev-parse HEAD&#x60; and store result as &#x60;{baseline_commit}&#x60;

**If NOT a Git repo:**

- Set &#x60;{baseline_commit}&#x60; &#x3D; &quot;NO_GIT&quot;

### 2. Load Project Context

Check if &#x60;{project_context}&#x60; exists (&#x60;**/project-context.md&#x60;). If found, load it as a foundational reference for ALL implementation decisions.

### 3. Parse User Input

Analyze the user&#x27;s input to determine mode:

**Mode A: Tech-Spec**

- User provided a path to a tech-spec file (e.g., &#x60;quick-dev tech-spec-auth.md&#x60;)
- Load the spec, extract tasks/context/AC
- Set &#x60;{execution_mode}&#x60; &#x3D; &quot;tech-spec&quot;
- Set &#x60;{tech_spec_path}&#x60; &#x3D; provided path
- **NEXT:** Read fully and follow: &#x60;step-03-execute.md&#x60;

**Mode B: Direct Instructions**

- User provided task description directly (e.g., &#x60;refactor src/foo.ts...&#x60;)
- Set &#x60;{execution_mode}&#x60; &#x3D; &quot;direct&quot;
- **NEXT:** Evaluate escalation threshold, then proceed

---

## ESCALATION THRESHOLD (Mode B only)

Evaluate user input with minimal token usage (no file loading):

**Triggers escalation (if 2+ signals present):**

- Multiple components mentioned (dashboard + api + database)
- System-level language (platform, integration, architecture)
- Uncertainty about approach (&quot;how should I&quot;, &quot;best way to&quot;)
- Multi-layer scope (UI + backend + data together)
- Extended timeframe (&quot;this week&quot;, &quot;over the next few days&quot;)

**Reduces signal:**

- Simplicity markers (&quot;just&quot;, &quot;quickly&quot;, &quot;fix&quot;, &quot;bug&quot;, &quot;typo&quot;, &quot;simple&quot;)
- Single file/component focus
- Confident, specific request

Use holistic judgment, not mechanical keyword matching.

---

## ESCALATION HANDLING

### No Escalation (simple request)

Display: &quot;**Select:** [P] Plan first (tech-spec) [E] Execute directly&quot;

#### Menu Handling Logic:

- IF P: Direct user to &#x60;{quick_spec_workflow}&#x60;. **EXIT Quick Dev.**
- IF E: Ask for any additional guidance, then **NEXT:** Read fully and follow: &#x60;step-02-context-gathering.md&#x60;

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed when user makes a selection

---

### Escalation Triggered - Level 0-2

Present: &quot;This looks like a focused feature with multiple components.&quot;

Display:

**[P] Plan first (tech-spec)** (recommended)
**[W] Seems bigger than quick-dev** - Recommend the Full BMad Flow PRD Process
**[E] Execute directly**

#### Menu Handling Logic:

- IF P: Direct to &#x60;{quick_spec_workflow}&#x60;. **EXIT Quick Dev.**
- IF W: Direct user to run the PRD workflow instead. **EXIT Quick Dev.**
- IF E: Ask for guidance, then **NEXT:** Read fully and follow: &#x60;step-02-context-gathering.md&#x60;

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed when user makes a selection

---

### Escalation Triggered - Level 3+

Present: &quot;This sounds like platform/system work.&quot;

Display:

**[W] Start BMad Method** (recommended)
**[P] Plan first (tech-spec)** (lighter planning)
**[E] Execute directly** - feeling lucky

#### Menu Handling Logic:

- IF P: Direct to &#x60;{quick_spec_workflow}&#x60;. **EXIT Quick Dev.**
- IF W: Direct user to run the PRD workflow instead. **EXIT Quick Dev.**
- IF E: Ask for guidance, then **NEXT:** Read fully and follow: &#x60;step-02-context-gathering.md&#x60;

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed when user makes a selection

---

## NEXT STEP DIRECTIVE

**CRITICAL:** When this step completes, explicitly state which step to load:

- Mode A (tech-spec): &quot;**NEXT:** read fully and follow: &#x60;step-03-execute.md&#x60;&quot;
- Mode B (direct, [E] selected): &quot;**NEXT:** Read fully and follow: &#x60;step-02-context-gathering.md&#x60;&quot;
- Escalation ([P] or [W]): &quot;**EXITING Quick Dev.** Follow the directed workflow.&quot;

---

## SUCCESS METRICS

- &#x60;{baseline_commit}&#x60; captured and stored
- &#x60;{execution_mode}&#x60; determined (&quot;tech-spec&quot; or &quot;direct&quot;)
- &#x60;{tech_spec_path}&#x60; set if Mode A
- Project context loaded if exists
- Escalation evaluated appropriately (Mode B)
- Explicit NEXT directive provided

## FAILURE MODES

- Proceeding without capturing baseline commit
- Not setting execution_mode variable
- Loading step-02 when Mode A (tech-spec provided)
- Attempting to &quot;return&quot; after escalation instead of EXIT
- No explicit NEXT directive at step completion


---
name: &#x27;step-02-context-gathering&#x27;
description: &#x27;Quick context gathering for direct mode - identify files, patterns, dependencies&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-02-context-gathering.md&#x27;
nextStepFile: &#x27;./step-03-execute.md&#x27;
---

# Step 2: Context Gathering (Direct Mode)

**Goal:** Quickly gather context for direct instructions - files, patterns, dependencies.

**Note:** This step only runs for Mode B (direct instructions). If &#x60;{execution_mode}&#x60; is &quot;tech-spec&quot;, this step was skipped.

---

## AVAILABLE STATE

From step-01:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start
- &#x60;{execution_mode}&#x60; - Should be &quot;direct&quot;
- &#x60;{project_context}&#x60; - Loaded if exists

---

## EXECUTION SEQUENCE

### 1. Identify Files to Modify

Based on user&#x27;s direct instructions:

- Search for relevant files using glob/grep
- Identify the specific files that need changes
- Note file locations and purposes

### 2. Find Relevant Patterns

Examine the identified files and their surroundings:

- Code style and conventions used
- Existing patterns for similar functionality
- Import/export patterns
- Error handling approaches
- Test patterns (if tests exist nearby)

### 3. Note Dependencies

Identify:

- External libraries used
- Internal module dependencies
- Configuration files that may need updates
- Related files that might be affected

### 4. Create Mental Plan

Synthesize gathered context into:

- List of tasks to complete
- Acceptance criteria (inferred from user request)
- Order of operations
- Files to touch

---

## PRESENT PLAN

Display to user:

&#x60;&#x60;&#x60;
**Context Gathered:**

**Files to modify:**
- {list files}

**Patterns identified:**
- {key patterns}

**Plan:**
1. {task 1}
2. {task 2}
...

**Inferred AC:**
- {acceptance criteria}

Ready to execute? (y/n/adjust)
&#x60;&#x60;&#x60;

- **y:** Proceed to execution
- **n:** Gather more context or clarify
- **adjust:** Modify the plan based on feedback

---

## NEXT STEP DIRECTIVE

**CRITICAL:** When user confirms ready, explicitly state:

- **y:** &quot;**NEXT:** Read fully and follow: &#x60;step-03-execute.md&#x60;&quot;
- **n/adjust:** Continue gathering context, then re-present plan

---

## SUCCESS METRICS

- Files to modify identified
- Relevant patterns documented
- Dependencies noted
- Mental plan created with tasks and AC
- User confirmed readiness to proceed

## FAILURE MODES

- Executing this step when Mode A (tech-spec)
- Proceeding without identifying files to modify
- Not presenting plan for user confirmation
- Missing obvious patterns in existing code


---
name: &#x27;step-03-execute&#x27;
description: &#x27;Execute implementation - iterate through tasks, write code, run tests&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-03-execute.md&#x27;
nextStepFile: &#x27;./step-04-self-check.md&#x27;
---

# Step 3: Execute Implementation

**Goal:** Implement all tasks, write tests, follow patterns, handle errors.

**Critical:** Continue through ALL tasks without stopping for milestones.

---

## AVAILABLE STATE

From previous steps:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start
- &#x60;{execution_mode}&#x60; - &quot;tech-spec&quot; or &quot;direct&quot;
- &#x60;{tech_spec_path}&#x60; - Tech-spec file (if Mode A)
- &#x60;{project_context}&#x60; - Project patterns (if exists)

From context:

- Mode A: Tasks and AC extracted from tech-spec
- Mode B: Tasks and AC from step-02 mental plan

---

## EXECUTION LOOP

For each task:

### 1. Load Context

- Read files relevant to this task
- Review patterns from project-context or observed code
- Understand dependencies

### 2. Implement

- Write code following existing patterns
- Handle errors appropriately
- Follow conventions observed in codebase
- Add appropriate comments where non-obvious

### 3. Test

- Write tests if appropriate for the change
- Run existing tests to catch regressions
- Verify the specific AC for this task

### 4. Mark Complete

- Check off task: &#x60;- [x] Task N&#x60;
- Continue to next task immediately

---

## HALT CONDITIONS

**HALT and request guidance if:**

- 3 consecutive failures on same task
- Tests fail and fix is not obvious
- Blocking dependency discovered
- Ambiguity that requires user decision

**Do NOT halt for:**

- Minor issues that can be noted and continued
- Warnings that don&#x27;t block functionality
- Style preferences (follow existing patterns)

---

## CONTINUOUS EXECUTION

**Critical:** Do not stop between tasks for approval.

- Execute all tasks in sequence
- Only halt for blocking issues
- Tests failing &#x3D; fix before continuing
- Track all completed work for self-check

---

## NEXT STEP

When ALL tasks are complete (or halted on blocker), read fully and follow: &#x60;step-04-self-check.md&#x60;.

---

## SUCCESS METRICS

- All tasks attempted
- Code follows existing patterns
- Error handling appropriate
- Tests written where appropriate
- Tests passing
- No unnecessary halts

## FAILURE MODES

- Stopping for approval between tasks
- Ignoring existing patterns
- Not running tests after changes
- Giving up after first failure
- Not following project-context rules (if exists)


---
name: &#x27;step-04-self-check&#x27;
description: &#x27;Self-audit implementation against tasks, tests, AC, and patterns&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-04-self-check.md&#x27;
nextStepFile: &#x27;./step-05-adversarial-review.md&#x27;
---

# Step 4: Self-Check

**Goal:** Audit completed work against tasks, tests, AC, and patterns before external review.

---

## AVAILABLE STATE

From previous steps:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start
- &#x60;{execution_mode}&#x60; - &quot;tech-spec&quot; or &quot;direct&quot;
- &#x60;{tech_spec_path}&#x60; - Tech-spec file (if Mode A)
- &#x60;{project_context}&#x60; - Project patterns (if exists)

---

## SELF-CHECK AUDIT

### 1. Tasks Complete

Verify all tasks are marked complete:

- [ ] All tasks from tech-spec or mental plan marked &#x60;[x]&#x60;
- [ ] No tasks skipped without documented reason
- [ ] Any blocked tasks have clear explanation

### 2. Tests Passing

Verify test status:

- [ ] All existing tests still pass
- [ ] New tests written for new functionality
- [ ] No test warnings or skipped tests without reason

### 3. Acceptance Criteria Satisfied

For each AC:

- [ ] AC is demonstrably met
- [ ] Can explain how implementation satisfies AC
- [ ] Edge cases considered

### 4. Patterns Followed

Verify code quality:

- [ ] Follows existing code patterns in codebase
- [ ] Follows project-context rules (if exists)
- [ ] Error handling consistent with codebase
- [ ] No obvious code smells introduced

---

## UPDATE TECH-SPEC (Mode A only)

If &#x60;{execution_mode}&#x60; is &quot;tech-spec&quot;:

1. Load &#x60;{tech_spec_path}&#x60;
2. Mark all tasks as &#x60;[x]&#x60; complete
3. Update status to &quot;Implementation Complete&quot;
4. Save changes

---

## IMPLEMENTATION SUMMARY

Present summary to transition to review:

&#x60;&#x60;&#x60;
**Implementation Complete!**

**Summary:** {what was implemented}
**Files Modified:** {list of files}
**Tests:** {test summary - passed/added/etc}
**AC Status:** {all satisfied / issues noted}

Proceeding to adversarial code review...
&#x60;&#x60;&#x60;

---

## NEXT STEP

Proceed immediately to &#x60;step-05-adversarial-review.md&#x60;.

---

## SUCCESS METRICS

- All tasks verified complete
- All tests passing
- All AC satisfied
- Patterns followed
- Tech-spec updated (if Mode A)
- Summary presented

## FAILURE MODES

- Claiming tasks complete when they&#x27;re not
- Not running tests before proceeding
- Missing AC verification
- Ignoring pattern violations
- Not updating tech-spec status (Mode A)


---
name: &#x27;step-05-adversarial-review&#x27;
description: &#x27;Construct diff and invoke adversarial review task&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-05-adversarial-review.md&#x27;
nextStepFile: &#x27;./step-06-resolve-findings.md&#x27;
---

# Step 5: Adversarial Code Review

**Goal:** Construct diff of all changes, invoke adversarial review task, present findings.

---

## AVAILABLE STATE

From previous steps:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start (CRITICAL for diff)
- &#x60;{execution_mode}&#x60; - &quot;tech-spec&quot; or &quot;direct&quot;
- &#x60;{tech_spec_path}&#x60; - Tech-spec file (if Mode A)

---

### 1. Construct Diff

Build complete diff of all changes since workflow started.

### If &#x60;{baseline_commit}&#x60; is a Git commit hash:

**Tracked File Changes:**

&#x60;&#x60;&#x60;bash
git diff {baseline_commit}
&#x60;&#x60;&#x60;

**New Untracked Files:**
Only include untracked files that YOU created during this workflow (steps 2-4).
Do not include pre-existing untracked files.
For each new file created, include its full content as a &quot;new file&quot; addition.

### If &#x60;{baseline_commit}&#x60; is &quot;NO_GIT&quot;:

Use best-effort diff construction:

- List all files you modified during steps 2-4
- For each file, show the changes you made (before/after if you recall, or just current state)
- Include any new files you created with their full content
- Note: This is less precise than Git diff but still enables meaningful review

### Capture as {diff_output}

Merge all changes into &#x60;{diff_output}&#x60;.

**Note:** Do NOT &#x60;git add&#x60; anything - this is read-only inspection.

---

### 2. Invoke Adversarial Review

With &#x60;{diff_output}&#x60; constructed, invoke the review task. If possible, use information asymmetry: run this step, and only it, in a separate subagent or process with read access to the project, but no context except the &#x60;{diff_output}&#x60;.

&#x60;&#x60;&#x60;xml
&lt;invoke-task&gt;Review {diff_output} using {project-root}/_bmad/core/tasks/review-adversarial-general.xml&lt;/invoke-task&gt;
&#x60;&#x60;&#x60;

**Platform fallback:** If task invocation not available, load the task file and follow its instructions inline, passing &#x60;{diff_output}&#x60; as the content.

The task should: review &#x60;{diff_output}&#x60; and return a list of findings.

---

### 3. Process Findings

Capture the findings from the task output.
**If zero findings:** HALT - this is suspicious. Re-analyze or request user guidance.
Evaluate severity (Critical, High, Medium, Low) and validity (real, noise, undecided).
DO NOT exclude findings based on severity or validity unless explicitly asked to do so.
Order findings by severity.
Number the ordered findings (F1, F2, F3, etc.).
If TodoWrite or similar tool is available, turn each finding into a TODO, include ID, severity, validity, and description in the TODO; otherwise present findings as a table with columns: ID, Severity, Validity, Description

---

## NEXT STEP

With findings in hand, read fully and follow: &#x60;step-06-resolve-findings.md&#x60; for user to choose resolution approach.

---

## SUCCESS METRICS

- Diff constructed from baseline_commit
- New files included in diff
- Task invoked with diff as input
- Findings received
- Findings processed into TODOs or table and presented to user

## FAILURE MODES

- Missing baseline_commit (can&#x27;t construct accurate diff)
- Not including new untracked files in diff
- Invoking task without providing diff input
- Accepting zero findings without questioning
- Presenting fewer findings than the review task returned without explicit instruction to do so


---
name: &#x27;step-06-resolve-findings&#x27;
description: &#x27;Handle review findings interactively, apply fixes, update tech-spec with final status&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-dev&#x27;
thisStepFile: &#x27;./step-06-resolve-findings.md&#x27;
---

# Step 6: Resolve Findings

**Goal:** Handle adversarial review findings interactively, apply fixes, finalize tech-spec.

---

## AVAILABLE STATE

From previous steps:

- &#x60;{baseline_commit}&#x60; - Git HEAD at workflow start
- &#x60;{execution_mode}&#x60; - &quot;tech-spec&quot; or &quot;direct&quot;
- &#x60;{tech_spec_path}&#x60; - Tech-spec file (if Mode A)
- Findings table from step-05

---

## RESOLUTION OPTIONS

Present: &quot;How would you like to handle these findings?&quot;

Display:

**[W] Walk through** - Discuss each finding individually
**[F] Fix automatically** - Automatically fix issues classified as &quot;real&quot;
**[S] Skip** - Acknowledge and proceed to commit

### Menu Handling Logic:

- IF W: Execute WALK THROUGH section below
- IF F: Execute FIX AUTOMATICALLY section below
- IF S: Execute SKIP section below

### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed when user makes a selection

---

## WALK THROUGH [W]

For each finding in order:

1. Present the finding with context
2. Ask: **fix now / skip / discuss**
3. If fix: Apply the fix immediately
4. If skip: Note as acknowledged, continue
5. If discuss: Provide more context, re-ask
6. Move to next finding

After all findings processed, summarize what was fixed/skipped.

---

## FIX AUTOMATICALLY [F]

1. Filter findings to only those classified as &quot;real&quot;
2. Apply fixes for each real finding
3. Report what was fixed:

&#x60;&#x60;&#x60;
**Auto-fix Applied:**
- F1: {description of fix}
- F3: {description of fix}
...

Skipped (noise/uncertain): F2, F4
&#x60;&#x60;&#x60;

---

## SKIP [S]

1. Acknowledge all findings were reviewed
2. Note that user chose to proceed without fixes
3. Continue to completion

---

## UPDATE TECH-SPEC (Mode A only)

If &#x60;{execution_mode}&#x60; is &quot;tech-spec&quot;:

1. Load &#x60;{tech_spec_path}&#x60;
2. Update status to &quot;Completed&quot;
3. Add review notes:
   &#x60;&#x60;&#x60;
   ## Review Notes
   - Adversarial review completed
   - Findings: {count} total, {fixed} fixed, {skipped} skipped
   - Resolution approach: {walk-through/auto-fix/skip}
   &#x60;&#x60;&#x60;
4. Save changes

---

## COMPLETION OUTPUT

&#x60;&#x60;&#x60;
**Review complete. Ready to commit.**

**Implementation Summary:**
- {what was implemented}
- Files modified: {count}
- Tests: {status}
- Review findings: {X} addressed, {Y} skipped

{Explain what was implemented based on user_skill_level}
&#x60;&#x60;&#x60;

---

## WORKFLOW COMPLETE

This is the final step. The Quick Dev workflow is now complete.

User can:

- Commit changes
- Run additional tests
- Start new Quick Dev session

---

## SUCCESS METRICS

- User presented with resolution options
- Chosen approach executed correctly
- Fixes applied cleanly (if applicable)
- Tech-spec updated with final status (Mode A)
- Completion summary provided
- User understands what was implemented

## FAILURE MODES

- Not presenting resolution options
- Auto-fixing &quot;noise&quot; or &quot;uncertain&quot; findings
- Not updating tech-spec after resolution (Mode A)
- No completion summary
- Leaving user unclear on next steps


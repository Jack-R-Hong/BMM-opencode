---
name: bmad-bmm-quick-spec
description: Conversational spec engineering - ask questions, investigate code, produce implementation-ready tech-spec.
---

# Quick-Spec Workflow

**Goal:** Create implementation-ready technical specifications through conversational discovery, code investigation, and structured documentation.

**READY FOR DEVELOPMENT STANDARD:**

A specification is considered &quot;Ready for Development&quot; ONLY if it meets the following:

- **Actionable**: Every task has a clear file path and specific action.
- **Logical**: Tasks are ordered by dependency (lowest level first).
- **Testable**: All ACs follow Given/When/Then and cover happy path and edge cases.
- **Complete**: All investigation results from Step 2 are inlined; no placeholders or &quot;TBD&quot;.
- **Self-Contained**: A fresh agent can implement the feature without reading the workflow history.

---

**Your Role:** You are an elite developer and spec engineer. You ask sharp questions, investigate existing code thoroughly, and produce specs that contain ALL context a fresh dev agent needs to implement the feature. No handoffs, no missing context - just complete, actionable specs.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

### Core Principles

- **Micro-file Design**: Each step is a self-contained instruction file that must be followed exactly
- **Just-In-Time Loading**: Only the current step file is in memory - never load future step files until directed
- **Sequential Enforcement**: Sequence within step files must be completed in order, no skipping or optimization
- **State Tracking**: Document progress in output file frontmatter using &#x60;stepsCompleted&#x60; array
- **Append-Only Building**: Build the tech-spec by updating content as directed

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order, never deviate
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: Only proceed to next step when user selects [C] (Continue)
5. **SAVE STATE**: Update &#x60;stepsCompleted&#x60; in frontmatter before loading next step
6. **LOAD NEXT**: When directed, read fully and follow the next step file

### Critical Rules (NO EXCEPTIONS)

- **NEVER** load multiple step files simultaneously
- **ALWAYS** read entire step file before execution
- **NEVER** skip steps or optimize the sequence
- **ALWAYS** update frontmatter of output file when completing a step
- **ALWAYS** follow the exact instructions in the step file
- **ALWAYS** halt at menus and wait for user input
- **NEVER** create mental todo lists from future steps

---

## INITIALIZATION SEQUENCE

### 1. Configuration Loading

Load and read full config from &#x60;{main_config}&#x60; and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;implementation_artifacts&#x60;, &#x60;user_name&#x60;
- &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;date&#x60; as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### 2. First Step Execution

Read fully and follow: &#x60;steps/step-01-understand.md&#x60; to begin the workflow.

---
name: &#x27;step-01-understand&#x27;
description: &#x27;Analyze the requirement delta between current state and what user wants to build&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec&#x27;
nextStepFile: &#x27;./step-02-investigate.md&#x27;
skipToStepFile: &#x27;./step-03-generate.md&#x27;
templateFile: &#x27;{workflow_path}/tech-spec-template.md&#x27;
wipFile: &#x27;{implementation_artifacts}/tech-spec-wip.md&#x27;
---

# Step 1: Analyze Requirement Delta

**Progress: Step 1 of 4** - Next: Deep Investigation

## RULES:

- MUST NOT skip steps.
- MUST NOT optimize sequence.
- MUST follow exact instructions.
- MUST NOT look ahead to future steps.
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## CONTEXT:

- Variables from &#x60;workflow.md&#x60; are available in memory.
- Focus: Define the technical requirement delta and scope.
- Investigation: Perform surface-level code scans ONLY to verify the delta. Reserve deep dives into implementation consequences for Step 2.
- Objective: Establish a verifiable delta between current state and target state.

## SEQUENCE OF INSTRUCTIONS

### 0. Check for Work in Progress

a) **Before anything else, check if &#x60;{wipFile}&#x60; exists:**

b) **IF WIP FILE EXISTS:**

1. Read the frontmatter and extract: &#x60;title&#x60;, &#x60;slug&#x60;, &#x60;stepsCompleted&#x60;
2. Calculate progress: &#x60;lastStep &#x3D; max(stepsCompleted)&#x60;
3. Present to user:

&#x60;&#x60;&#x60;
Hey {user_name}! Found a tech-spec in progress:

**{title}** - Step {lastStep} of 4 complete

Is this what you&#x27;re here to continue?

[Y] Yes, pick up where I left off
[N] No, archive it and start something new
&#x60;&#x60;&#x60;

4. **HALT and wait for user selection.**

a) **Menu Handling:**

- **[Y] Continue existing:**
  - Jump directly to the appropriate step based on &#x60;stepsCompleted&#x60;:
    - &#x60;[1]&#x60; → Load &#x60;{nextStepFile}&#x60; (Step 2)
    - &#x60;[1, 2]&#x60; → Load &#x60;{skipToStepFile}&#x60; (Step 3)
    - &#x60;[1, 2, 3]&#x60; → Load &#x60;./step-04-review.md&#x60; (Step 4)
- **[N] Archive and start fresh:**
  - Rename &#x60;{wipFile}&#x60; to &#x60;{implementation_artifacts}/tech-spec-{slug}-archived-{date}.md&#x60;

### 1. Greet and Ask for Initial Request

a) **Greet the user briefly:**

&quot;Hey {user_name}! What are we building today?&quot;

b) **Get their initial description.** Don&#x27;t ask detailed questions yet - just understand enough to know where to look.

### 2. Quick Orient Scan

a) **Before asking detailed questions, do a rapid scan to understand the landscape:**

b) **Check for existing context docs:**

- Check &#x60;{output_folder}&#x60; and &#x60;{planning_artifacts}&#x60;for planning documents (PRD, architecture, epics, research)
- Check for &#x60;**/project-context.md&#x60; - if it exists, skim for patterns and conventions
- Check for any existing stories or specs related to user&#x27;s request

c) **If user mentioned specific code/features, do a quick scan:**

- Search for relevant files/classes/functions they mentioned
- Skim the structure (don&#x27;t deep-dive yet - that&#x27;s Step 2)
- Note: tech stack, obvious patterns, file locations

d) **Build mental model:**

- What&#x27;s the likely landscape for this feature?
- What&#x27;s the likely scope based on what you found?
- What questions do you NOW have, informed by the code?

**This scan should take &lt; 30 seconds. Just enough to ask smart questions.**

### 3. Ask Informed Questions

a) **Now ask clarifying questions - but make them INFORMED by what you found:**

Instead of generic questions like &quot;What&#x27;s the scope?&quot;, ask specific ones like:
- &quot;&#x60;AuthService&#x60; handles validation in the controller — should the new field follow that pattern or move it to a dedicated validator?&quot;
- &quot;&#x60;NavigationSidebar&#x60; component uses local state for the &#x27;collapsed&#x27; toggle — should we stick with that or move it to the global store?&quot;
- &quot;The epics doc mentions X - is this related?&quot;

**Adapt to {user_skill_level}.** Technical users want technical questions. Non-technical users need translation.

b) **If no existing code is found:**

- Ask about intended architecture, patterns, constraints
- Ask what similar systems they&#x27;d like to emulate

### 4. Capture Core Understanding

a) **From the conversation, extract and confirm:**

- **Title**: A clear, concise name for this work
- **Slug**: URL-safe version of title (lowercase, hyphens, no spaces)
- **Problem Statement**: What problem are we solving?
- **Solution**: High-level approach (1-2 sentences)
- **In Scope**: What&#x27;s included
- **Out of Scope**: What&#x27;s explicitly NOT included

b) **Ask the user to confirm the captured understanding before proceeding.**

### 5. Initialize WIP File

a) **Create the tech-spec WIP file:**

1. Copy template from &#x60;{templateFile}&#x60;
2. Write to &#x60;{wipFile}&#x60;
3. Update frontmatter with captured values:
   &#x60;&#x60;&#x60;yaml
   ---
   title: &#x27;{title}&#x27;
   slug: &#x27;{slug}&#x27;
   created: &#x27;{date}&#x27;
   status: &#x27;in-progress&#x27;
   stepsCompleted: [1]
   tech_stack: []
   files_to_modify: []
   code_patterns: []
   test_patterns: []
   ---
   &#x60;&#x60;&#x60;
4. Fill in Overview section with Problem Statement, Solution, and Scope
5. Fill in Context for Development section with any technical preferences or constraints gathered during informed discovery.
6. Write the file

b) **Report to user:**

&quot;Created: &#x60;{wipFile}&#x60;

**Captured:**

- Title: {title}
- Problem: {problem_statement_summary}
- Scope: {scope_summary}&quot;

### 6. Present Checkpoint Menu

a) **Display menu:**

Display: &quot;**Select:** [A] Advanced Elicitation [P] Party Mode [C] Continue to Deep Investigation (Step 2 of 4)&quot;

b) **HALT and wait for user selection.**

#### Menu Handling Logic:

- IF A: Read fully and follow: &#x60;{advanced_elicitation}&#x60; with current tech-spec content, process enhanced insights, ask user &quot;Accept improvements? (y/n)&quot;, if yes update WIP file then redisplay menu, if no keep original then redisplay menu
- IF P: Read fully and follow: &#x60;{party_mode_exec}&#x60; with current tech-spec content, process collaborative insights, ask user &quot;Accept changes? (y/n)&quot;, if yes update WIP file then redisplay menu, if no keep original then redisplay menu
- IF C: Verify &#x60;{wipFile}&#x60; has &#x60;stepsCompleted: [1]&#x60;, then read fully and follow: &#x60;{nextStepFile}&#x60;
- IF Any other comments or queries: respond helpfully then redisplay menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After A or P execution, return to this menu

---

## REQUIRED OUTPUTS:

- MUST initialize WIP file with captured metadata.

## VERIFICATION CHECKLIST:

- [ ] WIP check performed FIRST before any greeting.
- [ ] &#x60;{wipFile}&#x60; created with correct frontmatter, Overview, Context for Development, and &#x60;stepsCompleted: [1]&#x60;.
- [ ] User selected [C] to continue.


---
name: &#x27;step-02-investigate&#x27;
description: &#x27;Map technical constraints and anchor points within the codebase&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec&#x27;
nextStepFile: &#x27;./step-03-generate.md&#x27;
wipFile: &#x27;{implementation_artifacts}/tech-spec-wip.md&#x27;
---

# Step 2: Map Technical Constraints &amp; Anchor Points

**Progress: Step 2 of 4** - Next: Generate Plan

## RULES:

- MUST NOT skip steps.
- MUST NOT optimize sequence.
- MUST follow exact instructions.
- MUST NOT generate the full spec yet (that&#x27;s Step 3).
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## CONTEXT:

- Requires &#x60;{wipFile}&#x60; from Step 1 with the &quot;Problem Statement&quot; defined.
- Focus: Map the problem statement to specific anchor points in the codebase.
- Output: Exact files to touch, classes/patterns to extend, and technical constraints identified.
- Objective: Provide the implementation-ready ground truth for the plan.

## SEQUENCE OF INSTRUCTIONS

### 1. Load Current State

**Read &#x60;{wipFile}&#x60; and extract:**

- Problem statement and scope from Overview section
- Any context gathered in Step 1

### 2. Execute Investigation Path

**Universal Code Investigation:**

_Isolate deep exploration in sub-agents/tasks where available. Return distilled summaries only to prevent context snowballing._

a) **Build on Step 1&#x27;s Quick Scan**

Review what was found in Step 1&#x27;s orient scan. Then ask:

&quot;Based on my quick look, I see [files/patterns found]. Are there other files or directories I should investigate deeply?&quot;

b) **Read and Analyze Code**

For each file/directory provided:

- Read the complete file(s)
- Identify patterns, conventions, coding style
- Note dependencies and imports
- Find related test files

**If NO relevant code is found (Clean Slate):**

- Identify the target directory where the feature should live.
- Scan parent directories for architectural context.
- Identify standard project utilities or boilerplate that SHOULD be used.
- Document this as &quot;Confirmed Clean Slate&quot; - establishing that no legacy constraints exist.


c) **Document Technical Context**

Capture and confirm with user:

- **Tech Stack**: Languages, frameworks, libraries
- **Code Patterns**: Architecture patterns, naming conventions, file structure
- **Files to Modify/Create**: Specific files that will need changes or new files to be created
- **Test Patterns**: How tests are structured, test frameworks used

d) **Look for project-context.md**

If &#x60;**/project-context.md&#x60; exists and wasn&#x27;t loaded in Step 1:

- Load it now
- Extract patterns and conventions
- Note any rules that must be followed

### 3. Update WIP File

**Update &#x60;{wipFile}&#x60; frontmatter:**

&#x60;&#x60;&#x60;yaml
---
# ... existing frontmatter ...
stepsCompleted: [1, 2]
tech_stack: [&#x27;{captured_tech_stack}&#x27;]
files_to_modify: [&#x27;{captured_files}&#x27;]
code_patterns: [&#x27;{captured_patterns}&#x27;]
test_patterns: [&#x27;{captured_test_patterns}&#x27;]
---
&#x60;&#x60;&#x60;

**Update the Context for Development section:**

Fill in:

- Codebase Patterns (from investigation)
- Files to Reference table (files reviewed)
- Technical Decisions (any decisions made during investigation)

**Report to user:**

&quot;**Context Gathered:**

- Tech Stack: {tech_stack_summary}
- Files to Modify: {files_count} files identified
- Patterns: {patterns_summary}
- Tests: {test_patterns_summary}&quot;

### 4. Present Checkpoint Menu

Display: &quot;**Select:** [A] Advanced Elicitation [P] Party Mode [C] Continue to Generate Spec (Step 3 of 4)&quot;

**HALT and wait for user selection.**

#### Menu Handling Logic:

- IF A: Read fully and follow: &#x60;{advanced_elicitation}&#x60; with current tech-spec content, process enhanced insights, ask user &quot;Accept improvements? (y/n)&quot;, if yes update WIP file then redisplay menu, if no keep original then redisplay menu
- IF P: Read fully and follow: &#x60;{party_mode_exec}&#x60; with current tech-spec content, process collaborative insights, ask user &quot;Accept changes? (y/n)&quot;, if yes update WIP file then redisplay menu, if no keep original then redisplay menu
- IF C: Verify frontmatter updated with &#x60;stepsCompleted: [1, 2]&#x60;, then read fully and follow: &#x60;{nextStepFile}&#x60;
- IF Any other comments or queries: respond helpfully then redisplay menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After A or P execution, return to this menu

---

## REQUIRED OUTPUTS:

- MUST document technical context (stack, patterns, files identified).
- MUST update &#x60;{wipFile}&#x60; with functional context.

## VERIFICATION CHECKLIST:

- [ ] Technical mapping performed and documented.
- [ ] &#x60;stepsCompleted: [1, 2]&#x60; set in frontmatter.


---
name: &#x27;step-03-generate&#x27;
description: &#x27;Build the implementation plan based on the technical mapping of constraints&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec&#x27;
nextStepFile: &#x27;./step-04-review.md&#x27;
wipFile: &#x27;{implementation_artifacts}/tech-spec-wip.md&#x27;
---

# Step 3: Generate Implementation Plan

**Progress: Step 3 of 4** - Next: Review &amp; Finalize

## RULES:

- MUST NOT skip steps.
- MUST NOT optimize sequence.
- MUST follow exact instructions.
- MUST NOT implement anything - just document.
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## CONTEXT:

- Requires &#x60;{wipFile}&#x60; with defined &quot;Overview&quot; and &quot;Context for Development&quot; sections.
- Focus: Create the implementation sequence that addresses the requirement delta using the captured technical context.
- Output: Implementation-ready tasks with specific files and instructions.
- Target: Meet the **READY FOR DEVELOPMENT** standard defined in &#x60;workflow.md&#x60;.

## SEQUENCE OF INSTRUCTIONS

### 1. Load Current State

**Read &#x60;{wipFile}&#x60; completely and extract:**

- All frontmatter values
- Overview section (Problem, Solution, Scope)
- Context for Development section (Patterns, Files, Decisions)

### 2. Generate Implementation Plan

Generate specific implementation tasks:

a) **Task Breakdown**

- Each task should be a discrete, completable unit of work
- Tasks should be ordered logically (dependencies first)
- Include the specific files to modify in each task
- Be explicit about what changes to make

b) **Task Format**

&#x60;&#x60;&#x60;markdown
- [ ] Task N: Clear action description
  - File: &#x60;path/to/file.ext&#x60;
  - Action: Specific change to make
  - Notes: Any implementation details
&#x60;&#x60;&#x60;

### 3. Generate Acceptance Criteria

**Create testable acceptance criteria:**

Each AC should follow Given/When/Then format:

&#x60;&#x60;&#x60;markdown
- [ ] AC N: Given [precondition], when [action], then [expected result]
&#x60;&#x60;&#x60;

**Ensure ACs cover:**

- Happy path functionality
- Error handling
- Edge cases (if relevant)
- Integration points (if relevant)

### 4. Complete Additional Context

**Fill in remaining sections:**

a) **Dependencies**

- External libraries or services needed
- Other tasks or features this depends on
- API or data dependencies

b) **Testing Strategy**

- Unit tests needed
- Integration tests needed
- Manual testing steps

c) **Notes**

- High-risk items from pre-mortem analysis
- Known limitations
- Future considerations (out of scope but worth noting)

### 5. Write Complete Spec

a) **Update &#x60;{wipFile}&#x60; with all generated content:**

- Ensure all template sections are filled in
- No placeholder text remaining
- All frontmatter values current
- Update status to &#x27;review&#x27; (NOT &#x27;ready-for-dev&#x27; - that happens after user review in Step 4)

b) **Update frontmatter:**

&#x60;&#x60;&#x60;yaml
---
# ... existing values ...
status: &#x27;review&#x27;
stepsCompleted: [1, 2, 3]
---
&#x60;&#x60;&#x60;

c) **Read fully and follow: &#x60;{nextStepFile}&#x60; (Step 4)**

## REQUIRED OUTPUTS:

- Tasks MUST be specific, actionable, ordered logically, with files to modify.
- ACs MUST be testable, using Given/When/Then format.
- Status MUST be updated to &#x27;review&#x27;.

## VERIFICATION CHECKLIST:

- [ ] &#x60;stepsCompleted: [1, 2, 3]&#x60; set in frontmatter.
- [ ] Spec meets the **READY FOR DEVELOPMENT** standard.


---
name: &#x27;step-04-review&#x27;
description: &#x27;Review and finalize the tech-spec&#x27;

workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/bmad-quick-flow/quick-spec&#x27;
wipFile: &#x27;{implementation_artifacts}/tech-spec-wip.md&#x27;
---

# Step 4: Review &amp; Finalize

**Progress: Step 4 of 4** - Final Step

## RULES:

- MUST NOT skip steps.
- MUST NOT optimize sequence.
- MUST follow exact instructions.
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## CONTEXT:

- Requires &#x60;{wipFile}&#x60; from Step 3. 
- MUST present COMPLETE spec content. Iterate until user is satisfied.
- **Criteria**: The spec MUST meet the **READY FOR DEVELOPMENT** standard defined in &#x60;workflow.md&#x60;.

## SEQUENCE OF INSTRUCTIONS

### 1. Load and Present Complete Spec

**Read &#x60;{wipFile}&#x60; completely and extract &#x60;slug&#x60; from frontmatter for later use.**

**Present to user:**

&quot;Here&#x27;s your complete tech-spec. Please review:&quot;

[Display the complete spec content - all sections]

&quot;**Quick Summary:**

- {task_count} tasks to implement
- {ac_count} acceptance criteria to verify
- {files_count} files to modify&quot;

**Present review menu:**

Display: &quot;**Select:** [C] Continue [E] Edit [Q] Questions [A] Advanced Elicitation [P] Party Mode&quot;

**HALT and wait for user selection.**

#### Menu Handling Logic:

- IF C: Proceed to Section 3 (Finalize the Spec)
- IF E: Proceed to Section 2 (Handle Review Feedback), then return here and redisplay menu
- IF Q: Answer questions, then redisplay this menu
- IF A: Read fully and follow: &#x60;{advanced_elicitation}&#x60; with current spec content, process enhanced insights, ask user &quot;Accept improvements? (y/n)&quot;, if yes update spec then redisplay menu, if no keep original then redisplay menu
- IF P: Read fully and follow: &#x60;{party_mode_exec}&#x60; with current spec content, process collaborative insights, ask user &quot;Accept changes? (y/n)&quot;, if yes update spec then redisplay menu, if no keep original then redisplay menu
- IF Any other comments or queries: respond helpfully then redisplay menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to finalize when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu

### 2. Handle Review Feedback

a) **If user requests changes:**

- Make the requested edits to &#x60;{wipFile}&#x60;
- Re-present the affected sections
- Ask if there are more changes
- Loop until user is satisfied

b) **If the spec does NOT meet the &quot;Ready for Development&quot; standard:**

- Point out the missing/weak sections (e.g., non-actionable tasks, missing ACs).
- Propose specific improvements to reach the standard.
- Make the edits once the user agrees.

c) **If user has questions:**

- Answer questions about the spec
- Clarify any confusing sections
- Make clarifying edits if needed

### 3. Finalize the Spec

**When user confirms the spec is good AND it meets the &quot;Ready for Development&quot; standard:**

a) Update &#x60;{wipFile}&#x60; frontmatter:

   &#x60;&#x60;&#x60;yaml
   ---
   # ... existing values ...
   status: &#x27;ready-for-dev&#x27;
   stepsCompleted: [1, 2, 3, 4]
   ---
   &#x60;&#x60;&#x60;

b) **Rename WIP file to final filename:**
   - Using the &#x60;slug&#x60; extracted in Section 1
   - Rename &#x60;{wipFile}&#x60; → &#x60;{implementation_artifacts}/tech-spec-{slug}.md&#x60;
   - Store this as &#x60;finalFile&#x60; for use in menus below

### 4. Present Final Menu

a) **Display completion message and menu:**

&#x60;&#x60;&#x60;
**Tech-Spec Complete!**

Saved to: {finalFile}

---

**Next Steps:**

[A] Advanced Elicitation - refine further
[R] Adversarial Review - critique of the spec (highly recommended)
[B] Begin Development - start implementing now (not recommended)
[D] Done - exit workflow
[P] Party Mode - get expert feedback before dev

---

Once you are fully satisfied with the spec (ideally after **Adversarial Review** and maybe a few rounds of **Advanced Elicitation**), it is recommended to run implementation in a FRESH CONTEXT for best results.

Copy this prompt to start dev:

\&#x60;\&#x60;\&#x60;
quick-dev {finalFile}
\&#x60;\&#x60;\&#x60;

This ensures the dev agent has clean context focused solely on implementation.
&#x60;&#x60;&#x60;

b) **HALT and wait for user selection.**

#### Menu Handling Logic:

- IF A: Read fully and follow: &#x60;{advanced_elicitation}&#x60; with current spec content, process enhanced insights, ask user &quot;Accept improvements? (y/n)&quot;, if yes update spec then redisplay menu, if no keep original then redisplay menu
- IF B: Read the entire workflow file at &#x60;{quick_dev_workflow}&#x60; and follow the instructions with the final spec file (warn: fresh context is better)
- IF D: Exit workflow - display final confirmation and path to spec
- IF P: Read fully and follow: &#x60;{party_mode_exec}&#x60; with current spec content, process collaborative insights, ask user &quot;Accept changes? (y/n)&quot;, if yes update spec then redisplay menu, if no keep original then redisplay menu
- IF R: Execute Adversarial Review (see below)
- IF Any other comments or queries: respond helpfully then redisplay menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- After A, P, or R execution, return to this menu

#### Adversarial Review [R] Process:

1. **Invoke Adversarial Review Task**:
       &gt; With &#x60;{finalFile}&#x60; constructed, invoke the review task. If possible, use information asymmetry: run this task, and only it, in a separate subagent or process with read access to the project, but no context except the &#x60;{finalFile}&#x60;.
       &lt;invoke-task&gt;Review {finalFile} using {project-root}/_bmad/core/tasks/review-adversarial-general.xml&lt;/invoke-task&gt;
       &gt; **Platform fallback:** If task invocation not available, load the task file and follow its instructions inline, passing &#x60;{finalFile}&#x60; as the content.
       &gt; The task should: review &#x60;{finalFile}&#x60; and return a list of findings.

    2. **Process Findings**:
       &gt; Capture the findings from the task output.
       &gt; **If zero findings:** HALT - this is suspicious. Re-analyze or request user guidance.
       &gt; Evaluate severity (Critical, High, Medium, Low) and validity (real, noise, undecided).
       &gt; DO NOT exclude findings based on severity or validity unless explicitly asked to do so.
       &gt; Order findings by severity.
       &gt; Number the ordered findings (F1, F2, F3, etc.).
       &gt; If TodoWrite or similar tool is available, turn each finding into a TODO, include ID, severity, validity, and description in the TODO; otherwise present findings as a table with columns: ID, Severity, Validity, Description

    3. Return here and redisplay menu.

### 5. Exit Workflow

**When user selects [D]:**

&quot;**All done!** Your tech-spec is ready at:

&#x60;{finalFile}&#x60;

When you&#x27;re ready to implement, run:

&#x60;&#x60;&#x60;
quick-dev {finalFile}
&#x60;&#x60;&#x60;

Ship it!&quot;

---

## REQUIRED OUTPUTS:

- MUST update status to &#x27;ready-for-dev&#x27;.
- MUST rename file to &#x60;tech-spec-{slug}.md&#x60;.
- MUST provide clear next-step guidance and recommend fresh context for dev.

## VERIFICATION CHECKLIST:

- [ ] Complete spec presented for review.
- [ ] Requested changes implemented.
- [ ] Spec verified against **READY FOR DEVELOPMENT** standard.
- [ ] &#x60;stepsCompleted: [1, 2, 3, 4]&#x60; set and file renamed.


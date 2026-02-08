---
name: bmad-bmm-check-implementation-readiness
description: "Critical validation workflow that assesses PRD, Architecture, and Epics &amp; Stories for completeness and alignment before implementation. Uses adversarial review approach to find gaps and issues."
---

# Implementation Readiness

**Goal:** Validate that PRD, Architecture, Epics and Stories are complete and aligned before Phase 4 implementation starts, with a focus on ensuring epics and stories are logical and have accounted for all requirements and planning.

**Your Role:** You are an expert Product Manager and Scrum Master, renowned and respected in the field of requirements traceability and spotting gaps in planning. Your success is measured in spotting the failures others have made in planning or preparation of epics and stories to produce the users product vision.

## WORKFLOW ARCHITECTURE

### Core Principles

- **Micro-file Design**: Each step of the overall goal is a self contained instruction file that you will adhere too 1 file as directed at a time
- **Just-In-Time Loading**: Only 1 current step file will be loaded and followed to completion - never load future step files until told to do so
- **Sequential Enforcement**: Sequence within the step files must be completed in order, no skipping or optimization allowed
- **State Tracking**: Document progress in output file frontmatter using &#x60;stepsCompleted&#x60; array when a workflow produces a document
- **Append-Only Building**: Build documents by appending content as directed to the output file

### Step Processing Rules

1. **READ COMPLETELY**: Always read the entire step file before taking any action
2. **FOLLOW SEQUENCE**: Execute all numbered sections in order, never deviate
3. **WAIT FOR INPUT**: If a menu is presented, halt and wait for user selection
4. **CHECK CONTINUATION**: If the step has a menu with Continue as an option, only proceed to next step when user selects &#x27;C&#x27; (Continue)
5. **SAVE STATE**: Update &#x60;stepsCompleted&#x60; in frontmatter before loading next step
6. **LOAD NEXT**: When directed, read fully and follow the next step file

### Critical Rules (NO EXCEPTIONS)

- 🛑 **NEVER** load multiple step files simultaneously
- 📖 **ALWAYS** read entire step file before execution
- 🚫 **NEVER** skip steps or optimize the sequence
- 💾 **ALWAYS** update frontmatter of output files when writing the final output for a specific step
- 🎯 **ALWAYS** follow the exact instructions in the step file
- ⏸️ **ALWAYS** halt at menus and wait for user input
- 📋 **NEVER** create mental todo lists from future steps

---

## INITIALIZATION SEQUENCE

### 1. Module Configuration Loading

Load and read full config from {project-root}/_bmad/bmm/config.yaml and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;, &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### 2. First Step EXECUTION

Read fully and follow: &#x60;./step-01-document-discovery.md&#x60; to begin the workflow.

---
name: &#x27;step-01-document-discovery&#x27;
description: &#x27;Discover and inventory all project documents, handling duplicates and organizing file structure&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-01-document-discovery.md&#x27;
nextStepFile: &#x27;./step-02-prd-analysis.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
templateFile: &#x27;{workflow_path}/templates/readiness-report-template.md&#x27;
---

# Step 1: Document Discovery

## STEP GOAL:

To discover, inventory, and organize all project documents, identifying duplicates and determining which versions to use for the assessment.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are an expert Product Manager and Scrum Master
- ✅ Your focus is on finding organizing and documenting what exists
- ✅ You identify ambiguities and ask for clarification
- ✅ Success is measured in clear file inventory and conflict resolution

### Step-Specific Rules:

- 🎯 Focus ONLY on finding and organizing files
- 🚫 Don&#x27;t read or analyze file contents
- 💬 Identify duplicate documents clearly
- 🚪 Get user confirmation on file selections

## EXECUTION PROTOCOLS:

- 🎯 Search for all document types systematically
- 💾 Group sharded files together
- 📖 Flag duplicates for user resolution
- 🚫 FORBIDDEN to proceed with unresolved duplicates

## DOCUMENT DISCOVERY PROCESS:

### 1. Initialize Document Discovery

&quot;Beginning **Document Discovery** to inventory all project files.

I will:

1. Search for all required documents (PRD, Architecture, Epics, UX)
2. Group sharded documents together
3. Identify any duplicates (whole + sharded versions)
4. Present findings for your confirmation&quot;

### 2. Document Search Patterns

Search for each document type using these patterns:

#### A. PRD Documents

- Whole: &#x60;{planning_artifacts}/*prd*.md&#x60;
- Sharded: &#x60;{planning_artifacts}/*prd*/index.md&#x60; and related files

#### B. Architecture Documents

- Whole: &#x60;{planning_artifacts}/*architecture*.md&#x60;
- Sharded: &#x60;{planning_artifacts}/*architecture*/index.md&#x60; and related files

#### C. Epics &amp; Stories Documents

- Whole: &#x60;{planning_artifacts}/*epic*.md&#x60;
- Sharded: &#x60;{planning_artifacts}/*epic*/index.md&#x60; and related files

#### D. UX Design Documents

- Whole: &#x60;{planning_artifacts}/*ux*.md&#x60;
- Sharded: &#x60;{planning_artifacts}/*ux*/index.md&#x60; and related files

### 3. Organize Findings

For each document type found:

&#x60;&#x60;&#x60;
## [Document Type] Files Found

**Whole Documents:**
- [filename.md] ([size], [modified date])

**Sharded Documents:**
- Folder: [foldername]/
  - index.md
  - [other files in folder]
&#x60;&#x60;&#x60;

### 4. Identify Critical Issues

#### Duplicates (CRITICAL)

If both whole and sharded versions exist:

&#x60;&#x60;&#x60;
⚠️ CRITICAL ISSUE: Duplicate document formats found
- PRD exists as both whole.md AND prd/ folder
- YOU MUST choose which version to use
- Remove or rename the other version to avoid confusion
&#x60;&#x60;&#x60;

#### Missing Documents (WARNING)

If required documents not found:

&#x60;&#x60;&#x60;
⚠️ WARNING: Required document not found
- Architecture document not found
- Will impact assessment completeness
&#x60;&#x60;&#x60;

### 5. Add Initial Report Section

Initialize {outputFile} with {templateFile}.

### 6. Present Findings and Get Confirmation

Display findings and ask:
&quot;**Document Discovery Complete**

[Show organized file list]

**Issues Found:**

- [List any duplicates requiring resolution]
- [List any missing documents]

**Required Actions:**

- If duplicates exist: Please remove/rename one version
- Confirm which documents to use for assessment

**Ready to proceed?** [C] Continue after resolving issues&quot;

### 7. Present MENU OPTIONS

Display: **Select an Option:** [C] Continue to File Validation

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed with &#x27;C&#x27; selection
- If duplicates identified, insist on resolution first
- User can clarify file locations or request additional searches

#### Menu Handling Logic:

- IF C: Save document inventory to {outputFile}, update frontmatter with completed step and files being included, and then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then redisplay menu

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and document inventory is saved will you load {nextStepFile} to begin file validation.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All document types searched systematically
- Files organized and inventoried clearly
- Duplicates identified and flagged for resolution
- User confirmed file selections

### ❌ SYSTEM FAILURE:

- Not searching all document types
- Ignoring duplicate document conflicts
- Proceeding without resolving critical issues
- Not saving document inventory

**Master Rule:** Clear file identification is essential for accurate assessment.


---
name: &#x27;step-02-prd-analysis&#x27;
description: &#x27;Read and analyze PRD to extract all FRs and NFRs for coverage validation&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-02-prd-analysis.md&#x27;
nextStepFile: &#x27;./step-03-epic-coverage-validation.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
epicsFile: &#x27;{planning_artifacts}/*epic*.md&#x27; # Will be resolved to actual file
---

# Step 2: PRD Analysis

## STEP GOAL:

To fully read and analyze the PRD document (whole or sharded) to extract all Functional Requirements (FRs) and Non-Functional Requirements (NFRs) for validation against epics coverage.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are an expert Product Manager and Scrum Master
- ✅ Your expertise is in requirements analysis and traceability
- ✅ You think critically about requirement completeness
- ✅ Success is measured in thorough requirement extraction

### Step-Specific Rules:

- 🎯 Focus ONLY on reading and extracting from PRD
- 🚫 Don&#x27;t validate files (done in step 1)
- 💬 Read PRD completely - whole or all sharded files
- 🚪 Extract every FR and NFR with numbering

## EXECUTION PROTOCOLS:

- 🎯 Load and completely read the PRD
- 💾 Extract all requirements systematically
- 📖 Document findings in the report
- 🚫 FORBIDDEN to skip or summarize PRD content

## PRD ANALYSIS PROCESS:

### 1. Initialize PRD Analysis

&quot;Beginning **PRD Analysis** to extract all requirements.

I will:

1. Load the PRD document (whole or sharded)
2. Read it completely and thoroughly
3. Extract ALL Functional Requirements (FRs)
4. Extract ALL Non-Functional Requirements (NFRs)
5. Document findings for coverage validation&quot;

### 2. Load and Read PRD

From the document inventory in step 1:

- If whole PRD file exists: Load and read it completely
- If sharded PRD exists: Load and read ALL files in the PRD folder
- Ensure complete coverage - no files skipped

### 3. Extract Functional Requirements (FRs)

Search for and extract:

- Numbered FRs (FR1, FR2, FR3, etc.)
- Requirements labeled &quot;Functional Requirement&quot;
- User stories or use cases that represent functional needs
- Business rules that must be implemented

Format findings as:

&#x60;&#x60;&#x60;
## Functional Requirements Extracted

FR1: [Complete requirement text]
FR2: [Complete requirement text]
FR3: [Complete requirement text]
...
Total FRs: [count]
&#x60;&#x60;&#x60;

### 4. Extract Non-Functional Requirements (NFRs)

Search for and extract:

- Performance requirements (response times, throughput)
- Security requirements (authentication, encryption, etc.)
- Usability requirements (accessibility, ease of use)
- Reliability requirements (uptime, error rates)
- Scalability requirements (concurrent users, data growth)
- Compliance requirements (standards, regulations)

Format findings as:

&#x60;&#x60;&#x60;
## Non-Functional Requirements Extracted

NFR1: [Performance requirement]
NFR2: [Security requirement]
NFR3: [Usability requirement]
...
Total NFRs: [count]
&#x60;&#x60;&#x60;

### 5. Document Additional Requirements

Look for:

- Constraints or assumptions
- Technical requirements not labeled as FR/NFR
- Business constraints
- Integration requirements

### 6. Add to Assessment Report

Append to {outputFile}:

&#x60;&#x60;&#x60;markdown
## PRD Analysis

### Functional Requirements

[Complete FR list from section 3]

### Non-Functional Requirements

[Complete NFR list from section 4]

### Additional Requirements

[Any other requirements or constraints found]

### PRD Completeness Assessment

[Initial assessment of PRD completeness and clarity]
&#x60;&#x60;&#x60;

### 7. Auto-Proceed to Next Step

After PRD analysis complete, immediately load next step for epic coverage validation.

## PROCEEDING TO EPIC COVERAGE VALIDATION

PRD analysis complete. Loading next step to validate epic coverage.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- PRD loaded and read completely
- All FRs extracted with full text
- All NFRs identified and documented
- Findings added to assessment report

### ❌ SYSTEM FAILURE:

- Not reading complete PRD (especially sharded versions)
- Missing requirements in extraction
- Summarizing instead of extracting full text
- Not documenting findings in report

**Master Rule:** Complete requirement extraction is essential for traceability validation.


---
name: &#x27;step-03-epic-coverage-validation&#x27;
description: &#x27;Validate that all PRD FRs are covered in epics and stories&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-03-epic-coverage-validation.md&#x27;
nextStepFile: &#x27;./step-04-ux-alignment.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
---

# Step 3: Epic Coverage Validation

## STEP GOAL:

To validate that all Functional Requirements from the PRD are captured in the epics and stories document, identifying any gaps in coverage.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are an expert Product Manager and Scrum Master
- ✅ Your expertise is in requirements traceability
- ✅ You ensure no requirements fall through the cracks
- ✅ Success is measured in complete FR coverage

### Step-Specific Rules:

- 🎯 Focus ONLY on FR coverage validation
- 🚫 Don&#x27;t analyze story quality (that&#x27;s later)
- 💬 Compare PRD FRs against epic coverage list
- 🚪 Document every missing FR

## EXECUTION PROTOCOLS:

- 🎯 Load epics document completely
- 💾 Extract FR coverage from epics
- 📖 Compare against PRD FR list
- 🚫 FORBIDDEN to proceed without documenting gaps

## EPIC COVERAGE VALIDATION PROCESS:

### 1. Initialize Coverage Validation

&quot;Beginning **Epic Coverage Validation**.

I will:

1. Load the epics and stories document
2. Extract FR coverage information
3. Compare against PRD FRs from previous step
4. Identify any FRs not covered in epics&quot;

### 2. Load Epics Document

From the document inventory in step 1:

- Load the epics and stories document (whole or sharded)
- Read it completely to find FR coverage information
- Look for sections like &quot;FR Coverage Map&quot; or similar

### 3. Extract Epic FR Coverage

From the epics document:

- Find FR coverage mapping or list
- Extract which FR numbers are claimed to be covered
- Document which epics cover which FRs

Format as:

&#x60;&#x60;&#x60;
## Epic FR Coverage Extracted

FR1: Covered in Epic X
FR2: Covered in Epic Y
FR3: Covered in Epic Z
...
Total FRs in epics: [count]
&#x60;&#x60;&#x60;

### 4. Compare Coverage Against PRD

Using the PRD FR list from step 2:

- Check each PRD FR against epic coverage
- Identify FRs NOT covered in epics
- Note any FRs in epics but NOT in PRD

Create coverage matrix:

&#x60;&#x60;&#x60;
## FR Coverage Analysis

| FR Number | PRD Requirement | Epic Coverage  | Status    |
| --------- | --------------- | -------------- | --------- |
| FR1       | [PRD text]      | Epic X Story Y | ✓ Covered |
| FR2       | [PRD text]      | **NOT FOUND**  | ❌ MISSING |
| FR3       | [PRD text]      | Epic Z Story A | ✓ Covered |
&#x60;&#x60;&#x60;

### 5. Document Missing Coverage

List all FRs not covered:

&#x60;&#x60;&#x60;
## Missing FR Coverage

### Critical Missing FRs

FR#: [Full requirement text from PRD]
- Impact: [Why this is critical]
- Recommendation: [Which epic should include this]

### High Priority Missing FRs

[List any other uncovered FRs]
&#x60;&#x60;&#x60;

### 6. Add to Assessment Report

Append to {outputFile}:

&#x60;&#x60;&#x60;markdown
## Epic Coverage Validation

### Coverage Matrix

[Complete coverage matrix from section 4]

### Missing Requirements

[List of uncovered FRs from section 5]

### Coverage Statistics

- Total PRD FRs: [count]
- FRs covered in epics: [count]
- Coverage percentage: [percentage]
&#x60;&#x60;&#x60;

### 7. Auto-Proceed to Next Step

After coverage validation complete, immediately load next step.

## PROCEEDING TO UX ALIGNMENT

Epic coverage validation complete. Loading next step for UX alignment.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Epics document loaded completely
- FR coverage extracted accurately
- All gaps identified and documented
- Coverage matrix created

### ❌ SYSTEM FAILURE:

- Not reading complete epics document
- Missing FRs in comparison
- Not documenting uncovered requirements
- Incomplete coverage analysis

**Master Rule:** Every FR must have a traceable implementation path.


---
name: &#x27;step-04-ux-alignment&#x27;
description: &#x27;Check for UX document and validate alignment with PRD and Architecture&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-04-ux-alignment.md&#x27;
nextStepFile: &#x27;./step-05-epic-quality-review.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
---

# Step 4: UX Alignment

## STEP GOAL:

To check if UX documentation exists and validate that it aligns with PRD requirements and Architecture decisions, ensuring architecture accounts for both PRD and UX needs.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a UX VALIDATOR ensuring user experience is properly addressed
- ✅ UX requirements must be supported by architecture
- ✅ Missing UX documentation is a warning if UI is implied
- ✅ Alignment gaps must be documented

### Step-Specific Rules:

- 🎯 Check for UX document existence first
- 🚫 Don&#x27;t assume UX is not needed
- 💬 Validate alignment between UX, PRD, and Architecture
- 🚪 Add findings to the output report

## EXECUTION PROTOCOLS:

- 🎯 Search for UX documentation
- 💾 If found, validate alignment
- 📖 If not found, assess if UX is implied
- 🚫 FORBIDDEN to proceed without completing assessment

## UX ALIGNMENT PROCESS:

### 1. Initialize UX Validation

&quot;Beginning **UX Alignment** validation.

I will:

1. Check if UX documentation exists
2. If UX exists: validate alignment with PRD and Architecture
3. If no UX: determine if UX is implied and document warning&quot;

### 2. Search for UX Documentation

Search patterns:

- &#x60;{planning_artifacts}/*ux*.md&#x60; (whole document)
- &#x60;{planning_artifacts}/*ux*/index.md&#x60; (sharded)
- Look for UI-related terms in other documents

### 3. If UX Document Exists

#### A. UX ↔ PRD Alignment

- Check UX requirements reflected in PRD
- Verify user journeys in UX match PRD use cases
- Identify UX requirements not in PRD

#### B. UX ↔ Architecture Alignment

- Verify architecture supports UX requirements
- Check performance needs (responsiveness, load times)
- Identify UI components not supported by architecture

### 4. If No UX Document

Assess if UX/UI is implied:

- Does PRD mention user interface?
- Are there web/mobile components implied?
- Is this a user-facing application?

If UX implied but missing: Add warning to report

### 5. Add Findings to Report

Append to {outputFile}:

&#x60;&#x60;&#x60;markdown
## UX Alignment Assessment

### UX Document Status

[Found/Not Found]

### Alignment Issues

[List any misalignments between UX, PRD, and Architecture]

### Warnings

[Any warnings about missing UX or architectural gaps]
&#x60;&#x60;&#x60;

### 6. Auto-Proceed to Next Step

After UX assessment complete, immediately load next step.

## PROCEEDING TO EPIC QUALITY REVIEW

UX alignment assessment complete. Loading next step for epic quality review.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- UX document existence checked
- Alignment validated if UX exists
- Warning issued if UX implied but missing
- Findings added to report

### ❌ SYSTEM FAILURE:

- Not checking for UX document
- Ignoring alignment issues
- Not documenting warnings


---
name: &#x27;step-05-epic-quality-review&#x27;
description: &#x27;Validate epics and stories against create-epics-and-stories best practices&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-05-epic-quality-review.md&#x27;
nextStepFile: &#x27;./step-06-final-assessment.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
epicsBestPractices: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories&#x27;
---

# Step 5: Epic Quality Review

## STEP GOAL:

To validate epics and stories against the best practices defined in create-epics-and-stories workflow, focusing on user value, independence, dependencies, and implementation readiness.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are an EPIC QUALITY ENFORCER
- ✅ You know what good epics look like - challenge anything deviating
- ✅ Technical epics are wrong - find them
- ✅ Forward dependencies are forbidden - catch them
- ✅ Stories must be independently completable

### Step-Specific Rules:

- 🎯 Apply create-epics-and-stories standards rigorously
- 🚫 Don&#x27;t accept &quot;technical milestones&quot; as epics
- 💬 Challenge every dependency on future work
- 🚪 Verify proper story sizing and structure

## EXECUTION PROTOCOLS:

- 🎯 Systematically validate each epic and story
- 💾 Document all violations of best practices
- 📖 Check every dependency relationship
- 🚫 FORBIDDEN to accept structural problems

## EPIC QUALITY REVIEW PROCESS:

### 1. Initialize Best Practices Validation

&quot;Beginning **Epic Quality Review** against create-epics-and-stories standards.

I will rigorously validate:

- Epics deliver user value (not technical milestones)
- Epic independence (Epic 2 doesn&#x27;t need Epic 3)
- Story dependencies (no forward references)
- Proper story sizing and completeness

Any deviation from best practices will be flagged as a defect.&quot;

### 2. Epic Structure Validation

#### A. User Value Focus Check

For each epic:

- **Epic Title:** Is it user-centric (what user can do)?
- **Epic Goal:** Does it describe user outcome?
- **Value Proposition:** Can users benefit from this epic alone?

**Red flags (violations):**

- &quot;Setup Database&quot; or &quot;Create Models&quot; - no user value
- &quot;API Development&quot; - technical milestone
- &quot;Infrastructure Setup&quot; - not user-facing
- &quot;Authentication System&quot; - borderline (is it user value?)

#### B. Epic Independence Validation

Test epic independence:

- **Epic 1:** Must stand alone completely
- **Epic 2:** Can function using only Epic 1 output
- **Epic 3:** Can function using Epic 1 &amp; 2 outputs
- **Rule:** Epic N cannot require Epic N+1 to work

**Document failures:**

- &quot;Epic 2 requires Epic 3 features to function&quot;
- Stories in Epic 2 referencing Epic 3 components
- Circular dependencies between epics

### 3. Story Quality Assessment

#### A. Story Sizing Validation

Check each story:

- **Clear User Value:** Does the story deliver something meaningful?
- **Independent:** Can it be completed without future stories?

**Common violations:**

- &quot;Setup all models&quot; - not a USER story
- &quot;Create login UI (depends on Story 1.3)&quot; - forward dependency

#### B. Acceptance Criteria Review

For each story&#x27;s ACs:

- **Given/When/Then Format:** Proper BDD structure?
- **Testable:** Each AC can be verified independently?
- **Complete:** Covers all scenarios including errors?
- **Specific:** Clear expected outcomes?

**Issues to find:**

- Vague criteria like &quot;user can login&quot;
- Missing error conditions
- Incomplete happy path
- Non-measurable outcomes

### 4. Dependency Analysis

#### A. Within-Epic Dependencies

Map story dependencies within each epic:

- Story 1.1 must be completable alone
- Story 1.2 can use Story 1.1 output
- Story 1.3 can use Story 1.1 &amp; 1.2 outputs

**Critical violations:**

- &quot;This story depends on Story 1.4&quot;
- &quot;Wait for future story to work&quot;
- Stories referencing features not yet implemented

#### B. Database/Entity Creation Timing

Validate database creation approach:

- **Wrong:** Epic 1 Story 1 creates all tables upfront
- **Right:** Each story creates tables it needs
- **Check:** Are tables created only when first needed?

### 5. Special Implementation Checks

#### A. Starter Template Requirement

Check if Architecture specifies starter template:

- If YES: Epic 1 Story 1 must be &quot;Set up initial project from starter template&quot;
- Verify story includes cloning, dependencies, initial configuration

#### B. Greenfield vs Brownfield Indicators

Greenfield projects should have:

- Initial project setup story
- Development environment configuration
- CI/CD pipeline setup early

Brownfield projects should have:

- Integration points with existing systems
- Migration or compatibility stories

### 6. Best Practices Compliance Checklist

For each epic, verify:

- [ ] Epic delivers user value
- [ ] Epic can function independently
- [ ] Stories appropriately sized
- [ ] No forward dependencies
- [ ] Database tables created when needed
- [ ] Clear acceptance criteria
- [ ] Traceability to FRs maintained

### 7. Quality Assessment Documentation

Document all findings by severity:

#### 🔴 Critical Violations

- Technical epics with no user value
- Forward dependencies breaking independence
- Epic-sized stories that cannot be completed

#### 🟠 Major Issues

- Vague acceptance criteria
- Stories requiring future stories
- Database creation violations

#### 🟡 Minor Concerns

- Formatting inconsistencies
- Minor structure deviations
- Documentation gaps

### 8. Autonomous Review Execution

This review runs autonomously to maintain standards:

- Apply best practices without compromise
- Document every violation with specific examples
- Provide clear remediation guidance
- Prepare recommendations for each issue

## REVIEW COMPLETION:

After completing epic quality review:

- Update {outputFile} with all quality findings
- Document specific best practices violations
- Provide actionable recommendations
- Load {nextStepFile} for final readiness assessment

## CRITICAL STEP COMPLETION NOTE

This step executes autonomously. Load {nextStepFile} only after complete epic quality review is documented.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All epics validated against best practices
- Every dependency checked and verified
- Quality violations documented with examples
- Clear remediation guidance provided
- No compromise on standards enforcement

### ❌ SYSTEM FAILURE:

- Accepting technical epics as valid
- Ignoring forward dependencies
- Not verifying story sizing
- Overlooking obvious violations

**Master Rule:** Enforce best practices rigorously. Find all violations.


---
name: &#x27;step-06-final-assessment&#x27;
description: &#x27;Compile final assessment and polish the readiness report&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/implementation-readiness&#x27;

# File References
thisStepFile: &#x27;./step-06-final-assessment.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/implementation-readiness-report-{{date}}.md&#x27;
---

# Step 6: Final Assessment

## STEP GOAL:

To provide a comprehensive summary of all findings and give the report a final polish, ensuring clear recommendations and overall readiness status.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 📖 You are at the final step - complete the assessment
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are delivering the FINAL ASSESSMENT
- ✅ Your findings are objective and backed by evidence
- ✅ Provide clear, actionable recommendations
- ✅ Success is measured by value of findings

### Step-Specific Rules:

- 🎯 Compile and summarize all findings
- 🚫 Don&#x27;t soften the message - be direct
- 💬 Provide specific examples for problems
- 🚪 Add final section to the report

## EXECUTION PROTOCOLS:

- 🎯 Review all findings from previous steps
- 💾 Add summary and recommendations
- 📖 Determine overall readiness status
- 🚫 Complete and present final report

## FINAL ASSESSMENT PROCESS:

### 1. Initialize Final Assessment

&quot;Completing **Final Assessment**.

I will now:

1. Review all findings from previous steps
2. Provide a comprehensive summary
3. Add specific recommendations
4. Determine overall readiness status&quot;

### 2. Review Previous Findings

Check the {outputFile} for sections added by previous steps:

- File and FR Validation findings
- UX Alignment issues
- Epic Quality violations

### 3. Add Final Assessment Section

Append to {outputFile}:

&#x60;&#x60;&#x60;markdown
## Summary and Recommendations

### Overall Readiness Status

[READY/NEEDS WORK/NOT READY]

### Critical Issues Requiring Immediate Action

[List most critical issues that must be addressed]

### Recommended Next Steps

1. [Specific action item 1]
2. [Specific action item 2]
3. [Specific action item 3]

### Final Note

This assessment identified [X] issues across [Y] categories. Address the critical issues before proceeding to implementation. These findings can be used to improve the artifacts or you may choose to proceed as-is.
&#x60;&#x60;&#x60;

### 4. Complete the Report

- Ensure all findings are clearly documented
- Verify recommendations are actionable
- Add date and assessor information
- Save the final report

### 5. Present Completion

Display:
&quot;**Implementation Readiness Assessment Complete**

Report generated: {outputFile}

The assessment found [number] issues requiring attention. Review the detailed report for specific findings and recommendations.&quot;

## WORKFLOW COMPLETE

The implementation readiness workflow is now complete. The report contains all findings and recommendations for the user to consider.

Implementation Readiness complete. Read fully and follow: &#x60;_bmad/core/tasks/bmad-help.md&#x60; with argument &#x60;implementation readiness&#x60;.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All findings compiled and summarized
- Clear recommendations provided
- Readiness status determined
- Final report saved

### ❌ SYSTEM FAILURE:

- Not reviewing previous findings
- Incomplete summary
- No clear recommendations


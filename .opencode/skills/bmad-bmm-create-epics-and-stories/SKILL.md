---
name: bmad-bmm-create-epics-and-stories
description: "Transform PRD requirements and Architecture decisions into comprehensive stories organized by user value. This workflow requires completed PRD + Architecture documents (UX recommended if UI exists) and breaks down requirements into implementation-ready epics and user stories that incorporate all available technical and design context. Creates detailed, actionable stories with complete acceptance criteria for development teams."
---

# Create Epics and Stories

**Goal:** Transform PRD requirements and Architecture decisions into comprehensive stories organized by user value, creating detailed, actionable stories with complete acceptance criteria for development teams.

**Your Role:** In addition to your name, communication_style, and persona, you are also a product strategist and technical specifications writer collaborating with a product owner. This is a partnership, not a client-vendor relationship. You bring expertise in requirements decomposition, technical implementation context, and acceptance criteria writing, while the user brings their product vision, user needs, and business requirements. Work together as equals.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

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

### 1. Configuration Loading

Load and read full config from {project-root}/_bmad/bmm/config.yaml and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;, &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### 2. First Step EXECUTION

Read fully and follow: &#x60;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories/steps/step-01-validate-prerequisites.md&#x60; to begin the workflow.

---
name: &#x27;step-01-validate-prerequisites&#x27;
description: &#x27;Validate required documents exist and extract all requirements for epic and story creation&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories&#x27;

# File References
thisStepFile: &#x27;./step-01-validate-prerequisites.md&#x27;
nextStepFile: &#x27;./step-02-design-epics.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/epics.md&#x27;
epicsTemplate: &#x27;{workflow_path}/templates/epics-template.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;

# Template References
epicsTemplate: &#x27;{workflow_path}/templates/epics-template.md&#x27;
---

# Step 1: Validate Prerequisites and Extract Requirements

## STEP GOAL:

To validate that all required input documents exist and extract all requirements (FRs, NFRs, and additional requirements from UX/Architecture) needed for epic and story creation.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring requirements extraction expertise
- ✅ User brings their product vision and context

### Step-Specific Rules:

- 🎯 Focus ONLY on extracting and organizing requirements
- 🚫 FORBIDDEN to start creating epics or stories in this step
- 💬 Extract requirements from ALL available documents
- 🚪 POPULATE the template sections exactly as needed

## EXECUTION PROTOCOLS:

- 🎯 Extract requirements systematically from all documents
- 💾 Populate {outputFile} with extracted requirements
- 📖 Update frontmatter with extraction progress
- 🚫 FORBIDDEN to load next step until user selects &#x27;C&#x27; and requirements are extracted

## REQUIREMENTS EXTRACTION PROCESS:

### 1. Welcome and Overview

Welcome {user_name} to comprehensive epic and story creation!

**CRITICAL PREREQUISITE VALIDATION:**

Verify required documents exist and are complete:

1. **PRD.md** - Contains requirements (FRs and NFRs) and product scope
2. **Architecture.md** - Contains technical decisions, API contracts, data models
3. **UX Design.md** (if UI exists) - Contains interaction patterns, mockups, user flows

### 2. Document Discovery and Validation

Search for required documents using these patterns (sharded means a large document was split into multiple small files with an index.md into a folder) - if the whole document is found, use that instead of the sharded version:

**PRD Document Search Priority:**

1. &#x60;{planning_artifacts}/*prd*.md&#x60; (whole document)
2. &#x60;{planning_artifacts}/*prd*/index.md&#x60; (sharded version)

**Architecture Document Search Priority:**

1. &#x60;{planning_artifacts}/*architecture*.md&#x60; (whole document)
2. &#x60;{planning_artifacts}/*architecture*/index.md&#x60; (sharded version)

**UX Design Document Search (Optional):**

1. &#x60;{planning_artifacts}/*ux*.md&#x60; (whole document)
2. &#x60;{planning_artifacts}/*ux*/index.md&#x60; (sharded version)

Before proceeding, Ask the user if there are any other documents to include for analysis, and if anything found should be excluded. Wait for user confirmation. Once confirmed, create the {outputFile} from the {epicsTemplate} and in the front matter list the files in the array of &#x60;inputDocuments: []&#x60;.

### 3. Extract Functional Requirements (FRs)

From the PRD document (full or sharded), read then entire document and extract ALL functional requirements:

**Extraction Method:**

- Look for numbered items like &quot;FR1:&quot;, &quot;Functional Requirement 1:&quot;, or similar
- Identify requirement statements that describe what the system must DO
- Include user actions, system behaviors, and business rules

**Format the FR list as:**

&#x60;&#x60;&#x60;
FR1: [Clear, testable requirement description]
FR2: [Clear, testable requirement description]
...
&#x60;&#x60;&#x60;

### 4. Extract Non-Functional Requirements (NFRs)

From the PRD document, extract ALL non-functional requirements:

**Extraction Method:**

- Look for performance, security, usability, reliability requirements
- Identify constraints and quality attributes
- Include technical standards and compliance requirements

**Format the NFR list as:**

&#x60;&#x60;&#x60;
NFR1: [Performance/Security/Usability requirement]
NFR2: [Performance/Security/Usability requirement]
...
&#x60;&#x60;&#x60;

### 5. Extract Additional Requirements from Architecture

Review the Architecture document for technical requirements that impact epic and story creation:

**Look for:**

- **Starter Template**: Does Architecture specify a starter/greenfield template? If YES, document this for Epic 1 Story 1
- Infrastructure and deployment requirements
- Integration requirements with external systems
- Data migration or setup requirements
- Monitoring and logging requirements
- API versioning or compatibility requirements
- Security implementation requirements

**IMPORTANT**: If a starter template is mentioned in Architecture, note it prominently. This will impact Epic 1 Story 1.

**Format Additional Requirements as:**

&#x60;&#x60;&#x60;
- [Technical requirement from Architecture that affects implementation]
- [Infrastructure setup requirement]
- [Integration requirement]
...
&#x60;&#x60;&#x60;

### 6. Extract Additional Requirements from UX (if exists)

Review the UX document for requirements that affect epic and story creation:

**Look for:**

- Responsive design requirements
- Accessibility requirements
- Browser/device compatibility
- User interaction patterns that need implementation
- Animation or transition requirements
- Error handling UX requirements

**Add these to Additional Requirements list.**

### 7. Load and Initialize Template

Load {epicsTemplate} and initialize {outputFile}:

1. Copy the entire template to {outputFile}
2. Replace {{project_name}} with the actual project name
3. Replace placeholder sections with extracted requirements:
   - {{fr_list}} → extracted FRs
   - {{nfr_list}} → extracted NFRs
   - {{additional_requirements}} → extracted additional requirements
4. Leave {{requirements_coverage_map}} and {{epics_list}} as placeholders for now

### 8. Present Extracted Requirements

Display to user:

**Functional Requirements Extracted:**

- Show count of FRs found
- Display the first few FRs as examples
- Ask if any FRs are missing or incorrectly captured

**Non-Functional Requirements Extracted:**

- Show count of NFRs found
- Display key NFRs
- Ask if any constraints were missed

**Additional Requirements:**

- Summarize technical requirements from Architecture
- Summarize UX requirements (if applicable)
- Verify completeness

### 9. Get User Confirmation

Ask: &quot;Do these extracted requirements accurately represent what needs to be built? Any additions or corrections?&quot;

Update the requirements based on user feedback until confirmation is received.

## CONTENT TO SAVE TO DOCUMENT:

After extraction and confirmation, update {outputFile} with:

- Complete FR list in {{fr_list}} section
- Complete NFR list in {{nfr_list}} section
- All additional requirements in {{additional_requirements}} section

### 10. Present MENU OPTIONS

Display: &#x60;**Confirm the Requirements are complete and correct to [C] continue:**&#x60;

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- User can chat or ask questions - always respond and then end with display again of the menu option

#### Menu Handling Logic:

- IF C: Save all to {outputFile}, update frontmatter, then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#10-present-menu-options)

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and all requirements are saved to document and frontmatter is updated, will you then read fully and follow: {nextStepFile} to begin epic design step.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All required documents found and validated
- All FRs extracted and formatted correctly
- All NFRs extracted and formatted correctly
- Additional requirements from Architecture/UX identified
- Template initialized with requirements
- User confirms requirements are complete and accurate

### ❌ SYSTEM FAILURE:

- Missing required documents
- Incomplete requirements extraction
- Template not properly initialized
- Not saving requirements to output file

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-02-design-epics&#x27;
description: &#x27;Design and approve the epics_list that will organize all requirements into user-value-focused epics&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories&#x27;

# File References
thisStepFile: &#x27;./step-02-design-epics.md&#x27;
nextStepFile: &#x27;./step-03-create-stories.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/epics.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;

# Template References
epicsTemplate: &#x27;{workflow_path}/templates/epics-template.md&#x27;
---

# Step 2: Design Epic List

## STEP GOAL:

To design and get approval for the epics_list that will organize all requirements into user-value-focused epics.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring product strategy and epic design expertise
- ✅ User brings their product vision and priorities

### Step-Specific Rules:

- 🎯 Focus ONLY on creating the epics_list
- 🚫 FORBIDDEN to create individual stories in this step
- 💬 Organize epics around user value, not technical layers
- 🚪 GET explicit approval for the epics_list
- 🔗 **CRITICAL: Each epic must be standalone and enable future epics without requiring future epics to function**

## EXECUTION PROTOCOLS:

- 🎯 Design epics collaboratively based on extracted requirements
- 💾 Update {{epics_list}} in {outputFile}
- 📖 Document the FR coverage mapping
- 🚫 FORBIDDEN to load next step until user approves epics_list

## EPIC DESIGN PROCESS:

### 1. Review Extracted Requirements

Load {outputFile} and review:

- **Functional Requirements:** Count and review FRs from Step 1
- **Non-Functional Requirements:** Review NFRs that need to be addressed
- **Additional Requirements:** Review technical and UX requirements

### 2. Explain Epic Design Principles

**EPIC DESIGN PRINCIPLES:**

1. **User-Value First**: Each epic must enable users to accomplish something meaningful
2. **Requirements Grouping**: Group related FRs that deliver cohesive user outcomes
3. **Incremental Delivery**: Each epic should deliver value independently
4. **Logical Flow**: Natural progression from user&#x27;s perspective
5. **🔗 Dependency-Free Within Epic**: Stories within an epic must NOT depend on future stories

**⚠️ CRITICAL PRINCIPLE:**
Organize by USER VALUE, not technical layers:

**✅ CORRECT Epic Examples (Standalone &amp; Enable Future Epics):**

- Epic 1: User Authentication &amp; Profiles (users can register, login, manage profiles) - **Standalone: Complete auth system**
- Epic 2: Content Creation (users can create, edit, publish content) - **Standalone: Uses auth, creates content**
- Epic 3: Social Interaction (users can follow, comment, like content) - **Standalone: Uses auth + content**
- Epic 4: Search &amp; Discovery (users can find content and other users) - **Standalone: Uses all previous**

**❌ WRONG Epic Examples (Technical Layers or Dependencies):**

- Epic 1: Database Setup (creates all tables upfront) - **No user value**
- Epic 2: API Development (builds all endpoints) - **No user value**
- Epic 3: Frontend Components (creates reusable components) - **No user value**
- Epic 4: Deployment Pipeline (CI/CD setup) - **No user value**

**🔗 DEPENDENCY RULES:**

- Each epic must deliver COMPLETE functionality for its domain
- Epic 2 must not require Epic 3 to function
- Epic 3 can build upon Epic 1 &amp; 2 but must stand alone

### 3. Design Epic Structure Collaboratively

**Step A: Identify User Value Themes**

- Look for natural groupings in the FRs
- Identify user journeys or workflows
- Consider user types and their goals

**Step B: Propose Epic Structure**
For each proposed epic:

1. **Epic Title**: User-centric, value-focused
2. **User Outcome**: What users can accomplish after this epic
3. **FR Coverage**: Which FR numbers this epic addresses
4. **Implementation Notes**: Any technical or UX considerations

**Step C: Create the epics_list**

Format the epics_list as:

&#x60;&#x60;&#x60;
## Epic List

### Epic 1: [Epic Title]
[Epic goal statement - what users can accomplish]
**FRs covered:** FR1, FR2, FR3, etc.

### Epic 2: [Epic Title]
[Epic goal statement - what users can accomplish]
**FRs covered:** FR4, FR5, FR6, etc.

[Continue for all epics]
&#x60;&#x60;&#x60;

### 4. Present Epic List for Review

Display the complete epics_list to user with:

- Total number of epics
- FR coverage per epic
- User value delivered by each epic
- Any natural dependencies

### 5. Create Requirements Coverage Map

Create {{requirements_coverage_map}} showing how each FR maps to an epic:

&#x60;&#x60;&#x60;
### FR Coverage Map

FR1: Epic 1 - [Brief description]
FR2: Epic 1 - [Brief description]
FR3: Epic 2 - [Brief description]
...
&#x60;&#x60;&#x60;

This ensures no FRs are missed.

### 6. Collaborative Refinement

Ask user:

- &quot;Does this epic structure align with your product vision?&quot;
- &quot;Are all user outcomes properly captured?&quot;
- &quot;Should we adjust any epic groupings?&quot;
- &quot;Are there natural dependencies we&#x27;ve missed?&quot;

### 7. Get Final Approval

**CRITICAL:** Must get explicit user approval:
&quot;Do you approve this epic structure for proceeding to story creation?&quot;

If user wants changes:

- Make the requested adjustments
- Update the epics_list
- Re-present for approval
- Repeat until approval is received

## CONTENT TO UPDATE IN DOCUMENT:

After approval, update {outputFile}:

1. Replace {{epics_list}} placeholder with the approved epic list
2. Replace {{requirements_coverage_map}} with the coverage map
3. Ensure all FRs are mapped to epics

### 8. Present MENU OPTIONS

Display: &quot;**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask}
- IF P: Read fully and follow: {partyModeWorkflow}
- IF C: Save approved epics_list to {outputFile}, update frontmatter, then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#8-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution completes, redisplay the menu
- User can chat or ask questions - always respond when conversation ends, redisplay the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN C is selected and the approved epics_list is saved to document, will you then read fully and follow: {nextStepFile} to begin story creation step.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Epics designed around user value
- All FRs mapped to specific epics
- epics_list created and formatted correctly
- Requirements coverage map completed
- User gives explicit approval for epic structure
- Document updated with approved epics

### ❌ SYSTEM FAILURE:

- Epics organized by technical layers
- Missing FRs in coverage map
- No user approval obtained
- epics_list not saved to document

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-03-create-stories&#x27;
description: &#x27;Generate all epics with their stories following the template structure&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories&#x27;

# File References
thisStepFile: &#x27;./step-03-create-stories.md&#x27;
nextStepFile: &#x27;./step-04-final-validation.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/epics.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;

# Template References
epicsTemplate: &#x27;{workflow_path}/templates/epics-template.md&#x27;
---

# Step 3: Generate Epics and Stories

## STEP GOAL:

To generate all epics with their stories based on the approved epics_list, following the template structure exactly.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: Process epics sequentially
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring story creation and acceptance criteria expertise
- ✅ User brings their implementation priorities and constraints

### Step-Specific Rules:

- 🎯 Generate stories for each epic following the template exactly
- 🚫 FORBIDDEN to deviate from template structure
- 💬 Each story must have clear acceptance criteria
- 🚪 ENSURE each story is completable by a single dev agent
- 🔗 **CRITICAL: Stories MUST NOT depend on future stories within the same epic**

## EXECUTION PROTOCOLS:

- 🎯 Generate stories collaboratively with user input
- 💾 Append epics and stories to {outputFile} following template
- 📖 Process epics one at a time in sequence
- 🚫 FORBIDDEN to skip any epic or rush through stories

## STORY GENERATION PROCESS:

### 1. Load Approved Epic Structure

Load {outputFile} and review:

- Approved epics_list from Step 2
- FR coverage map
- All requirements (FRs, NFRs, additional)
- Template structure at the end of the document

### 2. Explain Story Creation Approach

**STORY CREATION GUIDELINES:**

For each epic, create stories that:

- Follow the exact template structure
- Are sized for single dev agent completion
- Have clear user value
- Include specific acceptance criteria
- Reference requirements being fulfilled

**🚨 DATABASE/ENTITY CREATION PRINCIPLE:**
Create tables/entities ONLY when needed by the story:

- ❌ WRONG: Epic 1 Story 1 creates all 50 database tables
- ✅ RIGHT: Each story creates/alters ONLY the tables it needs

**🔗 STORY DEPENDENCY PRINCIPLE:**
Stories must be independently completable in sequence:

- ❌ WRONG: Story 1.2 requires Story 1.3 to be completed first
- ✅ RIGHT: Each story can be completed based only on previous stories
- ❌ WRONG: &quot;Wait for Story 1.4 to be implemented before this works&quot;
- ✅ RIGHT: &quot;This story works independently and enables future stories&quot;

**STORY FORMAT (from template):**

&#x60;&#x60;&#x60;
### Story {N}.{M}: {story_title}

As a {user_type},
I want {capability},
So that {value_benefit}.

**Acceptance Criteria:**

**Given** {precondition}
**When** {action}
**Then** {expected_outcome}
**And** {additional_criteria}
&#x60;&#x60;&#x60;

**✅ GOOD STORY EXAMPLES:**

_Epic 1: User Authentication_

- Story 1.1: User Registration with Email
- Story 1.2: User Login with Password
- Story 1.3: Password Reset via Email

_Epic 2: Content Creation_

- Story 2.1: Create New Blog Post
- Story 2.2: Edit Existing Blog Post
- Story 2.3: Publish Blog Post

**❌ BAD STORY EXAMPLES:**

- Story: &quot;Set up database&quot; (no user value)
- Story: &quot;Create all models&quot; (too large, no user value)
- Story: &quot;Build authentication system&quot; (too large)
- Story: &quot;Login UI (depends on Story 1.3 API endpoint)&quot; (future dependency!)
- Story: &quot;Edit post (requires Story 1.4 to be implemented first)&quot; (wrong order!)

### 3. Process Epics Sequentially

For each epic in the approved epics_list:

#### A. Epic Overview

Display:

- Epic number and title
- Epic goal statement
- FRs covered by this epic
- Any NFRs or additional requirements relevant

#### B. Story Breakdown

Work with user to break down the epic into stories:

- Identify distinct user capabilities
- Ensure logical flow within the epic
- Size stories appropriately

#### C. Generate Each Story

For each story in the epic:

1. **Story Title**: Clear, action-oriented
2. **User Story**: Complete the As a/I want/So that format
3. **Acceptance Criteria**: Write specific, testable criteria

**AC Writing Guidelines:**

- Use Given/When/Then format
- Each AC should be independently testable
- Include edge cases and error conditions
- Reference specific requirements when applicable

#### D. Collaborative Review

After writing each story:

- Present the story to user
- Ask: &quot;Does this story capture the requirement correctly?&quot;
- &quot;Is the scope appropriate for a single dev session?&quot;
- &quot;Are the acceptance criteria complete and testable?&quot;

#### E. Append to Document

When story is approved:

- Append it to {outputFile} following template structure
- Use correct numbering (Epic N, Story M)
- Maintain proper markdown formatting

### 4. Epic Completion

After all stories for an epic are complete:

- Display epic summary
- Show count of stories created
- Verify all FRs for the epic are covered
- Get user confirmation to proceed to next epic

### 5. Repeat for All Epics

Continue the process for each epic in the approved list, processing them in order (Epic 1, Epic 2, etc.).

### 6. Final Document Completion

After all epics and stories are generated:

- Verify the document follows template structure exactly
- Ensure all placeholders are replaced
- Confirm all FRs are covered
- Check formatting consistency

## TEMPLATE STRUCTURE COMPLIANCE:

The final {outputFile} must follow this structure exactly:

1. **Overview** section with project name
2. **Requirements Inventory** with all three subsections populated
3. **FR Coverage Map** showing requirement to epic mapping
4. **Epic List** with approved epic structure
5. **Epic sections** for each epic (N &#x3D; 1, 2, 3...)
   - Epic title and goal
   - All stories for that epic (M &#x3D; 1, 2, 3...)
     - Story title and user story
     - Acceptance Criteria using Given/When/Then format

### 7. Present FINAL MENU OPTIONS

After all epics and stories are complete:

Display: &quot;**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask}
- IF P: Read fully and follow: {partyModeWorkflow}
- IF C: Save content to {outputFile}, update frontmatter, then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-final-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [all epics and stories saved to document following the template structure exactly], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to begin final validation phase.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All epics processed in sequence
- Stories created for each epic
- Template structure followed exactly
- All FRs covered by stories
- Stories appropriately sized
- Acceptance criteria are specific and testable
- Document is complete and ready for development

### ❌ SYSTEM FAILURE:

- Deviating from template structure
- Missing epics or stories
- Stories too large or unclear
- Missing acceptance criteria
- Not following proper formatting

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-04-final-validation&#x27;
description: &#x27;Validate complete coverage of all requirements and ensure implementation readiness&#x27;

# Path Definitions
workflow_path: &#x27;{project-root}/_bmad/bmm/workflows/3-solutioning/create-epics-and-stories&#x27;

# File References
thisStepFile: &#x27;./step-04-final-validation.md&#x27;
workflowFile: &#x27;{workflow_path}/workflow.md&#x27;
outputFile: &#x27;{planning_artifacts}/epics.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;

# Template References
epicsTemplate: &#x27;{workflow_path}/templates/epics-template.md&#x27;
---

# Step 4: Final Validation

## STEP GOAL:

To validate complete coverage of all requirements and ensure stories are ready for development.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: Process validation sequentially without skipping
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product strategist and technical specifications writer
- ✅ If you already have been given communication or persona patterns, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring validation expertise and quality assurance
- ✅ User brings their implementation priorities and final review

### Step-Specific Rules:

- 🎯 Focus ONLY on validating complete requirements coverage
- 🚫 FORBIDDEN to skip any validation checks
- 💬 Validate FR coverage, story completeness, and dependencies
- 🚪 ENSURE all stories are ready for development

## EXECUTION PROTOCOLS:

- 🎯 Validate every requirement has story coverage
- 💾 Check story dependencies and flow
- 📖 Verify architecture compliance
- 🚫 FORBIDDEN to approve incomplete coverage

## CONTEXT BOUNDARIES:

- Available context: Complete epic and story breakdown from previous steps
- Focus: Final validation of requirements coverage and story readiness
- Limits: Validation only, no new content creation
- Dependencies: Completed story generation from Step 3

## VALIDATION PROCESS:

### 1. FR Coverage Validation

Review the complete epic and story breakdown to ensure EVERY FR is covered:

**CRITICAL CHECK:**

- Go through each FR from the Requirements Inventory
- Verify it appears in at least one story
- Check that acceptance criteria fully address the FR
- No FRs should be left uncovered

### 2. Architecture Implementation Validation

**Check for Starter Template Setup:**

- Does Architecture document specify a starter template?
- If YES: Epic 1 Story 1 must be &quot;Set up initial project from starter template&quot;
- This includes cloning, installing dependencies, initial configuration

**Database/Entity Creation Validation:**

- Are database tables/entities created ONLY when needed by stories?
- ❌ WRONG: Epic 1 creates all tables upfront
- ✅ RIGHT: Tables created as part of the first story that needs them
- Each story should create/modify ONLY what it needs

### 3. Story Quality Validation

**Each story must:**

- Be completable by a single dev agent
- Have clear acceptance criteria
- Reference specific FRs it implements
- Include necessary technical details
- **Not have forward dependencies** (can only depend on PREVIOUS stories)
- Be implementable without waiting for future stories

### 4. Epic Structure Validation

**Check that:**

- Epics deliver user value, not technical milestones
- Dependencies flow naturally
- Foundation stories only setup what&#x27;s needed
- No big upfront technical work

### 5. Dependency Validation (CRITICAL)

**Epic Independence Check:**

- Does each epic deliver COMPLETE functionality for its domain?
- Can Epic 2 function without Epic 3 being implemented?
- Can Epic 3 function standalone using Epic 1 &amp; 2 outputs?
- ❌ WRONG: Epic 2 requires Epic 3 features to work
- ✅ RIGHT: Each epic is independently valuable

**Within-Epic Story Dependency Check:**
For each epic, review stories in order:

- Can Story N.1 be completed without Stories N.2, N.3, etc.?
- Can Story N.2 be completed using only Story N.1 output?
- Can Story N.3 be completed using only Stories N.1 &amp; N.2 outputs?
- ❌ WRONG: &quot;This story depends on a future story&quot;
- ❌ WRONG: Story references features not yet implemented
- ✅ RIGHT: Each story builds only on previous stories

### 6. Complete and Save

If all validations pass:

- Update any remaining placeholders in the document
- Ensure proper formatting
- Save the final epics.md

**Present Final Menu:**
**All validations complete!** [C] Complete Workflow

When C is selected, the workflow is complete and the epics.md is ready for development.

Epics and Stories complete. Read fully and follow: &#x60;_bmad/core/tasks/bmad-help.md&#x60; with argument &#x60;Create Epics and Stories&#x60;.

Upon Completion of task output: offer to answer any questions about the Epics and Stories.


---
name: bmad-bmm-create-product-brief
description: "Create comprehensive product briefs through collaborative step-by-step discovery as creative Business Analyst working with the user as peers."
---

# Product Brief Workflow

**Goal:** Create comprehensive product briefs through collaborative step-by-step discovery as creative Business Analyst working with the user as peers.

**Your Role:** In addition to your name, communication_style, and persona, you are also a product-focused Business Analyst collaborating with an expert peer. This is a partnership, not a client-vendor relationship. You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision. Work together as equals.

---

## WORKFLOW ARCHITECTURE

This uses **step-file architecture** for disciplined execution:

### Core Principles

- **Micro-file Design**: Each step is a self contained instruction file that is a part of an overall workflow that must be followed exactly
- **Just-In-Time Loading**: Only the current step file is in memory - never load future step files until told to do so
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

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;, &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;

### 2. First Step EXECUTION

Read fully and follow: &#x60;{project-root}/_bmad/bmm/workflows/1-analysis/create-product-brief/steps/step-01-init.md&#x60; to begin the workflow.

## Template

---
stepsCompleted: []
inputDocuments: []
date: { system-date }
author: { user }
---

# Product Brief: {{project_name}}

&lt;!-- Content will be appended sequentially through collaborative workflow steps --&gt;


---
name: &#x27;step-01-init&#x27;
description: &#x27;Initialize the product brief workflow by detecting continuation state and setting up the document&#x27;

# File References
nextStepFile: &#x27;./step-02-vision.md&#x27;
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;

# Template References
productBriefTemplate: &#x27;../product-brief.template.md&#x27;
---

# Step 1: Product Brief Initialization

## STEP GOAL:

Initialize the product brief workflow by detecting continuation state and setting up the document structure for collaborative product discovery.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative discovery tone throughout

### Step-Specific Rules:

- 🎯 Focus only on initialization and setup - no content generation yet
- 🚫 FORBIDDEN to look ahead to future steps or assume knowledge from them
- 💬 Approach: Systematic setup with clear reporting to user
- 📋 Detect existing workflow state and handle continuation properly

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis of current state before taking any action
- 💾 Initialize document structure and update frontmatter appropriately
- 📖 Set up frontmatter &#x60;stepsCompleted: [1]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until user selects &#x27;C&#x27; (Continue)

## CONTEXT BOUNDARIES:

- Available context: Variables from workflow.md are available in memory
- Focus: Workflow initialization and document setup only
- Limits: Don&#x27;t assume knowledge from other steps or create content yet
- Dependencies: Configuration loaded from workflow.md initialization

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Check for Existing Workflow State

First, check if the output document already exists:

**Workflow State Detection:**

- Look for file &#x60;{outputFile}&#x60;
- If exists, read the complete file including frontmatter
- If not exists, this is a fresh workflow

### 2. Handle Continuation (If Document Exists)

If the document exists and has frontmatter with &#x60;stepsCompleted&#x60;:

**Continuation Protocol:**

- **STOP immediately** and load &#x60;./step-01b-continue.md&#x60;
- Do not proceed with any initialization tasks
- Let step-01b handle all continuation logic
- This is an auto-proceed situation - no user choice needed

### 3. Fresh Workflow Setup (If No Document)

If no document exists or no &#x60;stepsCompleted&#x60; in frontmatter:

#### A. Input Document Discovery

load context documents using smart discovery. Documents can be in the following locations:
- {planning_artifacts}/**
- {output_folder}/**
- {product_knowledge}/**
- docs/**

Also - when searching - documents can be a single markdown file, or a folder with an index and multiple files. For Example, if searching for &#x60;*foo*.md&#x60; and not found, also search for a folder called *foo*/index.md (which indicates sharded content)

Try to discover the following:
- Brainstorming Reports (&#x60;*brainstorming*.md&#x60;)
- Research Documents (&#x60;*research*.md&#x60;)
- Project Documentation (generally multiple documents might be found for this in the &#x60;{product_knowledge}&#x60; or &#x60;docs&#x60; folder.)
- Project Context (&#x60;**/project-context.md&#x60;)

&lt;critical&gt;Confirm what you have found with the user, along with asking if the user wants to provide anything else. Only after this confirmation will you proceed to follow the loading rules&lt;/critical&gt;

**Loading Rules:**

- Load ALL discovered files completely that the user confirmed or provided (no offset/limit)
- If there is a project context, whatever is relevant should try to be biased in the remainder of this whole workflow process
- For sharded folders, load ALL files to get complete picture, using the index first to potentially know the potential of each document
- index.md is a guide to what&#x27;s relevant whenever available
- Track all successfully loaded files in frontmatter &#x60;inputDocuments&#x60; array

#### B. Create Initial Document

**Document Setup:**

- Copy the template from &#x60;{productBriefTemplate}&#x60; to &#x60;{outputFile}&#x60;, and update the frontmatter fields

#### C. Present Initialization Results

**Setup Report to User:**
&quot;Welcome {{user_name}}! I&#x27;ve set up your product brief workspace for {{project_name}}.

**Document Setup:**

- Created: &#x60;{outputFile}&#x60; from template
- Initialized frontmatter with workflow state

**Input Documents Discovered:**

- Research: {number of research files loaded or &quot;None found&quot;}
- Brainstorming: {number of brainstorming files loaded or &quot;None found&quot;}
- Project docs: {number of project files loaded or &quot;None found&quot;}
- Project Context: {number of project context files loaded or &quot;None found&quot;}

**Files loaded:** {list of specific file names or &quot;No additional documents found&quot;}

Do you have any other documents you&#x27;d like me to include, or shall we continue to the next step?&quot;

### 4. Present MENU OPTIONS

Display: &quot;**Proceeding to product vision discovery...**&quot;

#### Menu Handling Logic:

- After setup report is presented, without delay, read fully and follow: {nextStepFile}

#### EXECUTION RULES:

- This is an initialization step with auto-proceed after setup completion
- Proceed directly to next step after document setup and reporting

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [setup completion is achieved and frontmatter properly updated], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to begin product vision discovery.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Existing workflow detected and properly handed off to step-01b
- Fresh workflow initialized with template and proper frontmatter
- Input documents discovered and loaded using sharded-first logic
- All discovered files tracked in frontmatter &#x60;inputDocuments&#x60;
- Menu presented and user input handled correctly
- Frontmatter updated with &#x60;stepsCompleted: [1]&#x60; before proceeding

### ❌ SYSTEM FAILURE:

- Proceeding with fresh initialization when existing workflow exists
- Not updating frontmatter with discovered input documents
- Creating document without proper template structure
- Not checking sharded folders first before whole files
- Not reporting discovered documents to user clearly
- Proceeding without user selecting &#x27;C&#x27; (Continue)

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-01b-continue&#x27;
description: &#x27;Resume the product brief workflow from where it was left off, ensuring smooth continuation&#x27;

# File References
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;
---

# Step 1B: Product Brief Continuation

## STEP GOAL:

Resume the product brief workflow from where it was left off, ensuring smooth continuation with full context restoration.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative continuation tone throughout

### Step-Specific Rules:

- 🎯 Focus only on understanding where we left off and continuing appropriately
- 🚫 FORBIDDEN to modify content completed in previous steps
- 💬 Approach: Systematic state analysis with clear progress reporting
- 📋 Resume workflow from exact point where it was interrupted

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis of current state before taking any action
- 💾 Keep existing frontmatter &#x60;stepsCompleted&#x60; values
- 📖 Only load documents that were already tracked in &#x60;inputDocuments&#x60;
- 🚫 FORBIDDEN to discover new input documents during continuation

## CONTEXT BOUNDARIES:

- Available context: Current document and frontmatter are already loaded
- Focus: Workflow state analysis and continuation logic only
- Limits: Don&#x27;t assume knowledge beyond what&#x27;s in the document
- Dependencies: Existing workflow state from previous session

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Analyze Current State

**State Assessment:**
Review the frontmatter to understand:

- &#x60;stepsCompleted&#x60;: Which steps are already done
- &#x60;lastStep&#x60;: The most recently completed step number
- &#x60;inputDocuments&#x60;: What context was already loaded
- All other frontmatter variables

### 2. Restore Context Documents

**Context Reloading:**

- For each document in &#x60;inputDocuments&#x60;, load the complete file
- This ensures you have full context for continuation
- Don&#x27;t discover new documents - only reload what was previously processed
- Maintain the same context as when workflow was interrupted

### 3. Present Current Progress

**Progress Report to User:**
&quot;Welcome back {{user_name}}! I&#x27;m resuming our product brief collaboration for {{project_name}}.

**Current Progress:**

- Steps completed: {stepsCompleted}
- Last worked on: Step {lastStep}
- Context documents available: {len(inputDocuments)} files

**Document Status:**

- Current product brief is ready with all completed sections
- Ready to continue from where we left off

Does this look right, or do you want to make any adjustments before we proceed?&quot;

### 4. Determine Continuation Path

**Next Step Logic:**
Based on &#x60;lastStep&#x60; value, determine which step to load next:

- If &#x60;lastStep &#x3D; 1&#x60; → Load &#x60;./step-02-vision.md&#x60;
- If &#x60;lastStep &#x3D; 2&#x60; → Load &#x60;./step-03-users.md&#x60;
- If &#x60;lastStep &#x3D; 3&#x60; → Load &#x60;./step-04-metrics.md&#x60;
- Continue this pattern for all steps
- If &#x60;lastStep &#x3D; 6&#x60; → Workflow already complete

### 5. Handle Workflow Completion

**If workflow already complete (&#x60;lastStep &#x3D; 6&#x60;):**
&quot;Great news! It looks like we&#x27;ve already completed the product brief workflow for {{project_name}}.

The final document is ready at &#x60;{outputFile}&#x60; with all sections completed through step 6.

Would you like me to:

- Review the completed product brief with you
- Suggest next workflow steps (like PRD creation)
- Start a new product brief revision

What would be most helpful?&quot;

### 6. Present MENU OPTIONS

**If workflow not complete:**
Display: &quot;Ready to continue with Step {nextStepNumber}: {nextStepTitle}?

**Select an Option:** [C] Continue to Step {nextStepNumber}&quot;

#### Menu Handling Logic:

- IF C: Read fully and follow the appropriate next step file based on &#x60;lastStep&#x60;
- IF Any other comments or queries: respond and redisplay menu

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- User can chat or ask questions about current progress

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [current state confirmed], will you then read fully and follow the appropriate next step file to resume the workflow.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- All previous input documents successfully reloaded
- Current workflow state accurately analyzed and presented
- User confirms understanding of progress before continuation
- Correct next step identified and prepared for loading
- Proper continuation path determined based on &#x60;lastStep&#x60;

### ❌ SYSTEM FAILURE:

- Discovering new input documents instead of reloading existing ones
- Modifying content from already completed steps
- Loading wrong next step based on &#x60;lastStep&#x60; value
- Proceeding without user confirmation of current state
- Not maintaining context consistency from previous session

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-02-vision&#x27;
description: &#x27;Discover and define the core product vision, problem statement, and unique value proposition&#x27;

# File References
nextStepFile: &#x27;./step-03-users.md&#x27;
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;
---

# Step 2: Product Vision Discovery

## STEP GOAL:

Conduct comprehensive product vision discovery to define the core problem, solution, and unique value proposition through collaborative analysis.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative discovery tone throughout

### Step-Specific Rules:

- 🎯 Focus only on product vision, problem, and solution discovery
- 🚫 FORBIDDEN to generate vision without real user input and collaboration
- 💬 Approach: Systematic discovery from problem to solution
- 📋 COLLABORATIVE discovery, not assumption-based vision crafting

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Generate vision content collaboratively with user
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2]&#x60; before loading next step
- 🚫 FORBIDDEN to proceed without user confirmation through menu

## CONTEXT BOUNDARIES:

- Available context: Current document and frontmatter from step 1, input documents already loaded in memory
- Focus: This will be the first content section appended to the document
- Limits: Focus on clear, compelling product vision and problem statement
- Dependencies: Document initialization from step-01 must be complete

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Begin Vision Discovery

**Opening Conversation:**
&quot;As your PM peer, I&#x27;m excited to help you shape the vision for {{project_name}}. Let&#x27;s start with the foundation.

**Tell me about the product you envision:**

- What core problem are you trying to solve?
- Who experiences this problem most acutely?
- What would success look like for the people you&#x27;re helping?
- What excites you most about this solution?

Let&#x27;s start with the problem space before we get into solutions.&quot;

### 2. Deep Problem Understanding

**Problem Discovery:**
Explore the problem from multiple angles using targeted questions:

- How do people currently solve this problem?
- What&#x27;s frustrating about current solutions?
- What happens if this problem goes unsolved?
- Who feels this pain most intensely?

### 3. Current Solutions Analysis

**Competitive Landscape:**

- What solutions exist today?
- Where do they fall short?
- What gaps are they leaving open?
- Why haven&#x27;t existing solutions solved this completely?

### 4. Solution Vision

**Collaborative Solution Crafting:**

- If we could solve this perfectly, what would that look like?
- What&#x27;s the simplest way we could make a meaningful difference?
- What makes your approach different from what&#x27;s out there?
- What would make users say &#x27;this is exactly what I needed&#x27;?

### 5. Unique Differentiators

**Competitive Advantage:**

- What&#x27;s your unfair advantage?
- What would be hard for competitors to copy?
- What insight or approach is uniquely yours?
- Why is now the right time for this solution?

### 6. Generate Executive Summary Content

**Content to Append:**
Prepare the following structure for document append:

&#x60;&#x60;&#x60;markdown
## Executive Summary

[Executive summary content based on conversation]

---

## Core Vision

### Problem Statement

[Problem statement content based on conversation]

### Problem Impact

[Problem impact content based on conversation]

### Why Existing Solutions Fall Short

[Analysis of existing solution gaps based on conversation]

### Proposed Solution

[Proposed solution description based on conversation]

### Key Differentiators

[Key differentiators based on conversation]
&#x60;&#x60;&#x60;

### 7. Present MENU OPTIONS

**Content Presentation:**
&quot;I&#x27;ve drafted the executive summary and core vision based on our conversation. This captures the essence of {{project_name}} and what makes it special.

**Here&#x27;s what I&#x27;ll add to the document:**
[Show the complete markdown content from step 6]

**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask} with current vision content to dive deeper and refine
- IF P: Read fully and follow: {partyModeWorkflow} to bring different perspectives to positioning and differentiation
- IF C: Save content to {outputFile}, update frontmatter with stepsCompleted: [1, 2], then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu with updated content
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [vision content finalized and saved to document with frontmatter updated], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to begin target user discovery.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Clear problem statement that resonates with target users
- Compelling solution vision that addresses the core problem
- Unique differentiators that provide competitive advantage
- Executive summary that captures the product essence
- A/P/C menu presented and handled correctly with proper task execution
- Content properly appended to document when C selected
- Frontmatter updated with stepsCompleted: [1, 2]

### ❌ SYSTEM FAILURE:

- Accepting vague problem statements without pushing for specificity
- Creating solution vision without fully understanding the problem
- Missing unique differentiators or competitive insights
- Generating vision without real user input and collaboration
- Not presenting standard A/P/C menu after content generation
- Appending content without user selecting &#x27;C&#x27;
- Not updating frontmatter properly

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-03-users&#x27;
description: &#x27;Define target users with rich personas and map their key interactions with the product&#x27;

# File References
nextStepFile: &#x27;./step-04-metrics.md&#x27;
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;
---

# Step 3: Target Users Discovery

## STEP GOAL:

Define target users with rich personas and map their key interactions with the product through collaborative user research and journey mapping.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative discovery tone throughout

### Step-Specific Rules:

- 🎯 Focus only on defining who this product serves and how they interact with it
- 🚫 FORBIDDEN to create generic user profiles without specific details
- 💬 Approach: Systematic persona development with journey mapping
- 📋 COLLABORATIVE persona development, not assumption-based user creation

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Generate user personas and journeys collaboratively with user
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3]&#x60; before loading next step
- 🚫 FORBIDDEN to proceed without user confirmation through menu

## CONTEXT BOUNDARIES:

- Available context: Current document and frontmatter from previous steps, product vision and problem already defined
- Focus: Creating vivid, actionable user personas that align with product vision
- Limits: Focus on users who directly experience the problem or benefit from the solution
- Dependencies: Product vision and problem statement from step-02 must be complete

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Begin User Discovery

**Opening Exploration:**
&quot;Now that we understand what {{project_name}} does, let&#x27;s define who it&#x27;s for.

**User Discovery:**

- Who experiences the problem we&#x27;re solving?
- Are there different types of users with different needs?
- Who gets the most value from this solution?
- Are there primary users and secondary users we should consider?

Let&#x27;s start by identifying the main user groups.&quot;

### 2. Primary User Segment Development

**Persona Development Process:**
For each primary user segment, create rich personas:

**Name &amp; Context:**

- Give them a realistic name and brief backstory
- Define their role, environment, and context
- What motivates them? What are their goals?

**Problem Experience:**

- How do they currently experience the problem?
- What workarounds are they using?
- What are the emotional and practical impacts?

**Success Vision:**

- What would success look like for them?
- What would make them say &quot;this is exactly what I needed&quot;?

**Primary User Questions:**

- &quot;Tell me about a typical person who would use {{project_name}}&quot;
- &quot;What&#x27;s their day like? Where does our product fit in?&quot;
- &quot;What are they trying to accomplish that&#x27;s hard right now?&quot;

### 3. Secondary User Segment Exploration

**Secondary User Considerations:**

- &quot;Who else benefits from this solution, even if they&#x27;re not the primary user?&quot;
- &quot;Are there admin, support, or oversight roles we should consider?&quot;
- &quot;Who influences the decision to adopt or purchase this product?&quot;
- &quot;Are there partner or stakeholder users who matter?&quot;

### 4. User Journey Mapping

**Journey Elements:**
Map key interactions for each user segment:

- **Discovery:** How do they find out about the solution?
- **Onboarding:** What&#x27;s their first experience like?
- **Core Usage:** How do they use the product day-to-day?
- **Success Moment:** When do they realize the value?
- **Long-term:** How does it become part of their routine?

**Journey Questions:**

- &quot;Walk me through how [Persona Name] would discover and start using {{project_name}}&quot;
- &quot;What&#x27;s their &#x27;aha!&#x27; moment?&quot;
- &quot;How does this product change how they work or live?&quot;

### 5. Generate Target Users Content

**Content to Append:**
Prepare the following structure for document append:

&#x60;&#x60;&#x60;markdown
## Target Users

### Primary Users

[Primary user segment content based on conversation]

### Secondary Users

[Secondary user segment content based on conversation, or N/A if not discussed]

### User Journey

[User journey content based on conversation, or N/A if not discussed]
&#x60;&#x60;&#x60;

### 6. Present MENU OPTIONS

**Content Presentation:**
&quot;I&#x27;ve mapped out who {{project_name}} serves and how they&#x27;ll interact with it. This helps us ensure we&#x27;re building something that real people will love to use.

**Here&#x27;s what I&#x27;ll add to the document:**
[Show the complete markdown content from step 5]

**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask} with current user content to dive deeper into personas and journeys
- IF P: Read fully and follow: {partyModeWorkflow} to bring different perspectives to validate user understanding
- IF C: Save content to {outputFile}, update frontmatter with stepsCompleted: [1, 2, 3], then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#6-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu with updated content
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [user personas finalized and saved to document with frontmatter updated], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to begin success metrics definition.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Rich, believable user personas with clear motivations
- Clear distinction between primary and secondary users
- User journeys that show key interaction points and value creation
- User segments that align with product vision and problem statement
- A/P/C menu presented and handled correctly with proper task execution
- Content properly appended to document when C selected
- Frontmatter updated with stepsCompleted: [1, 2, 3]

### ❌ SYSTEM FAILURE:

- Creating generic user profiles without specific details
- Missing key user segments that are important to success
- User journeys that don&#x27;t show how the product creates value
- Not connecting user needs back to the problem statement
- Not presenting standard A/P/C menu after content generation
- Appending content without user selecting &#x27;C&#x27;
- Not updating frontmatter properly

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-04-metrics&#x27;
description: &#x27;Define comprehensive success metrics that include user success, business objectives, and key performance indicators&#x27;

# File References
nextStepFile: &#x27;./step-05-scope.md&#x27;
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;
---

# Step 4: Success Metrics Definition

## STEP GOAL:

Define comprehensive success metrics that include user success, business objectives, and key performance indicators through collaborative metric definition aligned with product vision and user value.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative discovery tone throughout

### Step-Specific Rules:

- 🎯 Focus only on defining measurable success criteria and business objectives
- 🚫 FORBIDDEN to create vague metrics that can&#x27;t be measured or tracked
- 💬 Approach: Systematic metric definition that connects user value to business success
- 📋 COLLABORATIVE metric definition that drives actionable decisions

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Generate success metrics collaboratively with user
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4]&#x60; before loading next step
- 🚫 FORBIDDEN to proceed without user confirmation through menu

## CONTEXT BOUNDARIES:

- Available context: Current document and frontmatter from previous steps, product vision and target users already defined
- Focus: Creating measurable, actionable success criteria that align with product strategy
- Limits: Focus on metrics that drive decisions and demonstrate real value creation
- Dependencies: Product vision and user personas from previous steps must be complete

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Begin Success Metrics Discovery

**Opening Exploration:**
&quot;Now that we know who {{project_name}} serves and what problem it solves, let&#x27;s define what success looks like.

**Success Discovery:**

- How will we know we&#x27;re succeeding for our users?
- What would make users say &#x27;this was worth it&#x27;?
- What metrics show we&#x27;re creating real value?

Let&#x27;s start with the user perspective.&quot;

### 2. User Success Metrics

**User Success Questions:**
Define success from the user&#x27;s perspective:

- &quot;What outcome are users trying to achieve?&quot;
- &quot;How will they know the product is working for them?&quot;
- &quot;What&#x27;s the moment where they realize this is solving their problem?&quot;
- &quot;What behaviors indicate users are getting value?&quot;

**User Success Exploration:**
Guide from vague to specific metrics:

- &quot;Users are happy&quot; → &quot;Users complete [key action] within [timeframe]&quot;
- &quot;Product is useful&quot; → &quot;Users return [frequency] and use [core feature]&quot;
- Focus on outcomes and behaviors, not just satisfaction scores

### 3. Business Objectives

**Business Success Questions:**
Define business success metrics:

- &quot;What does success look like for the business at 3 months? 12 months?&quot;
- &quot;Are we measuring revenue, user growth, engagement, something else?&quot;
- &quot;What business metrics would make you say &#x27;this is working&#x27;?&quot;
- &quot;How does this product contribute to broader company goals?&quot;

**Business Success Categories:**

- **Growth Metrics:** User acquisition, market penetration
- **Engagement Metrics:** Usage patterns, retention, satisfaction
- **Financial Metrics:** Revenue, profitability, cost efficiency
- **Strategic Metrics:** Market position, competitive advantage

### 4. Key Performance Indicators

**KPI Development Process:**
Define specific, measurable KPIs:

- Transform objectives into measurable indicators
- Ensure each KPI has a clear measurement method
- Define targets and timeframes where appropriate
- Include leading indicators that predict success

**KPI Examples:**

- User acquisition: &quot;X new users per month&quot;
- Engagement: &quot;Y% of users complete core journey weekly&quot;
- Business impact: &quot;$Z in cost savings or revenue generation&quot;

### 5. Connect Metrics to Strategy

**Strategic Alignment:**
Ensure metrics align with product vision and user needs:

- Connect each metric back to the product vision
- Ensure user success metrics drive business success
- Validate that metrics measure what truly matters
- Avoid vanity metrics that don&#x27;t drive decisions

### 6. Generate Success Metrics Content

**Content to Append:**
Prepare the following structure for document append:

&#x60;&#x60;&#x60;markdown
## Success Metrics

[Success metrics content based on conversation]

### Business Objectives

[Business objectives content based on conversation, or N/A if not discussed]

### Key Performance Indicators

[Key performance indicators content based on conversation, or N/A if not discussed]
&#x60;&#x60;&#x60;

### 7. Present MENU OPTIONS

**Content Presentation:**
&quot;I&#x27;ve defined success metrics that will help us track whether {{project_name}} is creating real value for users and achieving business objectives.

**Here&#x27;s what I&#x27;ll add to the document:**
[Show the complete markdown content from step 6]

**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask} with current metrics content to dive deeper into success metric insights
- IF P: Read fully and follow: {partyModeWorkflow} to bring different perspectives to validate comprehensive metrics
- IF C: Save content to {outputFile}, update frontmatter with stepsCompleted: [1, 2, 3, 4], then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu with updated content
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [success metrics finalized and saved to document with frontmatter updated], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to begin MVP scope definition.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- User success metrics that focus on outcomes and behaviors
- Clear business objectives aligned with product strategy
- Specific, measurable KPIs with defined targets and timeframes
- Metrics that connect user value to business success
- A/P/C menu presented and handled correctly with proper task execution
- Content properly appended to document when C selected
- Frontmatter updated with stepsCompleted: [1, 2, 3, 4]

### ❌ SYSTEM FAILURE:

- Vague success metrics that can&#x27;t be measured or tracked
- Business objectives disconnected from user success
- Too many metrics or missing critical success indicators
- Metrics that don&#x27;t drive actionable decisions
- Not presenting standard A/P/C menu after content generation
- Appending content without user selecting &#x27;C&#x27;
- Not updating frontmatter properly

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-05-scope&#x27;
description: &#x27;Define MVP scope with clear boundaries and outline future vision while managing scope creep&#x27;

# File References
nextStepFile: &#x27;./step-06-complete.md&#x27;
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;

# Task References
advancedElicitationTask: &#x27;{project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml&#x27;
partyModeWorkflow: &#x27;{project-root}/_bmad/core/workflows/party-mode/workflow.md&#x27;
---

# Step 5: MVP Scope Definition

## STEP GOAL:

Define MVP scope with clear boundaries and outline future vision through collaborative scope negotiation that balances ambition with realism.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative discovery tone throughout

### Step-Specific Rules:

- 🎯 Focus only on defining minimum viable scope and future vision
- 🚫 FORBIDDEN to create MVP scope that&#x27;s too large or includes non-essential features
- 💬 Approach: Systematic scope negotiation with clear boundary setting
- 📋 COLLABORATIVE scope definition that prevents scope creep

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Generate MVP scope collaboratively with user
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4, 5]&#x60; before loading next step
- 🚫 FORBIDDEN to proceed without user confirmation through menu

## CONTEXT BOUNDARIES:

- Available context: Current document and frontmatter from previous steps, product vision, users, and success metrics already defined
- Focus: Defining what&#x27;s essential for MVP vs. future enhancements
- Limits: Balance user needs with implementation feasibility
- Dependencies: Product vision, user personas, and success metrics from previous steps must be complete

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Begin Scope Definition

**Opening Exploration:**
&quot;Now that we understand what {{project_name}} does, who it serves, and how we&#x27;ll measure success, let&#x27;s define what we need to build first.

**Scope Discovery:**

- What&#x27;s the absolute minimum we need to deliver to solve the core problem?
- What features would make users say &#x27;this solves my problem&#x27;?
- How do we balance ambition with getting something valuable to users quickly?

Let&#x27;s start with the MVP mindset: what&#x27;s the smallest version that creates real value?&quot;

### 2. MVP Core Features Definition

**MVP Feature Questions:**
Define essential features for minimum viable product:

- &quot;What&#x27;s the core functionality that must work?&quot;
- &quot;Which features directly address the main problem we&#x27;re solving?&quot;
- &quot;What would users consider &#x27;incomplete&#x27; if it was missing?&quot;
- &quot;What features create the &#x27;aha!&#x27; moment we discussed earlier?&quot;

**MVP Criteria:**

- **Solves Core Problem:** Addresses the main pain point effectively
- **User Value:** Creates meaningful outcome for target users
- **Feasible:** Achievable with available resources and timeline
- **Testable:** Allows learning and iteration based on user feedback

### 3. Out of Scope Boundaries

**Out of Scope Exploration:**
Define what explicitly won&#x27;t be in MVP:

- &quot;What features would be nice to have but aren&#x27;t essential?&quot;
- &quot;What functionality could wait for version 2.0?&quot;
- &quot;What are we intentionally saying &#x27;no&#x27; to for now?&quot;
- &quot;How do we communicate these boundaries to stakeholders?&quot;

**Boundary Setting:**

- Clear communication about what&#x27;s not included
- Rationale for deferring certain features
- Timeline considerations for future additions
- Trade-off explanations for stakeholders

### 4. MVP Success Criteria

**Success Validation:**
Define what makes the MVP successful:

- &quot;How will we know the MVP is successful?&quot;
- &quot;What metrics will indicate we should proceed beyond MVP?&quot;
- &quot;What user feedback signals validate our approach?&quot;
- &quot;What&#x27;s the decision point for scaling beyond MVP?&quot;

**Success Gates:**

- User adoption metrics
- Problem validation evidence
- Technical feasibility confirmation
- Business model validation

### 5. Future Vision Exploration

**Vision Questions:**
Define the longer-term product vision:

- &quot;If this is wildly successful, what does it become in 2-3 years?&quot;
- &quot;What capabilities would we add with more resources?&quot;
- &quot;How does the MVP evolve into the full product vision?&quot;
- &quot;What markets or user segments could we expand to?&quot;

**Future Features:**

- Post-MVP enhancements that build on core functionality
- Scale considerations and growth capabilities
- Platform or ecosystem expansion opportunities
- Advanced features that differentiate in the long term

### 6. Generate MVP Scope Content

**Content to Append:**
Prepare the following structure for document append:

&#x60;&#x60;&#x60;markdown
## MVP Scope

### Core Features

[Core features content based on conversation]

### Out of Scope for MVP

[Out of scope content based on conversation, or N/A if not discussed]

### MVP Success Criteria

[MVP success criteria content based on conversation, or N/A if not discussed]

### Future Vision

[Future vision content based on conversation, or N/A if not discussed]
&#x60;&#x60;&#x60;

### 7. Present MENU OPTIONS

**Content Presentation:**
&quot;I&#x27;ve defined the MVP scope for {{project_name}} that balances delivering real value with realistic boundaries. This gives us a clear path forward while keeping our options open for future growth.

**Here&#x27;s what I&#x27;ll add to the document:**
[Show the complete markdown content from step 6]

**Select an Option:** [A] Advanced Elicitation [P] Party Mode [C] Continue&quot;

#### Menu Handling Logic:

- IF A: Read fully and follow: {advancedElicitationTask} with current scope content to optimize scope definition
- IF P: Read fully and follow: {partyModeWorkflow} to bring different perspectives to validate MVP scope
- IF C: Save content to {outputFile}, update frontmatter with stepsCompleted: [1, 2, 3, 4, 5], then read fully and follow: {nextStepFile}
- IF Any other comments or queries: help user respond then [Redisplay Menu Options](#7-present-menu-options)

#### EXECUTION RULES:

- ALWAYS halt and wait for user input after presenting menu
- ONLY proceed to next step when user selects &#x27;C&#x27;
- After other menu items execution, return to this menu with updated content
- User can chat or ask questions - always respond and then end with display again of the menu options

## CRITICAL STEP COMPLETION NOTE

ONLY WHEN [C continue option] is selected and [MVP scope finalized and saved to document with frontmatter updated], will you then read fully and follow: &#x60;{nextStepFile}&#x60; to complete the product brief workflow.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- MVP features that solve the core problem effectively
- Clear out-of-scope boundaries that prevent scope creep
- Success criteria that validate MVP approach and inform go/no-go decisions
- Future vision that inspires while maintaining focus on MVP
- A/P/C menu presented and handled correctly with proper task execution
- Content properly appended to document when C selected
- Frontmatter updated with stepsCompleted: [1, 2, 3, 4, 5]

### ❌ SYSTEM FAILURE:

- MVP scope too large or includes non-essential features
- Missing clear boundaries leading to scope creep
- No success criteria to validate MVP approach
- Future vision disconnected from MVP foundation
- Not presenting standard A/P/C menu after content generation
- Appending content without user selecting &#x27;C&#x27;
- Not updating frontmatter properly

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.


---
name: &#x27;step-06-complete&#x27;
description: &#x27;Complete the product brief workflow, update status files, and suggest next steps for the project&#x27;

# File References
outputFile: &#x27;{planning_artifacts}/product-brief-{{project_name}}-{{date}}.md&#x27;
---

# Step 6: Product Brief Completion

## STEP GOAL:

Complete the product brief workflow, update status files, and provide guidance on logical next steps for continued product development.

## MANDATORY EXECUTION RULES (READ FIRST):

### Universal Rules:

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: Read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure entire file is read
- 📋 YOU ARE A FACILITATOR, not a content generator
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Role Reinforcement:

- ✅ You are a product-focused Business Analyst facilitator
- ✅ If you already have been given a name, communication_style and persona, continue to use those while playing this new role
- ✅ We engage in collaborative dialogue, not command-response
- ✅ You bring structured thinking and facilitation skills, while the user brings domain expertise and product vision
- ✅ Maintain collaborative completion tone throughout

### Step-Specific Rules:

- 🎯 Focus only on completion, next steps, and project guidance
- 🚫 FORBIDDEN to generate new content for the product brief
- 💬 Approach: Systematic completion with quality validation and next step recommendations
- 📋 FINALIZE document and update workflow status appropriately

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update the main workflow status file with completion information
- 📖 Suggest potential next workflow steps for the user
- 🚫 DO NOT load additional steps after this one (this is final)

## CONTEXT BOUNDARIES:

- Available context: Complete product brief document from all previous steps, workflow frontmatter shows all completed steps
- Focus: Completion validation, status updates, and next step guidance
- Limits: No new content generation, only completion and wrap-up activities
- Dependencies: All previous steps must be completed with content saved to document

## Sequence of Instructions (Do not deviate, skip, or optimize)

### 1. Announce Workflow Completion

**Completion Announcement:**
&quot;🎉 **Product Brief Complete, {{user_name}}!**

I&#x27;ve successfully collaborated with you to create a comprehensive Product Brief for {{project_name}}.

**What we&#x27;ve accomplished:**

- ✅ Executive Summary with clear vision and problem statement
- ✅ Core Vision with solution definition and unique differentiators
- ✅ Target Users with rich personas and user journeys
- ✅ Success Metrics with measurable outcomes and business objectives
- ✅ MVP Scope with focused feature set and clear boundaries
- ✅ Future Vision that inspires while maintaining current focus

**The complete Product Brief is now available at:** &#x60;{outputFile}&#x60;

This brief serves as the foundation for all subsequent product development activities and strategic decisions.&quot;

### 2. Document Quality Check

**Completeness Validation:**
Perform final validation of the product brief:

- Does the executive summary clearly communicate the vision and problem?
- Are target users well-defined with compelling personas?
- Do success metrics connect user value to business objectives?
- Is MVP scope focused and realistic?
- Does the brief provide clear direction for next steps?

**Consistency Validation:**

- Do all sections align with the core problem statement?
- Is user value consistently emphasized throughout?
- Are success criteria traceable to user needs and business goals?
- Does MVP scope align with the problem and solution?

### 3. Suggest Next Steps

**Recommended Next Workflow:**
Provide guidance on logical next workflows:

1. &#x60;create-prd&#x60; - Create detailed Product Requirements Document
   - Brief provides foundation for detailed requirements
   - User personas inform journey mapping
   - Success metrics become specific acceptance criteria
   - MVP scope becomes detailed feature specifications

**Other Potential Next Steps:**

1. &#x60;create-ux-design&#x60; - UX research and design (can run parallel with PRD)
2. &#x60;domain-research&#x60; - Deep market or domain research (if needed)

**Strategic Considerations:**

- The PRD workflow builds directly on this brief for detailed planning
- Consider team capacity and immediate priorities
- Use brief to validate concept before committing to detailed work
- Brief can guide early technical feasibility discussions

### 4. Congrats to the user

&quot;**Your Product Brief for {{project_name}} is now complete and ready for the next phase!**&quot;

Recap that the brief captures everything needed to guide subsequent product development:

- Clear vision and problem definition
- Deep understanding of target users
- Measurable success criteria
- Focused MVP scope with realistic boundaries
- Inspiring long-term vision

### 5. Suggest next steps

Product Brief complete. Read fully and follow: &#x60;_bmad/core/tasks/bmad-help.md&#x60; with argument &#x60;Validate PRD&#x60;.

---

## 🚨 SYSTEM SUCCESS/FAILURE METRICS

### ✅ SUCCESS:

- Product brief contains all essential sections with collaborative content
- All collaborative content properly saved to document with proper frontmatter
- Workflow status file updated with completion information and timestamp
- Clear next step guidance provided to user with specific workflow recommendations
- Document quality validation completed with completeness and consistency checks
- User acknowledges completion and understands next available options
- Workflow properly marked as complete in status tracking

### ❌ SYSTEM FAILURE:

- Not updating workflow status file with completion information
- Missing clear next step guidance for user
- Not confirming document completeness with user
- Workflow not properly marked as complete in status tracking
- User unclear about what happens next or available options
- Document quality issues not identified or addressed

**Master Rule:** Skipping steps, optimizing sequences, or not following exact instructions is FORBIDDEN and constitutes SYSTEM FAILURE.

## FINAL WORKFLOW COMPLETION

This product brief is now complete and serves as the strategic foundation for the entire product lifecycle. All subsequent design, architecture, and development work should trace back to the vision, user needs, and success criteria documented in this brief.

**Congratulations on completing the Product Brief for {{project_name}}!** 🎉


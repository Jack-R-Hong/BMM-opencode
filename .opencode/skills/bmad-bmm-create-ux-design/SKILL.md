---
name: bmad-bmm-create-ux-design
description: "Work with a peer UX Design expert to plan your applications UX patterns, look and feel."
---

# Create UX Design Workflow

**Goal:** Create comprehensive UX design specifications through collaborative visual exploration and informed decision-making where you act as a UX facilitator working with a product stakeholder.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation

---

## INITIALIZATION

### Configuration Loading

Load config from &#x60;{project-root}/_bmad/bmm/config.yaml&#x60; and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;
- &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;date&#x60; as system-generated current datetime

### Paths

- &#x60;installed_path&#x60; &#x3D; &#x60;{project-root}/_bmad/bmm/workflows/2-plan-workflows/create-ux-design&#x60;
- &#x60;template_path&#x60; &#x3D; &#x60;{installed_path}/ux-design-template.md&#x60;
- &#x60;default_output_file&#x60; &#x3D; &#x60;{planning_artifacts}/ux-design-specification.md&#x60;

## EXECUTION

- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;
- Read fully and follow: &#x60;steps/step-01-init.md&#x60; to begin the UX design workflow.

# Step 1: UX Design Workflow Initialization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on initialization and setup only - don&#x27;t look ahead to future steps
- 🚪 DETECT existing workflow state and handle continuation properly
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Initialize document and update frontmatter
- 📖 Set up frontmatter &#x60;stepsCompleted: [1]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until setup is complete

## CONTEXT BOUNDARIES:

- Variables from workflow.md are available in memory
- Previous context &#x3D; what&#x27;s in output document + frontmatter
- Don&#x27;t assume knowledge from other steps
- Input document discovery happens in this step

## YOUR TASK:

Initialize the UX design workflow by detecting continuation state and setting up the design specification document.

## INITIALIZATION SEQUENCE:

### 1. Check for Existing Workflow

First, check if the output document already exists:

- Look for file at &#x60;{planning_artifacts}/*ux-design-specification*.md&#x60;
- If exists, read the complete file including frontmatter
- If not exists, this is a fresh workflow

### 2. Handle Continuation (If Document Exists)

If the document exists and has frontmatter with &#x60;stepsCompleted&#x60;:

- **STOP here** and load &#x60;./step-01b-continue.md&#x60; immediately
- Do not proceed with any initialization tasks
- Let step-01b handle the continuation logic

### 3. Fresh Workflow Setup (If No Document)

If no document exists or no &#x60;stepsCompleted&#x60; in frontmatter:

#### A. Input Document Discovery

Discover and load context documents using smart discovery. Documents can be in the following locations:
- {planning_artifacts}/**
- {output_folder}/**
- {product_knowledge}/**
- docs/**

Also - when searching - documents can be a single markdown file, or a folder with an index and multiple files. For Example, if searching for &#x60;*foo*.md&#x60; and not found, also search for a folder called *foo*/index.md (which indicates sharded content)

Try to discover the following:
- Product Brief (&#x60;*brief*.md&#x60;)
- Research Documents (&#x60;*prd*.md&#x60;)
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

Copy the template from &#x60;{installed_path}/ux-design-template.md&#x60; to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
Initialize frontmatter in the template.

#### C. Complete Initialization and Report

Complete setup and report to user:

**Document Setup:**

- Created: &#x60;{planning_artifacts}/ux-design-specification.md&#x60; from template
- Initialized frontmatter with workflow state

**Input Documents Discovered:**
Report what was found:
&quot;Welcome {{user_name}}! I&#x27;ve set up your UX design workspace for {{project_name}}.

**Documents Found:**

- PRD: {number of PRD files loaded or &quot;None found&quot;}
- Product brief: {number of brief files loaded or &quot;None found&quot;}
- Other context: {number of other files loaded or &quot;None found&quot;}

**Files loaded:** {list of specific file names or &quot;No additional documents found&quot;}

Do you have any other documents you&#x27;d like me to include, or shall we continue to the next step?

[C] Continue to UX discovery&quot;

## NEXT STEP:

After user selects [C] to continue, ensure the file &#x60;{planning_artifacts}/ux-design-specification.md&#x60; has been created and saved, and then load &#x60;./step-02-discovery.md&#x60; to begin the UX discovery phase.

Remember: Do NOT proceed to step-02 until output file has been updated and user explicitly selects [C] to continue!

## SUCCESS METRICS:

✅ Existing workflow detected and handed off to step-01b correctly
✅ Fresh workflow initialized with template and frontmatter
✅ Input documents discovered and loaded using sharded-first logic
✅ All discovered files tracked in frontmatter &#x60;inputDocuments&#x60;
✅ User confirmed document setup and can proceed

## FAILURE MODES:

❌ Proceeding with fresh initialization when existing workflow exists
❌ Not updating frontmatter with discovered input documents
❌ Creating document without proper template
❌ Not checking sharded folders first before whole files
❌ Not reporting what documents were found to user

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols


# Step 1B: UX Design Workflow Continuation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on understanding where we left off and continuing appropriately
- 🚪 RESUME workflow from exact point where it was interrupted
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis of current state before taking action
- 💾 Keep existing frontmatter &#x60;stepsCompleted&#x60; values
- 📖 Only load documents that were already tracked in &#x60;inputDocuments&#x60;
- 🚫 FORBIDDEN to modify content completed in previous steps

## CONTEXT BOUNDARIES:

- Current document and frontmatter are already loaded
- Previous context &#x3D; complete document + existing frontmatter
- Input documents listed in frontmatter were already processed
- Last completed step &#x3D; &#x60;lastStep&#x60; value from frontmatter

## YOUR TASK:

Resume the UX design workflow from where it was left off, ensuring smooth continuation.

## CONTINUATION SEQUENCE:

### 1. Analyze Current State

Review the frontmatter to understand:

- &#x60;stepsCompleted&#x60;: Which steps are already done
- &#x60;lastStep&#x60;: The most recently completed step number
- &#x60;inputDocuments&#x60;: What context was already loaded
- All other frontmatter variables

### 2. Load All Input Documents

Reload the context documents listed in &#x60;inputDocuments&#x60;:

- For each document in &#x60;inputDocuments&#x60;, load the complete file
- This ensures you have full context for continuation
- Don&#x27;t discover new documents - only reload what was previously processed

### 3. Summarize Current Progress

Welcome the user back and provide context:
&quot;Welcome back {{user_name}}! I&#x27;m resuming our UX design collaboration for {{project_name}}.

**Current Progress:**

- Steps completed: {stepsCompleted}
- Last worked on: Step {lastStep}
- Context documents available: {len(inputDocuments)} files
- Current UX design specification is ready with all completed sections

**Document Status:**

- Current UX design document is ready with all completed sections
- Ready to continue from where we left off

Does this look right, or do you want to make any adjustments before we proceed?&quot;

### 4. Determine Next Step

Based on &#x60;lastStep&#x60; value, determine which step to load next:

- If &#x60;lastStep &#x3D; 1&#x60; → Load &#x60;./step-02-discovery.md&#x60;
- If &#x60;lastStep &#x3D; 2&#x60; → Load &#x60;./step-03-core-experience.md&#x60;
- If &#x60;lastStep &#x3D; 3&#x60; → Load &#x60;./step-04-emotional-response.md&#x60;
- Continue this pattern for all steps
- If &#x60;lastStep&#x60; indicates final step → Workflow already complete

### 5. Present Continuation Options

After presenting current progress, ask:
&quot;Ready to continue with Step {nextStepNumber}: {nextStepTitle}?

[C] Continue to Step {nextStepNumber}&quot;

## SUCCESS METRICS:

✅ All previous input documents successfully reloaded
✅ Current workflow state accurately analyzed and presented
✅ User confirms understanding of progress
✅ Correct next step identified and prepared for loading

## FAILURE MODES:

❌ Discovering new input documents instead of reloading existing ones
❌ Modifying content from already completed steps
❌ Loading wrong next step based on &#x60;lastStep&#x60; value
❌ Proceeding without user confirmation of current state

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## WORKFLOW ALREADY COMPLETE?

If &#x60;lastStep&#x60; indicates the final step is completed:
&quot;Great news! It looks like we&#x27;ve already completed the UX design workflow for {{project_name}}.

The final UX design specification is ready at {output_folder}/ux-design-specification.md with all sections completed through step {finalStepNumber}.

The complete UX design includes visual foundations, user flows, and design specifications ready for implementation.

Would you like me to:

- Review the completed UX design specification with you
- Suggest next workflow steps (like wireframe generation or architecture)
- Start a new UX design revision

What would be most helpful?&quot;

## NEXT STEP:

After user confirms they&#x27;re ready to continue, load the appropriate next step file based on the &#x60;lastStep&#x60; value from frontmatter.

Remember: Do NOT load the next step until user explicitly selects [C] to continue!


# Step 2: Project Understanding

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on understanding project context and user needs
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating project understanding content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper project insights
- **P (Party Mode)**: Bring multiple perspectives to understand project context
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from step 1 are available
- Input documents (PRD, briefs, epics) already loaded are in memory
- No additional data files needed for this step
- Focus on project and user understanding

## YOUR TASK:

Understand the project context, target users, and what makes this product special from a UX perspective.

## PROJECT DISCOVERY SEQUENCE:

### 1. Review Loaded Context

Start by analyzing what we know from the loaded documents:
&quot;Based on the project documentation we have loaded, let me confirm what I&#x27;m understanding about {{project_name}}.

**From the documents:**
{summary of key insights from loaded PRD, briefs, and other context documents}

**Target Users:**
{summary of user information from loaded documents}

**Key Features/Goals:**
{summary of main features and goals from loaded documents}

Does this match your understanding? Are there any corrections or additions you&#x27;d like to make?&quot;

### 2. Fill Context Gaps (If no documents or gaps exist)

If no documents were loaded or key information is missing:
&quot;Since we don&#x27;t have complete documentation, let&#x27;s start with the essentials:

**What are you building?** (Describe your product in 1-2 sentences)

**Who is this for?** (Describe your ideal user or target audience)

**What makes this special or different?** (What&#x27;s the unique value proposition?)

**What&#x27;s the main thing users will do with this?** (Core user action or goal)&quot;

### 3. Explore User Context Deeper

Dive into user understanding:
&quot;Let me understand your users better to inform the UX design:

**User Context Questions:**

- What problem are users trying to solve?
- What frustrates them with current solutions?
- What would make them say &#x27;this is exactly what I needed&#x27;?
- How tech-savvy are your target users?
- What devices will they use most?
- When/where will they use this product?&quot;

### 4. Identify UX Design Challenges

Surface the key UX challenges to address:
&quot;From what we&#x27;ve discussed, I&#x27;m seeing some key UX design considerations:

**Design Challenges:**

- [Identify 2-3 key UX challenges based on project type and user needs]
- [Note any platform-specific considerations]
- [Highlight any complex user flows or interactions]

**Design Opportunities:**

- [Identify 2-3 areas where great UX could create competitive advantage]
- [Note any opportunities for innovative UX patterns]

Does this capture the key UX considerations we need to address?&quot;

### 5. Generate Project Understanding Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Executive Summary

### Project Vision

[Project vision summary based on conversation]

### Target Users

[Target user descriptions based on conversation]

### Key Design Challenges

[Key UX challenges identified based on conversation]

### Design Opportunities

[Design opportunities identified based on conversation]
&#x60;&#x60;&#x60;

### 6. Present Content and Menu

Show the generated project understanding content and present choices:
&quot;I&#x27;ve documented our understanding of {{project_name}} from a UX perspective. This will guide all our design decisions moving forward.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 5]

**What would you like to do?**
[C] Continue - Save this to the document and move to core experience definition&quot;

### 7. Handle Menu Selection

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2]&#x60;
- Load &#x60;./step-03-core-experience.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document. Only after the content is saved to document, read fully and follow: &#x60;./step-03-core-experience.md&#x60;.

## SUCCESS METRICS:

✅ All available context documents reviewed and synthesized
✅ Project vision clearly articulated
✅ Target users well understood
✅ Key UX challenges identified
✅ Design opportunities surfaced
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not reviewing loaded context documents thoroughly
❌ Making assumptions about users without asking
❌ Missing key UX challenges that will impact design
❌ Not identifying design opportunities
❌ Generating generic content without real project insight
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

Remember: Do NOT proceed to step-03 until user explicitly selects &#x27;C&#x27; from the menu and content is saved!


# Step 3: Core Experience Definition

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on defining the core user experience and platform
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating core experience content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper experience insights
- **P (Party Mode)**: Bring multiple perspectives to define optimal user experience
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Project understanding from step 2 informs this step
- No additional data files needed for this step
- Focus on core experience and platform decisions

## YOUR TASK:

Define the core user experience, platform requirements, and what makes the interaction effortless.

## CORE EXPERIENCE DISCOVERY SEQUENCE:

### 1. Define Core User Action

Start by identifying the most important user interaction:
&quot;Now let&#x27;s dig into the heart of the user experience for {{project_name}}.

**Core Experience Questions:**

- What&#x27;s the ONE thing users will do most frequently?
- What user action is absolutely critical to get right?
- What should be completely effortless for users?
- If we nail one interaction, everything else follows - what is it?

Think about the core loop or primary action that defines your product&#x27;s value.&quot;

### 2. Explore Platform Requirements

Determine where and how users will interact:
&quot;Let&#x27;s define the platform context for {{project_name}}:

**Platform Questions:**

- Web, mobile app, desktop, or multiple platforms?
- Will this be primarily touch-based or mouse/keyboard?
- Any specific platform requirements or constraints?
- Do we need to consider offline functionality?
- Any device-specific capabilities we should leverage?&quot;

### 3. Identify Effortless Interactions

Surface what should feel magical or completely seamless:
&quot;**Effortless Experience Design:**

- What user actions should feel completely natural and require zero thought?
- Where do users currently struggle with similar products?
- What interaction, if made effortless, would create delight?
- What should happen automatically without user intervention?
- Where can we eliminate steps that competitors require?&quot;

### 4. Define Critical Success Moments

Identify the moments that determine success or failure:
&quot;**Critical Success Moments:**

- What&#x27;s the moment where users realize &#x27;this is better&#x27;?
- When does the user feel successful or accomplished?
- What interaction, if failed, would ruin the experience?
- What are the make-or-break user flows?
- Where does first-time user success happen?&quot;

### 5. Synthesize Experience Principles

Extract guiding principles from the conversation:
&quot;Based on our discussion, I&#x27;m hearing these core experience principles for {{project_name}}:

**Experience Principles:**

- [Principle 1 based on core action focus]
- [Principle 2 based on effortless interactions]
- [Principle 3 based on platform considerations]
- [Principle 4 based on critical success moments]

These principles will guide all our UX decisions. Do these capture what&#x27;s most important?&quot;

### 6. Generate Core Experience Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Core User Experience

### Defining Experience

[Core experience definition based on conversation]

### Platform Strategy

[Platform requirements and decisions based on conversation]

### Effortless Interactions

[Effortless interaction areas identified based on conversation]

### Critical Success Moments

[Critical success moments defined based on conversation]

### Experience Principles

[Guiding principles for UX decisions based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated core experience content and present choices:
&quot;I&#x27;ve defined the core user experience for {{project_name}} based on our conversation. This establishes the foundation for all our UX design decisions.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine the core experience definition
[P] Party Mode - Bring different perspectives on the user experience
[C] Continue - Save this to the document and move to emotional response definition&quot;

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current core experience content
- Process the enhanced experience insights that come back
- Ask user: &quot;Accept these improvements to the core experience definition? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current core experience definition
- Process the collaborative experience improvements that come back
- Ask user: &quot;Accept these changes to the core experience definition? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-04-emotional-response.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Core user action clearly identified and defined
✅ Platform requirements thoroughly explored
✅ Effortless interaction areas identified
✅ Critical success moments mapped out
✅ Experience principles established as guiding framework
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Missing the core user action that defines the product
❌ Not properly considering platform requirements
❌ Overlooking what should be effortless for users
❌ Not identifying critical make-or-break interactions
❌ Experience principles too generic or not actionable
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-04-emotional-response.md&#x60; to define desired emotional responses.

Remember: Do NOT proceed to step-04 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 4: Desired Emotional Response

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on defining desired emotional responses and user feelings
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating emotional response content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper emotional insights
- **P (Party Mode)**: Bring multiple perspectives to define optimal emotional responses
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Core experience definition from step 3 informs emotional response
- No additional data files needed for this step
- Focus on user feelings and emotional design goals

## YOUR TASK:

Define the desired emotional responses users should feel when using the product.

## EMOTIONAL RESPONSE DISCOVERY SEQUENCE:

### 1. Explore Core Emotional Goals

Start by understanding the emotional objectives:
&quot;Now let&#x27;s think about how {{project_name}} should make users feel.

**Emotional Response Questions:**

- What should users FEEL when using this product?
- What emotion would make them tell a friend about this?
- How should users feel after accomplishing their primary goal?
- What feeling differentiates this from competitors?

Common emotional goals: Empowered and in control? Delighted and surprised? Efficient and productive? Creative and inspired? Calm and focused? Connected and engaged?&quot;

### 2. Identify Emotional Journey Mapping

Explore feelings at different stages:
&quot;**Emotional Journey Considerations:**

- How should users feel when they first discover the product?
- What emotion during the core experience/action?
- How should they feel after completing their task?
- What if something goes wrong - what emotional response do we want?
- How should they feel when returning to use it again?&quot;

### 3. Define Micro-Emotions

Surface subtle but important emotional states:
&quot;**Micro-Emotions to Consider:**

- Confidence vs. Confusion
- Trust vs. Skepticism
- Excitement vs. Anxiety
- Accomplishment vs. Frustration
- Delight vs. Satisfaction
- Belonging vs. Isolation

Which of these emotional states are most critical for your product&#x27;s success?&quot;

### 4. Connect Emotions to UX Decisions

Link feelings to design implications:
&quot;**Design Implications:**

- If we want users to feel [emotional state], what UX choices support this?
- What interactions might create negative emotions we want to avoid?
- Where can we add moments of delight or surprise?
- How do we build trust and confidence through design?

**Emotion-Design Connections:**

- [Emotion 1] → [UX design approach]
- [Emotion 2] → [UX design approach]
- [Emotion 3] → [UX design approach]&quot;

### 5. Validate Emotional Goals

Check if emotional goals align with product vision:
&quot;Let me make sure I understand the emotional vision for {{project_name}}:

**Primary Emotional Goal:** [Summarize main emotional response]
**Secondary Feelings:** [List supporting emotional states]
**Emotions to Avoid:** [List negative emotions to prevent]

Does this capture the emotional experience you want to create? Any adjustments needed?&quot;

### 6. Generate Emotional Response Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Desired Emotional Response

### Primary Emotional Goals

[Primary emotional goals based on conversation]

### Emotional Journey Mapping

[Emotional journey mapping based on conversation]

### Micro-Emotions

[Micro-emotions identified based on conversation]

### Design Implications

[UX design implications for emotional responses based on conversation]

### Emotional Design Principles

[Guiding principles for emotional design based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated emotional response content and present choices:
&quot;I&#x27;ve defined the desired emotional responses for {{project_name}}. These emotional goals will guide our design decisions to create the right user experience.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine the emotional response definition
[P] Party Mode - Bring different perspectives on user emotional needs
[C] Continue - Save this to the document and move to inspiration analysis&quot;

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current emotional response content
- Process the enhanced emotional insights that come back
- Ask user: &quot;Accept these improvements to the emotional response definition? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current emotional response definition
- Process the collaborative emotional insights that come back
- Ask user: &quot;Accept these changes to the emotional response definition? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-05-inspiration.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Primary emotional goals clearly defined
✅ Emotional journey mapped across user experience
✅ Micro-emotions identified and addressed
✅ Design implications connected to emotional responses
✅ Emotional design principles established
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Missing core emotional goals or being too generic
❌ Not considering emotional journey across different stages
❌ Overlooking micro-emotions that impact user satisfaction
❌ Not connecting emotional goals to specific UX design choices
❌ Emotional principles too vague or not actionable
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-05-inspiration.md&#x60; to analyze UX patterns from inspiring products.

Remember: Do NOT proceed to step-05 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 5: UX Pattern Analysis &amp; Inspiration

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on analyzing existing UX patterns and extracting inspiration
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating inspiration analysis content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper pattern insights
- **P ( Party Mode)**: Bring multiple perspectives to analyze UX patterns
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Emotional response goals from step 4 inform pattern analysis
- No additional data files needed for this step
- Focus on analyzing existing UX patterns and extracting lessons

## YOUR TASK:

Analyze inspiring products and UX patterns to inform design decisions for the current project.

## INSPIRATION ANALYSIS SEQUENCE:

### 1. Identify User&#x27;s Favorite Apps

Start by gathering inspiration sources:
&quot;Let&#x27;s learn from products your users already love and use regularly.

**Inspiration Questions:**

- Name 2-3 apps your target users already love and USE frequently
- For each one, what do they do well from a UX perspective?
- What makes the experience compelling or delightful?
- What keeps users coming back to these apps?

Think about apps in your category or even unrelated products that have great UX.&quot;

### 2. Analyze UX Patterns and Principles

Break down what makes these apps successful:
&quot;For each inspiring app, let&#x27;s analyze their UX success:

**For [App Name]:**

- What core problem does it solve elegantly?
- What makes the onboarding experience effective?
- How do they handle navigation and information hierarchy?
- What are their most innovative or delightful interactions?
- What visual design choices support the user experience?
- How do they handle errors or edge cases?&quot;

### 3. Extract Transferable Patterns

Identify patterns that could apply to your project:
&quot;**Transferable UX Patterns:**
Looking across these inspiring apps, I see patterns we could adapt:

**Navigation Patterns:**

- [Pattern 1] - could work for your [specific use case]
- [Pattern 2] - might solve your [specific challenge]

**Interaction Patterns:**

- [Pattern 1] - excellent for [your user goal]
- [Pattern 2] - addresses [your user pain point]

**Visual Patterns:**

- [Pattern 1] - supports your [emotional goal]
- [Pattern 2] - aligns with your [platform requirements]

Which of these patterns resonate most for your product?&quot;

### 4. Identify Anti-Patterns to Avoid

Surface what not to do based on analysis:
&quot;**UX Anti-Patterns to Avoid:**
From analyzing both successes and failures in your space, here are patterns to avoid:

- [Anti-pattern 1] - users find this confusing/frustrating
- [Anti-pattern 2] - this creates unnecessary friction
- [Anti-pattern 3] - doesn&#x27;t align with your [emotional goals]

Learning from others&#x27; mistakes is as important as learning from their successes.&quot;

### 5. Define Design Inspiration Strategy

Create a clear strategy for using this inspiration:
&quot;**Design Inspiration Strategy:**

**What to Adopt:**

- [Specific pattern] - because it supports [your core experience]
- [Specific pattern] - because it aligns with [user needs]

**What to Adapt:**

- [Specific pattern] - modify for [your unique requirements]
- [Specific pattern] - simplify for [your user skill level]

**What to Avoid:**

- [Specific anti-pattern] - conflicts with [your goals]
- [Specific anti-pattern] - doesn&#x27;t fit [your platform]

This strategy will guide our design decisions while keeping {{project_name}} unique.&quot;

### 6. Generate Inspiration Analysis Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## UX Pattern Analysis &amp; Inspiration

### Inspiring Products Analysis

[Analysis of inspiring products based on conversation]

### Transferable UX Patterns

[Transferable patterns identified based on conversation]

### Anti-Patterns to Avoid

[Anti-patterns to avoid based on conversation]

### Design Inspiration Strategy

[Strategy for using inspiration based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated inspiration analysis content and present choices:
&quot;I&#x27;ve analyzed inspiring UX patterns and products to inform our design strategy for {{project_name}}. This gives us a solid foundation of proven patterns to build upon.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s deepen our UX pattern analysis
[P] Party Mode - Bring different perspectives on inspiration sources
[C] Continue - Save this to the document and move to design system choice&quot;

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current inspiration analysis content
- Process the enhanced pattern insights that come back
- Ask user: &quot;Accept these improvements to the inspiration analysis? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current inspiration analysis
- Process the collaborative pattern insights that come back
- Ask user: &quot;Accept these changes to the inspiration analysis? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Read fully and follow: &#x60;./step-06-design-system.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Inspiring products identified and analyzed thoroughly
✅ UX patterns extracted and categorized effectively
✅ Transferable patterns identified for current project
✅ Anti-patterns identified to avoid common mistakes
✅ Clear design inspiration strategy established
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not getting specific examples of inspiring products
❌ Surface-level analysis without deep pattern extraction
❌ Missing opportunities for pattern adaptation
❌ Not identifying relevant anti-patterns to avoid
❌ Strategy too generic or not actionable
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-06-design-system.md&#x60; to choose the appropriate design system approach.

Remember: Do NOT proceed to step-06 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 6: Design System Choice

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on choosing appropriate design system approach
- 🎯 COLLABORATIVE decision-making, not recommendation-only
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating design system decision content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper design system insights
- **P (Party Mode)**: Bring multiple perspectives to evaluate design system options
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Platform requirements from step 3 inform design system choice
- Inspiration patterns from step 5 guide design system selection
- Focus on choosing foundation for consistent design

## YOUR TASK:

Choose appropriate design system approach based on project requirements and constraints.

## DESIGN SYSTEM CHOICE SEQUENCE:

### 1. Present Design System Options

Educate about design system approaches:
&quot;For {{project_name}}, we need to choose a design system foundation. Think of design systems like LEGO blocks for UI - they provide proven components and patterns, ensuring consistency and speeding development.

**Design System Approaches:**

**1. Custom Design System**

- Complete visual uniqueness
- Full control over every component
- Higher initial investment
- Perfect for established brands with unique needs

**2. Established System (Material Design, Ant Design, etc.)**

- Fast development with proven patterns
- Great defaults and accessibility built-in
- Less visual differentiation
- Ideal for startups or internal tools

**3. Themeable System (MUI, Chakra UI, Tailwind UI)**

- Customizable with strong foundation
- Brand flexibility with proven components
- Moderate learning curve
- Good balance of speed and uniqueness

Which direction feels right for your project?&quot;

### 2. Analyze Project Requirements

Guide decision based on project context:
&quot;**Let&#x27;s consider your specific needs:**

**Based on our previous conversations:**

- Platform: [platform from step 3]
- Timeline: [inferred from user conversation]
- Team Size: [inferred from user conversation]
- Brand Requirements: [inferred from user conversation]
- Technical Constraints: [inferred from user conversation]

**Decision Factors:**

- Need for speed vs. need for uniqueness
- Brand guidelines or existing visual identity
- Team&#x27;s design expertise
- Long-term maintenance considerations
- Integration requirements with existing systems&quot;

### 3. Explore Specific Design System Options

Dive deeper into relevant options:
&quot;**Recommended Options Based on Your Needs:**

**For [Your Platform Type]:**

- [Option 1] - [Key benefit] - [Best for scenario]
- [Option 2] - [Key benefit] - [Best for scenario]
- [Option 3] - [Key benefit] - [Best for scenario]

**Considerations:**

- Component library size and quality
- Documentation and community support
- Customization capabilities
- Accessibility compliance
- Performance characteristics
- Learning curve for your team&quot;

### 4. Facilitate Decision Process

Help user make informed choice:
&quot;**Decision Framework:**

1. What&#x27;s most important: Speed, uniqueness, or balance?
2. How much design expertise does your team have?
3. Are there existing brand guidelines to follow?
4. What&#x27;s your timeline and budget?
5. Long-term maintenance needs?

Let&#x27;s evaluate options based on your answers to these questions.&quot;

### 5. Finalize Design System Choice

Confirm and document the decision:
&quot;Based on our analysis, I recommend [Design System Choice] for {{project_name}}.

**Rationale:**

- [Reason 1 based on project needs]
- [Reason 2 based on constraints]
- [Reason 3 based on team considerations]

**Next Steps:**

- We&#x27;ll customize this system to match your brand and needs
- Define component strategy for custom components needed
- Establish design tokens and patterns

Does this design system choice feel right to you?&quot;

### 6. Generate Design System Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Design System Foundation

### 1.1 Design System Choice

[Design system choice based on conversation]

### Rationale for Selection

[Rationale for design system selection based on conversation]

### Implementation Approach

[Implementation approach based on chosen system]

### Customization Strategy

[Customization strategy based on project needs]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated design system content and present choices:
&quot;I&#x27;ve documented our design system choice for {{project_name}}. This foundation will ensure consistency and speed up development.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our design system decision
[P] Party Mode - Bring technical perspectives on design systems
[C] Continue - Save this to the document and move to defining experience

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current design system content
- Process the enhanced design system insights that come back
- Ask user: &quot;Accept these improvements to the design system decision? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current design system choice
- Process the collaborative design system insights that come back
- Ask user: &quot;Accept these changes to the design system decision? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-07-defining-experience.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Design system options clearly presented and explained
✅ Decision framework applied to project requirements
✅ Specific design system chosen with clear rationale
✅ Implementation approach planned
✅ Customization strategy defined
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not explaining design system concepts clearly
❌ Rushing to recommendation without understanding requirements
❌ Not considering technical constraints or team capabilities
❌ Choosing design system without clear rationale
❌ Not planning implementation approach
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-07-defining-experience.md&#x60; to define the core user interaction.

Remember: Do NOT proceed to step-07 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 7: Defining Core Experience

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on defining the core interaction that defines the product
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating defining experience content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper experience insights
- **P (Party Mode)**: Bring multiple perspectives to define optimal core experience
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Core experience from step 3 provides foundation
- Design system choice from step 6 informs implementation
- Focus on the defining interaction that makes the product special

## YOUR TASK:

Define the core interaction that, if nailed, makes everything else follow in the user experience.

## DEFINING EXPERIENCE SEQUENCE:

### 1. Identify the Defining Experience

Focus on the core interaction:
&quot;Every successful product has a defining experience - the core interaction that, if we nail it, everything else follows.

**Think about these famous examples:**

- Tinder: &quot;Swipe to match with people&quot;
- Snapchat: &quot;Share photos that disappear&quot;
- Instagram: &quot;Share perfect moments with filters&quot;
- Spotify: &quot;Discover and play any song instantly&quot;

**For {{project_name}}:**
What&#x27;s the core action that users will describe to their friends?
What&#x27;s the interaction that makes users feel successful?
If we get ONE thing perfectly right, what should it be?&quot;

### 2. Explore the User&#x27;s Mental Model

Understand how users think about the core task:
&quot;**User Mental Model Questions:**

- How do users currently solve this problem?
- What mental model do they bring to this task?
- What&#x27;s their expectation for how this should work?
- Where are they likely to get confused or frustrated?

**Current Solutions:**

- What do users love/hate about existing approaches?
- What shortcuts or workarounds do they use?
- What makes existing solutions feel magical or terrible?&quot;

### 3. Define Success Criteria for Core Experience

Establish what makes the core interaction successful:
&quot;**Core Experience Success Criteria:**

- What makes users say &#x27;this just works&#x27;?
- When do they feel smart or accomplished?
- What feedback tells them they&#x27;re doing it right?
- How fast should it feel?
- What should happen automatically?

**Success Indicators:**

- [Success indicator 1]
- [Success indicator 2]
- [Success indicator 3]&quot;

### 4. Identify Novel vs. Established Patterns

Determine if we need to innovate or can use proven patterns:
&quot;**Pattern Analysis:**
Looking at your core experience, does this:

- Use established UX patterns that users already understand?
- Require novel interaction design that needs user education?
- Combine familiar patterns in innovative ways?

**If Novel:**

- What makes this different from existing approaches?
- How will we teach users this new pattern?
- What familiar metaphors can we use?

**If Established:**

- Which proven patterns should we adopt?
- How can we innovate within familiar patterns?
- What&#x27;s our unique twist on established interactions?&quot;

### 5. Define Experience Mechanics

Break down the core interaction into details:
&quot;**Core Experience Mechanics:**
Let&#x27;s design the step-by-step flow for [defining experience]:

**1. Initiation:**

- How does the user start this action?
- What triggers or invites them to begin?

**2. Interaction:**

- What does the user actually do?
- What controls or inputs do they use?
- How does the system respond?

**3. Feedback:**

- What tells users they&#x27;re succeeding?
- How do they know when it&#x27;s working?
- What happens if they make a mistake?

**4. Completion:**

- How do users know they&#x27;re done?
- What&#x27;s the successful outcome?
- What&#x27;s next?&quot;

### 6. Generate Defining Experience Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## 2. Core User Experience

### 2.1 Defining Experience

[Defining experience description based on conversation]

### 2.2 User Mental Model

[User mental model analysis based on conversation]

### 2.3 Success Criteria

[Success criteria for core experience based on conversation]

### 2.4 Novel UX Patterns

[Novel UX patterns analysis based on conversation]

### 2.5 Experience Mechanics

[Detailed mechanics for core experience based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated defining experience content and present choices:
&quot;I&#x27;ve defined the core experience for {{project_name}} - the interaction that will make users love this product.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine the core experience definition
[P] Party Mode - Bring different perspectives on the defining interaction
[C] Continue - Save this to the document and move to visual foundation

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current defining experience content
- Process the enhanced experience insights that come back
- Ask user: &quot;Accept these improvements to the defining experience? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current defining experience
- Process the collaborative experience insights that come back
- Ask user: &quot;Accept these changes to the defining experience? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-08-visual-foundation.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Defining experience clearly articulated
✅ User mental model thoroughly analyzed
✅ Success criteria established for core interaction
✅ Novel vs. established patterns properly evaluated
✅ Experience mechanics designed in detail
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not identifying the true core interaction
❌ Missing user&#x27;s mental model and expectations
❌ Not establishing clear success criteria
❌ Not properly evaluating novel vs. established patterns
❌ Experience mechanics too vague or incomplete
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-08-visual-foundation.md&#x60; to establish visual design foundation.

Remember: Do NOT proceed to step-08 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 8: Visual Foundation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on establishing visual design foundation (colors, typography, spacing)
- 🎯 COLLABORATIVE discovery, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating visual foundation content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper visual insights
- **P (Party Mode)**: Bring multiple perspectives to define visual foundation
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Design system choice from step 6 provides component foundation
- Emotional response goals from step 4 inform visual decisions
- Focus on colors, typography, spacing, and layout foundation

## YOUR TASK:

Establish the visual design foundation including color themes, typography, and spacing systems.

## VISUAL FOUNDATION SEQUENCE:

### 1. Brand Guidelines Assessment

Check for existing brand requirements:
&quot;Do you have existing brand guidelines or a specific color palette I should follow? (y/n)

If yes, I&#x27;ll extract and document your brand colors and create semantic color mappings.
If no, I&#x27;ll generate theme options based on your project&#x27;s personality and emotional goals from our earlier discussion.&quot;

### 2. Generate Color Theme Options (If no brand guidelines)

Create visual exploration opportunities:
&quot;If no existing brand guidelines, I&#x27;ll create a color theme visualizer to help you explore options.

🎨 I can generate comprehensive HTML color theme visualizers with multiple theme options, complete UI examples, and the ability to see how colors work in real interface contexts.

This will help you make an informed decision about the visual direction for {{project_name}}.&quot;

### 3. Define Typography System

Establish the typographic foundation:
&quot;**Typography Questions:**

- What should the overall tone feel like? (Professional, friendly, modern, classic?)
- How much text content will users read? (Headings only? Long-form content?)
- Any accessibility requirements for font sizes or contrast?
- Any brand fonts we must use?

**Typography Strategy:**

- Choose primary and secondary typefaces
- Establish type scale (h1, h2, h3, body, etc.)
- Define line heights and spacing relationships
- Consider readability and accessibility&quot;

### 4. Establish Spacing and Layout Foundation

Define the structural foundation:
&quot;**Spacing and Layout Foundation:**

- How should the overall layout feel? (Dense and efficient? Airy and spacious?)
- What spacing unit should we use? (4px, 8px, 12px base?)
- How much white space should be between elements?
- Should we use a grid system? If so, what column structure?

**Layout Principles:**

- [Layout principle 1 based on product type]
- [Layout principle 2 based on user needs]
- [Layout principle 3 based on platform requirements]&quot;

### 5. Create Visual Foundation Strategy

Synthesize all visual decisions:
&quot;**Visual Foundation Strategy:**

**Color System:**

- [Color strategy based on brand guidelines or generated themes]
- Semantic color mapping (primary, secondary, success, warning, error, etc.)
- Accessibility compliance (contrast ratios)

**Typography System:**

- [Typography strategy based on content needs and tone]
- Type scale and hierarchy
- Font pairing rationale

**Spacing &amp; Layout:**

- [Spacing strategy based on content density and platform]
- Grid system approach
- Component spacing relationships

This foundation will ensure consistency across all our design decisions.&quot;

### 6. Generate Visual Foundation Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Visual Design Foundation

### Color System

[Color system strategy based on conversation]

### Typography System

[Typography system strategy based on conversation]

### Spacing &amp; Layout Foundation

[Spacing and layout foundation based on conversation]

### Accessibility Considerations

[Accessibility considerations based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated visual foundation content and present choices:
&quot;I&#x27;ve established the visual design foundation for {{project_name}}. This provides the building blocks for consistent, beautiful design.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our visual foundation
[P] Party Mode - Bring design perspectives on visual choices
[C] Continue - Save this to the document and move to design directions

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current visual foundation content
- Process the enhanced visual insights that come back
- Ask user: &quot;Accept these improvements to the visual foundation? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current visual foundation
- Process the collaborative visual insights that come back
- Ask user: &quot;Accept these changes to the visual foundation? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-09-design-directions.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Brand guidelines assessed and incorporated if available
✅ Color system established with accessibility consideration
✅ Typography system defined with appropriate hierarchy
✅ Spacing and layout foundation created
✅ Visual foundation strategy documented
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not checking for existing brand guidelines first
❌ Color palette not aligned with emotional goals
❌ Typography not suitable for content type or readability needs
❌ Spacing system not appropriate for content density
❌ Missing accessibility considerations
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-09-design-directions.md&#x60; to generate design direction mockups.

Remember: Do NOT proceed to step-09 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 9: Design Direction Mockups

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on generating and evaluating design direction variations
- 🎯 COLLABORATIVE exploration, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating design direction content
- 💾 Generate HTML visualizer for design directions
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper design insights
- **P (Party Mode)**: Bring multiple perspectives to evaluate design directions
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Visual foundation from step 8 provides design tokens
- Core experience from step 7 informs layout and interaction design
- Focus on exploring different visual design directions

## YOUR TASK:

Generate comprehensive design direction mockups showing different visual approaches for the product.

## DESIGN DIRECTIONS SEQUENCE:

### 1. Generate Design Direction Variations

Create diverse visual explorations:
&quot;I&#x27;ll generate 6-8 different design direction variations exploring:

- Different layout approaches and information hierarchy
- Various interaction patterns and visual weights
- Alternative color applications from our foundation
- Different density and spacing approaches
- Various navigation and component arrangements

Each mockup will show a complete vision for {{project_name}} with all our design decisions applied.&quot;

### 2. Create HTML Design Direction Showcase

Generate interactive visual exploration:
&quot;🎨 Design Direction Mockups Generated!

I&#x27;m creating a comprehensive HTML design direction showcase at &#x60;{planning_artifacts}/ux-design-directions.html&#x60;

**What you&#x27;ll see:**

- 6-8 full-screen mockup variations
- Interactive states and hover effects
- Side-by-side comparison tools
- Complete UI examples with real content
- Responsive behavior demonstrations

Each mockup represents a complete visual direction for your app&#x27;s look and feel.&quot;

### 3. Present Design Exploration Framework

Guide evaluation criteria:
&quot;As you explore the design directions, look for:

✅ **Layout Intuitiveness** - Which information hierarchy matches your priorities?
✅ **Interaction Style** - Which interaction style fits your core experience?
✅ **Visual Weight** - Which visual density feels right for your brand?
✅ **Navigation Approach** - Which navigation pattern matches user expectations?
✅ **Component Usage** - How well do the components support your user journeys?
✅ **Brand Alignment** - Which direction best supports your emotional goals?

Take your time exploring - this is a crucial decision that will guide all our design work!&quot;

### 4. Facilitate Design Direction Selection

Help user choose or combine elements:
&quot;After exploring all the design directions:

**Which approach resonates most with you?**

- Pick a favorite direction as-is
- Combine elements from multiple directions
- Request modifications to any direction
- Use one direction as a base and iterate

**Tell me:**

- Which layout feels most intuitive for your users?
- Which visual weight matches your brand personality?
- Which interaction style supports your core experience?
- Are there elements from different directions you&#x27;d like to combine?&quot;

### 5. Document Design Direction Decision

Capture the chosen approach:
&quot;Based on your exploration, I&#x27;m understanding your design direction preference:

**Chosen Direction:** [Direction number or combination]
**Key Elements:** [Specific elements you liked]
**Modifications Needed:** [Any changes requested]
**Rationale:** [Why this direction works for your product]

This will become our design foundation moving forward. Are we ready to lock this in, or do you want to explore variations?&quot;

### 6. Generate Design Direction Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Design Direction Decision

### Design Directions Explored

[Summary of design directions explored based on conversation]

### Chosen Direction

[Chosen design direction based on conversation]

### Design Rationale

[Rationale for design direction choice based on conversation]

### Implementation Approach

[Implementation approach based on chosen direction]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated design direction content and present choices:
&quot;I&#x27;ve documented our design direction decision for {{project_name}}. This visual approach will guide all our detailed design work.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our design direction
[P] Party Mode - Bring different perspectives on visual choices
[C] Continue - Save this to the document and move to user journey flows

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current design direction content
- Process the enhanced design insights that come back
- Ask user: &quot;Accept these improvements to the design direction? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current design direction
- Process the collaborative design insights that come back
- Ask user: &quot;Accept these changes to the design direction? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-10-user-journeys.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Multiple design direction variations generated
✅ HTML showcase created with interactive elements
✅ Design evaluation criteria clearly established
✅ User able to explore and compare directions effectively
✅ Design direction decision made with clear rationale
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not creating enough variation in design directions
❌ Design directions not aligned with established foundation
❌ Missing interactive elements in HTML showcase
❌ Not providing clear evaluation criteria
❌ Rushing decision without thorough exploration
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-10-user-journeys.md&#x60; to design user journey flows.

Remember: Do NOT proceed to step-10 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 10: User Journey Flows

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on designing user flows and journey interactions
- 🎯 COLLABORATIVE flow design, not assumption-based layouts
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating user journey content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper journey insights
- **P (Party Mode)**: Bring multiple perspectives to design user flows
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Design direction from step 9 informs flow layout and visual design
- Core experience from step 7 defines key journey interactions
- Focus on designing detailed user flows with Mermaid diagrams

## YOUR TASK:

Design detailed user journey flows for critical user interactions.

## USER JOURNEY FLOWS SEQUENCE:

### 1. Load PRD User Journeys as Foundation

Start with user journeys already defined in the PRD:
&quot;Great! Since we have the PRD available, let&#x27;s build on the user journeys already documented there.

**Existing User Journeys from PRD:**
I&#x27;ve already loaded these user journeys from your PRD:
[Journey narratives from PRD input documents]

These journeys tell us **who** users are and **why** they take certain actions. Now we need to design **how** those journeys work in detail.

**Critical Journeys to Design Flows For:**
Looking at the PRD journeys, I need to design detailed interaction flows for:

- [Critical journey 1 identified from PRD narratives]
- [Critical journey 2 identified from PRD narratives]
- [Critical journey 3 identified from PRD narratives]

The PRD gave us the stories - now we design the mechanics!&quot;

### 2. Design Each Journey Flow

For each critical journey, design detailed flow:

**For [Journey Name]:**
&quot;Let&#x27;s design the flow for users accomplishing [journey goal].

**Flow Design Questions:**

- How do users start this journey? (entry point)
- What information do they need at each step?
- What decisions do they need to make?
- How do they know they&#x27;re progressing successfully?
- What does success look like for this journey?
- Where might they get confused or stuck?
- How do they recover from errors?&quot;

### 3. Create Flow Diagrams

Visualize each journey with Mermaid diagrams:
&quot;I&#x27;ll create detailed flow diagrams for each journey showing:

**[Journey Name] Flow:**

- Entry points and triggers
- Decision points and branches
- Success and failure paths
- Error recovery mechanisms
- Progressive disclosure of information

Each diagram will map the complete user experience from start to finish.&quot;

### 4. Optimize for Efficiency and Delight

Refine flows for optimal user experience:
&quot;**Flow Optimization:**
For each journey, let&#x27;s ensure we&#x27;re:

- Minimizing steps to value (getting users to success quickly)
- Reducing cognitive load at each decision point
- Providing clear feedback and progress indicators
- Creating moments of delight or accomplishment
- Handling edge cases and error recovery gracefully

**Specific Optimizations:**

- [Optimization 1 for journey efficiency]
- [Optimization 2 for user delight]
- [Optimization 3 for error handling]&quot;

### 5. Document Journey Patterns

Extract reusable patterns across journeys:
&quot;**Journey Patterns:**
Across these flows, I&#x27;m seeing some common patterns we can standardize:

**Navigation Patterns:**

- [Navigation pattern 1]
- [Navigation pattern 2]

**Decision Patterns:**

- [Decision pattern 1]
- [Decision pattern 2]

**Feedback Patterns:**

- [Feedback pattern 1]
- [Feedback pattern 2]

These patterns will ensure consistency across all user experiences.&quot;

### 6. Generate User Journey Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## User Journey Flows

### [Journey 1 Name]

[Journey 1 description and Mermaid diagram]

### [Journey 2 Name]

[Journey 2 description and Mermaid diagram]

### Journey Patterns

[Journey patterns identified based on conversation]

### Flow Optimization Principles

[Flow optimization principles based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated user journey content and present choices:
&quot;I&#x27;ve designed detailed user journey flows for {{project_name}}. These flows will guide the detailed design of each user interaction.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our user journey designs
[P] Party Mode - Bring different perspectives on user flows
[C] Continue - Save this to the document and move to component strategy

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current user journey content
- Process the enhanced journey insights that come back
- Ask user: &quot;Accept these improvements to the user journeys? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current user journeys
- Process the collaborative journey insights that come back
- Ask user: &quot;Accept these changes to the user journeys? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-11-component-strategy.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Critical user journeys identified and designed
✅ Detailed flow diagrams created for each journey
✅ Flows optimized for efficiency and user delight
✅ Common journey patterns extracted and documented
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not identifying all critical user journeys
❌ Flows too complex or not optimized for user success
❌ Missing error recovery paths
❌ Not extracting reusable patterns across journeys
❌ Flow diagrams unclear or incomplete
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-11-component-strategy.md&#x60; to define component library strategy.

Remember: Do NOT proceed to step-11 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 11: Component Strategy

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on defining component library strategy and custom components
- 🎯 COLLABORATIVE component planning, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating component strategy content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper component insights
- **P (Party Mode)**: Bring multiple perspectives to define component strategy
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Design system choice from step 6 determines available components
- User journeys from step 10 identify component needs
- Focus on defining custom components and implementation strategy

## YOUR TASK:

Define component library strategy and design custom components not covered by the design system.

## COMPONENT STRATEGY SEQUENCE:

### 1. Analyze Design System Coverage

Review what components are available vs. needed:
&quot;Based on our chosen design system [design system from step 6], let&#x27;s identify what components are already available and what we need to create custom.

**Available from Design System:**
[List of components available in chosen design system]

**Components Needed for {{project_name}}:**
Looking at our user journeys and design direction, we need:

- [Component need 1 from journey analysis]
- [Component need 2 from design requirements]
- [Component need 3 from core experience]

**Gap Analysis:**

- [Gap 1 - needed but not available]
- [Gap 2 - needed but not available]&quot;

### 2. Design Custom Components

For each custom component needed, design thoroughly:

**For each custom component:**
&quot;**[Component Name] Design:**

**Purpose:** What does this component do for users?
**Content:** What information or data does it display?
**Actions:** What can users do with this component?
**States:** What different states does it have? (default, hover, active, disabled, error, etc.)
**Variants:** Are there different sizes or styles needed?
**Accessibility:** What ARIA labels and keyboard support needed?

Let&#x27;s walk through each custom component systematically.&quot;

### 3. Document Component Specifications

Create detailed specifications for each component:

**Component Specification Template:**

&#x60;&#x60;&#x60;markdown
### [Component Name]

**Purpose:** [Clear purpose statement]
**Usage:** [When and how to use]
**Anatomy:** [Visual breakdown of parts]
**States:** [All possible states with descriptions]
**Variants:** [Different sizes/styles if applicable]
**Accessibility:** [ARIA labels, keyboard navigation]
**Content Guidelines:** [What content works best]
**Interaction Behavior:** [How users interact]
&#x60;&#x60;&#x60;

### 4. Define Component Strategy

Establish overall component library approach:
&quot;**Component Strategy:**

**Foundation Components:** (from design system)

- [Foundation component 1]
- [Foundation component 2]

**Custom Components:** (designed in this step)

- [Custom component 1 with rationale]
- [Custom component 2 with rationale]

**Implementation Approach:**

- Build custom components using design system tokens
- Ensure consistency with established patterns
- Follow accessibility best practices
- Create reusable patterns for common use cases&quot;

### 5. Plan Implementation Roadmap

Define how and when to build components:
&quot;**Implementation Roadmap:**

**Phase 1 - Core Components:**

- [Component 1] - needed for [critical flow]
- [Component 2] - needed for [critical flow]

**Phase 2 - Supporting Components:**

- [Component 3] - enhances [user experience]
- [Component 4] - supports [design pattern]

**Phase 3 - Enhancement Components:**

- [Component 5] - optimizes [user journey]
- [Component 6] - adds [special feature]

This roadmap helps prioritize development based on user journey criticality.&quot;

### 6. Generate Component Strategy Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Component Strategy

### Design System Components

[Analysis of available design system components based on conversation]

### Custom Components

[Custom component specifications based on conversation]

### Component Implementation Strategy

[Component implementation strategy based on conversation]

### Implementation Roadmap

[Implementation roadmap based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated component strategy content and present choices:
&quot;I&#x27;ve defined the component strategy for {{project_name}}. This balances using proven design system components with custom components for your unique needs.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our component strategy
[P] Party Mode - Bring technical perspectives on component design
[C] Continue - Save this to the document and move to UX patterns

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current component strategy content
- Process the enhanced component insights that come back
- Ask user: &quot;Accept these improvements to the component strategy? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current component strategy
- Process the collaborative component insights that come back
- Ask user: &quot;Accept these changes to the component strategy? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-12-ux-patterns.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Design system coverage properly analyzed
✅ All custom components thoroughly specified
✅ Component strategy clearly defined
✅ Implementation roadmap prioritized by user need
✅ Accessibility considered for all components
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not analyzing design system coverage properly
❌ Custom components not thoroughly specified
❌ Missing accessibility considerations
❌ Component strategy not aligned with user journeys
❌ Implementation roadmap not prioritized effectively
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-12-ux-patterns.md&#x60; to define UX consistency patterns.

Remember: Do NOT proceed to step-12 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 12: UX Consistency Patterns

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on establishing consistency patterns for common UX situations
- 🎯 COLLABORATIVE pattern definition, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating UX patterns content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper pattern insights
- **P (Party Mode)**: Bring multiple perspectives to define UX patterns
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Component strategy from step 11 informs pattern decisions
- User journeys from step 10 identify common pattern needs
- Focus on consistency patterns for common UX situations

## YOUR TASK:

Establish UX consistency patterns for common situations like buttons, forms, navigation, and feedback.

## UX PATTERNS SEQUENCE:

### 1. Identify Pattern Categories

Determine which patterns need definition for your product:
&quot;Let&#x27;s establish consistency patterns for how {{project_name}} behaves in common situations.

**Pattern Categories to Define:**

- Button hierarchy and actions
- Feedback patterns (success, error, warning, info)
- Form patterns and validation
- Navigation patterns
- Modal and overlay patterns
- Empty states and loading states
- Search and filtering patterns

Which categories are most critical for your product? We can go through each thoroughly or focus on the most important ones.&quot;

### 2. Define Critical Patterns First

Focus on patterns most relevant to your product:

**For [Critical Pattern Category]:**
&quot;**[Pattern Type] Patterns:**
What should users see/do when they need to [pattern action]?

**Considerations:**

- Visual hierarchy (primary vs. secondary actions)
- Feedback mechanisms
- Error recovery
- Accessibility requirements
- Mobile vs. desktop considerations

**Examples:**

- [Example 1 for this pattern type]
- [Example 2 for this pattern type]

How should {{project_name}} handle [pattern type] interactions?&quot;

### 3. Establish Pattern Guidelines

Document specific design decisions:

**Pattern Guidelines Template:**

&#x60;&#x60;&#x60;markdown
### [Pattern Type]

**When to Use:** [Clear usage guidelines]
**Visual Design:** [How it should look]
**Behavior:** [How it should interact]
**Accessibility:** [A11y requirements]
**Mobile Considerations:** [Mobile-specific needs]
**Variants:** [Different states or styles if applicable]
&#x60;&#x60;&#x60;

### 4. Design System Integration

Ensure patterns work with chosen design system:
&quot;**Integration with [Design System]:**

- How do these patterns complement our design system components?
- What customizations are needed?
- How do we maintain consistency while meeting unique needs?

**Custom Pattern Rules:**

- [Custom rule 1]
- [Custom rule 2]
- [Custom rule 3]&quot;

### 5. Create Pattern Documentation

Generate comprehensive pattern library:

**Pattern Library Structure:**

- Clear usage guidelines for each pattern
- Visual examples and specifications
- Implementation notes for developers
- Accessibility checklists
- Mobile-first considerations

### 6. Generate UX Patterns Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## UX Consistency Patterns

### Button Hierarchy

[Button hierarchy patterns based on conversation]

### Feedback Patterns

[Feedback patterns based on conversation]

### Form Patterns

[Form patterns based on conversation]

### Navigation Patterns

[Navigation patterns based on conversation]

### Additional Patterns

[Additional patterns based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated UX patterns content and present choices:
&quot;I&#x27;ve established UX consistency patterns for {{project_name}}. These patterns ensure users have a consistent, predictable experience across all interactions.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our UX patterns
[P] Party Mode - Bring different perspectives on consistency patterns
[C] Continue - Save this to the document and move to responsive design

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current UX patterns content
- Process the enhanced pattern insights that come back
- Ask user: &quot;Accept these improvements to the UX patterns? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current UX patterns
- Process the collaborative pattern insights that come back
- Ask user: &quot;Accept these changes to the UX patterns? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-13-responsive-accessibility.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Critical pattern categories identified and prioritized
✅ Consistency patterns clearly defined and documented
✅ Patterns integrated with chosen design system
✅ Accessibility considerations included for all patterns
✅ Mobile-first approach incorporated
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not identifying the most critical pattern categories
❌ Patterns too generic or not actionable
❌ Missing accessibility considerations
❌ Patterns not aligned with design system
❌ Not considering mobile differences
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-13-responsive-accessibility.md&#x60; to define responsive design and accessibility strategy.

Remember: Do NOT proceed to step-13 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 13: Responsive Design &amp; Accessibility

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between UX facilitator and stakeholder
- 📋 YOU ARE A UX FACILITATOR, not a content generator
- 💬 FOCUS on responsive design strategy and accessibility compliance
- 🎯 COLLABORATIVE strategy definition, not assumption-based design
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating responsive/accessibility content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted.
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper responsive/accessibility insights
- **P (Party Mode)**: Bring multiple perspectives to define responsive/accessibility strategy
- **C (Continue)**: Save the content to the document and proceed to final step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to this step&#x27;s A/P/C menu
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from previous steps are available
- Platform requirements from step 3 inform responsive design
- Design direction from step 9 influences responsive layout choices
- Focus on cross-device adaptation and accessibility compliance

## YOUR TASK:

Define responsive design strategy and accessibility requirements for the product.

## RESPONSIVE &amp; ACCESSIBILITY SEQUENCE:

### 1. Define Responsive Strategy

Establish how the design adapts across devices:
&quot;Let&#x27;s define how {{project_name}} adapts across different screen sizes and devices.

**Responsive Design Questions:**

**Desktop Strategy:**

- How should we use extra screen real estate?
- Multi-column layouts, side navigation, or content density?
- What desktop-specific features can we include?

**Tablet Strategy:**

- Should we use simplified layouts or touch-optimized interfaces?
- How do gestures and touch interactions work on tablets?
- What&#x27;s the optimal information density for tablet screens?

**Mobile Strategy:**

- Bottom navigation or hamburger menu?
- How do layouts collapse on small screens?
- What&#x27;s the most critical information to show mobile-first?&quot;

### 2. Establish Breakpoint Strategy

Define when and how layouts change:
&quot;**Breakpoint Strategy:**
We need to define screen size breakpoints where layouts adapt.

**Common Breakpoints:**

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**For {{project_name}}, should we:**

- Use standard breakpoints or custom ones?
- Focus on mobile-first or desktop-first design?
- Have specific breakpoints for your key use cases?&quot;

### 3. Design Accessibility Strategy

Define accessibility requirements and compliance level:
&quot;**Accessibility Strategy:**
What level of WCAG compliance does {{project_name}} need?

**WCAG Levels:**

- **Level A (Basic)** - Essential accessibility for legal compliance
- **Level AA (Recommended)** - Industry standard for good UX
- **Level AAA (Highest)** - Exceptional accessibility (rarely needed)

**Based on your product:**

- [Recommendation based on user base, legal requirements, etc.]

**Key Accessibility Considerations:**

- Color contrast ratios (4.5:1 for normal text)
- Keyboard navigation support
- Screen reader compatibility
- Touch target sizes (minimum 44x44px)
- Focus indicators and skip links&quot;

### 4. Define Testing Strategy

Plan how to ensure responsive design and accessibility:
&quot;**Testing Strategy:**

**Responsive Testing:**

- Device testing on actual phones/tablets
- Browser testing across Chrome, Firefox, Safari, Edge
- Real device network performance testing

**Accessibility Testing:**

- Automated accessibility testing tools
- Screen reader testing (VoiceOver, NVDA, JAWS)
- Keyboard-only navigation testing
- Color blindness simulation testing

**User Testing:**

- Include users with disabilities in testing
- Test with diverse assistive technologies
- Validate with actual target devices&quot;

### 5. Document Implementation Guidelines

Create specific guidelines for developers:
&quot;**Implementation Guidelines:**

**Responsive Development:**

- Use relative units (rem, %, vw, vh) over fixed pixels
- Implement mobile-first media queries
- Test touch targets and gesture areas
- Optimize images and assets for different devices

**Accessibility Development:**

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation implementation
- Focus management and skip links
- High contrast mode support&quot;

### 6. Generate Responsive &amp; Accessibility Content

Prepare the content to append to the document:

#### Content Structure:

When saving to document, append these Level 2 and Level 3 sections:

&#x60;&#x60;&#x60;markdown
## Responsive Design &amp; Accessibility

### Responsive Strategy

[Responsive strategy based on conversation]

### Breakpoint Strategy

[Breakpoint strategy based on conversation]

### Accessibility Strategy

[Accessibility strategy based on conversation]

### Testing Strategy

[Testing strategy based on conversation]

### Implementation Guidelines

[Implementation guidelines based on conversation]
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated responsive and accessibility content and present choices:
&quot;I&#x27;ve defined the responsive design and accessibility strategy for {{project_name}}. This ensures your product works beautifully across all devices and is accessible to all users.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s refine our responsive/accessibility strategy
[P] Party Mode - Bring different perspectives on inclusive design
[C] Continue - Save this to the document and complete the workflow

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current responsive/accessibility content
- Process the enhanced insights that come back
- Ask user: &quot;Accept these improvements to the responsive/accessibility strategy? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current responsive/accessibility strategy
- Process the collaborative insights that come back
- Ask user: &quot;Accept these changes to the responsive/accessibility strategy? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- Update frontmatter: append step to end of stepsCompleted array
- Load &#x60;./step-14-complete.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Responsive strategy clearly defined for all device types
✅ Appropriate breakpoint strategy established
✅ Accessibility requirements determined and documented
✅ Comprehensive testing strategy planned
✅ Implementation guidelines provided for development team
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not considering all device types and screen sizes
❌ Accessibility requirements not properly researched
❌ Testing strategy not comprehensive enough
❌ Implementation guidelines too generic or unclear
❌ Not addressing specific accessibility challenges for your product
❌ Not presenting A/P/C menu after content generation
❌ Appending content without user selecting &#x27;C&#x27;

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-14-complete.md&#x60; to finalize the UX design workflow.

Remember: Do NOT proceed to step-14 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 14: Workflow Completion

## MANDATORY EXECUTION RULES (READ FIRST):

- ✅ THIS IS A FINAL STEP - Workflow completion required

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- 🛑 NO content generation - this is a wrap-up step
- 📋 FINALIZE document and update workflow status
- 💬 FOCUS on completion, validation, and next steps
- 🎯 UPDATE workflow status files with completion information
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update the main workflow status file with completion information
- 📖 Suggest potential next workflow steps for the user
- 🚫 DO NOT load additional steps after this one

## TERMINATION STEP PROTOCOLS:

- This is a FINAL step - workflow completion required
- 📖 Update output file frontmatter, adding this step to the end of the list of stepsCompleted to indicate all is finished..
- Output completion summary and next step guidance
- Update the main workflow status file with finalized document
- Suggest potential next workflow steps for the user
- Mark workflow as complete in status tracking

## CONTEXT BOUNDARIES:

- Complete UX design specification is available from all previous steps
- Workflow frontmatter shows all completed steps
- All collaborative content has been generated and saved
- Focus on completion, validation, and next steps

## YOUR TASK:

Complete the UX design workflow, update status files, and suggest next steps for the project.

## WORKFLOW COMPLETION SEQUENCE:

### 1. Announce Workflow Completion

Inform user that the UX design is complete:
&quot;🎉 **UX Design Complete, {{user_name}}!**

I&#x27;ve successfully collaborated with you to create a comprehensive UX design specification for {{project_name}}.

**What we&#x27;ve accomplished:**

- ✅ Project understanding and user insights
- ✅ Core experience and emotional response definition
- ✅ UX pattern analysis and inspiration
- ✅ Design system choice and implementation strategy
- ✅ Core interaction definition and experience mechanics
- ✅ Visual design foundation (colors, typography, spacing)
- ✅ Design direction mockups and visual explorations
- ✅ User journey flows and interaction design
- ✅ Component strategy and custom component specifications
- ✅ UX consistency patterns for common interactions
- ✅ Responsive design and accessibility strategy

**The complete UX design specification is now available at:** &#x60;{planning_artifacts}/ux-design-specification.md&#x60;

**Supporting Visual Assets:**

- Color themes visualizer: &#x60;{planning_artifacts}/ux-color-themes.html&#x60;
- Design directions mockups: &#x60;{planning_artifacts}/ux-design-directions.html&#x60;

This specification is now ready to guide visual design, implementation, and development.&quot;

### 2. Workflow Status Update

Update the main workflow status file:

- Load &#x60;{status_file}&#x60; from workflow configuration (if exists)
- Update workflow_status[&quot;create-ux-design&quot;] &#x3D; &quot;{default_output_file}&quot;
- Save file, preserving all comments and structure
- Mark current timestamp as completion time

### 3. Suggest Next Steps

UX Design complete. Read fully and follow: &#x60;_bmad/core/tasks/bmad-help.md&#x60; with argument &#x60;Create UX&#x60;.

### 5. Final Completion Confirmation

Congratulate the user on the completion you both completed together of the UX.



## SUCCESS METRICS:

✅ UX design specification contains all required sections
✅ All collaborative content properly saved to document
✅ Workflow status file updated with completion information
✅ Clear next step guidance provided to user
✅ Document quality validation completed
✅ User acknowledges completion and understands next options

## FAILURE MODES:

❌ Not updating workflow status file with completion information
❌ Missing clear next step guidance for user
❌ Not confirming document completeness with user
❌ Workflow not properly marked as complete in status tracking
❌ User unclear about what happens next

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## WORKFLOW COMPLETION CHECKLIST:

### Design Specification Complete:

- [ ] Executive summary and project understanding
- [ ] Core experience and emotional response definition
- [ ] UX pattern analysis and inspiration
- [ ] Design system choice and strategy
- [ ] Core interaction mechanics definition
- [ ] Visual design foundation (colors, typography, spacing)
- [ ] Design direction decisions and mockups
- [ ] User journey flows and interaction design
- [ ] Component strategy and specifications
- [ ] UX consistency patterns documentation
- [ ] Responsive design and accessibility strategy

### Process Complete:

- [ ] All steps completed with user confirmation
- [ ] All content saved to specification document
- [ ] Frontmatter properly updated with all steps
- [ ] Workflow status file updated with completion
- [ ] Next steps clearly communicated

## NEXT STEPS GUIDANCE:

**Immediate Options:**

1. **Wireframe Generation** - Create low-fidelity layouts based on UX spec
2. **Interactive Prototype** - Build clickable prototypes for testing
3. **Solution Architecture** - Technical design with UX context
4. **Figma Visual Design** - High-fidelity UI implementation
5. **Epic Creation** - Break down UX requirements for development

**Recommended Sequence:**
For design-focused teams: Wireframes → Prototypes → Figma Design → Development
For technical teams: Architecture → Epic Creation → Development

Consider team capacity, timeline, and whether user validation is needed before implementation.

## WORKFLOW FINALIZATION:

- Set &#x60;lastStep &#x3D; 14&#x60; in document frontmatter
- Update workflow status file with completion timestamp
- Provide completion summary to user
- Do NOT load any additional steps

## FINAL REMINDER:

This UX design workflow is now complete. The specification serves as the foundation for all visual and development work. All design decisions, patterns, and requirements are documented to ensure consistent, accessible, and user-centered implementation.

**Congratulations on completing the UX Design Specification for {{project_name}}!** 🎉

**Core Deliverables:**

- ✅ UX Design Specification: &#x60;{planning_artifacts}/ux-design-specification.md&#x60;
- ✅ Color Themes Visualizer: &#x60;{planning_artifacts}/ux-color-themes.html&#x60;
- ✅ Design Directions: &#x60;{planning_artifacts}/ux-design-directions.html&#x60;


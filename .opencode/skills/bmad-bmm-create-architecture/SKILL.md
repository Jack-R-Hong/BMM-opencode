---
name: bmad-bmm-create-architecture
description: "Collaborative architectural decision facilitation for AI-agent consistency. Replaces template-driven architecture with intelligent, adaptive conversation that produces a decision-focused architecture document optimized for preventing agent conflicts."
---

# Architecture Workflow

**Goal:** Create comprehensive architecture decisions through collaborative step-by-step discovery that ensures AI agents implement consistently.

**Your Role:** You are an architectural facilitator collaborating with a peer. This is a partnership, not a client-vendor relationship. You bring structured thinking and architectural knowledge, while the user brings domain expertise and product vision. Work together as equals to make decisions that prevent implementation conflicts.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve and indicate continuation.

---

## INITIALIZATION

### Configuration Loading

Load config from &#x60;{project-root}/_bmad/bmm/config.yaml&#x60; and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;
- &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;date&#x60; as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Paths

- &#x60;installed_path&#x60; &#x3D; &#x60;{project-root}/_bmad/bmm/workflows/3-solutioning/architecture&#x60;
- &#x60;template_path&#x60; &#x3D; &#x60;{installed_path}/architecture-decision-template.md&#x60;
- &#x60;data_files_path&#x60; &#x3D; &#x60;{installed_path}/data/&#x60;

---

## EXECUTION

Read fully and follow: &#x60;steps/step-01-init.md&#x60; to begin the workflow.

**Note:** Input document discovery and all initialization protocols are handled in step-01-init.md.

# Step 1: Architecture Workflow Initialization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on initialization and setup only - don&#x27;t look ahead to future steps
- 🚪 DETECT existing workflow state and handle continuation properly
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
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

Initialize the Architecture workflow by detecting continuation state, discovering input documents, and setting up the document for collaborative architectural decision making.

## INITIALIZATION SEQUENCE:

### 1. Check for Existing Workflow

First, check if the output document already exists:

- Look for existing {planning_artifacts}/&#x60;*architecture*.md&#x60;
- If exists, read the complete file(s) including frontmatter
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
- Product Requirements Document (&#x60;*prd*.md&#x60;)
- UX Design (&#x60;*ux-design*.md&#x60;) and other
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

#### B. Validate Required Inputs

Before proceeding, verify we have the essential inputs:

**PRD Validation:**

- If no PRD found: &quot;Architecture requires a PRD to work from. Please run the PRD workflow first or provide the PRD file path.&quot;
- Do NOT proceed without PRD

**Other Input that might exist:**

- UX Spec: &quot;Provides UI/UX architectural requirements&quot;

#### C. Create Initial Document

Copy the template from &#x60;{installed_path}/architecture-decision-template.md&#x60; to &#x60;{planning_artifacts}/architecture.md&#x60;

#### D. Complete Initialization and Report

Complete setup and report to user:

**Document Setup:**

- Created: &#x60;{planning_artifacts}/architecture.md&#x60; from template
- Initialized frontmatter with workflow state

**Input Documents Discovered:**
Report what was found:
&quot;Welcome {{user_name}}! I&#x27;ve set up your Architecture workspace for {{project_name}}.

**Documents Found:**

- PRD: {number of PRD files loaded or &quot;None found - REQUIRED&quot;}
- UX Design: {number of UX files loaded or &quot;None found&quot;}
- Research: {number of research files loaded or &quot;None found&quot;}
- Project docs: {number of project files loaded or &quot;None found&quot;}
- Project context: {project_context_rules count of rules for AI agents found}

**Files loaded:** {list of specific file names or &quot;No additional documents found&quot;}

Ready to begin architectural decision making. Do you have any other documents you&#x27;d like me to include?

[C] Continue to project context analysis

## SUCCESS METRICS:

✅ Existing workflow detected and handed off to step-01b correctly
✅ Fresh workflow initialized with template and frontmatter
✅ Input documents discovered and loaded using sharded-first logic
✅ All discovered files tracked in frontmatter &#x60;inputDocuments&#x60;
✅ PRD requirement validated and communicated
✅ User confirmed document setup and can proceed

## FAILURE MODES:

❌ Proceeding with fresh initialization when existing workflow exists
❌ Not updating frontmatter with discovered input documents
❌ Creating document without proper template
❌ Not checking sharded folders first before whole files
❌ Not reporting what documents were found to user
❌ Proceeding without validating PRD requirement

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects [C] to continue, only after ensuring all the template output has been created, then load &#x60;./step-02-context.md&#x60; to analyze the project context and begin architectural decision making.

Remember: Do NOT proceed to step-02 until user explicitly selects [C] from the menu and setup is confirmed!


# Step 1b: Workflow Continuation Handler

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on understanding current state and getting user confirmation
- 🚪 HANDLE workflow resumption smoothly and transparently
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 📖 Read existing document completely to understand current state
- 💾 Update frontmatter to reflect continuation
- 🚫 FORBIDDEN to proceed to next step without user confirmation

## CONTEXT BOUNDARIES:

- Existing document and frontmatter are available
- Input documents already loaded should be in frontmatter &#x60;inputDocuments&#x60;
- Steps already completed are in &#x60;stepsCompleted&#x60; array
- Focus on understanding where we left off

## YOUR TASK:

Handle workflow continuation by analyzing existing work and guiding the user to resume at the appropriate step.

## CONTINUATION SEQUENCE:

### 1. Analyze Current Document State

Read the existing architecture document completely and analyze:

**Frontmatter Analysis:**

- &#x60;stepsCompleted&#x60;: What steps have been done
- &#x60;inputDocuments&#x60;: What documents were loaded
- &#x60;lastStep&#x60;: Last step that was executed
- &#x60;project_name&#x60;, &#x60;user_name&#x60;, &#x60;date&#x60;: Basic context

**Content Analysis:**

- What sections exist in the document
- What architectural decisions have been made
- What appears incomplete or in progress
- Any TODOs or placeholders remaining

### 2. Present Continuation Summary

Show the user their current progress:

&quot;Welcome back {{user_name}}! I found your Architecture work for {{project_name}}.

**Current Progress:**

- Steps completed: {{stepsCompleted list}}
- Last step worked on: Step {{lastStep}}
- Input documents loaded: {{number of inputDocuments}} files

**Document Sections Found:**
{list all H2/H3 sections found in the document}

{if_incomplete_sections}
**Incomplete Areas:**

- {areas that appear incomplete or have placeholders}
  {/if_incomplete_sections}

**What would you like to do?**
[R] Resume from where we left off
[C] Continue to next logical step
[O] Overview of all remaining steps
[X] Start over (will overwrite existing work)
&quot;

### 3. Handle User Choice

#### If &#x27;R&#x27; (Resume from where we left off):

- Identify the next step based on &#x60;stepsCompleted&#x60;
- Load the appropriate step file to continue
- Example: If &#x60;stepsCompleted: [1, 2, 3]&#x60;, load &#x60;step-04-decisions.md&#x60;

#### If &#x27;C&#x27; (Continue to next logical step):

- Analyze the document content to determine logical next step
- May need to review content quality and completeness
- If content seems complete for current step, advance to next
- If content seems incomplete, suggest staying on current step

#### If &#x27;O&#x27; (Overview of all remaining steps):

- Provide brief description of all remaining steps
- Let user choose which step to work on
- Don&#x27;t assume sequential progression is always best

#### If &#x27;X&#x27; (Start over):

- Confirm: &quot;This will delete all existing architectural decisions. Are you sure? (y/n)&quot;
- If confirmed: Delete existing document and return to step-01-init.md
- If not confirmed: Return to continuation menu

### 4. Navigate to Selected Step

After user makes choice:

**Load the selected step file:**

- Update frontmatter &#x60;lastStep&#x60; to reflect current navigation
- Execute the selected step file
- Let that step handle the detailed continuation logic

**State Preservation:**

- Maintain all existing content in the document
- Keep &#x60;stepsCompleted&#x60; accurate
- Track the resumption in workflow status

### 5. Special Continuation Cases

#### If &#x60;stepsCompleted&#x60; is empty but document has content:

- This suggests an interrupted workflow
- Ask user: &quot;I see the document has content but no steps are marked as complete. Should I analyze what&#x27;s here and set the appropriate step status?&quot;

#### If document appears corrupted or incomplete:

- Ask user: &quot;The document seems incomplete. Would you like me to try to recover what&#x27;s here, or would you prefer to start fresh?&quot;

#### If document is complete but workflow not marked as done:

- Ask user: &quot;The architecture looks complete! Should I mark this workflow as finished, or is there more you&#x27;d like to work on?&quot;

## SUCCESS METRICS:

✅ Existing document state properly analyzed and understood
✅ User presented with clear continuation options
✅ User choice handled appropriately and transparently
✅ Workflow state preserved and updated correctly
✅ Navigation to appropriate step handled smoothly

## FAILURE MODES:

❌ Not reading the complete existing document before making suggestions
❌ Losing track of what steps were actually completed
❌ Automatically proceeding without user confirmation of next steps
❌ Not checking for incomplete or placeholder content
❌ Losing existing document content during resumption

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects their continuation option, load the appropriate step file based on their choice. The step file will handle the detailed work from that point forward.

Remember: The goal is smooth, transparent resumption that respects the work already done while giving the user control over how to proceed.


# Step 2: Project Context Analysis

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on understanding project scope and requirements for architecture
- 🎯 ANALYZE loaded documents, don&#x27;t assume or generate requirements
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ⚠️ Present A/P/C menu after generating project context analysis
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop deeper insights about project context and architectural implications
- **P (Party Mode)**: Bring multiple perspectives to analyze project requirements from different architectural angles
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Current document and frontmatter from step 1 are available
- Input documents already loaded are in memory (PRD, epics, UX spec, etc.)
- Focus on architectural implications of requirements
- No technology decisions yet - pure analysis phase

## YOUR TASK:

Fully read and Analyze the loaded project documents to understand architectural scope, requirements, and constraints before beginning decision making.

## CONTEXT ANALYSIS SEQUENCE:

### 1. Review Project Requirements

**From PRD Analysis:**

- Extract and analyze Functional Requirements (FRs)
- Identify Non-Functional Requirements (NFRs) like performance, security, compliance
- Note any technical constraints or dependencies mentioned
- Count and categorize requirements to understand project scale

**From Epics/Stories (if available):**

- Map epic structure and user stories to architectural components
- Extract acceptance criteria for technical implications
- Identify cross-cutting concerns that span multiple epics
- Estimate story complexity for architectural planning

**From UX Design (if available):**

- Extract architectural implications from UX requirements:
  - Component complexity (simple forms vs rich interactions)
  - Animation/transition requirements
  - Real-time update needs (live data, collaborative features)
  - Platform-specific UI requirements
  - Accessibility standards (WCAG compliance level)
  - Responsive design breakpoints
  - Offline capability requirements
  - Performance expectations (load times, interaction responsiveness)

### 2. Project Scale Assessment

Calculate and present project complexity:

**Complexity Indicators:**

- Real-time features requirements
- Multi-tenancy needs
- Regulatory compliance requirements
- Integration complexity
- User interaction complexity
- Data complexity and volume

### 3. Reflect Understanding

Present your analysis back to user for validation:

&quot;I&#x27;m reviewing your project documentation for {{project_name}}.

{if_epics_loaded}I see {{epic_count}} epics with {{story_count}} total stories.{/if_epics_loaded}
{if_no_epics}I found {{fr_count}} functional requirements organized into {{fr_category_list}}.{/if_no_epics}
{if_ux_loaded}I also found your UX specification which defines the user experience requirements.{/if_ux_loaded}

**Key architectural aspects I notice:**

- [Summarize core functionality from FRs]
- [Note critical NFRs that will shape architecture]
- {if_ux_loaded}[Note UX complexity and technical requirements]{/if_ux_loaded}
- [Identify unique technical challenges or constraints]
- [Highlight any regulatory or compliance requirements]

**Scale indicators:**

- Project complexity appears to be: [low/medium/high/enterprise]
- Primary technical domain: [web/mobile/api/backend/full-stack/etc]
- Cross-cutting concerns identified: [list major ones]

This analysis will help me guide you through the architectural decisions needed to ensure AI agents implement this consistently.

Does this match your understanding of the project scope and requirements?&quot;

### 4. Generate Project Context Content

Prepare the content to append to the document:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
{{analysis of FRs and what they mean architecturally}}

**Non-Functional Requirements:**
{{NFRs that will drive architectural decisions}}

**Scale &amp; Complexity:**
{{project_scale_assessment}}

- Primary domain: {{technical_domain}}
- Complexity level: {{complexity_level}}
- Estimated architectural components: {{component_count}}

### Technical Constraints &amp; Dependencies

{{known_constraints_dependencies}}

### Cross-Cutting Concerns Identified

{{concerns_that_will_affect_multiple_components}}
&#x60;&#x60;&#x60;

### 5. Present Content and Menu

Show the generated content and present choices:

&quot;I&#x27;ve drafted the Project Context Analysis based on your requirements. This sets the foundation for our architectural decisions.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 4]

**What would you like to do?**
[A] Advanced Elicitation - Let&#x27;s dive deeper into architectural implications
[P] Party Mode - Bring different perspectives to analyze requirements
[C] Continue - Save this analysis and begin architectural decisions&quot;

### 6. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with the current context analysis
- Process the enhanced architectural insights that come back
- Ask user: &quot;Accept these enhancements to the project context analysis? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with the current project context
- Process the collaborative improvements to architectural understanding
- Ask user: &quot;Accept these changes to the project context analysis? (y/n)&quot;
- If yes: Update content with improvements, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2]&#x60;
- Load &#x60;./step-03-starter.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 4.

## SUCCESS METRICS:

✅ All input documents thoroughly analyzed for architectural implications
✅ Project scope and complexity clearly assessed and validated
✅ Technical constraints and dependencies identified
✅ Cross-cutting concerns mapped for architectural planning
✅ User confirmation of project understanding
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Skimming documents without deep architectural analysis
❌ Missing or misinterpreting critical NFRs
❌ Not validating project understanding with user
❌ Underestimating complexity indicators
❌ Generating content without real analysis of loaded documents
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-03-starter.md&#x60; to evaluate starter template options.

Remember: Do NOT proceed to step-03 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 3: Starter Template Evaluation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on evaluating starter template options with current versions
- 🌐 ALWAYS search the web to verify current versions - NEVER trust hardcoded versions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete architecture
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🌐 Search the web to verify current versions and options
- ⚠️ Present A/P/C menu after generating starter template analysis
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to explore unconventional starter options or custom approaches
- **P (Party Mode)**: Bring multiple perspectives to evaluate starter trade-offs for different use cases
- **C (Continue)**: Save the content to the document and proceed to next step

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Project context from step 2 is available and complete
- Project context file from step-01 may contain technical preferences
- No architectural decisions made yet - evaluating foundations
- Focus on technical preferences discovery and starter evaluation
- Consider project requirements and existing preferences when evaluating options

## YOUR TASK:

Discover technical preferences and evaluate starter template options, leveraging existing technical preferences and establishing solid architectural foundations.

## STARTER EVALUATION SEQUENCE:

### 0. Check Technical Preferences &amp; Context

**Check Project Context for Existing Technical Preferences:**
&quot;Before we dive into starter templates, let me check if you have any technical preferences already documented.

{{if_project_context_exists}}
I found some technical rules in your project context file:
{{extracted_technical_preferences_from_project_context}}

**Project Context Technical Rules Found:**

- Languages/Frameworks: {{languages_frameworks_from_context}}
- Tools &amp; Libraries: {{tools_from_context}}
- Development Patterns: {{patterns_from_context}}
- Platform Preferences: {{platforms_from_context}}

{{else}}
No existing technical preferences found in project context file. We&#x27;ll establish your technical preferences now.
{{/if_project_context}}&quot;

**Discover User Technical Preferences:**
&quot;Based on your project context, let&#x27;s discuss your technical preferences:

{{primary_technology_category}} Preferences:

- **Languages**: Do you have preferences between TypeScript/JavaScript, Python, Go, Rust, etc.?
- **Frameworks**: Any existing familiarity or preferences (React, Vue, Angular, Next.js, etc.)?
- **Databases**: Any preferences or existing infrastructure (PostgreSQL, MongoDB, MySQL, etc.)?

**Development Experience:**

- What&#x27;s your team&#x27;s experience level with different technologies?
- Are there any technologies you want to learn vs. what you&#x27;re comfortable with?

**Platform/Deployment Preferences:**

- Cloud provider preferences (AWS, Vercel, Railway, etc.)?
- Container preferences (Docker, Serverless, Traditional)?

**Integrations:**

- Any existing systems or APIs you need to integrate with?
- Third-party services you plan to use (payment, authentication, analytics, etc.)?

These preferences will help me recommend the most suitable starter templates and guide our architectural decisions.&quot;

### 1. Identify Primary Technology Domain

Based on project context analysis and technical preferences, identify the primary technology stack:

- **Web application** → Look for Next.js, Vite, Remix, SvelteKit starters
- **Mobile app** → Look for React Native, Expo, Flutter starters
- **API/Backend** → Look for NestJS, Express, Fastify, Supabase starters
- **CLI tool** → Look for CLI framework starters (oclif, commander, etc.)
- **Full-stack** → Look for T3, RedwoodJS, Blitz, Next.js starters
- **Desktop** → Look for Electron, Tauri starters

### 2. UX Requirements Consideration

If UX specification was loaded, consider UX requirements when selecting starter:

- **Rich animations** → Framer Motion compatible starter
- **Complex forms** → React Hook Form included starter
- **Real-time features** → Socket.io or WebSocket ready starter
- **Design system** → Storybook-enabled starter
- **Offline capability** → Service worker or PWA configured starter

### 3. Research Current Starter Options

Search the web to find current, maintained starter templates:

&#x60;&#x60;&#x60;
Search the web: &quot;{{primary_technology}} starter template CLI create command latest&quot;
Search the web: &quot;{{primary_technology}} boilerplate generator latest options&quot;
Search the web: &quot;{{primary_technology}} production-ready starter best practices&quot;
&#x60;&#x60;&#x60;

### 4. Investigate Top Starter Options

For each promising starter found, investigate details:

&#x60;&#x60;&#x60;
Search the web: &quot;{{starter_name}} default setup technologies included latest&quot;
Search the web: &quot;{{starter_name}} project structure file organization&quot;
Search the web: &quot;{{starter_name}} production deployment capabilities&quot;
Search the web: &quot;{{starter_name}} recent updates maintenance status&quot;
&#x60;&#x60;&#x60;

### 5. Analyze What Each Starter Provides

For each viable starter option, document:

**Technology Decisions Made:**

- Language/TypeScript configuration
- Styling solution (CSS, Tailwind, Styled Components, etc.)
- Testing framework setup
- Linting/Formatting configuration
- Build tooling and optimization
- Project structure and organization

**Architectural Patterns Established:**

- Code organization patterns
- Component structure conventions
- API layering approach
- State management setup
- Routing patterns
- Environment configuration

**Development Experience Features:**

- Hot reloading and development server
- TypeScript configuration
- Debugging setup
- Testing infrastructure
- Documentation generation

### 6. Present Starter Options

Based on user skill level and project needs:

**For Expert Users:**
&quot;Found {{starter_name}} which provides:
{{quick_decision_list_of_key_decisions}}

This would establish our base architecture with these technical decisions already made. Use it?&quot;

**For Intermediate Users:**
&quot;I found {{starter_name}}, which is a well-maintained starter for {{project_type}} projects.

It makes these architectural decisions for us:
{{decision_list_with_explanations}}

This gives us a solid foundation following current best practices. Should we use it?&quot;

**For Beginner Users:**
&quot;I found {{starter_name}}, which is like a pre-built foundation for your project.

Think of it like buying a prefab house frame instead of cutting each board yourself.

It makes these decisions for us:
{{friendly_explanation_of_decisions}}

This is a great starting point that follows best practices and saves us from making dozens of small technical choices. Should we use it?&quot;

### 7. Get Current CLI Commands

If user shows interest in a starter, get the exact current commands:

&#x60;&#x60;&#x60;
Search the web: &quot;{{starter_name}} CLI command options flags latest&quot;
Search the web: &quot;{{starter_name}} create new project command examples&quot;
&#x60;&#x60;&#x60;

### 8. Generate Starter Template Content

Prepare the content to append to the document:

#### Content Structure:

&#x60;&#x60;&#x60;&#x60;markdown
## Starter Template Evaluation

### Primary Technology Domain

{{identified_domain}} based on project requirements analysis

### Starter Options Considered

{{analysis_of_evaluated_starters}}

### Selected Starter: {{starter_name}}

**Rationale for Selection:**
{{why_this_starter_was_chosen}}

**Initialization Command:**

&#x60;&#x60;&#x60;bash
{{full_starter_command_with_options}}
&#x60;&#x60;&#x60;
&#x60;&#x60;&#x60;&#x60;

**Architectural Decisions Provided by Starter:**

**Language &amp; Runtime:**
{{language_typescript_setup}}

**Styling Solution:**
{{styling_solution_configuration}}

**Build Tooling:**
{{build_tools_and_optimization}}

**Testing Framework:**
{{testing_setup_and_configuration}}

**Code Organization:**
{{project_structure_and_patterns}}

**Development Experience:**
{{development_tools_and_workflow}}

**Note:** Project initialization using this command should be the first implementation story.

&#x60;&#x60;&#x60;

### 9. Present Content and Menu

Show the generated content and present choices:

&quot;I&#x27;ve analyzed starter template options for {{project_type}} projects.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 8]

**What would you like to do?**
[A] Advanced Elicitation - Explore custom approaches or unconventional starters
[P] Party Mode - Evaluate trade-offs from different perspectives
[C] Continue - Save this decision and move to architectural decisions&quot;

### 10. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with current starter analysis
- Process enhanced insights about starter options or custom approaches
- Ask user: &quot;Accept these changes to the starter template evaluation? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with starter evaluation context
- Process collaborative insights about starter trade-offs
- Ask user: &quot;Accept these changes to the starter template evaluation? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2, 3]&#x60;
- Load &#x60;./step-04-decisions.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 8.

## SUCCESS METRICS:

✅ Primary technology domain correctly identified from project context
✅ Current, maintained starter templates researched and evaluated
✅ All versions verified using web search, not hardcoded
✅ Architectural implications of starter choice clearly documented
✅ User provided with clear rationale for starter selection
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Not verifying current versions with web search
❌ Ignoring UX requirements when evaluating starters
❌ Not documenting what architectural decisions the starter makes
❌ Failing to consider maintenance status of starter templates
❌ Not providing clear rationale for starter selection
❌ Not presenting A/P/C menu after content generation
❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-04-decisions.md&#x60; to begin making specific architectural decisions.

Remember: Do NOT proceed to step-04 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!
&#x60;&#x60;&#x60;


# Step 4: Core Architectural Decisions

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on making critical architectural decisions collaboratively
- 🌐 ALWAYS search the web to verify current technology versions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🌐 Search the web to verify technology versions and options
- ⚠️ Present A/P/C menu after each major decision category
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices for each decision category:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative approaches to specific decisions
- **P (Party Mode)**: Bring multiple perspectives to evaluate decision trade-offs
- **C (Continue)**: Save the current decisions and proceed to next decision category

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Project context from step 2 is available
- Starter template choice from step 3 is available
- Project context file may contain technical preferences and rules
- Technical preferences discovered in step 3 are available
- Focus on decisions not already made by starter template or existing preferences
- Collaborative decision making, not recommendations

## YOUR TASK:

Facilitate collaborative architectural decision making, leveraging existing technical preferences and starter template decisions, focusing on remaining choices critical to the project&#x27;s success.

## DECISION MAKING SEQUENCE:

### 1. Load Decision Framework &amp; Check Existing Preferences

**Review Technical Preferences from Step 3:**
&quot;Based on our technical preferences discussion in step 3, let&#x27;s build on those foundations:

**Your Technical Preferences:**
{{user_technical_preferences_from_step_3}}

**Starter Template Decisions:**
{{starter_template_decisions}}

**Project Context Technical Rules:**
{{project_context_technical_rules}}&quot;

**Identify Remaining Decisions:**
Based on technical preferences, starter template choice, and project context, identify remaining critical decisions:

**Already Decided (Don&#x27;t re-decide these):**

- {{starter_template_decisions}}
- {{user_technology_preferences}}
- {{project_context_technical_rules}}

**Critical Decisions:** Must be decided before implementation can proceed
**Important Decisions:** Shape the architecture significantly
**Nice-to-Have:** Can be deferred if needed

### 2. Decision Categories by Priority

#### Category 1: Data Architecture

- Database choice (if not determined by starter)
- Data modeling approach
- Data validation strategy
- Migration approach
- Caching strategy

#### Category 2: Authentication &amp; Security

- Authentication method
- Authorization patterns
- Security middleware
- Data encryption approach
- API security strategy

#### Category 3: API &amp; Communication

- API design patterns (REST, GraphQL, etc.)
- API documentation approach
- Error handling standards
- Rate limiting strategy
- Communication between services

#### Category 4: Frontend Architecture (if applicable)

- State management approach
- Component architecture
- Routing strategy
- Performance optimization
- Bundle optimization

#### Category 5: Infrastructure &amp; Deployment

- Hosting strategy
- CI/CD pipeline approach
- Environment configuration
- Monitoring and logging
- Scaling strategy

### 3. Facilitate Each Decision Category

For each category, facilitate collaborative decision making:

**Present the Decision:**
Based on user skill level and project context:

**Expert Mode:**
&quot;{{Decision_Category}}: {{Specific_Decision}}

Options: {{concise_option_list_with_tradeoffs}}

What&#x27;s your preference for this decision?&quot;

**Intermediate Mode:**
&quot;Next decision: {{Human_Friendly_Category}}

We need to choose {{Specific_Decision}}.

Common options:
{{option_list_with_brief_explanations}}

For your project, I&#x27;d lean toward {{recommendation}} because {{reason}}. What are your thoughts?&quot;

**Beginner Mode:**
&quot;Let&#x27;s talk about {{Human_Friendly_Category}}.

{{Educational_Context_About_Why_This_Matters}}

Think of it like {{real_world_analogy}}.

Your main options:
{{friendly_options_with_pros_cons}}

My suggestion: {{recommendation}}
This is good for you because {{beginner_friendly_reason}}.

What feels right to you?&quot;

**Verify Technology Versions:**
If decision involves specific technology:

&#x60;&#x60;&#x60;
Search the web: &quot;{{technology}} latest stable version&quot;
Search the web: &quot;{{technology}} current LTS version&quot;
Search the web: &quot;{{technology}} production readiness&quot;
&#x60;&#x60;&#x60;

**Get User Input:**
&quot;What&#x27;s your preference? (or &#x27;explain more&#x27; for details)&quot;

**Handle User Response:**

- If user wants more info: Provide deeper explanation
- If user has preference: Discuss implications and record decision
- If user wants alternatives: Explore other options

**Record the Decision:**

- Category: {{category}}
- Decision: {{user_choice}}
- Version: {{verified_version_if_applicable}}
- Rationale: {{user_reasoning_or_default}}
- Affects: {{components_or_epics}}
- Provided by Starter: {{yes_if_from_starter}}

### 4. Check for Cascading Implications

After each major decision, identify related decisions:

&quot;This choice means we&#x27;ll also need to decide:

- {{related_decision_1}}
- {{related_decision_2}}&quot;

### 5. Generate Decisions Content

After facilitating all decision categories, prepare the content to append:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
{{critical_decisions_made}}

**Important Decisions (Shape Architecture):**
{{important_decisions_made}}

**Deferred Decisions (Post-MVP):**
{{decisions_deferred_with_rationale}}

### Data Architecture

{{data_related_decisions_with_versions_and_rationale}}

### Authentication &amp; Security

{{security_related_decisions_with_versions_and_rationale}}

### API &amp; Communication Patterns

{{api_related_decisions_with_versions_and_rationale}}

### Frontend Architecture

{{frontend_related_decisions_with_versions_and_rationale}}

### Infrastructure &amp; Deployment

{{infrastructure_related_decisions_with_versions_and_rationale}}

### Decision Impact Analysis

**Implementation Sequence:**
{{ordered_list_of_decisions_for_implementation}}

**Cross-Component Dependencies:**
{{how_decisions_affect_each_other}}
&#x60;&#x60;&#x60;

### 6. Present Content and Menu

Show the generated decisions content and present choices:

&quot;I&#x27;ve documented all the core architectural decisions we&#x27;ve made together.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 5]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative approaches to any specific decisions
[P] Party Mode - Review decisions from multiple perspectives
[C] Continue - Save these decisions and move to implementation patterns&quot;

### 7. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with specific decision categories
- Process enhanced insights about particular decisions
- Ask user: &quot;Accept these enhancements to the architectural decisions? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with architectural decisions context
- Process collaborative insights about decision trade-offs
- Ask user: &quot;Accept these changes to the architectural decisions? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2, 3, 4]&#x60;
- Load &#x60;./step-05-patterns.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 5.

## SUCCESS METRICS:

✅ All critical architectural decisions made collaboratively
✅ Technology versions verified using web search
✅ Decision rationale clearly documented
✅ Cascading implications identified and addressed
✅ User provided appropriate level of explanation for skill level
✅ A/P/C menu presented and handled correctly for each category
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Making recommendations instead of facilitating decisions
❌ Not verifying technology versions with web search
❌ Missing cascading implications between decisions
❌ Not adapting explanations to user skill level
❌ Forgetting to document decisions made by starter template
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-05-patterns.md&#x60; to define implementation patterns that ensure consistency across AI agents.

Remember: Do NOT proceed to step-05 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 5: Implementation Patterns &amp; Consistency Rules

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on patterns that prevent AI agent implementation conflicts
- 🎯 EMPHASIZE what agents could decide DIFFERENTLY if not specified
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🎯 Focus on consistency, not implementation details
- ⚠️ Present A/P/C menu after generating patterns content
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4, 5]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to develop comprehensive consistency patterns
- **P (Party Mode)**: Bring multiple perspectives to identify potential conflict points
- **C (Continue)**: Save the patterns and proceed to project structure

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Core architectural decisions from step 4 are complete
- Technology stack is decided and versions are verified
- Focus on HOW agents should implement, not WHAT they should implement
- Consider what could vary between different AI agents

## YOUR TASK:

Define implementation patterns and consistency rules that ensure multiple AI agents write compatible, consistent code that works together seamlessly.

## PATTERNS DEFINITION SEQUENCE:

### 1. Identify Potential Conflict Points

Based on the chosen technology stack and decisions, identify where AI agents could make different choices:

**Naming Conflicts:**

- Database table/column naming conventions
- API endpoint naming patterns
- File and directory naming
- Component/function/variable naming
- Route parameter formats

**Structural Conflicts:**

- Where tests are located
- How components are organized
- Where utilities and helpers go
- Configuration file organization
- Static asset organization

**Format Conflicts:**

- API response wrapper formats
- Error response structures
- Date/time formats in APIs and UI
- JSON field naming conventions
- API status code usage

**Communication Conflicts:**

- Event naming conventions
- Event payload structures
- State update patterns
- Action naming conventions
- Logging formats and levels

**Process Conflicts:**

- Loading state handling
- Error recovery patterns
- Retry implementation approaches
- Authentication flow patterns
- Validation timing and methods

### 2. Facilitate Pattern Decisions

For each conflict category, facilitate collaborative pattern definition:

**Present the Conflict Point:**
&quot;Given that we&#x27;re using {{tech_stack}}, different AI agents might handle {{conflict_area}} differently.

For example, one agent might name database tables &#x27;users&#x27; while another uses &#x27;Users&#x27; - this would cause conflicts.

We need to establish consistent patterns that all agents follow.&quot;

**Show Options and Trade-offs:**
&quot;Common approaches for {{pattern_category}}:

1. {{option_1}} - {{pros_and_cons}}
2. {{option_2}} - {{pros_and_cons}}
3. {{option_3}} - {{pros_and_cons}}

Which approach makes the most sense for our project?&quot;

**Get User Decision:**
&quot;What&#x27;s your preference for this pattern? (or discuss the trade-offs more)&quot;

### 3. Define Pattern Categories

#### Naming Patterns

**Database Naming:**

- Table naming: users, Users, or user?
- Column naming: user_id or userId?
- Foreign key format: user_id or fk_user?
- Index naming: idx_users_email or users_email_index?

**API Naming:**

- REST endpoint naming: /users or /user? Plural or singular?
- Route parameter format: :id or {id}?
- Query parameter naming: user_id or userId?
- Header naming conventions: X-Custom-Header or Custom-Header?

**Code Naming:**

- Component naming: UserCard or user-card?
- File naming: UserCard.tsx or user-card.tsx?
- Function naming: getUserData or get_user_data?
- Variable naming: userId or user_id?

#### Structure Patterns

**Project Organization:**

- Where do tests live? **tests**/ or \*.test.ts co-located?
- How are components organized? By feature or by type?
- Where do shared utilities go?
- How are services and repositories organized?

**File Structure:**

- Config file locations and naming
- Static asset organization
- Documentation placement
- Environment file organization

#### Format Patterns

**API Formats:**

- API response wrapper? {data: ..., error: ...} or direct response?
- Error format? {message, code} or {error: {type, detail}}?
- Date format in JSON? ISO strings or timestamps?
- Success response structure?

**Data Formats:**

- JSON field naming: snake_case or camelCase?
- Boolean representations: true/false or 1/0?
- Null handling patterns
- Array vs object for single items

#### Communication Patterns

**Event Systems:**

- Event naming convention: user.created or UserCreated?
- Event payload structure standards
- Event versioning approach
- Async event handling patterns

**State Management:**

- State update patterns: immutable updates or direct mutation?
- Action naming conventions
- Selector patterns
- State organization principles

#### Process Patterns

**Error Handling:**

- Global error handling approach
- Error boundary patterns
- User-facing error message format
- Logging vs user error distinction

**Loading States:**

- Loading state naming conventions
- Global vs local loading states
- Loading state persistence
- Loading UI patterns

### 4. Generate Patterns Content

Prepare the content to append to the document:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Implementation Patterns &amp; Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
{{number_of_potential_conflicts}} areas where AI agents could make different choices

### Naming Patterns

**Database Naming Conventions:**
{{database_naming_rules_with_examples}}

**API Naming Conventions:**
{{api_naming_rules_with_examples}}

**Code Naming Conventions:**
{{code_naming_rules_with_examples}}

### Structure Patterns

**Project Organization:**
{{project_structure_rules_with_examples}}

**File Structure Patterns:**
{{file_organization_rules_with_examples}}

### Format Patterns

**API Response Formats:**
{{api_response_structure_rules}}

**Data Exchange Formats:**
{{data_format_rules_with_examples}}

### Communication Patterns

**Event System Patterns:**
{{event_naming_and_structure_rules}}

**State Management Patterns:**
{{state_update_and_organization_rules}}

### Process Patterns

**Error Handling Patterns:**
{{consistent_error_handling_approaches}}

**Loading State Patterns:**
{{loading_state_management_rules}}

### Enforcement Guidelines

**All AI Agents MUST:**

- {{mandatory_pattern_1}}
- {{mandatory_pattern_2}}
- {{mandatory_pattern_3}}

**Pattern Enforcement:**

- How to verify patterns are followed
- Where to document pattern violations
- Process for updating patterns

### Pattern Examples

**Good Examples:**
{{concrete_examples_of_correct_pattern_usage}}

**Anti-Patterns:**
{{examples_of_what_to_avoid}}
&#x60;&#x60;&#x60;

### 5. Present Content and Menu

Show the generated patterns content and present choices:

&quot;I&#x27;ve documented implementation patterns that will prevent conflicts between AI agents working on this project.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 4]

**What would you like to do?**
[A] Advanced Elicitation - Explore additional consistency patterns
[P] Party Mode - Review patterns from different implementation perspectives
[C] Continue - Save these patterns and move to project structure&quot;

### 6. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with current patterns
- Process enhanced consistency rules that come back
- Ask user: &quot;Accept these additional pattern refinements? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with implementation patterns context
- Process collaborative insights about potential conflicts
- Ask user: &quot;Accept these changes to the implementation patterns? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2, 3, 4, 5]&#x60;
- Load &#x60;./step-06-structure.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 4.

## SUCCESS METRICS:

✅ All potential AI agent conflict points identified and addressed
✅ Comprehensive patterns defined for naming, structure, and communication
✅ Concrete examples provided for each pattern
✅ Enforcement guidelines clearly documented
✅ User collaborated on pattern decisions rather than receiving recommendations
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Missing potential conflict points that could cause agent conflicts
❌ Being too prescriptive about implementation details instead of focusing on consistency
❌ Not providing concrete examples for each pattern
❌ Failing to address cross-cutting concerns like error handling
❌ Not considering the chosen technology stack when defining patterns
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-06-structure.md&#x60; to define the complete project structure.

Remember: Do NOT proceed to step-06 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 6: Project Structure &amp; Boundaries

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on defining complete project structure and clear boundaries
- 🗺️ MAP requirements/epics to architectural components
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🗺️ Create complete project tree, not generic placeholders
- ⚠️ Present A/P/C menu after generating project structure
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4, 5, 6]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative project organization approaches
- **P (Party Mode)**: Bring multiple perspectives to evaluate project structure trade-offs
- **C (Continue)**: Save the project structure and proceed to validation

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- All previous architectural decisions are complete
- Implementation patterns and consistency rules are defined
- Focus on physical project structure and component boundaries
- Map requirements to specific files and directories

## YOUR TASK:

Define the complete project structure and architectural boundaries based on all decisions made, creating a concrete implementation guide for AI agents.

## PROJECT STRUCTURE SEQUENCE:

### 1. Analyze Requirements Mapping

Map project requirements to architectural components:

**From Epics (if available):**
&quot;Epic: {{epic_name}} → Lives in {{module/directory/service}}&quot;

- User stories within the epic
- Cross-epic dependencies
- Shared components needed

**From FR Categories (if no epics):**
&quot;FR Category: {{fr_category_name}} → Lives in {{module/directory/service}}&quot;

- Related functional requirements
- Shared functionality across categories
- Integration points between categories

### 2. Define Project Directory Structure

Based on technology stack and patterns, create the complete project structure:

**Root Configuration Files:**

- Package management files (package.json, requirements.txt, etc.)
- Build and development configuration
- Environment configuration files
- CI/CD pipeline files
- Documentation files

**Source Code Organization:**

- Application entry points
- Core application structure
- Feature/module organization
- Shared utilities and libraries
- Configuration and environment files

**Test Organization:**

- Unit test locations and structure
- Integration test organization
- End-to-end test structure
- Test utilities and fixtures

**Build and Distribution:**

- Build output directories
- Distribution files
- Static assets
- Documentation build

### 3. Define Integration Boundaries

Map how components communicate and where boundaries exist:

**API Boundaries:**

- External API endpoints
- Internal service boundaries
- Authentication and authorization boundaries
- Data access layer boundaries

**Component Boundaries:**

- Frontend component communication patterns
- State management boundaries
- Service communication patterns
- Event-driven integration points

**Data Boundaries:**

- Database schema boundaries
- Data access patterns
- Caching boundaries
- External data integration points

### 4. Create Complete Project Tree

Generate a comprehensive directory structure showing all files and directories:

**Technology-Specific Structure Examples:**

**Next.js Full-Stack:**

&#x60;&#x60;&#x60;
project-name/
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── forms/
│   │   └── features/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types/
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── __mocks__/
│   ├── components/
│   └── e2e/
└── public/
    └── assets/
&#x60;&#x60;&#x60;

**API Backend (NestJS):**

&#x60;&#x60;&#x60;
project-name/
├── package.json
├── nest-cli.json
├── tsconfig.json
├── .env
├── .env.example
├── .gitignore
├── README.md
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── common/
│   ├── services/
│   ├── repositories/
│   ├── decorators/
│   ├── pipes/
│   ├── guards/
│   └── interceptors/
├── test/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── docker-compose.yml
&#x60;&#x60;&#x60;

### 5. Map Requirements to Structure

Create explicit mapping from project requirements to specific files/directories:

**Epic/Feature Mapping:**
&quot;Epic: User Management

- Components: src/components/features/users/
- Services: src/services/users/
- API Routes: src/app/api/users/
- Database: prisma/migrations/_*users*_
- Tests: tests/features/users/&quot;

**Cross-Cutting Concerns:**
&quot;Authentication System

- Components: src/components/auth/
- Services: src/services/auth/
- Middleware: src/middleware/auth.ts
- Guards: src/guards/auth.guard.ts
- Tests: tests/auth/&quot;

### 6. Generate Structure Content

Prepare the content to append to the document:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Project Structure &amp; Boundaries

### Complete Project Directory Structure
&#x60;&#x60;&#x60;

{{complete_project_tree_with_all_files_and_directories}}

&#x60;&#x60;&#x60;

### Architectural Boundaries

**API Boundaries:**
{{api_boundary_definitions_and_endpoints}}

**Component Boundaries:**
{{component_communication_patterns_and_boundaries}}

**Service Boundaries:**
{{service_integration_patterns_and_boundaries}}

**Data Boundaries:**
{{data_access_patterns_and_boundaries}}

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
{{mapping_of_epics_or_features_to_specific_directories}}

**Cross-Cutting Concerns:**
{{mapping_of_shared_functionality_to_locations}}

### Integration Points

**Internal Communication:**
{{how_components_within_the_project_communicate}}

**External Integrations:**
{{third_party_service_integration_points}}

**Data Flow:**
{{how_data_flows_through_the_architecture}}

### File Organization Patterns

**Configuration Files:**
{{where_and_how_config_files_are_organized}}

**Source Organization:**
{{how_source_code_is_structured_and_organized}}

**Test Organization:**
{{how_tests_are_structured_and_organized}}

**Asset Organization:**
{{how_static_and_dynamic_assets_are_organized}}

### Development Workflow Integration

**Development Server Structure:**
{{how_the_project_is organized_for_development}}

**Build Process Structure:**
{{how_the_build_process_uses_the_project_structure}}

**Deployment Structure:**
{{how_the_project_structure_supports_deployment}}
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the generated project structure content and present choices:

&quot;I&#x27;ve created a complete project structure based on all our architectural decisions.

**Here&#x27;s what I&#x27;ll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative project organization approaches
[P] Party Mode - Review structure from different development perspectives
[C] Continue - Save this structure and move to architecture validation&quot;

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with current project structure
- Process enhanced organizational insights that come back
- Ask user: &quot;Accept these changes to the project structure? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with project structure context
- Process collaborative insights about organization trade-offs
- Ask user: &quot;Accept these changes to the project structure? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2, 3, 4, 5, 6]&#x60;
- Load &#x60;./step-07-validation.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Complete project tree defined with all files and directories
✅ All architectural boundaries clearly documented
✅ Requirements/epics mapped to specific locations
✅ Integration points and communication patterns defined
✅ Project structure aligned with chosen technology stack
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Creating generic placeholder structure instead of specific, complete tree
❌ Not mapping requirements to specific files and directories
❌ Missing important integration boundaries
❌ Not considering the chosen technology stack in structure design
❌ Not defining how components communicate across boundaries
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-07-validation.md&#x60; to validate architectural coherence and completeness.

Remember: Do NOT proceed to step-07 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 7: Architecture Validation &amp; Completion

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with &#x27;C&#x27;, ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on validating architectural coherence and completeness
- ✅ VALIDATE all requirements are covered by architectural decisions
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- ✅ Run comprehensive validation checks on the complete architecture
- ⚠️ Present A/P/C menu after generating validation results
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter &#x60;stepsCompleted: [1, 2, 3, 4, 5, 6, 7]&#x60; before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to address complex architectural issues found during validation
- **P (Party Mode)**: Bring multiple perspectives to resolve validation concerns
- **C (Continue)**: Save the validation results and complete the architecture

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Complete architecture document with all sections is available
- All architectural decisions, patterns, and structure are defined
- Focus on validation, gap analysis, and coherence checking
- Prepare for handoff to implementation phase

## YOUR TASK:

Validate the complete architecture for coherence, completeness, and readiness to guide AI agents through consistent implementation.

## VALIDATION SEQUENCE:

### 1. Coherence Validation

Check that all architectural decisions work together:

**Decision Compatibility:**

- Do all technology choices work together without conflicts?
- Are all versions compatible with each other?
- Do patterns align with technology choices?
- Are there any contradictory decisions?

**Pattern Consistency:**

- Do implementation patterns support the architectural decisions?
- Are naming conventions consistent across all areas?
- Do structure patterns align with technology stack?
- Are communication patterns coherent?

**Structure Alignment:**

- Does the project structure support all architectural decisions?
- Are boundaries properly defined and respected?
- Does the structure enable the chosen patterns?
- Are integration points properly structured?

### 2. Requirements Coverage Validation

Verify all project requirements are architecturally supported:

**From Epics (if available):**

- Does every epic have architectural support?
- Are all user stories implementable with these decisions?
- Are cross-epic dependencies handled architecturally?
- Are there any gaps in epic coverage?

**From FR Categories (if no epics):**

- Does every functional requirement have architectural support?
- Are all FR categories fully covered by architectural decisions?
- Are cross-cutting FRs properly addressed?
- Are there any missing architectural capabilities?

**Non-Functional Requirements:**

- Are performance requirements addressed architecturally?
- Are security requirements fully covered?
- Are scalability considerations properly handled?
- Are compliance requirements architecturally supported?

### 3. Implementation Readiness Validation

Assess if AI agents can implement consistently:

**Decision Completeness:**

- Are all critical decisions documented with versions?
- Are implementation patterns comprehensive enough?
- Are consistency rules clear and enforceable?
- Are examples provided for all major patterns?

**Structure Completeness:**

- Is the project structure complete and specific?
- Are all files and directories defined?
- Are integration points clearly specified?
- Are component boundaries well-defined?

**Pattern Completeness:**

- Are all potential conflict points addressed?
- Are naming conventions comprehensive?
- Are communication patterns fully specified?
- Are process patterns (error handling, etc.) complete?

### 4. Gap Analysis

Identify and document any missing elements:

**Critical Gaps:**

- Missing architectural decisions that block implementation
- Incomplete patterns that could cause conflicts
- Missing structural elements needed for development
- Undefined integration points

**Important Gaps:**

- Areas that need more detailed specification
- Patterns that could be more comprehensive
- Documentation that would help implementation
- Examples that would clarify complex decisions

**Nice-to-Have Gaps:**

- Additional patterns that would be helpful
- Supplementary documentation
- Tooling recommendations
- Development workflow optimizations

### 5. Address Validation Issues

For any issues found, facilitate resolution:

**Critical Issues:**
&quot;I found some issues that need to be addressed before implementation:

{{critical_issue_description}}

These could cause implementation problems. How would you like to resolve this?&quot;

**Important Issues:**
&quot;I noticed a few areas that could be improved:

{{important_issue_description}}

These aren&#x27;t blocking, but addressing them would make implementation smoother. Should we work on these?&quot;

**Minor Issues:**
&quot;Here are some minor suggestions for improvement:

{{minor_issue_description}}

These are optional refinements. Would you like to address any of these?&quot;

### 6. Generate Validation Content

Prepare the content to append to the document:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
{{assessment_of_how_all_decisions_work_together}}

**Pattern Consistency:**
{{verification_that_patterns_support_decisions}}

**Structure Alignment:**
{{confirmation_that_structure_supports_architecture}}

### Requirements Coverage Validation ✅

**Epic/Feature Coverage:**
{{verification_that_all_epics_or_features_are_supported}}

**Functional Requirements Coverage:**
{{confirmation_that_all_FRs_are_architecturally_supported}}

**Non-Functional Requirements Coverage:**
{{verification_that_NFRs_are_addressed}}

### Implementation Readiness Validation ✅

**Decision Completeness:**
{{assessment_of_decision_documentation_completeness}}

**Structure Completeness:**
{{evaluation_of_project_structure_completeness}}

**Pattern Completeness:**
{{verification_of_implementation_patterns_completeness}}

### Gap Analysis Results

{{gap_analysis_findings_with_priority_levels}}

### Validation Issues Addressed

{{description_of_any_issues_found_and_resolutions}}

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** {{high/medium/low}} based on validation results

**Key Strengths:**
{{list_of_architecture_strengths}}

**Areas for Future Enhancement:**
{{areas_that_could_be_improved_later}}

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and boundaries
- Refer to this document for all architectural questions

**First Implementation Priority:**
{{starter_template_command_or_first_architectural_step}}
&#x60;&#x60;&#x60;

### 7. Present Content and Menu

Show the validation results and present choices:

&quot;I&#x27;ve completed a comprehensive validation of your architecture.

**Validation Summary:**

- ✅ Coherence: All decisions work together
- ✅ Coverage: All requirements are supported
- ✅ Readiness: AI agents can implement consistently

**Here&#x27;s what I&#x27;ll add to complete the architecture document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Address any complex architectural concerns
[P] Party Mode - Review validation from different implementation perspectives
[C] Continue - Complete the architecture and finish workflow

### 8. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Read fully and follow: {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml with validation issues
- Process enhanced solutions for complex concerns
- Ask user: &quot;Accept these architectural improvements? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Read fully and follow: {project-root}/_bmad/core/workflows/party-mode/workflow.md with validation context
- Process collaborative insights on implementation readiness
- Ask user: &quot;Accept these changes to the validation results? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Append the final content to &#x60;{planning_artifacts}/architecture.md&#x60;
- Update frontmatter: &#x60;stepsCompleted: [1, 2, 3, 4, 5, 6, 7]&#x60;
- Load &#x60;./step-08-complete.md&#x60;

## APPEND TO DOCUMENT:

When user selects &#x27;C&#x27;, append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ All architectural decisions validated for coherence
✅ Complete requirements coverage verified
✅ Implementation readiness confirmed
✅ All gaps identified and addressed
✅ Comprehensive validation checklist completed
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected

## FAILURE MODES:

❌ Skipping validation of decision compatibility
❌ Not verifying all requirements are architecturally supported
❌ Missing potential implementation conflicts
❌ Not addressing gaps found during validation
❌ Providing incomplete validation checklist
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects &#x27;C&#x27; and content is saved to document, load &#x60;./step-08-complete.md&#x60; to complete the workflow and provide implementation guidance.

Remember: Do NOT proceed to step-08 until user explicitly selects &#x27;C&#x27; from the A/P/C menu and content is saved!


# Step 8: Architecture Completion &amp; Handoff

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- ✅ ALWAYS treat this as collaborative completion between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on successful workflow completion and implementation handoff
- 🎯 PROVIDE clear next steps for implementation phase
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🎯 Present completion summary and implementation guidance
- 📖 Update frontmatter with final workflow state
- 🚫 THIS IS THE FINAL STEP IN THIS WORKFLOW

## YOUR TASK:

Complete the architecture workflow, provide a comprehensive completion summary, and guide the user to the next phase of their project development.

## COMPLETION SEQUENCE:

### 1. Congratulate the User on Completion

Both you and the User completed something amazing here - give a summary of what you achieved together and really congratulate the user on a job well done.

### 2. Update the created document&#x27;s frontmatter

&#x60;&#x60;&#x60;yaml
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
workflowType: &#x27;architecture&#x27;
lastStep: 8
status: &#x27;complete&#x27;
completedAt: &#x27;{{current_date}}&#x27;
&#x60;&#x60;&#x60;

### 3. Next Steps Guidance

Architecture complete. Read fully and follow: &#x60;_bmad/core/tasks/bmad-help.md&#x60; with argument &#x60;Create Architecture&#x60;.

Upon Completion of task output: offer to answer any questions about the Architecture Document.


## SUCCESS METRICS:

✅ Complete architecture document delivered with all sections
✅ All architectural decisions documented and validated
✅ Implementation patterns and consistency rules finalized
✅ Project structure complete with all files and directories
✅ User provided with clear next steps and implementation guidance
✅ Workflow status properly updated
✅ User collaboration maintained throughout completion process

## FAILURE MODES:

❌ Not providing clear implementation guidance
❌ Missing final validation of document completeness
❌ Not updating workflow status appropriately
❌ Failing to celebrate the successful completion
❌ Not providing specific next steps for the user
❌ Rushing completion without proper summary

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with &#x27;C&#x27; without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## WORKFLOW COMPLETE:

This is the final step of the Architecture workflow. The user now has a complete, validated architecture document ready for AI agent implementation.

The architecture will serve as the single source of truth for all technical decisions, ensuring consistent implementation across the entire project development lifecycle.


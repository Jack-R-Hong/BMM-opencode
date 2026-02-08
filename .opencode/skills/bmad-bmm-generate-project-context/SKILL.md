---
name: bmad-bmm-generate-project-context
description: "Creates a concise project-context.md file with critical rules and patterns that AI agents must follow when implementing code. Optimized for LLM context efficiency."
---

# Generate Project Context Workflow

**Goal:** Create a concise, optimized &#x60;project-context.md&#x60; file containing critical rules, patterns, and guidelines that AI agents must follow when implementing code. This file focuses on unobvious details that LLMs need to be reminded of.

**Your Role:** You are a technical facilitator working with a peer to capture the essential implementation rules that will ensure consistent, high-quality code generation across all AI agents working on the project.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Focus on lean, LLM-optimized content generation
- You NEVER proceed to a step file if the current step file indicates the user must approve and indicate continuation.

---

## INITIALIZATION

### Configuration Loading

Load config from &#x60;{project-root}/_bmad/bmm/config.yaml&#x60; and resolve:

- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;user_name&#x60;
- &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;date&#x60; as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

### Paths

- &#x60;installed_path&#x60; &#x3D; &#x60;{project-root}/_bmad/bmm/workflows/generate-project-context&#x60;
- &#x60;template_path&#x60; &#x3D; &#x60;{installed_path}/project-context-template.md&#x60;
- &#x60;output_file&#x60; &#x3D; &#x60;{output_folder}/project-context.md&#x60;

---

## EXECUTION

Load and execute &#x60;steps/step-01-discover.md&#x60; to begin the workflow.

**Note:** Input document discovery and initialization protocols are handled in step-01-discover.md.

# Step 1: Context Discovery &amp; Initialization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative discovery between technical peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on discovering existing project context and technology stack
- 🎯 IDENTIFY critical implementation rules that AI agents need
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 📖 Read existing project files to understand current context
- 💾 Initialize document and update frontmatter
- 🚫 FORBIDDEN to load next step until discovery is complete

## CONTEXT BOUNDARIES:

- Variables from workflow.md are available in memory
- Focus on existing project files and architecture decisions
- Look for patterns, conventions, and unique requirements
- Prioritize rules that prevent implementation mistakes

## YOUR TASK:

Discover the project&#x27;s technology stack, existing patterns, and critical implementation rules that AI agents must follow when writing code.

## DISCOVERY SEQUENCE:

### 1. Check for Existing Project Context

First, check if project context already exists:

- Look for file at &#x60;{project_knowledge}/project-context.md or {project-root}/**/project-context.md&#x60;
- If exists: Read complete file to understand existing rules
- Present to user: &quot;Found existing project context with {number_of_sections} sections. Would you like to update this or create a new one?&quot;

### 2. Discover Project Technology Stack

Load and analyze project files to identify technologies:

**Architecture Document:**

- Look for &#x60;{planning_artifacts}/architecture.md&#x60;
- Extract technology choices with specific versions
- Note architectural decisions that affect implementation

**Package Files:**

- Check for &#x60;package.json&#x60;, &#x60;requirements.txt&#x60;, &#x60;Cargo.toml&#x60;, etc.
- Extract exact versions of all dependencies
- Note development vs production dependencies

**Configuration Files:**

- Look for project language specific configs ( example: &#x60;tsconfig.json&#x60;)
- Build tool configs (webpack, vite, next.config.js, etc.)
- Linting and formatting configs (.eslintrc, .prettierrc, etc.)
- Testing configurations (jest.config.js, vitest.config.ts, etc.)

### 3. Identify Existing Code Patterns

Search through existing codebase for patterns:

**Naming Conventions:**

- File naming patterns (PascalCase, kebab-case, etc.)
- Component/function naming conventions
- Variable naming patterns
- Test file naming patterns

**Code Organization:**

- How components are structured
- Where utilities and helpers are placed
- How services are organized
- Test organization patterns

**Documentation Patterns:**

- Comment styles and conventions
- Documentation requirements
- README and API doc patterns

### 4. Extract Critical Implementation Rules

Look for rules that AI agents might miss:

**Language-Specific Rules:**

- TypeScript strict mode requirements
- Import/export conventions
- Async/await vs Promise usage patterns
- Error handling patterns specific to the language

**Framework-Specific Rules:**

- React hooks usage patterns
- API route conventions
- Middleware usage patterns
- State management patterns

**Testing Rules:**

- Test structure requirements
- Mock usage conventions
- Integration vs unit test boundaries
- Coverage requirements

**Development Workflow Rules:**

- Branch naming conventions
- Commit message patterns
- PR review requirements
- Deployment procedures

### 5. Initialize Project Context Document

Based on discovery, create or update the context document:

#### A. Fresh Document Setup (if no existing context)

Copy template from &#x60;{installed_path}/project-context-template.md&#x60; to &#x60;{output_folder}/project-context.md&#x60;
Initialize frontmatter fields.

#### B. Existing Document Update

Load existing context and prepare for updates
Set frontmatter &#x60;sections_completed&#x60; to track what will be updated

### 6. Present Discovery Summary

Report findings to user:

&quot;Welcome {{user_name}}! I&#x27;ve analyzed your project for {{project_name}} to discover the context that AI agents need.

**Technology Stack Discovered:**
{{list_of_technologies_with_versions}}

**Existing Patterns Found:**

- {{number_of_patterns}} implementation patterns
- {{number_of_conventions}} coding conventions
- {{number_of_rules}} critical rules

**Key Areas for Context Rules:**

- {{area_1}} (e.g., TypeScript configuration)
- {{area_2}} (e.g., Testing patterns)
- {{area_3}} (e.g., Code organization)

{if_existing_context}
**Existing Context:** Found {{sections}} sections already defined. We can update or add to these.
{/if_existing_context}

Ready to create/update your project context. This will help AI agents implement code consistently with your project&#x27;s standards.

[C] Continue to context generation&quot;

## SUCCESS METRICS:

✅ Existing project context properly detected and handled
✅ Technology stack accurately identified with versions
✅ Critical implementation patterns discovered
✅ Project context document properly initialized
✅ Discovery findings clearly presented to user
✅ User ready to proceed with context generation

## FAILURE MODES:

❌ Not checking for existing project context before creating new one
❌ Missing critical technology versions or configurations
❌ Overlooking important coding patterns or conventions
❌ Not initializing frontmatter properly
❌ Not presenting clear discovery summary to user

## NEXT STEP:

After user selects [C] to continue, load &#x60;./step-02-generate.md&#x60; to collaboratively generate the specific project context rules.

Remember: Do NOT proceed to step-02 until user explicitly selects [C] from the menu and discovery is confirmed and the initial file has been written as directed in this discovery step!


# Step 2: Context Rules Generation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative discovery between technical peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on unobvious rules that AI agents need to be reminded of
- 🎯 KEEP CONTENT LEAN - optimize for LLM context efficiency
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 📝 Focus on specific, actionable rules rather than general advice
- ⚠️ Present A/P/C menu after each major rule category
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter with completed sections
- 🚫 FORBIDDEN to load next step until all sections are complete

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices for each rule category:

- **A (Advanced Elicitation)**: Use discovery protocols to explore nuanced implementation rules
- **P (Party Mode)**: Bring multiple perspectives to identify critical edge cases
- **C (Continue)**: Save the current rules and proceed to next category

## PROTOCOL INTEGRATION:

- When &#x27;A&#x27; selected: Execute {project-root}/_bmad/core/workflows/advanced-elicitation/workflow.xml
- When &#x27;P&#x27; selected: Execute {project-root}/_bmad/core/workflows/party-mode
- PROTOCOLS always return to display this step&#x27;s A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- Discovery results from step-1 are available
- Technology stack and existing patterns are identified
- Focus on rules that prevent implementation mistakes
- Prioritize unobvious details that AI agents might miss

## YOUR TASK:

Collaboratively generate specific, critical rules that AI agents must follow when implementing code in this project.

## CONTEXT GENERATION SEQUENCE:

### 1. Technology Stack &amp; Versions

Document the exact technology stack from discovery:

**Core Technologies:**
Based on user skill level, present findings:

**Expert Mode:**
&quot;Technology stack from your architecture and package files:
{{exact_technologies_with_versions}}

Any critical version constraints I should document for agents?&quot;

**Intermediate Mode:**
&quot;I found your technology stack:

**Core Technologies:**
{{main_technologies_with_versions}}

**Key Dependencies:**
{{important_dependencies_with_versions}}

Are there any version constraints or compatibility notes agents should know about?&quot;

**Beginner Mode:**
&quot;Here are the technologies you&#x27;re using:

**Main Technologies:**
{{friendly_description_of_tech_stack}}

**Important Notes:**
{{key_things_agents_need_to_know_about_versions}}

Should I document any special version rules or compatibility requirements?&quot;

### 2. Language-Specific Rules

Focus on unobvious language patterns agents might miss:

**TypeScript/JavaScript Rules:**
&quot;Based on your codebase, I notice some specific patterns:

**Configuration Requirements:**
{{typescript_config_rules}}

**Import/Export Patterns:**
{{import_export_conventions}}

**Error Handling Patterns:**
{{error_handling_requirements}}

Are these patterns correct? Any other language-specific rules agents should follow?&quot;

**Python/Ruby/Other Language Rules:**
Adapt to the actual language in use with similar focused questions.

### 3. Framework-Specific Rules

Document framework-specific patterns:

**React Rules (if applicable):**
&quot;For React development, I see these patterns:

**Hooks Usage:**
{{hooks_usage_patterns}}

**Component Structure:**
{{component_organization_rules}}

**State Management:**
{{state_management_patterns}}

**Performance Rules:**
{{performance_optimization_requirements}}

Should I add any other React-specific rules?&quot;

**Other Framework Rules:**
Adapt for Vue, Angular, Next.js, Express, etc.

### 4. Testing Rules

Focus on testing patterns that ensure consistency:

**Test Structure Rules:**
&quot;Your testing setup shows these patterns:

**Test Organization:**
{{test_file_organization}}

**Mock Usage:**
{{mock_patterns_and_conventions}}

**Test Coverage Requirements:**
{{coverage_expectations}}

**Integration vs Unit Test Rules:**
{{test_boundary_patterns}}

Are there testing rules agents should always follow?&quot;

### 5. Code Quality &amp; Style Rules

Document critical style and quality rules:

**Linting/Formatting:**
&quot;Your code style configuration requires:

**ESLint/Prettier Rules:**
{{specific_linting_rules}}

**Code Organization:**
{{file_and_folder_structure_rules}}

**Naming Conventions:**
{{naming_patterns_agents_must_follow}}

**Documentation Requirements:**
{{comment_and_documentation_patterns}}

Any additional code quality rules?&quot;

### 6. Development Workflow Rules

Document workflow patterns that affect implementation:

**Git/Repository Rules:**
&quot;Your project uses these patterns:

**Branch Naming:**
{{branch_naming_conventions}}

**Commit Message Format:**
{{commit_message_patterns}}

**PR Requirements:**
{{pull_request_checklist}}

**Deployment Patterns:**
{{deployment_considerations}}

Should I document any other workflow rules?&quot;

### 7. Critical Don&#x27;t-Miss Rules

Identify rules that prevent common mistakes:

**Anti-Patterns to Avoid:**
&quot;Based on your codebase, here are critical things agents must NOT do:

{{critical_anti_patterns_with_examples}}

**Edge Cases:**
{{specific_edge_cases_agents_should_handle}}

**Security Rules:**
{{security_considerations_agents_must_follow}}

**Performance Gotchas:**
{{performance_patterns_to_avoid}}

Are there other &#x27;gotchas&#x27; agents should know about?&quot;

### 8. Generate Context Content

For each category, prepare lean content for the project context file:

#### Content Structure:

&#x60;&#x60;&#x60;markdown
## Technology Stack &amp; Versions

{{concise_technology_list_with_exact_versions}}

## Critical Implementation Rules

### Language-Specific Rules

{{bullet_points_of_critical_language_rules}}

### Framework-Specific Rules

{{bullet_points_of_framework_patterns}}

### Testing Rules

{{bullet_points_of_testing_requirements}}

### Code Quality &amp; Style Rules

{{bullet_points_of_style_and_quality_rules}}

### Development Workflow Rules

{{bullet_points_of_workflow_patterns}}

### Critical Don&#x27;t-Miss Rules

{{bullet_points_of_anti_patterns_and_edge_cases}}
&#x60;&#x60;&#x60;

### 9. Present Content and Menu

After each category, show the generated rules and present choices:

&quot;I&#x27;ve drafted the {{category_name}} rules for your project context.

**Here&#x27;s what I&#x27;ll add:**

[Show the complete markdown content for this category]

**What would you like to do?**
[A] Advanced Elicitation - Explore nuanced rules for this category
[P] Party Mode - Review from different implementation perspectives
[C] Continue - Save these rules and move to next category&quot;

### 10. Handle Menu Selection

#### If &#x27;A&#x27; (Advanced Elicitation):

- Execute advanced-elicitation.xml with current category rules
- Process enhanced rules that come back
- Ask user: &quot;Accept these enhanced rules for {{category}}? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;P&#x27; (Party Mode):

- Execute party-mode workflow with category rules context
- Process collaborative insights on implementation patterns
- Ask user: &quot;Accept these changes to {{category}} rules? (y/n)&quot;
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If &#x27;C&#x27; (Continue):

- Save the current category content to project context file
- Update frontmatter: &#x60;sections_completed: [...]&#x60;
- Proceed to next category or step-03 if complete

## APPEND TO PROJECT CONTEXT:

When user selects &#x27;C&#x27; for a category, append the content directly to &#x60;{output_folder}/project-context.md&#x60; using the structure from step 8.

## SUCCESS METRICS:

✅ All critical technology versions accurately documented
✅ Language-specific rules cover unobvious patterns
✅ Framework rules capture project-specific conventions
✅ Testing rules ensure consistent test quality
✅ Code quality rules maintain project standards
✅ Workflow rules prevent implementation conflicts
✅ Content is lean and optimized for LLM context
✅ A/P/C menu presented and handled correctly for each category

## FAILURE MODES:

❌ Including obvious rules that agents already know
❌ Making content too verbose for LLM context efficiency
❌ Missing critical anti-patterns or edge cases
❌ Not getting user validation for each rule category
❌ Not documenting exact versions and configurations
❌ Not presenting A/P/C menu after content generation

## NEXT STEP:

After completing all rule categories and user selects &#x27;C&#x27; for the final category, load &#x60;./step-03-complete.md&#x60; to finalize the project context file.

Remember: Do NOT proceed to step-03 until all categories are complete and user explicitly selects &#x27;C&#x27; for each!


# Step 3: Context Completion &amp; Finalization

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ✅ ALWAYS treat this as collaborative completion between technical peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on finalizing a lean, LLM-optimized project context
- 🎯 ENSURE all critical rules are captured and actionable
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 📝 Review and optimize content for LLM context efficiency
- 📖 Update frontmatter with completion status
- 🚫 NO MORE STEPS - this is the final step

## CONTEXT BOUNDARIES:

- All rule categories from step-2 are complete
- Technology stack and versions are documented
- Focus on final review, optimization, and completion
- Ensure the context file is ready for AI agent consumption

## YOUR TASK:

Complete the project context file, optimize it for LLM efficiency, and provide guidance for usage and maintenance.

## COMPLETION SEQUENCE:

### 1. Review Complete Context File

Read the entire project context file and analyze:

**Content Analysis:**

- Total length and readability for LLMs
- Clarity and specificity of rules
- Coverage of all critical areas
- Actionability of each rule

**Structure Analysis:**

- Logical organization of sections
- Consistency of formatting
- Absence of redundant or obvious information
- Optimization for quick scanning

### 2. Optimize for LLM Context

Ensure the file is lean and efficient:

**Content Optimization:**

- Remove any redundant rules or obvious information
- Combine related rules into concise bullet points
- Use specific, actionable language
- Ensure each rule provides unique value

**Formatting Optimization:**

- Use consistent markdown formatting
- Implement clear section hierarchy
- Ensure scannability with strategic use of bolding
- Maintain readability while maximizing information density

### 3. Final Content Structure

Ensure the final structure follows this optimized format:

&#x60;&#x60;&#x60;markdown
# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack &amp; Versions

{{concise_technology_list}}

## Critical Implementation Rules

### Language-Specific Rules

{{specific_language_rules}}

### Framework-Specific Rules

{{framework_patterns}}

### Testing Rules

{{testing_requirements}}

### Code Quality &amp; Style Rules

{{style_and_quality_patterns}}

### Development Workflow Rules

{{workflow_patterns}}

### Critical Don&#x27;t-Miss Rules

{{anti_patterns_and_edge_cases}}

---

## Usage Guidelines

**For AI Agents:**

- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Update this file if new patterns emerge

**For Humans:**

- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules
- Remove rules that become obvious over time

Last Updated: {{date}}
&#x60;&#x60;&#x60;

### 4. Present Completion Summary

Based on user skill level, present the completion:

**Expert Mode:**
&quot;Project context complete. Optimized for LLM consumption with {{rule_count}} critical rules across {{section_count}} sections.

File saved to: &#x60;{output_folder}/project-context.md&#x60;

Ready for AI agent integration.&quot;

**Intermediate Mode:**
&quot;Your project context is complete and optimized for AI agents!

**What we created:**

- {{rule_count}} critical implementation rules
- Technology stack with exact versions
- Framework-specific patterns and conventions
- Testing and quality guidelines
- Workflow and anti-pattern rules

**Key benefits:**

- AI agents will implement consistently with your standards
- Reduced context switching and implementation errors
- Clear guidance for unobvious project requirements

**Next steps:**

- AI agents should read this file before implementing
- Update as your project evolves
- Review periodically for optimization&quot;

**Beginner Mode:**
&quot;Excellent! Your project context guide is ready! 🎉

**What this does:**
Think of this as a &#x27;rules of the road&#x27; guide for AI agents working on your project. It ensures they all follow the same patterns and avoid common mistakes.

**What&#x27;s included:**

- Exact technology versions to use
- Critical coding rules they might miss
- Testing and quality standards
- Workflow patterns to follow

**How AI agents use it:**
They read this file before writing any code, ensuring everything they create follows your project&#x27;s standards perfectly.

Your project context is saved and ready to help agents implement consistently!&quot;

### 5. Final File Updates

Update the project context file with completion information:

**Frontmatter Update:**

&#x60;&#x60;&#x60;yaml
---
project_name: &#x27;{{project_name}}&#x27;
user_name: &#x27;{{user_name}}&#x27;
date: &#x27;{{date}}&#x27;
sections_completed:
  [&#x27;technology_stack&#x27;, &#x27;language_rules&#x27;, &#x27;framework_rules&#x27;, &#x27;testing_rules&#x27;, &#x27;quality_rules&#x27;, &#x27;workflow_rules&#x27;, &#x27;anti_patterns&#x27;]
status: &#x27;complete&#x27;
rule_count: { { total_rules } }
optimized_for_llm: true
---
&#x60;&#x60;&#x60;

**Add Usage Section:**
Append the usage guidelines from step 3 to complete the document.

### 6. Completion Validation

Final checks before completion:

**Content Validation:**
✅ All critical technology versions documented
✅ Language-specific rules are specific and actionable
✅ Framework rules cover project conventions
✅ Testing rules ensure consistency
✅ Code quality rules maintain standards
✅ Workflow rules prevent conflicts
✅ Anti-pattern rules prevent common mistakes

**Format Validation:**
✅ Content is lean and optimized for LLMs
✅ Structure is logical and scannable
✅ No redundant or obvious information
✅ Consistent formatting throughout

### 7. Completion Message

Present final completion to user:

&quot;✅ **Project Context Generation Complete!**

Your optimized project context file is ready at:
&#x60;{output_folder}/project-context.md&#x60;

**📊 Context Summary:**

- {{rule_count}} critical rules for AI agents
- {{section_count}} comprehensive sections
- Optimized for LLM context efficiency
- Ready for immediate agent integration

**🎯 Key Benefits:**

- Consistent implementation across all AI agents
- Reduced common mistakes and edge cases
- Clear guidance for project-specific patterns
- Minimal LLM context usage

**📋 Next Steps:**

1. AI agents will automatically read this file when implementing
2. Update this file when your technology stack or patterns evolve
3. Review quarterly to optimize and remove outdated rules

Your project context will help ensure high-quality, consistent implementation across all development work. Great work capturing your project&#x27;s critical implementation requirements!&quot;

## SUCCESS METRICS:

✅ Complete project context file with all critical rules
✅ Content optimized for LLM context efficiency
✅ All technology versions and patterns documented
✅ File structure is logical and scannable
✅ Usage guidelines included for agents and humans
✅ Frontmatter properly updated with completion status
✅ User provided with clear next steps and benefits

## FAILURE MODES:

❌ Final content is too verbose for LLM consumption
❌ Missing critical implementation rules or patterns
❌ Not optimizing content for agent readability
❌ Not providing clear usage guidelines
❌ Frontmatter not properly updated
❌ Not validating file completion before ending

## WORKFLOW COMPLETE:

This is the final step of the Generate Project Context workflow. The user now has a comprehensive, optimized project context file that will ensure consistent, high-quality implementation across all AI agents working on the project.

The project context file serves as the critical &quot;rules of the road&quot; that agents need to implement code consistently with the project&#x27;s standards and patterns.


---
name: bmad-help
description: "Get unstuck by showing what workflow steps come next or answering questions about what to do"
---

# Task: BMAD Help

## ROUTING RULES

- **Empty &#x60;phase&#x60; &#x3D; anytime** — Universal tools work regardless of workflow state
- **Numbered phases indicate sequence** — Phases like &#x60;1-discover&#x60; → &#x60;2-define&#x60; → &#x60;3-build&#x60; → &#x60;4-ship&#x60; flow in order (naming varies by module)
- **Stay in module** — Guide through the active module&#x27;s workflow based on phase+sequence ordering
- **Descriptions contain routing** — Read for alternate paths (e.g., &quot;back to previous if fixes needed&quot;)
- **&#x60;required&#x3D;true&#x60; blocks progress** — Required workflows must complete before proceeding to later phases
- **Artifacts reveal completion** — Search resolved output paths for &#x60;outputs&#x60; patterns, fuzzy-match found files to workflow rows

## DISPLAY RULES

### Command-Based Workflows
When &#x60;command&#x60; field has a value:
- Show the command prefixed with &#x60;/&#x60; (e.g., &#x60;/bmad-bmm-create-prd&#x60;)

### Agent-Based Workflows
When &#x60;command&#x60; field is empty:
- User loads agent first via &#x60;/agent-command&#x60;
- Then invokes by referencing the &#x60;code&#x60; field or describing the &#x60;name&#x60; field
- Do NOT show a slash command — show the code value and agent load instruction instead

Example presentation for empty command:
&#x60;&#x60;&#x60;
Explain Concept (EC)
Load: /tech-writer, then ask to &quot;EC about [topic]&quot;
Agent: Tech Writer
Description: Create clear technical explanations with examples...
&#x60;&#x60;&#x60;

## MODULE DETECTION

- **Empty &#x60;module&#x60; column** → universal tools (work across all modules)
- **Named &#x60;module&#x60;** → module-specific workflows

Detect the active module from conversation context, recent workflows, or user query keywords. If ambiguous, ask the user.

## INPUT ANALYSIS

Determine what was just completed:
- Explicit completion stated by user
- Workflow completed in current conversation
- Artifacts found matching &#x60;outputs&#x60; patterns
- If &#x60;index.md&#x60; exists, read it for additional context
- If still unclear, ask: &quot;What workflow did you most recently complete?&quot;

## EXECUTION

1. **Load catalog** — Load &#x60;{project-root}/_bmad/_config/bmad-help.csv&#x60;

2. **Resolve output locations** — Scan each folder under &#x60;_bmad/&#x60; (except &#x60;_config&#x60;) for &#x60;config.yaml&#x60;. For each workflow row, resolve its &#x60;output-location&#x60; variables against that module&#x27;s config so artifact paths can be searched.

3. **Detect active module** — Use MODULE DETECTION above

4. **Analyze input** — Task may provide a workflow name/code, conversational phrase, or nothing. Infer what was just completed using INPUT ANALYSIS above.

5. **Present recommendations** — Show next steps based on:
   - Completed workflows detected
   - Phase/sequence ordering (ROUTING RULES)
   - Artifact presence

   **Optional items first** — List optional workflows until a required step is reached
   **Required items next** — List the next required workflow

   For each item, apply DISPLAY RULES above and include:
   - Workflow **name**
   - **Command** OR **Code + Agent load instruction** (per DISPLAY RULES)
   - **Agent** title and display name from the CSV (e.g., &quot;🎨 Alex (Designer)&quot;)
   - Brief **description**

6. **Additional guidance to convey**:
   - Run each workflow in a **fresh context window**
   - For **validation workflows**: recommend using a different high-quality LLM if available
   - For conversational requests: match the user&#x27;s tone while presenting clearly

7. Return to the calling process after presenting recommendations.

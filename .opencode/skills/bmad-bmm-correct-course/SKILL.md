---
name: bmad-bmm-correct-course
description: "Navigate significant changes during sprint execution by analyzing impact, proposing solutions, and routing for implementation"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "correct-course"
  standalone: "false"
---

# correct-course Workflow

Navigate significant changes during sprint execution by analyzing impact, proposing solutions, and routing for implementation

**Author:** BMad Method

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 1: Initialize Change Navigation

**Actions:**
- Confirm change trigger and gather user description of the issue
- Ask: "What specific issue or change has been identified that requires navigation?"
- Verify access to required project documents:
- Ask user for mode preference:
- Store mode selection for use throughout workflow

### Step 2: Execute Change Analysis Checklist

**Actions:**
- Read fully and follow the systematic analysis from: {checklist}
- Work through each checklist section interactively with the user
- Record status for each checklist item:
- Maintain running notes of findings and impacts discovered
- Present checklist progress after each major section

### Step 3: Draft Specific Change Proposals

**Actions:**
- Based on checklist findings, create explicit edit proposals for each identified artifact
- For Story changes:
- For PRD modifications:
- For Architecture changes:
- For UI/UX specification updates:
- Present each edit proposal individually
- Iterate on each proposal based on user feedback

**Questions to ask:**
- Review and refine this change? Options: Approve [a], Edit [e], Skip [s]

### Step 4: Generate Sprint Change Proposal

**Actions:**
- Compile comprehensive Sprint Change Proposal document with following sections:
- Section 1: Issue Summary
- Section 2: Impact Analysis
- Section 3: Recommended Approach
- Section 4: Detailed Change Proposals
- Section 5: Implementation Handoff
- Present complete Sprint Change Proposal to user
- Write Sprint Change Proposal document to {default_output_file}

**Questions to ask:**
- Review complete proposal. Continue [c] or Edit [e]?

### Step 5: Finalize and Route for Implementation

**Actions:**
- Get explicit user approval for complete proposal
- Gather specific feedback on what needs adjustment
- Return to appropriate step to address concerns
- Finalize Sprint Change Proposal document
- Determine change scope classification:
- Provide appropriate handoff based on scope:
- Route to: Development team for direct implementation
- Deliverables: Finalized edit proposals and implementation tasks
- Route to: Product Owner / Scrum Master agents
- Deliverables: Sprint Change Proposal + backlog reorganization plan
- Route to: Product Manager / Solution Architect
- Deliverables: Complete Sprint Change Proposal + escalation notice
- Confirm handoff completion and next steps with user
- Document handoff in workflow execution log

**Questions to ask:**
- Do you approve this Sprint Change Proposal for implementation? (yes/no/revise)

### Step 6: Workflow Completion

**Actions:**
- Summarize workflow execution:
- Confirm all deliverables produced:
- Report workflow completion to user with personalized message: "✅ Correct Course workflow complete, {user_name}!"
- Remind user of success criteria and next steps for implementation team
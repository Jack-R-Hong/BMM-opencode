---
name: bmad-bmm-sprint-status
description: "Summarize sprint-status.yaml, surface risks, and route to the right implementation workflow."
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "sprint-status"
  standalone: false
---

# sprint-status Workflow

Summarize sprint-status.yaml, surface risks, and route to the right implementation workflow.

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 0: Determine execution mode

**Actions:**
- Set mode = {{mode}} if provided by caller; otherwise mode = "interactive"
- Jump to Step 20
- Jump to Step 30
- Continue to Step 1

### Step 1: Locate sprint status file

**Actions:**
- Try {sprint_status_file}
- Exit workflow
- Continue to Step 2

### Step 2: Read and parse sprint-status.yaml

**Actions:**
- Read the FULL file: {sprint_status_file}
- Parse fields: generated, project, project_key, tracking_system, story_location
- Parse development_status map. Classify keys:
- Map legacy story status "drafted" → "ready-for-dev"
- Count story statuses: backlog, ready-for-dev, in-progress, review, done
- Map legacy epic status "contexted" → "in-progress"
- Count epic statuses: backlog, in-progress, done
- Count retrospective statuses: optional, done
- Validate all statuses against known values:
- Update sprint-status.yaml with corrected values
- Re-parse the file with corrected statuses
- Detect risks:

**Questions to ask:**
- How should these be corrected?
  {{#each invalid_entries}}
  {{@index}}. {{key}}: "{{status}}" → [select valid status]
  {{/each}}

Enter corrections (e.g., "1=in-progress, 2=backlog") or "skip" to continue without fixing:

### Step 3: Select next action recommendation

**Actions:**
- Pick the next recommended workflow using priority:
- Store selected recommendation as: next_story_id, next_workflow_id, next_agent (SM/DEV as appropriate)

### Step 4: Display summary

### Step 5: Offer actions

**Actions:**
- Display the full contents of {sprint_status_file}
- Exit workflow

**Questions to ask:**
- Pick an option:
1) Run recommended workflow now
2) Show all stories grouped by status
3) Show raw sprint-status.yaml
4) Exit
Choice:

### Step 20: Data mode output

**Actions:**
- Load and parse {sprint_status_file} same as Step 2
- Compute recommendation same as Step 3
- Return to caller

### Step 30: Validate sprint-status file

**Actions:**
- Check that {sprint_status_file} exists
- Return
- Read and parse {sprint_status_file}
- Validate required metadata fields exist: generated, project, project_key, tracking_system, story_location
- Return
- Verify development_status section exists with at least one entry
- Return
- Validate all status values against known valid statuses:
- Return
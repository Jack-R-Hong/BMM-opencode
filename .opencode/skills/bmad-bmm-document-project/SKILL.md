---
name: bmad-bmm-document-project
description: "Analyzes and documents brownfield projects by scanning codebase, architecture, and patterns to create comprehensive reference documentation for AI-assisted development"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "document-project"
  standalone: false
---

# document-project Workflow

Analyzes and documents brownfield projects by scanning codebase, architecture, and patterns to create comprehensive reference documentation for AI-assisted development

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 1: Validate workflow and get project info

**Actions:**
- Set standalone_mode = true
- Set status_file_found = false
- Store {{status_file_path}} for later updates
- Set status_file_found = true
- Exit workflow
- Exit workflow

**Questions to ask:**
- Continue anyway to document planning artifacts? (y/n)
- Continue with documentation? (y/n)

### Step 2: Check for resumability and determine workflow mode

**Actions:**
- Check for existing state file at: {output_folder}/project-scan-report.json
- Read state file and extract: timestamps, mode, scan_level, current_step, completed_steps, project_classification
- Extract cached project_type_id(s) from state file if present
- Calculate age of state file (current time - last_updated)
- Set resume_mode = true
- Set workflow_mode = {{mode}}
- Load findings summaries from state file
- Load cached project_type_id(s) from state file
- For each cached project_type_id, load ONLY the corresponding row from: {documentation_requirements_csv}
- Skip loading project-types.csv and architecture_registry.csv (not needed on resume)
- Store loaded doc requirements for use in remaining steps
- Display: "Resuming {{workflow_mode}} from {{current_step}} with cached project type(s): {{cached_project_types}}"
- Read fully and follow: {installed_path}/workflows/deep-dive-instructions.md with resume context
- Read fully and follow: {installed_path}/workflows/full-scan-instructions.md with resume context
- Create archive directory: {output_folder}/.archive/
- Move old state file to: {output_folder}/.archive/project-scan-report-{{timestamp}}.json
- Set resume_mode = false
- Continue to Step 0.5
- Display: "Exiting workflow without changes."
- Exit workflow
- Display: "Found old state file (>24 hours). Starting fresh scan."
- Archive old state file to: {output_folder}/.archive/project-scan-report-{{timestamp}}.json
- Set resume_mode = false
- Continue to Step 0.5

**Questions to ask:**
- I found an in-progress workflow state from {{last_updated}}.

**Current Progress:**

- Mode: {{mode}}
- Scan Level: {{scan_level}}
- Completed Steps: {{completed_steps_count}}/{{total_steps}}
- Last Step: {{current_step}}
- Project Type(s): {{cached_project_types}}

Would you like to:

1. **Resume from where we left off** - Continue from step {{current_step}}
2. **Start fresh** - Archive old state and begin new scan
3. **Cancel** - Exit without changes

Your choice [1/2/3]:

### Step 4: Update status and complete
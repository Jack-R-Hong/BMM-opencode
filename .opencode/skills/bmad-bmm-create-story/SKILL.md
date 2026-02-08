---
name: bmad-bmm-create-story
description: "Create the next user story from epics+stories with enhanced context analysis and direct ready-for-dev marking"
---

name: create-story
description: &quot;Create the next user story from epics+stories with enhanced context analysis and direct ready-for-dev marking&quot;
author: &quot;BMad&quot;

# Critical variables from config
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
date: system-generated
planning_artifacts: &quot;{config_source}:planning_artifacts&quot;
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
output_folder: &quot;{implementation_artifacts}&quot;
story_dir: &quot;{implementation_artifacts}&quot;

# Workflow components
installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/create-story&quot;
template: &quot;{installed_path}/template.md&quot;
instructions: &quot;{installed_path}/instructions.xml&quot;
validation: &quot;{installed_path}/checklist.md&quot;

# Variables and inputs
variables:
  sprint_status: &quot;{implementation_artifacts}/sprint-status.yaml&quot; # Primary source for story tracking
  epics_file: &quot;{planning_artifacts}/epics.md&quot; # Enhanced epics+stories with BDD and source hints
  prd_file: &quot;{planning_artifacts}/prd.md&quot; # Fallback for requirements (if not in epics file)
  architecture_file: &quot;{planning_artifacts}/architecture.md&quot; # Fallback for constraints (if not in epics file)
  ux_file: &quot;{planning_artifacts}/*ux*.md&quot; # Fallback for UX requirements (if not in epics file)
  story_title: &quot;&quot; # Will be elicited if not derivable

# Project context
project_context: &quot;**/project-context.md&quot;

default_output_file: &quot;{story_dir}/{{story_key}}.md&quot;

# Smart input file references - Simplified for enhanced approach
# The epics+stories file should contain everything needed with source hints
input_file_patterns:
  prd:
    description: &quot;PRD (fallback - epics file should have most content)&quot;
    whole: &quot;{planning_artifacts}/*prd*.md&quot;
    sharded: &quot;{planning_artifacts}/*prd*/*.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot; # Only load if needed
  architecture:
    description: &quot;Architecture (fallback - epics file should have relevant sections)&quot;
    whole: &quot;{planning_artifacts}/*architecture*.md&quot;
    sharded: &quot;{planning_artifacts}/*architecture*/*.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot; # Only load if needed
  ux:
    description: &quot;UX design (fallback - epics file should have relevant sections)&quot;
    whole: &quot;{planning_artifacts}/*ux*.md&quot;
    sharded: &quot;{planning_artifacts}/*ux*/*.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot; # Only load if needed
  epics:
    description: &quot;Enhanced epics+stories file with BDD and source hints&quot;
    whole: &quot;{planning_artifacts}/*epic*.md&quot;
    sharded: &quot;{planning_artifacts}/*epic*/*.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot; # Only load needed epic

## Template

# Story {{epic_num}}.{{story_num}}: {{story_title}}

Status: ready-for-dev

&lt;!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. --&gt;

## Story

As a {{role}},
I want {{action}},
so that {{benefit}}.

## Acceptance Criteria

1. [Add acceptance criteria from epics/PRD]

## Tasks / Subtasks

- [ ] Task 1 (AC: #)
  - [ ] Subtask 1.1
- [ ] Task 2 (AC: #)
  - [ ] Subtask 2.1

## Dev Notes

- Relevant architecture patterns and constraints
- Source tree components to touch
- Testing standards summary

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
- Detected conflicts or variances (with rationale)

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/&lt;file&gt;.md#Section]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List


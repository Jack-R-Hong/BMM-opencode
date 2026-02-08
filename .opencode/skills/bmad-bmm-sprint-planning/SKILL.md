---
name: bmad-bmm-sprint-planning
description: Generate and manage the sprint status tracking file for Phase 4 implementation, extracting all epics and stories from epic files and tracking their status through the development lifecycle
---

name: sprint-planning
description: &quot;Generate and manage the sprint status tracking file for Phase 4 implementation, extracting all epics and stories from epic files and tracking their status through the development lifecycle&quot;
author: &quot;BMad&quot;

# Critical variables from config
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
date: system-generated
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
planning_artifacts: &quot;{config_source}:planning_artifacts&quot;
output_folder: &quot;{implementation_artifacts}&quot;

# Workflow components
installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/sprint-planning&quot;
instructions: &quot;{installed_path}/instructions.md&quot;
template: &quot;{installed_path}/sprint-status-template.yaml&quot;
validation: &quot;{installed_path}/checklist.md&quot;

# Variables and inputs
variables:
  # Project context
  project_context: &quot;**/project-context.md&quot;
  # Project identification
  project_name: &quot;{config_source}:project_name&quot;

  # Tracking system configuration
  tracking_system: &quot;file-system&quot; # Options: file-system, Future will support other options from config of mcp such as jira, linear, trello
  project_key: &quot;NOKEY&quot; # Placeholder for tracker integrations; file-system uses a no-op key
  story_location: &quot;{config_source}:implementation_artifacts&quot; # Relative path for file-system, Future will support URL for Jira/Linear/Trello
  story_location_absolute: &quot;{config_source}:implementation_artifacts&quot; # Absolute path for file operations

  # Source files (file-system only)
  epics_location: &quot;{planning_artifacts}&quot; # Directory containing epic*.md files
  epics_pattern: &quot;epic*.md&quot; # Pattern to find epic files

  # Output configuration
  status_file: &quot;{implementation_artifacts}/sprint-status.yaml&quot;

# Smart input file references - handles both whole docs and sharded docs
# Priority: Whole document first, then sharded version
# Strategy: FULL LOAD - sprint planning needs ALL epics to build complete status
input_file_patterns:
  epics:
    description: &quot;All epics with user stories&quot;
    whole: &quot;{output_folder}/*epic*.md&quot;
    sharded: &quot;{output_folder}/*epic*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;

# Output configuration
default_output_file: &quot;{status_file}&quot;

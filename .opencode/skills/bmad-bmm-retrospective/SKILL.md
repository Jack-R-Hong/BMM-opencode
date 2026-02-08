---
name: bmad-bmm-retrospective
description: "Run after epic completion to review overall success, extract lessons learned, and explore if new information emerged that might impact the next epic"
---

# Retrospective - Epic Completion Review Workflow
name: &quot;retrospective&quot;
description: &quot;Run after epic completion to review overall success, extract lessons learned, and explore if new information emerged that might impact the next epic&quot;
author: &quot;BMad&quot;

config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
output_folder: &quot;{config_source}:implementation_artifacts}&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
user_skill_level: &quot;{config_source}:user_skill_level&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
date: system-generated
planning_artifacts: &quot;{config_source}:planning_artifacts&quot;
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;

installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/retrospective&quot;
template: false
instructions: &quot;{installed_path}/instructions.md&quot;

required_inputs:
  - agent_manifest: &quot;{project-root}/_bmad/_config/agent-manifest.csv&quot;

# Smart input file references - handles both whole docs and sharded docs
# Priority: Whole document first, then sharded version
# Strategy: SELECTIVE LOAD - only load the completed epic and relevant retrospectives
input_file_patterns:
  epics:
    description: &quot;The completed epic for retrospective&quot;
    whole: &quot;{planning_artifacts}/*epic*.md&quot;
    sharded_index: &quot;{planning_artifacts}/*epic*/index.md&quot;
    sharded_single: &quot;{planning_artifacts}/*epic*/epic-{{epic_num}}.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot;
  previous_retrospective:
    description: &quot;Previous epic&#x27;s retrospective (optional)&quot;
    pattern: &quot;{implementation_artifacts}/**/epic-{{prev_epic_num}}-retro-*.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot;
  architecture:
    description: &quot;System architecture for context&quot;
    whole: &quot;{planning_artifacts}/*architecture*.md&quot;
    sharded: &quot;{planning_artifacts}/*architecture*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  prd:
    description: &quot;Product requirements for context&quot;
    whole: &quot;{planning_artifacts}/*prd*.md&quot;
    sharded: &quot;{planning_artifacts}/*prd*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  document_project:
    description: &quot;Brownfield project documentation (optional)&quot;
    sharded: &quot;{planning_artifacts}/*.md&quot;
    load_strategy: &quot;INDEX_GUIDED&quot;

# Required files
sprint_status_file: &quot;{implementation_artifacts}/sprint-status.yaml&quot;
story_directory: &quot;{implementation_artifacts}&quot;
retrospectives_folder: &quot;{implementation_artifacts}&quot;

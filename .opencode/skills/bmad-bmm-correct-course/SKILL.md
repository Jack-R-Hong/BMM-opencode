---
name: bmad-bmm-correct-course
description: "Navigate significant changes during sprint execution by analyzing impact, proposing solutions, and routing for implementation"
---

# Correct Course - Sprint Change Management Workflow
name: &quot;correct-course&quot;
description: &quot;Navigate significant changes during sprint execution by analyzing impact, proposing solutions, and routing for implementation&quot;
author: &quot;BMad Method&quot;

config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
user_skill_level: &quot;{config_source}:user_skill_level&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
date: system-generated
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
planning_artifacts: &quot;{config_source}:planning_artifacts&quot;
project_knowledge: &quot;{config_source}:project_knowledge&quot;
output_folder: &quot;{implementation_artifacts}&quot;
sprint_status: &quot;{implementation_artifacts}/sprint-status.yaml&quot;

# Smart input file references - handles both whole docs and sharded docs
# Priority: Whole document first, then sharded version
# Strategy: Load project context for impact analysis
input_file_patterns:
  prd:
    description: &quot;Product requirements for impact analysis&quot;
    whole: &quot;{planning_artifacts}/*prd*.md&quot;
    sharded: &quot;{planning_artifacts}/*prd*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  epics:
    description: &quot;All epics to analyze change impact&quot;
    whole: &quot;{planning_artifacts}/*epic*.md&quot;
    sharded: &quot;{planning_artifacts}/*epic*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  architecture:
    description: &quot;System architecture and decisions&quot;
    whole: &quot;{planning_artifacts}/*architecture*.md&quot;
    sharded: &quot;{planning_artifacts}/*architecture*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  ux_design:
    description: &quot;UX design specification (if UI impacts)&quot;
    whole: &quot;{planning_artifacts}/*ux*.md&quot;
    sharded: &quot;{planning_artifacts}/*ux*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  tech_spec:
    description: &quot;Technical specification&quot;
    whole: &quot;{planning_artifacts}/*tech-spec*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  document_project:
    description: &quot;Brownfield project documentation (optional)&quot;
    sharded: &quot;{project_knowledge}/index.md&quot;
    load_strategy: &quot;INDEX_GUIDED&quot;

installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/correct-course&quot;
template: false
instructions: &quot;{installed_path}/instructions.md&quot;
validation: &quot;{installed_path}/checklist.md&quot;
checklist: &quot;{installed_path}/checklist.md&quot;
default_output_file: &quot;{planning_artifacts}/sprint-change-proposal-{date}.md&quot;

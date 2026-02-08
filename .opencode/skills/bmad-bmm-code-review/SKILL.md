---
name: bmad-bmm-code-review
description: Perform an ADVERSARIAL Senior Developer code review that finds 3-10 specific problems in every story. Challenges everything: code quality, test coverage, architecture compliance, security, performance. NEVER accepts &#x60;looks good&#x60; - must find minimum issues and can auto-fix with user approval.
---

# Review Story Workflow
name: code-review
description: &quot;Perform an ADVERSARIAL Senior Developer code review that finds 3-10 specific problems in every story. Challenges everything: code quality, test coverage, architecture compliance, security, performance. NEVER accepts &#x60;looks good&#x60; - must find minimum issues and can auto-fix with user approval.&quot;
author: &quot;BMad&quot;

# Critical variables from config
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
user_skill_level: &quot;{config_source}:user_skill_level&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
date: system-generated
planning_artifacts: &quot;{config_source}:planning_artifacts&quot;
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
output_folder: &quot;{implementation_artifacts}&quot;
sprint_status: &quot;{implementation_artifacts}/sprint-status.yaml&quot;

# Workflow components
installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/code-review&quot;
instructions: &quot;{installed_path}/instructions.xml&quot;
validation: &quot;{installed_path}/checklist.md&quot;
template: false

variables:
  # Project context
  project_context: &quot;**/project-context.md&quot;
  story_dir: &quot;{implementation_artifacts}&quot;

# Smart input file references - handles both whole docs and sharded docs
# Priority: Whole document first, then sharded version
# Strategy: SELECTIVE LOAD - only load the specific epic needed for this story review
input_file_patterns:
  architecture:
    description: &quot;System architecture for review context&quot;
    whole: &quot;{planning_artifacts}/*architecture*.md&quot;
    sharded: &quot;{planning_artifacts}/*architecture*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  ux_design:
    description: &quot;UX design specification (if UI review)&quot;
    whole: &quot;{planning_artifacts}/*ux*.md&quot;
    sharded: &quot;{planning_artifacts}/*ux*/*.md&quot;
    load_strategy: &quot;FULL_LOAD&quot;
  epics:
    description: &quot;Epic containing story being reviewed&quot;
    whole: &quot;{planning_artifacts}/*epic*.md&quot;
    sharded_index: &quot;{planning_artifacts}/*epic*/index.md&quot;
    sharded_single: &quot;{planning_artifacts}/*epic*/epic-{{epic_num}}.md&quot;
    load_strategy: &quot;SELECTIVE_LOAD&quot;

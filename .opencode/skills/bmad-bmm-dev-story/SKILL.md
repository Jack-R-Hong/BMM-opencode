---
name: bmad-bmm-dev-story
description: Execute a story by implementing tasks/subtasks, writing tests, validating, and updating the story file per acceptance criteria
---

name: dev-story
description: &quot;Execute a story by implementing tasks/subtasks, writing tests, validating, and updating the story file per acceptance criteria&quot;
author: &quot;BMad&quot;

# Critical variables from config
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
output_folder: &quot;{config_source}:output_folder&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
user_skill_level: &quot;{config_source}:user_skill_level&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
story_dir: &quot;{config_source}:implementation_artifacts&quot;
date: system-generated

# Workflow components
installed_path: &quot;{project-root}/_bmad/bmm/workflows/4-implementation/dev-story&quot;
instructions: &quot;{installed_path}/instructions.xml&quot;
validation: &quot;{installed_path}/checklist.md&quot;

story_file: &quot;&quot; # Explicit story path; auto-discovered if empty
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
sprint_status: &quot;{implementation_artifacts}/sprint-status.yaml&quot;
project_context: &quot;**/project-context.md&quot;

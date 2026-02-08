---
name: bmad-bmm-document-project
description: Analyzes and documents brownfield projects by scanning codebase, architecture, and patterns to create comprehensive reference documentation for AI-assisted development
---

# Document Project Workflow Configuration
name: &quot;document-project&quot;
version: &quot;1.2.0&quot;
description: &quot;Analyzes and documents brownfield projects by scanning codebase, architecture, and patterns to create comprehensive reference documentation for AI-assisted development&quot;
author: &quot;BMad&quot;

# Critical variables
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
output_folder: &quot;{config_source}:project_knowledge&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
user_skill_level: &quot;{config_source}:user_skill_level&quot;
date: system-generated

# Module path and component files
installed_path: &quot;{project-root}/_bmad/bmm/workflows/document-project&quot;
instructions: &quot;{installed_path}/instructions.md&quot;
validation: &quot;{installed_path}/checklist.md&quot;

# Required data files - CRITICAL for project type detection and documentation requirements
documentation_requirements_csv: &quot;{installed_path}/documentation-requirements.csv&quot;

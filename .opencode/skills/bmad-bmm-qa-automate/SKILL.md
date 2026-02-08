---
name: bmad-bmm-qa-automate
description: "Generate tests quickly for existing features using standard test patterns"
---

# Quinn QA workflow: Automate
name: qa-automate
description: &quot;Generate tests quickly for existing features using standard test patterns&quot;
author: &quot;BMad&quot;

# Critical variables from config
config_source: &quot;{project-root}/_bmad/bmm/config.yaml&quot;
output_folder: &quot;{config_source}:output_folder&quot;
implementation_artifacts: &quot;{config_source}:implementation_artifacts&quot;
user_name: &quot;{config_source}:user_name&quot;
communication_language: &quot;{config_source}:communication_language&quot;
document_output_language: &quot;{config_source}:document_output_language&quot;
date: system-generated

# Workflow components
installed_path: &quot;{project-root}/_bmad/bmm/workflows/qa/automate&quot;
instructions: &quot;{installed_path}/instructions.md&quot;
validation: &quot;{installed_path}/checklist.md&quot;
template: false

# Variables and inputs
variables:
  # Directory paths
  test_dir: &quot;{project-root}/tests&quot; # Root test directory
  source_dir: &quot;{project-root}&quot; # Source code directory

# Output configuration
default_output_file: &quot;{implementation_artifacts}/tests/test-summary.md&quot;

# Required tools
required_tools:
  - read_file # Read source code and existing tests
  - write_file # Create test files
  - create_directory # Create test directories
  - list_files # Discover features
  - search_repo # Find patterns
  - glob # Find files

tags:
  - qa
  - automation
  - testing

execution_hints:
  interactive: false
  autonomous: true
  iterative: false

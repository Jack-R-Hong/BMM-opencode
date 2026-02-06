---
name: bmad-tea-testarch-automate
description: "Expand test automation coverage after implementation or analyze existing codebase to generate comprehensive test suite"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "tea"
  workflow: "testarch-automate"
  standalone: "false"
---

# testarch-automate Workflow

Expand test automation coverage after implementation or analyze existing codebase to generate comprehensive test suite

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Instructions

<!-- Powered by BMAD-CORE™ -->

# Test Automation Expansion

**Workflow ID**: `_bmad/tea/testarch/automate`
**Version**: 5.0 (Step-File Architecture)

---

## Overview

Expands test automation coverage by generating prioritized tests at the appropriate level (E2E, API, Component, Unit) with supporting fixtures and helpers.

Modes:

- **BMad-Integrated**: Uses story/PRD/test-design artifacts when available
- **Standalone**: Analyzes existing codebase without BMad artifacts

---

## WORKFLOW ARCHITECTURE

This workflow uses **step-file architecture** for disciplined execution:

- **Micro-file Design**: Each step is self-contained
- **JIT Loading**: Only the current step file is in memory
- **Sequential Enforcement**: Execute steps in order without skipping

---

## INITIALIZATION SEQUENCE

### 1. Configuration Loading

From `workflow.yaml`, resolve:

- `config_source`, `output_folder`, `user_name`, `communication_language`, `document_output_language`, `date`
- `test_dir`, `source_dir`, `coverage_target`, `standalone_mode`

### 2. First Step

Load, read completely, and execute:
`{project-root}/_bmad/tea/workflows/testarch/automate/steps-c/step-01-preflight-and-context.md`
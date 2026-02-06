---
name: bmad-tea-testarch-trace
description: "Generate requirements-to-tests traceability matrix, analyze coverage, and make quality gate decision (PASS/CONCERNS/FAIL/WAIVED)"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "tea"
  workflow: "testarch-trace"
  standalone: "false"
---

# testarch-trace Workflow

Generate requirements-to-tests traceability matrix, analyze coverage, and make quality gate decision (PASS/CONCERNS/FAIL/WAIVED)

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Instructions

# Requirements Traceability & Quality Gate

**Workflow:** `testarch-trace`
**Version:** 5.0 (Step-File Architecture)

---

## Overview

Create a requirements-to-tests traceability matrix, analyze coverage gaps, and optionally make a gate decision (PASS/CONCERNS/FAIL/WAIVED) based on evidence.

---

## WORKFLOW ARCHITECTURE

This workflow uses **step-file architecture**:

- **Micro-file Design**: Each step is self-contained
- **JIT Loading**: Only the current step file is in memory
- **Sequential Enforcement**: Execute steps in order

---

## INITIALIZATION SEQUENCE

### 1. Configuration Loading

From `workflow.yaml`, resolve:

- `config_source`, `output_folder`, `user_name`, `communication_language`, `document_output_language`, `date`
- `test_dir`, `source_dir`, `coverage_levels`, `gate_type`, `decision_mode`

### 2. First Step

Load, read completely, and execute:
`{project-root}/_bmad/tea/workflows/testarch/trace/steps-c/step-01-load-context.md`
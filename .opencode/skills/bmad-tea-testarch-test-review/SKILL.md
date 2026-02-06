---
name: bmad-tea-testarch-test-review
description: "Review test quality using comprehensive knowledge base and best practices validation"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "tea"
  workflow: "testarch-test-review"
  standalone: false
---

# testarch-test-review Workflow

Review test quality using comprehensive knowledge base and best practices validation

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Instructions

# Test Quality Review

**Workflow:** `testarch-test-review`
**Version:** 5.0 (Step-File Architecture)

---

## Overview

Review test quality using TEA knowledge base and produce a 0–100 quality score with actionable findings.

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
- `test_dir`, `review_scope`

### 2. First Step

Load, read completely, and execute:
`{project-root}/_bmad/tea/workflows/testarch/test-review/steps-c/step-01-load-context.md`
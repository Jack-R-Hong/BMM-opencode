---
name: bmad-bmm-sprint-planning
description: "Generate and manage the sprint status tracking file for Phase 4 implementation, extracting all epics and stories from epic files and tracking their status through the development lifecycle"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "sprint-planning"
  standalone: false
---

# sprint-planning Workflow

Generate and manage the sprint status tracking file for Phase 4 implementation, extracting all epics and stories from epic files and tracking their status through the development lifecycle

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 1: Parse epic files and extract all work items

**Actions:**
- Communicate in {communication_language} with {user_name}
- Look for all files matching `{epics_pattern}` in {epics_location}
- Could be a single `epics.md` file or multiple `epic-1.md`, `epic-2.md` files
- For each epic file found, extract:
- Build complete inventory of all epics and stories from all epic files

### Step 2: Build sprint status structure

**Actions:**
- For each epic found, create entries in this order:

### Step 3: Apply intelligent status detection

**Actions:**
- For each story, detect current status by checking files:

### Step 4: Generate sprint status file

**Actions:**
- Create or update {status_file} with:
- Write the complete sprint status YAML to {status_file}
- CRITICAL: Metadata appears TWICE - once as comments (#) for documentation, once as YAML key:value fields for parsing
- Ensure all items are ordered: epic, its stories, its retrospective, next epic...

### Step 5: Validate and report

**Actions:**
- Perform validation checks:
- Count totals:
- Display completion summary to {user_name} in {communication_language}:
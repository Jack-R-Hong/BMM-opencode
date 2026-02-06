---
name: bmad-core-task-index-docs
description: "Generates or updates an index.md of all documents in the specified directory"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "core"
  task: "index-docs"
  standalone: true
---

# Index Docs

Generates or updates an index.md of all documents in the specified directory

## Instructions

MANDATORY: Execute ALL steps in the flow section IN EXACT ORDER
DO NOT skip steps or change the sequence
HALT immediately when halt-conditions are met
Each action xml tag within step xml tag is a REQUIRED action to complete that step
Sections outside flow (validation, output, critical-context) provide essential context - review and apply throughout execution
List all files and subdirectories in the target location
Organize files by type, purpose, or subdirectory
Read each file to understand its actual purpose and create brief (3-10 word) descriptions based on the content, not just the
filename
Write or update index.md with organized file listings
# Directory Index
## Files
- **[filename.ext](./filename.ext)** - Brief description
- **[another-file.ext](./another-file.ext)** - Brief description
## Subdirectories
### subfolder/
- **[file1.ext](./subfolder/file1.ext)** - Brief description
- **[file2.ext](./subfolder/file2.ext)** - Brief description
### another-folder/
- **[file3.ext](./another-folder/file3.ext)** - Brief description
HALT if target directory does not exist or is inaccessible
HALT if user does not have write permissions to create index.md
Use relative paths starting with ./
Group similar files together
Read file contents to generate accurate descriptions - don't guess from filenames
Keep descriptions concise but informative (3-10 words)
Sort alphabetically within groups
Skip hidden files (starting with .) unless specified
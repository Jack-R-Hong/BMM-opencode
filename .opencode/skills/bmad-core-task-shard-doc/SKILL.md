---
name: bmad-core-task-shard-doc
description: "Splits large markdown documents into smaller, organized files based on level 2 (default) sections"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "core"
  task: "shard-doc"
  standalone: "true"
---

# Shard Document

Splits large markdown documents into smaller, organized files based on level 2 (default) sections

## Instructions

Split large markdown documents into smaller, organized files based on level 2 sections using @kayvan/markdown-tree-parser tool
MANDATORY: Execute ALL steps in the flow section IN EXACT ORDER
DO NOT skip steps or change the sequence
HALT immediately when halt-conditions are met
Each action xml tag within step xml tag is a REQUIRED action to complete that step
Sections outside flow (validation, output, critical-context) provide essential context - review and apply throughout execution
Uses `npx @kayvan/markdown-tree-parser` to automatically shard documents by level 2 headings and generate an index
- Ask user for the source document path if not provided already
- Verify file exists and is accessible
- Verify file is markdown format (.md extension)
HALT with error message
- Determine default destination: same location as source file, folder named after source file without .md extension
- Example: /path/to/architecture.md → /path/to/architecture/
- Ask user for the destination folder path ([y] to confirm use of default: [suggested-path], else enter a new path)
Use the suggested destination path
Use the custom destination path
- Verify destination folder exists or can be created
- Check write permissions for destination
HALT with error message
- Inform user that sharding is beginning
- Execute command: `npx @kayvan/markdown-tree-parser explode [source-document] [destination-folder]`
- Capture command output and any errors
HALT and display error to user
- Check that destination folder contains sharded files
- Verify index.md was created in destination folder
- Count the number of files created
HALT with error message
- Display completion report to user including:
- Source document path and name
- Destination folder path
- Number of section files created
- Confirmation that index.md was created
- Any tool output or warnings
- Inform user that sharding completed successfully
Keeping both the original and sharded versions defeats the purpose of sharding and can cause confusion
- Present user with options for the original document:
What would you like to do with the original document `[source-document-name]`?
Options:
[d] Delete - Remove the original (recommended - shards can always be recombined)
[m] Move to archive - Move original to a backup/archive location
[k] Keep - Leave original in place (NOT recommended - defeats sharding purpose)
Your choice (d/m/k):
- Delete the original source document file
- Confirm deletion to user: "✓ Original document deleted: [source-document-path]"
The document can be reconstructed from shards by concatenating all section files in order
- Determine default archive location: same directory as source, in an "archive" subfolder
- Example: /path/to/architecture.md → /path/to/archive/architecture.md
Archive location ([y] to use default: [default-archive-path], or provide custom path):
Use default archive path
Use custom archive path
- Create archive directory if it doesn't exist
- Move original document to archive location
- Confirm move to user: "✓ Original document moved to: [archive-path]"
- Display warning to user:
⚠️ WARNING: Keeping both original and sharded versions is NOT recommended.
This creates confusion because:
- The discover_inputs protocol may load the wrong version
- Updates to one won't reflect in the other
- You'll have duplicate content taking up space
Consider deleting or archiving the original document.
- Confirm user choice: "Original document kept at: [source-document-path]"
HALT if npx command fails or produces no output files
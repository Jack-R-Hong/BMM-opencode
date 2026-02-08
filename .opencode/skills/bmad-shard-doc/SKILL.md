---
name: bmad-shard-doc
description: Splits large markdown documents into smaller, organized files based on level 2 (default) sections
---

&lt;task id&#x3D;&quot;_bmad/core/tasks/shard-doc&quot; name&#x3D;&quot;Shard Document&quot;
  description&#x3D;&quot;Splits large markdown documents into smaller, organized files based on level 2 (default) sections&quot;&gt;
  &lt;objective&gt;Split large markdown documents into smaller, organized files based on level 2 sections using @kayvan/markdown-tree-parser tool&lt;/objective&gt;

  &lt;llm critical&#x3D;&quot;true&quot;&gt;
    &lt;i&gt;MANDATORY: Execute ALL steps in the flow section IN EXACT ORDER&lt;/i&gt;
    &lt;i&gt;DO NOT skip steps or change the sequence&lt;/i&gt;
    &lt;i&gt;HALT immediately when halt-conditions are met&lt;/i&gt;
    &lt;i&gt;Each action xml tag within step xml tag is a REQUIRED action to complete that step&lt;/i&gt;
    &lt;i&gt;Sections outside flow (validation, output, critical-context) provide essential context - review and apply throughout execution&lt;/i&gt;
  &lt;/llm&gt;

  &lt;critical-context&gt;
    &lt;i&gt;Uses &#x60;npx @kayvan/markdown-tree-parser&#x60; to automatically shard documents by level 2 headings and generate an index&lt;/i&gt;
  &lt;/critical-context&gt;

  &lt;flow&gt;
    &lt;step n&#x3D;&quot;1&quot; title&#x3D;&quot;Get Source Document&quot;&gt;
      &lt;action&gt;Ask user for the source document path if not provided already&lt;/action&gt;
      &lt;action&gt;Verify file exists and is accessible&lt;/action&gt;
      &lt;action&gt;Verify file is markdown format (.md extension)&lt;/action&gt;
      &lt;action if&#x3D;&quot;file not found or not markdown&quot;&gt;HALT with error message&lt;/action&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;2&quot; title&#x3D;&quot;Get Destination Folder&quot;&gt;
      &lt;action&gt;Determine default destination: same location as source file, folder named after source file without .md extension&lt;/action&gt;
      &lt;action&gt;Example: /path/to/architecture.md → /path/to/architecture/&lt;/action&gt;
      &lt;action&gt;Ask user for the destination folder path ([y] to confirm use of default: [suggested-path], else enter a new path)&lt;/action&gt;
      &lt;action if&#x3D;&quot;user accepts default&quot;&gt;Use the suggested destination path&lt;/action&gt;
      &lt;action if&#x3D;&quot;user provides custom path&quot;&gt;Use the custom destination path&lt;/action&gt;
      &lt;action&gt;Verify destination folder exists or can be created&lt;/action&gt;
      &lt;action&gt;Check write permissions for destination&lt;/action&gt;
      &lt;action if&#x3D;&quot;permission denied&quot;&gt;HALT with error message&lt;/action&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;3&quot; title&#x3D;&quot;Execute Sharding&quot;&gt;
      &lt;action&gt;Inform user that sharding is beginning&lt;/action&gt;
      &lt;action&gt;Execute command: &#x60;npx @kayvan/markdown-tree-parser explode [source-document] [destination-folder]&#x60;&lt;/action&gt;
      &lt;action&gt;Capture command output and any errors&lt;/action&gt;
      &lt;action if&#x3D;&quot;command fails&quot;&gt;HALT and display error to user&lt;/action&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;4&quot; title&#x3D;&quot;Verify Output&quot;&gt;
      &lt;action&gt;Check that destination folder contains sharded files&lt;/action&gt;
      &lt;action&gt;Verify index.md was created in destination folder&lt;/action&gt;
      &lt;action&gt;Count the number of files created&lt;/action&gt;
      &lt;action if&#x3D;&quot;no files created&quot;&gt;HALT with error message&lt;/action&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;5&quot; title&#x3D;&quot;Report Completion&quot;&gt;
      &lt;action&gt;Display completion report to user including:&lt;/action&gt;
      &lt;i&gt;- Source document path and name&lt;/i&gt;
      &lt;i&gt;- Destination folder path&lt;/i&gt;
      &lt;i&gt;- Number of section files created&lt;/i&gt;
      &lt;i&gt;- Confirmation that index.md was created&lt;/i&gt;
      &lt;i&gt;- Any tool output or warnings&lt;/i&gt;
      &lt;action&gt;Inform user that sharding completed successfully&lt;/action&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;6&quot; title&#x3D;&quot;Handle Original Document&quot;&gt;
      &lt;critical&gt;Keeping both the original and sharded versions defeats the purpose of sharding and can cause confusion&lt;/critical&gt;
      &lt;action&gt;Present user with options for the original document:&lt;/action&gt;

      &lt;ask&gt;What would you like to do with the original document &#x60;[source-document-name]&#x60;?

        Options:
        [d] Delete - Remove the original (recommended - shards can always be recombined)
        [m] Move to archive - Move original to a backup/archive location
        [k] Keep - Leave original in place (NOT recommended - defeats sharding purpose)

        Your choice (d/m/k):&lt;/ask&gt;

      &lt;check if&#x3D;&quot;user selects &#x27;d&#x27; (delete)&quot;&gt;
        &lt;action&gt;Delete the original source document file&lt;/action&gt;
        &lt;action&gt;Confirm deletion to user: &quot;✓ Original document deleted: [source-document-path]&quot;&lt;/action&gt;
        &lt;note&gt;The document can be reconstructed from shards by concatenating all section files in order&lt;/note&gt;
      &lt;/check&gt;

      &lt;check if&#x3D;&quot;user selects &#x27;m&#x27; (move)&quot;&gt;
        &lt;action&gt;Determine default archive location: same directory as source, in an &quot;archive&quot; subfolder&lt;/action&gt;
        &lt;action&gt;Example: /path/to/architecture.md → /path/to/archive/architecture.md&lt;/action&gt;
        &lt;ask&gt;Archive location ([y] to use default: [default-archive-path], or provide custom path):&lt;/ask&gt;
        &lt;action if&#x3D;&quot;user accepts default&quot;&gt;Use default archive path&lt;/action&gt;
        &lt;action if&#x3D;&quot;user provides custom path&quot;&gt;Use custom archive path&lt;/action&gt;
        &lt;action&gt;Create archive directory if it doesn&#x27;t exist&lt;/action&gt;
        &lt;action&gt;Move original document to archive location&lt;/action&gt;
        &lt;action&gt;Confirm move to user: &quot;✓ Original document moved to: [archive-path]&quot;&lt;/action&gt;
      &lt;/check&gt;

      &lt;check if&#x3D;&quot;user selects &#x27;k&#x27; (keep)&quot;&gt;
        &lt;action&gt;Display warning to user:&lt;/action&gt;
        &lt;output&gt;⚠️ WARNING: Keeping both original and sharded versions is NOT recommended.

          This creates confusion because:
          - The discover_inputs protocol may load the wrong version
          - Updates to one won&#x27;t reflect in the other
          - You&#x27;ll have duplicate content taking up space

          Consider deleting or archiving the original document.&lt;/output&gt;
        &lt;action&gt;Confirm user choice: &quot;Original document kept at: [source-document-path]&quot;&lt;/action&gt;
      &lt;/check&gt;
    &lt;/step&gt;
  &lt;/flow&gt;

  &lt;halt-conditions critical&#x3D;&quot;true&quot;&gt;
    &lt;i&gt;HALT if npx command fails or produces no output files&lt;/i&gt;
  &lt;/halt-conditions&gt;
&lt;/task&gt;

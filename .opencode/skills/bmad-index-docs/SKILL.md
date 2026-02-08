---
name: bmad-index-docs
description: "Generates or updates an index.md of all documents in the specified directory"
---

&lt;task id&#x3D;&quot;_bmad/core/tasks/index-docs&quot; name&#x3D;&quot;Index Docs&quot;
  description&#x3D;&quot;Generates or updates an index.md of all documents in the specified directory&quot;&gt;
  &lt;llm critical&#x3D;&quot;true&quot;&gt;
    &lt;i&gt;MANDATORY: Execute ALL steps in the flow section IN EXACT ORDER&lt;/i&gt;
    &lt;i&gt;DO NOT skip steps or change the sequence&lt;/i&gt;
    &lt;i&gt;HALT immediately when halt-conditions are met&lt;/i&gt;
    &lt;i&gt;Each action xml tag within step xml tag is a REQUIRED action to complete that step&lt;/i&gt;
    &lt;i&gt;Sections outside flow (validation, output, critical-context) provide essential context - review and apply throughout execution&lt;/i&gt;
  &lt;/llm&gt;

  &lt;flow&gt;
    &lt;step n&#x3D;&quot;1&quot; title&#x3D;&quot;Scan Directory&quot;&gt;
      &lt;i&gt;List all files and subdirectories in the target location&lt;/i&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;2&quot; title&#x3D;&quot;Group Content&quot;&gt;
      &lt;i&gt;Organize files by type, purpose, or subdirectory&lt;/i&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;3&quot; title&#x3D;&quot;Generate Descriptions&quot;&gt;
      &lt;i&gt;Read each file to understand its actual purpose and create brief (3-10 word) descriptions based on the content, not just the
        filename&lt;/i&gt;
    &lt;/step&gt;

    &lt;step n&#x3D;&quot;4&quot; title&#x3D;&quot;Create/Update Index&quot;&gt;
      &lt;i&gt;Write or update index.md with organized file listings&lt;/i&gt;
    &lt;/step&gt;
  &lt;/flow&gt;

  &lt;output-format&gt;
    &lt;example&gt;
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
    &lt;/example&gt;
  &lt;/output-format&gt;

  &lt;halt-conditions critical&#x3D;&quot;true&quot;&gt;
    &lt;i&gt;HALT if target directory does not exist or is inaccessible&lt;/i&gt;
    &lt;i&gt;HALT if user does not have write permissions to create index.md&lt;/i&gt;
  &lt;/halt-conditions&gt;

  &lt;validation&gt;
    &lt;i&gt;Use relative paths starting with ./&lt;/i&gt;
    &lt;i&gt;Group similar files together&lt;/i&gt;
    &lt;i&gt;Read file contents to generate accurate descriptions - don&#x27;t guess from filenames&lt;/i&gt;
    &lt;i&gt;Keep descriptions concise but informative (3-10 words)&lt;/i&gt;
    &lt;i&gt;Sort alphabetically within groups&lt;/i&gt;
    &lt;i&gt;Skip hidden files (starting with .) unless specified&lt;/i&gt;
  &lt;/validation&gt;
&lt;/task&gt;

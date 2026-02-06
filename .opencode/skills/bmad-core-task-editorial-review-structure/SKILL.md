---
name: bmad-core-task-editorial-review-structure
description: "Structural editor that proposes cuts, reorganization, and simplification while preserving comprehension"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "core"
  task: "editorial-review-structure"
  standalone: true
---

# Editorial Review - Structure

Structural editor that proposes cuts, reorganization, and simplification while preserving comprehension

## Instructions

Review document structure and propose substantive changes
to improve clarity and flow-run this BEFORE copy editing
MANDATORY: Execute ALL steps in the flow section IN EXACT ORDER
DO NOT skip steps or change the sequence
HALT immediately when halt-conditions are met
Each action xml tag within step xml tag is a REQUIRED action to complete that step
You are a structural editor focused on HIGH-VALUE DENSITY
Brevity IS clarity: Concise writing respects limited attention spans and enables effective scanning
Every section must justify its existence-cut anything that delays understanding
True redundancy is failure
Comprehension through calibration: Optimize for the minimum words needed to maintain understanding
Front-load value: Critical information comes first; nice-to-know comes last (or goes)
One source of truth: If information appears identically twice, consolidate
Scope discipline: Content that belongs in a different document should be cut or linked
Propose, don't execute: Output recommendations-user decides what to accept
CONTENT IS SACROSANCT: Never challenge ideas—only optimize how they're organized.
STYLE GUIDE OVERRIDE: If a style_guide input is provided,
it overrides ALL generic principles in this task (including human-reader-principles,
llm-reader-principles, reader_type-specific priorities, structure-models selection,
and the Microsoft Writing Style Guide baseline). The ONLY exception is CONTENT IS
SACROSANCT—never change what ideas say, only how they're expressed. When style
guide conflicts with this task, style guide wins.
These elements serve human comprehension and engagement-preserve unless clearly wasteful:
Visual aids: Diagrams, images, and flowcharts anchor understanding
Expectation-setting: "What You'll Learn" helps readers confirm they're in the right place
Reader's Journey: Organize content biologically (linear progression), not logically (database)
Mental models: Overview before details prevents cognitive overload
Warmth: Encouraging tone reduces anxiety for new users
Whitespace: Admonitions and callouts provide visual breathing room
Summaries: Recaps help retention; they're reinforcement, not redundancy
Examples: Concrete illustrations make abstract concepts accessible
Engagement: "Flow" techniques (transitions, variety) are functional, not "fluff"-they maintain attention
When reader_type='llm', optimize for PRECISION and UNAMBIGUITY:
Dependency-first: Define concepts before usage to minimize hallucination risk
Cut emotional language, encouragement, and orientation sections
IF concept is well-known from training (e.g., "conventional
commits", "REST APIs"): Reference the standard-don't re-teach it
ELSE: Be explicit-don't assume the LLM will infer correctly
Use consistent terminology-same word for same concept throughout
Eliminate hedging ("might", "could", "generally")-use direct statements
Prefer structured formats (tables, lists, YAML) over prose
Reference known standards ("conventional commits", "Google style guide") to leverage training
STILL PROVIDE EXAMPLES even for known standards-grounds the LLM in your specific expectation
Unambiguous references-no unclear antecedents ("it", "this", "the above")
Note: LLM documents may be LONGER than human docs in some areas
(more explicit) while shorter in others (no warmth)
Prerequisites: Setup/Context MUST precede action
Sequence: Steps must follow strict chronological or logical dependency order
Goal-oriented: clear 'Definition of Done' at the end
Random Access: No narrative flow required; user jumps to specific item
MECE: Topics are Mutually Exclusive and Collectively Exhaustive
Consistent Schema: Every item follows identical structure (e.g., Signature to Params to Returns)
Abstract to Concrete: Definition to Context to Implementation/Example
Scaffolding: Complex ideas built on established foundations
Meta-first: Inputs, usage constraints, and context defined before instructions
Separation of Concerns: Instructions (logic) separate from Data (content)
Step-by-step: Execution flow must be explicit and ordered
Top-down: Conclusion/Status/Recommendation starts the document
Grouping: Supporting context grouped logically below the headline
Ordering: Most critical information first
MECE: Arguments/Groups are Mutually Exclusive and Collectively Exhaustive
Evidence: Data supports arguments, never leads
- Check if content is empty or contains fewer than 3 words
HALT with error: "Content
too short for substantive review (minimum 3 words required)"
- Validate reader_type is "humans" or "llm" (or not provided, defaulting to "humans")
HALT with error: "Invalid reader_type. Must be 'humans' or 'llm'"
- Identify document type and structure (headings, sections, lists, etc.)
- Note the current word count and section count
- If purpose was provided, use it; otherwise infer from content
- If target_audience was provided, use it; otherwise infer from content
- Identify the core question the document answers
- State in one sentence: "This document exists to help [audience] accomplish [goal]"
- Select the most appropriate structural model from structure-models based on purpose/audience
- Note reader_type and which principles apply (human-reader-principles or llm-reader-principles)
Consult style_guide now and note its key requirements—these override default principles for this
analysis
- Map the document structure: list each major section with its word count
- Evaluate structure against the selected model's primary rules
(e.g., 'Does recommendation come first?' for Pyramid)
- For each section, answer: Does this directly serve the stated purpose?
For each comprehension aid (visual,
summary, example, callout), answer: Does this help readers
understand or stay engaged?
- Identify sections that could be: cut entirely, merged with
another, moved to a different location, or split
- Identify true redundancies: identical information repeated
without purpose (not summaries or reinforcement)
- Identify scope violations: content that belongs in a different document
- Identify burying: critical information hidden deep in the document
- Assess the reader's journey: Does the sequence match how readers will use this?
- Identify premature detail: explanation given before the reader needs it
- Identify missing scaffolding: complex ideas without adequate setup
- Identify anti-patterns: FAQs that should be inline, appendices
that should be cut, overviews that repeat the body verbatim
Assess pacing: Is there enough
whitespace and visual variety to maintain attention?
- Compile all findings into prioritized recommendations
- Categorize each recommendation: CUT (remove entirely),
MERGE (combine sections), MOVE (reorder), CONDENSE (shorten
significantly), QUESTION (needs author decision), PRESERVE
(explicitly keep-for elements that might seem cuttable but
serve comprehension)
- For each recommendation, state the rationale in one sentence
- Estimate impact: how many words would this save (or cost, for PRESERVE)?
- If length_target was provided, assess whether recommendations meet it
Flag with warning: "This cut may impact
reader comprehension/engagement"
- Output document summary (purpose, audience, reader_type, current length)
- Output the recommendation list in priority order
- Output estimated total reduction if all recommendations accepted
Output: "No substantive changes recommended-document structure is sound"
## Document Summary
- **Purpose:** [inferred or provided purpose]
- **Audience:** [inferred or provided audience]
- **Reader type:** [selected reader type]
- **Structure model:** [selected structure model]
- **Current length:** [X] words across [Y] sections
## Recommendations
### 1. [CUT/MERGE/MOVE/CONDENSE/QUESTION/PRESERVE] - [Section or element name]
**Rationale:** [One sentence explanation]
**Impact:** ~[X] words
**Comprehension note:** [If applicable, note impact on reader understanding]
### 2. ...
## Summary
- **Total recommendations:** [N]
- **Estimated reduction:** [X] words ([Y]% of original)
- **Meets length target:** [Yes/No/No target specified]
- **Comprehension trade-offs:** [Note any cuts that sacrifice reader engagement for brevity]
HALT with error if content is empty or fewer than 3 words
HALT with error if reader_type is not "humans" or "llm"
If no structural issues found, output "No substantive changes
recommended" (this is valid completion, not an error)
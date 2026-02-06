---
name: bmad-bmm-retrospective
description: "Run after epic completion to review overall success, extract lessons learned, and explore if new information emerged that might impact the next epic"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "bmm"
  workflow: "retrospective"
  standalone: "false"
---

# retrospective Workflow

Run after epic completion to review overall success, extract lessons learned, and explore if new information emerged that might impact the next epic

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 1: Epic Discovery - Find Completed Epic with Priority Logic

**Actions:**
- Explain to {user_name} the epic discovery process using natural dialogue
- PRIORITY 1: Check {sprint_status_file} first
- Load the FULL file: {sprint_status_file}
- Read ALL development_status entries
- Find the highest epic number with at least one story marked "done"
- Extract epic number from keys like "epic-X-retrospective" or story keys like "X-Y-story-name"
- Set {{detected_epic}} = highest epic number found with completed stories
- Present finding to user with context
- WAIT for {user_name} to confirm or correct
- Set {{epic_number}} = {{detected_epic}}
- Set {{epic_number}} = user-provided number
- PRIORITY 2: Ask user directly
- WAIT for {user_name} to provide epic number
- Set {{epic_number}} = user-provided number
- PRIORITY 3: Fallback to stories folder
- Scan {story_directory} for highest numbered story files
- Extract epic numbers from story filenames (pattern: epic-X-Y-story-name.md)
- Set {{detected_epic}} = highest epic number found
- WAIT for {user_name} to confirm or correct
- Set {{epic_number}} = confirmed number
- Once {{epic_number}} is determined, verify epic completion status
- Find all stories for epic {{epic_number}} in {sprint_status_file}:

- Look for keys starting with "{{epic_number}}-" (e.g., "1-1-", "1-2-", etc.)
- Exclude epic key itself ("epic-{{epic_number}}")
- Exclude retrospective key ("epic-{{epic_number}}-retrospective")
- Count total stories found for this epic
- Count stories with status = "done"
- Collect list of pending story keys (status != "done")
- Determine if complete: true if all stories are done, false otherwise
- HALT

**Questions to ask:**
- Continue with incomplete epic? (yes/no)

### Step 2: Deep Story Analysis - Extract Lessons from Implementation

**Actions:**
- For each story in epic {{epic_number}}, read the complete story file from {story_directory}/{{epic_number}}-{{story_num}}-\*.md
- Extract and analyze from each story:
- Synthesize patterns across all stories:
- Store this synthesis - these patterns will drive the retrospective discussion

### Step 3: Load and Integrate Previous Epic Retrospective

**Actions:**
- Calculate previous epic number: {{prev_epic_num}} = {{epic_number}} - 1
- Search for previous retrospective using pattern: {retrospectives_folder}/epic-{{prev_epic_num}}-retro-*.md
- Read the complete previous retrospective file
- Extract key elements:
- Cross-reference with current epic execution:
- Prepare "continuity insights" for the retrospective discussion
- Identify wins where previous lessons were applied successfully:
- Identify missed opportunities where previous lessons were ignored:
- Set {{first_retrospective}} = true
- Set {{first_retrospective}} = true

### Step 4: Preview Next Epic with Change Detection

**Actions:**
- Calculate next epic number: {{next_epic_num}} = {{epic_number}} + 1
- Attempt to load next epic using selective loading strategy:
- Check if file exists: {planning_artifacts}/epic\*/epic-{{next_epic_num}}.md
- Load {planning_artifacts}/*epic*/epic-{{next_epic_num}}.md
- Set {{next_epic_source}} = "sharded"
- Check if file exists: {planning_artifacts}/epic\*.md
- Load entire epics document
- Extract Epic {{next_epic_num}} section
- Set {{next_epic_source}} = "whole"
- Analyze next epic for:
- Identify dependencies on completed work:
- Note potential gaps or preparation needed:
- Check for technical prerequisites:
- Set {{next_epic_exists}} = true
- Set {{next_epic_exists}} = false

### Step 5: Initialize Retrospective with Rich Context

**Actions:**
- Load agent configurations from {agent_manifest}
- Identify which agents participated in Epic {{epic_number}} based on story records
- Ensure key roles present: Product Owner, Scrum Master (facilitating), Devs, Testing/QA, Architect
- WAIT for {user_name} to respond or indicate readiness

### Step 6: Epic Review Discussion - What Went Well, What Didn't

**Actions:**
- Bob (Scrum Master) naturally turns to {user_name} to engage them in the discussion
- WAIT for {user_name} to respond - this is a KEY USER INTERACTION moment
- After {user_name} responds, have 1-2 team members react to or build on what {user_name} shared
- Continue facilitating natural dialogue, periodically bringing {user_name} back into the conversation
- After covering successes, guide the transition to challenges with care
- WAIT for {user_name} to respond and help facilitate the conflict resolution
- Use {user_name}'s response to guide the discussion toward systemic understanding rather than blame
- Continue the discussion, weaving in patterns discovered from the deep story analysis (Step 2)
- WAIT for {user_name} to share their observations
- Continue the retrospective discussion, creating moments where:
- WAIT for {user_name} to respond
- Use the previous retro follow-through as a learning moment about commitment and accountability
- Allow team members to add any final thoughts on the epic review
- Ensure {user_name} has opportunity to add their perspective

### Step 7: Next Epic Preparation Discussion - Interactive and Collaborative

**Actions:**
- Skip to Step 8
- WAIT for {user_name} to share their assessment
- Use {user_name}'s input to guide deeper exploration of preparation needs
- WAIT for {user_name} to provide direction on preparation approach
- Create space for debate and disagreement about priorities
- WAIT for {user_name} to validate or adjust the preparation strategy
- Continue working through preparation needs across all dimensions:
- For each preparation area, facilitate team discussion that:
- WAIT for {user_name} final validation of preparation plan

### Step 8: Synthesize Action Items with Significant Change Detection

**Actions:**
- Synthesize themes from Epic {{epic_number}} review discussion into actionable improvements
- Create specific action items with:
- Ensure action items are SMART:
- WAIT for {user_name} to help resolve priority discussions
- CRITICAL ANALYSIS - Detect if discoveries require epic updates
- Check if any of the following are true based on retrospective discussion:
- WAIT for {user_name} to decide on how to handle the significant changes
- Add epic review session to critical path if user agrees
- Give each agent with assignments a moment to acknowledge their ownership
- Ensure {user_name} approves the complete action plan

### Step 9: Critical Readiness Exploration - Interactive Deep Dive

**Actions:**
- Explore testing and quality state through natural conversation
- WAIT for {user_name} to describe testing status
- WAIT for {user_name} to assess quality readiness
- Add testing completion to critical path
- Explore deployment and release status
- WAIT for {user_name} to provide deployment status
- WAIT for {user_name} to clarify deployment timeline
- Add deployment milestone to critical path with agreed timeline
- Explore stakeholder acceptance
- WAIT for {user_name} to describe stakeholder acceptance status
- WAIT for {user_name} decision
- Add stakeholder acceptance to critical path if user agrees
- Explore technical health and stability
- WAIT for {user_name} to assess codebase health
- WAIT for {user_name} decision
- Add stability work to preparation sprint if user agrees
- Explore unresolved blockers
- WAIT for {user_name} to surface any blockers
- Assign blocker resolution to appropriate agent
- Add to critical path with priority and deadline
- Synthesize the readiness assessment
- WAIT for {user_name} to confirm or correct the assessment

### Step 10: Retrospective Closure with Celebration and Commitment

**Actions:**
- WAIT for {user_name} to share final reflections
- Prepare to save retrospective summary document

### Step 11: Save Retrospective and Update Sprint Status

**Actions:**
- Ensure retrospectives folder exists: {retrospectives_folder}
- Create folder if it doesn't exist
- Generate comprehensive retrospective summary document including:
- Format retrospective document as readable markdown with clear sections
- Set filename: {retrospectives_folder}/epic-{{epic_number}}-retro-{date}.md
- Save retrospective document
- Update {sprint_status_file} to mark retrospective as completed
- Load the FULL file: {sprint_status_file}
- Find development_status key "epic-{{epic_number}}-retrospective"
- Verify current status (typically "optional" or "pending")
- Update development_status["epic-{{epic_number}}-retrospective"] = "done"
- Save file, preserving ALL comments and structure including STATUS DEFINITIONS

### Step 12: Final Summary and Handoff
---
name: bmad-cis-storytelling
description: "Craft compelling narratives using proven story frameworks and techniques. This workflow guides users through structured narrative development, applying appropriate story frameworks to create emotionally resonant and engaging stories for any purpose."
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "cis"
  workflow: "storytelling"
  standalone: true
---

# storytelling Workflow

Craft compelling narratives using proven story frameworks and techniques. This workflow guides users through structured narrative development, applying appropriate story frameworks to create emotionally resonant and engaging stories for any purpose.

**Author:** BMad

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Workflow Steps

### Step 1: Story Context Setup

**Actions:**
- Check if context data was provided with workflow invocation
- Load the context document from the data file path
- Study the background information, brand details, or subject matter
- Use the provided context to inform story development
- Acknowledge the focused storytelling goal
- Proceed with context gathering

**Questions to ask:**
- I see we're crafting a story based on the context provided. What specific angle or emphasis would you like?
- 1. What's the purpose of this story? (e.g., marketing, pitch, brand narrative, case study)
- 2. Who is your target audience?
- 3. What key messages or takeaways do you want the audience to have?
- 4. Any constraints? (length, tone, medium, existing brand guidelines)

### Step 2: Select Story Framework

**Actions:**
- Load story frameworks from {story_frameworks} CSV file
- Parse: story_type, name, description, key_elements, best_for
- Analyze story_purpose, target_audience, and key_messages
- Recommend best-fit framework with clear rationale

**Questions to ask:**
- I can help craft your story using these proven narrative frameworks:

**Transformation Narratives:**

1. **Hero's Journey** - Classic transformation arc with adventure and return
2. **Pixar Story Spine** - Emotional structure building tension to resolution
3. **Customer Journey Story** - Before/after transformation narrative
4. **Challenge-Overcome Arc** - Dramatic obstacle-to-victory structure

**Strategic Narratives:**

5. **Brand Story** - Values, mission, and unique positioning
6. **Pitch Narrative** - Persuasive problem-to-solution structure
7. **Vision Narrative** - Future-focused aspirational story
8. **Origin Story** - Foundational narrative of how it began

**Specialized Narratives:**

9. **Data Storytelling** - Transform insights into compelling narrative
10. **Emotional Hooks** - Craft powerful opening and touchpoints

Which framework best fits your purpose? (Enter 1-10, or ask for my recommendation)

### Step 3: Gather Story Elements

**Actions:**
- Reference key_elements from selected story_type in CSV
- Parse key_elements (pipe-separated) into individual components
- Guide user through each element with targeted questions

**Questions to ask:**
- Who/what is the hero of this story?
- What's their ordinary world before the adventure?
- What call to adventure disrupts their world?
- What trials/challenges do they face?
- How are they transformed by the journey?
- What wisdom do they bring back?
- Once upon a time, what was the situation?
- Every day, what was the routine?
- Until one day, what changed?
- Because of that, what happened next?
- And because of that? (continue chain)
- Until finally, how was it resolved?
- What was the origin spark for this brand?
- What core values drive every decision?
- How does this impact customers/users?
- What makes this different from alternatives?
- Where is this heading in the future?
- What's the problem landscape you're addressing?
- What's your vision for the solution?
- What proof/traction validates this approach?
- What action do you want the audience to take?
- What context does the audience need?
- What's the key data revelation/insight?
- What patterns explain this insight?
- So what? Why does this matter?
- What actions should this insight drive?

### Step 4: Craft Emotional Arc

**Questions to ask:**
- What emotion should the audience feel at the beginning?
- What emotional shift happens at the turning point?
- What emotion should they carry away at the end?
- Where are the emotional peaks (high tension/joy)?
- Where are the valleys (low points/struggle)?

### Step 5: Develop Opening Hook

**Questions to ask:**
- What surprising fact, question, or statement could open this story?
- What's the most intriguing part of this story to lead with?

### Step 6: Write Core Narrative

**Actions:**
- Provide writing prompts and encouragement
- Offer feedback on drafts they share
- Suggest refinements for clarity, emotion, flow
- Synthesize all gathered elements
- Write complete narrative in appropriate tone/style
- Structure according to chosen framework
- Include vivid details and emotional beats
- Present draft for feedback and refinement
- Write opening paragraph
- Get feedback and iterate
- Build section by section collaboratively

**Questions to ask:**
- Would you like to:

1. Draft the story yourself with my guidance
2. Have me write the first draft based on what we've discussed
3. Co-create it iteratively together

### Step 7: Create Story Variations

**Questions to ask:**
- What channels or formats will you use this story in?

### Step 8: Usage Guidelines

**Questions to ask:**
- Where and how will you use this story?

### Step 9: Refinement AND Next Steps

**Questions to ask:**
- What parts of the story feel strongest?
- What areas could use more refinement?
- What's the key resolution or call to action for your story?
- Do you need additional story versions for other audiences/purposes?
- How will you test this story with your audience?

### Step 10: Generate Final Output

**Actions:**
- Write final story document to {output_folder}/story-{{date}}.md
- Confirm completion with: "Story complete, {user_name}! Your narrative has been saved to {output_folder}/story-{{date}}.md"

## Output Template

Use the following template structure for output:

```markdown
# Story Output

**Created:** {{date}}
**Storyteller:** {{agent_role}} {{agent_name}}
**Author:** {{user_name}}

## Story Information

**Story Type:** {{story_type}}

**Framework Used:** {{framework_name}}

**Purpose:** {{story_purpose}}

**Target Audience:** {{target_audience}}

## Story Structure

### Opening Hook

{{opening_hook}}

### Core Narrative

{{core_narrative}}

### Key Story Beats

{{story_beats}}

### Emotional Arc

{{emotional_arc}}

### Resolution/Call to Action

{{resolution}}

## Complete Story

{{complete_story}}

## Story Elements Analysis

### Character/Voice

{{character_voice}}

### Conflict/Tension

{{conflict_tension}}

### Transformation/Change

{{transformation}}

### Emotional Touchpoints

{{emotional_touchpoints}}

### Key Messages

{{key_messages}}

## Variations AND Adaptations

### Short Version (Tweet/Social)

{{short_version}}

### Medium Version (Email/Blog)

{{medium_version}}

### Extended Version (Article/Presentation)

{{extended_version}}

## Usage Guidelines

### Best Channels

{{best_channels}}

### Audience Considerations

{{audience_considerations}}

### Tone AND Voice Notes

{{tone_notes}}

### Adaptation Suggestions

{{adaptation_suggestions}}

## Next Steps

### Refinement Opportunities

{{refinement_opportunities}}

### Additional Versions Needed

{{additional_versions}}

### Testing/Feedback Plan

{{feedback_plan}}

---

_Story crafted using the BMAD CIS storytelling framework_

```
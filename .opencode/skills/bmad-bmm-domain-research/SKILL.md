---
name: bmad-bmm-domain-research
description: Conduct domain research covering industry analysis, regulations, technology trends, and ecosystem dynamics using current web data and verified sources.
---

# Domain Research Workflow

**Goal:** Conduct comprehensive domain/industry research using current web data and verified sources to produce complete research documents with compelling narratives and proper citations.

**Your Role:** You are a domain research facilitator working with an expert partner. This is a collaboration where you bring research methodology and web search capabilities, while your partner brings domain knowledge and research direction.

## PREREQUISITE

**⛔ Web search required.** If unavailable, abort and tell the user.

## CONFIGURATION

Load config from &#x60;{project-root}/_bmad/bmm/config.yaml&#x60; and resolve:
- &#x60;project_name&#x60;, &#x60;output_folder&#x60;, &#x60;planning_artifacts&#x60;, &#x60;user_name&#x60;
- &#x60;communication_language&#x60;, &#x60;document_output_language&#x60;, &#x60;user_skill_level&#x60;
- &#x60;date&#x60; as a system-generated value

## QUICK TOPIC DISCOVERY

&quot;Welcome {{user_name}}! Let&#x27;s get started with your **domain/industry research**.

**What domain, industry, or sector do you want to research?**

For example:
- &#x27;The healthcare technology industry&#x27;
- &#x27;Sustainable packaging regulations in Europe&#x27;
- &#x27;Construction and building materials sector&#x27;
- &#x27;Or any other domain you have in mind...&#x27;&quot;

### Topic Clarification

Based on the user&#x27;s topic, briefly clarify:
1. **Core Domain**: &quot;What specific aspect of [domain] are you most interested in?&quot;
2. **Research Goals**: &quot;What do you hope to achieve with this research?&quot;
3. **Scope**: &quot;Should we focus broadly or dive deep into specific aspects?&quot;

## ROUTE TO DOMAIN RESEARCH STEPS

After gathering the topic and goals:

1. Set &#x60;research_type &#x3D; &quot;domain&quot;&#x60;
2. Set &#x60;research_topic &#x3D; [discovered topic from discussion]&#x60;
3. Set &#x60;research_goals &#x3D; [discovered goals from discussion]&#x60;
4. Create the starter output file: &#x60;{planning_artifacts}/research/domain-{{research_topic}}-research-{{date}}.md&#x60; with exact copy of the &#x60;./research.template.md&#x60; contents
5. Load: &#x60;./domain-steps/step-01-init.md&#x60; with topic context

**Note:** The discovered topic from the discussion should be passed to the initialization step, so it doesn&#x27;t need to ask &quot;What do you want to research?&quot; again - it can focus on refining the scope for domain research.

**✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config &#x60;{communication_language}&#x60;**

## Template

---
stepsCompleted: []
inputDocuments: []
workflowType: &#x27;research&#x27;
lastStep: 1
research_type: &#x27;{{research_type}}&#x27;
research_topic: &#x27;{{research_topic}}&#x27;
research_goals: &#x27;{{research_goals}}&#x27;
user_name: &#x27;{{user_name}}&#x27;
date: &#x27;{{date}}&#x27;
web_research_enabled: true
source_verification: true
---

# Research Report: {{research_type}}

**Date:** {{date}}
**Author:** {{user_name}}
**Research Type:** {{research_type}}

---

## Research Overview

[Research overview and methodology will be appended here]

---

&lt;!-- Content will be appended sequentially through research workflow steps --&gt;


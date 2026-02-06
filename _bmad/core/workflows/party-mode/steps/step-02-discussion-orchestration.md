# Step 2: Discussion Orchestration and Multi-Agent Conversation

## MANDATORY EXECUTION RULES (READ FIRST):

- ✅ YOU ARE A CONVERSATION ORCHESTRATOR, not just a response generator
- 🎯 SELECT RELEVANT AGENTS based on topic analysis and expertise matching
- 📋 MAINTAIN CHARACTER CONSISTENCY using merged agent personalities
- 🔍 ENABLE NATURAL CROSS-TALK between agents for dynamic conversation
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Analyze user input for intelligent agent selection before responding
- ⚠️ Present [E] exit option after each agent response round
- 💾 Continue conversation until user selects E (Exit)
- 📖 Maintain conversation state and context throughout session
- 🚫 FORBIDDEN to exit until E is selected or exit trigger detected

## CONTEXT BOUNDARIES:

- Complete agent roster with merged personalities is available
- User topic and conversation history guide agent selection
- Exit triggers: `*exit`, `goodbye`, `end party`, `quit`

## YOUR TASK:

Orchestrate dynamic multi-agent conversations with intelligent agent selection, natural cross-talk, and authentic character portrayal.

## DISCUSSION ORCHESTRATION SEQUENCE:

### 1. User Input Analysis

For each user message or topic:

**Input Analysis Process:**
"Analyzing your message for the perfect agent collaboration..."

**Analysis Criteria:**

- Domain expertise requirements (technical, business, creative, etc.)
- Complexity level and depth needed
- Conversation context and previous agent contributions
- User's specific agent mentions or requests

### 2. Intelligent Agent Selection

Select 2-3 most relevant agents based on analysis:

**Selection Logic:**

- **Primary Agent**: Best expertise match for core topic
- **Secondary Agent**: Complementary perspective or alternative approach
- **Tertiary Agent**: Cross-domain insight or devil's advocate (if beneficial)

**Priority Rules:**

- If user names specific agent → Prioritize that agent + 1-2 complementary agents
- Rotate agent participation over time to ensure inclusive discussion
- Balance expertise domains for comprehensive perspectives

### 3. In-Character Response Generation

Generate authentic responses for each selected agent:

**Character Consistency:**

- Apply agent's exact communication style from merged data
- Reflect their principles and values in reasoning
- Draw from their identity and role for authentic expertise
- Maintain their unique voice and personality traits

**Response Structure:**
[For each selected agent]:

"[Icon Emoji] **[Agent Name]**: [Authentic in-character response]

[Bash: .claude/hooks/bmad-speak.sh \"[Agent Name]\" \"[Their response]\"]"

### 4. Natural Cross-Talk Integration

Enable dynamic agent-to-agent interactions:

**Cross-Talk Patterns:**

- Agents can reference each other by name: "As [Another Agent] mentioned..."
- Building on previous points: "[Another Agent] makes a great point about..."
- Respectful disagreements: "I see it differently than [Another Agent]..."
- Follow-up questions between agents: "How would you handle [specific aspect]?"

**Conversation Flow:**

- Allow natural conversational progression
- Enable agents to ask each other questions
- Maintain professional yet engaging discourse
- Include personality-driven humor and quirks when appropriate

### 5. Question Handling Protocol

Manage different types of questions appropriately:

**Direct Questions to User:**
When an agent asks the user a specific question:

- End that response round immediately after the question
- Clearly highlight: **[Agent Name] asks: [Their question]**
- Display: _[Awaiting user response...]_
- WAIT for user input before continuing

**Rhetorical Questions:**
Agents can ask thinking-aloud questions without pausing conversation flow.

**Inter-Agent Questions:**
Allow natural back-and-forth within the same response round for dynamic interaction.

### 5.5 Decision Point Protocol

When agents identify divergent views, trade-offs, or questions requiring user decision:

**ALWAYS present structured options instead of open-ended questions.**

**Format:**

```
❓ **Decisions Needed**

| # | Decision | Options |
|---|----------|---------|
| 1 | [topic] | [A] option-a / [B] option-b / [C] option-c |
| 2 | [topic] | [A] option-a / [B] option-b |

> Reply with number + letter (e.g., `1A`, `2B`) to decide, or ask agents to elaborate.
```

**Rules:**
- Each decision MUST have at least 2 concrete options
- Options should reflect actual agent viewpoints when based on divergent views
- Include a brief rationale with each option when helpful
- After user decides, acknowledge and update discussion context
- Use `decide [#]` command to revisit any previous decision

### 6. Response Round Completion

After generating all agent responses for the round, let the user know he can speak naturally with the agents, and then show these menu options:

```
[R] Generate Meeting Report - Save summary or detailed report to file
[E] Exit Party Mode - End the collaborative session
```

### 7. Exit Condition Checking

Check for exit conditions before continuing:

**Automatic Triggers:**

- User message contains: `*exit`, `goodbye`, `end party`, `quit`
- Immediate agent farewells and workflow termination

**Natural Conclusion:**

- Conversation seems naturally concluding
- Confirm if the user wants to exit party mode and go back to where they were or continue chatting. Do it in a conversational way with an agent in the party.

### 8. Handle Menu Selection

#### If 'R' (Generate Meeting Report):

Ask user to choose report format:

```
📝 **Generate Meeting Report**

Choose report format:
- [S] **Summary** - Executive summary with key decisions and action items (~1 page)
- [D] **Detailed** - Full meeting minutes with all agent contributions, discussion threads, and decision rationale (~3-5 pages)
```

**Summary Report** (when user selects S): Generate a concise report containing:
- Meeting metadata (date, topic, participants, duration)
- Executive summary (2-3 sentences)
- Key decisions table (decision, rationale, owner)
- Action items table (action, owner, priority)
- Open questions list
- Next steps

**Detailed Report** (when user selects D): Generate a comprehensive report containing:
- All summary report content PLUS:
- Full discussion timeline with each agent's complete contributions per round
- Consensus points and divergent views analysis
- Decision log with proposer and supporters
- Risks and their suggested resolutions
- Agent roster with key contribution summary

**File Output:**
- Save as markdown file using the write tool
- Path: `{output_folder}/meeting-reports/meeting-report-{YYYY-MM-DD-HHmm}.md`
- Create the `meeting-reports` directory if it does not exist
- After saving, display: `✅ Meeting report saved to: {file_path}`
- Return to discussion (do NOT exit party mode)

#### If 'E' (Exit Party Mode):

Before exiting, ask:
```
📝 Before we wrap up — would you like to generate a meeting report?
- [S] Summary Report
- [D] Detailed Report  
- [N] No thanks, just exit
```

If user selects S or D, generate and save the report file (same format as above), then proceed to exit.

- Read fully and follow: `./step-03-graceful-exit.md`

## SUCCESS METRICS:

✅ Intelligent agent selection based on topic analysis
✅ Authentic in-character responses maintained consistently
✅ Natural cross-talk and agent interactions enabled
✅ Question handling protocol followed correctly
✅ [R] report and [E] exit options presented after each response round
✅ Conversation context and state maintained throughout
✅ Graceful conversation flow without abrupt interruptions

## FAILURE MODES:

❌ Generic responses without character consistency
❌ Poor agent selection not matching topic expertise
❌ Ignoring user questions or exit triggers
❌ Not enabling natural agent cross-talk and interactions
❌ Continuing conversation without user input when questions asked

## CONVERSATION ORCHESTRATION PROTOCOLS:

- Maintain conversation memory and context across rounds
- Rotate agent participation for inclusive discussions
- Handle topic drift while maintaining productivity
- Balance fun and professional collaboration
- Enable learning and knowledge sharing between agents

## MODERATION GUIDELINES:

**Quality Control:**

- If discussion becomes circular, have bmad-master summarize and redirect
- Ensure all agents stay true to their merged personalities
- Handle disagreements constructively and professionally
- Maintain respectful and inclusive conversation environment

**Flow Management:**

- Guide conversation toward productive outcomes
- Encourage diverse perspectives and creative thinking
- Balance depth with breadth of discussion
- Adapt conversation pace to user engagement level

## NEXT STEP:

When user selects 'R', generate meeting report and save to file. When user selects 'E' or exit conditions are met, offer report generation, then load `./step-03-graceful-exit.md` to provide satisfying agent farewells and conclude the party mode session.

Remember: Orchestrate engaging, intelligent conversations while maintaining authentic agent personalities and natural interaction patterns!

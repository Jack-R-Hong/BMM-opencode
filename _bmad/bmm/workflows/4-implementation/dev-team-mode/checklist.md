# Dev Team Mode - Validation Checklist

## Pre-Execution

### Prerequisites
- [ ] sprint-status.yaml exists in {implementation_artifacts}
- [ ] At least one epic defined
- [ ] At least one story with `ready-for-dev` or `in-progress` status
- [ ] Story files exist for actionable stories

### Configuration
- [ ] {config_source} accessible
- [ ] max_parallel_agents reasonable (1-5)
- [ ] dev_agent and review_agent are valid agent names
- [ ] dev_agent_fallbacks and review_agent_fallbacks contain valid agent names

---

## Step Validation

### Step 1: Init
- [ ] Sprint status parsed successfully
- [ ] Epic summary displayed
- [ ] Selection 1 (epic choice) prompted and captured
- [ ] Selection 2 (execution mode) prompted and captured
- [ ] State initialized in frontmatter

### Step 2: Analyze
- [ ] Stories categorized by status
- [ ] Dependencies detected from story files
- [ ] Batch size respects parallel_mode setting
- [ ] Execution plan presented
- [ ] Blocked stories identified

### Step 3: Parallel Dev
- [ ] All subagents launched successfully
- [ ] Task IDs recorded in active_agents
- [ ] Completion notifications processed
- [ ] Retry logic triggered on failures
- [ ] Sprint status updated

### Step 4: Parallel Review
- [ ] Review agents use review_agent (with fallback chain if model unavailable)
- [ ] Adversarial review prompts sent
- [ ] Outcomes parsed (approved/needs-fixes/blocked)
- [ ] Sprint status synchronized

### Step 5: Sync & Loop
- [ ] Sprint status re-read
- [ ] Progress calculated correctly
- [ ] Loop decision logic working
- [ ] Epic completion detected
- [ ] State saved when pausing

---

## Post-Execution

### State Consistency
- [ ] sprint-status.yaml accurate
- [ ] No orphaned background tasks
- [ ] Completed stories have correct status
- [ ] Failed stories documented

### Output Quality
- [ ] Developed stories have tests
- [ ] Review findings addressed
- [ ] Dev Agent Records updated
- [ ] Change Logs populated

---

## Error Recovery

### Workflow Crash
1. [ ] Check dev-team-mode-state.yaml
2. [ ] Re-run to resume
3. [ ] Verify sprint-status.yaml
4. [ ] Check for orphaned agents

### Subagent Failure
1. [ ] Check failure reason
2. [ ] Verify story file intact
3. [ ] Check retry count
4. [ ] Consider manual execution

### Status Mismatch
1. [ ] Run `/bmad-bmm-sprint-status` to audit
2. [ ] Correct mismatched statuses
3. [ ] Ensure story file matches sprint-status.yaml

# Skill Distribution Structure

## 目錄結構設計

將 Skills 分配到 `~/.agents/skills/<name>/SKILL.md` 的結構，按功能模組分類：

```
~/.agents/skills/
├── README.md                           # 說明文件
│
├── # ═══════════════════════════════════════════════════════════
├── # BMM Module - 開發生命週期
├── # ═══════════════════════════════════════════════════════════
│
├── # --- Agent Skills (人格技能) ---
├── bmm-pm/SKILL.md                     # Product Manager 人格
├── bmm-architect/SKILL.md              # System Architect 人格
├── bmm-dev/SKILL.md                    # Developer 人格
├── bmm-sm/SKILL.md                     # Scrum Master 人格
├── bmm-qa/SKILL.md                     # QA Engineer 人格
├── bmm-analyst/SKILL.md                # Business Analyst 人格
├── bmm-ux-designer/SKILL.md            # UX Designer 人格
├── bmm-tech-writer/SKILL.md            # Technical Writer 人格
├── bmm-quick-flow-solo-dev/SKILL.md    # Quick Flow Solo Dev 人格
│
├── # --- Planning Workflows (規劃工作流) ---
├── bmm-create-product-brief/SKILL.md   # 建立產品簡報
├── bmm-create-prd/SKILL.md             # 建立 PRD
├── bmm-edit-prd/SKILL.md               # 編輯 PRD
├── bmm-validate-prd/SKILL.md           # 驗證 PRD
├── bmm-create-architecture/SKILL.md    # 建立架構文件
├── bmm-create-ux-design/SKILL.md       # 建立 UX 設計
├── bmm-create-epics-and-stories/SKILL.md # 建立 Epics 和 Stories
├── bmm-check-implementation-readiness/SKILL.md # 檢查實作準備度
│
├── # --- Implementation Workflows (實作工作流) ---
├── bmm-sprint-planning/SKILL.md        # Sprint 規劃
├── bmm-sprint-status/SKILL.md          # Sprint 狀態追蹤
├── bmm-create-story/SKILL.md           # 建立 Story
├── bmm-dev-story/SKILL.md              # 開發 Story
├── bmm-dev-team-mode/SKILL.md          # 並行開發協調器
├── bmm-code-review/SKILL.md            # 程式碼審查
├── bmm-retrospective/SKILL.md          # 回顧會議
├── bmm-correct-course/SKILL.md         # 航向修正
│
├── # --- Quick Flow (快速流程) ---
├── bmm-quick-spec/SKILL.md             # 快速技術規格
├── bmm-quick-dev/SKILL.md              # 快速開發
├── bmm-qa-automate/SKILL.md            # 快速測試自動化
│
├── # --- Research (研究) ---
├── bmm-market-research/SKILL.md        # 市場研究
├── bmm-technical-research/SKILL.md     # 技術研究
├── bmm-domain-research/SKILL.md        # 領域研究
│
├── # --- Utilities (工具) ---
├── bmm-generate-project-context/SKILL.md # 生成專案上下文
├── bmm-document-project/SKILL.md       # 文件化現有專案
│
├── # ═══════════════════════════════════════════════════════════
├── # TEA Module - 測試架構
├── # ═══════════════════════════════════════════════════════════
│
├── # --- Agent Skill ---
├── tea-tea/SKILL.md                    # Master Test Architect 人格
│
├── # --- Testing Workflows ---
├── tea-testarch-framework/SKILL.md     # 測試框架初始化
├── tea-testarch-atdd/SKILL.md          # ATDD 工作流
├── tea-testarch-automate/SKILL.md      # 測試自動化
├── tea-testarch-test-design/SKILL.md   # 測試設計
├── tea-testarch-test-review/SKILL.md   # 測試審查
├── tea-testarch-trace/SKILL.md         # 需求追蹤矩陣
├── tea-testarch-nfr/SKILL.md           # 非功能需求評估
├── tea-testarch-ci/SKILL.md            # CI/CD 品質管線
│
├── # --- Education ---
├── tea-teach-me-testing/SKILL.md       # 測試教學
│
├── # ═══════════════════════════════════════════════════════════
├── # CIS Module - 創意與創新
├── # ═══════════════════════════════════════════════════════════
│
├── # --- Agent Skills ---
├── cis-brainstorming-coach/SKILL.md    # 腦力激盪教練
├── cis-creative-problem-solver/SKILL.md # 創意問題解決者
├── cis-design-thinking-coach/SKILL.md  # 設計思維教練
├── cis-innovation-strategist/SKILL.md  # 創新策略師
├── cis-presentation-master/SKILL.md    # 簡報大師
├── cis-storyteller/SKILL.md            # 說故事大師
│
├── # --- Creative Workflows ---
├── cis-design-thinking/SKILL.md        # 設計思維工作流
├── cis-innovation-strategy/SKILL.md    # 創新策略工作流
├── cis-problem-solving/SKILL.md        # 問題解決工作流
├── cis-storytelling/SKILL.md           # 說故事工作流
│
├── # ═══════════════════════════════════════════════════════════
├── # Core Module - 核心任務
├── # ═══════════════════════════════════════════════════════════
│
├── # --- Master Agent ---
├── core-bmad-master/SKILL.md           # BMad Master 協調者
│
├── # --- Core Tasks ---
├── core-task-help/SKILL.md             # 求助工具
├── core-task-shard-doc/SKILL.md        # 文件分片
├── core-task-index-docs/SKILL.md       # 文件索引
├── core-task-editorial-review-prose/SKILL.md    # 文案審查
├── core-task-editorial-review-structure/SKILL.md # 結構審查
├── core-task-review-adversarial-general/SKILL.md # 對抗性審查
│
├── # --- Modes ---
├── core-party-mode/SKILL.md            # Party Mode
├── core-brainstorming/SKILL.md         # 腦力激盪模式
│
└── # ═══════════════════════════════════════════════════════════
```

---

## 分類說明

### 1. BMM Module (bmm-*)
**開發生命週期管理**

| 子類別 | 說明 | Skills 數量 |
|--------|------|-------------|
| Agent Skills | 角色人格 | 9 |
| Planning Workflows | 規劃階段工作流 | 8 |
| Implementation Workflows | 實作階段工作流 | 8 |
| Quick Flow | 快速開發流程 | 3 |
| Research | 研究相關 | 3 |
| Utilities | 工具類 | 2 |

### 2. TEA Module (tea-*)
**測試架構與品質**

| 子類別 | 說明 | Skills 數量 |
|--------|------|-------------|
| Agent Skill | 測試架構師人格 | 1 |
| Testing Workflows | 測試工作流 | 8 |
| Education | 教育學習 | 1 |

### 3. CIS Module (cis-*)
**創意與創新服務**

| 子類別 | 說明 | Skills 數量 |
|--------|------|-------------|
| Agent Skills | 創意角色人格 | 6 |
| Creative Workflows | 創意工作流 | 4 |

### 4. Core Module (core-*)
**核心基礎設施**

| 子類別 | 說明 | Skills 數量 |
|--------|------|-------------|
| Master Agent | 協調者人格 | 1 |
| Core Tasks | 核心任務 | 6 |
| Modes | 特殊模式 | 2 |

---

## 命名規範

### Skill 名稱格式
```
<module>-<action-or-role>
```

| Prefix | Module | 用途 |
|--------|--------|------|
| `bmm-` | Business Model Method | 開發生命週期 |
| `tea-` | Test Engineering Architecture | 測試相關 |
| `cis-` | Creative Innovation Services | 創意創新 |
| `core-` | Core | 核心功能 |

### 範例
```
bmm-create-prd        ✓ Good: 清晰的模組+動作
bmm-pm                ✓ Good: 清晰的模組+角色
tea-testarch-atdd     ✓ Good: 模組+子系統+功能
core-task-help        ✓ Good: 模組+類型+動作

bmad-bmm-create-prd   ✗ Avoid: 移除 bmad- 前綴
create-prd            ✗ Avoid: 缺少模組前綴
```

---

## 安裝腳本

建立 `install-skills.sh` 來自動分配：

```bash
#!/bin/bash
# install-skills.sh - 安裝 skills 到 ~/.agents/skills/

SKILLS_DIR="$HOME/.agents/skills"
SOURCE_DIR=".opencode/skills"

# 創建目標目錄
mkdir -p "$SKILLS_DIR"

# 複製所有 skills，移除 bmad- 前綴
for skill_dir in "$SOURCE_DIR"/bmad-*/; do
    skill_name=$(basename "$skill_dir" | sed 's/^bmad-//')
    target_dir="$SKILLS_DIR/$skill_name"
    
    echo "Installing: $skill_name"
    mkdir -p "$target_dir"
    cp "$skill_dir/SKILL.md" "$target_dir/"
    
    # 更新 SKILL.md 中的 name 欄位
    sed -i "s/^name: bmad-/name: /" "$target_dir/SKILL.md"
done

echo "Done! Installed $(ls -1 "$SKILLS_DIR" | wc -l) skills to $SKILLS_DIR"
```

---

## 使用指南

### 全域安裝（推薦）
```bash
# 安裝到 ~/.agents/skills/ (所有專案可用)
./install-skills.sh
```

### 專案層級安裝
```bash
# 安裝到 .agents/skills/ (僅此專案)
SKILLS_DIR=".agents/skills" ./install-skills.sh
```

### 驗證安裝
```bash
# 列出所有已安裝的 skills
ls ~/.agents/skills/

# 測試載入特定 skill
opencode skill bmm-create-prd
```

---

## Skill 模板

### Agent Skill 模板
```yaml
---
name: <module>-<role>
description: "<Role Title> - Brief description of the agent"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "<bmm|tea|cis|core>"
  agent: "<role>"
  icon: "<emoji>"
---

# <Role Title> Agent Skill

Invoke this skill to activate the <Name> agent persona.

## Activation Steps

1. Load persona from this current agent file
2. Load and read config.yaml
3. Store session variables
4. Show greeting and display menu
5. STOP and WAIT for user input
6. Process user selection

## Available Commands

- **MH**: Redisplay Menu Help
- **CH**: Chat with the Agent
- ...

## Persona

**Role:** <Role description>

**Identity:** <Background and expertise>

**Style:** <Communication style>
```

### Workflow Skill 模板
```yaml
---
name: <module>-<action>
description: "<Action description in one sentence>"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "<bmm|tea|cis|core>"
  workflow: "<workflow-name>"
---

# <Action> Workflow

<Brief description of what this workflow does>

## How to Use

This skill provides a structured workflow. Follow the steps below:

## Prerequisites

- <Required documents or conditions>

## Instructions

<Detailed step-by-step instructions>

## Output

- <What this workflow produces>
```

### Task Skill 模板
```yaml
---
name: core-task-<action>
description: "<Task description>"
license: MIT
compatibility: opencode
metadata:
  source: "bmad-method"
  module: "core"
  type: "task"
---

# <Action> Task

## When to Use

<Describe when this task should be invoked>

## Instructions

<Detailed task instructions>
```

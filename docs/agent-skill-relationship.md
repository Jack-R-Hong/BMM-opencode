# Agent vs Skill 關係說明

## 概述

在 OpenCode/BMAD 系統中，**Agent** 和 **Skill** 是兩個互補但不同的概念：

| 概念 | 定義 | 類比 |
|------|------|------|
| **Agent** | 執行工作的「人格」- 具有特定角色、風格、專業知識 | 員工 (WHO) |
| **Skill** | 執行特定任務的「方法」- 可重複使用的指令集 | 工作技能 (HOW) |

---

## Agent（代理人）

### 定義
Agent 是一個 **AI 人格**，具有：
- 特定角色和身份認同
- 溝通風格和原則
- 工具權限配置
- 可用的命令/工作流程菜單

### 檔案位置
```
.opencode/agents/<name>.md          # 專案層級
~/.config/opencode/agents/<name>.md # 全域層級
```

### 檔案結構
```yaml
---
description: "Agent 簡短描述"
mode: subagent
tools:
  write: true
  edit: true
  bash: true
  read: true
---

# Agent Name

## Role
具體角色描述

## Identity  
身份背景

## Communication Style
溝通風格

## Principles
工作原則
```

### 範例：PM Agent
```yaml
---
description: "Product Manager"
mode: subagent
tools:
  write: true
  edit: true
  bash: true
---

📋 **Product Manager** - John

## Role
Product Manager specializing in collaborative PRD creation...

## Identity
Product management veteran with 8+ years...

## Communication Style
Asks 'WHY?' relentlessly like a detective...
```

---

## Skill（技能）

### 定義
Skill 是一組 **可重複使用的指令**，定義如何執行特定任務。Skill 可以：
- 被任何 Agent 載入使用
- 包含詳細的工作流程步驟
- 定義特定領域的專業知識

### 檔案位置
```
.opencode/skills/<name>/SKILL.md           # 專案層級
~/.config/opencode/skills/<name>/SKILL.md  # 全域層級
.agents/skills/<name>/SKILL.md             # Agent 相容路徑
~/.agents/skills/<name>/SKILL.md           # 全域 Agent 相容路徑
```

### 檔案結構
```yaml
---
name: skill-name           # 必填：1-64 字元，小寫+連字號
description: "技能描述"     # 必填：1-1024 字元
license: MIT               # 選填
compatibility: opencode    # 選填
metadata:                  # 選填：字串對字串的映射
  source: "bmad-method"
  module: "bmm"
---

# Skill Title

## How to Use
使用說明

## Instructions
詳細指令步驟
```

---

## Agent 與 Skill 的關係圖

```
┌─────────────────────────────────────────────────────────────────┐
│                        OpenCode System                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    載入     ┌─────────────────────────────┐   │
│  │   Agent     │◄────────────│         User                │   │
│  │  (Persona)  │             │   (透過 Tab 切換或 @提及)    │   │
│  └──────┬──────┘             └─────────────────────────────┘   │
│         │                                                       │
│         │ 可以載入                                               │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Skills Pool                          │   │
│  ├─────────────────────────────────────────────────────────┤   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │create-  │  │dev-     │  │code-    │  │sprint-  │    │   │
│  │  │prd      │  │story    │  │review   │  │planning │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │git-     │  │frontend-│  │play-    │  │test-    │    │   │
│  │  │master   │  │ui-ux    │  │wright   │  │automate │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 三種 Skill 類型

### 1. Agent Skill（代理人技能）
啟動完整的 Agent 人格，包含菜單和互動模式。

```yaml
---
name: bmad-bmm-pm
description: "Product Manager - Product Manager specializing in PRD creation"
metadata:
  agent: "pm"
  icon: "📋"
---

# Product Manager Agent Skill

## Activation Steps
1. Load persona from this current agent file
2. Load config.yaml and store session variables
3. Show greeting and display menu
4. STOP and WAIT for user input
...
```

### 2. Workflow Skill（工作流程技能）
執行特定的結構化工作流程。

```yaml
---
name: bmad-bmm-create-prd
description: "Create a comprehensive PRD through structured workflow"
metadata:
  workflow: "create-prd"
  standalone: "false"
---

# create-prd Workflow

## Instructions
Step-by-step workflow instructions...
```

### 3. Task Skill（任務技能）
執行獨立的核心任務，不需要特定 Agent。

```yaml
---
name: bmad-core-task-help
description: "Get unstuck by showing what workflow steps come next"
metadata:
  type: "task"
---

# Help Task

## When to Use
When you're stuck and need guidance...
```

---

## 使用模式

### 模式 1：Agent + Skill（推薦）
```
User: @bmm-pm help me create a PRD
       ↓
Agent (PM) 載入 → 載入 bmad-bmm-create-prd skill → 執行工作流程
```

### 模式 2：直接載入 Skill
```
User: /bmad-bmm-create-prd
       ↓
直接執行 skill，使用預設 Agent 行為
```

### 模式 3：delegate_task + Skills
```typescript
delegate_task(
  category="quick",
  load_skills=["bmad-bmm-code-review", "git-master"],
  prompt="Review the auth module changes"
)
```

---

## 最佳實踐

### 何時創建 Agent
- 需要特定人格/溝通風格
- 需要一組相關工作流程的統一入口
- 需要特定的工具權限配置

### 何時創建 Skill
- 可重複使用的工作指令
- 特定領域的專業知識
- 獨立的任務或工作流程

### 命名規範
```
Agent: <module>-<role>.md
       bmm-pm.md, bmm-dev.md, tea-tea.md

Skill: <prefix>-<module>-<action>/SKILL.md
       bmad-bmm-create-prd/SKILL.md
       bmad-tea-testarch-atdd/SKILL.md
```

---

## 參考資源

- [OpenCode Skills Documentation](https://opencode.ai/docs/skills/)
- [BMAD Method Getting Started](https://docs.bmad-method.org/tutorials/getting-started/)
- [BMAD Method Workflow Map](https://docs.bmad-method.org/reference/workflow-map/)

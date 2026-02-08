# BMM-OpenCode Workflow Auto-Injection Feature

## 功能說明

當使用 `@agent` 提及 BMM agent 時，系統會自動在 agent 的提示詞中注入該 agent 可用的 workflow 列表。

## 實現細節

### 1. 自動注入機制

#### `formatAgentContent()` 函數
- 新增 `injectWorkflows` 參數（預設為 `true`）
- 從 agent frontmatter 讀取 `workflows` 欄位
- 呼叫 `buildWorkflowSection()` 生成 workflow 列表
- 自動附加到 agent prompt 末尾

#### `buildWorkflowSection()` 函數
- 接收 agent 的 workflow 名稱列表
- 從所有 workflow 定義中查找對應的描述
- 生成格式化的 workflow 列表：
  ```
  You have access to the following workflows and tasks:
  - **workflow-name**: description
  - workflow-name
  ```

#### `writeAgentFile()` 函數
- 安裝 agent 時同樣執行 workflow 注入
- 確保 `bmm_install` 安裝的 agent 文件包含完整的 workflow 資訊

### 2. 智能檢測

系統會檢查 agent prompt 是否已包含 workflow 列表：
```typescript
if (!promptContent.includes("You have access to the following workflows")) {
  promptContent = promptContent.trim() + "\n\n" + workflowSection;
}
```

避免重複注入，保持 agent 文件乾淨。

### 3. Workflow 匹配邏輯

使用靈活的匹配算法查找 workflow 定義：
```typescript
const workflow = allWorkflows.find(w => 
  w.name === workflowName || 
  w.name.endsWith(workflowName) ||
  workflowName.includes(w.name)
);
```

支持部分名稱匹配，提高兼容性。

## 使用範例

### 範例 1: 使用 `bmm_agent` 工具

```javascript
const result = await plugin.tool.bmm_agent.execute({ name: "bmm-dev" });
```

**輸出：**
```markdown
---
description: "Developer Agent"
mode: subagent
workflows:
  - bmad-bmm-dev-story
  - bmad-bmm-code-review
  - bmad-party-mode
---

You are Senior Software Engineer.

Load the skill "bmad-bmm-dev" for your full instructions, persona, and available commands.

You have access to the following workflows and tasks:
- **bmad-bmm-dev-story**: Execute a story by implementing tasks/subtasks, writing tests, validating, and updating the story file per acceptance criteria
- **bmad-bmm-code-review**: Perform an ADVERSARIAL Senior Developer code review...
- bmad-party-mode

## Available Workflows
...
```

### 範例 2: 使用 `bmm_install` 安裝

```javascript
await plugin.tool.bmm_install.execute(
  { target: "/path/to/.opencode" },
  { directory: "/path/to/project" }
);
```

安裝後的 agent 文件（如 `bmm-pm.md`）自動包含：
```markdown
You have access to the following workflows and tasks:
- bmad-bmm-create-prd
- bmad-bmm-validate-prd
- bmad-bmm-edit-prd
- bmad-bmm-create-epics-and-stories
- bmad-bmm-check-implementation-readiness
- bmad-bmm-correct-course
- bmad-party-mode
```

### 範例 3: OpenCode @mention 使用

當在 OpenCode 中輸入：
```
@bmm-dev implement authentication
```

agent 收到的 system prompt 會自動包含所有可用的 workflow 資訊，使其能夠：
1. 了解自己有哪些工具可用
2. 在適當時機建議使用特定 workflow
3. 提供更準確的任務執行方案

## 技術優勢

### 1. **自動化維護**
- 無需手動在每個 agent 文件中維護 workflow 列表
- Workflow 定義變更時自動同步
- 減少文檔不一致的風險

### 2. **動態生成**
- 從 `workflow.yaml` 讀取最新的描述
- 支持 workflow 新增/刪除
- 保持資訊永遠最新

### 3. **向後兼容**
- 不影響現有 agent 文件
- 只在不存在時才注入
- 可選擇性啟用/禁用

### 4. **增強可發現性**
- Agent 明確知道自己的能力範圍
- 用戶透過 @mention 自動獲得 workflow 提示
- 提升 OpenCode 的自動完成體驗

## 測試結果

✅ 所有單元測試通過（9/9）
✅ Workflow 注入功能驗證通過
✅ `bmm_install` 安裝驗證通過
✅ Build 無錯誤

## 相關工具

配合以下工具使用效果最佳：

1. **`bmm_agent_workflows`** - 列出所有 agent 的 workflow 映射
2. **`bmm_suggest_workflows({ agent: "bmm-dev" })`** - 查詢特定 agent 的 workflows
3. **`bmm_agent({ name: "bmm-pm" })`** - 獲取包含 workflow 的完整 agent 定義

## 未來改進方向

1. 支持在 frontmatter 中配置注入格式
2. 允許 agent 自定義 workflow 顯示順序
3. 支持 workflow 分組（如：必需 vs 可選）
4. 提供多語言的 workflow 描述

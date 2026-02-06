#!/bin/bash
# install-skills-to-agents.sh
# 將 BMAD Method Skills 安裝到 ~/.agents/skills/
# 
# 用法:
#   ./scripts/install-skills-to-agents.sh           # 安裝到 ~/.agents/skills/
#   ./scripts/install-skills-to-agents.sh --local   # 安裝到 ./.agents/skills/
#   ./scripts/install-skills-to-agents.sh --dry-run # 預覽不執行

set -e

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 預設值
DRY_RUN=false
LOCAL_INSTALL=false
SOURCE_DIR=".opencode/skills"
TARGET_DIR="$HOME/.agents/skills"

# 解析參數
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dry-run) DRY_RUN=true ;;
        --local) LOCAL_INSTALL=true ;;
        --help|-h) 
            echo "用法: $0 [選項]"
            echo ""
            echo "選項:"
            echo "  --dry-run    預覽將要執行的操作，不實際執行"
            echo "  --local      安裝到專案目錄 (./.agents/skills/) 而非全域"
            echo "  --help       顯示此說明"
            exit 0
            ;;
        *) echo "未知參數: $1"; exit 1 ;;
    esac
    shift
done

# 設定目標目錄
if [ "$LOCAL_INSTALL" = true ]; then
    TARGET_DIR=".agents/skills"
fi

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     BMAD Method Skills Installer                           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "來源目錄: ${YELLOW}$SOURCE_DIR${NC}"
echo -e "目標目錄: ${YELLOW}$TARGET_DIR${NC}"
echo ""

# 檢查來源目錄
if [ ! -d "$SOURCE_DIR" ]; then
    echo -e "${RED}錯誤: 找不到來源目錄 $SOURCE_DIR${NC}"
    echo "請確認您在 BMM-opencode 專案根目錄執行此腳本"
    exit 1
fi

# 計算 skill 數量
SKILL_COUNT=$(find "$SOURCE_DIR" -name "SKILL.md" | wc -l)
echo -e "找到 ${GREEN}$SKILL_COUNT${NC} 個 skills"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo -e "${YELLOW}[DRY RUN] 以下為預覽，不會實際執行${NC}"
    echo ""
fi

# 創建目標目錄
if [ "$DRY_RUN" = false ]; then
    mkdir -p "$TARGET_DIR"
fi

# 計數器
INSTALLED=0
SKIPPED=0

# 處理每個 skill
for skill_dir in "$SOURCE_DIR"/*/; do
    if [ ! -f "$skill_dir/SKILL.md" ]; then
        continue
    fi
    
    # 取得原始名稱 (包含 bmad- 前綴)
    original_name=$(basename "$skill_dir")
    
    # 移除 bmad- 前綴
    new_name=$(echo "$original_name" | sed 's/^bmad-//')
    
    target_skill_dir="$TARGET_DIR/$new_name"
    
    echo -e "處理: ${BLUE}$original_name${NC} → ${GREEN}$new_name${NC}"
    
    if [ "$DRY_RUN" = false ]; then
        # 創建目標目錄
        mkdir -p "$target_skill_dir"
        
        # 複製 SKILL.md
        cp "$skill_dir/SKILL.md" "$target_skill_dir/"
        
        # 更新 name 欄位 (移除 bmad- 前綴)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/^name: bmad-/name: /" "$target_skill_dir/SKILL.md"
        else
            # Linux
            sed -i "s/^name: bmad-/name: /" "$target_skill_dir/SKILL.md"
        fi
        
        ((INSTALLED++))
    else
        echo "  → 將創建 $target_skill_dir/SKILL.md"
        ((INSTALLED++))
    fi
done

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
if [ "$DRY_RUN" = true ]; then
    echo -e "預覽完成! 將安裝 ${GREEN}$INSTALLED${NC} 個 skills"
    echo -e "執行 ${YELLOW}$0${NC} (不帶 --dry-run) 來實際安裝"
else
    echo -e "安裝完成! 已安裝 ${GREEN}$INSTALLED${NC} 個 skills 到 ${YELLOW}$TARGET_DIR${NC}"
fi
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"

# 顯示驗證指令
echo ""
echo "驗證安裝:"
echo -e "  ${YELLOW}ls $TARGET_DIR${NC}"
echo ""
echo "在 OpenCode 中使用:"
echo -e "  ${YELLOW}/bmm-pm${NC}              # 載入 PM Agent"
echo -e "  ${YELLOW}/bmm-create-prd${NC}      # 建立 PRD"
echo -e "  ${YELLOW}/core-task-help${NC}      # 取得幫助"

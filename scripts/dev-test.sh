#!/bin/bash
# dev-test.sh
# One-shot local test: build → install to .opencode → ensure opencode.json → prompt restart
#
# Usage:
#   ./scripts/dev-test.sh           # Build and install
#   ./scripts/dev-test.sh --clean   # Clean previous install first
#   ./scripts/dev-test.sh --help    # Show help

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Defaults
CLEAN=false
SHOW_HELP=false

# Parse args
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --clean) CLEAN=true ;;
        --help|-h) SHOW_HELP=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

if [ "$SHOW_HELP" = true ]; then
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --clean    Remove previous install before reinstalling"
    echo "  --help     Show this help"
    echo ""
    echo "Flow: build → install to .opencode → ensure opencode.json → restart prompt"
    exit 0
fi

# Paths
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OPENCODE_DIR="$PROJECT_ROOT/.opencode"
OPENCODE_JSON="$PROJECT_ROOT/opencode.json"
PACKAGE_NAME="bmm-opencode"

echo -e "${BOLD}${BLUE}BMM-OpenCode Dev Test${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Pre-check
if [ ! -d "$OPENCODE_DIR" ]; then
    echo -e "${RED}✗ .opencode/ not found${NC}"
    exit 1
fi

STEP=1
TOTAL=4
[ "$CLEAN" = true ] && TOTAL=5

# --- Step: Clean (optional) ---
if [ "$CLEAN" = true ]; then
    echo -e "${YELLOW}[$STEP/$TOTAL] Cleaning previous install...${NC}"

    if [ -L "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
        rm -f "$OPENCODE_DIR/node_modules/$PACKAGE_NAME"
        echo -e "  ${GREEN}✓ Removed symlink${NC}"
    elif [ -d "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
        rm -rf "$OPENCODE_DIR/node_modules/$PACKAGE_NAME"
        echo -e "  ${GREEN}✓ Removed directory${NC}"
    else
        echo -e "  ${CYAN}– Nothing to clean${NC}"
    fi
    echo ""
    STEP=$((STEP + 1))
fi

# --- Step: Build ---
echo -e "${YELLOW}[$STEP/$TOTAL] Building TypeScript...${NC}"
if npm run build --silent 2>&1; then
    FILE_COUNT=$(find "$PROJECT_ROOT/dist" -type f 2>/dev/null | wc -l)
    echo -e "  ${GREEN}✓ Build OK${NC} (${FILE_COUNT} files in dist/)"
else
    echo -e "  ${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""
STEP=$((STEP + 1))

# --- Step: Install to .opencode ---
echo -e "${YELLOW}[$STEP/$TOTAL] Installing to .opencode/...${NC}"

cd "$OPENCODE_DIR"

INSTALL_METHOD=""
if npm link "$PROJECT_ROOT" 2>/dev/null; then
    INSTALL_METHOD="link"
    echo -e "  ${GREEN}✓ Linked (dev mode)${NC}"
else
    if npm install "$PROJECT_ROOT" --no-save 2>/dev/null; then
        INSTALL_METHOD="install"
        echo -e "  ${GREEN}✓ Installed (local copy)${NC}"
    else
        echo -e "  ${RED}✗ Install failed${NC}"
        cd "$PROJECT_ROOT"
        exit 1
    fi
fi

cd "$PROJECT_ROOT"

# Verify
if [ -d "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ] || [ -L "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
    echo -e "  ${GREEN}✓ Verified: .opencode/node_modules/$PACKAGE_NAME${NC}"
else
    echo -e "  ${RED}✗ Not found after install${NC}"
    exit 1
fi
echo ""
STEP=$((STEP + 1))

# --- Step: Ensure opencode.json ---
echo -e "${YELLOW}[$STEP/$TOTAL] Ensuring opencode.json has plugin config...${NC}"

if [ ! -f "$OPENCODE_JSON" ]; then
    # Create new opencode.json
    cat > "$OPENCODE_JSON" <<'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["bmm-opencode"]
}
EOF
    echo -e "  ${GREEN}✓ Created opencode.json with plugin: [\"bmm-opencode\"]${NC}"
else
    # Check if bmm-opencode is already in plugin array
    if grep -q '"bmm-opencode"' "$OPENCODE_JSON" 2>/dev/null; then
        echo -e "  ${CYAN}– Already configured (bmm-opencode found in opencode.json)${NC}"
    else
        # Check if plugin array exists
        if grep -q '"plugin"' "$OPENCODE_JSON" 2>/dev/null; then
            # Add to existing plugin array using node for safe JSON manipulation
            node -e "
                const fs = require('fs');
                const config = JSON.parse(fs.readFileSync('$OPENCODE_JSON', 'utf-8'));
                if (Array.isArray(config.plugin)) {
                    if (!config.plugin.includes('bmm-opencode')) {
                        config.plugin.push('bmm-opencode');
                    }
                } else {
                    config.plugin = ['bmm-opencode'];
                }
                fs.writeFileSync('$OPENCODE_JSON', JSON.stringify(config, null, 2) + '\n');
            "
            echo -e "  ${GREEN}✓ Added \"bmm-opencode\" to existing plugin array${NC}"
        else
            # Add plugin field to existing config
            node -e "
                const fs = require('fs');
                const config = JSON.parse(fs.readFileSync('$OPENCODE_JSON', 'utf-8'));
                config.plugin = ['bmm-opencode'];
                fs.writeFileSync('$OPENCODE_JSON', JSON.stringify(config, null, 2) + '\n');
            "
            echo -e "  ${GREEN}✓ Added plugin field to opencode.json${NC}"
        fi
    fi
fi
echo ""
STEP=$((STEP + 1))

# --- Done ---
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Ready to test!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "  Install method: ${CYAN}npm $INSTALL_METHOD${NC}"
echo -e "  Config:         ${CYAN}$OPENCODE_JSON${NC}"
echo ""
echo -e "  ${BOLD}${YELLOW}→ Restart OpenCode to load the plugin${NC}"
echo ""
echo -e "  After restart, test with:"
echo -e "    ${BLUE}bmm_list${NC}              – list all agents & skills"
echo -e "    ${BLUE}bmm_agent${NC} name=bmm-pm – load PM agent"
echo -e "    ${BLUE}bmm_skill${NC} name=...    – load a skill"
echo ""
echo -e "  Dev tips:"
echo -e "    ${CYAN}npm run dev${NC}           – watch mode (auto-rebuild on change)"
echo -e "    ${CYAN}$0 --clean${NC}  – clean reinstall"
echo ""

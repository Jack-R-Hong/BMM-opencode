#!/bin/bash
# dev-test.sh
# Build TypeScript project and install to .opencode for testing
# 
# Usage:
#   ./scripts/dev-test.sh           # Build and install
#   ./scripts/dev-test.sh --clean   # Unlink/uninstall before reinstalling
#   ./scripts/dev-test.sh --watch   # Suggestion: use with 'npm run dev' for auto-rebuild
#   ./scripts/dev-test.sh --help    # Show this help

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
CLEAN=false
SHOW_HELP=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --clean) CLEAN=true ;;
        --watch) 
            echo -e "${YELLOW}Tip: Use 'npm run dev' in another terminal for auto-rebuild${NC}"
            ;;
        --help|-h) SHOW_HELP=true ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

# Show help if requested
if [ "$SHOW_HELP" = true ]; then
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --clean    Unlink/uninstall before reinstalling"
    echo "  --watch    Suggestion: use with 'npm run dev' for auto-rebuild"
    echo "  --help     Show this help"
    exit 0
fi

# Banner
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     BMM-OpenCode Development Test Workflow                 ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Get project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OPENCODE_DIR="$PROJECT_ROOT/.opencode"
PACKAGE_NAME="bmm-opencode"

# Check if .opencode directory exists
if [ ! -d "$OPENCODE_DIR" ]; then
    echo -e "${RED}Error: .opencode directory not found at $OPENCODE_DIR${NC}"
    echo "Please ensure .opencode is set up before running this script"
    exit 1
fi

# Step 1: Clean if requested
if [ "$CLEAN" = true ]; then
    echo -e "${YELLOW}[1/5] Cleaning previous installation...${NC}"
    
    # Try to unlink if it exists
    if [ -L "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
        npm unlink "$PACKAGE_NAME" --prefix "$OPENCODE_DIR" 2>/dev/null || true
        echo -e "${GREEN}✓ Unlinked previous installation${NC}"
    fi
    
    # Remove node_modules entry if it exists
    if [ -d "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
        rm -rf "$OPENCODE_DIR/node_modules/$PACKAGE_NAME"
        echo -e "${GREEN}✓ Removed previous installation${NC}"
    fi
    echo ""
fi

# Step 2: Build TypeScript
echo -e "${YELLOW}[$([ "$CLEAN" = true ] && echo 2 || echo 1)/$([ "$CLEAN" = true ] && echo 5 || echo 4)] Building TypeScript...${NC}"

if npm run build; then
    echo -e "${GREEN}✓ Build completed successfully${NC}"
else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
fi
echo ""

# Step 3: Show build artifacts
echo -e "${YELLOW}[$([ "$CLEAN" = true ] && echo 3 || echo 2)/$([ "$CLEAN" = true ] && echo 5 || echo 4)] Build artifacts:${NC}"
if [ -d "$PROJECT_ROOT/dist" ]; then
    DIST_SIZE=$(du -sh "$PROJECT_ROOT/dist" | cut -f1)
    FILE_COUNT=$(find "$PROJECT_ROOT/dist" -type f | wc -l)
    echo -e "  Size: ${GREEN}$DIST_SIZE${NC} ($FILE_COUNT files)"
else
    echo -e "${RED}  Warning: dist directory not found${NC}"
fi
echo ""

# Step 4: Install to .opencode
echo -e "${YELLOW}[$([ "$CLEAN" = true ] && echo 4 || echo 3)/$([ "$CLEAN" = true ] && echo 5 || echo 4)] Installing to .opencode...${NC}"

cd "$OPENCODE_DIR"

# Try npm link first (preferred for development)
if npm link "$PROJECT_ROOT" 2>/dev/null; then
    echo -e "${GREEN}✓ Package linked successfully (development mode)${NC}"
    INSTALL_METHOD="npm link"
else
    # Fallback to npm install
    if npm install "$PROJECT_ROOT" 2>/dev/null; then
        echo -e "${GREEN}✓ Package installed successfully${NC}"
        INSTALL_METHOD="npm install"
    else
        echo -e "${RED}✗ Installation failed${NC}"
        cd "$PROJECT_ROOT"
        exit 1
    fi
fi

cd "$PROJECT_ROOT"
echo ""

# Step 5: Verify installation
echo -e "${YELLOW}[$([ "$CLEAN" = true ] && echo 5 || echo 4)/$([ "$CLEAN" = true ] && echo 5 || echo 4)] Verifying installation...${NC}"

if [ -d "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" ]; then
    PLUGIN_SIZE=$(du -sh "$OPENCODE_DIR/node_modules/$PACKAGE_NAME" | cut -f1)
    echo -e "${GREEN}✓ Plugin found in .opencode/node_modules/$PACKAGE_NAME${NC}"
    echo -e "  Size: ${GREEN}$PLUGIN_SIZE${NC}"
else
    echo -e "${RED}✗ Plugin not found in .opencode/node_modules/$PACKAGE_NAME${NC}"
    exit 1
fi
echo ""

# Final instructions
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Development test workflow completed!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. ${YELLOW}Restart OpenCode${NC}"
echo "   - Close and reopen your OpenCode session"
echo "   - Or reload the plugin in your current session"
echo ""
echo "2. ${YELLOW}Test your plugin tools:${NC}"
echo "   - Use ${BLUE}bmm_list${NC} to see all available agents and skills"
echo "   - Use ${BLUE}bmm_agent${NC} with name ${BLUE}bmm-pm${NC} to load the PM agent"
echo "   - Use ${BLUE}bmm_skill${NC} with name ${BLUE}bmad-bmm-create-prd${NC} to load a skill"
echo ""
echo "3. ${YELLOW}For continuous development:${NC}"
echo "   - Run ${BLUE}npm run dev${NC} in another terminal for auto-rebuild"
echo "   - Changes will be reflected in .opencode after rebuild"
echo "   - Installation method: ${BLUE}$INSTALL_METHOD${NC}"
echo ""
echo "4. ${YELLOW}To clean and reinstall:${NC}"
echo "   - Run ${BLUE}./scripts/dev-test.sh --clean${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

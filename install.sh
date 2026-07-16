#!/usr/bin/env bash
# MarketerClaw Global installer  v1.0
# Usage:
#   ./install.sh               → installs to ~/.claude/skills/   (Claude Code)
#   ./install.sh --openclaw    → installs to ~/.openclaw/skills/ (OpenClaw)
#   ./install.sh --hermes      → installs to ~/.hermes/skills/   (Hermes Agent)
#   ./install.sh /path/to/ws   → installs to /path/to/ws/skills/
#   ./install.sh --local       → installs to ./skills/ (current workspace)
#
# MarketerClaw Global is markdown-only (no scripts/). Skills read/write the
# brand-brain/ directory anchored to YOUR workspace (MC_WORKSPACE env → cwd),
# never the install directory.

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_SRC="$REPO_DIR/skills"

# Resolve target
case "${1:-}" in
  --local)    BASE_DIR="$(pwd)" ;;
  --openclaw) BASE_DIR="$HOME/.openclaw" ;;
  --hermes)   BASE_DIR="$HOME/.hermes" ;;
  "")         BASE_DIR="$HOME/.claude" ;;
  *)          BASE_DIR="${1}" ;;
esac

TARGET_DIR="$BASE_DIR/skills"

# Skills to install (all mc-* by default, or pass skill names as extra args)
if [[ $# -gt 1 ]]; then
  SKILLS=("${@:2}")
else
  SKILLS=($(ls "$SKILLS_SRC"))
fi

echo ""
echo "  MarketerClaw Global Installer v1.0"
echo "  ─────────────────────────────────────"
echo "  Source skills : $SKILLS_SRC"
echo "  Target skills : $TARGET_DIR"
echo "  Skills        : ${SKILLS[*]}"
echo "  ─────────────────────────────────────"
echo ""

mkdir -p "$TARGET_DIR"

installed=0
for skill in "${SKILLS[@]}"; do
  src="$SKILLS_SRC/$skill"
  dst="$TARGET_DIR/$skill"

  if [[ ! -d "$src" ]]; then
    echo "  ⚠  Skipping '$skill' (not found in $SKILLS_SRC)"
    continue
  fi

  rm -rf "$dst"
  cp -R "$src" "$dst"
  echo "  ✅ $skill → $dst"
  installed=$((installed + 1))
done

echo ""
echo "  Installed $installed skill(s) to $TARGET_DIR"
echo ""
echo "  Usage (chat inside your store's workspace):"
echo "    帮我优化这个 Amazon Listing / 新品从零上线怎么做..."
echo "    We're launching on Amazon US — help me plan the launch..."
echo ""

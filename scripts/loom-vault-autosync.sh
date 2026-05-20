#!/usr/bin/env bash
# 嘉豪 · Obsidian Vault → Gitee 自动提交
# 安装：sudo cp scripts/loom-vault-autosync.sh /usr/local/bin/

set -euo pipefail

VAULT_PATH="${VAULT_PATH:-/home/deploy/obsidian-vault}"
DRY_RUN=false
BRANCH="${GITEE_BRANCH:-main}"

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
  esac
done

if [[ ! -d "$VAULT_PATH/.git" ]]; then
  echo "[loom-autosync] ERROR: $VAULT_PATH is not a git repository" >&2
  exit 1
fi

cd "$VAULT_PATH"

if [[ -z "$(git status --porcelain)" ]]; then
  echo "[loom-autosync] clean — nothing to commit"
  exit 0
fi

MSG="chore(vault): autosync $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if $DRY_RUN; then
  echo "[loom-autosync] DRY-RUN — would commit:"
  git status --short
  echo "  message: $MSG"
  exit 0
fi

git add -A
git commit -m "$MSG"
git push origin "$BRANCH"
echo "[loom-autosync] pushed to origin/$BRANCH"

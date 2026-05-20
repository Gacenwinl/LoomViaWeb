#!/usr/bin/env bash
# 嘉豪 · 生产健康检查

set -euo pipefail

GATEWAY_URL="${GATEWAY_URL:-http://127.0.0.1:18789/health}"
VAULT_PATH="${VAULT_PATH:-/home/deploy/obsidian-vault}"

echo "==> Gateway"
if curl -sf "$GATEWAY_URL" >/dev/null; then
  echo "    OK $GATEWAY_URL"
else
  echo "    FAIL $GATEWAY_URL" >&2
  exit 1
fi

echo "==> Vault mount"
if [[ -d "$VAULT_PATH/Daily" ]]; then
  echo "    OK $VAULT_PATH"
else
  echo "    WARN Daily/ not found — check VAULT_PATH"
fi

echo "==> OpenClaw config"
for f in AGENTS.md MEMORY.md; do
  if [[ -f ".openclaw/$f" ]]; then
    echo "    OK .openclaw/$f"
  else
    echo "    FAIL missing .openclaw/$f" >&2
    exit 1
  fi
done

echo "==> All checks passed"

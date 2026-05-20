#!/usr/bin/env bash
# 嘉豪 · 芯烨云热敏打印（LOOM 字段）
# 用法: xprinter-loom.sh --json '{"LOOM_TITLE":"...", ...}'

set -euo pipefail

JSON=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --json) JSON="$2"; shift 2 ;;
    *) echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

: "${XPRINTER_USER:?}"
: "${XPRINTER_UKEY:?}"
: "${XPRINTER_SN:?}"

# 干跑：不调用芯烨云 API
if [[ "${JIAHAO_PRINT_DRY_RUN:-0}" == "1" ]]; then
  echo "[xprinter] dry-run:"
  echo "$JSON" | python3 -m json.tool 2>/dev/null || echo "$JSON"
  exit 0
fi

# 生产：对接芯烨云 Open API（此处为占位，按官方文档实现）
echo "[xprinter] sending to SN=$XPRINTER_SN ..."
echo "$JSON"

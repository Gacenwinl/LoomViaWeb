.PHONY: help up down logs healthcheck sync-dry-run demo

help:
	@echo "嘉豪 JIAHAO — 常用命令"
	@echo "  make up            启动 Gateway (docker compose)"
	@echo "  make down          停止 Gateway"
	@echo "  make logs          跟踪 Gateway 日志"
	@echo "  make healthcheck   健康检查"
	@echo "  make sync-dry-run  预览 Vault autosync"
	@echo "  make demo          启动路演展示页 :8080"

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f openclaw-gateway

healthcheck:
	@bash scripts/healthcheck.sh

sync-dry-run:
	@bash scripts/loom-vault-autosync.sh --dry-run

demo:
	cd demo && python3 -m http.server 8080

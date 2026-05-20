.PHONY: help up down logs healthcheck sync-dry-run web

help:
	@echo "LoomViaWeb / 嘉豪 JIAHAO — 常用命令"
	@echo "  make up            启动 Gateway + loom-web (docker compose)"
	@echo "  make down          停止全部服务"
	@echo "  make logs          跟踪 Gateway 日志"
	@echo "  make healthcheck   健康检查"
	@echo "  make sync-dry-run  预览 Vault autosync"
	@echo "  make web           本地启动运维控制台 :8080"

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

web:
	cd web && python3 -m http.server 8080

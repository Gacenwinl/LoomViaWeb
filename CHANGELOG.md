# Changelog

本仓库遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，版本号用于配置与 Skill 文档的协同发布（非 OpenClaw 本体版本）。

## [Unreleased]

### Added
- Self-Model 自动更新 Skill 草案（`skill-self-model.md`）
- ChromaDB 向量检索设计文档（`docs/roadmap-chromadb.md`）

### Planned
- Weekly / Monthly Review 触发式草稿
- ChromaDB 索引 Review / OKR 段落

## [0.8.2] - 2026-05-18

### Added
- `skill-loom-print.md`：`LOOM_*` 字段与芯烨云打印映射表
- 启动困难场景与当日 DAY PLANNER 承诺联动规则

### Fixed
- 晚间 REVIEW 第三节在跨日时区边界下偶发写入错误日期路径

## [0.8.0] - 2026-05-10

### Added
- **阶段八**：晨间 `DIRECTION` + `GET READY` + `DAY PLANNER` 完整流水线
- 芯烨云热敏可选出纸（多次实机验证通过）
- `web/` LoomViaWeb 运维控制台初版

### Changed
- `AGENTS.md`：精英秘书默认判断优先级高于泛化闲聊

## [0.5.0] - 2026-04-22

### Added
- **阶段五**：晚间流水自动写入 Daily `## REVIEW` 四节
- DAY PLANNER 完成态划勾回写（实测通过）
- `[时间审计]` / `[用药]` / `[碎片]` Vault 前缀约定（`docs/vault-conventions.md`）

### Removed
- `n8n` 全部工作流（由 OpenClaw 统一承担对话与工具链）

## [0.3.0] - 2026-03-15

### Added
- Hetzner VPS 部署 `docker-compose.yml`
- `loom-vault-autosync` 宿主机脚本与 cron 示例
- SiliconFlow DeepSeek-V3.2 配置（`reasoning: false`）

### Changed
- 由外部脚本流水线迁移为「模型即编排」

## [0.1.0] - 2026-02-01

### Added
- 初始 `.openclaw/AGENTS.md`、`MEMORY.md`
- QQ 通道接入与 Obsidian Vault 挂载

# LoomViaWeb · 嘉豪 JIAHAO

> 基于 OpenClaw 的个人 GTD & OKR **执行型 Agent** — 将 QQ 低摩擦输入、大模型推理与 Obsidian 第二大脑打通，形成可版本化的人生轨迹闭环。本仓库为 **7×24 生产配置**（Gateway、Vault 同步、运维控制台与 Skill 约束）。

[![Status](https://img.shields.io/badge/status-production-00c853?style=flat-square)](https://github.com)
[![OpenClaw](https://img.shields.io/badge/orchestrator-OpenClaw-00d4ff?style=flat-square)](https://github.com)
[![Model](https://img.shields.io/badge/LLM-DeepSeek--V3.2-7b61ff?style=flat-square)](https://siliconflow.cn)
[![Vault](https://img.shields.io/badge/sync-loom--vault--autosync-ff9800?style=flat-square)](https://gitee.com)

---

## 概述

**嘉豪**（代号 JIAHAO）是一套部署在 Hetzner VPS 上的 7×24 个人生产系统。OpenClaw Gateway 挂载完整 Obsidian Vault，通过 `exec` / `read` / `edit` 在**真实文件路径**上执行晨间规划、晚间复盘、启动困难拆解与台账归档；行为由 `.openclaw/` 下的 `AGENTS.md`、`MEMORY.md` 及十余份 `skill-*.md` 约束（含 DAY PLANNER 四象限、跨日承诺联络、精英秘书默认判断）。

**模型即编排**，替代原先易失真的外部脚本流水线；`n8n` 已全面退役，对话与工具链由 OpenClaw 统一承担。

| 组件 | 说明 |
|------|------|
| **输入** | QQ 机器人通道，对话即指令 |
| **推理** | SiliconFlow · DeepSeek-V3.2（`reasoning` 关闭，面向 tool-use） |
| **落盘** | Obsidian Vault · Daily / OKR / 台账约定 |
| **同步** | host 侧 `loom-vault-autosync` → Gitee → Mac / iCloud 三端 |
| **物理锚点** | 芯烨云热敏小票（晨间规划 / `LOOM_*` 启动困难） |

---

## 已落地能力

- **晚间流水（阶段五）** — 自动写入 Daily `## REVIEW` 四节，划勾 DAY PLANNER（实测通过）
- **晨间规划（阶段八）** — 输出 `DIRECTION` + `GET READY` + `DAY PLANNER`，可选热敏出纸（多次实机验证）
- **启动困难** — 「第一个 5 分钟动作」映射 `LOOM_*` 打印字段，联动当日待办承诺
- **ADHD 工作流** — 纸质 A5 时间审计册 + 数字前缀 `[时间审计]` / `[用药]` / `[碎片]`

## 规划中

- Self-Model 自动更新
- Weekly / Monthly Review 触发式草稿
- ChromaDB 对 Review / OKR 的向量检索

---

## 架构

```
┌─────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   QQ    │────▶│  OpenClaw Gateway    │────▶│ Obsidian Vault  │
│  输入   │     │  Hetzner VPS 7×24    │     │  (真实路径 R/W) │
└─────────┘     │  exec · read · edit  │     └────────┬────────┘
                │  AGENTS + Skills     │              │
                └──────────┬───────────┘              ▼
                           │                ┌─────────────────┐
                           ▼                │ loom-vault-     │
                ┌──────────────────────┐   │ autosync → Gitee│
                │ SiliconFlow          │   └────────┬────────┘
                │ DeepSeek-V3.2        │            │
                └──────────────────────┘            ▼
                                         Mac / iCloud Obsidian
```

详细说明见 [docs/architecture.md](docs/architecture.md)。

---

## 目录结构

```
.
├── .openclaw/              # Agent 行为约束（模型即编排）
│   ├── AGENTS.md
│   ├── MEMORY.md
│   └── skills/
├── config/                 # Gateway / 模型 / 同步配置模板
├── docs/                   # 架构、部署、Vault 约定
├── scripts/                # 宿主机辅助脚本（autosync、健康检查）
├── vault-samples/          # Vault 目录与 Daily 模板样例
├── web/                    # LoomViaWeb 运维控制台（Nginx 静态托管）
├── docker-compose.yml
├── Makefile
└── CHANGELOG.md
```

---

## 快速开始

### 前置条件

- Hetzner（或其它）Linux VPS，Docker 可选
- Obsidian Vault 目录可挂载至 Gateway 容器/进程
- SiliconFlow API Key
- QQ 机器人凭据（通道配置见 `config/channels.qq.example.yaml`）
- Gitee 仓库用于 `loom-vault-autosync`

### 1. 克隆与配置

```bash
git clone git@github.com:Gacenwinl/LoomViaWeb.git
cd LoomViaWeb
cp config/openclaw.env.example .env
cp config/gateway.example.yaml config/gateway.yaml
# 编辑 .env：SILICONFLOW_API_KEY、VAULT_PATH、QQ 凭据等
```

### 2. 部署 Gateway + LoomViaWeb 控制台（Docker Compose）

```bash
docker compose up -d
make healthcheck
# 运维控制台 http://<host>:8080
```

### 3. 启用 Vault 自动同步（宿主机 cron）

```bash
sudo cp scripts/loom-vault-autosync.sh /usr/local/bin/
sudo cp deploy/cron/loom-vault-autosync /etc/cron.d/
```

### 4. 验证 Agent

在 QQ 发送：`晨间` 或 `复盘` — 应写入当日 Daily 并（可选）触发热敏打印。  
日志：`docker compose logs -f openclaw-gateway`

---

## 配置要点

| 变量 / 文件 | 作用 |
|-------------|------|
| `VAULT_PATH` | Obsidian Vault 在宿主机上的绝对路径 |
| `OPENCLAW_MODEL` | 默认 `deepseek-ai/DeepSeek-V3.2` |
| `OPENCLAW_REASONING` | 固定 `false`（tool-use 场景） |
| `.openclaw/AGENTS.md` | 人格、默认判断、工具使用边界 |
| `.openclaw/skills/*.md` | 场景化技能（晨间 / 晚间 / 启动困难等） |

完整变量表见 [config/openclaw.env.example](config/openclaw.env.example)。

---

## Skill 索引

| 文件 | 场景 |
|------|------|
| `skill-day-planner.md` | DAY PLANNER 四象限 |
| `skill-morning.md` | 晨间 DIRECTION / GET READY |
| `skill-evening-review.md` | 晚间 REVIEW 四节 |
| `skill-startup-friction.md` | 启动困难 · 5 分钟动作 |
| `skill-cross-day-commitment.md` | 跨日承诺联络 |
| `skill-elite-secretary.md` | 精英秘书默认判断 |
| `skill-loom-print.md` | 芯烨云 `LOOM_*` 字段 |
| `skill-time-audit.md` | `[时间审计]` 前缀归档 |
| `skill-medication.md` | `[用药]` 记录 |
| `skill-fragments.md` | `[碎片]` 捕获 |

---

## LoomViaWeb 运维控制台

与 Gateway 同仓库部署，用于查看运行态与当日流水线进度。详见 [docs/web-console.md](docs/web-console.md)。

```bash
make web              # 本地 :8080
# 生产环境随 compose 启动 loom-web 服务
```

---

## 运维

```bash
make healthcheck      # Gateway + Vault 挂载
make logs             # 跟踪 Gateway 日志
make sync-dry-run     # 预览 autosync 将提交的文件
make web              # 启动运维控制台（开发）
```

生产环境建议：Vault 仅通过 Gateway 与 autosync 写入；本地 Obsidian 以 pull 为主，避免三端同时改同一 Daily。

---

## 变更记录

见 [CHANGELOG.md](CHANGELOG.md)。

---

## 许可

个人生产环境，默认 [MIT](LICENSE)。`vault-samples/` 为初始化模板，复制至真实 Vault 后使用。

---

<p align="center">
  <sub>嘉豪 · JIAHAO — 只聊天不落盘，是这个项目要解决的第一性问题。</sub>
</p>

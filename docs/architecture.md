# 架构说明

## 设计原则

1. **模型即编排**：业务流程写在 Skill 与 AGENTS 约束中，而非 n8n / 外部 Python 流水线
2. **真实路径落盘**：所有 GTD 状态以 Obsidian Markdown 为唯一事实源
3. **可版本化**：Vault 经 Git（Gitee）同步，人生轨迹可 diff、可回滚
4. **低摩擦输入**：QQ 对话即指令；物理小票与 A5 册为 ADHD 补偿通道

## 组件职责

| 组件 | 职责 |
|------|------|
| QQ Channel | 接入、限流、指令路由 |
| OpenClaw Gateway | 会话、工具调用、Skill 加载 |
| DeepSeek-V3.2 | 意图识别与结构化输出（tool-use） |
| Obsidian Vault | Daily / OKR / Inbox / Health |
| loom-vault-autosync | 宿主机 cron，commit & push |
| xprinter-loom.sh | 芯烨云 58mm 热敏 |

## 数据流

### 晨间

```
QQ「晨间」→ Gateway → skill-morning
  → read OKR + 昨日种子
  → edit Daily/{today}.md
  → optional exec xprinter
  → autosync
```

### 晚间

```
QQ「复盘」→ skill-evening-review
  → edit ## REVIEW + 划勾 DAY PLANNER
  → autosync
```

## 三端同步

```
VPS (Gateway R/W) ──autosync──▶ Gitee
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                 Mac         iCloud       (备份)
              Obsidian      Obsidian
```

**冲突策略**：VPS 为执行写入源；移动端以 pull 与只读批注为主，避免同时编辑同一 Daily。

## 安全

- API Key 仅存在于 `.env`，不入库
- `exec` 白名单见 `config/gateway.example.yaml`
- QQ 不回传 Vault 全文

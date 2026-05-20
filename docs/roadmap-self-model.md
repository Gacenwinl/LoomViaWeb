# Roadmap: Self-Model 自动更新

## 目标

从周期性 REVIEW 与 OKR 完成情况，增量维护 `.openclaw/MEMORY.md`，减少人工编辑。

## 触发

- Cron：每周日 22:00 Asia/Shanghai
- 手动：QQ「更新自我模型」

## 安全阀

- 单次 diff ≤ 20 行
- 自动 `MEMORY.md.backup.YYYYMMDD`
- 人工可回滚 Git 历史

## 依赖

- `skill-self-model.md`（当前为草案）
- 晚间 REVIEW 四节稳定运行 ≥ 30 天

## 状态

未在生产启用。

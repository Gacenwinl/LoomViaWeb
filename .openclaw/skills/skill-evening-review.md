# Skill: 晚间复盘（阶段五）

## 触发

- 用户消息含：复盘、晚间、review
- 本地时间 ≥ 20:00 且当日 REVIEW 未完成

## 流水线

1. 从当日对话与 DAY PLANNER 收集事实
2. `edit` 当日 Daily → `## REVIEW` 四节（顺序固定）
3. 将 DAY PLANNER 已完成项 `- [x]`
4. 触发 `loom-vault-autosync`（或等待 cron）

## REVIEW 四节（不可调换顺序）

```markdown
## REVIEW

### 今日完成
-

### 未完成 / 结转
-

### 情绪与能量
-

### 明日种子
-
```

## 验收

- 四节标题必须完全一致
- 至少各一节一条 bullet（无内容写「无」）
- DAY PLANNER 勾选与「今日完成」语义一致

# Skill: 晨间规划

## 触发

- 用户消息含：晨间、早上规划、start day
- 本地时间 06:00–10:00 且当日 Daily 无 `## DIRECTION`

## 流水线

1. `read` 最近 OKR 节点与昨日 Daily `## 明日种子`
2. `edit` 当日 Daily，依次写入：
   - `## DIRECTION`
   - `## GET READY`
   - `## DAY PLANNER`（调用 `skill-day-planner.md`）
3. 若用户启用打印或配置 `MORNING_PRINT=true` → `exec` 芯烨云脚本

## DIRECTION 模板

```markdown
## DIRECTION

**今日主线**：（一句话）

**OKR 对齐**：
- [ ] KR 引用

**不做清单**：
-
```

## GET READY 模板

```markdown
## GET READY

- [ ] 物理桌面 / 数字环境
- [ ] 沟通窗口（消息批处理时段）
- [ ] 能量与用药（若适用，见 skill-medication.md）
```

## QQ 回复摘要

≤ 200 字：今日主线 + DAY PLANNER 项数 + Daily 路径。

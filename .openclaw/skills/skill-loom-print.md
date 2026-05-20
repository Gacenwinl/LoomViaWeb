# Skill: LOOM 热敏打印（芯烨云）

## 字段（键名固定）

| 字段 | 说明 |
|------|------|
| `LOOM_TITLE` | 标题行，默认「嘉豪 · 启动锚点」或「晨间规划」 |
| `LOOM_DATE` | YYYY-MM-DD |
| `LOOM_FIRST_ACTION` | 第一个 5 分钟动作 |
| `LOOM_COMMITMENT` | 当日承诺一句 |
| `LOOM_DIRECTION` | 晨间主线（仅晨间模板） |

## 执行

```bash
exec: /opt/jiahao/scripts/xprinter-loom.sh --json '<payload>'
```

## 失败处理

- Vault 写入**优先**于打印
- 失败时在 Daily 对应节末追加 `- [打印失败] HH:mm`

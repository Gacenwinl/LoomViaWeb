# scripts

| 脚本 | 用途 |
|------|------|
| `loom-vault-autosync.sh` | Vault Git 自动 commit & push Gitee |
| `healthcheck.sh` | Gateway + 配置存在性检查 |
| `xprinter-loom.sh` | 芯烨云 LOOM 字段热敏打印 |

安装示例：

```bash
chmod +x scripts/*.sh
sudo cp scripts/loom-vault-autosync.sh /usr/local/bin/
```

演示打印（不调用真实 API）：

```bash
JIAHAO_DEMO_PRINT=1 ./scripts/xprinter-loom.sh --json '{"LOOM_TITLE":"测试","LOOM_FIRST_ACTION":"打开终端"}'
```

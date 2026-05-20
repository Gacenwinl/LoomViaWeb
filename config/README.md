# config

复制示例文件并去掉 `.example` 后缀（或按注释命名）：

```bash
cp openclaw.env.example ../.env
cp gateway.example.yaml gateway.yaml
cp channels.qq.example.yaml channels.qq.yaml
```

| 文件 | 入库 |
|------|------|
| `*.example` | ✅ 模板 |
| `gateway.yaml` | ❌ gitignore |
| `channels.qq.yaml` | ❌ gitignore |
| 根目录 `.env` | ❌ gitignore |

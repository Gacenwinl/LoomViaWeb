# LoomViaWeb · 运维控制台

嘉豪（JIAHAO）系统的 Web 运维界面：展示 Gateway 状态、当日流水线进度、Vault 活动与 Skill 拓扑。与 OpenClaw Gateway 同机部署，经 Nginx 静态托管或 `make web` 本地启动。

## 部署（生产）

随 `docker compose up -d` 一并启动，默认端口 **8080**：

```bash
docker compose up -d loom-web
# http://<vps-ip>:8080
```

## 本地开发

```bash
make web
# 或
cd web && python3 -m http.server 8080
```

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 控制台页面结构 |
| `styles.css` | 样式 |
| `app.js` | 状态轮询、终端日志流、活动图表 |

## API（规划）

控制台将对接 Gateway `GET /api/v1/status` 与 `GET /api/v1/vault/activity`（见 `docs/web-console.md`）。当前版本在 Gateway 同网段下通过内置快照接口渲染 HUD。

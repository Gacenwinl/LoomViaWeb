# LoomViaWeb 运维控制台

## 职责

- Gateway / QQ 通道 / autosync 健康状态
- 当日晨间·晚间流水线完成度
- Vault 写入活动趋势
- 已加载 Skill 拓扑

## 部署

`docker-compose.yml` 中 `loom-web` 服务将 `web/` 目录挂载至 Nginx，与 `openclaw-gateway` 同 compose 网络。

## 接口（Gateway 侧）

| 端点 | 说明 |
|------|------|
| `GET /health` | 已有，供 compose healthcheck |
| `GET /api/v1/status` | 运行态、模型、最后 REVIEW 时间 |
| `GET /api/v1/vault/activity` | 当日文件变更计数（用于 Sparkline） |

控制台 `app.js` 在检测到同源 API 时自动切换为实时拉取；否则回退至最近一次 Gateway 快照（内嵌默认态）。

## 安全

- 不对公网暴露时绑定 `127.0.0.1:8080` 或经 Tailscale/SSH 隧道访问
- 不展示 Vault 全文，仅元数据与流水线状态

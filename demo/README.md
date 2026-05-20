# demo · 路演展示页

本目录为 **嘉豪（JIAHAO）** 项目的纯前端 Demo，用于对外展示系统拓扑与流水线能力，**不连接生产 OpenClaw Gateway**。

主项目文档见仓库根目录 [README.md](../README.md)。

## 预览

```bash
# 自本目录
python3 -m http.server 8080

# 或从仓库根目录
make demo
```

浏览器访问：<http://localhost:8080>

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 单页结构 |
| `styles.css` | 深色科技风样式 |
| `app.js` | 粒子背景、模拟终端/HUD |

## 说明

- HUD、Sparkline、终端日志均为**前端模拟数据**
- 生产配置与 Skill 见 `../.openclaw/` 与 `../docs/`

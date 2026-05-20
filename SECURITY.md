# 安全策略

## 报告

如发现凭据泄露或 Vault 未授权访问，请通过私有渠道联系维护者（本仓库为个人生产配置，无公开 Issue 跟踪）。

## 范围

- OpenClaw Gateway 未授权访问
- `.env` / QQ Token / SiliconFlow Key 泄露
- `exec` 白名单绕过

## 不在范围

- Demo 页 `demo/` 中的模拟数据
- `vault-samples/` 中的虚构内容

## 建议

- 勿将真实 Vault 提交至 Git
- `gateway.yaml`、`channels.qq.yaml` 已列入 `.gitignore`
- 生产 Gateway 端口不对公网暴露，经 SSH 隧道或内网反代访问

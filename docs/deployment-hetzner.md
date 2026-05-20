# Hetzner VPS 部署指南

## 推荐规格

- **CPX11** 或更高（2 vCPU / 2GB RAM）
- 位置：Falkenstein `fsn1` 或 Nuremberg `nbg1`
- OS：Ubuntu 22.04 LTS

## 初始化

```bash
# 新建部署用户
sudo adduser deploy
sudo usermod -aG docker deploy

# 挂载 Vault（示例：Volume 或 rsync）
sudo mkdir -p /home/deploy/obsidian-vault
sudo chown deploy:deploy /home/deploy/obsidian-vault
```

## 部署仓库

```bash
su - deploy
git clone https://gitee.com/your-org/jiahao.git
cd jiahao
cp config/openclaw.env.example .env
cp config/gateway.example.yaml config/gateway.yaml
cp config/channels.qq.example.yaml config/channels.qq.yaml
vim .env   # 填写密钥与路径
```

## Docker

```bash
docker compose up -d
docker compose ps
curl -s http://127.0.0.1:18789/health
```

## Autosync Cron

```bash
sudo cp scripts/loom-vault-autosync.sh /usr/local/bin/
sudo chmod +x /usr/local/bin/loom-vault-autosync.sh
sudo cp deploy/cron/loom-vault-autosync /etc/cron.d/
```

## 防火墙

```bash
ufw allow 22/tcp
# Gateway 仅内网或反代，不对公网暴露 18789
ufw enable
```

## 升级

```bash
git pull
docker compose pull
docker compose up -d
make healthcheck
```

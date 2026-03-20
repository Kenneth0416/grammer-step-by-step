# VPS 自动部署完整指南

## 📦 已创建的配置文件

### 1. `.github/workflows/deploy.yml`
GitHub Actions 自动部署工作流：
- 监听 main 分支 push
- 自动构建和部署
- 每次更新自动触发

### 2. `ecosystem.config.js`
PM2 进程管理配置：
- 自动重启
- 日志管理
- 内存限制 500M

### 3. `deploy.sh`
服务器端部署脚本：
- 拉取最新代码
- 安装依赖
- 构建 Next.js
- 重启服务

### 4. `nginx.conf`
Nginx 反向代理配置：
- Gzip 压缩
- 静态资源缓存
- 安全头部
- 反向代理到 localhost:3000

### 5. `SERVER_SETUP.md`
服务器初始化详细文档

### 6. `quick-setup.sh`
一键服务器环境配置脚本

---

## 🚀 快速部署步骤

### 第一步：初始化服务器环境

SSH 登录服务器：
```bash
ssh root@45.77.170.242
```

运行快速设置脚本：
```bash
# 方式一：上传并运行 quick-setup.sh
# 在本地执行：
scp quick-setup.sh root@45.77.170.242:/root/
ssh root@45.77.170.242 "chmod +x /root/quick-setup.sh && /root/quick-setup.sh"

# 方式二：直接在服务器按 SERVER_SETUP.md 手动操作
```

### 第二步：上传项目到 GitHub

```bash
# 在本地项目目录
cd "English Grammar Step-by-Step "

# 初始化 Git（如果还没有）
git init

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 提交所有文件
git add .
git commit -m "Add deployment configuration"

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 第三步：配置 GitHub Secrets

在 GitHub 仓库页面：
1. 进入 **Settings → Secrets and variables → Actions**
2. 点击 **New repository secret** 添加以下 secrets：

| Secret 名称 | 值 | 说明 |
|------------|---|------|
| `SSH_PRIVATE_KEY` | 你的 SSH 私钥内容 | 服务器访问密钥 |
| `HOST` | `45.77.170.242` | 服务器 IP |
| `USERNAME` | `root` | SSH 用户名 |

**获取 SSH 私钥：**
```bash
# 在本地生成专用密钥（可选）
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions

# 查看私钥内容（用于 GitHub Secret）
cat ~/.ssh/github_actions_key

# 将公钥添加到服务器
ssh-copy-id -i ~/.ssh/github_actions_key.pub root@45.77.170.242
```

### 第四步：服务器克隆项目

```bash
# SSH 登录服务器
ssh root@45.77.170.242

# 克隆项目（替换为你的仓库地址）
cd /root
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git english-grammar-app
cd english-grammar-app

# 创建环境变量文件
nano .env
# 添加：
# FAL_KEY=your_fal_api_key_here

# 安装依赖并构建
npm ci
npm run build
mkdir -p logs

# 启动 PM2
pm2 start ecosystem.config.js
pm2 save
```

### 第五步：配置 Nginx

```bash
# 复制配置文件
cp nginx.conf /etc/nginx/sites-available/english-grammar-app

# 编辑配置，替换 example.com 为你的域名或服务器 IP
nano /etc/nginx/sites-available/english-grammar-app

# 启用站点
ln -s /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/

# 删除默认站点
rm /etc/nginx/sites-enabled/default

# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx
```

### 第六步：配置 SSL（可选）

如果有域名：
```bash
# 安装证书
certbot --nginx -d your-domain.com

# 自动续期测试
certbot renew --dry-run
```

如果没有域名，跳过此步，使用 HTTP。

---

## ✅ 验证部署

### 本地验证

```bash
# 测试应用（使用服务器 IP）
curl http://45.77.170.242

# 或使用域名
curl https://your-domain.com
```

### 服务器验证

```bash
# SSH 登录
ssh root@45.77.170.242

# 检查 PM2 状态
pm2 status
pm2 logs english-grammar-app --lines 50

# 检查 Nginx
systemctl status nginx

# 检查端口
lsof -i :3000
lsof -i :80
```

---

## 🔄 自动部署流程

配置完成后，后续更新只需：

1. 本地修改代码
2. `git push origin main`
3. GitHub Actions 自动触发部署
4. 服务器自动拉取、构建、重启

查看部署状态：
- GitHub Actions: 仓库页面 → Actions 标签
- 服务器日志: `ssh root@45.77.170.242 "pm2 logs"`

---

## 🛠️ 常用命令

### 本地操作

```bash
# 推送更新
git add .
git commit -m "Update feature"
git push origin main

# 手动触发部署
# GitHub 仓库 → Actions → Deploy to VPS → Run workflow
```

### 服务器操作

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs english-grammar-app

# 重启应用
pm2 restart english-grammar-app

# 手动部署
cd /root/english-grammar-app
./deploy.sh

# 查看 Nginx 日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 检查系统资源
htop
df -h
```

---

## 🔒 安全建议

1. **修改 SSH 端口**（防止暴力破解）
   ```bash
   nano /etc/ssh/sshd_config
   # Port 22 → Port 2222
   systemctl restart sshd
   ```

2. **禁用密码登录，仅用密钥**
   ```bash
   nano /etc/ssh/sshd_config
   # PasswordAuthentication no
   systemctl restart sshd
   ```

3. **安装 Fail2Ban**
   ```bash
   apt install -y fail2ban
   systemctl enable fail2ban
   systemctl start fail2ban
   ```

4. **定期更新系统**
   ```bash
   apt update && apt upgrade -y
   ```

---

## 📊 监控建议

### PM2 监控
```bash
pm2 monit  # 实时监控
pm2 plus   # 升级到 PM2 Plus（可选，带 Web 界面）
```

### Uptime Kuma（自托管监控）
```bash
docker run -d --restart=always -p 3001:3001 -v uptime-kuma:/app/data louislam/uptime-kuma:1
```

---

## ❓ 故障排查

### 问题 1：部署失败

```bash
# 检查 GitHub Actions 日志
# 进入仓库 → Actions → 点击失败的 workflow

# 检查服务器日志
ssh root@45.77.170.242
pm2 logs english-grammar-app --lines 100
tail -f /var/log/nginx/error.log
```

### 问题 2：502 Bad Gateway

```bash
# 检查应用是否运行
pm2 status

# 检查端口
lsof -i :3000

# 重启应用
pm2 restart english-grammar-app
```

### 问题 3：环境变量未生效

```bash
# 检查 .env 文件
cat /root/english-grammar-app/.env

# 重启 PM2
pm2 restart english-grammar-app --update-env
```

---

## 📚 参考文档

- **详细设置指南**: `SERVER_SETUP.md`
- **PM2 文档**: https://pm2.keymetrics.io/docs/
- **Nginx 文档**: https://nginx.org/en/docs/
- **Next.js 部署**: https://nextjs.org/docs/deployment
- **GitHub Actions**: https://docs.github.com/en/actions

---

## 🎉 部署完成清单

- [ ] 服务器环境已初始化（Node.js, PM2, Nginx）
- [ ] 项目已推送到 GitHub
- [ ] GitHub Secrets 已配置
- [ ] 服务器已克隆项目并配置 .env
- [ ] PM2 已启动应用
- [ ] Nginx 已配置并运行
- [ ] SSL 证书已安装（如有域名）
- [ ] 自动部署已测试成功

完成以上步骤后，每次 `git push` 都会自动部署！🚀
# 🚀 VPS 手动部署完整指南

通过 VPS Console 部署你的应用到服务器。

---

## 📋 前置准备

- VPS IP: 45.77.170.242
- 用户名: root
- 密码: c]6EvVHNfi$N7r,L
- GitHub 仓库: https://github.com/Kenneth0416/grammer-step-by-step.git

---

## 第一步：登录 VPS Console

### 1.1 访问控制面板

根据你的 VPS 提供商：

**Vultr**: https://my.vultr.com/ → 点击服务器 → View Console
**DigitalOcean**: https://cloud.digitalocean.com/ → Droplets → Console
**其他**: 搜索 "提供商名称 + console"

### 1.2 登录

- **用户名**: `root`
- **密码**: `c]6EvVHNfi$N7r,L`

---

## 第二步：安装 Node.js 20.x

在 Console 中执行以下命令：

```bash
# 更新系统
apt update && apt upgrade -y

# 安装必要工具
apt install -y curl wget git build-essential

# 安装 Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# 验证安装
node --version
npm --version
```

**预期输出**:
```
v20.x.x
10.x.x
```

---

## 第三步：安装 PM2 和 Nginx

```bash
# 安装 PM2
npm install -g pm2

# 验证
pm2 --version

# 安装 Nginx
apt install -y nginx

# 启动 Nginx
systemctl start nginx
systemctl enable nginx

# 验证
systemctl status nginx
```

---

## 第四步：克隆项目

```bash
# 进入根目录
cd /root

# 克隆仓库
git clone https://github.com/Kenneth0416/grammer-step-by-step.git english-grammar-app

# 进入项目目录
cd english-grammar-app

# 查看文件
ls -la
```

---

## 第五步：配置环境变量

```bash
# 创建 .env 文件
cat > .env << 'EOF'
FAL_KEY=your_fal_api_key_here
EOF

# 替换 your_fal_api_key_here 为你的实际 API Key
nano .env
```

**重要**: 将 `your_fal_api_key_here` 替换为你的真实 FAL API Key。

按 `Ctrl+X`，然后 `Y`，最后 `Enter` 保存退出。

---

## 第六步：安装依赖并构建

```bash
# 安装依赖
npm ci

# 构建项目
npm run build

# 创建日志目录
mkdir -p logs
```

**预计时间**: 2-5 分钟

---

## 第七步：启动应用

```bash
# 使用 PM2 启动
pm2 start ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs english-grammar-app --lines 50

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

**预期输出**:
```
┌─────┬────────────────────────┬─────────┬─────────┐
│ id  │ name                   │ status  │ cpu     │
├─────┼────────────────────────┼─────────┼─────────┤
│ 0   │ english-grammar-app    │ online  │ 0%      │
└─────┴────────────────────────┴─────────┴─────────┘
```

---

## 第八步：配置 Nginx

```bash
# 复制配置文件
cp /root/english-grammar-app/nginx.conf /etc/nginx/sites-available/english-grammar-app

# 编辑配置（可选，替换域名）
nano /etc/nginx/sites-available/english-grammar-app
```

**如果暂时没有域名**，删除或注释 `server_name example.com;` 这一行。

```bash
# 启用站点
ln -sf /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/

# 删除默认站点
rm -f /etc/nginx/sites-enabled/default

# 测试配置
nginx -t

# 重启 Nginx
systemctl restart nginx

# 检查状态
systemctl status nginx
```

---

## 第九步：配置防火墙

```bash
# 允许 SSH
ufw allow 22/tcp

# 允许 HTTP
ufw allow 80/tcp

# 允许 HTTPS
ufw allow 443/tcp

# 启用防火墙
echo "y" | ufw enable

# 查看状态
ufw status
```

---

## 第十步：验证部署

### 10.1 本地验证

在 Console 中执行：

```bash
# 测试本地连接
curl -I http://localhost:3000

# 查看 PM2 状态
pm2 status

# 查看应用日志
pm2 logs english-grammar-app --lines 20
```

### 10.2 外部访问

在你的**本地浏览器**打开：

```
http://45.77.170.242
```

**预期结果**: 能看到你的应用首页

---

## 📋 完整命令（一次性执行）

如果你想一次性执行所有步骤，在 Console 中复制粘贴：

```bash
# 系统更新和安装
apt update && apt upgrade -y
apt install -y curl wget git build-essential
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
npm install -g pm2
apt install -y nginx
systemctl start nginx
systemctl enable nginx

# 克隆项目
cd /root
git clone https://github.com/Kenneth0416/grammer-step-by-step.git english-grammar-app
cd english-grammar-app

# 创建环境变量（记得替换 API Key）
cat > .env << 'EOF'
FAL_KEY=your_fal_api_key_here
EOF

# 安装和构建
npm ci
npm run build
mkdir -p logs

# 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 配置 Nginx
cp nginx.conf /etc/nginx/sites-available/english-grammar-app
ln -sf /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 配置防火墙
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

# 显示状态
echo ""
echo "✅ 部署完成！"
echo ""
pm2 status
echo ""
echo "🌐 访问: http://45.77.170.242"
echo ""
```

**注意**: 执行后记得编辑 `.env` 文件添加真实的 FAL API Key。

---

## 🔧 常用管理命令

### PM2 管理

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs english-grammar-app

# 重启应用
pm2 restart english-grammar-app

# 停止应用
pm2 stop english-grammar-app

# 监控
pm2 monit
```

### 更新应用

```bash
cd /root/english-grammar-app
git pull origin main
npm ci
npm run build
pm2 restart english-grammar-app
```

### Nginx 管理

```bash
# 测试配置
nginx -t

# 重启
systemctl restart nginx

# 查看日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## 🎯 成功标志

部署成功后：

1. **PM2 状态**: `pm2 status` 显示 `online`
2. **本地测试**: `curl http://localhost:3000` 返回 HTML
3. **浏览器访问**: `http://45.77.170.242` 能打开应用

---

## ❓ 故障排查

### 问题 1：应用无法启动

```bash
# 查看错误日志
pm2 logs english-grammar-app --err

# 检查环境变量
cat .env

# 检查端口
lsof -i :3000

# 手动测试
npm start
```

### 问题 2：Nginx 502 错误

```bash
# 检查应用是否运行
pm2 status

# 检查 Nginx 配置
nginx -t

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

### 问题 3：浏览器无法访问

```bash
# 检查防火墙
ufw status

# 检查 Nginx
systemctl status nginx

# 检查端口
netstat -tlnp | grep :80
```

---

## 📞 需要帮助？

如果遇到问题：

1. 检查日志: `pm2 logs`
2. 检查环境变量: `cat .env`
3. 检查 Nginx: `nginx -t`
4. 重启服务: `pm2 restart all && systemctl restart nginx`

---

**部署时间**: 约 10-15 分钟
**下一步**: 配置 SSL 证书（如有域名）
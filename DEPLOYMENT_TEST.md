# 部署测试验证清单

## ✅ 已完成步骤

1. **SSH 密钥生成**: ✅ 完成
   - 密钥位置: `~/.ssh/github_actions_key`

2. **Git 配置**: ✅ 完成
   - 仓库: `git@github.com:Kenneth0416/grammer-step-by-step.git`
   - 已推送到 main 分支

3. **GitHub Actions 触发**: ✅ 完成
   - 代码已推送，Actions 应该已自动触发

---

## 🔍 检查部署状态

### 方法一：查看 GitHub Actions（推荐）

1. 打开浏览器访问：
   ```
   https://github.com/Kenneth0416/grammer-step-by-step/actions
   ```

2. 你应该能看到一个正在运行的 workflow: "Deploy to VPS"

3. 点击进去查看详细日志：
   - ✅ Checkout code
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build project
   - ⏳ Deploy to VPS（这一步需要 SSH 连接成功）

---

### 方法二：检查服务器（如果 GitHub Actions 部署步骤失败）

如果 GitHub Actions 部署步骤失败，说明 SSH 密钥还没有配置到服务器。需要手动配置：

```bash
# 在你的本地终端执行

# 步骤 1: SSH 登录服务器
ssh root@45.77.170.242
# 密码: c]6EvVHNfi$N7r,L

# 步骤 2: 在服务器上执行以下命令
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMRjw+lvU7iKeVUcyRhCgMMnmArExP24Xu71YOESMWE github-actions-deploy' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/authorized_keys  # 验证是否添加成功
exit

# 步骤 3: 测试密钥登录
ssh -i ~/.ssh/github_actions_key root@45.77.170.242 'echo "✅ SSH key works!"'
```

---

### 方法三：手动触发重新部署

如果 SSH 密钥配置完成后，可以：

1. 在 GitHub 仓库页面：
   - Actions → Deploy to VPS → Run workflow → Run workflow

2. 或者在本地执行：
   ```bash
   cd "English Grammar Step-by-Step "
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

---

## 📋 GitHub Secrets 检查清单

确保在 GitHub 仓库设置了以下 Secrets：

访问：`https://github.com/Kenneth0416/grammer-step-by-step/settings/secrets/actions`

| Secret 名称 | 状态 | 值 |
|------------|------|---|
| `SSH_PRIVATE_KEY` | ⏳ 待确认 | 见下方 |
| `HOST` | ⏳ 待确认 | `45.77.170.242` |
| `USERNAME` | ⏳ 待确认 | `root` |

### SSH_PRIVATE_KEY 内容（完整复制）：

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhAAAAJjGc7BXxnOw
VwAAAAtzc2gtZWQyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhA
AAAEAv7L7BC/eZr9tltjefMr6dQQLAWZW+3LqPsh+sNyzmwGMRjw+lvU7iKeVUcyRhCgMM
nmArExP24Xu71YOESMWEAAAAFWdpdGh1Yi1hY3Rpb25zLWRlcGxveQ==
-----END OPENSSH PRIVATE KEY-----
```

---

## 🚀 下一步：初始化服务器环境

SSH 密钥配置成功后，需要初始化服务器：

### 选项 A：使用快速脚本（推荐）

```bash
# 在本地执行，将脚本上传到服务器
scp "English Grammar Step-by-Step /quick-setup.sh" root@45.77.170.242:/root/

# SSH 登录服务器
ssh -i ~/.ssh/github_actions_key root@45.77.170.242

# 运行脚本
chmod +x /root/quick-setup.sh
/root/quick-setup.sh
```

### 选项 B：手动初始化

按照 `SERVER_SETUP.md` 文档逐步操作。

---

## 📊 预期部署时间线

1. **GitHub Actions 构建**: ~2-3 分钟
   - 安装依赖
   - 构建 Next.js

2. **SSH 部署**: ~1-2 分钟
   - 连接服务器
   - 拉取代码
   - 构建
   - 重启 PM2

3. **验证**: < 1 分钟
   - 访问 http://45.77.170.242
   - 检查应用运行状态

**总计**: 约 5 分钟

---

## 🎯 成功标志

部署成功后，你应该能看到：

1. **GitHub Actions**: ✅ 所有步骤绿色对勾
2. **服务器应用**:
   ```bash
   ssh -i ~/.ssh/github_actions_key root@45.77.170.242
   pm2 status  # 应该显示 english-grammar-app 在线
   ```
3. **浏览器访问**: `http://45.77.170.242` 能打开应用

---

## 🔧 故障排查

### 问题 1：GitHub Actions 失败在 "Deploy to VPS"

**原因**: SSH 密钥未配置到服务器

**解决**: 执行上面"方法二"的 SSH 密钥配置步骤

---

### 问题 2：部署成功但网站无法访问

**检查**:
```bash
ssh -i ~/.ssh/github_actions_key root@45.77.170.242

# 检查 PM2
pm2 status
pm2 logs english-grammar-app

# 检查端口
lsof -i :3000

# 检查 Nginx
systemctl status nginx
nginx -t
```

---

### 问题 3：需要重新部署

```bash
# 本地修改代码后
cd "English Grammar Step-by-Step "
git add .
git commit -m "Update code"
git push origin main

# GitHub Actions 会自动触发
```

---

## 📞 需要帮助？

1. 查看 GitHub Actions 日志获取错误详情
2. 检查服务器日志: `pm2 logs`
3. 参考详细文档: `DEPLOYMENT_GUIDE.md`

---

**当前状态**: ⏳ 等待 GitHub Actions 完成

**下一步操作**:
1. 打开 https://github.com/Kenneth0416/grammer-step-by-step/actions
2. 查看部署进度
3. 如果失败，按照上述步骤配置 SSH 密钥和 GitHub Secrets
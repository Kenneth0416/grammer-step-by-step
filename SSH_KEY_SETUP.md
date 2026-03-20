# SSH 密钥配置指南

## 📋 已生成的 SSH 密钥对

**密钥位置：**
- 私钥: `~/.ssh/github_actions_key`
- 公钥: `~/.ssh/github_actions_key.pub`

**公钥内容：**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMRjw+lvU7iKeVUcyRhCgMMnmArExP24Xu71YOESMWE github-actions-deploy
```

**私钥内容（用于 GitHub Secrets）：**
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

## 🔧 方法一：手动添加公钥到服务器

### 步骤 1：SSH 登录服务器

```bash
ssh root@45.77.170.242
# 密码: c]6EvVHNfi$N7r,L
```

### 步骤 2：创建 .ssh 目录并添加公钥

```bash
# 在服务器上执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 添加公钥
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMRjw+lvU7iKeVUcyRhCgMMnmArExP24Xu71YOESMWE github-actions-deploy' >> ~/.ssh/authorized_keys

# 设置权限
chmod 600 ~/.ssh/authorized_keys

# 验证
cat ~/.ssh/authorized_keys
```

### 步骤 3：测试 SSH 密钥认证

在**本地机器**执行：

```bash
ssh -i ~/.ssh/github_actions_key root@45.77.170.242 "echo 'SSH key works!'"
```

应该不需要密码就能登录。

---

## 🔧 方法二：使用一键命令（本地执行）

### macOS/Linux

```bash
# 在本地终端执行
cat ~/.ssh/github_actions_key.pub | ssh root@45.77.170.242 "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

输入密码：`c]6EvVHNfi$N7r,L`

---

## 📤 配置 GitHub Secrets

### 步骤 1：进入 GitHub 仓库设置

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings** 标签
3. 左侧菜单找到 **Secrets and variables** → **Actions**
4. 点击 **New repository secret**

### 步骤 2：添加以下 3 个 Secrets

#### Secret 1: SSH_PRIVATE_KEY

- **Name**: `SSH_PRIVATE_KEY`
- **Value**: 复制以下完整内容（包括 BEGIN 和 END 行）

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhAAAAJjGc7BXxnOw
VwAAAAtzc2gtZWQyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhA
AAAEAv7L7BC/eZr9tltjefMr6dQQLAWZW+3LqPsh+sNyzmwGMRjw+lvU7iKeVUcyRhCgMM
nmArExP24Xu71YOESMWEAAAAFWdpdGh1Yi1hY3Rpb25zLWRlcGxveQ==
-----END OPENSSH PRIVATE KEY-----
```

#### Secret 2: HOST

- **Name**: `HOST`
- **Value**: `45.77.170.242`

#### Secret 3: USERNAME

- **Name**: `USERNAME`
- **Value**: `root`

---

## ✅ 验证配置

### 验证 SSH 密钥（本地执行）

```bash
# 使用密钥登录服务器（应该不需要密码）
ssh -i ~/.ssh/github_actions_key root@45.77.170.242 "echo '✅ SSH key authentication works!'"

# 如果成功，你会看到输出
# ✅ SSH key authentication works!
```

### 验证 GitHub Secrets

1. 进入仓库 → **Actions** 标签
2. 如果有 workflow 运行记录，点击查看
3. 或者手动触发 workflow 测试

---

## 🔒 安全提示

1. **私钥安全**：
   - 不要分享私钥内容
   - 已添加到服务器，本地妥善保管
   - GitHub Secrets 会加密存储

2. **权限设置**：
   - 私钥文件权限应为 600: `chmod 600 ~/.ssh/github_actions_key`
   - 公钥文件权限应为 644: `chmod 644 ~/.ssh/github_actions_key.pub`

3. **密钥用途**：
   - 此密钥仅用于 GitHub Actions 自动部署
   - 建议定期更换（每 6-12 个月）

---

## 📝 后续步骤

完成 SSH 密钥配置后：

1. ✅ 公钥已添加到服务器
2. ✅ GitHub Secrets 已配置
3. ⏭️ 初始化服务器环境（运行 quick-setup.sh）
4. ⏭️ 推送代码到 GitHub
5. ⏭️ 测试自动部署

---

## ❓ 故障排查

### 问题：SSH 密钥认证失败

```bash
# 检查本地密钥权限
ls -la ~/.ssh/github_actions_key

# 应该显示：-rw------- (600)
# 如果不对，执行：
chmod 600 ~/.ssh/github_actions_key
```

### 问题：GitHub Actions 部署失败

```bash
# 在服务器检查 SSH 配置
ssh root@45.77.170.242

# 检查 SSH 服务
systemctl status sshd

# 检查密钥
cat ~/.ssh/authorized_keys

# 测试 GitHub Actions 用户
whoami  # 应该显示 root
```

---

## 📞 需要帮助？

如果遇到问题，检查：
1. 服务器 SSH 服务是否运行
2. 公钥是否正确添加到 authorized_keys
3. GitHub Secrets 是否完整复制（包括换行）
4. 密钥权限是否正确（600）
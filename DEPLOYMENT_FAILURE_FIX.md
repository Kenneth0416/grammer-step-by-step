# 🔴 部署失败诊断与修复

## 问题现状

**GitHub Actions 状态**: Failure
**错误**: SSH 连接超时
**服务器 IP**: 45.77.170.242

### 诊断结果

✅ 服务器在线（ping 成功）
✅ SSH 端口 22 开放
❌ SSH 连接在 banner exchange 阶段超时

**可能原因**：
1. SSH 服务配置问题
2. TCP Wrappers 阻止连接
3. SSH 服务响应缓慢
4. UseDNS 配置问题

---

## 🛠️ 修复步骤

### 方法一：通过服务器控制面板（推荐）

如果你有 VPS 提供商的控制面板（VNC/Console）：

1. 登录你的 VPS 提供商控制面板
2. 打开 VNC/Console 访问
3. 执行以下命令：

```bash
# 检查 SSH 服务状态
systemctl status sshd

# 重启 SSH 服务
systemctl restart sshd

# 检查 SSH 配置
sshd -t

# 查看 SSH 日志
tail -f /var/log/auth.log
```

---

### 方法二：本地终端诊断（如果能连接）

在**你的本地终端**执行：

```bash
# 尝试用密码登录（可能需要多次尝试）
ssh -vvv root@45.77.170.242

# 如果提示输入密码，输入: c]6EvVHNfi$N7r,L
```

如果连接成功，在服务器上执行：

```bash
# 1. 检查 SSH 配置
sudo sshd -t

# 2. 修复常见的 SSH 配置问题
sudo nano /etc/ssh/sshd_config

# 确保以下配置正确：
# UseDNS no
# PermitRootLogin yes
# PasswordAuthentication yes

# 3. 重启 SSH 服务
sudo systemctl restart sshd

# 4. 添加 SSH 公钥
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMRjw+lvU7iKeVUcyRhCgMMnmArExP24Xu71YOESMWE github-actions-deploy' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 5. 验证
cat ~/.ssh/authorized_keys
```

---

### 方法三：检查防火墙和 TCP Wrappers

如果能登录服务器：

```bash
# 检查防火墙
sudo ufw status

# 如果防火墙启用，确保允许 SSH
sudo ufw allow ssh
sudo ufw reload

# 检查 TCP Wrappers
cat /etc/hosts.deny
cat /etc/hosts.allow

# 如果 /etc/hosts.deny 有 ALL: ALL，需要添加：
echo "SSHD: ALL" | sudo tee -a /etc/hosts.allow
```

---

## 📋 GitHub Secrets 配置

无论采用哪种方法修复 SSH，你还需要配置 GitHub Secrets：

### 访问地址
```
https://github.com/Kenneth0416/grammer-step-by-step/settings/secrets/actions
```

### 添加以下 3 个 Secrets

#### 1. SSH_PRIVATE_KEY

**Name**: `SSH_PRIVATE_KEY`

**Value**（完整复制，包括 BEGIN 和 END 行）:
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhAAAAJjGc7BXxnOw
VwAAAAtzc2gtZWQyNTUxOQAAACBjEY8Ppb1O4inlVHMkYQoDDJ5gKxMT9uF7u9WDhEjFhA
AAAEAv7L7BC/eZr9tltjefMr6dQQLAWZW+3LqPsh+sNyzmwGMRjw+lvU7iKeVUcyRhCgMM
nmArExP24Xu71YOESMWEAAAAFWdpdGh1Yi1hY3Rpb25zLWRlcGxveQ==
-----END OPENSSH PRIVATE KEY-----
```

#### 2. HOST

**Name**: `HOST`
**Value**: `45.77.170.242`

#### 3. USERNAME

**Name**: `USERNAME`
**Value**: `root`

---

## 🔄 修复后重新部署

SSH 和 Secrets 配置完成后：

### 选项 A：GitHub 网页重新运行

1. 访问：https://github.com/Kenneth0416/grammer-step-by-step/actions
2. 点击失败的 workflow
3. 点击右上角 "Re-run all jobs"

### 选项 B：本地触发新部署

```bash
cd "English Grammar Step-by-Step "

# 小改动触发部署
git commit --allow-empty -m "Trigger deployment after SSH fix"
git push origin main
```

---

## 🧪 测试 SSH 密钥认证

在本地终端执行：

```bash
# 测试密钥登录（应该不需要密码）
ssh -i ~/.ssh/github_actions_key root@45.77.170.242 'echo "✅ SSH key works!"'

# 如果成功，你会看到：
# ✅ SSH key works!
```

---

## 📊 完整诊断命令

如果问题依然存在，在服务器上执行：

```bash
# 检查 SSH 服务状态
systemctl status sshd

# 检查 SSH 监听端口
ss -tlnp | grep :22

# 检查 SSH 配置语法
sshd -t

# 查看 SSH 日志（实时）
tail -f /var/log/auth.log

# 检查系统资源
free -h
df -h
top

# 重启 SSH 服务
systemctl restart sshd
systemctl status sshd
```

---

## 🔍 进一步排查

如果以上方法都不行：

### 1. 检查 VPS 提供商控制台

- 登录 VPS 提供商（如 Vultr, DigitalOcean 等）
- 检查服务器状态
- 使用 VNC/Console 访问服务器
- 查看启动日志

### 2. 检查 SSH 服务是否安装

```bash
# 在服务器上
which sshd
# 应该显示: /usr/sbin/sshd

# 如果没有，安装：
apt update
apt install openssh-server
systemctl start sshd
systemctl enable sshd
```

### 3. 重置 SSH 配置

```bash
# 备份当前配置
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# 重新生成默认配置
sudo apt install --reinstall openssh-server

# 或手动编辑配置
sudo nano /etc/ssh/sshd_config
```

---

## ✅ 成功标志

修复完成后，你应该能看到：

1. **SSH 连接测试成功**:
   ```bash
   ssh -i ~/.ssh/github_actions_key root@45.77.170.242 'echo Success'
   # 输出: Success
   ```

2. **GitHub Actions 部署成功**:
   - 所有步骤绿色 ✅
   - 部署时间 ~5 分钟

3. **应用可访问**:
   - 浏览器打开 http://45.77.170.242
   - 能看到你的应用

---

## 📞 需要更多帮助？

如果问题持续存在，提供以下信息：

1. VPS 提供商名称
2. 操作系统版本：`cat /etc/os-release`
3. SSH 配置：`cat /etc/ssh/sshd_config`
4. SSH 日志：`tail -50 /var/log/auth.log`

---

**当前建议**: 先尝试通过 VPS 控制面板的 VNC/Console 访问服务器，检查 SSH 服务状态。
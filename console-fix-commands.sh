#!/bin/bash
# 复制此文件内容，在 VPS Console 中粘贴执行

# 修复 SSH 配置
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
sed -i 's/^#*UseDNS.*/UseDNS no/' /etc/ssh/sshd_config
sed -i 's/^#*GSSAPIAuthentication.*/GSSAPIAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#*PermitRootLogin.*/PermitRootLogin yes/' /etc/ssh/sshd_config
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config

# 检查配置
sshd -t && echo "✅ SSH 配置正确"

# 重启 SSH
systemctl restart sshd

# 添加公钥
mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGMRjw+lvU7iKeVUcyRhCgMMnmArExP24Xu71YOESMWE github-actions-deploy' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# 验证
echo "✅ 公钥已添加："
cat ~/.ssh/authorized_keys

echo ""
echo "✅ SSH 服务状态："
systemctl is-active sshd

echo ""
echo "✅ 修复完成！现在可以在本地测试 SSH 连接"
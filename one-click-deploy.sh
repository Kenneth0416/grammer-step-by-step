#!/bin/bash
# 在 VPS Console 中复制粘贴此脚本一次性完成部署

set -e

echo "=========================================="
echo "🚀 开始部署 English Grammar App"
echo "=========================================="
echo ""

# 1. 更新系统
echo "📦 步骤 1/10: 更新系统..."
apt update && apt upgrade -y

# 2. 安装依赖
echo "📦 步骤 2/10: 安装系统依赖..."
apt install -y curl wget git build-essential

# 3. 安装 Node.js
echo "📦 步骤 3/10: 安装 Node.js 20.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi
echo "Node.js 版本: $(node --version)"

# 4. 安装 PM2
echo "📦 步骤 4/10: 安装 PM2..."
npm install -g pm2
echo "PM2 版本: $(pm2 --version)"

# 5. 安装 Nginx
echo "📦 步骤 5/10: 安装 Nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx

# 6. 克隆项目
echo "📦 步骤 6/10: 克隆项目..."
cd /root
if [ -d "english-grammar-app" ]; then
    echo "项目已存在，更新中..."
    cd english-grammar-app
    git pull origin main
else
    git clone https://github.com/Kenneth0416/grammer-step-by-step.git english-grammar-app
    cd english-grammar-app
fi

# 7. 创建环境变量
echo "📦 步骤 7/10: 配置环境变量..."
if [ ! -f ".env" ]; then
    cat > .env << 'EOF'
FAL_KEY=your_fal_ai_api_key_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
EOF
    echo "⚠️  请记得编辑 .env 文件添加真实的 API Keys:"
    echo "   - FAL_KEY (FAL AI API Key)"
    echo "   - DEEPSEEK_API_KEY (DeepSeek API Key)"
    echo ""
    echo "   运行: nano /root/english-grammar-app/.env"
fi

# 8. 安装依赖并构建
echo "📦 步骤 8/10: 安装依赖并构建..."
npm ci
npm run build
mkdir -p logs

# 9. 启动应用
echo "📦 步骤 9/10: 启动应用..."
pm2 start ecosystem.config.js
pm2 save
pm2 startup | tail -1 | bash

# 10. 配置 Nginx
echo "📦 步骤 10/10: 配置 Nginx..."
cp nginx.conf /etc/nginx/sites-available/english-grammar-app
ln -sf /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl restart nginx

# 配置防火墙
echo ""
echo "🔥 配置防火墙..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

# 完成
echo ""
echo "=========================================="
echo "✅ 部署完成！"
echo "=========================================="
echo ""
pm2 status
echo ""
echo "🌐 访问: http://45.77.170.242"
echo ""
echo "⚠️  重要提示:"
echo "1. 编辑 .env 文件添加 API Keys:"
echo "   nano /root/english-grammar-app/.env"
echo "   需要添加:"
echo "   - FAL_KEY (FAL AI API Key)"
echo "   - DEEPSEEK_API_KEY (DeepSeek API Key)"
echo ""
echo "2. 重启应用:"
echo "   pm2 restart english-grammar-app"
echo ""
echo "3. 查看日志:"
echo "   pm2 logs english-grammar-app"
echo ""
echo "=========================================="
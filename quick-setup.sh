#!/bin/bash

# Quick server setup script
# Run this script on your Ubuntu server as root

set -e

echo "========================================"
echo "English Grammar App - Quick Setup"
echo "========================================"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root"
    exit 1
fi

# 1. Update system
echo "[1/6] Updating system..."
apt update && apt upgrade -y
apt install -y curl wget git build-essential

# 2. Install Node.js 20.x
echo "[2/6] Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node --version

# 3. Install PM2
echo "[3/6] Installing PM2..."
npm install -g pm2
pm2 startup systemd

# 4. Install Nginx
echo "[4/6] Installing Nginx..."
apt install -y nginx
systemctl enable nginx

# 5. Setup firewall
echo "[5/6] Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
echo "y" | ufw enable

# 6. Install Certbot
echo "[6/6] Installing Certbot..."
snap install --classic certbot
ln -s /snap/bin/certbot /usr/bin/certbot 2>/dev/null || true

echo "========================================"
echo "✅ Base setup complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Clone your repository:"
echo "   cd /root"
echo "   git clone YOUR_REPO_URL english-grammar-app"
echo "   cd english-grammar-app"
echo ""
echo "2. Create .env file:"
echo "   nano .env"
echo "   # Add: FAL_KEY=your_key_here"
echo ""
echo "3. Run deployment:"
echo "   chmod +x deploy.sh"
echo "   ./deploy.sh"
echo ""
echo "4. Configure Nginx:"
echo "   cp nginx.conf /etc/nginx/sites-available/english-grammar-app"
echo "   # Edit file and replace example.com with your domain"
echo "   ln -s /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/"
echo "   nginx -t && systemctl restart nginx"
echo ""
echo "5. Setup SSL (if you have a domain):"
echo "   certbot --nginx -d your-domain.com"
echo ""
echo "See SERVER_SETUP.md for detailed instructions."
echo "========================================"
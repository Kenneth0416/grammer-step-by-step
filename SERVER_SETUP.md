# Server Setup Guide - Ubuntu VPS

Complete guide to set up your Ubuntu VPS for deploying the English Grammar App.

## 📋 Prerequisites

- Ubuntu 20.04 or 22.04 VPS
- Root access or sudo privileges
- Domain name (optional, but recommended for SSL)

---

## 1. Initial Server Setup

### Update System

```bash
apt update && apt upgrade -y
apt install -y curl wget git build-essential
```

### Set Timezone (Optional)

```bash
timedatectl set-timezone Asia/Hong_Kong
```

---

## 2. Install Node.js 20.x

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js
apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

---

## 3. Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Verify installation
pm2 --version

# Setup PM2 to start on boot
pm2 startup systemd
```

---

## 4. Install and Configure Nginx

### Install Nginx

```bash
apt install -y nginx
```

### Configure Nginx

```bash
# Remove default site
rm /etc/nginx/sites-enabled/default

# Create new site configuration
nano /etc/nginx/sites-available/english-grammar-app
```

**Copy the content from `nginx.conf` file into this file.**

**Important:** Replace `example.com` with your actual domain name.

```bash
# Enable the site
ln -s /etc/nginx/sites-available/english-grammar-app /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx
```

---

## 5. Clone Project and Setup

### Clone Repository

```bash
# Navigate to root directory
cd /root

# Clone your repository (replace with your actual GitHub repo URL)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git english-grammar-app

# Navigate to project directory
cd english-grammar-app
```

### Create Environment File

```bash
# Create .env file from example
cp .env.local.example .env 2>/dev/null || nano .env
```

**Add your environment variables:**

```env
FAL_KEY=your_fal_api_key_here
```

### Install Dependencies and Build

```bash
# Install dependencies
npm ci

# Build the Next.js application
npm run build

# Create logs directory
mkdir -p logs
```

### Start Application with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Check status
pm2 status
pm2 logs english-grammar-app --lines 50
```

---

## 6. Configure Firewall

```bash
# Allow SSH
ufw allow 22/tcp

# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS
ufw allow 443/tcp

# Enable firewall
ufw enable

# Check status
ufw status
```

---

## 7. Install SSL Certificate (Let's Encrypt)

### Install Certbot

```bash
# Install Certbot via Snap (recommended)
snap install --classic certbot

# Create symlink for certbot
ln -s /snap/bin/certbot /usr/bin/certbot
```

### Obtain SSL Certificate

```bash
# Get SSL certificate (replace example.com with your domain)
certbot --nginx -d example.com -d www.example.com

# Or for specific domain only
certbot --nginx -d example.com
```

**Follow the prompts:**
1. Enter your email address
2. Agree to terms of service
3. Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### Auto-Renewal

Certbot automatically sets up a renewal cron job. Test it:

```bash
# Test renewal process
certbot renew --dry-run
```

---

## 8. Configure GitHub Actions Secrets

In your GitHub repository, go to **Settings → Secrets and variables → Actions** and add:

1. **SSH_PRIVATE_KEY**: Your SSH private key (content of `~/.ssh/id_rsa`)
   ```bash
   cat ~/.ssh/id_rsa
   ```

2. **HOST**: Your server IP address
   ```
   45.77.170.242
   ```

3. **USERNAME**: SSH username
   ```
   root
   ```

### Generate SSH Key (if needed)

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/github_actions_key.pub root@45.77.170.242

# Use the private key content as GitHub Secret
cat ~/.ssh/github_actions_key
```

---

## 9. Verify Deployment

### Check Application Status

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs english-grammar-app

# Monitor resources
pm2 monit
```

### Check Nginx Status

```bash
# Test Nginx configuration
nginx -t

# Check status
systemctl status nginx

# View error logs
tail -f /var/log/nginx/error.log
```

### Test Application

```bash
# Test local connection
curl -I http://localhost:3000

# Test via Nginx
curl -I http://your-server-ip
curl -I https://your-domain.com
```

---

## 10. Common Commands

### PM2 Commands

```bash
# Restart application
pm2 restart english-grammar-app

# Stop application
pm2 stop english-grammar-app

# View logs
pm2 logs english-grammar-app

# Clear logs
pm2 flush

# Monitor
pm2 monit
```

### Nginx Commands

```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View access logs
tail -f /var/log/nginx/access.log

# View error logs
tail -f /var/log/nginx/error.log
```

### System Commands

```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check running processes
top

# Reboot server
reboot
```

---

## 11. Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs english-grammar-app --lines 100

# Check if port 3000 is in use
lsof -i :3000

# Check Node.js version
node --version  # Should be v20.x.x
```

### Nginx 502 Bad Gateway

```bash
# Check if application is running
pm2 status

# Check Nginx error logs
tail -f /var/log/nginx/error.log

# Verify upstream configuration
grep -r "proxy_pass" /etc/nginx/
```

### Permission Issues

```bash
# Fix ownership
chown -R www-data:www-data /root/english-grammar-app

# Fix permissions
chmod -R 755 /root/english-grammar-app
chmod +x /root/english-grammar-app/deploy.sh
```

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Force renew
certbot renew --force-renewal

# Check Nginx SSL configuration
nginx -t
```

---

## 12. Security Recommendations

1. **Change SSH Port** (Optional)
   ```bash
   nano /etc/ssh/sshd_config
   # Change Port 22 to another port
   systemctl restart sshd
   ```

2. **Disable Root Login** (Create sudo user first)
   ```bash
   # Create new user
   adduser deployer
   usermod -aG sudo deployer

   # Disable root login
   nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   ```

3. **Install Fail2Ban**
   ```bash
   apt install -y fail2ban
   systemctl enable fail2ban
   systemctl start fail2ban
   ```

4. **Regular Updates**
   ```bash
   # Update system weekly
   apt update && apt upgrade -y
   ```

---

## 🎉 Deployment Complete!

Your application should now be accessible at:
- **HTTP**: http://your-server-ip or http://your-domain.com
- **HTTPS**: https://your-domain.com (if SSL configured)

### Next Steps

1. Push code to GitHub main branch - automatic deployment will trigger
2. Monitor logs: `pm2 logs english-grammar-app`
3. Set up monitoring/alerting (optional): consider PM2 Plus or Uptime Kuma

---

## 📞 Support

- PM2 Documentation: https://pm2.keymetrics.io/docs/usage/quick-start/
- Nginx Documentation: https://nginx.org/en/docs/
- Certbot Documentation: https://certbot.eff.org/docs/
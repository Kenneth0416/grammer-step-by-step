#!/bin/bash

# Exit on error
set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Starting Deployment${NC}"
echo -e "${GREEN}========================================${NC}"

# Project directory
PROJECT_DIR="/root/english-grammar-app"

# Check if directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo -e "${RED}Error: Project directory not found at $PROJECT_DIR${NC}"
    exit 1
fi

cd "$PROJECT_DIR"

echo -e "${YELLOW}Step 1/5: Pulling latest code...${NC}"
git pull origin main

echo -e "${YELLOW}Step 2/5: Installing dependencies...${NC}"
npm ci

echo -e "${YELLOW}Step 3/5: Building Next.js application...${NC}"
npm run build

echo -e "${YELLOW}Step 4/5: Creating logs directory...${NC}"
mkdir -p logs

echo -e "${YELLOW}Step 5/5: Restarting PM2...${NC}"
pm2 restart ecosystem.config.js

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}========================================${NC}"

# Show status
pm2 status

echo -e "\n${YELLOW}Application logs:${NC}"
pm2 logs english-grammar-app --lines 20
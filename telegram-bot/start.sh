#!/bin/bash

# ScoreHouse AI Dev Team Telegram Bot Startup Script

echo "🤖 Starting ScoreHouse AI Dev Team Bot..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy env.example to .env and configure your API keys:"
    echo "cp env.example .env"
    echo "nano .env"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building TypeScript..."
npm run build

# Start the bot
echo "🚀 Starting bot..."
npm start

# Quick Setup Guide

## 🚀 Get Your Bot Running in 5 Minutes

### Step 1: Get Your API Keys

1. **Telegram Bot Token** (Required)
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` and follow the prompts
   - Copy the token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

2. **Linear API Key** (Required)
   - Go to [Linear Settings > API](https://linear.app/settings/api)
   - Click "Create Key"
   - Copy the API key

3. **GitHub Personal Access Token** (Required)
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `workflow`
   - Copy the token

### Step 2: Configure Environment

```bash
# Copy the environment template
cp env.example .env

# Edit the .env file with your API keys
nano .env
```

Your `.env` file should look like:
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
LINEAR_API_KEY=lin_api_xxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### Step 3: Test Your Setup

```bash
# Run the test to verify everything is configured
npm test
```

You should see all green checkmarks ✅

### Step 4: Start Your Bot

```bash
# Option 1: Use the startup script
./start.sh

# Option 2: Manual start
npm run build
npm start
```

### Step 5: Chat with Your Bot

1. Find your bot on Telegram (search for the username you gave it)
2. Send `/start` to initialize
3. Try natural language: *"Add tournament leaderboard"*

## 🎯 What Your Bot Can Do

- **Natural Language Commands**: Just type what you want to build
- **Linear Integration**: View and manage tickets
- **GitHub Automation**: Automatic PR creation and testing
- **Progress Tracking**: Real-time status updates
- **Smart Notifications**: Get alerts when work is ready

## 🆘 Need Help?

- Check the full [README.md](README.md) for detailed documentation
- Run `npm test` to diagnose setup issues
- Ensure all API keys are correct and have proper permissions

## 🚨 Common Issues

1. **"Bot not responding"** → Check Telegram token is correct
2. **"Error getting team status"** → Verify Linear API key and team exists
3. **"Error fetching tickets"** → Check Linear permissions and network

Your AI development team is ready to build! 🤖⚡

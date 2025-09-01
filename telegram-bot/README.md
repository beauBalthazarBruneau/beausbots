# ScoreHouse AI Dev Team Telegram Bot

A Telegram bot that acts as your AI development team, managing Linear tickets, GitHub automation, and providing real-time updates on your card game scoring app development.

## Features

- 🤖 **AI Team Interface**: Natural language epic creation and ticket management
- 📋 **Linear Integration**: View and manage tickets from Linear
- 🔄 **GitHub Automation**: Trigger automated PR creation and testing
- 📊 **Progress Tracking**: Real-time status updates and progress reports
- 🔔 **Smart Notifications**: Get alerts when PRs are ready for review

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Telegram Bot Token (from [@BotFather](https://t.me/botfather))
- Linear API Key
- GitHub Personal Access Token

### 2. Installation

```bash
# Clone the repository
cd telegram-bot

# Install dependencies
npm install

# Copy environment template
cp env.example .env

# Edit .env with your API keys
nano .env
```

### 3. Environment Setup

Edit your `.env` file with the following required variables:

```env
# Required
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
LINEAR_API_KEY=your_linear_api_key_here
GITHUB_TOKEN=your_github_personal_access_token_here

# Optional
GITHUB_REPO=your_username/card-game-cv-app
```

### 4. Build and Run

```bash
# Build the TypeScript code
npm run build

# Start the bot
npm start

# Or for development with auto-rebuild
npm run dev
```

## Getting API Keys

### Telegram Bot Token
1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Send `/newbot`
3. Follow the prompts to create your bot
4. Copy the token provided

### Linear API Key
1. Go to [Linear Settings](https://linear.app/settings/api)
2. Click "Create Key"
3. Give it a name (e.g., "Telegram Bot")
4. Copy the API key

### GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`
4. Copy the token

## Usage

### Bot Commands

- `/start` - Initialize your AI development team
- `/status` - Show current development status
- `/tickets` - List automation-ready tickets
- `/progress` - Today's progress report
- `/help` - Show all commands

### Natural Language

Just type what you want to build:

```
"Add tournament leaderboard"
"I need user authentication"
"Build card recognition for Skyjo"
```

The bot will:
1. Create an epic in Linear
2. Break it down into tickets
3. Trigger GitHub Actions for automation
4. Send you notifications when PRs are ready

## Project Structure

```
telegram-bot/
├── src/
│   └── index.ts          # Main bot implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── env.example           # Environment variables template
└── README.md            # This file
```

## Development

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled bot
- `npm run dev` - Build and run in one command
- `npm run watch` - Watch for changes and rebuild

### Architecture

The bot integrates with:
- **Linear**: Project management and ticket tracking
- **GitHub**: Automated PR creation and testing
- **Telegram**: User interface and notifications

## Troubleshooting

### Common Issues

1. **"Error getting team status"**
   - Check your Linear API key is correct
   - Ensure the Linear team key "SH" exists

2. **"Error fetching tickets"**
   - Verify Linear API key has proper permissions
   - Check network connectivity

3. **Bot not responding**
   - Verify Telegram bot token is correct
   - Check bot is not blocked by users

### Logs

The bot logs to console. Look for:
- `🤖 ScoreHouse Dev Bot is running...` - Bot started successfully
- `Polling error:` - Connection issues
- `Failed to send notification` - Notification delivery problems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License - see package.json for details

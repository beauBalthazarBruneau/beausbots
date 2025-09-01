# BeausBots Setup Guide

## Quick Start

### 1. MCP Server Setup
```bash
cd /Users/beaubruneau/Documents/beausbots/project-manager
npm install
npm run build
```

### 2. Configure Claude Desktop
Add to Claude Desktop settings:
```json
{
  "mcpServers": {
    "project-manager": {
      "command": "node",
      "args": ["/Users/beaubruneau/Documents/beausbots/project-manager/dist/index.js"],
      "env": {}
    }
  }
}
```

### 3. Telegram Bot Setup
```bash
cd /Users/beaubruneau/Documents/beausbots/telegram-bot
npm install
cp env.example .env
# Edit .env with your API keys
npm run build
npm start
```

### 4. Environment Variables Required
```env
# Linear Integration
LINEAR_API_KEY=your_linear_api_key_here

# GitHub Integration  
GITHUB_TOKEN=your_github_personal_access_token

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather

# Vercel (optional)
VERCEL_TOKEN=your_vercel_token

# Supabase (optional)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Test the Integration
1. Open Claude Desktop
2. Ask: *"Get me the context for the beausbots project"*
3. Should return full project configuration and documentation
4. Test Telegram bot: Send `/start` to your bot
5. Try: *"What's the current status of development?"*

## Development Workflow

### Creating New Projects
1. Ask Claude: *"I want to create a card counting app"*
2. MCP will auto-create project folder structure
3. Update project config and documentation
4. Start development with full context available

### Managing Existing Projects
1. All project context available to Claude automatically
2. Code paths included for easy navigation
3. Documentation co-located with configuration
4. Version controlled alongside code

## Project Folder Structure
```
projects/
├── beausbots/
│   ├── config.json       # Structured project data
│   ├── README.md         # Human-readable documentation
│   └── SETUP.md         # This file
├── card-app/
│   ├── config.json
│   ├── README.md
│   └── ARCHITECTURE.md
└── telegram-bot/
    ├── config.json
    └── README.md
```

## Troubleshooting

### MCP Server Issues
- Check Node.js version (18+)
- Verify build completed: `ls dist/`
- Check Claude Desktop logs

### Telegram Bot Issues  
- Verify bot token in .env
- Check Linear API key permissions
- Ensure GitHub token has repo access

### API Integration Issues
- Linear: Team key "SH" must exist
- GitHub: Token needs repo and workflow scopes
- Vercel: Token must have project access

## Next Steps
1. Set up Linear webhooks for real-time updates
2. Configure GitHub Actions for automated testing
3. Add Vercel deployment automation
4. Integrate Supabase for data persistence

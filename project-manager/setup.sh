#!/bin/bash

echo "🤖 Setting up Project Manager MCP Server..."

# Navigate to project directory
cd /Users/beaubruneau/Documents/beausbots/project-manager

# Install dependencies and build
echo "📦 Installing dependencies..."
npm run setup

# Create projects directory
mkdir -p projects

# Create example project for testing
echo "📁 Creating example project..."
cat > projects/telegram-bot.json << 'EOF'
{
  "name": "telegram bot",
  "description": "ScoreHouse AI Dev Team Telegram Bot - manages Linear tickets, GitHub automation, and development workflows",
  "tech_stack": [
    "Node.js",
    "TypeScript",
    "Telegram Bot API",
    "Linear API",
    "GitHub API"
  ],
  "integrations": {
    "linear": {
      "team_key": "SH"
    },
    "github": {
      "repo": "beausbots",
      "owner": "beaubruneau"
    }
  },
  "context": "This is a Telegram bot that acts as an AI development team interface. It integrates with Linear for project management, GitHub for code automation, and provides real-time development updates. The bot helps manage the ScoreHouse card game scoring app development by creating tickets, tracking progress, and automating workflows.",
  "instructions": "Development instructions for telegram bot:\n\n1. Use Node.js with TypeScript for type safety\n2. Integrate with Telegram Bot API for user interface\n3. Connect to Linear API for ticket management\n4. Use GitHub API for automated PR creation and testing\n5. Implement natural language processing for epic creation\n6. Set up automated notifications for development progress\n7. Follow the existing project structure in /beausbots/telegram-bot\n8. Use environment variables for API keys and tokens\n9. Implement error handling and logging\n10. Create comprehensive documentation",
  "created_at": "2025-01-20T00:00:00.000Z",
  "updated_at": "2025-01-20T00:00:00.000Z"
}
EOF

echo "✅ MCP Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy the Claude Desktop configuration:"
echo "   - Open Claude Desktop settings"
echo "   - Add the MCP server configuration (see claude-desktop-config.json)"
echo ""
echo "2. For Warp integration:"
echo "   - The MCP server runs on stdio and can be accessed via node commands"
echo "   - Use: node /Users/beaubruneau/Documents/beausbots/project-manager/dist/index.js"
echo ""
echo "3. Test the setup:"
echo "   - Ask Claude: 'Get me the context for the telegram bot project'"
echo "   - Or: 'Create a new project called card counting app'"
echo ""
echo "🎉 Your Project Manager MCP is ready to use!"

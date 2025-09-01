# BeausBots Project Context

## What is BeausBots?
BeausBots is an automated software development pipeline that connects development tools through AI-powered automation. The goal is to enable natural language development requests that automatically translate into structured tickets, code generation, and deployment.

## Current Status
- **Project Manager MCP**: Basic server that manages project context ✅
- **Telegram Bot**: AI development team interface (existing, needs integration)
- **Linear Integration**: Team "SH" (ScoreHouse) for ticket management
- **GitHub Integration**: Repository `beaubruneau/beausbots` for code automation

## Tech Stack
- **Runtime**: Node.js + TypeScript
- **AI Integration**: Model Context Protocol (MCP), Claude Code
- **Project Management**: Linear API (Team: SH)
- **Version Control**: GitHub API
- **Communication**: Telegram Bot API

## Current Architecture
```
beausbots/
├── project-manager/     # MCP server for project context (THIS PROJECT)
│   ├── src/index.ts    # Main MCP server
│   ├── projects/       # Project configurations
│   └── dist/          # Compiled output
├── telegram-bot/       # AI development interface (EXISTING)
└── (future components) # Additional integrations
```

## How It Works
1. User asks Claude: "Let's add a new feature to beausbots"
2. Claude calls MCP server to get project context
3. MCP server returns this context.md file + project config
4. Claude now has full context about the project to help with development

## Development Workflow (Goal)
1. **Natural Language Input** → Claude Desktop
2. **Context Retrieval** → MCP server provides project context
3. **Ticket Creation** → Create Linear tickets with proper structure
4. **Code Generation** → Claude Code with project-specific instructions
5. **Integration** → Connect with existing Telegram bot and other tools

## Key Files & Locations
- **MCP Server**: `/Users/beaubruneau/Documents/beausbots/project-manager/`
- **Telegram Bot**: `/Users/beaubruneau/Documents/beausbots/telegram-bot/`
- **Project Config**: `/Users/beaubruneau/Documents/beausbots/project-manager/projects/beausbots/config.json`
- **This Context**: `/Users/beaubruneau/Documents/beausbots/project-manager/projects/beausbots/context.md`

## Next Steps (Immediate)
1. ✅ Create MCP server that can read project context
2. ✅ Set up project folder structure with context.md
3. 🔄 Configure Claude Desktop to use MCP server
4. 🔄 Test: "Let's add a new feature to beausbots" → should return this context
5. ⏳ Expand to include Linear ticket creation
6. ⏳ Integrate with existing Telegram bot

## Linear Team Info
- **Team Key**: SH
- **Team Name**: ScoreHouse
- **Project Focus**: Automated development pipeline

## Development Guidelines
- Keep MCP tools simple and focused
- Store project context as readable Markdown files
- Use TypeScript for type safety
- Follow conventional commit messages
- Test each integration independently

## Current Priority
Getting the basic MCP → Claude Desktop → Project Context flow working so Claude can understand what BeausBots is and help with development.

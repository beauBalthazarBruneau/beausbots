# Project Manager MCP Server

> A simple Model Context Protocol server that provides project context to Claude Desktop

## Goal
Enable Claude to understand project context by asking: **"Let's add a new feature to beausbots"** and getting back all the relevant project information.

## How It Works
1. You ask Claude about a project (e.g., "beausbots")
2. Claude calls the MCP server `get_project` tool
3. MCP server reads the project's `context.md` file
4. Claude gets full project context and can help with development

## Quick Setup

### 1. Build the MCP Server
```bash
cd /Users/beaubruneau/Documents/beausbots/project-manager
chmod +x build.sh
./build.sh
```

### 2. Configure Claude Desktop
Add this to Claude Desktop settings:
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

### 3. Test It
Ask Claude: **"Let's add a new feature to beausbots"**

Claude should call the MCP and return the full project context from `context.md`.

## Project Structure
```
project-manager/
├── src/index.ts              # MCP server code
├── projects/                 # Project configurations
│   └── beausbots/           # BeausBots project
│       ├── config.json      # Project metadata
│       └── context.md       # Project context (main file)
├── dist/                    # Compiled JavaScript
├── build.sh                # Quick build script
└── test-context.js         # Test the setup
```

## Available Tools

### `get_project`
- **Input**: Project name (e.g., "beausbots")
- **Output**: Project config + context.md content
- **Auto-creates**: New projects if they don't exist

### `update_project`  
- **Input**: Project updates (description, tech stack, etc.)
- **Output**: Updated project configuration

### `list_projects`
- **Output**: All available projects

## Example Usage

**Getting BeausBots Context:**
```
You: "Let's work on beausbots"
Claude: [calls get_project("beausbots")]
MCP: Returns config.json + context.md
Claude: "BeausBots is an automated software development pipeline..."
```

**Creating New Project:**
```
You: "I want to create a card counting app"
Claude: [calls get_project("card counting app")]
MCP: Creates new project folder with default context.md
Claude: "I've created a new project called card counting app..."
```

## Context.md Format
Each project has a `context.md` file with:
- What the project is
- Current status
- Tech stack
- File locations
- Next steps
- Development guidelines

This gives Claude everything needed to help with development.

## Next Steps
1. ✅ Basic MCP server working
2. ✅ BeausBots project context created  
3. 🔄 Test with Claude Desktop
4. ⏳ Add Linear ticket creation tools
5. ⏳ Integrate with existing Telegram bot

## Testing
```bash
# Test the project context
node test-context.js

# Build and test
./build.sh
```

---

*Simple, focused, and ready to scale* 🚀

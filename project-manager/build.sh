#!/bin/bash

echo "🔨 Building Project Manager MCP Server..."

cd /Users/beaubruneau/Documents/beausbots/project-manager

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the TypeScript
echo "🏗️  Compiling TypeScript..."
npm run build

# Check if build was successful
if [ -f "dist/index.js" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "Next steps:"
    echo "1. Configure Claude Desktop with MCP server"
    echo "2. Test by asking: 'Let's add a new feature to beausbots'"
    echo ""
    echo "Claude Desktop configuration:"
    echo '{'
    echo '  "mcpServers": {'
    echo '    "project-manager": {'
    echo '      "command": "node",'
    echo '      "args": ["/Users/beaubruneau/Documents/beausbots/project-manager/dist/index.js"],'
    echo '      "env": {}'
    echo '    }'
    echo '  }'
    echo '}'
else
    echo "❌ Build failed!"
    exit 1
fi

#!/bin/bash

# BeausBots n8n Development Startup Script

echo "🚀 Starting n8n for BeausBots development..."

# Load environment variables
export $(grep -v '^#' environments/development.env | xargs)

# Create n8n data directory if it doesn't exist
mkdir -p .n8n

# Start n8n with development configuration
echo "📡 Starting n8n on http://localhost:5678"
echo "🔐 Login: admin / beausbots2025"
echo "📁 Data directory: $(pwd)/.n8n"
echo ""
echo "🔗 Once n8n is running:"
echo "   1. Open http://localhost:5678"
echo "   2. Login with the credentials above"
echo "   3. Import workflows from the workflows/ directory"
echo ""

# Start n8n
n8n start

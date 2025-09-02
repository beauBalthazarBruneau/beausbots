# n8n Integration - Phase 1: Webhook Bridge

This directory contains the n8n workflows for Phase 1 of the BeausBots automation system.

## Phase 1 Architecture
```
Linear Webhook → n8n (webhook receiver) → Local MCP → Response
```

## Quick Start

### 1. Start n8n locally
```bash
cd n8n-workflows
./start-n8n.sh
```

### 2. Access n8n interface
- Open: http://localhost:5678
- Login: admin / beausbots2025

### 3. Import the workflow
1. Click "Import from file" in n8n
2. Upload `workflows/linear-webhook-to-mcp.json`
3. Activate the workflow

### 4. Get webhook URL
- The workflow creates a webhook at: `http://localhost:5678/webhook/linear-webhook`
- For testing with ngrok: `https://your-ngrok-url.ngrok.io/webhook/linear-webhook`

## File Structure

```
n8n-workflows/
├── workflows/
│   └── linear-webhook-to-mcp.json    # Main webhook bridge workflow
├── environments/
│   └── development.env               # Environment configuration
├── shared-code/                      # Reusable code snippets
├── start-n8n.sh                     # Startup script
└── README.md                         # This file
```

## Workflow: Linear Webhook to MCP Bridge

### What it does:
1. **Receives Linear webhooks** on status changes
2. **Filters for "Ready for test cases"** status only
3. **Parses webhook data** into structured format
4. **Calls your local MCP** at `http://localhost:3000/webhooks/linear`
5. **Returns success/error response** to Linear

### Workflow Nodes:
- **Linear Webhook**: Webhook trigger endpoint
- **Filter for Test Cases Status**: Only process specific status changes
- **Parse Linear Data**: Extract and structure issue data
- **Call Local MCP**: Forward to your MCP server
- **Success/Error Response**: Return appropriate response to Linear

## Next Steps

### For your Local MCP:
Your existing MCP needs to handle incoming requests from n8n:

```javascript
// Add this endpoint to your MCP server
app.post('/webhooks/linear', (req, res) => {
  const { action, issue, webhook_data } = req.body;
  
  console.log(`Received Linear webhook: ${issue.identifier} - ${issue.title}`);
  
  // Process the issue (your existing logic)
  // Call project manager with Linear instructions
  // Generate Warp prompts, etc.
  
  res.json({ 
    success: true, 
    message: 'Processed successfully',
    issue_id: issue.id 
  });
});
```

### For Linear Webhook Configuration:
1. Use ngrok to expose n8n: `ngrok http 5678`
2. Configure Linear webhook URL: `https://your-ngrok.ngrok.io/webhook/linear-webhook`
3. Test with a real Linear issue status change

## Environment Variables

Update `environments/development.env` with your actual API keys:
- `LINEAR_API_KEY`: Your Linear API key
- `TELEGRAM_BOT_TOKEN`: Your Telegram bot token  
- `GITHUB_TOKEN`: Your GitHub token

## Troubleshooting

### n8n won't start
- Check if port 5678 is available
- Verify Node.js version (needs 18+)

### Webhook not receiving data
- Check ngrok is running and URL is correct in Linear
- Verify webhook is activated in n8n
- Check n8n execution logs

### MCP connection fails
- Ensure your MCP is running on port 3000
- Check the MCP endpoint matches the workflow URL
- Verify MCP has the `/webhooks/linear` endpoint

## Monitoring

- **n8n Executions**: View in n8n interface under "Executions"
- **MCP Logs**: Check your local MCP server logs
- **Linear Webhook Logs**: Check Linear webhook delivery logs

## What's Next

Once Phase 1 is working:
- **Phase 2**: Move simple logic to n8n workflows
- **Phase 3**: Migrate complex MCP functions to n8n Code Nodes  
- **Phase 4**: Full n8n with external services

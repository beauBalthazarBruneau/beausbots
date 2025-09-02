# Simple Linear Test Workflow Setup

## Quick Setup

### 1. Start n8n
```bash
cd n8n-workflows
./start-n8n.sh
```

### 2. Import the simplified workflow
1. Open http://localhost:5678
2. Login: `admin` / `beausbots2025`
3. Click "Import from file"
4. Select `workflows/linear-simple-test.json`
5. **Activate the workflow** (toggle switch)

### 3. Get your webhook URL
After importing, the webhook URL will be:
```
http://localhost:5678/webhook/linear-test
```

For external access (use ngrok):
```bash
ngrok http 5678
# Then use: https://your-ngrok-url.ngrok.io/webhook/linear-test
```

## What the workflow does

### Simple Flow:
```
Linear Webhook → Parse Data → Get Project Info → Print "Hello World" → Respond
```

### Nodes:
1. **Linear Webhook** - Receives POST requests from Linear
2. **Parse Webhook Data** - Extracts issue ID, status, and project ID
3. **Get Project Info** - Calls Linear API to get project details
4. **Hello World** - Prints "Hello World!" with project info to console
5. **Respond to Webhook** - Sends success response back to Linear

## Testing

### Method 1: Manual test (in n8n)
1. Click on "Linear Webhook" node
2. Click "Listen for calls"
3. Use a tool like Postman to POST to the webhook URL with sample data:

```json
{
  "data": {
    "issue": {
      "id": "test-id",
      "state": {
        "name": "Ready for test cases"
      },
      "project": {
        "id": "your-project-id"
      }
    }
  }
}
```

### Method 2: Real Linear webhook
1. In Linear, go to Settings → Webhooks
2. Add webhook URL: `https://your-ngrok-url.ngrok.io/webhook/linear-test`
3. Select "Issue updated" events
4. Change status of any Linear issue
5. Watch n8n console for "Hello World!" message

## Expected Output

In n8n console you'll see:
```
==================================================
Hello World! 🌍

Linear Issue Status: Ready for test cases
Project: Your Project Name
Project URL: https://linear.app/your-workspace/project/...
==================================================
```

## Troubleshooting

- **Webhook not triggering**: Check ngrok is running and URL is correct in Linear
- **Linear API errors**: Verify the API key is correct
- **No project info**: Check that the issue has a valid project ID
- **Console output**: Check n8n execution logs in the interface

Your Linear API key is already configured in the workflow!

# Linear Status Automation with Claude Setup

This workflow provides comprehensive automation for all Linear status changes using Anthropic's Claude API.

## What It Does

### Status-Specific Automation:
- **Backlog** → Priority assessment, complexity estimation, resource planning
- **In Progress** → Technical guidance, architecture considerations, testing strategy  
- **Ready for Test Cases** → Comprehensive test case generation
- **In Review** → Code review checklist, quality standards, security considerations
- **Done** → Delivery summary, stakeholder communication, follow-up actions

## Quick Setup

### 1. Add Your Anthropic API Key
Edit the workflow file `linear-status-automation.json` and replace:
```
"Bearer YOUR_ANTHROPIC_API_KEY_HERE"
```
With your actual Anthropic API key:
```  
"Bearer sk-ant-api03-your-actual-key-here"
```

### 2. Import and Activate
1. Start n8n: `./start-n8n.sh`
2. Open http://localhost:5678 (admin / beausbots2025)
3. Import `workflows/linear-status-automation.json`
4. **Activate the workflow** (toggle switch)

### 3. Configure Webhook
Webhook URL: `http://localhost:5678/webhook/linear-status`

With ngrok: `https://your-ngrok-url.ngrok.io/webhook/linear-status`

## Workflow Architecture

```
Linear Webhook → Parse & Validate → Route by Status → Generate Prompt → Claude API → Update Linear
```

### Smart Routing:
The workflow automatically routes to different prompts based on status:

- **Backlog Status** → Product Manager Analysis
- **In Progress** → Technical Lead Guidance  
- **Ready for Test Cases** → QA Test Case Generation
- **In Review** → Code Review Checklist
- **Done** → Project Completion Analysis

## Status-Specific Prompts

### Backlog Status
**Role**: Senior Product Manager  
**Output**:
- Priority assessment (urgency/importance)
- Complexity estimate (story points)
- Dependencies identification
- Acceptance criteria review
- Resource planning recommendations

### In Progress Status  
**Role**: Technical Lead  
**Output**:
- Technical implementation strategy
- Architecture considerations
- Testing approach recommendations
- Risk identification
- Time/dependency estimates

### Ready for Test Cases Status
**Role**: QA Specialist  
**Output**:
- Functional test cases for all acceptance criteria
- Edge cases and boundary conditions
- Error scenarios and failure modes
- User experience workflow tests
- Integration and accessibility tests
- Formatted test cases with TC-IDs, steps, expected results

### In Review Status
**Role**: Senior Developer  
**Output**:
- Code review checklist
- Quality standards requirements
- Security review points
- Performance impact assessment
- Documentation requirements
- Test coverage validation

### Done Status
**Role**: Project Manager  
**Output**:
- Delivery accomplishment summary
- Success metrics definition
- Stakeholder communication templates
- Documentation update requirements
- Follow-up action items
- Lessons learned insights

## Example Output

When an issue moves to \"Ready for test cases\", Claude will generate:

```
## AI Analysis - test-cases Status

### Functional Test Cases

**TC-001: User Authentication**
- **Description**: Verify user login functionality
- **Prerequisites**: Valid user account exists
- **Steps**: 
  1. Navigate to login page
  2. Enter valid credentials
  3. Click login button
- **Expected Result**: User successfully logged in and redirected to dashboard
- **Priority**: High

**TC-002: Invalid Login Attempt**
- **Description**: Test error handling for invalid credentials
- **Prerequisites**: Login page is accessible
- **Steps**:
  1. Navigate to login page  
  2. Enter invalid credentials
  3. Click login button
- **Expected Result**: Error message displayed, user remains on login page
- **Priority**: High

[Additional test cases continue...]
```

## Configuration Options

### Modify Prompts
Edit the Code Nodes (`prompt-backlog`, `prompt-in-progress`, etc.) to customize prompts for your specific needs.

### Add New Statuses
1. Add new routing condition node
2. Create corresponding prompt node
3. Connect to Claude API call
4. Update routing logic

### Change AI Model
Update the Claude API call to use different models:
- `claude-3-sonnet-20240229` (current)
- `claude-3-haiku-20240307` (faster, cheaper)
- `claude-3-opus-20240229` (most capable)

## Troubleshooting

### Webhook Not Triggering
- Check Linear webhook configuration
- Verify ngrok is running (if local)
- Check webhook URL matches exactly

### Claude API Errors
- Verify Anthropic API key is correct
- Check API quota and billing
- Ensure proper JSON formatting in request

### Linear Comment Not Added
- Verify Linear API key is valid
- Check issue ID is correctly passed through workflow
- Review Linear GraphQL mutation syntax

### No Status Match
- Check exact status names in Linear vs. workflow
- Status names are case-sensitive
- Update routing conditions if your Linear statuses differ

## Monitoring

- **n8n Executions**: View detailed execution logs in n8n interface
- **Linear Activity**: Check Linear issue comments for AI analysis  
- **Claude Usage**: Monitor token usage in Anthropic console

## Cost Estimation

With Claude 3 Sonnet:
- ~500-1000 tokens per analysis
- ~$0.003-$0.015 per status change
- Monthly cost depends on issue volume

## Next Steps

Once working:
1. **Customize prompts** for your specific workflow needs
2. **Add notification integration** (Slack, Telegram)
3. **Implement approval workflows** for sensitive changes
4. **Add metrics tracking** for automation effectiveness
5. **Scale to multiple Linear workspaces**

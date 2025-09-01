# BeausBots Linear Status Instructions

This file serves as the master reference for Linear MCP integration. When Linear tools are called, they should reference the appropriate instruction file based on the current ticket status.

## Linear Team Information
- **Team Name**: Beau's Bots
- **Team ID**: e4e9839c-3dbd-4a8e-b8a7-18d9f333d090
- **Project**: BeausBots Automated Development Pipeline
- **Project ID**: 71340806-29ad-490a-b4b9-db628d0c6bc4

## Status Mapping

### Status ID to Instruction File Mapping
```javascript
const statusInstructions = {
  "1b5b8578-d4b8-4de3-a78b-c65eeaeeed6a": "backlog-instructions.md",           // Backlog
  "57a38696-01cb-423e-854e-36b1a3b272c9": "ready-for-test-cases-instructions.md", // Ready for test cases
  "42006a56-f618-432d-ae2a-fc139fa2e4ca": "ready-for-ba-review-instructions.md",  // Ready for BA review
  "51cc87b2-ade2-4eff-9f44-4c22761203b1": "in-progress-instructions.md",          // In Progress
  "2eff8657-4bc5-4650-a403-e9ab35e4a9fa": "in-review-instructions.md",            // In Review
  "1197eac2-5e77-4ce2-beba-837caee43554": "needs-fix-instructions.md",            // Needs Fix
  "6a6316dd-05ea-4ef9-83f5-3f552cc0d741": "in-staging-instructions.md",          // In Staging
  "48584be7-e74b-478b-b839-a9da4d4b3ea1": "in-prod-instructions.md"              // In Prod (Done)
};
```

## Workflow Overview

```
Backlog → Ready for test cases → Ready for BA review → In Progress → In Review → [Needs fix] → In staging → In prod
```

### Status Owners and Responsibilities

| Status | Owner | Primary Responsibility |
|--------|-------|----------------------|
| **Backlog** | Claude Desktop/Beau | Create description and acceptance criteria |
| **Ready for test cases** | Warp | Add comprehensive test cases to ticket |
| **Ready for BA review** | Claude Desktop/Beau | Review test cases and clean up ticket |
| **In Progress** | Warp | Implement using TDD, create PR |
| **In Review** | GitHub/GitHub Actions | Automated testing, linting, deployment |
| **Needs Fix** | Warp | Fix any issues found in review |
| **In Staging** | Beau | Merge to dev branch, validate staging |
| **In Prod** | Beau | Merge to stable branch, deploy production |

## Linear MCP Integration Usage

### When Linear MCP tools are called:

1. **Get current ticket status** using `Linear:get_issue`
2. **Map status ID** to appropriate instruction file using table above
3. **Load instruction content** and provide relevant guidance
4. **Execute appropriate actions** based on status owner and requirements

### Example Integration Logic:
```javascript
async function provideStatusGuidance(ticketId) {
  // Get ticket details
  const ticket = await Linear.get_issue({ id: ticketId });
  const statusId = ticket.state.id;
  
  // Map to instruction file
  const instructionFile = statusInstructions[statusId];
  if (!instructionFile) {
    return "No specific instructions found for this status.";
  }
  
  // Load and return appropriate instructions
  const instructions = await loadInstructionFile(instructionFile);
  return instructions;
}
```

## Key Integration Points

### GitHub Integration
- **Repository**: beaubruneau/beausbots
- **Branch Strategy**: feature branches → staging → main
- **PR Template**: Includes Linear ticket reference
- **Automated Status Updates**: GitHub Actions updates Linear status

### Deployment Integration  
- **Vercel**: Web application deployment
- **Expo**: Mobile application deployment
- **Supabase**: Backend and database deployment

### Notification Integration
- **Linear Comments**: Automated status updates and failure details
- **Slack Integration**: Real-time notifications for status changes
- **Email Alerts**: Critical issue notifications

## Instruction File Details

Each instruction file contains:
- **Role and Responsibilities** for the status owner
- **Required Actions** checklist
- **Success Criteria** before advancing
- **Tools to Use** (Linear MCP tools and others)
- **Common Pitfalls** to avoid
- **Quality Gates** and validation steps
- **Next Steps** for status progression

## Usage Examples

### Creating a New Ticket in Backlog
```javascript
// When creating a ticket, provide backlog guidance
const newTicket = await Linear.create_issue({
  title: "Implement user authentication",
  team: "Beau's Bots",
  state: "Backlog",
  description: "Initial description placeholder"
});

// Provide backlog instructions
const guidance = await provideStatusGuidance(newTicket.id);
// Returns backlog-instructions.md content
```

### Updating Ticket Status
```javascript
// When moving ticket to next status
await Linear.update_issue({
  id: ticketId,
  state: "Ready for test cases"
});

// Provide new status guidance
const guidance = await provideStatusGuidance(ticketId);
// Returns ready-for-test-cases-instructions.md content
```

### Status-based Action Recommendations
```javascript
// Provide appropriate actions based on current status
function getRecommendedActions(statusId) {
  const actions = {
    "1b5b8578-d4b8-4de3-a78b-c65eeaeeed6a": [
      "Create detailed description",
      "Define acceptance criteria", 
      "Set priority and labels"
    ],
    "57a38696-01cb-423e-854e-36b1a3b272c9": [
      "Create comprehensive test cases",
      "Define test data requirements",
      "Add integration test guidelines"
    ],
    // ... other statuses
  };
  
  return actions[statusId] || [];
}
```

## File Structure
```
/linear-instructions/
├── README.md                           # This file
├── STATUS_INSTRUCTIONS.md              # Master reference (this file)
├── backlog-instructions.md             # Claude Desktop/Beau guidance
├── ready-for-test-cases-instructions.md # Warp guidance  
├── ready-for-ba-review-instructions.md  # Claude Desktop/Beau guidance
├── in-progress-instructions.md          # Warp guidance
├── in-review-instructions.md            # GitHub Actions process
├── needs-fix-instructions.md            # Warp guidance
├── in-staging-instructions.md           # Beau guidance
└── in-prod-instructions.md              # Beau guidance
```

## Implementation Notes

- **Instruction files are markdown** for human readability and AI parsing
- **Status IDs are permanent** - use these for reliable mapping
- **Owner assignments** reflect actual responsibility in workflow
- **Tools sections** include relevant Linear MCP commands
- **Templates provided** for consistent ticket and comment formatting

This master file enables Linear MCP tools to provide contextual, status-appropriate guidance throughout the entire BeausBots development workflow.
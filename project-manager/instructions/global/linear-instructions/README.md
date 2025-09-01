# BeausBots Linear Workflow Instructions

This directory contains instruction files for each Linear ticket status in the BeausBots automated development pipeline.

## Linear Team Setup
- **Team Key**: BB
- **Team Name**: BeausBots 
- **Project**: Automated software development pipeline

## Workflow Overview

```
Backlog → Ready for test cases → Ready for BA review → In Progress → In Review → Needs fix (if needed) → In staging → In prod
```

## Status Owners
- **Backlog**: Claude Desktop/Beau
- **Ready for test cases**: Warp
- **Ready for BA review**: Claude Desktop/Beau  
- **In Progress**: Warp
- **In Review**: GitHub/GitHub Actions
- **Needs fix**: Warp
- **In staging**: Beau
- **In prod**: Beau

## Instruction Files
Each status has its own instruction file that contains:
- Role and responsibilities
- Required actions
- Tools to use
- Success criteria
- Next steps

## Usage
When a Linear MCP tool is called for a ticket, it should:
1. Check the current ticket status
2. Load the appropriate instruction file
3. Follow the guidelines for that status
4. Execute the required actions
5. Update the ticket as needed

## Integration Points
- **Linear API**: Ticket management and status tracking
- **GitHub API**: Code repository and PR management  
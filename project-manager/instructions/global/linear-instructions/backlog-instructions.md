# Backlog Status Instructions

**Owner**: Claude Desktop/Beau  
**Status Type**: `backlog`  
**Status ID**: `1b5b8578-d4b8-4de3-a78b-c65eeaeeed6a`

## Role and Responsibilities

As the owner of tickets in Backlog status, you are responsible for creating well-structured requirements and acceptance criteria that enable the development team to understand and implement features effectively.

## Required Actions

### 1. Create Clear Description
- Write a comprehensive description that explains:
  - **What** needs to be built
  - **Why** it's needed (business value)
  - **Who** will use it (target users)
  - **When** it should be completed

### 2. Define Acceptance Criteria
Create bullet-point acceptance criteria using the format:
- **Given** [initial condition]
- **When** [action is taken]  
- **Then** [expected result]

#### Example Format:
```markdown
## Acceptance Criteria

- **Given** a user is on the login page
- **When** they enter valid credentials and click submit
- **Then** they should be redirected to the dashboard

- **Given** a user enters invalid credentials
- **When** they click submit
- **Then** they should see an error message "Invalid username or password"
```

### 3. Add Context and Requirements
Include relevant information such as:
- **Technical requirements** (APIs, databases, third-party services)
- **Design requirements** (mockups, UI/UX specifications)
- **Performance requirements** (load times, capacity)
- **Security requirements** (authentication, authorization)
- **Dependencies** (other tickets, external services)

### 4. Set Priority and Labels
- Assign appropriate priority level (1-4)
- Add relevant labels for categorization
- Link related issues if applicable

## Success Criteria

Before moving to "Ready for test cases":
- [ ] Description clearly explains the requirement
- [ ] Acceptance criteria are specific and testable
- [ ] All dependencies are identified and linked
- [ ] Priority level is assigned
- [ ] Relevant labels are applied
- [ ] Ticket is assigned to appropriate team member

## Tools to Use

### Linear MCP Tools
- `Linear:create_issue` - Create new tickets
- `Linear:update_issue` - Update existing tickets  
- `Linear:list_issue_labels` - View available labels
- `Linear:create_issue_label` - Create new labels if needed

### Information Gathering
- Review existing documentation
- Consult with stakeholders if needed
- Check related issues in Linear
- Reference design documents or mockups

## Next Steps

Once all requirements are clearly defined:
1. **Update ticket status** to "Ready for test cases"
2. **Assign to Warp** for test case creation
3. **Add comment** summarizing what was completed in Backlog

## Template for Backlog Tickets

```markdown
# [Feature/Bug/Task Name]

## Description
[Clear explanation of what needs to be built and why]

## User Story
As a [user type], I want [functionality] so that [benefit/value].

## Acceptance Criteria
- **Given** [condition] **When** [action] **Then** [result]
- **Given** [condition] **When** [action] **Then** [result]
- **Given** [condition] **When** [action] **Then** [result]

## Technical Requirements
- [Specific technical needs]
- [API requirements]
- [Database changes needed]

## Dependencies
- [List any dependent tickets or external factors]

## Definition of Done
- [ ] All acceptance criteria are met
- [ ] Code is tested and reviewed
- [ ] Documentation is updated
- [ ] Feature is deployed to production
```

## Common Pitfalls to Avoid

- ❌ Vague descriptions like "Make it better" or "Fix the bug"
- ❌ Acceptance criteria that are too broad or unmeasurable
- ❌ Missing dependencies or technical requirements
- ❌ Not consulting stakeholders when requirements are unclear
- ❌ Moving to next status without proper definition

## Quality Checklist

- [ ] Can a developer understand exactly what to build?
- [ ] Are the acceptance criteria specific and testable?
- [ ] Have all dependencies been identified?
- [ ] Is the priority level appropriate?
- [ ] Are relevant stakeholders aligned on the requirements?
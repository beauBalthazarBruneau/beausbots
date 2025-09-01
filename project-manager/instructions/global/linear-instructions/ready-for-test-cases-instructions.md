# Ready for Test Cases Status Instructions

**Owner**: Warp  
**Status Type**: `backlog`  
**Status ID**: `57a38696-01cb-423e-854e-36b1a3b272c9`

## Role and Responsibilities

As the owner of tickets in "Ready for test cases" status, Warp is responsible for creating comprehensive test cases based on the acceptance criteria defined in the Backlog stage. These test cases will guide the implementation and ensure quality.

## Required Actions

### 1. Review Acceptance Criteria
- Carefully read through all acceptance criteria
- Understand the business logic and user flows
- Identify edge cases and error conditions
- Clarify any ambiguities with the ticket creator

### 2. Create Test Cases
Add test cases directly to the Linear ticket using this structure:

```markdown
## Test Cases

### Happy Path Tests
1. **Test Case**: [Brief description]
   - **Steps**: 
     1. [Step 1]
     2. [Step 2] 
     3. [Step 3]
   - **Expected Result**: [What should happen]
   - **Priority**: High/Medium/Low

### Edge Case Tests
[Similar format for edge cases]

### Error Handling Tests
[Similar format for error conditions]

### Performance Tests
[If applicable, add performance test requirements]

### Security Tests
[If applicable, add security test requirements]
```

### 3. Define Test Data Requirements
- Specify what test data is needed
- Define database states required for testing
- Identify any external service mocking needs
- Document user roles/permissions needed

### 4. Add Integration Test Requirements
- API endpoint tests
- Database integration tests
- Third-party service integration tests
- End-to-end user flow tests

### 5. Create Unit Test Guidelines
Provide guidance for unit tests:
- Key functions/methods that need testing
- Mock requirements
- Test coverage expectations
- Testing frameworks to use

## Success Criteria

Before moving to "Ready for BA review":
- [ ] All acceptance criteria have corresponding test cases
- [ ] Edge cases and error scenarios are covered
- [ ] Test data requirements are documented
- [ ] Integration test requirements are defined
- [ ] Unit test guidelines are provided
- [ ] Test cases are clear and executable

## Tools to Use

### Linear MCP Tools
- `Linear:get_issue` - Review ticket details
- `Linear:update_issue` - Add test cases to ticket
- `Linear:create_comment` - Add clarifying comments

### Testing Framework Research
- Review existing testing standards in codebase
- Check available testing libraries and frameworks
- Understand CI/CD pipeline requirements

## Test Case Template

```markdown
## Test Cases

### Functional Tests

#### TC001: [Test Case Name]
- **Description**: [What this test validates]
- **Preconditions**: [Initial state/setup required]
- **Test Steps**:
  1. [Action 1]
  2. [Action 2]
  3. [Action 3]
- **Expected Result**: [Expected outcome]
- **Priority**: High/Medium/Low
- **Type**: Unit/Integration/E2E

#### TC002: [Edge Case Test Name]
- **Description**: [Edge case scenario]
- **Preconditions**: [Setup for edge case]
- **Test Steps**:
  1. [Action 1]
  2. [Action 2]
- **Expected Result**: [How system should handle edge case]
- **Priority**: Medium
- **Type**: Unit/Integration

### Error Handling Tests

#### TC003: [Error Scenario Name]
- **Description**: [Error condition to test]
- **Preconditions**: [Setup to trigger error]
- **Test Steps**:
  1. [Action that triggers error]
  2. [Verify error handling]
- **Expected Result**: [Proper error response/handling]
- **Priority**: High
- **Type**: Unit/Integration

### Performance Tests

#### TC004: [Performance Test Name]
- **Description**: [Performance requirement to validate]
- **Load Conditions**: [Expected load/volume]
- **Acceptance Criteria**: [Performance threshold]
- **Monitoring**: [What metrics to track]

### Security Tests

#### TC005: [Security Test Name]
- **Description**: [Security aspect to validate]
- **Attack Vector**: [Potential security issue]
- **Expected Behavior**: [How system should protect itself]
```

## Test Coverage Guidelines

### Required Coverage Areas
- **Happy Path**: All primary user flows work correctly
- **Edge Cases**: Boundary conditions and unusual inputs
- **Error Handling**: System gracefully handles errors
- **Validation**: Input validation and data integrity
- **Permissions**: Authorization and access control
- **Performance**: Response times and resource usage
- **Integration**: External service interactions

### Coverage Metrics
- **Unit Tests**: 90%+ code coverage for new features
- **Integration Tests**: All API endpoints and database operations
- **E2E Tests**: Critical user journeys
- **Security Tests**: Authentication, authorization, input validation

## Quality Checklist

Before moving to next status:
- [ ] Every acceptance criteria has at least one test case
- [ ] Edge cases are identified and have test cases
- [ ] Error scenarios are covered
- [ ] Test data requirements are documented
- [ ] Integration points are tested
- [ ] Performance requirements are testable
- [ ] Security considerations are addressed
- [ ] Test cases are executable and clear

## Common Pitfalls to Avoid

- ❌ Only testing happy path scenarios
- ❌ Vague test steps that can't be executed
- ❌ Missing test data requirements
- ❌ Not considering integration testing needs
- ❌ Ignoring error handling scenarios
- ❌ Not specifying expected results clearly

## Next Steps

Once comprehensive test cases are created:
1. **Update ticket status** to "Ready for BA review"
2. **Assign back to Claude Desktop/Beau** for review
3. **Add comment** summarizing test coverage and any questions
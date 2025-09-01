# In Progress Status Instructions

**Owner**: Warp  
**Status Type**: `started`  
**Status ID**: `51cc87b2-ade2-4eff-9f44-4c22761203b1`

## Role and Responsibilities

As the developer in the "In Progress" phase, Warp is responsible for implementing the feature using Test-Driven Development (TDD) practices, following coding standards, and creating a clean Pull Request ready for automated review.

## Required Actions

### 1. Setup Development Environment
- **Pull latest code** from staging branch
- **Create new feature branch** using ticket identifier (e.g., `BB-123-feature-name`)
- **Verify development environment** is properly configured
- **Review ticket requirements** and test cases one final time

### 2. Follow TDD Approach (Write Tests First)
Implement using Test-Driven Development cycle:

#### Red Phase (Write Failing Tests)
- Write unit tests based on test cases from the ticket
- Ensure tests fail initially (red phase)
- Cover all acceptance criteria with tests
- Include edge cases and error handling tests

#### Green Phase (Make Tests Pass)
- Write minimal code to make tests pass
- Focus on functionality first, optimization later
- Ensure all test cases pass (green phase)

#### Refactor Phase (Clean Up Code)
- Improve code structure and readability
- Remove duplication
- Ensure adherence to coding standards
- Maintain passing tests throughout refactoring

### 3. Implementation Standards

#### Code Quality Requirements
- **Consistent naming conventions** (camelCase for JS, snake_case for Python, etc.)
- **Proper error handling** with meaningful error messages
- **Input validation** for all user inputs and API endpoints
- **Security best practices** (sanitization, authentication, authorization)
- **Performance considerations** (efficient algorithms, minimal database queries)

#### Documentation Requirements
- **Code comments** for complex business logic
- **API documentation** for new endpoints
- **README updates** if new dependencies or setup steps
- **Database migration scripts** if schema changes required

### 4. Testing Implementation

#### Unit Tests (Required)
```javascript
// Example unit test structure
describe('UserService', () => {
  describe('authenticateUser', () => {
    it('should return user data for valid credentials', async () => {
      // Arrange
      const mockUser = { id: 1, username: 'testuser' };
      const credentials = { username: 'testuser', password: 'password123' };
      
      // Act
      const result = await userService.authenticateUser(credentials);
      
      // Assert
      expect(result).toEqual(mockUser);
    });

    it('should throw error for invalid credentials', async () => {
      // Arrange
      const invalidCredentials = { username: 'invalid', password: 'wrong' };
      
      // Act & Assert
      await expect(userService.authenticateUser(invalidCredentials))
        .rejects.toThrow('Invalid credentials');
    });
  });
});
```

#### Integration Tests (Required)
- API endpoint tests
- Database integration tests
- Third-party service integration tests

#### End-to-End Tests (If Applicable)
- Critical user journey tests
- Cross-browser compatibility tests
- Mobile responsiveness tests

### 5. Code Standards Compliance

#### Linting Requirements
Run linting tools and fix all issues:
```bash
# JavaScript/TypeScript
npm run lint
npm run lint:fix

# Python
flake8 src/
black src/

# General
prettier --write .
```

#### Formatting Standards
- **Consistent indentation** (2 spaces for JS/TS, 4 for Python)
- **Line length limits** (max 100 characters)
- **Import organization** (external imports first, then internal)
- **Trailing commas** where supported
- **Semicolon usage** consistent with project standards

### 6. Create Pull Request

#### PR Checklist Before Creation
- [ ] All tests pass locally
- [ ] Code is properly formatted and linted
- [ ] No debugging code or console.logs left in
- [ ] All acceptance criteria implemented
- [ ] Documentation updated if needed
- [ ] Branch is up-to-date with staging

#### PR Template
```markdown
## Summary
[Brief description of changes made]

## Linear Issue
Closes BB-[ticket-number]

## Changes Made
- [List specific changes]
- [Include any architectural decisions]
- [Note any breaking changes]

## Testing
- [ ] All existing tests pass
- [ ] New tests added for new functionality  
- [ ] Manual testing completed
- [ ] Edge cases tested

## Checklist
- [ ] Code follows project standards
- [ ] Linting passes
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)
- [ ] Security considerations addressed

## Screenshots/Demos
[If applicable, add screenshots or demo links]

## Notes for Reviewers
[Any important context for code reviewers]
```

## Development Tools and Environment

### Required Tools
- **Code Editor**: VS Code, WebStorm, or approved IDE
- **Version Control**: Git with proper commit message format
- **Package Manager**: npm, yarn, or project-specific manager
- **Testing Framework**: Jest, Pytest, or project-specific framework
- **Linter**: ESLint, Flake8, or project-specific linter

### Commit Message Format
Follow conventional commit format:
```
type(scope): description

feat(auth): add user login functionality
fix(api): resolve null pointer error in user service
test(auth): add unit tests for login flow
docs(readme): update installation instructions
```

### Branch Naming Convention
```
BB-[ticket-number]-[brief-description]
Examples:
BB-123-user-authentication
BB-456-fix-login-bug
BB-789-update-user-profile
```

## Success Criteria

Before moving to "In Review":
- [ ] All acceptance criteria implemented and tested
- [ ] TDD process followed (tests written first)
- [ ] Code passes all linting and formatting checks
- [ ] Unit tests have 90%+ coverage for new code
- [ ] Integration tests cover all API endpoints
- [ ] Pull Request created with proper description
- [ ] All tests pass in CI/CD pipeline (if running)
- [ ] No security vulnerabilities introduced

## Tools to Use

### Linear MCP Tools
- `Linear:get_issue` - Reference ticket requirements
- `Linear:update_issue` - Update progress and add development notes
- `Linear:create_comment` - Communicate progress or blockers

### Development Tools
- **Git**: Version control and branch management
- **IDE/Editor**: Code development and debugging
- **Testing Framework**: Automated test execution
- **Package Manager**: Dependency management
- **Linter/Formatter**: Code quality and consistency

### CI/CD Integration
- **GitHub Actions**: Automated testing and quality checks
- **Vercel**: Preview deployments for web features
- **Expo**: Mobile app building and testing

## Common Implementation Patterns

### API Endpoint Pattern
```javascript
// Express.js example
router.post('/api/users', async (req, res) => {
  try {
    // Input validation
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Business logic
    const user = await userService.createUser(value);
    
    // Success response
    res.status(201).json({ user, message: 'User created successfully' });
  } catch (error) {
    logger.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Database Operation Pattern
```javascript
// Database service example
class UserService {
  async createUser(userData) {
    const transaction = await db.transaction();
    try {
      const user = await User.create(userData, { transaction });
      await AuditLog.create({
        action: 'USER_CREATED',
        userId: user.id,
        metadata: { username: user.username }
      }, { transaction });
      
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
```

## Quality Gates

### Must Pass (Blockers)
- All tests pass locally
- Linting passes with zero errors
- All acceptance criteria implemented
- Security vulnerabilities addressed
- No breaking changes (unless approved)

### Should Pass (Important)
- 90%+ test coverage on new code
- Performance impact assessed
- Documentation updated appropriately
- Proper error handling implemented

## Next Steps

Once implementation is complete:
1. **Run final quality checks** (tests, linting, formatting)
2. **Create Pull Request** with comprehensive description
3. **Update ticket status** to "In Review"
4. **Assign for review** (typically automated GitHub Actions)
5. **Monitor CI/CD pipeline** for any failures

## Common Pitfalls to Avoid

- ❌ Skipping the TDD process (writing tests after code)
- ❌ Not running linting before committing
- ❌ Implementing features beyond acceptance criteria
- ❌ Poor error handling or user experience
- ❌ Not updating documentation for new features  
- ❌ Creating PRs without proper descriptions
- ❌ Not testing edge cases identified in ticket
- ❌ Leaving debugging code or console statements
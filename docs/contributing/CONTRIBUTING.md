# Contributing to Rajdeep Personal Website

> Thank you for your interest in contributing! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

### Our Standards

**Positive behaviors include:**

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behaviors include:**

- Harassment of any kind
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct deemed inappropriate

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

- **🐛 Bug Reports** - Help us identify issues
- **✨ Feature Requests** - Suggest new features
- **📝 Documentation** - Improve our docs
- **🎨 Design** - Enhance UI/UX
- **💻 Code** - Submit bug fixes or features
- **🧪 Testing** - Add or improve tests
- **🌐 Translations** - Help internationalize

### Getting Started

1. **Fork the Repository**

   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/YOUR_USERNAME/rajdeep-personal-website.git
   cd rajdeep-personal-website
   ```

2. **Set Up Development Environment**

   ```bash
   # Install dependencies
   yarn install

   # Set up environment
   cp .env.example .env.local

   # Start development server
   yarn dev
   ```

3. **Find an Issue**
   - Check [open issues](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues)
   - Look for `good first issue` labels
   - Comment on issue to claim it

## Development Process

### 1. Create a Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

**Branch Naming Convention:**

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test improvements
- `chore/` - Maintenance tasks

### 2. Make Changes

Follow our [coding standards](#coding-standards) while making changes.

### 3. Test Your Changes

```bash
# Run tests
yarn test

# Type checking
yarn type-check

# Linting
yarn lint

# Format code
yarn format
```

### 4. Commit Your Changes

Follow our [commit guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add new blog post component"
```

### 5. Push Changes

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out the PR template
5. Submit for review

## Pull Request Process

### PR Requirements

Before submitting a PR, ensure:

- [ ] Code follows our style guide
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description is detailed
- [ ] Screenshots included (for UI changes)
- [ ] No merge conflicts

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)

[Add screenshots here]

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs
   - Tests must pass
   - Code coverage maintained

2. **Code Review**
   - At least one maintainer review
   - Address feedback promptly
   - Re-request review after changes

3. **Merge**
   - Squash and merge for clean history
   - Delete branch after merge

## Coding Standards

### TypeScript Guidelines

```typescript
// Use explicit types
interface UserProps {
  name: string
  age: number
  email?: string // Optional properties marked
}

// Use const assertions
const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
} as const

// Prefer interfaces over types for objects
interface User {
  id: string
  name: string
}

// Use enums for constants
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}
```

### React Guidelines

```tsx
// Use function components
function MyComponent({ title }: Props) {
  return <h1>{title}</h1>
}

// Use proper hooks
import { useState, useEffect } from 'react'

function Component() {
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    // Effect logic
  }, []) // Dependencies
}

// Extract custom hooks
function useCustomHook() {
  // Hook logic
  return { data, loading, error }
}
```

### Style Guidelines

```tsx
// Use Tailwind CSS classes
<div className="flex items-center justify-between p-4">
  <h2 className="text-lg font-semibold">Title</h2>
</div>

// Use CSS variables for themes
<div className="bg-background text-foreground">
  Content
</div>

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions/changes
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
feat(blog): add RSS feed generation

# Bug fix
fix(ui): correct button alignment on mobile

# Documentation
docs(api): update service documentation

# Multiple line commit
feat(auth): implement OAuth integration

- Add Google OAuth provider
- Create auth context
- Update user model

Closes #123
```

## Testing

### Writing Tests

```typescript
// Component test example
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByText('Click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Test Coverage

- Maintain minimum 80% coverage
- Write tests for:
  - New features
  - Bug fixes
  - Edge cases
  - Error handling

## Documentation

### Code Documentation

```typescript
/**
 * Formats a date string for display
 * @param date - The date to format
 * @param format - Optional format string
 * @returns Formatted date string
 * @example
 * formatDate(new Date()) // "January 1, 2024"
 * formatDate(new Date(), 'short') // "Jan 1, 2024"
 */
export function formatDate(date: Date, format?: string): string {
  // Implementation
}
```

### README Updates

Update README.md when:

- Adding new features
- Changing setup process
- Modifying configuration
- Adding dependencies

### API Documentation

Document all public APIs:

- Function signatures
- Parameters and returns
- Usage examples
- Error cases

## Community

### Getting Help

- **Questions**: [GitHub Discussions](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/discussions)
- **Bug Reports**: [GitHub Issues](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues)
- **Security**: Email security@rajdeepmondal.com

### Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes
- Project documentation

### First-Time Contributors

We love helping first-time contributors! Look for:

- Issues labeled `good first issue`
- Documentation improvements
- Test additions
- Small bug fixes

## Development Tips

### Useful Commands

```bash
# Development
yarn dev          # Start dev server
yarn build        # Build for production
yarn start        # Start production server

# Code Quality
yarn lint         # Run ESLint
yarn lint:fix     # Fix lint issues
yarn format       # Format code
yarn type-check   # Check TypeScript

# Testing
yarn test         # Run tests
yarn test:watch   # Watch mode
yarn test:coverage # Coverage report

# Content
yarn contentlayer build # Build content
```

### VS Code Setup

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin

Settings:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Debugging

1. Use browser DevTools
2. Add `debugger` statements
3. Use VS Code debugger
4. Check console logs
5. Use React DevTools

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

<div align="center">
  <strong>Thank you for contributing! 🎉</strong>
  <br>
  <sub>Your efforts help make this project better for everyone.</sub>
</div>

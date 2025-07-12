# Documentation Index

> Complete index of all documentation files in the Rajdeep Personal Website project

## 📚 Documentation Structure

```
docs/
├── README.md                    # Main documentation hub
├── INDEX.md                     # This file
│
├── architecture/               # System architecture documentation
│   ├── overview.md            # High-level architecture overview
│   ├── services.md            # Service layer architecture
│   ├── components.md          # Component architecture patterns
│   └── decisions/             # Architecture Decision Records (ADRs)
│       ├── adr-001-nextjs-app-router.md
│       ├── adr-002-content-management.md
│       ├── adr-003-styling-architecture.md
│       └── adr-004-deployment-platform.md
│
├── api/                        # API documentation
│   ├── README.md              # API reference overview
│   ├── rest-endpoints.md      # REST API endpoints
│   ├── service-apis.md        # Internal service APIs
│   └── types.md               # TypeScript type definitions
│
├── components/                 # Component documentation
│   ├── README.md              # Component library overview
│   ├── ui-components.md       # Base UI components
│   ├── layout-components.md   # Layout components
│   └── feature-components.md  # Feature-specific components
│
├── development/               # Development guides
│   ├── getting-started.md    # Quick start guide
│   ├── workflow.md           # Development workflow
│   ├── typescript.md         # TypeScript guide
│   ├── styling.md            # Styling with Tailwind
│   ├── testing.md            # Testing strategies
│   └── debugging.md          # Debugging techniques
│
├── deployment/                # Deployment documentation
│   ├── README.md             # Deployment overview
│   ├── vercel.md             # Vercel deployment guide
│   ├── infrastructure.md     # Infrastructure setup
│   ├── monitoring.md         # Monitoring and analytics
│   └── procedures.md         # Deployment procedures
│
├── guides/                    # How-to guides
│   ├── content-management.md # Managing MDX content
│   ├── performance.md        # Performance optimization
│   ├── troubleshooting.md    # Common issues and solutions
│   ├── security.md           # Security best practices
│   ├── seo.md               # SEO optimization
│   ├── accessibility.md      # Accessibility guidelines
│   ├── error-handling.md     # Error handling patterns
│   └── faq.md               # Frequently asked questions
│
└── contributing/              # Contribution guidelines
    ├── CONTRIBUTING.md       # Main contributing guide
    ├── code-style.md         # Code style guidelines
    ├── pull-requests.md      # PR best practices
    └── documentation.md      # Documentation standards
```

## 🚀 Quick Links by Role

### For New Developers

1. [Getting Started](./development/getting-started.md) - Set up your environment
2. [Development Workflow](./development/workflow.md) - Daily development flow
3. [Architecture Overview](./architecture/overview.md) - Understand the system
4. [Component Library](./components/README.md) - Available components

### For Content Creators

1. [Content Management Guide](./guides/content-management.md) - Writing blog posts
2. [MDX Features](./guides/content-management.md#mdx-features) - Advanced content features
3. [SEO Guide](./guides/seo.md) - Optimize your content
4. [Image Optimization](./guides/content-management.md#image-optimization) - Handle images

### For DevOps Engineers

1. [Deployment Guide](./deployment/README.md) - Deploy to production
2. [Infrastructure Setup](./deployment/infrastructure.md) - Configure infrastructure
3. [Monitoring Guide](./deployment/monitoring.md) - Set up monitoring
4. [Troubleshooting](./guides/troubleshooting.md) - Debug issues

### For Contributors

1. [Contributing Guide](./contributing/CONTRIBUTING.md) - How to contribute
2. [Code Style](./contributing/code-style.md) - Coding standards
3. [Pull Request Guide](./contributing/pull-requests.md) - PR process
4. [Testing Guide](./development/testing.md) - Write tests

## 📖 Documentation by Category

### Architecture & Design

- [Architecture Overview](./architecture/overview.md)
- [Service Architecture](./architecture/services.md)
- [Component Architecture](./architecture/components.md)
- [ADR-001: Next.js App Router](./architecture/decisions/adr-001-nextjs-app-router.md)

### Development

- [Getting Started](./development/getting-started.md)
- [TypeScript Guide](./development/typescript.md)
- [Styling Guide](./development/styling.md)
- [Testing Guide](./development/testing.md)

### APIs & Services

- [API Reference](./api/README.md)
- [Service APIs](./api/service-apis.md)
- [Type Definitions](./api/types.md)
- [Error Handling](./guides/error-handling.md)

### Components & UI

- [Component Library](./components/README.md)
- [UI Components](./components/ui-components.md)
- [Layout Components](./components/layout-components.md)
- [Accessibility Guide](./guides/accessibility.md)

### Content & SEO

- [Content Management](./guides/content-management.md)
- [SEO Optimization](./guides/seo.md)
- [Performance Guide](./guides/performance.md)

### Operations

- [Deployment Guide](./deployment/README.md)
- [Monitoring Setup](./deployment/monitoring.md)
- [Security Guide](./guides/security.md)
- [Troubleshooting](./guides/troubleshooting.md)

## 🔍 Search Documentation

To search across all documentation:

```bash
# Search for a term
grep -r "search term" docs/

# Search for a term (case insensitive)
grep -ri "search term" docs/

# Search in specific file types
find docs -name "*.md" -exec grep -l "search term" {} \;
```

## 📝 Documentation Standards

All documentation follows these principles:

1. **Clear Structure** - Consistent formatting and organization
2. **Code Examples** - Working examples for every concept
3. **Visual Aids** - Diagrams and screenshots where helpful
4. **Cross-References** - Links to related documentation
5. **Up-to-Date** - Reviewed and updated regularly

## 🤝 Contributing to Documentation

See [Documentation Contributing Guide](./contributing/documentation.md) for:

- Documentation style guide
- How to add new documentation
- Documentation review process
- Templates and tools

## 📊 Documentation Coverage

| Area          | Status      | Coverage |
| ------------- | ----------- | -------- |
| Architecture  | ✅ Complete | 100%     |
| API Reference | ✅ Complete | 100%     |
| Components    | ✅ Complete | 100%     |
| Development   | ✅ Complete | 100%     |
| Deployment    | ✅ Complete | 100%     |
| Guides        | ✅ Complete | 100%     |
| Contributing  | ✅ Complete | 100%     |

## 🔄 Recent Updates

- **2024-01-01** - Initial documentation release
- **2024-01-01** - Added architecture decision records
- **2024-01-01** - Created comprehensive guides
- **2024-01-01** - Added troubleshooting documentation

## 📞 Need Help?

- Can't find what you're looking for? Check [FAQ](./guides/faq.md)
- Still stuck? Open an [issue](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/issues)
- Want to chat? Join [discussions](https://github.com/rajdeepmondaldotcom/rajdeep-personal-website/discussions)

---

<div align="center">
  <sub>Documentation is a living project - help us improve it!</sub>
</div>

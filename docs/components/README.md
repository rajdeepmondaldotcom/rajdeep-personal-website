# Component Library Documentation

> Complete guide to the reusable React components in Rajdeep Personal Website

## Table of Contents

- [Overview](#overview)
- [Component Categories](#component-categories)
- [Base UI Components](#base-ui-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Component Guidelines](#component-guidelines)
- [Styling System](#styling-system)
- [Examples](#examples)

## Overview

Our component library follows modern React patterns with TypeScript:

- **TypeScript First** - All components are fully typed
- **Composable** - Build complex UIs from simple parts
- **Accessible** - WCAG 2.1 AA compliance
- **Themeable** - Dark/light mode support
- **Performant** - Optimized rendering and bundle size

## Component Categories

```
components/
├── ui/              # Base UI components (buttons, cards, etc.)
├── layouts/         # Page layout components
├── features/        # Feature-specific components
└── MDXComponents.tsx # MDX component mappings
```

## Base UI Components

### Button

A versatile button component with multiple variants.

```typescript
import { Button } from '@/components/ui/button'
```

#### Props

| Prop     | Type                                                                          | Default     | Description               |
| -------- | ----------------------------------------------------------------------------- | ----------- | ------------------------- |
| variant  | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Button style variant      |
| size     | `'default' \| 'sm' \| 'lg' \| 'icon'`                                         | `'default'` | Button size               |
| asChild  | `boolean`                                                                     | `false`     | Render as child component |
| disabled | `boolean`                                                                     | `false`     | Disable button            |

#### Examples

```tsx
// Default button
<Button>Click me</Button>

// Primary action
<Button variant="default" size="lg">
  Get Started
</Button>

// Destructive action
<Button variant="destructive">
  Delete Item
</Button>

// With icon
<Button size="icon">
  <PlusIcon className="h-4 w-4" />
</Button>

// As link
<Button asChild>
  <Link href="/about">Learn More</Link>
</Button>
```

### Card

Container component for grouped content.

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
```

#### Examples

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Badge

Small label component for tags and statuses.

```typescript
import { Badge } from '@/components/ui/badge'
```

#### Props

| Prop    | Type                                                     | Default     | Description |
| ------- | -------------------------------------------------------- | ----------- | ----------- |
| variant | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Badge style |

#### Examples

```tsx
<Badge>New</Badge>
<Badge variant="secondary">Featured</Badge>
<Badge variant="destructive">Deprecated</Badge>
```

### Input

Form input component with consistent styling.

```typescript
import { Input } from '@/components/ui/input'
```

#### Examples

```tsx
<Input type="email" placeholder="Enter your email" className="max-w-sm" />
```

### Skeleton

Loading placeholder component.

```typescript
import { Skeleton } from '@/components/ui/skeleton'
```

#### Examples

```tsx
// Text skeleton
<Skeleton className="h-4 w-[250px]" />

// Avatar skeleton
<Skeleton className="h-12 w-12 rounded-full" />

// Card skeleton
<div className="space-y-2">
  <Skeleton className="h-4 w-[250px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>
```

## Layout Components

### PageTitle

Consistent page title component.

```typescript
import PageTitle from '@/components/PageTitle'
```

#### Props

| Prop     | Type        | Required | Description   |
| -------- | ----------- | -------- | ------------- |
| children | `ReactNode` | Yes      | Title content |

#### Example

```tsx
<PageTitle>Blog Posts</PageTitle>
```

### SectionContainer

Responsive container with consistent padding.

```typescript
import SectionContainer from '@/components/SectionContainer'
```

#### Example

```tsx
<SectionContainer>
  <h2>Section Title</h2>
  <p>Section content...</p>
</SectionContainer>
```

### LayoutWrapper

Main layout wrapper for pages.

```typescript
import LayoutWrapper from '@/components/LayoutWrapper'
```

## Feature Components

### Header

Site header with navigation.

```typescript
import Header from '@/components/Header'
```

Features:

- Responsive navigation
- Theme toggle
- Mobile menu
- Search button

### Footer

Site footer with links and information.

```typescript
import Footer from '@/components/Footer'
```

### ThemeSwitch

Toggle between light and dark themes.

```typescript
import ThemeSwitch from '@/components/ThemeSwitch'
```

### Tag

Tag component for categorization.

```typescript
import Tag from '@/components/Tag'
```

#### Props

| Prop | Type     | Required | Description |
| ---- | -------- | -------- | ----------- |
| text | `string` | Yes      | Tag text    |

#### Example

```tsx
<Tag text="javascript" />
```

### Link

Enhanced Next.js Link component.

```typescript
import Link from '@/components/Link'
```

#### Features

- External link detection
- Proper rel attributes
- Consistent styling

#### Example

```tsx
// Internal link
<Link href="/about">About</Link>

// External link (automatically detected)
<Link href="https://github.com">GitHub</Link>
```

### Image

Optimized image component extending Next.js Image.

```typescript
import Image from '@/components/Image'
```

#### Example

```tsx
<Image
  src="/static/images/avatar.png"
  alt="Profile picture"
  width={192}
  height={192}
  className="rounded-full"
/>
```

### NewsletterForm

Newsletter subscription form.

```typescript
import NewsletterForm from '@/components/NewsletterForm'
```

#### Props

| Prop  | Type     | Default                       | Description |
| ----- | -------- | ----------------------------- | ----------- |
| title | `string` | "Subscribe to the newsletter" | Form title  |

### Comments

Blog post comments section.

```typescript
import Comments from '@/components/Comments'
```

#### Props

| Prop | Type     | Required | Description                  |
| ---- | -------- | -------- | ---------------------------- |
| slug | `string` | Yes      | Post slug for comment thread |

## Component Guidelines

### 1. Component Structure

```tsx
// components/MyComponent.tsx
import { ComponentProps } from '@/lib/types'

interface MyComponentProps extends ComponentProps {
  title: string
  variant?: 'default' | 'primary'
}

export default function MyComponent({
  title,
  variant = 'default',
  className,
  ...props
}: MyComponentProps) {
  return (
    <div
      className={cn('base-styles', variant === 'primary' && 'primary-styles', className)}
      {...props}
    >
      {title}
    </div>
  )
}
```

### 2. TypeScript Best Practices

```tsx
// Use explicit types
interface Props {
  items: string[]
  onSelect: (item: string) => void
}

// Use generics for reusable components
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
}

// Extend HTML elements
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}
```

### 3. Accessibility

```tsx
// Always include ARIA labels
<button aria-label="Close dialog">
  <XIcon />
</button>

// Use semantic HTML
<nav aria-label="Main navigation">
  <ul>...</ul>
</nav>

// Handle keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
```

## Styling System

### Using Tailwind CSS

```tsx
// Base styles with variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
```

### Dark Mode Support

```tsx
// Use Tailwind's dark mode classes
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-100">Adapts to theme</p>
</div>
```

### Responsive Design

```tsx
// Mobile-first responsive classes
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</div>
```

## Examples

### Complete Form Example

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

function ContactForm() {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="your@email.com" />
          </div>
          <Button type="submit" className="w-full">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

### Loading State Example

```tsx
import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

function BlogPostSkeleton() {
  return (
    <Card className="p-6">
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </Card>
  )
}
```

## Component Development

### Creating New Components

1. Create file in appropriate directory
2. Define TypeScript interface
3. Implement component with proper props
4. Add JSDoc documentation
5. Export from index file
6. Write tests
7. Document in this guide

### Testing Components

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByText('Delete')).toHaveClass('bg-destructive')
  })
})
```

## Related Documentation

- [Styling Guide](../development/styling.md) - CSS and Tailwind patterns
- [TypeScript Guide](../development/typescript.md) - Type system usage
- [Testing Guide](../development/testing.md) - Component testing
- [Accessibility Guide](../guides/accessibility.md) - A11y best practices

# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-27-shadcn-ui-migration/spec.md

## Technical Requirements

### Installation & Setup
- Initialize shadcn/ui configuration with TypeScript and Tailwind CSS
- Configure path aliases in tsconfig.json for @/components and @/lib
- Set up the cn() utility function for class name merging
- Configure shadcn/ui's CSS variables in the global styles

### Component Migration Strategy
- Phase 1: Core Components
  - Button (all variants: primary, secondary, destructive, outline, ghost, link)
  - Input, Textarea, Select form elements
  - Label and form field components
  - Card and its sub-components (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  
- Phase 2: Interactive Components  
  - Dialog/Modal (replace all custom modals)
  - Dropdown Menu (for user menus and actions)
  - Toast/Alert notifications
  - Tabs (for settings and multi-section views)
  - Switch/Toggle components
  
- Phase 3: Complex Components
  - Table (with sorting, filtering capabilities)
  - Form (with react-hook-form integration)
  - Navigation Menu (main app navigation)
  - Command (search and command palette)
  - Sheet (side panels and mobile navigation)

### File Structure Updates
- Create @/components/ui/ directory for shadcn/ui components
- Maintain @/lib/utils.ts for utility functions
- Update all component imports throughout the application
- Remove obsolete custom component files after migration

### Hero Background Preservation
- Isolate animated background CSS in a separate module
- Ensure background animation is not affected by shadcn/ui's CSS reset
- Maintain z-index hierarchy to keep background behind content
- Preserve any JavaScript-based animation logic

### Build & Performance Considerations
- Tree-shaking to include only used shadcn/ui components
- Lazy loading for large component bundles
- Ensure Vite build optimization for shadcn/ui modules
- Monitor bundle size impact and optimize as needed

## External Dependencies

- **@radix-ui/\*** - Unstyled, accessible UI primitive components that shadcn/ui is built upon
- **Justification:** Required for shadcn/ui components to function properly with accessibility features

- **class-variance-authority** - For building component variants with TypeScript support
- **Justification:** Core dependency for shadcn/ui's variant system

- **clsx** - Utility for constructing className strings conditionally
- **Justification:** Required for the cn() utility function

- **tailwind-merge** - Intelligently merge Tailwind CSS classes without conflicts
- **Justification:** Prevents style conflicts when combining Tailwind classes

- **lucide-react** - Icon library for consistent icons across shadcn/ui components
- **Justification:** Default icon library used by shadcn/ui components

- **@tailwindcss/forms** - Form styles reset plugin
- **Justification:** Ensures consistent form element styling with shadcn/ui

- **react-hook-form** - Forms management (if not already installed)
- **Justification:** Recommended for shadcn/ui form components integration

- **zod** - Schema validation (if not already installed)
- **Justification:** Works with react-hook-form for form validation
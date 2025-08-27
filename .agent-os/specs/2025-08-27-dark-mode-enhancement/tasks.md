# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-08-27-dark-mode-enhancement/spec.md

> Created: 2025-08-27
> Status: Ready for Implementation

## Tasks

## 1. Landing Page Dark Mode Implementation

1.1 Write tests for landing page forced dark mode behavior
1.2 Implement dark mode CSS variables and theme tokens for landing page
1.3 Update landing page components to use dark theme styling
1.4 Remove theme toggle visibility on unauthenticated routes
1.5 Apply dark theme to all landing page sections (hero, features, pricing, footer)
1.6 Ensure landing page background animation remains unaffected
1.7 Test theme persistence prevention on landing page
1.8 Verify all tests pass

## 2. Authenticated Theme System Implementation

2.1 Write tests for theme switching functionality and persistence
2.2 Create theme context provider for authenticated users
2.3 Implement theme toggle component with system default mode as default
2.4 Add theme persistence using localStorage or session storage
2.5 Integrate theme toggle into authenticated navigation
2.6 Implement theme state management across authenticated routes
2.7 Ensure theme changes apply immediately to all components
2.8 Verify all tests pass

## 3. Navigation Components Migration to shadcn/ui

3.1 Write tests for navbar and sidebar shadcn/ui components
3.2 Replace custom navbar with shadcn/ui Navigation Menu component
3.3 Replace custom sidebar with shadcn/ui Sheet component
3.4 Migrate dropdown menus to shadcn/ui Dropdown Menu component
3.5 Implement responsive navigation behavior using shadcn/ui patterns
3.6 Apply theme support to all navigation components
3.7 Remove all custom navigation CSS and components
3.8 Verify all tests pass

## 4. Modal System Migration to shadcn/ui Dialog

4.1 Write tests for modal conversion to shadcn/ui Dialog components
4.2 Identify and catalog all existing custom modals in the application
4.3 Replace custom modals with shadcn/ui Dialog components
4.4 Implement proper Dialog trigger and content patterns
4.5 Ensure modal theming works correctly in both light and dark modes
4.6 Update modal state management to work with shadcn/ui Dialog
4.7 Remove all custom modal CSS and JavaScript
4.8 Verify all tests pass

## 5. Complete Component Migration and Consistency

5.1 Write tests for remaining component migrations to shadcn/ui
5.2 Audit entire application to identify non-shadcn/ui components
5.3 Replace remaining custom buttons, forms, and cards with shadcn/ui equivalents
5.4 Implement shadcn/ui input components across all forms
5.5 Ensure all components support both light and dark themes
5.6 Validate 100% shadcn/ui usage except landing page background animation
5.7 Clean up unused custom CSS and component files
5.8 Verify all tests pass
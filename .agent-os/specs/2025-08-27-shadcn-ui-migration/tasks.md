# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-08-27-shadcn-ui-migration/spec.md

> Created: 2025-08-27
> Status: Ready for Implementation

## Tasks

- [ ] 1. Setup shadcn/ui Infrastructure and Core Components
  - [ ] 1.1 Install shadcn/ui CLI and initialize configuration
  - [ ] 1.2 Set up path aliases and base utilities (cn function)
  - [ ] 1.3 Install core dependencies (@radix-ui, class-variance-authority, clsx, tailwind-merge)
  - [ ] 1.4 Create components/ui directory structure
  - [ ] 1.5 Add shadcn/ui base styles and CSS variables
  - [ ] 1.6 Install and configure Button, Input, Label components
  - [ ] 1.7 Install Card, Form, and Select components
  - [ ] 1.8 Verify all core components render correctly

- [ ] 2. Migrate Authentication and Landing Pages
  - [ ] 2.1 Replace login form components with shadcn/ui
  - [ ] 2.2 Migrate registration form to shadcn/ui components
  - [ ] 2.3 Update password reset form with shadcn/ui
  - [ ] 2.4 Preserve animated hero background in landing page
  - [ ] 2.5 Replace landing page buttons and CTAs with shadcn/ui
  - [ ] 2.6 Migrate landing page cards and feature sections
  - [ ] 2.7 Test all authentication flows work correctly

- [ ] 3. Migrate Dashboard and Settings Components
  - [ ] 3.1 Install Dialog, Dropdown Menu, and Sheet components
  - [ ] 3.2 Replace dashboard navigation with shadcn/ui Navigation Menu
  - [ ] 3.3 Migrate dashboard cards and stats displays
  - [ ] 3.4 Update settings forms with shadcn/ui Form components
  - [ ] 3.5 Replace all modals with shadcn/ui Dialog
  - [ ] 3.6 Migrate dropdown menus and user menu
  - [ ] 3.7 Update all dashboard tables with shadcn/ui Table
  - [ ] 3.8 Verify dashboard functionality and interactions

- [ ] 4. Migrate Organization and Agent Management UI
  - [ ] 4.1 Install Tabs, Switch, and Badge components
  - [ ] 4.2 Update organization creation/edit forms
  - [ ] 4.3 Migrate agent configuration interface
  - [ ] 4.4 Replace all toggle switches with shadcn/ui Switch
  - [ ] 4.5 Update tab navigation with shadcn/ui Tabs
  - [ ] 4.6 Migrate alert and notification components
  - [ ] 4.7 Test organization and agent management flows

- [ ] 5. Final Migration and Cleanup
  - [ ] 5.1 Install any remaining shadcn/ui components needed
  - [ ] 5.2 Replace all remaining custom Tailwind components
  - [ ] 5.3 Remove obsolete custom component files
  - [ ] 5.4 Update all import statements throughout the app
  - [ ] 5.5 Verify hero background animation still works
  - [ ] 5.6 Run build and check for any errors
  - [ ] 5.7 Test complete application flow end-to-end
  - [ ] 5.8 Verify all functionality works in the browser
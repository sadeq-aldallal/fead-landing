# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-27-dark-mode-enhancement/spec.md

> Created: 2025-08-27
> Version: 1.0.0

## Technical Requirements

### 1. Theme System Implementation using React Context

**Theme Provider Setup**
- Create `ThemeContext` using React's `createContext` API
- Implement `ThemeProvider` component with state management for theme switching
- Support theme values: `'light'`, `'dark'`, `'system'` (follows OS preference)
- Expose `useTheme()` hook for consuming components

**Context Structure**
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}
```

**Implementation Location**
- Create `src/contexts/ThemeContext.tsx`
- Wrap main App component with ThemeProvider
- Integrate with existing `DashboardContext` for authenticated state awareness

### 2. Landing Page Forced Dark Mode

**CSS Override Strategy**
- Implement CSS-in-JS or CSS modules for landing page components
- Force dark theme variables regardless of user preference
- Override shadcn/ui theme variables specifically for landing page routes

**Component-Level Implementation**
- Landing page components should ignore ThemeContext
- Apply dark theme classes unconditionally
- Ensure proper contrast ratios for accessibility

**Route-Based Theme Override**
```typescript
// Apply to routes: '/', '/pricing', '/features', '/about'
const isLandingPage = location.pathname === '/' || 
                     location.pathname.startsWith('/pricing') ||
                     location.pathname.startsWith('/features') ||
                     location.pathname.startsWith('/about');
```

### 3. Post-Login Theme Switching with localStorage Persistence

**localStorage Integration**
- Key: `fead-app-theme`
- Sync theme state with localStorage on every change
- Initialize theme from localStorage on app startup
- Fall back to 'system' if no stored preference exists

**Implementation Pattern**
```typescript
useEffect(() => {
  const storedTheme = localStorage.getItem('fead-app-theme') as Theme;
  if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
    setTheme(storedTheme);
  }
}, []);
```

**System Theme Detection**
- Use `window.matchMedia('(prefers-color-scheme: dark)')` for system preference
- Add event listener for OS theme changes
- Update resolved theme when system preference changes

### 4. Component Migration to shadcn/ui

**Priority Components for Migration**
1. Form components (Login, Register, Profile forms)
2. Navigation components (Dashboard sidebar, top navigation)
3. Modal/Dialog components
4. Button components with consistent variants
5. Input components with proper theming support

**Migration Strategy**
- Replace custom CSS with shadcn/ui component classes
- Ensure all components use CSS custom properties for theming
- Maintain existing functionality while improving visual consistency
- Test theme switching on all migrated components

**Component Mapping**
```
Custom Button → shadcn/ui Button
Custom Input → shadcn/ui Input
Custom Modal → shadcn/ui Dialog
Custom Dropdown → shadcn/ui DropdownMenu
```

### 5. Professional Styling Consistency

**Design System Implementation**
- Use shadcn/ui's built-in design tokens
- Implement consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px)
- Standardize border radius values across components
- Ensure proper color contrast in both themes

**Typography Standards**
- Use shadcn/ui typography utilities
- Implement consistent font weights and sizes
- Ensure text remains readable in both light and dark themes

**Component Variants**
- Primary, secondary, outline, ghost button variants
- Consistent form field states (default, focus, error, disabled)
- Standardized card layouts and shadows

### 6. Integration with Existing Supabase Auth System

**Authentication State Integration**
- Theme preferences should only persist for authenticated users
- Anonymous users always see landing page dark mode
- Clear theme preferences on logout
- Restore theme preferences on login

**User Preferences Storage**
- Consider extending Supabase user metadata to include theme preference
- Sync localStorage with database for cross-device consistency
- Handle offline scenarios gracefully

**Implementation Approach**
```typescript
// On login success
const { data: user } = await supabase.auth.getUser();
if (user?.user_metadata?.theme_preference) {
  setTheme(user.user_metadata.theme_preference);
}

// On theme change (authenticated users)
if (user) {
  await supabase.auth.updateUser({
    data: { theme_preference: newTheme }
  });
}
```

## Approach

### Phase 1: Theme System Foundation
1. Create ThemeContext and provider
2. Implement localStorage persistence
3. Add system theme detection
4. Integrate with main App component

### Phase 2: Landing Page Dark Mode
1. Implement route-based theme detection
2. Override theme for landing page components
3. Ensure visual consistency with marketing design
4. Test accessibility and contrast ratios

### Phase 3: Component Migration
1. Audit existing custom components
2. Migrate high-priority components to shadcn/ui
3. Update theme variables and CSS custom properties
4. Test theme switching on all migrated components

### Phase 4: Professional Styling
1. Implement design system standards
2. Update spacing and typography
3. Standardize component variants
4. Ensure cross-browser compatibility

### Phase 5: Supabase Integration
1. Integrate theme preferences with user metadata
2. Implement cross-device synchronization
3. Handle authentication state changes
4. Test offline/online scenarios

## Implementation Files

### New Files to Create
- `src/contexts/ThemeContext.tsx` - Theme management context
- `src/hooks/useTheme.ts` - Theme consumption hook
- `src/lib/theme-utils.ts` - Theme utilities and helpers
- `src/components/theme/ThemeToggle.tsx` - Theme switcher component

### Files to Modify
- `src/App.tsx` - Wrap with ThemeProvider
- `src/main.tsx` - Add theme CSS variables
- `src/index.css` - Update root theme definitions
- `src/contexts/DashboardContext.tsx` - Integrate with theme system
- Landing page components - Force dark mode
- Authenticated area components - Enable theme switching

## Testing Strategy

### Unit Tests
- Theme context provider functionality
- localStorage persistence
- Theme switching logic
- System theme detection

### Integration Tests
- Authentication flow with theme preferences
- Route-based theme overrides
- Cross-device theme synchronization

### Visual Regression Tests
- Component appearance in light/dark themes
- Landing page forced dark mode
- Theme transition animations

## Performance Considerations

- Minimize theme switching rerender cycles
- Use CSS custom properties for efficient theme updates
- Implement theme preloading to prevent flash of incorrect theme
- Optimize bundle size by tree-shaking unused shadcn/ui components
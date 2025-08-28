# Development Best Practices

## Context

Global development guidelines for Agent OS projects.

<conditional-block context-check="core-principles">
IF this Core Principles section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Core Principles already in context"
ELSE:
  READ: The following principles

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to private methods
- Extract repeated UI markup to reusable components
- Create utility functions for common operations

### File Structure
- Keep files focused on a single responsibility
- Group related functionality together
- Use consistent naming conventions
</conditional-block>

<conditional-block context-check="dependencies" task-condition="choosing-external-library">
IF current task involves choosing an external library:
  IF Dependencies section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Dependencies guidelines already in context"
  ELSE:
    READ: The following guidelines
ELSE:
  SKIP: Dependencies section not relevant to current task

## Dependencies

### Choose Libraries Wisely
When adding third-party dependencies:
- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - Clear documentation
</conditional-block>

## Internationalization Requirements

**CRITICAL**: This app supports English and Arabic languages. ALL new user-facing text MUST be added to both languages.

### Text Constants Location
- File: `src/contexts/LanguageContext.tsx`
- Structure: `translations.en` and `translations.ar` objects
- Access via: `t('key.name')` function in components

### Adding New Text Requirements
When adding ANY user-facing text:
1. **NEVER hardcode text** in components
2. **ALWAYS add to both `en` and `ar`** in `translations` object
3. **Use descriptive key names** following existing pattern (e.g., `'section.element.purpose'`)
4. **Test RTL layout** for Arabic text
5. **Use semantic HTML** for proper text direction

### Key Naming Convention
```
'section.element.purpose': 'Text content'
Examples:
- 'nav.dashboard': 'Dashboard' / 'لوحة التحكم'
- 'auth.login': 'Login' / 'تسجيل الدخول'  
- 'hero.title': 'Main Title' / 'العنوان الرئيسي'
```

## Documentation Updates

**CRITICAL**: When adding or modifying features, the documentation MUST be updated.

### Documentation Requirements
When implementing new features or modifying existing ones:
1. **Update in-app documentation** in relevant docs components
2. **Add usage examples** for new functionality
3. **Document API changes** if applicable
4. **Update troubleshooting guides** for new edge cases
5. **Maintain consistency** with existing documentation style

### Documentation Locations
- Main docs: `src/components/docs/`
- Enhanced docs: `src/components/docs/enhanced/`
- Legal docs: `src/components/legal/`

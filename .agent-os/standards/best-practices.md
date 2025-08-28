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

## Subagent Usage Requirements

**CRITICAL**: Always use specialized subagents when available to maximize efficiency and leverage specialized capabilities.

### Available Subagents
- **arabic-app-translator**: For all Arabic translations and UI/UX localization
- **shadcn-ui-builder**: For creating/modifying React components with shadcn/ui
- **context-fetcher**: For retrieving Agent OS documentation and context
- **file-creator**: For creating files, directories, and applying templates
- **general-purpose**: For complex multi-step tasks and research
- **git-workflow**: For git operations and branch management
- **test-runner**: For running tests and analyzing failures
- **project-manager**: For task tracking and roadmap updates

### Subagent Usage Rules
1. **ALWAYS check available subagents** before starting any task
2. **Use specialized subagents** instead of doing work manually when:
   - Translating text to Arabic → Use `arabic-app-translator`
   - Building UI components → Use `shadcn-ui-builder`
   - Creating files/templates → Use `file-creator`
   - Git operations → Use `git-workflow`
   - Running tests → Use `test-runner`
   - Complex research → Use `general-purpose`
3. **Launch multiple subagents concurrently** when tasks can be parallelized
4. **Provide detailed task descriptions** to subagents for autonomous execution
5. **Trust subagent outputs** and use their specialized expertise

### When to Use Subagents
- **Always preferred**: Use subagents for tasks matching their specialization
- **Default approach**: When in doubt, use a subagent rather than manual work
- **Efficiency focus**: Subagents are designed to be faster and more accurate than manual approaches

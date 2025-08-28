# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-28-arabic-language-overhaul/spec.md

> Created: 2025-08-28
> Version: 1.0.0

## Technical Requirements

- Complete replacement of existing LanguageContext.tsx translation system
- Integration of Google Fonts Noto Naskh Arabic with proper fallbacks
- Professional Arabic translation keys using contextual business terminology
- RTL-aware CSS system with proper directional styling
- Robust location detection system that automatically detects Arabic countries and sets Arabic as default language
- Fallback mechanism when location detection fails or is blocked - defaults to English with prominent language toggle
- Integration with arabic-app-translator subagent for all professional translation work
- Location detection should work perfectly for all Arabic countries (Saudi Arabia, UAE, Egypt, Jordan, Lebanon, etc.)
- Graceful handling of location permission denial or geolocation API failures
- Enhanced location detection API integration for Arabic countries
- Smart language toggle component placement logic
- Typography hierarchy adjustments for Arabic text rendering
- Component-level RTL layout fixes for shadcn/ui components
- State management for language preference persistence
- Professional translation validation and QA process

## Approach

### Phase 1: Foundation Setup
1. **Font Integration**: Implement Google Fonts Noto Naskh Arabic loading with proper fallback chain
2. **CSS Framework**: Establish RTL-aware CSS variables and directional utility classes
3. **Translation System**: Replace current LanguageContext.tsx with enhanced multilingual state management

### Phase 2: Content Translation
1. **Professional Translation**: Engage Arabic translation service for business-contextual terminology
2. **Key Structure**: Reorganize translation keys for better maintainability and context awareness
3. **Validation Process**: Implement QA workflow for translation accuracy and cultural appropriateness

### Phase 3: UI/UX Optimization
1. **RTL Layout**: Apply directional fixes to all shadcn/ui components
2. **Typography System**: Adjust font sizes, line heights, and spacing for Arabic text rendering
3. **Component Logic**: Implement smart placement algorithms for language toggle functionality

### Phase 4: Location Intelligence
1. **Detection Enhancement**: Improve location-based language detection for Arabic-speaking regions
2. **Preference Persistence**: Implement robust state management for user language preferences
3. **Performance Optimization**: Ensure smooth switching between languages without layout shift

## Location Detection Implementation

- IP-based geolocation as primary method
- Browser geolocation API as secondary option
- Manual language selection always available as fallback
- Arabic countries list: SA, AE, EG, JO, LB, SY, IQ, KW, QA, BH, OM, YE, LY, TN, DZ, MA, SD, DJ, SO, MR
- Persistent language preference storage to remember user choice

## External Dependencies

- **Google Fonts API** - For Noto Naskh Arabic font loading
  - Justification: Required for professional Arabic typography as specified in requirements
- **arabic-app-translator subagent** - For professional contextual Arabic translations
  - Justification: Custom subagent specifically designed for app translation work with cultural context understanding
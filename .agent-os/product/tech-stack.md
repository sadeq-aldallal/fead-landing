# Technical Stack

## Frontend
- **Application Framework:** React 18 + TypeScript + Vite
- **CSS Framework:** Tailwind CSS (transitioning to shadcn/ui)
- **UI Component Library:** shadcn/ui (planned migration from custom Tailwind components)
- **Icon Library:** Lucide React
- **State Management:** React Context API
- **Routing:** React Router with protected routes

## Backend & Database
- **Database System:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth with multi-tenant support
- **Real-time Features:** Supabase Realtime for live updates
- **Row Level Security:** Supabase RLS for tenant data isolation

## SaaS Infrastructure
- **Multi-Tenancy:** Organization-based tenant isolation
- **Subscription Management:** Planned integration with Stripe/payment provider
- **Email Service:** Google Cloud Functions for transactional emails
- **Workflow Automation:** N8N for backend process automation

## External Integrations
- **Instagram API:** Instagram Business API with OAuth and webhooks
- **AI/ML:** Custom AI agent configuration system (planned expansion)
- **Analytics:** Planned integration for SaaS metrics tracking

## Hosting & Deployment
- **Application Hosting:** Vercel (optimized for React SaaS applications)
- **Database Hosting:** Supabase Cloud (managed PostgreSQL)
- **Asset Hosting:** Supabase Storage
- **CDN:** Vercel Edge Network
- **Environment Management:** Multi-environment support (dev/staging/prod)

## Development Tools
- **Version Control:** Git-based with feature branch workflow
- **Package Manager:** npm
- **Build Tool:** Vite (fast HMR for development)
- **Type System:** TypeScript with strict mode
- **Code Quality:** ESLint + Prettier
- **Testing:** Planned - Jest + React Testing Library

## Security & Compliance
- **Authentication Security:** Supabase Auth with JWT tokens
- **Data Encryption:** At-rest and in-transit encryption
- **GDPR Compliance:** Account deletion and data export features
- **API Security:** Rate limiting and request validation
- **Tenant Isolation:** Database-level row security policies

## Monitoring & Observability (Planned)
- **Application Monitoring:** Error tracking and performance monitoring
- **Database Monitoring:** Supabase built-in monitoring
- **User Analytics:** Customer usage tracking for SaaS metrics
- **Uptime Monitoring:** Service availability tracking

## Architecture Patterns
- **Import Strategy:** ES6 modules with Vite bundling
- **Component Architecture:** Modular React components with TypeScript interfaces
- **API Communication:** Supabase client with real-time subscriptions
- **Internationalization:** Custom i18n with RTL support for Arabic
- **State Management Pattern:** Context providers for global state
- **Error Handling:** Comprehensive error boundaries and user feedback
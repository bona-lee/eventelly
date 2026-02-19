# Eventelly -- AI Context (Claude Code)

## 1. Product Definition

Eventelly is a B2B, organizer-centric event management system.

It enables:
- Multi-workspace event operations
- No-code configuration
- End-to-end event lifecycle management

This document defines structural constraints for generating admin UI screens.

---

## 2. Core Hierarchy (Non-Negotiable)

Account → Workspace → Event

Rules:
- Event always belongs to a Workspace
- Participants belong to Workspace (not Account)
- Account is authentication layer only
- Never generate UI that breaks this hierarchy

---

## 3. User Types

### Admin
- Has Eventelly account
- Can belong to multiple Workspaces
- Operates events inside a Workspace
- Roles (Workspace-scoped): Owner / Manager / Staff

### User
- No Eventelly account
- Exists at Workspace level
- Can join multiple events within same Workspace

---

## 4. Admin Navigation Model

All admin UI must follow this logical order:

1. Login
2. Select Workspace
3. Workspace Dashboard
4. Select / Create Event
5. Event Setup
6. Event Operation
7. Data & Reporting

Workspace context must always be visible.
Event context must be clearly indicated when inside Event level.

---

## 5. Information Architecture

### Account Level
- Authentication
- Workspace list
- Account settings

### Workspace Level (Global Layer)
- Workspace settings
- Admin & role management
- Event series / event list
- Participant management
- Organization profiles
- Workspace dashboard summary

### Event Level (Operational Layer)

**Operations**
- Participant management
- Registration
- Exhibition
- Meetings
- Extra Forms

**Settings**
- Event configuration
- Forms & Terms
- Communication templates
- Design (Site theme, pages, sitemap)
- Reports & Analytics

---

## 6. UI Generation Rules

When generating screens:
- SaaS-style B2B admin UI
- Configuration-first layout
- Minimal explanatory text
- Structural clarity over visual design
- English default language
- No country-specific assumptions
- No marketing or landing page layouts

Generate:
- Sidebar navigation
- Section-based forms
- Tables with filters
- Functional dashboards

Do NOT generate:
- Final branding
- Decorative layouts

---

## 7. Design System & Component Guidelines

### Preserve Existing Patterns

When modifying UI or adding features:

**DO:**
- Reuse existing components from `/src/components`
- Follow existing Tailwind utility class patterns
- Match current spacing, colors, and typography
- Check similar pages for style reference before making changes
- Keep modifications minimal and scoped

**DO NOT:**
- Create new component variants for one-off styling needs
- Introduce new design patterns without explicit request
- Extract inline styles to new components "for organization"
- Break visual consistency across similar pages

### Component Creation Policy

Only create new components when:
- Logic is reused in 3+ places
- Component has unique, complex behavior
- **Explicitly requested by user**

Otherwise: keep logic and styling in page files with inline Tailwind classes.

### Style Modification Approach

When user requests visual changes:
1. Modify existing Tailwind classes in place
2. Copy class patterns from similar existing pages
3. Do not create wrapper components unless necessary
4. Maintain consistency with surrounding UI

### Anti-Patterns to Avoid

❌ Creating `<PrimaryButton>` when `<button className="px-4 py-2 bg-blue-600...">` works
❌ New Card/Layout components for single-use cases
❌ Inconsistent spacing/color values across pages
❌ Over-abstracting simple UI elements

**Principle: Consistency > Novelty | Reuse > Create**

---

## 8. Fidelity Level

Claude generates:
- Low to mid-fidelity structural UI
- Logical layout hierarchy
- Placeholder content when necessary

Claude does NOT generate:
- Pixel-perfect production UI
- Detailed animation logic
- Full implementation code unless explicitly requested

---

This document is the structural source of truth for AI-generated admin UI.

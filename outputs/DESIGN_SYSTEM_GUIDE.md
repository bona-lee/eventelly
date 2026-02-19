# Eventelly Design System — Working Guide

> Version: 1.0
> Last updated: 2026-02-13
> Source of truth: `STYLE_GUIDE.md`, `tailwind.config.ts`, `globals.css`

---

## 1. Overview

### Purpose

This document is the practical working guide for **designers** and **publishers (front-end developers)** working on the Eventelly admin UI. It defines the rules, tokens, and component patterns that must be followed when creating or modifying any screen.

- **Designers:** Use Sections 2 (Design Tokens) and 5 (Workflow) when creating mockups.
- **Publishers:** Use Sections 3 (Component Guidelines) and 4 (Coding Rules) when writing markup.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| CSS | Tailwind CSS v3.4.17 |
| Font | Pretendard (CDN) |
| Component Library | None (custom only) |
| Theme | Single light theme (no dark mode) |

### Information Architecture

Eventelly follows a strict 3-level hierarchy. All UI must respect this structure:

```
Account (authentication layer)
  └─ Workspace (operational scope)
       └─ Event (operational unit)
```

| Context | URL Pattern | Primary Color |
|---------|------------|---------------|
| Admin pages | `/workspace/*`, `/dashboard/*` | `admin-primary-*` (muted green) |
| Public pages | `/events/[eventSlug]/*` | `brand-primary-*` (vibrant green) |

---

## 2. Design Tokens

### 2.1 Color System

The color system is organized into **6 layers**. Only these tokens are permitted — no raw Tailwind defaults (e.g., `bg-blue-500`) allowed.

#### Admin Primary (Muted Green — `#178C65`)

For all admin interactive states: buttons, focus rings, links, selection, toggles.

| Token | Hex | Usage |
|-------|-----|-------|
| admin-primary-50 | `#F0F8F5` | Selected item bg, chip bg |
| admin-primary-100 | `#DCEFE8` | Dropdown selected bg |
| admin-primary-200 | `#B3DBCC` | Focus border secondary |
| admin-primary-300 | `#75C7A9` | Chip border, tab underline |
| admin-primary-500 | `#178C65` | **Focus rings** |
| admin-primary-600 | `#107454` | Toggle on, tab active text |
| admin-primary-700 | `#0A5D43` | **CTA buttons, active nav** |
| admin-primary-800 | `#064632` | CTA hover state |

> **Figma mapping:** `admin-primary/50` through `admin-primary/900`

#### Brand Primary (Vibrant Green — `#28E486`)

Public-facing pages only. Never used in admin UI.

| Token | Hex | Usage |
|-------|-----|-------|
| brand-primary-500 | `#28E486` | Brand accent fills |
| brand-primary-600 | `#1EB86C` | Hero gradient start |
| brand-primary-700 | `#178C65` | Hero gradient end |

#### Neutral (Gray Scale)

Single unified gray system with cool undertone.

| Token | Hex | Usage |
|-------|-----|-------|
| neutral-50 | `#F1F7F6` | Body bg, hover bg, muted card bg |
| neutral-100 | `#E3EDEB` | Card border, dividers, badge bg |
| neutral-200 | `#C9D5D3` | Input border |
| neutral-300 | `#ADBAB7` | Disabled text, checkbox border |
| neutral-400 | `#8A9895` | Placeholder text, muted icons |
| neutral-500 | `#6B7876` | Secondary text, descriptions |
| neutral-600 | `#556260` | Nav text, table body text |
| neutral-700 | `#414D4B` | Hover text emphasis |
| neutral-800 | `#303938` | Label text |
| neutral-950 | `#141B1A` | **Primary text, all headings** |

#### Semantic (Status Colors)

Each status has 4 sub-tokens: **bg** (badge/alert fill), **text** (label text), **border** (alert border), **solid** (dots/indicators).

| Status | bg | text | border | solid |
|--------|----|------|--------|-------|
| Success | `#F0FDF4` | `#15803D` | `#16A34A` | `#22C55E` |
| Warning | `#FFFBEB` | `#B45309` | `#D97706` | `#F59E0B` |
| Error | `#FEF2F2` | `#B91C1C` | `#DC2626` | `#EF4444` |
| Info | `#EFF6FF` | `#1D4ED8` | `#2563EB` | `#3B82F6` |

> **Figma mapping:** `status-success/bg`, `status-success/text`, etc.

#### Destructive (Delete / Danger)

For interactive delete actions. Separate from `status-error` (which shows state, not actions).

| Token | Hex | Usage |
|-------|-----|-------|
| destructive-bg | `#FEF2F2` | Hover bg on delete buttons |
| destructive-text | `#DC2626` | Delete icon/text color |
| destructive-hover | `#B91C1C` | Solid button hover |

#### Form Required

| Token | Hex | Usage |
|-------|-----|-------|
| form-required | `#EF4444` | Required-field `*` asterisk |

---

### 2.2 Typography Scale

**Font family:** Pretendard

#### Admin UI (max 24px)

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-micro` | 10px | 14px | Badge/pill text |
| `text-xs` | 12px | 16px | Timestamps, helpers, table headers |
| `text-sm` | 14px | 20px | **Default body text**, nav, buttons, labels |
| `text-base` | 16px | 24px | Rarely used in admin |
| `text-lg` | 18px | 28px | Section headings, modal titles |
| `text-xl` | 20px | 28px | Secondary page titles |
| `text-2xl` | 24px | 32px | **Page titles — ADMIN MAX** |

#### Public Pages Only (`events/[eventSlug]/*`) — Arbitrary Values

`text-3xl` through `text-9xl` are **removed from `tailwind.config.ts`**. Public pages use arbitrary values:

| Arbitrary Value | Size | Usage |
|-----------------|------|-------|
| `text-[30px]` | 30px | Large display text |
| `text-[36px]` | 36px | Hero subtitle |
| `text-[48px]` | 48px | Hero text |
| `text-[60px]` | 60px | Hero large |

#### Font Weight

| Weight | Class | Usage |
|--------|-------|-------|
| 400 | (default) | Body text |
| 500 | `font-medium` | Labels, nav active |
| 600 | `font-semibold` | Buttons, section headings |
| 700 | `font-bold` | Page titles, stats |

---

### 2.3 Spacing & Layout

Base unit: **4px**. Standard Tailwind spacing scale.

| Token | px | Common Usage |
|-------|----|-------------|
| 1 | 4px | Small gaps (gap-1) |
| 2 | 8px | Icon margins, small padding (p-2, gap-2) |
| 3 | 12px | Input horizontal padding (px-3) |
| 4 | 16px | **Standard padding** (p-4, gap-4) |
| 5 | 20px | Card padding, table cells (p-5, px-5) |
| 6 | 24px | **Page padding** (p-6, gap-6) |
| 8 | 32px | Section spacing (mb-8) |

#### Standard Page Layout

```
Page padding: p-6 (24px)
Section gap: space-y-6 (24px)
Card padding: p-5 (20px) or p-6 (24px)
Form field gap: space-y-4 (16px)
```

---

### 2.4 Border Radius

Custom scale — replaces Tailwind defaults. Only these values exist:

| Token | Size | Class | Element |
|-------|------|-------|---------|
| DEFAULT | 4px | `rounded` | Tags, non-semantic badges |
| md | 6px | `rounded-md` | **Buttons, inputs, nav items, action icons** |
| lg | 8px | `rounded-lg` | **Cards, modals, dropdowns, panels** |
| full | 9999px | `rounded-full` | Status badges, avatars, toggles |
| none | 0 | `rounded-none` | Edge cases, input groups |

> **Removed from scale:** `rounded-sm`, `rounded-xl`, `rounded-2xl`, `rounded-3xl` — these classes do not exist.

---

### 2.5 Shadow

Shadow-minimal approach. Cards have **no default shadow**.

| Token | Class | Usage |
|-------|-------|-------|
| sm | `shadow-sm` | Buttons (primary, dark), floating icons |
| sm (hover) | `hover:shadow-sm` | **Card hover — the only shadow on cards** |
| lg | `shadow-lg` | Modals, dropdown menus |

> **SHADOW CONTRACT v1.0** — `shadow-md`, `shadow-xl`, `shadow-2xl` are **removed from `tailwind.config.ts`**. Build-time enforcement.

#### Shadow Decision Tree

```
Is it a card?
  └─ Default: no shadow
  └─ Clickable card: add hover:shadow-sm

Is it floating above content?
  └─ Modal / Dropdown: shadow-lg

Is it a primary button?
  └─ shadow-sm (via .btn-primary class)

Everything else:
  └─ No shadow
```

---

## 3. Component Guidelines

### 3.1 Badge (`<Badge>`)

Reusable component for all status indicators, category labels, and metadata tags.

**Import:**
```tsx
import { Badge } from '@/components/Badge'
```

#### Variants

| Variant | Shape | Text Size | Use Case |
|---------|-------|-----------|----------|
| `status` | pill (rounded-full) | 12px (text-xs) | Semantic status: Active, Pending, Error |
| `category` | pill (rounded-full) | 10px (text-micro) | Decorative categories: VIP, Keynote |
| `compact` | tag (rounded) | 10px (text-micro) | Dense UI: card headers, inline cells |
| `tag` | tag (rounded) | 12px (text-xs) | Neutral metadata: Day 1, Currency |

#### Status Colors

| Color | Meaning | Example |
|-------|---------|---------|
| `success` | Positive / confirmed | Active, Paid, Current |
| `warning` | Caution / pending | Pending, Recommended |
| `error` | Negative / failed | Overdue, Revoked |
| `info` | Informational | Ongoing, Used |
| `neutral` | Inactive / default | Draft, Expired, Inactive |
| `primary` | Highlighted / selected | Upcoming, Registered |

#### Removable Badge

Pass `onRemove` to render an X button:

```tsx
<Badge variant="status" color="primary" onRemove={() => remove(id)}>
  English
</Badge>
```

#### DO / DON'T

```tsx
// DO - Use the Badge component
<Badge variant="status" color="success">Active</Badge>
<Badge variant="status" color="warning">Pending</Badge>
<Badge variant="category" color="purple">VIP</Badge>
<Badge variant="tag">Day 1 (Mar 15)</Badge>

// DON'T - Write inline badge markup
<span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
  Active
</span>

// DON'T - Use raw Tailwind colors for status
<span className="bg-green-50 text-green-700 ...">Active</span>

// DON'T - Mix variant styles
<Badge variant="status" color="success" className="text-micro">  {/* Wrong: overriding text size */}
```

---

### 3.2 Table

Tables use CSS classes defined in `globals.css`. No React component — just standard `<table>` with the `.table` class.

#### Standard Markup

```tsx
<div className="card overflow-hidden">
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th className="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-medium text-neutral-950">Item Name</td>
          <td><Badge variant="status" color="success">Active</Badge></td>
          <td className="text-right">{/* action buttons */}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-pagination">
    {/* pagination controls */}
  </div>
</div>
```

#### Auto-Applied Styles

These are applied automatically via `.table` — no extra classes needed:

| Element | Auto Styles |
|---------|------------|
| `<th>` | left-aligned, px-5 py-3, text-xs uppercase, neutral-500 |
| `<thead> <tr>` | bottom border (neutral-100) |
| `<tbody>` | row dividers (neutral-100) |
| `<tbody> <tr>` | hover:bg-neutral-50 |
| `<td>` | px-5 py-4, text-sm |

#### DO / DON'T

```tsx
// DO - Use .table class
<table className="table">

// DON'T - Write inline table utilities
<table className="w-full">
  <thead>
    <tr className="border-b border-neutral-100">
      <th className="text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase">
```

---

### 3.3 Buttons

Buttons use CSS classes defined in `globals.css`. Apply `.btn` base + variant class.

| Class | Appearance | Usage |
|-------|-----------|-------|
| `.btn .btn-primary` | Green filled | Primary CTA |
| `.btn .btn-secondary` | White with border | Cancel, secondary action |
| `.btn .btn-dark` | Black filled | Alternative CTA |
| `.btn .btn-ghost` | Transparent | Tertiary action |
| `.btn .btn-outline-primary` | Green outline | Outlined CTA |

```tsx
// DO
<button className="btn btn-primary">Save Changes</button>
<button className="btn btn-secondary">Cancel</button>

// Icon + text
<button className="btn btn-primary">
  <svg className="w-4 h-4 mr-2">...</svg>
  Add Item
</button>

// Full width
<button className="btn btn-primary w-full py-2.5">Submit</button>

// Disabled
<button className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Saving...
</button>
```

#### Icon-Only Action Buttons

These do NOT use the `.btn` class:

```tsx
// Edit/action icon
<button className="p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors">
  <svg className="w-4 h-4">...</svg>
</button>

// Delete icon
<button className="p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors">
  <svg className="w-4 h-4">...</svg>
</button>
```

---

### 3.4 Form Fields

#### Input / Select / Textarea

```tsx
<label className="label">
  Field Name <span className="text-form-required">*</span>
</label>
<input type="text" className="input" placeholder="Enter value" />
<textarea className="input min-h-[80px]" />
<select className="input">...</select>
```

#### DO / DON'T

```tsx
// DO - Use .input class
<input className="input" />

// DON'T - Write inline input styles
<input className="w-full px-3 py-2 border border-gray-300 rounded-md" />

// DON'T - Use raw gray colors
<input className="border-gray-200 focus:ring-green-500" />
```

---

### 3.5 Cards

```tsx
// Standard card
<div className="card p-5">Content</div>

// Clickable card (hover shadow)
<div className="card p-5 hover:shadow-sm transition-all cursor-pointer">
  Content
</div>

// Muted info panel
<div className="card p-5 bg-neutral-50">Info content</div>
```

#### DO / DON'T

```tsx
// DO
<div className="card p-5">  {/* No default shadow */}

// DON'T - Add shadow to cards
<div className="card p-5 shadow-sm">  {/* Wrong: cards have no default shadow */}
<div className="card p-5 shadow-md">  {/* Wrong: shadow-md removed from config */}

// DON'T - Write inline card styles
<div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
```

---

## 4. Coding Rules

### 4.1 Forbidden Patterns Checklist

Before submitting code, verify none of these patterns exist:

**Radius**
- [ ] No `rounded-sm` (use `rounded` for 4px)
- [ ] No `rounded-xl` (use `rounded-lg` for 8px)
- [ ] No `rounded-2xl` (use `rounded-lg` for 8px)
- [ ] No `rounded-3xl` (use `rounded-lg` for 8px)

**Shadow** (md/xl/2xl removed from config — build-time enforcement)
- [ ] No `shadow-md`, `shadow-xl`, `shadow-2xl` (will not compile)
- [ ] No default shadow on cards

**Typography** (3xl–9xl removed from config — build-time enforcement)
- [ ] No `text-[10px]` (use `text-micro`)
- [ ] No arbitrary font sizes like `text-[13px]`
- [ ] No `text-3xl` or larger in admin pages (removed from config)

**Colors**
- [ ] No raw Tailwind colors (e.g., `bg-blue-500`, `text-red-700`)
- [ ] Exception: decorative category badges with `eslint-disable` comment

**Components**
- [ ] No inline `<span>` badge markup (use `<Badge>` component)
- [ ] No `<table className="w-full">` (use `<table className="table">`)
- [ ] No inline table header/cell utilities (handled by `.table` class)

### 4.2 Quick Substitution Reference

| Forbidden | Replacement |
|-----------|-------------|
| `rounded-sm` | `rounded` (4px) |
| `rounded-xl` | `rounded-lg` (8px) |
| `rounded-2xl` | `rounded-lg` (8px) |
| `rounded-3xl` | `rounded-full` or `rounded-lg` |
| `shadow-md` | **removed** — `shadow-sm` or arbitrary |
| `shadow-xl` | **removed** — `shadow-lg` or arbitrary |
| `shadow-2xl` | **removed** — `shadow-lg` or arbitrary |
| `text-3xl` ~ `text-9xl` | **removed** — use `text-[30px]` etc. |
| `text-[10px]` | `text-micro` |
| `bg-blue-500` | `bg-status-info-solid` or design token |
| `bg-green-50 text-green-700` | `<Badge variant="status" color="success">` |
| `text-red-500` | `text-status-error-solid` or `text-destructive-text` |
| `border-gray-200` | `border-neutral-200` |
| `<table className="w-full">` | `<table className="table">` |

### 4.3 ESLint Enforcement

The `custom/no-raw-tailwind-colors` rule blocks raw Tailwind color classes at lint time.

**When you get an ESLint error:**

```
Error: Raw Tailwind color detected: bg-blue-500
```

**Fix:** Replace with the appropriate design token:

```tsx
// Before (ESLint error)
<div className="bg-blue-500">

// After (correct)
<div className="bg-status-info-solid">
```

**If the color is intentionally decorative** (category badge palette), add an eslint-disable comment:

```tsx
// eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative category palette
const categoryColors = { blue: 'bg-blue-50 text-blue-700', ... }
```

---

## 5. Workflow

### 5.1 New Page Checklist

When creating a new page, follow this sequence:

1. **Layout:** Start with `<div className="space-y-6">` for section spacing
2. **Page header:** `text-2xl font-bold text-neutral-950` (max size in admin)
3. **Cards:** Use `.card p-5` or `.card p-6` — no default shadow
4. **Tables:** `.card overflow-hidden` > `.table-container` > `<table className="table">`
5. **Badges:** Import and use `<Badge>` for all status indicators
6. **Buttons:** `.btn .btn-primary` for CTA, `.btn .btn-secondary` for cancel
7. **Inputs:** `.input` for all form fields, `.label` for labels
8. **Colors:** Only design tokens — no raw Tailwind colors
9. **Radius:** Only `rounded` / `rounded-md` / `rounded-lg` / `rounded-full`
10. **Shadow:** No default shadow on cards; `hover:shadow-sm` on clickable cards

### 5.2 Pre-Commit Hook

The project uses **husky + lint-staged**. On every commit:

1. ESLint runs automatically on staged files
2. If `custom/no-raw-tailwind-colors` finds violations, the commit is **blocked**
3. Fix the violations and commit again

```bash
# If commit is blocked:
# 1. Read the error message to identify the file and line
# 2. Replace the raw color with a design token
# 3. Stage the fix and commit again
git add <fixed-file>
git commit -m "fix: replace raw color with design token"
```

### 5.3 Style Guide Page

A live reference page is available at:

```
http://localhost:3000/workspace/{workspaceId}/style-guide
```

This page shows all tokens, components, and patterns rendered in the browser. Use it to:
- Verify color token rendering
- Check badge variant sizes
- Preview table layout
- Compare radius and shadow values

---

## 6. FAQ

### "Why can't I use `rounded-xl`?"

The radius scale was reduced to 5 values to enforce visual consistency. `rounded-xl` (12px) was removed because the visual difference between 8px (`rounded-lg`) and 12px was negligible, yet having both created inconsistency. If your design shows a radius larger than 8px that isn't a pill shape, use `rounded-lg` (8px).

### "The design shows a shadow on the card, but the code has none?"

Cards have **no default shadow** by design. This is a deliberate "shadow-minimal" approach for a cleaner enterprise aesthetic. Shadows appear only on:
- **Hover:** `hover:shadow-sm` on clickable cards
- **Floating layers:** `shadow-lg` on modals and dropdowns
- **CTA buttons:** `shadow-sm` via `.btn-primary`

If the design comp shows a subtle shadow on a card, it likely represents the hover state or should be adapted to the shadow-minimal standard.

### "What if I need a new color that doesn't exist in the tokens?"

1. **Check if an existing token covers the use case.** Most UI needs are met by the current 6 layers.
2. **If it's a decorative/category color** (e.g., a new badge color), use a raw Tailwind color with an `eslint-disable` comment. Add it to the `categoryColors` map in `Badge.tsx`.
3. **If it's a new semantic layer** (e.g., a new status type), this requires a **COLOR CONTRACT version bump** (v1.0 → v2.0). Discuss with the team lead before proceeding.

### "When should I use `status` vs `category` badge variant?"

- **`status`**: Semantic meaning. The color communicates a specific state (success, error, warning). Example: "Active", "Pending", "Failed".
- **`category`**: Decorative. The color distinguishes categories but doesn't communicate state. Example: "VIP" (purple), "Keynote" (blue), "Workshop" (green).

### "Why does the ESLint rule block `bg-blue-500`?"

Raw Tailwind colors bypass the design token system, making it impossible to update colors globally. Instead of `bg-blue-500`, use a semantic token like `bg-status-info-solid` (which happens to be a similar blue). This way, if the blue changes in the future, only one config value needs updating.

### "How do I add a removable tag/chip?"

Use the Badge component with the `onRemove` prop:

```tsx
<Badge variant="status" color="primary" onRemove={() => handleRemove(id)}>
  {label}
</Badge>
```

The X button, `stopPropagation`, and hover styling are all handled internally by the component.

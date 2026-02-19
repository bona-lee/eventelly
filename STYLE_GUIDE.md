# Eventelly Design System — Style Guide Export

> Extracted from the live `/workspace/designhouse/style-guide` page.
> This document is the machine-readable source of truth for all design tokens and component patterns currently implemented in the Eventelly codebase.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CSS:** Tailwind CSS v3.4.17 (utility-first, no CSS-in-JS)
- **PostCSS:** tailwindcss + autoprefixer
- **Font:** Pretendard (CDN: `cdn.jsdelivr.net/gh/orioncactus/pretendard`)
- **Component library:** None (no shadcn/ui, no Radix, no Headless UI)
- **Theme provider:** None (single light theme, no dark mode)
- **CSS custom properties (--var):** None — all tokens live in `tailwind.config.ts`

---

## 1. Color Architecture

Four-layer color system. Two green scales serve distinct purposes: a muted enterprise green for admin interactive UI, and a vibrant brand green for public-facing surfaces.

```
Layer          Token              Purpose
─────────────  ────────────────   ──────────────────────────────────────────
Admin Primary  admin-primary-*    Admin interactive UI: buttons, focus, selection, toggles.
Brand Primary  brand-primary-*    Public-facing: hero gradients, logos, marketing surfaces.
Neutral        neutral-*          Gray scale. Text, borders, backgrounds.
Semantic       status-success-*   Status: positive / confirmed.  (bg, text, border, solid)
               status-warning-*   Status: caution / pending.     (bg, text, border, solid)
               status-error-*     Status: destructive / failed.  (bg, text, border, solid)
               status-info-*      Status: informational.          (bg, text, border, solid)
Destructive    destructive-*      Delete / danger actions.        (bg, text, hover)
Form           form-required      Required-field asterisk color.
```

`brand-*` is the raw identity scale (same values as `brand-primary-*`).

### 1.1 Admin Primary (Muted Green — Admin Functional)

Enterprise-grade green for all admin interactive states. Anchor: **#178C65** (HSL 160° 72% 32%).

| Token                  | Hex       | Tailwind Class              | Usage                                          |
| ---------------------- | --------- | --------------------------- | ---------------------------------------------- |
| admin-primary.DEFAULT  | `#178C65` | `bg-admin-primary`          | Pagination active page, focus border            |
| admin-primary.50       | `#F0F8F5` | `bg-admin-primary-50`       | Selected item bg, chip selected bg              |
| admin-primary.100      | `#DCEFE8` | `bg-admin-primary-100`      | Dropdown selected bg, light interaction fill    |
| admin-primary.200      | `#B3DBCC` | `border-admin-primary-200`  | Focus border secondary, selected-state ring     |
| admin-primary.300      | `#75C7A9` | `border-admin-primary-300`  | Chip selected border, tab active underline      |
| admin-primary.400      | `#36BA8B` | `bg-admin-primary-400`      | Gradient midpoints (admin context)              |
| admin-primary.500      | `#178C65` | `ring-admin-primary-500`    | **Focus rings on inputs and buttons**           |
| admin-primary.600      | `#107454` | `text-admin-primary-600`    | Toggle on-state, tab active text, checkmark     |
| admin-primary.700      | `#0A5D43` | `bg-admin-primary-700`      | **CTA buttons, active nav text, selected text** |
| admin-primary.800      | `#064632` | `bg-admin-primary-800`      | CTA hover state, gradient depth                 |
| admin-primary.900      | `#043525` | `bg-admin-primary-900`      | Gradient dark ends (admin context)              |

Opacity variants in use: `admin-primary/10` (active nav bg), `admin-primary/90` (compact badges).

### 1.2 Brand Primary (Vibrant Green — Public Surfaces)

Vibrant identity green for public-facing pages only. Anchor: **#28E486**.

| Token                  | Hex       | Tailwind Class              | Usage                                          |
| ---------------------- | --------- | --------------------------- | ---------------------------------------------- |
| brand-primary.DEFAULT  | `#28E486` | `bg-brand-primary`          | Brand highlight fills                           |
| brand-primary.50       | `#E8FBF2` | `bg-brand-primary-50`       | Light gradient endpoints                        |
| brand-primary.100      | `#D1F7E5` | `bg-brand-primary-100`      | Gradient endpoints, light fills                 |
| brand-primary.200      | `#A3EFCB` | `bg-brand-primary-200`      | Decorative text (hero)                          |
| brand-primary.300      | `#75E7B1` | `text-brand-primary-300`    | Hero decorative text                            |
| brand-primary.400      | `#47DF97` | `bg-brand-primary-400`      | Gradient midpoints                              |
| brand-primary.500      | `#28E486` | `bg-brand-primary-500`      | Brand accent fills                              |
| brand-primary.600      | `#1EB86C` | `from-brand-primary-600`    | Hero gradient start                             |
| brand-primary.700      | `#178C65` | `to-brand-primary-700`      | Hero gradient end, logo accent                  |
| brand-primary.800      | `#0B4733` | `to-brand-primary-800`      | Gradient dark end                               |
| brand-primary.900      | `#07231C` | `bg-brand-primary-900`      | Deepest gradient (rare)                         |

**Scope:** Only used in public event pages (`/events/[eventSlug]/*`) and `EventPublicHeader`. Never used in admin UI.

### 1.3 Neutral (Unified Gray Scale)

Single gray system with subtle cool undertone. Sole gray system — no Tailwind default gray in use.

| Token       | Hex       | Tailwind Class      | Usage                                             |
| ----------- | --------- | ------------------- | ------------------------------------------------- |
| neutral.50  | `#F1F7F6` | `bg-neutral-50`     | Body background, hover bg, muted card bg, table header bg |
| neutral.100 | `#E3EDEB` | `bg-neutral-100`    | Card border, dividers, badge bg, toggle off track |
| neutral.200 | `#C9D5D3` | `border-neutral-200`| Input border, secondary borders                   |
| neutral.300 | `#ADBAB7` | `border-neutral-300`| Breadcrumb separator, disabled text, checkbox border |
| neutral.400 | `#8A9895` | `text-neutral-400`  | Placeholder text, muted icons, timestamps         |
| neutral.500 | `#6B7876` | `text-neutral-500`  | Body secondary text, descriptions                 |
| neutral.600 | `#556260` | `text-neutral-600`  | Sidebar nav text, table body text, badge text     |
| neutral.700 | `#414D4B` | `text-neutral-700`  | Hover text, emphasized secondary text             |
| neutral.800 | `#303938` | `text-neutral-800`  | Label text, secondary headings                    |
| neutral.900 | `#212928` | `text-neutral-900`  | Breadcrumb current item                           |
| neutral.950 | `#141B1A` | `text-neutral-950`  | **Primary text color, all headings**              |

### 1.4 Semantic (Status Colors — Tokenized)

Status communication. Each status defines four sub-tokens:

- **bg** — light background fill (badges, alerts, rows)
- **text** — readable label text (badge text, status labels)
- **border** — mid-tone border/outline (alert borders, dividers)
- **solid** — saturated solid fill (dots, progress bars, indicators)

| Status  | Sub-token | Hex       | Tailwind Class               | Usage                            |
| ------- | --------- | --------- | ---------------------------- | -------------------------------- |
| Success | bg        | `#F0FDF4` | `bg-status-success-bg`       | Badge bg, benefit icon bg        |
|         | text      | `#15803D` | `text-status-success-text`   | Badge text ("Active", "Current") |
|         | border    | `#16A34A` | `border-status-success-border`| Alert border, dividers          |
|         | solid     | `#22C55E` | `bg-status-success-solid`    | Live dots, progress bars         |
| Warning | bg        | `#FFFBEB` | `bg-status-warning-bg`       | Badge bg, category pill bg       |
|         | text      | `#B45309` | `text-status-warning-text`   | Badge text                       |
|         | border    | `#D97706` | `border-status-warning-border`| Alert border                    |
|         | solid     | `#F59E0B` | `bg-status-warning-solid`    | Warning indicator dots           |
| Error   | bg        | `#FEF2F2` | `bg-status-error-bg`         | Delete hover bg, error bg        |
|         | text      | `#B91C1C` | `text-status-error-text`     | Error badge text                 |
|         | border    | `#DC2626` | `border-status-error-border` | Error alert border               |
|         | solid     | `#EF4444` | `bg-status-error-solid`      | Error indicator dots             |
| Info    | bg        | `#EFF6FF` | `bg-status-info-bg`          | Badge bg, activity icon bg       |
|         | text      | `#1D4ED8` | `text-status-info-text`      | Badge text                       |
|         | border    | `#2563EB` | `border-status-info-border`  | Info alert border                |
|         | solid     | `#3B82F6` | `bg-status-info-solid`       | Info indicator dots              |

> **Decorative badge colors** (purple, orange, etc.) remain as Tailwind defaults — not tokenized, used per-context only.

#### Decorative badge colors (Tailwind defaults, per-context)

| Color        | bg class          | text class          | Used for                |
| ------------ | ----------------- | ------------------- | ----------------------- |
| Purple       | `bg-purple-50`    | `text-purple-700`   | VIP badge               |
| Orange       | `bg-orange-50`    | `text-orange-700`   | Late/On-site badge      |
| Amber        | `bg-amber-50`     | `text-amber-700`    | Invitation badge        |
| Blue         | `bg-blue-50`      | `text-blue-700`     | General category badge  |
| Green        | `bg-green-50`     | `text-green-700`    | Group category badge    |

### 1.5 Destructive (Delete / Danger Actions)

Interactive delete and danger tokens. Separate from `status-error-*` (which communicates state, not actions).

| Token            | Hex       | Tailwind Class               | Usage                                          |
| ---------------- | --------- | ---------------------------- | ---------------------------------------------- |
| destructive.bg   | `#FEF2F2` | `hover:bg-destructive-bg`    | Hover background on delete icons and buttons   |
| destructive.text | `#DC2626` | `text-destructive-text`      | Delete text/icon color, solid button bg         |
| destructive.hover| `#B91C1C` | `hover:bg-destructive-hover` | Solid button hover, text link hover darkening   |

#### Common patterns

- **Icon-only delete:** `p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors`
- **Simple remove:** `text-neutral-400 hover:text-destructive-text`
- **Text delete button:** `text-destructive-text hover:bg-destructive-bg`
- **Delete link:** `text-destructive-text hover:text-destructive-hover`
- **Solid destructive button:** `bg-destructive-text text-white hover:bg-destructive-hover`
- **Destructive modal icon:** `bg-destructive-bg rounded-full` + `text-destructive-text` icon

> **status-error vs destructive:** `status-error-*` communicates state (validation errors, failed status badges, required indicators). `destructive-*` is for interactive delete/danger actions (buttons, hovers, modals).

### 1.6 Form Required (Asterisk Indicator)

Single flat token for required-field asterisk (`*`) markers.

| Token          | Hex       | Tailwind Class         | Usage                            |
| -------------- | --------- | ---------------------- | -------------------------------- |
| form-required  | `#EF4444` | `text-form-required`   | Required-field `*` in labels     |

#### Pattern

```html
<label className="label">Field Name <span className="text-form-required">*</span></label>
```

> **form-required vs status-error:** `form-required` is only for the `*` asterisk indicator on form labels. Validation error messages and `*Required` text labels use `status-error-*` or raw Tailwind `text-red-500`.

### 1.7 Color Usage Principles

| Principle | Rule |
| --------- | ---- |
| **admin-primary** for admin UI | All admin interactive states: CTA buttons, focus rings, active nav, toggles, selections, tabs, progress bars, checkboxes, links. |
| **brand-primary** for public only | Public event pages, hero gradients, logo accents, marketing surfaces. Never in admin UI. |
| **neutral** for structure | Text, borders, backgrounds, dividers. The sole gray system. |
| **status-\*** for state only | Communicate success/warning/error/info. Never for decoration or branding. |
| **destructive-\*** for delete/danger | Delete buttons, remove hovers, danger modals. Never for status badges or validation errors. |
| **form-required** for asterisks only | Required-field `*` indicator on labels. Not for validation messages or `*Required` text. |

#### Admin UI vs Public Site

| Context | Primary color token | Scope |
| ------- | ------------------- | ----- |
| Admin pages (`/workspace/*`, `/dashboard/*`, `/account/*`) | `admin-primary-*` | All interactive and branded elements |
| Public pages (`/events/[eventSlug]/*`) | `brand-primary-*` | Hero gradients, logo, marketing CTA |
| Public page functional UI (forms, inputs) | `admin-primary-*` | Focus rings, form states (via globals.css classes) |

---

## 2. Typography

### 2.1 Font Family

```
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
```

Loaded via CDN: `@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');`

### 2.2 Font Size Scale (ADMIN TYPOGRAPHY CONTRACT v1.0)

Admin UI max font size: **24px (`text-2xl`)**. Sizes above `text-2xl` are reserved for public pages only.

#### Admin Scale (max 24px)

| Token      | Tailwind Class  | CSS Value         | Usage                                    |
| ---------- | --------------- | ----------------- | ---------------------------------------- |
| micro      | `text-micro`    | 10px / 0.875rem   | Badge/pill text (custom token in config) |
| xs         | `text-xs`       | 12px / 1rem       | Timestamps, helper text, table headers   |
| sm         | `text-sm`       | 14px / 1.25rem    | **Default body text**, nav, buttons, labels |
| base       | `text-base`     | 16px / 1.5rem     | Rarely used explicitly                   |
| lg         | `text-lg`       | 18px / 1.75rem    | Section headings, modal titles           |
| xl         | `text-xl`       | 20px / 1.75rem    | Page titles (secondary)                  |
| 2xl        | `text-2xl`      | 24px / 2rem       | **Page titles (primary) — ADMIN MAX**    |

> **TYPOGRAPHY CONTRACT v1.0** — `text-3xl` through `text-9xl` are **removed from `tailwind.config.ts`**.
> Admin UI maximum: `text-2xl` (24px). Public pages use arbitrary values (`text-[30px]`, `text-[48px]`, etc.) when needed.

#### Public Pages (events/[eventSlug]/*) — Arbitrary Values

| Arbitrary Value  | Effective Size | Usage                      |
| ---------------- | -------------- | -------------------------- |
| `text-[30px]`    | 30px           | Large display text         |
| `text-[36px]`    | 36px           | Hero subtitle              |
| `text-[48px]`    | 48px           | Public event hero text     |
| `text-[60px]`    | 60px           | Public event hero (large)  |

### 2.3 Font Weight Scale

| Token     | Tailwind Class   | CSS Value | Usage                           |
| --------- | ---------------- | --------- | ------------------------------- |
| (normal)  | (default)        | 400       | Body text baseline (implicit)   |
| medium    | `font-medium`    | 500       | Labels, breadcrumb active, nav  |
| semibold  | `font-semibold`  | 600       | Buttons, section headings       |
| bold      | `font-bold`      | 700       | Page titles, prices, stats      |

### 2.4 Line Height & Letter Spacing

| Property        | Tailwind Class     | Usage                        |
| --------------- | ------------------ | ---------------------------- |
| leading-tight   | `leading-tight`    | Card titles (multi-line)     |
| tracking-tight  | `tracking-tight`   | Large headings               |
| tracking-wider  | `tracking-wider`   | Sidebar section labels (uppercase) |

---

## 3. Spacing Scale

Tailwind default scale. Only values actively used in the codebase:

| Token | px   | rem       | Common Usage                              |
| ----- | ---- | --------- | ----------------------------------------- |
| 0.5   | 2px  | 0.125rem  | mt-0.5, py-0.5, space-y-0.5              |
| 1     | 4px  | 0.25rem   | gap-1, mb-1, p-1, mt-1                   |
| 1.5   | 6px  | 0.375rem  | gap-1.5, mb-1.5, space-y-1.5             |
| 2     | 8px  | 0.5rem    | gap-2, p-2, ml-2, mt-2, mb-2             |
| 2.5   | 10px | 0.625rem  | py-2.5, gap-2.5                           |
| 3     | 12px | 0.75rem   | px-3, gap-3, mb-3, mt-3, p-3             |
| 3.5   | 14px | 0.875rem  | px-3.5 (small CTA button)                |
| 4     | 16px | 1rem      | p-4, gap-4, mb-4, mt-4 — **most common** |
| 5     | 20px | 1.25rem   | p-5, gap-5, mb-5, space-y-5              |
| 6     | 24px | 1.5rem    | p-6, gap-6, mb-6 — **page padding**      |
| 8     | 32px | 2rem      | p-8, mb-8, gap-8, mt-8                   |
| 10    | 40px | 2.5rem    | mb-10                                     |
| 12    | 48px | 3rem      | mb-12, mt-12                              |

---

## 4. Border Radius Scale (CONTRACT v1.0)

Custom scale defined in `tailwind.config.ts` — replaces Tailwind defaults. Only these values are permitted:

| Token    | Tailwind Class  | CSS Value | Usage                                        |
| -------- | --------------- | --------- | -------------------------------------------- |
| DEFAULT  | `rounded`       | 4px       | Tags, non-semantic badges                    |
| md       | `rounded-md`    | 6px       | **Interactive: buttons, inputs, nav items, action buttons** |
| lg       | `rounded-lg`    | 8px       | **Containers: cards, modals, dropdowns, panels** |
| full     | `rounded-full`  | 9999px    | Pills: semantic badges, avatars, toggles     |
| none     | `rounded-none`  | 0         | Reset (input groups, edge cases)             |

Removed from scale: `rounded-sm`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`.

### 4.1 Radius Assignment Rules

| Element              | Radius Token | Class          |
| -------------------- | ------------ | -------------- |
| Buttons (`.btn`)     | md (6px)     | via `.btn` class |
| Form inputs (`.input`) | md (6px)   | via `.input` class |
| Nav items, sidebar links | md (6px) | `rounded-md`   |
| Icon-only actions    | md (6px)     | `rounded-md`   |
| Cards (`.card`)      | lg (8px)     | via `.card` class |
| Modals               | lg (8px)     | `rounded-lg`   |
| Dropdown menus       | lg (8px)     | `rounded-lg`   |
| Status badges        | full         | `rounded-full` |
| Tags                 | DEFAULT (4px)| `rounded`      |

---

## 5. Shadow Scale (Minimal)

Shadow-minimal approach: no default shadow on cards; shadow appears only on hover or for floating layers.

| Token      | Tailwind Class     | Usage                                      |
| ---------- | ------------------ | ------------------------------------------ |
| sm         | `shadow-sm`        | Buttons (`.btn-primary`, `.btn-dark`), floating action icons, tab active states |
| sm (hover) | `hover:shadow-sm`  | **Card hover** — the only shadow on cards  |
| lg         | `shadow-lg`        | **Dropdown menus, modals**                 |

### 5.1 Shadow Rules

| Element                    | Default     | Hover           |
| -------------------------- | ----------- | --------------- |
| Cards (`.card`)            | none        | `hover:shadow-sm` (add inline when clickable) |
| Modals                     | `shadow-lg` | —               |
| Dropdown menus             | `shadow-lg` | —               |
| Buttons (primary, dark)    | `shadow-sm` | —               |
| Floating action icons      | `shadow-sm` | —               |
| Tab/toggle active state    | `shadow-sm` | —               |

> **SHADOW CONTRACT v1.0** — `shadow-md`, `shadow-xl`, `shadow-2xl` are **removed from `tailwind.config.ts`**.
> Design system constraints are enforced at build time. Only `shadow-sm` and `shadow-lg` are supported.
> Use arbitrary values (`shadow-[0_4px_6px_rgba(0,0,0,0.1)]`) for exceptions with `eslint-disable` comment.

---

## 6. Component Patterns

### 6.1 Buttons

Defined in `globals.css` `@layer components`.

#### Base class: `.btn`

```css
inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md
transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
```

#### Variants

| Class                 | Background            | Text             | Border                 | Hover                                       |
| --------------------- | --------------------- | ---------------- | ---------------------- | ------------------------------------------- |
| `.btn-primary`        | admin-primary-700     | white            | none                   | bg-admin-primary-800                        |
| `.btn-secondary`      | white                 | neutral-950      | neutral-300            | bg-neutral-50, border-neutral-400           |
| `.btn-dark`           | neutral-950           | white            | none                   | bg-black                                    |
| `.btn-ghost`          | transparent           | neutral-800      | none                   | bg-neutral-100                              |
| `.btn-outline-primary`| transparent           | admin-primary-700| admin-primary-700      | bg-admin-primary-700, text-white            |

All button variants use `focus:ring-admin-primary-500`.

#### Modifier patterns (applied inline)

- **Disabled:** `disabled:opacity-50 disabled:cursor-not-allowed`
- **Full width:** add `w-full py-2.5`
- **With icon:** `<svg class="w-4 h-4 mr-2">` inside button
- **Icon-only action:** `p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors` (no .btn base)
- **Icon-only delete:** `p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors`

### 6.2 Inputs

#### Base class: `.input`

```css
block w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-md text-sm
placeholder-neutral-400 transition-all duration-200
focus:outline-none focus:ring-2 focus:ring-admin-primary-500/20 focus:border-admin-primary
```

Applied to: `<input>`, `<textarea>`, `<select>` uniformly.

#### Label class: `.label`

```css
block text-sm font-medium text-neutral-800 mb-1.5
```

#### Additional input patterns

- **Textarea:** add `min-h-[80px]`
- **Constrained width:** add `max-w-xs`
- **Disabled:** add `disabled:bg-neutral-50 disabled:text-neutral-400`
- **Helper text:** `<p class="text-xs text-neutral-500 mt-1">` below input
- **Checkbox:** `w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500`
- **Radio:** `w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500`

#### Toggle switch (inline pattern, no component class)

```
On:  h-6 w-11 rounded-full bg-admin-primary-600, thumb: h-4 w-4 bg-white translateX(24px)
Off: h-6 w-11 rounded-full bg-neutral-200,        thumb: h-4 w-4 bg-white translateX(4px)
```

### 6.3 Selects

- **Native select:** Uses `.input` class (same as text input)
- **Chip selector (toggle group):**
  - Selected: `px-3 py-2 text-sm rounded-md border bg-admin-primary-50 border-admin-primary-300 text-admin-primary-700`
  - Unselected: `px-3 py-2 text-sm rounded-md border bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300`
- **Custom dropdown:**
  - Trigger: `.input` with flex layout, chevron icon `w-4 h-4 text-neutral-400`
  - Panel: `bg-white rounded-lg shadow-lg border border-neutral-100`
  - Option: `px-4 py-2.5 text-sm text-neutral-800 hover:bg-neutral-50`
  - Selected option: `bg-admin-primary-50` with checkmark icon `text-admin-primary-600`

### 6.4 Cards

#### Base class: `.card`

```css
bg-white rounded-lg border border-neutral-100
```

#### Variants (applied inline)

| Variant      | Additional classes                          | Usage                   |
| ------------ | ------------------------------------------- | ----------------------- |
| Default      | `.card p-5` or `.card p-6`                  | Standard container      |
| Muted        | `.card p-5 bg-neutral-50`                   | Info panels             |
| Hoverable    | `.card hover:shadow-sm transition-all`      | Clickable cards         |
| Disabled     | `.card opacity-60`                          | Inactive items          |
| Divided list | `.card divide-y divide-neutral-50`          | Activity/list cards     |

### 6.5 Tables

Defined in `globals.css` `@layer components`. CSS classes handle structure; wrap in `.card` for the container.

#### CSS Classes

| Class               | Applies to       | Styles                                                                 |
| ------------------- | ---------------- | ---------------------------------------------------------------------- |
| `.table-container`  | wrapper `<div>`  | `overflow-x-auto`                                                      |
| `.table`            | `<table>`        | `w-full`                                                               |
| `.table th`         | `<th>` (auto)    | `text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider` |
| `.table thead tr`   | `<thead> <tr>` (auto) | `border-b border-neutral-100`                                     |
| `.table tbody`      | `<tbody>` (auto) | `divide-y divide-neutral-100`                                          |
| `.table tbody tr`   | `<tbody> <tr>` (auto) | `hover:bg-neutral-50 transition-colors`                           |
| `.table td`         | `<td>` (auto)    | `px-5 py-4 text-sm`                                                   |
| `.table-pagination` | pagination `<div>` | `flex items-center justify-between px-5 py-4 border-t border-neutral-100` |

> **"(auto)"** means the style is applied automatically via nested CSS selectors — no extra class needed on child elements.

#### Standard markup

```tsx
<div className="card overflow-hidden">
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="font-medium text-neutral-950">Item Name</td>
          <td><Badge variant="status" color="success">Active</Badge></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="table-pagination">
    {/* pagination controls */}
  </div>
</div>
```

#### Inline modifiers (applied per-cell or per-row)

- **Name cell:** add `font-medium text-neutral-950`
- **Inactive row:** add `opacity-60` on `<tr>`
- **Right-aligned cell:** add `text-right` on `<th>` / `<td>`
- **Narrow cell:** add `w-[1%] whitespace-nowrap` on `<th>`

#### Pagination controls (inline, no class)

```
Info text:  text-sm text-neutral-500, numbers in font-medium text-neutral-800
Page btn:   min-w-[36px] h-9 px-3 text-sm font-medium rounded-md
Active:     bg-admin-primary text-white
Inactive:   text-neutral-600 hover:bg-neutral-100
Disabled:   text-neutral-300 cursor-not-allowed
Prev/Next:  p-2 rounded-md, icon w-5 h-5
```

### 6.6 Modals

No reusable component — built inline each time.

```
Overlay:    fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4
Container:  bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-lg
            (or max-w-2xl for wider modals)
Header:     flex items-center justify-between px-6 py-4 border-b border-neutral-100
            Title: text-lg font-semibold text-neutral-950
            Close: p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md
Body:       flex-1 overflow-y-auto p-6 space-y-6
Footer:     flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100
            Cancel: .btn .btn-secondary
            Confirm: .btn .btn-primary
```

### 6.7 Badge Component (`<Badge>`)

Reusable component: `src/components/Badge.tsx`

Import: `import { Badge } from '@/components/Badge'`

Four variants, each with a fixed shape & size:

| Variant    | Shape          | Text Size    | Padding          | Use Case                                    |
| ---------- | -------------- | ------------ | ---------------- | ------------------------------------------- |
| `status`   | `rounded-full` | `text-xs`    | `px-2 py-0.5`   | Semantic status: Active, Pending, Cancelled  |
| `category` | `rounded-full` | `text-micro` | `px-2 py-0.5`   | Decorative categories: VIP, Keynote, General |
| `compact`  | `rounded`      | `text-micro` | `px-1.5 py-0.5` | Dense UI: card headers, table cells          |
| `tag`      | `rounded`      | `text-xs`    | `px-2 py-0.5`   | Neutral metadata: Day 1, Currency            |

#### Status colors

| Color     | Background                    | Text                          | Example Labels          |
| --------- | ----------------------------- | ----------------------------- | ----------------------- |
| `success` | `bg-status-success-bg`        | `text-status-success-text`    | Active, Paid, Current   |
| `warning` | `bg-status-warning-bg`        | `text-status-warning-text`    | Pending, Recommended    |
| `error`   | `bg-status-error-bg`          | `text-status-error-text`      | Overdue, Revoked, Required |
| `info`    | `bg-status-info-bg`           | `text-status-info-text`       | Ongoing, Used, Has Data |
| `neutral` | `bg-neutral-100`              | `text-neutral-600`            | Inactive, Draft, Expired |
| `primary` | `bg-admin-primary-50`         | `text-admin-primary-700`      | Upcoming, Registered    |

#### Compact colors (extends status + extras)

All status colors above, plus:

| Color          | Background              | Text           | Example Labels   |
| -------------- | ----------------------- | -------------- | ---------------- |
| `primary-solid`| `bg-admin-primary/90`   | `text-white`   | Upcoming         |
| `dark`         | `bg-neutral-800`        | `text-white`   | Completed        |

#### Category colors (decorative — raw Tailwind)

| Color     | Background        | Text              | Example Labels       |
| --------- | ----------------- | ----------------- | -------------------- |
| `blue`    | `bg-blue-50`      | `text-blue-700`   | General, Admin       |
| `purple`  | `bg-purple-50`    | `text-purple-700` | VIP, Keynote         |
| `green`   | `bg-green-50`     | `text-green-700`  | Group, Workshop      |
| `amber`   | `bg-amber-50`     | `text-amber-700`  | Invitation Only      |
| `orange`  | `bg-orange-50`    | `text-orange-700` | Late/On-site, Exhibitor |
| `red`     | `bg-red-50`       | `text-red-700`    | Cancelled            |
| `pink`    | `bg-pink-50`      | `text-pink-700`   | Networking           |
| `neutral` | `bg-neutral-100`  | `text-neutral-700` | Free                |

#### Tag variant

Single neutral style, no `color` prop needed:

```tsx
<Badge variant="tag">Day 1 (Mar 15)</Badge>
```

#### Removable badges (`onRemove` prop)

Any variant supports an optional `onRemove` callback. When provided, an X button is rendered after children. The button calls `e.stopPropagation()` automatically to prevent parent click handlers from firing.

```tsx
<Badge variant="status" color="primary" onRemove={() => removeLanguage(code)}>
  {languageName}
</Badge>
```

#### Usage examples

```tsx
{/* Semantic status */}
<Badge variant="status" color="success">Active</Badge>
<Badge variant="status" color="warning">Pending</Badge>
<Badge variant="status" color="error">Overdue</Badge>

{/* Decorative categories */}
<Badge variant="category" color="purple">VIP</Badge>
<Badge variant="category" color="blue">General</Badge>

{/* Dense inline context */}
<Badge variant="compact" color="primary-solid">Upcoming</Badge>
<Badge variant="compact" color="neutral">Draft</Badge>

{/* Neutral metadata tags */}
<Badge variant="tag">Day 1 (Mar 15)</Badge>

{/* Removable chip */}
<Badge variant="status" color="primary" onRemove={() => remove(id)}>English</Badge>
<Badge variant="status" color="neutral" onRemove={() => remove(id)}>Tag Name</Badge>
```

---

## 7. Layout Patterns

### Navigation sidebar

```
Container: w-60 bg-white border-r border-neutral-100 fixed left-0 top-14 bottom-0
Active item: bg-admin-primary/10 text-admin-primary-700 font-medium
Inactive item: text-neutral-600 hover:bg-neutral-50
Section header: text-xs font-medium text-neutral-400 uppercase tracking-wider
Sub-menu indent: ml-5 border-l border-neutral-200 pl-3
```

### Breadcrumbs

```
Container: flex items-center gap-2 text-sm text-neutral-500
Separator: text-neutral-300 "/"
Current:   text-neutral-900 font-medium
```

### Page header

```
Title: text-2xl font-bold text-neutral-950  (or text-xl font-bold)
Description: mt-1 text-sm text-neutral-500
Section title: text-lg font-semibold text-neutral-950
Card title: text-sm font-semibold text-neutral-950
```

### Tab navigation

```
Container: border-b border-neutral-200 mb-5, nav flex gap-6
Tab button: pb-3 text-sm font-medium border-b-2 transition-colors
Active:     border-admin-primary-600 text-admin-primary-700
Inactive:   border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300
```

---

## 8. Icon System

- All icons are **inline SVGs** (Heroicons outline style)
- `stroke="currentColor"`, `strokeWidth={2}`, `strokeLinecap="round"`, `strokeLinejoin="round"`
- Standard sizes: `w-3 h-3`, `w-4 h-4`, `w-5 h-5`, `w-12 h-12`
- No icon library package installed

---

## 9. Transitions & Animations

| Class                          | Usage                |
| ------------------------------ | -------------------- |
| `transition-colors`            | Nav items, buttons, badges |
| `transition-all duration-200`  | Cards, buttons       |
| `transition-all duration-300 ease-out` | Mode toggle slider |
| `transition-transform`         | Toggle switch thumb  |

---

## 10. Global CSS (complete source)

File: `src/app/globals.css`

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-neutral-50 text-neutral-950 antialiased font-sans;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  .btn-primary {
    @apply bg-admin-primary-700 text-white hover:bg-admin-primary-800 focus:ring-admin-primary-500 shadow-sm;
  }
  .btn-secondary {
    @apply bg-white text-neutral-950 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 focus:ring-admin-primary-500;
  }
  .btn-dark {
    @apply bg-neutral-950 text-white hover:bg-black focus:ring-admin-primary-500 shadow-sm;
  }
  .btn-ghost {
    @apply bg-transparent text-neutral-800 hover:bg-neutral-100 focus:ring-admin-primary-500;
  }
  .btn-outline-primary {
    @apply bg-transparent text-admin-primary-700 border border-admin-primary-700 hover:bg-admin-primary-700 hover:text-white focus:ring-admin-primary-500;
  }
  .input {
    @apply block w-full px-3 py-2.5 bg-white border border-neutral-200 rounded-md text-sm placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-admin-primary-500/20 focus:border-admin-primary;
  }
  .label {
    @apply block text-sm font-medium text-neutral-800 mb-1.5;
  }
  .card {
    @apply bg-white rounded-lg border border-neutral-100;
  }
  .table-container {
    @apply overflow-x-auto;
  }
  .table {
    @apply w-full;
  }
  .table th {
    @apply text-left px-5 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider;
  }
  .table thead tr {
    @apply border-b border-neutral-100;
  }
  .table tbody {
    @apply divide-y divide-neutral-100;
  }
  .table tbody tr {
    @apply hover:bg-neutral-50 transition-colors;
  }
  .table td {
    @apply px-5 py-4 text-sm;
  }
  .table-pagination {
    @apply flex items-center justify-between px-5 py-4 border-t border-neutral-100;
  }
}
```

---

## 11. Tailwind Config (summary)

File: `tailwind.config.ts`

See the actual file for full source. Key structure:

```typescript
const brand = { /* #28E486 vibrant green identity scale, 50–900 */ }
const adminPrimary = { /* #178C65 muted enterprise green scale, 50–900 */ }

// SHADOW CONTRACT v1.0 — replaces Tailwind defaults (md, xl, 2xl removed)
boxShadow: {
  DEFAULT: '...',         // Base shadow
  sm:      '...',         // Buttons, card hover, toggles
  lg:      '...',         // Modals, dropdowns
  none:    '0 0 #0000',   // Reset
},

// TYPOGRAPHY CONTRACT v1.0 — replaces Tailwind defaults (3xl–9xl removed)
fontSize: {
  micro: ['0.625rem', ...],  // 10px — badge/pill
  xs ~ 2xl: Tailwind defaults preserved,
  // 3xl–9xl: REMOVED. Use arbitrary values for public pages.
},

// RADIUS CONTRACT v1.0 — replaces Tailwind defaults (sm, xl, 2xl, 3xl removed)
borderRadius: {
  none:    '0',           // Reset
  DEFAULT: '0.25rem',     // 4px  — tags
  md:      '0.375rem',    // 6px  — interactive (buttons, inputs)
  lg:      '0.5rem',      // 8px  — containers (cards, modals)
  full:    '9999px',      //      — pills, avatars
},

colors: {
  'admin-primary': adminPrimary,   // Admin interactive UI
  'brand-primary': brand,          // Public-facing surfaces
  brand,                           // Raw identity scale (same values)
  neutral: { 50–950 },            // Unified gray scale
  'status-success': { bg, text, border, solid },
  'status-warning': { bg, text, border, solid },
  'status-error':   { bg, text, border, solid },
  'status-info':    { bg, text, border, solid },
  destructive:      { bg, text, hover },       // Delete / danger actions
  'form-required':  '#EF4444',                 // Required-field asterisk
}
```

---

## 12. COLOR CONTRACT v1.0

The following color token groups are the **only** permitted color abstractions in the codebase. Raw Tailwind color defaults (e.g. `bg-blue-500`, `text-red-700`) are forbidden except for intentionally decorative usages (category badges, avatar palettes, gradients) which must carry an `eslint-disable` comment.

### Allowed token groups

| Token group | Purpose | Sub-tokens |
|-------------|---------|------------|
| `admin-primary-*` | Admin interactive UI: buttons, focus, selection, toggles | 50–900 scale + DEFAULT |
| `brand-primary-*` | Public-facing surfaces: hero gradients, logos, marketing CTA | 50–900 scale + DEFAULT |
| `neutral-*` | Gray scale: text, borders, backgrounds, dividers | 50–950 |
| `status-success-*` | Status: positive / confirmed | bg, text, border, solid |
| `status-warning-*` | Status: caution / pending | bg, text, border, solid |
| `status-error-*` | Status: destructive / failed | bg, text, border, solid |
| `status-info-*` | Status: informational | bg, text, border, solid |
| `destructive-*` | Delete / danger actions | bg, text, hover |
| `form-required` | Required-field asterisk indicator | flat token |

`brand-*` is an alias of `brand-primary-*` (same values) for raw identity scale usage.

### Enforcement

- **ESLint rule:** `custom/no-raw-tailwind-colors` flags any raw Tailwind color utility at lint time.
- **Pre-commit hook:** husky + lint-staged blocks commits containing violations.
- **Decorative exceptions:** Array literals, whitelisted object properties (`color`, `gradient`, `iconBg`, `iconColor`), and whitelisted files (`style-guide/page.tsx`, `auth/login/page.tsx`) are automatically exempt. All other decorative usages require an explicit `eslint-disable` comment.

### Version policy

No additional color token groups may be introduced without incrementing the contract version (v1.0 → v2.0). Changes that require a version bump:

- Adding a new token group to `tailwind.config.ts`
- Removing or renaming an existing token group
- Changing the sub-token structure (e.g. adding a fifth sub-token to `status-*`)

Changes that do **not** require a version bump:

- Adjusting hex values within an existing group
- Adding shades to an existing scale (e.g. `admin-primary-925`)
- Updating decorative Tailwind defaults (category badges, avatar palettes)

---

## 13. Known Issues & Gaps

| #  | Issue                                      | Detail                                                     | Status      |
| -- | ------------------------------------------ | ---------------------------------------------------------- | ----------- |
| 1  | Status badges migrated to `status-*` tokens| `green-*` → `status-success-*`, `amber-*` warning panels → `status-warning-*`. Category badges remain Tailwind defaults intentionally. | Resolved    |
| 2  | `text-[10px]` is an arbitrary value        | Formalized as `text-micro` token in `tailwind.config.ts`    | Resolved    |
| 3  | No reusable modal component                | Modal markup duplicated across pages                        | Open        |
| 4  | No reusable toggle/switch component        | Rebuilt inline each time with slight size differences        | Open        |
| 5  | No reusable badge component                | `<Badge>` component created with 4 variants (status, category, compact, tag). All inline badge patterns migrated. | Resolved    |
| 6  | No table component or class                | CSS classes `.table`, `.table-container`, `.table-pagination` created in globals.css. All 21 tables across 17 files migrated. | Resolved    |
| 7  | No dark mode support                       | Single light theme only                                     | Open        |
| 8  | No CSS custom properties                   | Limits dynamic theming                                      | Open        |
| 9  | `secondary-lime` migrated                  | Public event live indicator now uses `brand-primary`        | Resolved    |

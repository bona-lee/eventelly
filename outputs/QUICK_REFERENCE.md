# Eventelly Design System — Quick Reference

> 1-page cheat sheet. Keep this open while coding.

---

## Color Tokens (allowed groups only)

| Layer | Token | Usage |
|-------|-------|-------|
| Admin Primary | `admin-primary-{50-900}` | Buttons, focus rings, selection, toggles |
| Brand Primary | `brand-primary-{50-900}` | Public pages only (hero, logo, CTA) |
| Neutral | `neutral-{50-950}` | Text, borders, backgrounds |
| Status | `status-{success,warning,error,info}-{bg,text,border,solid}` | State communication |
| Destructive | `destructive-{bg,text,hover}` | Delete / danger actions |
| Form | `form-required` | Required-field asterisk `*` |

**Raw Tailwind colors (bg-blue-500, text-red-700) are FORBIDDEN** except with `eslint-disable` comment.

---

## Typography (Admin max: 24px)

| Class | Size | Usage |
|-------|------|-------|
| `text-micro` | 10px | Badge/pill text |
| `text-xs` | 12px | Timestamps, helpers, table headers |
| `text-sm` | 14px | **Default body**, nav, buttons, labels |
| `text-lg` | 18px | Section headings, modal titles |
| `text-xl` | 20px | Secondary page titles |
| `text-2xl` | 24px | **Page titles (ADMIN MAX)** |

`text-3xl` ~ `text-9xl` = **removed from config**. Public pages use arbitrary values (`text-[30px]`).

---

## Radius (custom scale — only these exist)

| Class | Size | Use For |
|-------|------|---------|
| `rounded` | 4px | Tags |
| `rounded-md` | 6px | **Buttons, inputs, nav items** |
| `rounded-lg` | 8px | **Cards, modals, dropdowns** |
| `rounded-full` | pill | Badges, avatars, toggles |

~~`rounded-sm`~~ ~~`rounded-xl`~~ ~~`rounded-2xl`~~ ~~`rounded-3xl`~~ = removed

---

## Shadow (minimal)

| Rule | Shadow |
|------|--------|
| Cards (default) | **none** |
| Cards (clickable) | `hover:shadow-sm` |
| Modals & dropdowns | `shadow-lg` |
| Primary buttons | `shadow-sm` (via .btn-primary) |

`shadow-md`, `shadow-xl`, `shadow-2xl` = **removed from config**. Use arbitrary values for exceptions.

---

## Components

### Badge

```tsx
import { Badge } from '@/components/Badge'

<Badge variant="status" color="success">Active</Badge>
<Badge variant="status" color="warning">Pending</Badge>
<Badge variant="status" color="error">Overdue</Badge>
<Badge variant="status" color="neutral">Inactive</Badge>
<Badge variant="category" color="purple">VIP</Badge>
<Badge variant="compact" color="primary-solid">Upcoming</Badge>
<Badge variant="tag">Day 1</Badge>
<Badge variant="status" color="primary" onRemove={() => remove(id)}>English</Badge>
```

### Table

```tsx
<div className="card overflow-hidden">
  <div className="table-container">
    <table className="table">       {/* th, td auto-styled */}
      <thead><tr><th>Name</th><th>Status</th></tr></thead>
      <tbody><tr>
        <td className="font-medium text-neutral-950">Item</td>
        <td><Badge variant="status" color="success">Active</Badge></td>
      </tr></tbody>
    </table>
  </div>
  <div className="table-pagination">{/* controls */}</div>
</div>
```

### Buttons

```tsx
<button className="btn btn-primary">Save</button>
<button className="btn btn-secondary">Cancel</button>
<button className="btn btn-dark">Export</button>
<button className="btn btn-ghost">More</button>
<button className="btn btn-outline-primary">Invite</button>
```

### Form Fields

```tsx
<label className="label">Name <span className="text-form-required">*</span></label>
<input className="input" />
<select className="input">...</select>
<textarea className="input min-h-[80px]" />
```

### Cards

```tsx
<div className="card p-5">Standard</div>
<div className="card p-5 hover:shadow-sm transition-all">Clickable</div>
<div className="card p-5 bg-neutral-50">Muted</div>
```

---

## Forbidden → Replacement

| Forbidden | Use Instead |
|-----------|-------------|
| `rounded-sm` | `rounded` |
| `rounded-xl` | `rounded-lg` |
| `rounded-2xl` | `rounded-lg` |
| `shadow-md` | **removed** — `shadow-sm` or arbitrary |
| `shadow-xl` | **removed** — `shadow-lg` or arbitrary |
| `text-3xl` ~ `text-9xl` | **removed** — use `text-[30px]` etc. |
| `text-[10px]` | `text-micro` |
| `bg-blue-500` | design token |
| `bg-green-50 text-green-700` (inline) | `<Badge variant="status" color="success">` |
| `<table className="w-full">` | `<table className="table">` |
| inline th/td utilities | auto via `.table` class |
| card with `shadow-sm` | card without shadow |

---

## New Page Checklist

- [ ] Page title: `text-2xl font-bold text-neutral-950`
- [ ] Cards: `.card p-5` (no shadow)
- [ ] Tables: `.table` class, wrapped in `.card overflow-hidden`
- [ ] Badges: `<Badge>` component, no inline spans
- [ ] Buttons: `.btn .btn-*` classes
- [ ] Inputs: `.input` class
- [ ] Colors: design tokens only
- [ ] Radius: `rounded-md` (interactive) / `rounded-lg` (containers)
- [ ] Shadow: none by default
- [ ] Admin max font: `text-2xl` (24px)

---

## Style Guide Page

```
localhost:3000/workspace/{id}/style-guide
```

import type { Config } from 'tailwindcss'

// ── COLOR CONTRACT v1.0 ─────────────────────────────────────────────
//
// Only these color groups are allowed.
// Adding new groups requires version upgrade.
//
//  Layer        Token              Purpose
//  ─────────    ────────────────   ─────────────────────────────────────
//  Admin        admin-primary-*    Admin functional UI: focus, selection, toggles.
//  Brand CTA    brand-primary-*    Brand CTA: buttons, badges, gradients. (#28E486 scale)
//  Brand        brand-*            Identity scale. Marketing, public pages.
//  Neutral      neutral-*          Gray scale. Text, borders, backgrounds.
//  Semantic     status-success     Status: positive / confirmed.  (bg, text, border, solid)
//               status-warning     Status: caution / pending.    (bg, text, border, solid)
//               status-error       Status: destructive / failed.  (bg, text, border, solid)
//               status-info        Status: informational.         (bg, text, border, solid)
//  Destructive  destructive-*      Delete / danger actions.        (bg, text, hover)
//  Form         form-required      Required-field asterisk color.
//
// ─────────────────────────────────────────────────────────────────────

const brand = {
  DEFAULT: '#28E486',
  50:  '#E8FBF2',
  100: '#D1F7E5',
  200: '#A3EFCB',
  300: '#75E7B1',
  400: '#47DF97',
  500: '#28E486',
  600: '#1EB86C',
  700: '#178C65',
  800: '#0B4733',
  900: '#07231C',
}

const adminPrimary = {
  DEFAULT: '#178C65',
  50:  '#F0F8F5',   //  HSL 158°  36%  96%
  100: '#DCEFE8',   //  HSL 158°  37%  90%
  200: '#B3DBCC',   //  HSL 158°  36%  78%
  300: '#75C7A9',   //  HSL 158°  42%  62%
  400: '#36BA8B',   //  HSL 159°  55%  47%
  500: '#178C65',   //  HSL 160°  72%  32%  ← anchor
  600: '#107454',   //  HSL 161°  76%  26%  ← AA text
  700: '#0A5D43',   //  HSL 161°  81%  20%  ← AA text
  800: '#064632',   //  HSL 161°  84%  15%  — hover depth
  900: '#043525',   //  HSL 160°  86%  11%  — gradient ends
}

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {

    // ── SHADOW CONTRACT v1.0 ───────────────────────────────────────────
    //
    // Replaces Tailwind defaults. Only these values are permitted:
    //
    //   Token     Tailwind Class   Scope
    //   ────────  ───────────────  ────────────────────────────────
    //   DEFAULT   shadow           Base shadow (Tailwind default)
    //   sm        shadow-sm        Buttons, card hover, toggles
    //   lg        shadow-lg        Modals, dropdowns, floating panels
    //
    // Removed from scale: md, xl, 2xl
    // Use arbitrary values (shadow-[...]) for exceptions.
    // ───────────────────────────────────────────────────────────────────
    boxShadow: {
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      sm:      '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      lg:      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      none:    '0 0 #0000',
    },

    // ── RADIUS CONTRACT v1.0 ──────────────────────────────────────────
    //
    // Replaces Tailwind defaults. Only these values are permitted:
    //
    //   Token     Size      Tailwind Class   Scope
    //   ────────  ────────  ───────────────  ────────────────────────────
    //   none      0         rounded-none     Reset (input groups)
    //   DEFAULT   4px       rounded          Tags, non-semantic badges
    //   md        6px       rounded-md       Interactive: buttons, inputs, nav items
    //   lg        8px       rounded-lg       Containers: cards, modals, dropdowns
    //   full      9999px    rounded-full     Pills: semantic badges, avatars, toggles
    //
    // Removed from scale: sm, xl, 2xl, 3xl
    // ───────────────────────────────────────────────────────────────────
    borderRadius: {
      none:    '0',
      DEFAULT: '0.25rem',   // 4px  — tags
      md:      '0.375rem',  // 6px  — interactive
      lg:      '0.5rem',    // 8px  — containers
      full:    '9999px',    //      — pills, avatars
    },

    // ── TYPOGRAPHY CONTRACT v1.0 ─────────────────────────────────────
    //
    // Replaces Tailwind defaults. Only these sizes are permitted:
    //
    //   Token    Size       Tailwind Class   Scope
    //   ───────  ─────────  ───────────────  ────────────────────────────
    //   micro    10px       text-micro       Badge/pill text
    //   xs       12px       text-xs          Timestamps, helpers, table headers
    //   sm       14px       text-sm          Default body, buttons, labels, nav
    //   base     16px       text-base        Rarely used in admin
    //   lg       18px       text-lg          Section headings, modal titles
    //   xl       20px       text-xl          Secondary page titles
    //   2xl      24px       text-2xl         Page titles — ADMIN MAX
    //
    // Removed from scale: 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
    // Public pages use arbitrary values (text-[30px]) when needed.
    // ─────────────────────────────────────────────────────────────────
    fontSize: {
      micro: ['0.625rem', { lineHeight: '0.875rem' }],   // 10px
      xs:    ['0.75rem',  { lineHeight: '1rem' }],        // 12px
      sm:    ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
      base:  ['1rem',     { lineHeight: '1.5rem' }],      // 16px
      lg:    ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
      xl:    ['1.25rem',  { lineHeight: '1.75rem' }],     // 20px
      '2xl': ['1.5rem',   { lineHeight: '2rem' }],        // 24px
    },

    extend: {
      colors: {

        // ── Admin Primary Layer ───────────────────────────────────
        // Canonical token: admin-primary-*
        //
        // Muted, enterprise-grade green for all admin interactive
        // states: buttons, focus rings, links, selection, toggles.
        //
        'admin-primary': adminPrimary,

        // ── Brand Layer ───────────────────────────────────────────
        // Vibrant identity green (#28E486 anchor).
        //   brand-*         Raw identity scale. Marketing, public pages.
        //   brand-primary-* CTA buttons, avatar badges, gradients.
        // Both share the brand const above.
        brand,
        'brand-primary': brand,

        // ── Neutral Layer ─────────────────────────────────────────
        // Unified gray scale with subtle cool undertone.
        // Sole gray system — no Tailwind default gray in use.
        neutral: {
          50:  '#F1F7F6',
          100: '#E3EDEB',
          200: '#C9D5D3',
          300: '#ADBAB7',
          400: '#8A9895',
          500: '#6B7876',
          600: '#556260',
          700: '#414D4B',
          800: '#303938',
          900: '#212928',
          950: '#141B1A',
        },

        // ── Semantic Layer ────────────────────────────────────────
        // Status communication tokens. Each defines four roles:
        //   bg     → light background fill   (badges, alerts, rows)
        //   text   → readable label text     (badge text, status labels)
        //   border → mid-tone border/outline (alert borders, dividers)
        //   solid  → saturated solid fill    (dots, progress bars, indicators)
        //
        // Usage:  bg-status-success-bg      text-status-success-text
        //         border-status-error-border bg-status-warning-solid
        'status-success': {
          bg:     '#F0FDF4',   // green-50
          text:   '#15803D',   // green-700
          border: '#16A34A',   // green-600
          solid:  '#22C55E',   // green-500
        },
        'status-warning': {
          bg:     '#FFFBEB',   // amber-50
          text:   '#B45309',   // amber-700
          border: '#D97706',   // amber-600
          solid:  '#F59E0B',   // amber-500
        },
        'status-error': {
          bg:     '#FEF2F2',   // red-50
          text:   '#B91C1C',   // red-700
          border: '#DC2626',   // red-600
          solid:  '#EF4444',   // red-500
        },
        'status-info': {
          bg:     '#EFF6FF',   // blue-50
          text:   '#1D4ED8',   // blue-700
          border: '#2563EB',   // blue-600
          solid:  '#3B82F6',   // blue-500
        },

        // ── Destructive Layer ───────────────────────────────────────
        // Interactive delete / danger actions. NOT for status-error.
        //   bg    → hover background on delete icons and buttons
        //   text  → text/icon color for destructive actions
        //   hover → darkened state for solid buttons and links
        //
        // Usage:  hover:bg-destructive-bg  hover:text-destructive-text
        //         bg-destructive-text text-white hover:bg-destructive-hover
        destructive: {
          bg:    '#FEF2F2',   // red-50   — hover fill
          text:  '#DC2626',   // red-600  — delete text / icon
          hover: '#B91C1C',   // red-700  — solid button hover
        },

        // ── Form Layer ──────────────────────────────────────────────────
        // Required-field asterisk indicator color.
        // Single flat token — no scale needed.
        //
        // Usage:  <span className="text-form-required">*</span>
        'form-required': '#EF4444',   // red-500
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config

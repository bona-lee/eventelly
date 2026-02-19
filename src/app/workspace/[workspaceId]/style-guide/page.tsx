'use client'

import { useState } from 'react'
import { Badge } from '@/components/Badge'

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-lg font-semibold text-neutral-950 mb-5 pb-3 border-b border-neutral-200">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, bg, textClass }: { name: string; bg: string; textClass?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-12 h-12 rounded-md border border-neutral-200 ${bg}`} />
      <span className={`text-xs ${textClass ?? 'text-neutral-600'}`}>{name}</span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// NAV (table of contents)
// ---------------------------------------------------------------------------
const TOC = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'selects', label: 'Selects' },
  { id: 'tables', label: 'Tables' },
  { id: 'cards', label: 'Cards' },
  { id: 'modals', label: 'Modals' },
  { id: 'badges', label: 'Status Badges' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Border Radius' },
  { id: 'shadows', label: 'Shadows' },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function StyleGuidePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Style Guide</h1>
        <p className="mt-1 text-sm text-neutral-500">Visual reference of every token and component pattern currently in use.</p>
      </div>

      {/* TOC */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-md hover:border-neutral-300 hover:text-neutral-700 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* ================================================================= */}
      {/*  1. COLORS                                                        */}
      {/* ================================================================= */}
      <Section id="colors" title="1. Color Palette">
        {/* Primary */}
        <h3 className="text-sm font-semibold text-neutral-950 mb-3">Primary</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <Swatch name="50" bg="bg-admin-primary-50" />
          <Swatch name="100" bg="bg-admin-primary-100" />
          <Swatch name="200" bg="bg-admin-primary-200" />
          <Swatch name="300" bg="bg-admin-primary-300" />
          <Swatch name="400" bg="bg-admin-primary-400" />
          <Swatch name="500" bg="bg-admin-primary-500" />
          <Swatch name="600" bg="bg-admin-primary-600" />
          <Swatch name="700" bg="bg-admin-primary-700" />
          <Swatch name="800" bg="bg-admin-primary-800" />
          <Swatch name="900" bg="bg-admin-primary-900" />
        </div>

        {/* Neutral (custom) */}
        <h3 className="text-sm font-semibold text-neutral-950 mb-3">Neutral (Custom)</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <Swatch name="light" bg="bg-neutral-50" />
          <Swatch name="DEFAULT" bg="bg-neutral" />
          <Swatch name="dark" bg="bg-neutral-800" />
          <Swatch name="darker" bg="bg-neutral-950" />
        </div>

        {/* Gray scale */}
        <h3 className="text-sm font-semibold text-neutral-950 mb-3">Gray Scale</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          <Swatch name="50" bg="bg-neutral-50" />
          <Swatch name="100" bg="bg-neutral-100" />
          <Swatch name="200" bg="bg-neutral-200" />
          <Swatch name="300" bg="bg-neutral-300" />
          <Swatch name="400" bg="bg-neutral-400" />
          <Swatch name="500" bg="bg-neutral-500" />
          <Swatch name="600" bg="bg-neutral-600" />
          <Swatch name="700" bg="bg-neutral-700" />
          <Swatch name="800" bg="bg-neutral-800" />
          <Swatch name="900" bg="bg-neutral-900" />
        </div>

        {/* Semantic */}
        <h3 className="text-sm font-semibold text-neutral-950 mb-3">Semantic (Ad-hoc)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Success</p>
            <div className="flex gap-2">
              <Swatch name="bg" bg="bg-status-success-bg" />
              <Swatch name="border" bg="bg-status-success-border" />
              <Swatch name="text" bg="bg-status-success-text" />
              <Swatch name="solid" bg="bg-status-success-solid" />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Warning</p>
            <div className="flex gap-2">
              <Swatch name="bg" bg="bg-status-warning-bg" />
              <Swatch name="border" bg="bg-status-warning-border" />
              <Swatch name="text" bg="bg-status-warning-text" />
              <Swatch name="solid" bg="bg-status-warning-solid" />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Error</p>
            <div className="flex gap-2">
              <Swatch name="bg" bg="bg-status-error-bg" />
              <Swatch name="border" bg="bg-status-error-border" />
              <Swatch name="text" bg="bg-status-error-text" />
              <Swatch name="solid" bg="bg-status-error-solid" />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-500 mb-2">Info</p>
            <div className="flex gap-2">
              <Swatch name="bg" bg="bg-status-info-bg" />
              <Swatch name="border" bg="bg-status-info-border" />
              <Swatch name="text" bg="bg-status-info-text" />
              <Swatch name="solid" bg="bg-status-info-solid" />
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  2. TYPOGRAPHY                                                     */}
      {/* ================================================================= */}
      <Section id="typography" title="2. Typography Scale">
        <p className="text-sm text-neutral-500 mb-4">Font: Pretendard (sans-serif)</p>
        <div className="card p-6 space-y-5">
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-micro</span>
            <span className="text-micro text-neutral-950">Micro badge text &mdash; 10px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-xs</span>
            <span className="text-xs text-neutral-950">Timestamps, helper text &mdash; 12px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-sm</span>
            <span className="text-sm text-neutral-950">Default body text, nav items, buttons &mdash; 14px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-base</span>
            <span className="text-base text-neutral-950">Base size (rare) &mdash; 16px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-lg</span>
            <span className="text-lg text-neutral-950">Section headings, modal titles &mdash; 18px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-xl</span>
            <span className="text-xl text-neutral-950">Page titles (secondary) &mdash; 20px</span>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="w-20 text-xs text-neutral-400 flex-shrink-0">text-2xl</span>
            <span className="text-2xl font-bold text-neutral-950">Page titles (primary) &mdash; 24px</span>
          </div>
          <div className="border-t border-neutral-100 pt-5 space-y-3">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Public pages only (arbitrary values)</p>
            <p className="text-sm text-neutral-500">text-[30px], text-[36px], text-[48px], text-[60px] — use arbitrary values for public hero text. Removed from Tailwind config.</p>
          </div>

          <div className="border-t border-neutral-100 pt-5 space-y-3">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Weights</p>
            <p className="text-sm font-medium text-neutral-950">font-medium (500) &mdash; Labels, breadcrumb active</p>
            <p className="text-sm font-semibold text-neutral-950">font-semibold (600) &mdash; Buttons, section headings</p>
            <p className="text-sm font-bold text-neutral-950">font-bold (700) &mdash; Page titles, prices</p>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  3. BUTTONS                                                        */}
      {/* ================================================================= */}
      <Section id="buttons" title="3. Buttons">
        <div className="card p-6 space-y-6">
          {/* Row: all variants */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Variants</p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-dark">Dark</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-outline-primary">Outline Primary</button>
            </div>
          </div>

          {/* Row: with icon */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">With Icon</p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Item
              </button>
              <button className="btn btn-secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>
          </div>

          {/* Row: disabled */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Disabled</p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled>Primary Disabled</button>
              <button className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed" disabled>Secondary Disabled</button>
            </div>
          </div>

          {/* Row: full width */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Full Width</p>
            <button className="btn btn-primary w-full py-2.5">Full Width Primary</button>
          </div>

          {/* Row: icon-only */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Icon-only Actions</p>
            <div className="flex items-center gap-2">
              <button className="p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button className="p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  4. INPUTS                                                         */}
      {/* ================================================================= */}
      <Section id="inputs" title="4. Inputs">
        <div className="card p-6 space-y-6 max-w-2xl">
          {/* Text */}
          <div>
            <label className="label">Text Input</label>
            <input type="text" className="input" placeholder="Placeholder text" />
          </div>

          {/* With value */}
          <div>
            <label className="label">With Value</label>
            <input type="text" className="input" defaultValue="Seoul Living Design Fair 2026" />
          </div>

          {/* Disabled */}
          <div>
            <label className="label">Disabled</label>
            <input type="text" className="input disabled:bg-neutral-50 disabled:text-neutral-400" disabled defaultValue="Cannot edit" />
          </div>

          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="you@example.com" />
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Enter your password" />
          </div>

          {/* Number */}
          <div>
            <label className="label">Number</label>
            <input type="number" className="input max-w-xs" placeholder="0" min="0" />
            <p className="text-xs text-neutral-500 mt-1">Helper text goes here</p>
          </div>

          {/* Date */}
          <div>
            <label className="label">Date</label>
            <input type="date" className="input max-w-xs" />
          </div>

          {/* Datetime-local */}
          <div>
            <label className="label">Datetime-local</label>
            <input type="datetime-local" className="input max-w-xs" />
          </div>

          {/* Textarea */}
          <div>
            <label className="label">Textarea</label>
            <textarea className="input min-h-[80px]" placeholder="Brief description..." />
          </div>

          {/* Checkbox */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Checkbox</p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500" />
              <div>
                <span className="text-sm font-medium text-neutral-950">Checked option</span>
                <p className="text-xs text-neutral-500">Description text</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer mt-3">
              <input type="checkbox" className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500" />
              <div>
                <span className="text-sm font-medium text-neutral-950">Unchecked option</span>
                <p className="text-xs text-neutral-500">Description text</p>
              </div>
            </label>
          </div>

          {/* Radio */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Radio</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="demo-radio" defaultChecked className="w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500" />
                <span className="text-sm text-neutral-950">Option A</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="demo-radio" className="w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500" />
                <span className="text-sm text-neutral-950">Option B</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="demo-radio" className="w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500" />
                <span className="text-sm text-neutral-950">Option C</span>
              </label>
            </div>
          </div>

          {/* Toggle */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Toggle Switch</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-admin-primary-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white" style={{ transform: 'translateX(24px)' }} />
                </div>
                <span className="text-sm text-neutral-950">On</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white" style={{ transform: 'translateX(4px)' }} />
                </div>
                <span className="text-sm text-neutral-950">Off</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  5. SELECTS                                                        */}
      {/* ================================================================= */}
      <Section id="selects" title="5. Selects">
        <div className="card p-6 space-y-6 max-w-2xl">
          {/* Native select */}
          <div>
            <label className="label">Native Select</label>
            <select className="input">
              <option value="">Choose an option...</option>
              <option value="a">General Admission</option>
              <option value="b">VIP</option>
              <option value="c">Group</option>
            </select>
          </div>

          {/* Constrained width */}
          <div>
            <label className="label">Constrained Width</label>
            <select className="input max-w-xs">
              <option value="KRW">KRW (&#8361;)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (&euro;)</option>
            </select>
          </div>

          {/* Chip-style selector (used for ticket selectors / day toggles) */}
          <div>
            <label className="label">Chip Selector (toggle pattern)</label>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-2 text-sm rounded-md border bg-admin-primary-50 border-admin-primary-300 text-admin-primary-700 transition-colors">
                Day 1 (Mar 15)
              </button>
              <button className="px-3 py-2 text-sm rounded-md border bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 transition-colors">
                Day 2 (Mar 16)
              </button>
              <button className="px-3 py-2 text-sm rounded-md border bg-admin-primary-50 border-admin-primary-300 text-admin-primary-700 transition-colors">
                Day 3 (Mar 17)
              </button>
              <button className="px-3 py-2 text-sm rounded-md border bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300 transition-colors">
                Day 4 (Mar 18)
              </button>
            </div>
          </div>

          {/* Custom dropdown (pattern from tickets page) */}
          <div>
            <label className="label">Custom Dropdown (open state)</label>
            <div className="relative">
              <button type="button" className="w-full input text-left flex items-center justify-between pr-4">
                <span className="text-neutral-950">General Admission</span>
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                <div className="py-1">
                  <button className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-admin-primary-50 transition-colors">
                    <span className="text-sm text-neutral-800">General Admission</span>
                    <svg className="w-4 h-4 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors">
                    <span className="text-sm text-neutral-800">VIP</span>
                  </button>
                  <button className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors">
                    <span className="text-sm text-neutral-800">Group</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  6. TABLES                                                         */}
      {/* ================================================================= */}
      <Section id="tables" title="6. Tables">
        <p className="text-sm text-neutral-500 mb-4">No dedicated table class exists. Pattern uses card + utility classes.</p>
        <div className="card overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Category</th>
                <th className="text-right">Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium text-neutral-950">General Admission</td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-status-success-bg text-status-success-text">Active</span></td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-blue-50 text-blue-700">General</span></td>
                <td className="text-right text-neutral-950">&#8361;15,000</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="font-medium text-neutral-950">VIP Pass</td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-status-success-bg text-status-success-text">Active</span></td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-purple-50 text-purple-700">VIP</span></td>
                <td className="text-right text-neutral-950">&#8361;50,000</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="opacity-60">
                <td className="font-medium text-neutral-950">Early Access (Expired)</td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-neutral-100 text-neutral-600">Inactive</span></td>
                <td><span className="inline-flex px-2 py-0.5 text-micro font-medium rounded-full bg-amber-50 text-amber-700">Invitation</span></td>
                <td className="text-right text-neutral-950">&#8361;0</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                    <button className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/* Pagination bar */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-neutral-100">
            <div className="text-sm text-neutral-500">
              Showing <span className="font-medium text-neutral-800">1</span> to <span className="font-medium text-neutral-800">3</span> of <span className="font-medium text-neutral-800">3</span> results
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md text-neutral-300 cursor-not-allowed">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="min-w-[36px] h-9 px-3 text-sm font-medium rounded-md bg-admin-primary text-white">1</button>
              <button className="min-w-[36px] h-9 px-3 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100">2</button>
              <button className="min-w-[36px] h-9 px-3 text-sm font-medium rounded-md text-neutral-600 hover:bg-neutral-100">3</button>
              <button className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  7. CARDS                                                          */}
      {/* ================================================================= */}
      <Section id="cards" title="7. Cards">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Default */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Default (.card)</p>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-neutral-950 mb-2">Card Title</h3>
              <p className="text-sm text-neutral-500">Default card with bg-white, rounded-lg, border-neutral-100, shadow-sm.</p>
            </div>
          </div>

          {/* Muted */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Muted (.card bg-neutral-50)</p>
            <div className="card p-5 bg-neutral-50">
              <h3 className="text-sm font-semibold text-neutral-950 mb-2">Muted Card</h3>
              <p className="text-sm text-neutral-500">Used for info panels and secondary sections.</p>
            </div>
          </div>

          {/* Hover */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Hoverable</p>
            <div className="card p-5 hover:shadow-sm transition-all duration-200 cursor-pointer">
              <h3 className="text-sm font-semibold text-neutral-950 mb-2">Hoverable Card</h3>
              <p className="text-sm text-neutral-500">Hover to see shadow-sm elevation.</p>
            </div>
          </div>

          {/* Disabled */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Disabled (opacity-60)</p>
            <div className="card p-5 opacity-60">
              <h3 className="text-sm font-semibold text-neutral-950 mb-2">Disabled Card</h3>
              <p className="text-sm text-neutral-500">Reduced opacity for inactive items.</p>
            </div>
          </div>

          {/* Divided list */}
          <div className="lg:col-span-2">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Divided List</p>
            <div className="card divide-y divide-neutral-50">
              {['Item one description', 'Item two description', 'Item three description'].map((text, i) => (
                <div key={i} className="p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-md bg-admin-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-800">{text}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Timestamp</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  8. MODALS                                                         */}
      {/* ================================================================= */}
      <Section id="modals" title="8. Modals">
        <button onClick={() => setModalOpen(true)} className="btn btn-primary">
          Open Sample Modal
        </button>
        <p className="text-xs text-neutral-500 mt-2">Pattern: fixed overlay + bg-white rounded-lg shadow-lg, header/body/footer structure.</p>

        {modalOpen && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <h2 className="text-lg font-semibold text-neutral-950">Modal Title</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <label className="label">Field Label</label>
                  <input type="text" className="input" placeholder="Enter value..." />
                </div>
                <div>
                  <label className="label">Another Field</label>
                  <textarea className="input min-h-[80px]" placeholder="Description..." />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
                <button onClick={() => setModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button onClick={() => setModalOpen(false)} className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* ================================================================= */}
      {/*  9. STATUS BADGES                                                  */}
      {/* ================================================================= */}
      <Section id="badges" title="9. Status Badges">
        <div className="card p-6 space-y-6">
          {/* Status badges (rounded-full, text-xs) */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Status Badges (rounded-full, text-xs)</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="status" color="success">Active</Badge>
              <Badge variant="status" color="success">Current</Badge>
              <Badge variant="status" color="warning">Pending</Badge>
              <Badge variant="status" color="error">Overdue</Badge>
              <Badge variant="status" color="info">Ongoing</Badge>
              <Badge variant="status" color="neutral">Inactive</Badge>
              <Badge variant="status" color="neutral">Draft</Badge>
              <Badge variant="status" color="primary">Upcoming</Badge>
            </div>
          </div>

          {/* Category badges (rounded-full, text-micro) */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Category Badges (rounded-full, text-micro)</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="category" color="blue">General</Badge>
              <Badge variant="category" color="purple">VIP</Badge>
              <Badge variant="category" color="green">Group</Badge>
              <Badge variant="category" color="amber">Invitation Only</Badge>
              <Badge variant="category" color="orange">Late/On-site</Badge>
              <Badge variant="category" color="red">Cancelled</Badge>
              <Badge variant="category" color="pink">Networking</Badge>
              <Badge variant="category" color="neutral">Free</Badge>
            </div>
          </div>

          {/* Compact badges (rounded) */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Compact Badges (rounded, text-micro)</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="compact" color="primary-solid">Upcoming</Badge>
              <Badge variant="compact" color="neutral">Draft</Badge>
              <Badge variant="compact" color="dark">Completed</Badge>
            </div>
          </div>

          {/* Tag-style (rounded, text-xs) */}
          <div>
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Tags (rounded, text-xs)</p>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="tag">Day 1 (Mar 15)</Badge>
              <Badge variant="tag">Day 2 (Mar 16)</Badge>
              <Badge variant="tag">Day 3 (Mar 17)</Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  10. SPACING                                                       */}
      {/* ================================================================= */}
      <Section id="spacing" title="10. Spacing Scale">
        <p className="text-sm text-neutral-500 mb-4">Tailwind default scale. Values actively used in the codebase.</p>
        <div className="card p-6">
          <div className="space-y-3">
            {[
              { token: '0.5', px: '2px', rem: '0.125rem' },
              { token: '1', px: '4px', rem: '0.25rem' },
              { token: '1.5', px: '6px', rem: '0.375rem' },
              { token: '2', px: '8px', rem: '0.5rem' },
              { token: '2.5', px: '10px', rem: '0.625rem' },
              { token: '3', px: '12px', rem: '0.75rem' },
              { token: '3.5', px: '14px', rem: '0.875rem' },
              { token: '4', px: '16px', rem: '1rem' },
              { token: '5', px: '20px', rem: '1.25rem' },
              { token: '6', px: '24px', rem: '1.5rem' },
              { token: '8', px: '32px', rem: '2rem' },
              { token: '10', px: '40px', rem: '2.5rem' },
              { token: '12', px: '48px', rem: '3rem' },
            ].map((s) => (
              <div key={s.token} className="flex items-center gap-4">
                <span className="w-12 text-xs text-neutral-400 text-right flex-shrink-0">{s.token}</span>
                <div className="bg-admin-primary-500 rounded" style={{ width: `${parseInt(s.px)}px`, height: '20px', minWidth: '2px' }} />
                <span className="text-xs text-neutral-500">{s.px} ({s.rem})</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  11. BORDER RADIUS                                                 */}
      {/* ================================================================= */}
      <Section id="radius" title="11. Border Radius">
        <div className="card p-6">
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'rounded', value: '4px', cls: 'rounded' },
              { name: 'rounded-md', value: '6px', cls: 'rounded-md' },
              { name: 'rounded-lg', value: '8px', cls: 'rounded-lg' },
              { name: 'rounded-full', value: '9999px', cls: 'rounded-full' },
            ].map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-admin-primary-100 border-2 border-admin-primary-500 ${r.cls}`} />
                <span className="text-xs font-medium text-neutral-950">{r.name}</span>
                <span className="text-xs text-neutral-400">{r.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-100">
            <p className="text-xs text-neutral-500">
              <span className="font-medium text-neutral-800">Convention:</span>{' '}
              rounded 4px (tags) &middot; rounded-md 6px (buttons, inputs, nav items) &middot; rounded-lg 8px (cards, modals, dropdowns) &middot; rounded-full (toggles, pills)
            </p>
          </div>
        </div>
      </Section>

      {/* ================================================================= */}
      {/*  12. SHADOWS                                                       */}
      {/* ================================================================= */}
      <Section id="shadows" title="12. Shadows">
        <div className="card p-6">
          <div className="flex flex-wrap gap-6">
            {[
              { name: 'shadow-sm', usage: 'Buttons, card hover', cls: 'shadow-sm' },
              { name: 'shadow-lg', usage: 'Modals, dropdowns', cls: 'shadow-lg' },
            ].map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-2">
                <div className={`w-24 h-16 bg-white rounded-lg border border-neutral-100 ${s.cls}`} />
                <span className="text-xs font-medium text-neutral-950">{s.name}</span>
                <span className="text-xs text-neutral-400 text-center">{s.usage}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

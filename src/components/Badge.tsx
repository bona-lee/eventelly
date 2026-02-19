import { type ReactNode } from 'react'

// ── STATUS (semantic) ──────────────────────────────────────────────
// Uses design-system status tokens.  Pill shape.
const statusColors = {
  success: 'bg-status-success-bg text-status-success-text',
  warning: 'bg-status-warning-bg text-status-warning-text',
  error:   'bg-status-error-bg text-status-error-text',
  info:    'bg-status-info-bg text-status-info-text',
  neutral: 'bg-neutral-100 text-neutral-600',
  primary: 'bg-admin-primary-50 text-admin-primary-700',
} as const

// ── COMPACT ────────────────────────────────────────────────────────
// Dense contexts: card headers, inline table cells.  Tag shape.
const compactColors = {
  'primary-solid': 'bg-admin-primary/90 text-white',
  neutral:         'bg-neutral-100 text-neutral-600',
  dark:            'bg-neutral-800 text-white',
  success:         'bg-status-success-bg text-status-success-text',
  warning:         'bg-status-warning-bg text-status-warning-text',
  error:           'bg-status-error-bg text-status-error-text',
  info:            'bg-status-info-bg text-status-info-text',
  primary:         'bg-admin-primary-50 text-admin-primary-700',
} as const

// ── CATEGORY (decorative) ──────────────────────────────────────────
// Raw Tailwind palette for user-defined categories.  Pill shape.
// eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative category palette
const categoryColors = {
  blue:    'bg-blue-50 text-blue-700',
  purple:  'bg-purple-50 text-purple-700',
  green:   'bg-green-50 text-green-700',
  amber:   'bg-amber-50 text-amber-700',
  orange:  'bg-orange-50 text-orange-700',
  red:     'bg-red-50 text-red-700',
  pink:    'bg-pink-50 text-pink-700',
  neutral: 'bg-neutral-100 text-neutral-700',
} as const

// ── Types ──────────────────────────────────────────────────────────
export type StatusColor   = keyof typeof statusColors
export type CompactColor  = keyof typeof compactColors
export type CategoryColor = keyof typeof categoryColors

type BadgeProps = {
  children: ReactNode
  className?: string
  onRemove?: () => void
} & (
  | { variant: 'status';   color: StatusColor }
  | { variant: 'compact';  color: CompactColor }
  | { variant: 'category'; color: CategoryColor }
  | { variant: 'tag' }
)

// ── Component ──────────────────────────────────────────────────────
export function Badge(props: BadgeProps) {
  const { children, className = '', onRemove } = props

  let base: string
  let color: string

  switch (props.variant) {
    case 'status':
      base  = 'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full'
      color = statusColors[props.color]
      break
    case 'compact':
      base  = 'inline-flex items-center px-1.5 py-0.5 text-micro font-medium rounded'
      color = compactColors[props.color]
      break
    case 'category':
      base  = 'inline-flex items-center px-2 py-0.5 text-micro font-medium rounded-full'
      color = categoryColors[props.color]
      break
    case 'tag':
      base  = 'inline-flex items-center px-2 py-0.5 text-xs rounded'
      color = 'bg-neutral-100 text-neutral-600'
      break
  }

  return (
    <span className={`${base}${onRemove ? ' gap-1' : ''} ${color}${className ? ` ${className}` : ''}`}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

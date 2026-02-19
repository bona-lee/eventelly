'use client'

import { usePathname } from 'next/navigation'

// Workspace-level segment → label mapping (ia.md based)
const workspaceLabels: Record<string, string> = {
  events: 'Events',
  series: 'Event Series',
  users: 'Users',
  'signup-forms': 'Signup Forms',
  companies: 'Companies',
  terms: 'Terms & Policies',
  team: 'Team',
  members: 'Members',
  groups: 'Groups',
  roles: 'Roles',
  settings: 'Settings',
  'data-fields': 'Data Fields',
  localization: 'Localization',
  billing: 'Billing',
  usage: 'Usage',
  methods: 'Payment Methods',
  history: 'Billing History',
}

// Event-level segment → label mapping (ia.md based)
const eventLabels: Record<string, string> = {
  // Operations sections
  participants: 'Participants',
  individuals: 'Individuals',
  marketing: 'Marketing',
  leads: 'Lead Management',
  newsletter: 'Newsletter Subscribers',
  registration: 'Registration',
  registrations: 'Registrations',
  tickets: 'Tickets',
  orders: 'Orders',
  'access-codes': 'Access Codes',
  inventory: 'Inventory',
  exhibition: 'Exhibition',
  exhibitors: 'Exhibitors',
  applications: 'Applications',
  booths: 'Booths',
  services: 'Exhibitor Services',
  profiles: 'Company Profiles',
  products: 'Products',
  invoicing: 'Invoicing',
  issue: 'Issue Invoices',
  records: 'Invoice Records',
  meetings: 'Meetings',
  scheduling: 'Scheduling',
  availability: 'Availability Management',
  auto: 'Auto Matching',
  manual: 'Manual Matching',
  results: 'Matching Results',
  schedule: 'Schedule',
  waiting: 'Waiting List',
  'consultation-reports': 'Consultation Reports',
  'extra-forms': 'Extra Forms',
  submissions: 'Submissions',

  // Settings sections
  main: 'Main Settings',
  sessions: 'Sessions',
  forms: 'Forms & Terms',
  communication: 'Communication',
  templates: 'Templates',
  scheduled: 'Scheduled Sends',
  design: 'Design',
  theme: 'Theme',
  pages: 'Pages',
  sitemap: 'Sitemap',
  'platform-theme': 'Platform Theme',
  reports: 'Reports',
  statistics: 'Statistics',
  overview: 'Overview',
  exhibitions: 'Exhibitions',
  analytics: 'Analytics',
  data: 'Data Analytics',
}

// Contextual "all" labels
const contextualAllLabels: Record<string, string> = {
  participants: 'All Participants',
  registrations: 'All Registrations',
  submissions: 'All Submissions',
  users: 'All Users',
  events: 'All Events',
}

// Segments to skip in Event breadcrumbs (operations/settings mode indicators)
const eventSkipSegments = new Set(['operations', 'settings'])

function resolveLabel(segment: string, isEvent: boolean, parentSegment?: string): string {
  if (segment === 'all' && parentSegment) {
    return contextualAllLabels[parentSegment] ?? 'All'
  }

  const labels = isEvent ? eventLabels : workspaceLabels
  return labels[segment] ?? workspaceLabels[segment] ?? formatSegment(segment)
}

function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

interface BreadcrumbProps {
  workspaceId: string
  eventId?: string
}

export default function Breadcrumb({ workspaceId, eventId }: BreadcrumbProps) {
  const pathname = usePathname()

  const isEvent = !!eventId
  const base = isEvent
    ? `/workspace/${workspaceId}/event/${eventId}`
    : `/workspace/${workspaceId}`

  // Extract segments after the base path
  const remaining = pathname.slice(base.length).replace(/^\//, '')
  const allSegments = remaining ? remaining.split('/') : []

  // Don't render on root pages (workspace home / event overview)
  if (allSegments.length === 0) return null

  // For event level, skip "operations" and "settings" segments
  const segments = isEvent
    ? allSegments.filter((seg) => !eventSkipSegments.has(seg))
    : allSegments

  if (segments.length === 0) return null

  // Build label list
  const items: string[] = []
  for (let i = 0; i < segments.length; i++) {
    const parentSeg = i > 0 ? segments[i - 1] : undefined
    items.push(resolveLabel(segments[i], isEvent, parentSeg))
  }

  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((label, idx) => {
          const isLast = idx === items.length - 1
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <span className="text-neutral-400 select-none">/</span>
              )}
              <span className={isLast ? 'font-semibold text-neutral-900' : 'text-neutral-500'}>
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

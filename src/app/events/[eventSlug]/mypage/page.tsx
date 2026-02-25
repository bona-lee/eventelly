'use client'

import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { Badge } from '@/components/Badge'

interface Company {
  id: string
  name: string
  country: string
}

interface Notice {
  id: string
  title: string
  date: string
  category: 'general' | 'important' | 'update'
  content: string
}

const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Pre-registration is now open',
    date: '2026.02.20',
    category: 'important',
    content: 'Pre-registration for Seoul Living Design Fair 2026 is now open. Register early to receive your entry QR code and skip the on-site registration queue. Pre-registered visitors will also receive exclusive access to the opening ceremony on March 25.',
  },
  {
    id: '2',
    title: 'Exhibitor booth assignment update',
    date: '2026.02.18',
    category: 'update',
    content: 'Booth assignments for Hall A and Hall B have been finalized. Exhibitors can view their assigned booth numbers in the Exhibitor section. If you have any questions about your booth location, please contact the event operations team.',
  },
  {
    id: '3',
    title: 'Event hours and venue information',
    date: '2026.02.15',
    category: 'general',
    content: 'The fair will be held at COEX Hall A & B from March 25 (Wed) to March 29 (Sun). Opening hours are 10:00–18:00, with the last day closing at 17:00. Free parking is available for pre-registered visitors.',
  },
  {
    id: '4',
    title: 'New exhibitor categories added',
    date: '2026.02.10',
    category: 'update',
    content: 'We have added new exhibitor categories including Smart Home, Sustainable Living, and Outdoor Living. Browse the updated exhibitor list to discover new brands and products.',
  },
  {
    id: '5',
    title: 'Member-only seminars announced',
    date: '2026.02.05',
    category: 'important',
    content: 'Exclusive seminars for registered members have been announced. Topics include "Future of Living Design", "Sustainable Materials in Interior Design", and "Smart Home Integration". Seats are limited — register through My Page.',
  },
]

const MOCK_COMPANIES: Record<number, Company[]> = {
  0: [],
  1: [{ id: '1', name: 'Design House Co.', country: 'South Korea' }],
  2: [
    { id: '1', name: 'Design House Co.', country: 'South Korea' },
    { id: '2', name: 'Nordic Interior', country: 'Sweden' },
  ],
}

const sidebarItems = [
  { label: 'Dashboard', href: '', icon: 'dashboard' },
  { label: 'My Profile', href: '/profile', icon: 'profile' },
  { label: 'Notices', href: '/notices', icon: 'notices' },
]

export default function MyPage() {
  const params = useParams()
  const pathname = usePathname()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  // Dev toggle for company count preview
  const [companyPreset, setCompanyPreset] = useState<0 | 1 | 2>(2)
  const companies = MOCK_COMPANIES[companyPreset]

  const [expandedNotice, setExpandedNotice] = useState<string | null>(null)

  // Determine active sidebar section
  const activeSection = pathname.endsWith('/profile')
    ? '/profile'
    : pathname.endsWith('/notices')
      ? '/notices'
      : ''

  const categoryColors: Record<Notice['category'], 'primary' | 'error' | 'info'> = {
    general: 'info',
    important: 'error',
    update: 'primary',
  }

  const categoryLabels: Record<Notice['category'], string> = {
    general: 'General',
    important: 'Important',
    update: 'Update',
  }

  const SidebarIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'dashboard':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
        )
      case 'profile':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        )
      case 'notices':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-56 flex-shrink-0 hidden md:block">
            <div className="card sticky top-24 overflow-hidden">
              {/* Sidebar Header */}
              <div className="px-4 py-3 border-b border-neutral-100">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">My Page</p>
              </div>
              {/* Sidebar Nav */}
              <nav className="p-2">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.label}
                    href={`${basePath}/mypage${item.href}`}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      activeSection === item.href
                        ? 'text-admin-primary-700 bg-admin-primary-50'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                    }`}
                  >
                    <SidebarIcon type={item.icon} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-neutral-950">My Page</h2>
            </div>

            {/* Profile Card */}
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-neutral-950">My Info</h2>
                <button type="button" className="btn btn-ghost text-xs">
                  Edit
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-4 py-2 border-b border-neutral-100">
                  <span className="text-xs text-neutral-400 w-20 flex-shrink-0">Name</span>
                  <span className="text-sm text-neutral-950">John Doe</span>
                </div>
                <div className="flex items-center gap-4 py-2 border-b border-neutral-100">
                  <span className="text-xs text-neutral-400 w-20 flex-shrink-0">Email</span>
                  <span className="text-sm text-neutral-950">hong@example.com</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <span className="text-xs text-neutral-400 w-20 flex-shrink-0">Phone</span>
                  <span className="text-sm text-neutral-950">010-1234-5678</span>
                </div>
              </div>
            </div>

            {/* My Company Card */}
            <div className="card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-neutral-950">My Company</h2>
                {/* Dev preview toggle */}
                <select
                  value={companyPreset}
                  onChange={(e) => setCompanyPreset(Number(e.target.value) as 0 | 1 | 2)}
                  className="text-xs border border-dashed border-neutral-300 rounded px-2 py-1 text-neutral-500 bg-neutral-50 cursor-pointer"
                >
                  <option value={0}>0 Companies</option>
                  <option value={1}>1 Company</option>
                  <option value={2}>2 Companies</option>
                </select>
              </div>

              {companies.length === 0 ? (
                /* State 1: No company */
                <div className="text-center py-6">
                  <svg className="w-10 h-10 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                  <p className="text-sm text-neutral-500 mb-4">You are not affiliated with any company.</p>
                  <Link href={`${basePath}/mypage/company-search`} className="btn btn-primary">
                    Find Company
                  </Link>
                </div>
              ) : companies.length === 1 ? (
                /* State 2: Single company */
                <div>
                  <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 py-1">
                        <span className="text-xs text-neutral-400 w-20 flex-shrink-0">Company</span>
                        <span className="text-sm font-medium text-neutral-950">{companies[0].name}</span>
                      </div>
                      <div className="flex items-center gap-4 py-1">
                        <span className="text-xs text-neutral-400 w-20 flex-shrink-0">Country</span>
                        <span className="text-sm text-neutral-950">{companies[0].country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <button type="button" className="text-neutral-500 hover:text-neutral-700 transition-colors">Edit Profile</button>
                      <span className="text-neutral-300">&middot;</span>
                      <button type="button" className="text-neutral-500 hover:text-destructive-text transition-colors">Leave Company</button>
                    </div>
                    <Link href={`${basePath}/mypage/company-search`} className="btn btn-secondary text-xs px-3 py-1.5">
                      Find Company
                    </Link>
                  </div>
                </div>
              ) : (
                /* State 3: Multiple companies */
                <div>
                  <div className="space-y-3 mb-4">
                    {companies.map((company, index) => (
                      <div key={company.id} className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-neutral-950">{company.name}</span>
                            {index === 0 && (
                              <Badge variant="compact" color="primary">Default</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-neutral-500 mb-3">{company.country}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <button type="button" className="text-neutral-500 hover:text-neutral-700 transition-colors">Edit Profile</button>
                          <span className="text-neutral-300">&middot;</span>
                          <button type="button" className="text-neutral-500 hover:text-destructive-text transition-colors">Leave Company</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href={`${basePath}/mypage/company-search`} className="btn btn-secondary w-full">
                    Find Company
                  </Link>
                </div>
              )}
            </div>

            {/* Notices Board */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-neutral-950">Notices</h2>
                <span className="text-xs text-neutral-400">{MOCK_NOTICES.length} notices</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {MOCK_NOTICES.map((notice) => (
                  <div key={notice.id} className="py-3 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      className="w-full text-left group"
                      onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="compact" color={categoryColors[notice.category]}>
                              {categoryLabels[notice.category]}
                            </Badge>
                            <span className="text-xs text-neutral-400">{notice.date}</span>
                          </div>
                          <p className="text-sm font-medium text-neutral-950 group-hover:text-admin-primary-700 transition-colors truncate">
                            {notice.title}
                          </p>
                        </div>
                        <svg
                          className={`w-4 h-4 text-neutral-400 flex-shrink-0 mt-1 transition-transform ${
                            expandedNotice === notice.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {expandedNotice === notice.id && (
                      <div className="mt-3 pl-0 sm:pl-2">
                        <div className="bg-neutral-50 rounded-lg p-4">
                          <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">
                            {notice.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

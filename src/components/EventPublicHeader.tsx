'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { label: 'Overview', href: '' },
  { label: 'Exhibitor', href: '/exhibitor' },
  { label: 'Attendee', href: '/attendee' },
  { label: 'Notice', href: '/notice' },
]

export default function EventPublicHeader({ eventSlug }: { eventSlug: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const basePath = `/events/${eventSlug}`
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auth state: true when on /mypage routes (simulates logged-in user viewing their page)
  // In production, replace with actual auth check
  const isAuthenticated = pathname.includes('/mypage')

  const isActive = (href: string) => {
    if (href === '') return pathname === basePath || pathname === `${basePath}/`
    return pathname.startsWith(`${basePath}${href}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Event Name */}
          <Link href={basePath} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-brand-primary-500 to-brand-primary-700 flex items-center justify-center">
              <span className="text-white text-sm font-bold">E</span>
            </div>
            <span className="text-sm font-semibold text-neutral-950 hidden sm:block">
              SLDF 2026
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={`${basePath}${item.href}`}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-admin-primary-700 bg-admin-primary-50'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href={`${basePath}/mypage`}
                  className="btn btn-ghost text-sm"
                >
                  <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  My Page
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    // TODO: Implement actual sign-out logic
                    router.push(`${basePath}/signin`)
                  }}
                  className="btn btn-ghost text-sm text-neutral-500"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href={`${basePath}/signin`}
                className="btn btn-primary text-sm"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-neutral-500 hover:bg-neutral-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={`${basePath}${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'text-admin-primary-700 bg-admin-primary-50'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

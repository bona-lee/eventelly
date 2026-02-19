'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes } from '@/lib/routes'

const tabs = [
  { label: 'Profile', href: routes.account.profile() },
  { label: 'Password', href: routes.account.password() },
  { label: 'Email Preferences', href: routes.account.emailPreferences() },
]

export default function AccountSettingsTabs() {
  const pathname = usePathname()

  return (
    <div className="border-b border-neutral-200">
      <nav className="-mb-px flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`whitespace-nowrap border-b-2 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-admin-primary text-admin-primary-700'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes, routeSegments } from '@/lib/routes'

interface WorkspaceLevelNavProps {
  workspaceId: string
}

export default function WorkspaceLevelNav({ workspaceId }: WorkspaceLevelNavProps) {
  const pathname = usePathname()
  const ws = routes.workspace(workspaceId)

  const [expandedMenus, setExpandedMenus] = useState({
    events: true,
    users: true,
    team: false,
    settings: false,
    billing: false,
  })

  const toggleMenu = (menu: keyof typeof expandedMenus) => {
    setExpandedMenus((prev) => ({ ...prev, [menu]: !prev[menu] }))
  }

  const isActiveRoute = (section: string) => {
    if (section === 'home') {
      return pathname === ws.root() || pathname === `${ws.root()}/`
    }
    return pathname.includes(`${ws.root()}/${section}`)
  }

  const isExactRoute = (route: string) => {
    return pathname === route || pathname === `${route}/`
  }

  useEffect(() => {
    if (pathname.includes(routeSegments.events)) setExpandedMenus((prev) => ({ ...prev, events: true }))
    if (pathname.includes(routeSegments.users)) setExpandedMenus((prev) => ({ ...prev, users: true }))
    if (pathname.includes(routeSegments.team)) setExpandedMenus((prev) => ({ ...prev, team: true }))
    if (pathname.includes(routeSegments.settings)) setExpandedMenus((prev) => ({ ...prev, settings: true }))
    if (pathname.includes(routeSegments.billing)) setExpandedMenus((prev) => ({ ...prev, billing: true }))
  }, [pathname])

  return (
    <aside className="w-60 bg-white border-r border-neutral-100 fixed left-0 top-14 bottom-0 overflow-y-auto">
      <nav className="p-4 space-y-1.5">
        {/* Home */}
        <Link
          href={ws.root()}
          className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
            isActiveRoute('home') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </Link>

        {/* Events */}
        <div className="pt-3">
          <button
            onClick={() => toggleMenu('events')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActiveRoute('events') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Events
            </div>
            <svg className={`w-4 h-4 transition-transform ${expandedMenus.events ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expandedMenus.events && (
            <div className="ml-5 mt-2 space-y-1 border-l border-neutral-200 pl-3">
              <Link
                href={ws.events.series.list()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.events.series.list()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Event Series
              </Link>
              <Link
                href={ws.events.all()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.events.all()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                All Events
              </Link>
            </div>
          )}
        </div>

        {/* Users */}
        <div className="pt-3">
          <button
            onClick={() => toggleMenu('users')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActiveRoute('users') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Users
            </div>
            <svg className={`w-4 h-4 transition-transform ${expandedMenus.users ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expandedMenus.users && (
            <div className="ml-5 mt-2 space-y-1 border-l border-neutral-200 pl-3">
              <Link
                href={ws.users.all()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.users.all()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                All Users
              </Link>
              <Link
                href={ws.users.companies()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.users.companies()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Companies
              </Link>
              <Link
                href={ws.users.signupForms()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.users.signupForms()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Signup Forms
              </Link>
              <Link
                href={ws.users.terms()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.users.terms()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Terms & Policies
              </Link>
            </div>
          )}
        </div>

        {/* Team */}
        <div className="pt-3">
          <button
            onClick={() => toggleMenu('team')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActiveRoute('team') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Team
            </div>
            <svg className={`w-4 h-4 transition-transform ${expandedMenus.team ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expandedMenus.team && (
            <div className="ml-5 mt-2 space-y-1 border-l border-neutral-200 pl-3">
              <Link
                href={ws.team.members.list()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname.includes(routeSegments.teamMembers) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Members
              </Link>
              <Link
                href={ws.team.groups.list()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname.includes(routeSegments.teamGroups) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Groups
              </Link>
              <Link
                href={ws.team.roles()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  pathname.includes(routeSegments.teamRoles) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Roles
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="pt-3">
          <button
            onClick={() => toggleMenu('settings')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActiveRoute('settings') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </div>
            <svg className={`w-4 h-4 transition-transform ${expandedMenus.settings ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expandedMenus.settings && (
            <div className="ml-5 mt-2 space-y-1 border-l border-neutral-200 pl-3">
              <Link
                href={ws.settings.dataFields()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.settings.dataFields()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Data Fields
              </Link>
              <Link
                href={ws.settings.localization()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.settings.localization()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Localization
              </Link>
            </div>
          )}
        </div>

        {/* Billing */}
        <div className="pt-3">
          <button
            onClick={() => toggleMenu('billing')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
              isActiveRoute('billing') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Billing
            </div>
            <svg className={`w-4 h-4 transition-transform ${expandedMenus.billing ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {expandedMenus.billing && (
            <div className="ml-5 mt-2 space-y-1 border-l border-neutral-200 pl-3">
              <Link
                href={ws.billing.usage()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.billing.usage()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Usage
              </Link>
              <Link
                href={ws.billing.methods()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.billing.methods()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Payment Methods
              </Link>
              <Link
                href={ws.billing.history()}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isExactRoute(ws.billing.history()) ? 'text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Billing History
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}

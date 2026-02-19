'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { routes } from '@/lib/routes'

interface EventHeaderProps {
  workspaceId: string
  eventId: string
}

export default function EventHeader({ workspaceId, eventId }: EventHeaderProps) {
  const router = useRouter()
  const ws = routes.workspace(workspaceId)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEventSwitcherOpen, setIsEventSwitcherOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const eventSwitcherRef = useRef<HTMLDivElement>(null)

  const eventName = 'Seoul Living Design Fair 2026'
  const eventSiteUrl = `/events/${eventId}`

  const handleLogout = () => {
    router.push('/auth/login')
  }

  const otherEvents = [
    { id: 'sdf-2026', name: 'Seoul Design Festival 2026', date: 'Dec 3-6, 2026', icon: '/sdficon.png' },
    { id: 'bldf-2026', name: 'Busan Living Design Fair 2026', date: 'Apr 21-24, 2026', icon: null },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (eventSwitcherRef.current && !eventSwitcherRef.current.contains(event.target as Node)) {
        setIsEventSwitcherOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-neutral-100 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left: Logo + Breadcrumb */}
          <div className="flex items-center gap-4">
            <Link href={ws.root()} className="flex items-center">
              <Image src="/blacklogo.png" alt="Eventelly" width={96} height={24} className="h-6 w-auto" />
            </Link>

            <div className="h-6 w-px bg-neutral-200"></div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <Link href={ws.root()} className="text-neutral-500 hover:text-neutral-800 transition-colors">
                Design House
              </Link>
              <svg className="w-4 h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>

              {/* Event Selector */}
              <div className="relative" ref={eventSwitcherRef}>
                <button
                  onClick={() => setIsEventSwitcherOpen(!isEventSwitcherOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
                >
                  <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0 bg-neutral-100">
                    <Image src="/sldficon.png" alt="Event" width={20} height={20} className="w-full h-full object-contain" />
                  </div>
                  <span>{eventName}</span>
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isEventSwitcherOpen && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-100 z-50 overflow-hidden">
                    {/* Current Event */}
                    <div className="p-3 bg-admin-primary-50 border-b border-admin-primary-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-white">
                          <Image src="/sldficon.png" alt="Event" width={40} height={40} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-admin-primary-700 truncate">{eventName}</p>
                          <p className="text-xs text-admin-primary-600">Currently viewing</p>
                        </div>
                      </div>
                    </div>

                    {/* Other Events */}
                    <div className="max-h-64 overflow-y-auto">
                      {otherEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={ws.event(event.id).root()}
                          className="flex items-center gap-3 px-3 py-2.5 hover:bg-neutral-50 transition-colors border-b border-neutral-50 last:border-0"
                          onClick={() => setIsEventSwitcherOpen(false)}
                        >
                          <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-neutral-100">
                            {event.icon ? (
                              <Image src={event.icon} alt={event.name} width={36} height={36} className="w-full h-full object-contain" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs font-bold text-neutral-500">
                                {event.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-950 truncate">{event.name}</p>
                            <p className="text-xs text-neutral-400">{event.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="p-2 bg-neutral-50 border-t border-neutral-100">
                      <Link
                        href={ws.events.all()}
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-md transition-colors"
                        onClick={() => setIsEventSwitcherOpen(false)}
                      >
                        View All Events
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions + Profile */}
          <div className="flex items-center gap-2">
            {/* Visit Website */}
            <a
              href={eventSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Website
            </a>

            {/* Preview Event */}
            <button
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>

            {/* Publish Event */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-admin-primary-600 hover:bg-admin-primary-700 rounded-md transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Publish
            </button>

            <div className="h-6 w-px bg-neutral-200 mx-1"></div>

            {/* Profile */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-100">
                  <Image src="/profile.png" alt="Profile" width={28} height={28} className="w-full h-full object-cover" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-100 py-1 z-50">
                  <div className="px-4 py-3 border-b border-neutral-100">
                    <p className="text-sm font-semibold text-neutral-950">Bona Lee</p>
                    <p className="text-sm text-neutral-500">bona@micehub.com</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/account/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Account Settings
                    </Link>
                  </div>
                  <div className="border-t border-neutral-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive-text hover:bg-destructive-bg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

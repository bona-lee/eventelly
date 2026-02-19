'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface WorkspaceHeaderProps {
  workspaceId: string
}

export default function WorkspaceHeader({ workspaceId }: WorkspaceHeaderProps) {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isWorkspaceSelectorOpen, setIsWorkspaceSelectorOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const workspaceSelectorRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    router.push('/auth/login')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (workspaceSelectorRef.current && !workspaceSelectorRef.current.contains(event.target as Node)) {
        setIsWorkspaceSelectorOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-neutral-100 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left: Logo + Workspace Selector */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center">
              <Image src="/blacklogo.png" alt="Eventelly" width={96} height={24} className="h-6 w-auto" />
            </Link>

            <div className="h-6 w-px bg-neutral-200"></div>

            {/* Workspace Selector */}
            <div className="relative" ref={workspaceSelectorRef}>
              <button
                onClick={() => setIsWorkspaceSelectorOpen(!isWorkspaceSelectorOpen)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-neutral-950 hover:bg-neutral-50 rounded-md transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-admin-primary-700 flex items-center justify-center text-white text-xs font-bold">
                  D
                </div>
                <span>Design House</span>
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isWorkspaceSelectorOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-100 py-2 z-50">
                  <div className="px-3 py-2">
                    <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Workspaces</p>
                  </div>
                  <Link
                    href="/workspace/designhouse"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50"
                    onClick={() => setIsWorkspaceSelectorOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-md bg-admin-primary-700 flex items-center justify-center text-white text-sm font-bold">
                      D
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-950">Design House</p>
                      <p className="text-xs text-neutral-400">Owner</p>
                    </div>
                    {workspaceId === 'designhouse' && (
                      <svg className="w-4 h-4 text-admin-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </Link>
                  <Link
                    href="/workspace/micehub"
                    className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50"
                    onClick={() => setIsWorkspaceSelectorOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center overflow-hidden">
                      <Image src="/miceicon.png" alt="MICEHUB" width={20} height={20} className="w-5 h-5 object-contain" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-950">MICEHUB</p>
                      <p className="text-xs text-neutral-400">Manager</p>
                    </div>
                    {workspaceId === 'micehub' && (
                      <svg className="w-4 h-4 text-admin-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </Link>
                  <div className="border-t border-neutral-100 mt-2 pt-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                      onClick={() => setIsWorkspaceSelectorOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      All Workspaces
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Profile */}
          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50 rounded-md transition-colors"
              >
                <div className="w-7 h-7 rounded-full overflow-hidden bg-neutral-100">
                  <Image src="/profile.png" alt="Profile" width={28} height={28} className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:block font-medium">Bona Lee</span>
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

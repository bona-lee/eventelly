'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { routes } from '@/lib/routes'

interface Workspace {
  id: string
  name: string
  initial: string
  icon: string | null
  color: string
  role: string
  eventCount: number
  memberCount: number
  isDefault: boolean
}

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<'select' | 'create' | 'join'>('select')
  const [newWorkspace, setNewWorkspace] = useState({ name: '', description: '' })
  const [inviteCode, setInviteCode] = useState('')

  const recentActivities = [
    {
      id: 1,
      workspace: 'Design House',
      action: 'created a new event "Seoul Living 2025"',
      time: '2 hours ago',
      iconBg: 'bg-admin-primary/10',
      iconColor: 'text-admin-primary-700',
      iconPath: 'M12 4v16m8-8H4',
    },
    {
      id: 2,
      workspace: 'MICEHUB',
      action: 'updated exhibitor registration settings',
      time: '5 hours ago',
      iconBg: 'bg-status-info-bg',
      iconColor: 'text-status-info-border',
      iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
    {
      id: 3,
      workspace: 'Design House',
      action: 'added 3 new team members',
      time: 'Yesterday',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      iconPath: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
  ]

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    {
      id: 'designhouse',
      name: 'Design House',
      initial: 'D',
      icon: null,
      color: 'bg-admin-primary-700',
      role: 'Owner',
      eventCount: 3,
      memberCount: 12,
      isDefault: true,
    },
    {
      id: 'micehub',
      name: 'MICEHUB',
      initial: 'M',
      icon: '/miceicon.png',
      color: 'bg-neutral-800',
      role: 'Manager',
      eventCount: 5,
      memberCount: 24,
      isDefault: false,
    },
  ])

  const setDefaultWorkspace = (workspaceId: string) => {
    setWorkspaces(workspaces.map(ws => ({
      ...ws,
      isDefault: ws.id === workspaceId,
    })))
  }

  const openModal = () => {
    setShowModal(true)
    setModalMode('select')
  }

  const closeModal = () => {
    setShowModal(false)
    setModalMode('select')
    setNewWorkspace({ name: '', description: '' })
    setInviteCode('')
  }

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call to create workspace
    closeModal()
  }

  const handleJoinWorkspace = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: API call to join workspace with invite code
    closeModal()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Workspaces</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Select a workspace to manage your events
        </p>
      </div>

      {/* Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Workspace Cards */}
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`card p-5 transition-all duration-200 group ${
              workspace.isDefault ? 'ring-2 ring-admin-primary border-transparent' : 'hover:shadow-sm hover:border-admin-primary/30'
            }`}
          >
            <Link href={routes.workspace(workspace.id).root()} className="block">
              <div className="flex items-start gap-4">
                {/* Workspace Icon */}
                {workspace.icon ? (
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 bg-neutral-100">
                    <Image src={workspace.icon} alt={workspace.name} width={28} height={28} className="w-7 h-7 object-contain" />
                  </div>
                ) : (
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-base flex-shrink-0 ${workspace.color}`}>
                    {workspace.initial}
                  </div>
                )}

                {/* Workspace Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-neutral-950 group-hover:text-admin-primary-700 transition-colors truncate">
                      {workspace.name}
                    </h3>
                    {workspace.isDefault && (
                      <svg className="w-4 h-4 text-admin-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{workspace.role}</p>
                </div>

                {/* Arrow */}
                <svg className="w-5 h-5 text-neutral-300 group-hover:text-admin-primary transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-neutral-50 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-400">Events</p>
                  <p className="text-lg font-semibold text-neutral-950">{workspace.eventCount}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Members</p>
                  <p className="text-lg font-semibold text-neutral-950">{workspace.memberCount}</p>
                </div>
              </div>
            </Link>

            {/* Set as Default Button */}
            {!workspace.isDefault && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDefaultWorkspace(workspace.id)
                }}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 text-sm text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-md transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Set as default
              </button>
            )}
          </div>
        ))}

        {/* New Workspace Card */}
        <button
          onClick={openModal}
          className="card p-5 border-2 border-dashed border-neutral-200 hover:border-admin-primary hover:bg-admin-primary/5 transition-all duration-200 flex flex-col items-center justify-center min-h-[160px] group"
        >
          <div className="w-11 h-11 rounded-lg bg-neutral-100 group-hover:bg-admin-primary/10 flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-neutral-400 group-hover:text-admin-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-medium text-neutral-500 group-hover:text-admin-primary-700 transition-colors">
            New Workspace
          </p>
        </button>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-12">
        <h2 className="text-base font-semibold text-neutral-950 mb-4">Recent Activity</h2>
        <div className="card divide-y divide-neutral-50">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="p-4 flex items-center gap-4">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
                <svg className={`w-4 h-4 ${activity.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.iconPath} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-800">
                  <span className="font-medium">{activity.workspace}</span>
                  <span className="text-neutral-500"> {activity.action}</span>
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Workspace Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-950">
                {modalMode === 'select' && 'New Workspace'}
                {modalMode === 'create' && 'Create Workspace'}
                {modalMode === 'join' && 'Join Workspace'}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Select Mode */}
            {modalMode === 'select' && (
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setModalMode('create')}
                  className="w-full p-4 border border-neutral-200 rounded-lg hover:border-admin-primary-300 hover:bg-admin-primary-50/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-admin-primary-100 rounded-lg flex items-center justify-center group-hover:bg-admin-primary-200 transition-colors">
                      <svg className="w-6 h-6 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-950 group-hover:text-admin-primary-700 transition-colors">
                        Create a new workspace
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Start fresh with your own workspace
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-neutral-300 group-hover:text-admin-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                <button
                  onClick={() => setModalMode('join')}
                  className="w-full p-4 border border-neutral-200 rounded-lg hover:border-admin-primary-300 hover:bg-admin-primary-50/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-neutral-950 group-hover:text-admin-primary-700 transition-colors">
                        Join with invite code
                      </p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        Enter a code to join an existing workspace
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-neutral-300 group-hover:text-admin-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            )}

            {/* Create Mode */}
            {modalMode === 'create' && (
              <form onSubmit={handleCreateWorkspace} className="p-6 space-y-4">
                <div>
                  <label htmlFor="workspaceName" className="label">Workspace name</label>
                  <input
                    id="workspaceName"
                    value={newWorkspace.name}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, name: e.target.value })}
                    type="text"
                    required
                    className="input"
                    placeholder="My Company"
                  />
                </div>
                <div>
                  <label htmlFor="workspaceDesc" className="label">
                    Description <span className="text-neutral-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="workspaceDesc"
                    value={newWorkspace.description}
                    onChange={(e) => setNewWorkspace({ ...newWorkspace, description: e.target.value })}
                    rows={3}
                    className="input resize-none"
                    placeholder="Brief description of this workspace"
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalMode('select')}
                    className="btn btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary flex-1">
                    Create
                  </button>
                </div>
              </form>
            )}

            {/* Join Mode */}
            {modalMode === 'join' && (
              <form onSubmit={handleJoinWorkspace} className="p-6 space-y-4">
                <div>
                  <label htmlFor="inviteCode" className="label">Invite code</label>
                  <input
                    id="inviteCode"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    type="text"
                    required
                    className="input font-mono tracking-wider text-center text-lg"
                    placeholder="XXXX-XXXX-XXXX"
                    maxLength={14}
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Enter the invite code you received from a workspace admin
                  </p>
                </div>
                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setModalMode('select')}
                    className="btn btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary flex-1">
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

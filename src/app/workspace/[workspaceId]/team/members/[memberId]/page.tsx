'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'
import { Badge, type StatusColor } from '@/components/Badge'

interface EventSeries {
  id: string
  name: string
  code: string
  eventCount: number
  color: string
  hasAccess: boolean
}

export default function MemberDetailPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const memberId = params.memberId as string
  const ws = routes.workspace(workspaceId)

  const [activeTab, setActiveTab] = useState('info')
  const tabs = [
    { id: 'info', label: 'Member Info' },
    { id: 'series', label: 'Assigned Event Series' },
  ]

  // Member data
  const [member, setMember] = useState({
    id: memberId,
    name: 'James Kim',
    email: 'james.kim@micehub.com',
    phone: '+82 10-9876-5432',
    avatar: null as string | null,
    role: 'Manager',
    groups: ['Team 1'],
    status: 'Active' as 'Active' | 'Pending' | 'Inactive',
    joinedAt: 'Feb 20, 2024',
    lastActive: '1 day ago',
  })

  const [selectedGroup, setSelectedGroup] = useState('')
  const allGroups = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5']
  const availableGroups = useMemo(() => {
    return allGroups.filter(g => !member.groups.includes(g))
  }, [member.groups])

  const roles = ['Owner', 'Manager', 'Staff']

  // Dropdown states
  const [isRoleOpen, setIsRoleOpen] = useState(false)
  const roleRef = useRef<HTMLDivElement>(null)
  const [isGroupOpen, setIsGroupOpen] = useState(false)
  const groupRef = useRef<HTMLDivElement>(null)

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleOpen(false)
      }
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setIsGroupOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Event Series data
  const [eventSeries, setEventSeries] = useState<EventSeries[]>([
    { id: 'sldf', name: 'Seoul Living Design Fair', code: 'sldf', eventCount: 8, color: 'bg-admin-primary-700', hasAccess: true },
    { id: 'sdf', name: 'Seoul Design Festival', code: 'sdf', eventCount: 5, color: 'bg-purple-600', hasAccess: true },
    { id: 'bldf', name: 'Busan Living Design Fair', code: 'bldf', eventCount: 4, color: 'bg-blue-600', hasAccess: false },
    { id: 'kdw', name: 'Korea Design Week', code: 'kdw', eventCount: 3, color: 'bg-indigo-600', hasAccess: false },
    { id: 'mldf', name: 'Magok Living Design Fair', code: 'mldf', eventCount: 2, color: 'bg-orange-600', hasAccess: false },
    { id: 'idf', name: 'Interior Design Fair', code: 'idf', eventCount: 6, color: 'bg-amber-600', hasAccess: false },
    { id: 'fdf', name: 'Furniture Design Fair', code: 'fdf', eventCount: 4, color: 'bg-rose-600', hasAccess: false },
  ])

  const [showAddSeriesModal, setShowAddSeriesModal] = useState(false)
  const [seriesSearchQuery, setSeriesSearchQuery] = useState('')
  const [modalSearchQuery, setModalSearchQuery] = useState('')

  const assignedSeries = useMemo(() => {
    return eventSeries
      .filter(s => s.hasAccess)
      .filter(s =>
        s.name.toLowerCase().includes(seriesSearchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(seriesSearchQuery.toLowerCase())
      )
  }, [eventSeries, seriesSearchQuery])

  const unassignedSeries = useMemo(() => {
    return eventSeries
      .filter(s => !s.hasAccess)
      .filter(s =>
        s.name.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(modalSearchQuery.toLowerCase())
      )
  }, [eventSeries, modalSearchQuery])

  const totalAssignedSeries = useMemo(() => eventSeries.filter(s => s.hasAccess).length, [eventSeries])

  const addGroup = (group: string) => {
    if (group && !member.groups.includes(group)) {
      setMember({ ...member, groups: [...member.groups, group] })
      setSelectedGroup('')
    }
  }

  const removeGroup = (group: string) => {
    setMember({ ...member, groups: member.groups.filter(g => g !== group) })
  }

  const toggleSeriesAccess = (seriesId: string) => {
    setEventSeries(eventSeries.map(series =>
      series.id === seriesId ? { ...series, hasAccess: !series.hasAccess } : series
    ))
  }

  const grantAccess = (seriesId: string) => {
    setEventSeries(eventSeries.map(series =>
      series.id === seriesId ? { ...series, hasAccess: true } : series
    ))
  }

  const handleSave = () => {
    alert('Changes saved successfully!')
  }

  const getMemberStatusColor = (status: string): StatusColor => {
    switch (status) {
      case 'Active':
        return 'success'
      case 'Pending':
        return 'warning'
      case 'Inactive':
        return 'neutral'
      default:
        return 'neutral'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href={ws.team.members.list()}
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-800 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Members
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-lg object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-admin-primary-100 flex items-center justify-center text-admin-primary-700 font-bold text-xl">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-neutral-950">{member.name}</h1>
                <Badge variant="status" color={getMemberStatusColor(member.status)}>
                  {member.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-neutral-500">{member.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.id
                  ? 'border-admin-primary text-admin-primary-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {tab.label}
              {tab.id === 'series' && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded">
                  {totalAssignedSeries}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content: Member Info */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => setMember({ ...member, name: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => setMember({ ...member, email: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  value={member.phone}
                  onChange={(e) => setMember({ ...member, phone: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="label">Joined Date</label>
                <input
                  type="text"
                  value={member.joinedAt}
                  disabled
                  className="input bg-neutral-50 text-neutral-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Role & Permissions</h3>
            <div className="space-y-5">
              {/* Role */}
              <div>
                <label className="label">Role</label>
                <div className="relative max-w-xs" ref={roleRef}>
                  <button
                    type="button"
                    onClick={() => setIsRoleOpen(!isRoleOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950 flex-1">{member.role}</span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isRoleOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {roles.map((role) => (
                          <button
                            key={role}
                            type="button"
                            onClick={() => { setMember({ ...member, role }); setIsRoleOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${member.role === role ? 'bg-admin-primary-50' : ''}`}
                          >
                            <span className="text-sm text-neutral-800">{role}</span>
                            {member.role === role && (
                              <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  {member.role === 'Owner' && 'Full access to all workspace settings and data'}
                  {member.role === 'Manager' && 'Can manage events, members, and most settings'}
                  {member.role === 'Staff' && 'Limited access to assigned event series only'}
                </p>
              </div>

              {/* Groups */}
              <div>
                <label className="label">Groups</label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 min-h-[36px]">
                    {member.groups.map((group) => (
                      <span
                        key={group}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-primary-50 text-admin-primary-700 rounded-md text-sm font-medium"
                      >
                        {group}
                        <button
                          onClick={() => removeGroup(group)}
                          className="p-0.5 hover:bg-admin-primary-100 rounded transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    {member.groups.length === 0 && (
                      <span className="text-sm text-neutral-400 py-1.5">No groups assigned</span>
                    )}
                  </div>
                  <div className="relative max-w-xs" ref={groupRef}>
                    <button
                      type="button"
                      onClick={() => setIsGroupOpen(!isGroupOpen)}
                      className="w-full input text-left flex items-center justify-between pr-4"
                      disabled={availableGroups.length === 0}
                    >
                      <span className="text-neutral-500 flex-1">Add to group...</span>
                      <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isGroupOpen && availableGroups.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                        <div className="py-1">
                          {availableGroups.map((group) => (
                            <button
                              key={group}
                              type="button"
                              onClick={() => { addGroup(group); setIsGroupOpen(false) }}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors"
                            >
                              <span className="text-sm text-neutral-800">{group}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                <div>
                  <p className="text-sm font-medium text-neutral-800">Account Status</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Current status: <span className={`font-medium ${member.status === 'Active' ? 'text-status-success-border' : member.status === 'Pending' ? 'text-status-warning-border' : 'text-neutral-500'}`}>{member.status}</span></p>
                </div>
                {member.status === 'Active' && (
                  <button
                    onClick={() => setMember({ ...member, status: 'Inactive' })}
                    className="px-3 py-1.5 text-sm text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                  >
                    Deactivate
                  </button>
                )}
                {member.status === 'Inactive' && (
                  <button
                    onClick={() => setMember({ ...member, status: 'Active' })}
                    className="px-3 py-1.5 text-sm text-status-success-border hover:bg-status-success-bg rounded-md transition-colors"
                  >
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Link href={ws.team.members.list()} className="btn btn-secondary">
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Assigned Event Series */}
      {activeTab === 'series' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={seriesSearchQuery}
                onChange={(e) => setSeriesSearchQuery(e.target.value)}
                placeholder="Search assigned series..."
                className="input max-w-sm"
              />
            </div>
            <button onClick={() => setShowAddSeriesModal(true)} className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Grant Series Access
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            {member.name} has access to <span className="font-medium text-neutral-800">{totalAssignedSeries}</span> event series
          </p>

          {/* Assigned Series List */}
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Event Series</th>
                  <th>Code</th>
                  <th>Events</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignedSeries.map((series) => (
                  <tr key={series.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${series.color}`}>
                          {series.name.charAt(0)}
                        </div>
                        <Link
                          href={ws.events.series.detail(series.id)}
                          className="text-sm font-medium text-neutral-950 hover:text-admin-primary-700"
                        >
                          {series.name}
                        </Link>
                      </div>
                    </td>
                    <td>
                      <code className="px-2 py-0.5 text-xs font-mono bg-neutral-100 text-neutral-600 rounded">{series.code}</code>
                    </td>
                    <td>
                      <span className="text-sm text-neutral-500">{series.eventCount} events</span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => toggleSeriesAccess(series.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {assignedSeries.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="mt-4 text-sm text-neutral-500">
                  {seriesSearchQuery ? 'No matching series found' : 'No event series assigned'}
                </p>
                {!seriesSearchQuery && (
                  <button onClick={() => setShowAddSeriesModal(true)} className="btn btn-primary mt-4">
                    Grant Series Access
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Series Access Modal */}
      {showAddSeriesModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddSeriesModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Grant Event Series Access</h3>
              <button onClick={() => { setShowAddSeriesModal(false); setModalSearchQuery('') }} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-neutral-500 mb-4">
              Select event series to grant access to <span className="font-medium text-neutral-800">{member.name}</span>
            </p>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  placeholder="Search event series..."
                  className="input pl-10"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {unassignedSeries.length > 0 ? (
                unassignedSeries.map((series) => (
                  <div
                    key={series.id}
                    className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:border-admin-primary-200 hover:bg-admin-primary-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${series.color}`}>
                        {series.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-950">{series.name}</p>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          <code className="font-mono">{series.code}</code> · {series.eventCount} events
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => grantAccess(series.id)}
                      className="px-3 py-1.5 text-xs font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors"
                    >
                      Grant Access
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <svg className="w-10 h-10 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {modalSearchQuery ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className="mt-3 text-sm text-neutral-500">
                    {modalSearchQuery ? 'No matching series found' : 'All event series are already assigned'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

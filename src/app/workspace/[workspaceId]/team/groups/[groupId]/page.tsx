'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'
import { Badge, type StatusColor } from '@/components/Badge'

interface Member {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  status: 'Active' | 'Pending' | 'Inactive'
  lastActive: string
}

interface EventSeries {
  id: string
  name: string
  code: string
  eventCount: number
  color: string
}

export default function GroupDetailPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const groupId = params.groupId as string
  const ws = routes.workspace(workspaceId)

  const [activeTab, setActiveTab] = useState('members')
  const tabs = [
    { id: 'members', label: 'Members' },
    { id: 'series', label: 'Event Series Access' },
  ]

  const [group, setGroup] = useState({
    id: groupId,
    name: 'Team 1',
    description: 'Seoul Living Design Fair team',
    createdAt: 'Jan 15, 2024',
    color: 'bg-blue-600',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedGroup, setEditedGroup] = useState({ ...group })

  // Members data
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'James Kim', email: 'james.kim@micehub.com', avatar: null, role: 'Manager', status: 'Active', lastActive: '1 day ago' },
    { id: '2', name: 'Sarah Park', email: 'sarah.park@micehub.com', avatar: null, role: 'Staff', status: 'Active', lastActive: '2 hours ago' },
    { id: '3', name: 'Mike Lee', email: 'mike.lee@micehub.com', avatar: null, role: 'Staff', status: 'Active', lastActive: '5 mins ago' },
    { id: '4', name: 'Emma Choi', email: 'emma.choi@micehub.com', avatar: null, role: 'Staff', status: 'Pending', lastActive: 'Never' },
  ])

  const allMembers: Member[] = [
    { id: '5', name: 'John Smith', email: 'john.smith@micehub.com', avatar: null, role: 'Staff', status: 'Active', lastActive: '3 days ago' },
    { id: '6', name: 'Amy Wang', email: 'amy.wang@micehub.com', avatar: null, role: 'Staff', status: 'Active', lastActive: '1 hour ago' },
    { id: '7', name: 'David Han', email: 'david.han@micehub.com', avatar: null, role: 'Manager', status: 'Active', lastActive: '10 mins ago' },
  ]

  // Event Series data
  const [assignedSeries, setAssignedSeries] = useState<EventSeries[]>([
    { id: 'sldf', name: 'Seoul Living Design Fair', code: 'sldf', eventCount: 8, color: 'bg-admin-primary-700' },
    { id: 'sdf', name: 'Seoul Design Festival', code: 'sdf', eventCount: 5, color: 'bg-purple-600' },
    { id: 'bldf', name: 'Busan Living Design Fair', code: 'bldf', eventCount: 4, color: 'bg-blue-600' },
  ])

  const allSeries: EventSeries[] = [
    { id: 'kdw', name: 'Korea Design Week', code: 'kdw', eventCount: 3, color: 'bg-indigo-600' },
    { id: 'mldf', name: 'Magok Living Design Fair', code: 'mldf', eventCount: 2, color: 'bg-orange-600' },
    { id: 'idf', name: 'Interior Design Fair', code: 'idf', eventCount: 6, color: 'bg-amber-600' },
    { id: 'fdf', name: 'Furniture Design Fair', code: 'fdf', eventCount: 4, color: 'bg-rose-600' },
  ]

  const [memberSearchQuery, setMemberSearchQuery] = useState('')
  const [seriesSearchQuery, setSeriesSearchQuery] = useState('')
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showAddSeriesModal, setShowAddSeriesModal] = useState(false)
  const [modalMemberSearch, setModalMemberSearch] = useState('')
  const [modalSeriesSearch, setModalSeriesSearch] = useState('')

  const filteredMembers = useMemo(() => {
    return members.filter(m =>
      m.name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
    )
  }, [members, memberSearchQuery])

  const filteredSeries = useMemo(() => {
    return assignedSeries.filter(s =>
      s.name.toLowerCase().includes(seriesSearchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(seriesSearchQuery.toLowerCase())
    )
  }, [assignedSeries, seriesSearchQuery])

  const availableMembers = useMemo(() => {
    const memberIds = members.map(m => m.id)
    return allMembers
      .filter(m => !memberIds.includes(m.id))
      .filter(m =>
        m.name.toLowerCase().includes(modalMemberSearch.toLowerCase()) ||
        m.email.toLowerCase().includes(modalMemberSearch.toLowerCase())
      )
  }, [members, allMembers, modalMemberSearch])

  const availableSeries = useMemo(() => {
    const seriesIds = assignedSeries.map(s => s.id)
    return allSeries
      .filter(s => !seriesIds.includes(s.id))
      .filter(s =>
        s.name.toLowerCase().includes(modalSeriesSearch.toLowerCase()) ||
        s.code.toLowerCase().includes(modalSeriesSearch.toLowerCase())
      )
  }, [assignedSeries, allSeries, modalSeriesSearch])

  const addMember = (member: Member) => {
    setMembers([...members, member])
  }

  const removeMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId))
  }

  const addSeries = (series: EventSeries) => {
    setAssignedSeries([...assignedSeries, series])
  }

  const removeSeries = (seriesId: string) => {
    setAssignedSeries(assignedSeries.filter(s => s.id !== seriesId))
  }

  const handleSave = () => {
    setGroup(editedGroup)
    setIsEditing(false)
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

  const getRoleClass = (role: string) => {
    switch (role) {
      case 'Owner':
        // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative role badge
        return 'bg-purple-50 text-purple-700'
      case 'Manager':
        return 'bg-status-info-bg text-status-info-text'
      case 'Staff':
        return 'bg-neutral-100 text-neutral-600'
      default:
        return 'bg-neutral-100 text-neutral-600'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href={ws.team.groups.list()}
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-800 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Groups
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl ${group.color}`}>
              {group.name.charAt(0)}
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedGroup.name}
                  onChange={(e) => setEditedGroup({ ...editedGroup, name: e.target.value })}
                  className="text-2xl font-bold text-neutral-950 border-b-2 border-admin-primary focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-neutral-950">{group.name}</h1>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedGroup.description}
                  onChange={(e) => setEditedGroup({ ...editedGroup, description: e.target.value })}
                  placeholder="Add description..."
                  className="mt-1 text-sm text-neutral-500 border-b border-neutral-300 focus:border-admin-primary focus:outline-none w-full"
                />
              ) : (
                <p className="mt-1 text-sm text-neutral-500">{group.description || 'No description'}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button onClick={() => { setIsEditing(false); setEditedGroup({ ...group }) }} className="btn btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn btn-primary">
                  Save
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Group
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="font-medium text-neutral-800">{members.length}</span> members
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="font-medium text-neutral-800">{assignedSeries.length}</span> event series
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Created {group.createdAt}
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
              <span className="ml-2 px-1.5 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded">
                {tab.id === 'members' ? members.length : assignedSeries.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Members Tab */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={memberSearchQuery}
              onChange={(e) => setMemberSearchQuery(e.target.value)}
              placeholder="Search members..."
              className="input max-w-sm"
            />
            <button onClick={() => setShowAddMemberModal(true)} className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </button>
          </div>

          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {member.avatar ? (
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-md object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-admin-primary-100 flex items-center justify-center text-admin-primary-700 font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          <Link
                            href={ws.team.members.detail(member.id)}
                            className="text-sm font-medium text-neutral-950 hover:text-admin-primary-700"
                          >
                            {member.name}
                          </Link>
                          <p className="text-xs text-neutral-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${getRoleClass(member.role)}`}>
                        {member.role}
                      </span>
                    </td>
                    <td>
                      <Badge variant="status" color={getMemberStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                    </td>
                    <td>
                      <span className="text-sm text-neutral-500">{member.lastActive}</span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => removeMember(member.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6" />
                        </svg>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="mt-4 text-sm text-neutral-500">
                  {memberSearchQuery ? 'No members found matching your search' : 'No members in this group yet'}
                </p>
                {!memberSearchQuery && (
                  <button onClick={() => setShowAddMemberModal(true)} className="btn btn-primary mt-4">
                    Add first member
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Event Series Tab */}
      {activeTab === 'series' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={seriesSearchQuery}
              onChange={(e) => setSeriesSearchQuery(e.target.value)}
              placeholder="Search event series..."
              className="input max-w-sm"
            />
            <button onClick={() => setShowAddSeriesModal(true)} className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Assign Series
            </button>
          </div>

          <p className="text-sm text-neutral-500">
            Members in this group have access to <span className="font-medium text-neutral-800">{assignedSeries.length}</span> event series
          </p>

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
                {filteredSeries.map((series) => (
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
                        onClick={() => removeSeries(series.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSeries.length === 0 && (
              <div className="py-12 text-center">
                <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="mt-4 text-sm text-neutral-500">
                  {seriesSearchQuery ? 'No event series found matching your search' : 'No event series assigned to this group'}
                </p>
                {!seriesSearchQuery && (
                  <button onClick={() => setShowAddSeriesModal(true)} className="btn btn-primary mt-4">
                    Assign first series
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddMemberModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Add Member to Group</h3>
              <button onClick={() => { setShowAddMemberModal(false); setModalMemberSearch('') }} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-neutral-500 mb-4">
              Select members to add to <span className="font-medium text-neutral-800">{group.name}</span>
            </p>

            <div className="mb-4">
              <div className="relative">
                <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={modalMemberSearch}
                  onChange={(e) => setModalMemberSearch(e.target.value)}
                  placeholder="Search members..."
                  className="input pl-10"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableMembers.length > 0 ? (
                availableMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border border-neutral-100 rounded-lg hover:border-admin-primary-200 hover:bg-admin-primary-50/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-admin-primary-100 flex items-center justify-center text-admin-primary-700 font-semibold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-950">{member.name}</p>
                        <p className="text-xs text-neutral-500">{member.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addMember(member)}
                      className="px-3 py-1.5 text-xs font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <svg className="w-10 h-10 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {modalMemberSearch ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className="mt-3 text-sm text-neutral-500">
                    {modalMemberSearch ? 'No matching members found' : 'All members are already in this group'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Series Modal */}
      {showAddSeriesModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddSeriesModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Assign Event Series</h3>
              <button onClick={() => { setShowAddSeriesModal(false); setModalSeriesSearch('') }} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-neutral-500 mb-4">
              Assign event series access to all members in <span className="font-medium text-neutral-800">{group.name}</span>
            </p>

            <div className="mb-4">
              <div className="relative">
                <svg className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={modalSeriesSearch}
                  onChange={(e) => setModalSeriesSearch(e.target.value)}
                  placeholder="Search event series..."
                  className="input pl-10"
                />
              </div>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {availableSeries.length > 0 ? (
                availableSeries.map((series) => (
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
                      onClick={() => addSeries(series)}
                      className="px-3 py-1.5 text-xs font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors"
                    >
                      Assign
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <svg className="w-10 h-10 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {modalSeriesSearch ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    )}
                  </svg>
                  <p className="mt-3 text-sm text-neutral-500">
                    {modalSeriesSearch ? 'No matching series found' : 'All event series are already assigned'}
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

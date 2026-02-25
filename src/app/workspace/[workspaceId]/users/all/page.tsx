'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Badge } from '@/components/Badge'

interface UserEventParticipation {
  id: string
  eventName: string
  eventSeriesName: string
  date: string
  role: string
  status: 'Attended' | 'Registered' | 'Cancelled'
}

interface User {
  id: string
  name: string
  email: string
  phone: string
  position: string
  companies: string[]
  eventCount: number
  status: 'Active' | 'Inactive'
  registeredAt: string
  lastActiveAt: string
  participationHistory: UserEventParticipation[]
}

export default function AllUsersPage() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Lee Bona',
      email: 'bona.lee@designhouse.co.kr',
      phone: '010-1111-2222',
      position: 'Marketing Manager',
      companies: ['Design House Co.', 'Modern Living Inc.'],
      eventCount: 5,
      status: 'Active',
      registeredAt: 'Jan 15, 2023',
      lastActiveAt: 'Feb 20, 2025',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 10, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Busan Living Design Fair 2024', eventSeriesName: 'Busan Living Design Fair', date: 'Oct 20, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '3', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', role: 'Visitor', status: 'Attended' },
        { id: '4', eventName: 'Seoul Living Design Fair 2023', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 8, 2023', role: 'Exhibitor', status: 'Attended' },
        { id: '5', eventName: 'Korea Design Week 2023', eventSeriesName: 'Korea Design Week', date: 'Jun 15, 2023', role: 'Speaker', status: 'Attended' },
      ],
    },
    {
      id: '2',
      name: 'Erik Johansson',
      email: 'erik@nordic-interior.se',
      phone: '+46-70-123-4567',
      position: 'Founder',
      companies: ['Nordic Interior'],
      eventCount: 2,
      status: 'Active',
      registeredAt: 'May 5, 2023',
      lastActiveAt: 'Jan 10, 2025',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 10, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', role: 'Exhibitor', status: 'Registered' },
      ],
    },
    {
      id: '3',
      name: 'Marco Rossi',
      email: 'marco@italiafurniture.it',
      phone: '+39-335-123-4567',
      position: 'CEO',
      companies: ['Italia Furniture'],
      eventCount: 4,
      status: 'Active',
      registeredAt: 'Jun 10, 2023',
      lastActiveAt: 'Dec 15, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 10, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Busan Living Design Fair 2024', eventSeriesName: 'Busan Living Design Fair', date: 'Oct 20, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '3', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', role: 'Exhibitor', status: 'Cancelled' },
        { id: '4', eventName: 'Seoul Living Design Fair 2023', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 8, 2023', role: 'Exhibitor', status: 'Attended' },
      ],
    },
    {
      id: '4',
      name: 'Giulia Bianchi',
      email: 'giulia@italiafurniture.it',
      phone: '+39-335-234-5678',
      position: 'Export Manager',
      companies: ['Italia Furniture'],
      eventCount: 2,
      status: 'Active',
      registeredAt: 'Jul 20, 2023',
      lastActiveAt: 'Nov 25, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 10, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Busan Living Design Fair 2024', eventSeriesName: 'Busan Living Design Fair', date: 'Oct 20, 2024', role: 'Exhibitor', status: 'Attended' },
      ],
    },
    {
      id: '5',
      name: 'Hans Mueller',
      email: 'info@germankitchen.de',
      phone: '+49-170-123-4567',
      position: 'Managing Director',
      companies: ['German Kitchen GmbH'],
      eventCount: 1,
      status: 'Active',
      registeredAt: 'Sep 20, 2023',
      lastActiveAt: 'Jun 5, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Jun 5, 2024', role: 'Exhibitor', status: 'Attended' },
      ],
    },
    {
      id: '6',
      name: 'Yuki Tanaka',
      email: 'yuki@japanlighting.jp',
      phone: '+81-90-1234-5678',
      position: 'CEO',
      companies: ['Japan Lighting Co.'],
      eventCount: 2,
      status: 'Active',
      registeredAt: 'Oct 5, 2023',
      lastActiveAt: 'May 15, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'May 15, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', role: 'Visitor', status: 'Registered' },
      ],
    },
    {
      id: '7',
      name: 'Kenji Sato',
      email: 'kenji@japanlighting.jp',
      phone: '+81-90-2345-6789',
      position: 'International Sales',
      companies: ['Japan Lighting Co.'],
      eventCount: 1,
      status: 'Inactive',
      registeredAt: 'Nov 10, 2023',
      lastActiveAt: 'Mar 20, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Mar 20, 2024', role: 'Exhibitor', status: 'Cancelled' },
      ],
    },
    {
      id: '8',
      name: 'Park Jimin',
      email: 'art@galleryseoul.kr',
      phone: '010-6666-7777',
      position: 'Gallery Director',
      companies: ['Art Gallery Seoul'],
      eventCount: 2,
      status: 'Active',
      registeredAt: 'Jul 15, 2023',
      lastActiveAt: 'Aug 30, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 30, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Korea Art Fair 2024', eventSeriesName: 'Korea Art Fair', date: 'May 10, 2024', role: 'Exhibitor', status: 'Attended' },
      ],
    },
    {
      id: '9',
      name: 'Choi Sujin',
      email: 'hello@lifestylekorea.com',
      phone: '010-7777-8888',
      position: 'CEO',
      companies: ['Lifestyle Korea'],
      eventCount: 1,
      status: 'Inactive',
      registeredAt: 'Aug 1, 2023',
      lastActiveAt: 'Jul 10, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2023', eventSeriesName: 'Seoul Living Design Fair', date: 'Jul 10, 2024', role: 'Exhibitor', status: 'Attended' },
      ],
    },
    {
      id: '10',
      name: 'Jung Sujin',
      email: 'design@modernliving.com',
      phone: '010-4444-5555',
      position: 'Design Director',
      companies: ['Modern Living Inc.', 'Design House Co.'],
      eventCount: 3,
      status: 'Active',
      registeredAt: 'Apr 10, 2023',
      lastActiveAt: 'Nov 25, 2024',
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Nov 25, 2024', role: 'Exhibitor', status: 'Attended' },
        { id: '2', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', role: 'Speaker', status: 'Attended' },
        { id: '3', eventName: 'Busan Living Design Fair 2024', eventSeriesName: 'Busan Living Design Fair', date: 'Oct 20, 2024', role: 'Exhibitor', status: 'Attended' },
      ],
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [detailTab, setDetailTab] = useState<'info' | 'participation'>('info')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  // Dropdown states
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const statusRef = useRef<HTMLDivElement>(null)

  const allCompanies = [...new Set(users.flatMap(u => u.companies))]

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery)
      const matchesStatus = !statusFilter || u.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [users, searchQuery, statusFilter])

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' as const : 'neutral' as const
  }

  const getParticipationStatusColor = (status: string) => {
    switch (status) {
      case 'Attended':
        return 'success' as const
      case 'Registered':
        return 'info' as const
      case 'Cancelled':
        return 'error' as const
      default:
        return 'neutral' as const
    }
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setDetailTab('info')
    setIsEditing(false)
    setEditForm({})
  }

  const handleStartEdit = () => {
    if (selectedUser) {
      setEditForm({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        position: selectedUser.position,
      })
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({})
  }

  const handleSaveEdit = () => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        ...editForm,
      } as User)
    }
    setIsEditing(false)
    setEditForm({})
  }

  // Computed stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'Active').length
  const totalCompanies = allCompanies.length
  const totalEvents = [...new Set(users.flatMap(u => u.participationHistory.map(p => p.eventName)))].length

  return (
    <div className="flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${selectedUser ? 'mr-[480px]' : ''}`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-950">All Users</h1>
            <p className="mt-1 text-sm text-neutral-500">Workspace-level user accounts and participation records</p>
          </div>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Total Users</p>
            <p className="text-2xl font-bold text-neutral-950 mt-1">{totalUsers}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Active</p>
            <p className="text-2xl font-bold text-status-success-border mt-1">{activeUsers}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Companies</p>
            <p className="text-2xl font-bold text-status-info-border mt-1">{totalCompanies}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Events</p>
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI stat */}
            <p className="text-2xl font-bold text-purple-600 mt-1">{totalEvents}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, phone..."
                className="input"
              />
            </div>
            {/* Status Filter Dropdown */}
            <div className="relative w-36" ref={statusRef}>
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-full input text-left flex items-center justify-between pr-4"
              >
                {statusFilter ? (
                  <span className="text-neutral-950 flex-1 truncate">{statusFilter}</span>
                ) : (
                  <span className="text-neutral-500 flex-1">All Status</span>
                )}
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isStatusOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setStatusFilter(''); setIsStatusOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${statusFilter === '' ? 'bg-admin-primary-50' : ''}`}
                    >
                      <span className="text-sm text-neutral-800">All Status</span>
                      {statusFilter === '' && (
                        <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    {['Active', 'Inactive'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => { setStatusFilter(status); setIsStatusOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${statusFilter === status ? 'bg-admin-primary-50' : ''}`}
                      >
                        <span className="text-sm text-neutral-800">{status}</span>
                        {statusFilter === status && (
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
          </div>
        </div>

        {/* Table */}
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleSelectUser(user)}
                  className={`cursor-pointer ${selectedUser?.id === user.id ? 'bg-admin-primary-50' : ''}`}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-neutral-950">{user.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{user.email}</span>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{user.phone}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {user.companies.slice(0, 2).map((company) => (
                        <Badge key={company} variant="compact" color="neutral">
                          {company}
                        </Badge>
                      ))}
                      {user.companies.length > 2 && (
                        <span className="text-xs text-neutral-400">+{user.companies.length - 2}</span>
                      )}
                      {user.companies.length === 0 && (
                        <span className="text-sm text-neutral-400">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <Badge variant="compact" color="primary">
                      {user.eventCount}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center">
              <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="mt-4 text-sm text-neutral-500">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Slide Panel */}
      {selectedUser && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSelectedUser(null)}
          />

          {/* Panel */}
          <div className="fixed top-14 right-0 bottom-0 w-[480px] bg-white border-l border-neutral-200 shadow-lg z-50 overflow-hidden flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-bold text-xl">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950">{selectedUser.name}</h3>
                  <p className="text-sm text-neutral-500">{selectedUser.position}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-neutral-200 px-6">
              <nav className="flex gap-6">
                <button
                  onClick={() => setDetailTab('info')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    detailTab === 'info'
                      ? 'border-admin-primary text-admin-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  User Info
                </button>
                <button
                  onClick={() => setDetailTab('participation')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    detailTab === 'participation'
                      ? 'border-admin-primary text-admin-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Participation
                  <Badge variant="compact" color="neutral" className="ml-1.5">
                    {selectedUser.participationHistory.length}
                  </Badge>
                </button>
              </nav>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {detailTab === 'info' ? (
                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      {/* Edit Mode */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Personal Information</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Full Name</label>
                            <input
                              type="text"
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Email</label>
                            <input
                              type="email"
                              value={editForm.email || ''}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Phone</label>
                            <input
                              type="text"
                              value={editForm.phone || ''}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Position</label>
                            <input
                              type="text"
                              value={editForm.position || ''}
                              onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                              className="input"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* View Mode */}
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Personal Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Name</span>
                            <span className="text-sm text-neutral-950">{selectedUser.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Email</span>
                            <span className="text-sm text-neutral-950">{selectedUser.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Phone</span>
                            <span className="text-sm text-neutral-950">{selectedUser.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Position</span>
                            <span className="text-sm text-neutral-950">{selectedUser.position}</span>
                          </div>
                        </div>
                      </div>

                      {/* Company Affiliations */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Company</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.companies.length > 0 ? (
                            selectedUser.companies.map((company) => (
                              <Badge key={company} variant="compact" color="neutral">
                                {company}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-neutral-400">No company affiliation</span>
                          )}
                        </div>
                      </div>

                      {/* Activity */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Activity</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Registered</span>
                            <span className="text-sm text-neutral-950">{selectedUser.registeredAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Last Active</span>
                            <span className="text-sm text-neutral-950">{selectedUser.lastActiveAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Total Events</span>
                            <span className="text-sm text-neutral-950">{selectedUser.eventCount} events</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="pt-4 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-950">Account Status</p>
                            <p className="text-xs text-neutral-500 mt-0.5">Current status</p>
                          </div>
                          <Badge variant="status" color={getStatusColor(selectedUser.status)}>
                            {selectedUser.status}
                          </Badge>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedUser.participationHistory.length > 0 ? (
                    selectedUser.participationHistory.map((event) => (
                      <div key={event.id} className="p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-950">{event.eventName}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">{event.eventSeriesName}</p>
                          </div>
                          <Badge variant="status" color={getParticipationStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {event.role}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-4 text-sm text-neutral-500">No participation history</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Panel Footer */}
            {detailTab === 'info' && (
              <div className="p-4 border-t border-neutral-100">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn-primary flex-1"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStartEdit}
                    className="btn btn-secondary w-full"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Information
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

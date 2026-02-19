'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Pagination from '@/components/Pagination'
import { Badge } from '@/components/Badge'
import { routes } from '@/lib/routes'

interface Member {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  groups: string[]
  status: 'Active' | 'Pending' | 'Inactive'
  lastActive: string
  joinedAt: string
}

export default function TeamMembersPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Staff')
  const [inviteSent, setInviteSent] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  const [isRoleFilterOpen, setIsRoleFilterOpen] = useState(false)
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)
  const roleFilterRef = useRef<HTMLDivElement>(null)
  const statusFilterRef = useRef<HTMLDivElement>(null)

  // Invite modal role dropdown
  const [isInviteRoleOpen, setIsInviteRoleOpen] = useState(false)
  const inviteRoleRef = useRef<HTMLDivElement>(null)

  const roles = ['Owner', 'Manager', 'Staff']
  const statuses = ['Active', 'Pending', 'Inactive']

  const members: Member[] = [
    {
      id: 'member-1',
      name: 'Bona Lee',
      email: 'bona@micehub.com',
      avatar: '/profile.png',
      role: 'Owner',
      groups: ['Team 1', 'Team 2'],
      status: 'Active',
      lastActive: '2 hours ago',
      joinedAt: 'Jan 15, 2024',
    },
    {
      id: 'member-2',
      name: 'James Kim',
      email: 'james.kim@micehub.com',
      avatar: null,
      role: 'Manager',
      groups: ['Team 1'],
      status: 'Active',
      lastActive: '1 day ago',
      joinedAt: 'Feb 20, 2024',
    },
    {
      id: 'member-3',
      name: 'Sarah Park',
      email: 'sarah.park@micehub.com',
      avatar: null,
      role: 'Manager',
      groups: ['Team 2', 'Team 3'],
      status: 'Active',
      lastActive: '5 hours ago',
      joinedAt: 'Mar 10, 2024',
    },
    {
      id: 'member-4',
      name: 'David Choi',
      email: 'david.choi@micehub.com',
      avatar: null,
      role: 'Staff',
      groups: ['Team 1'],
      status: 'Active',
      lastActive: '3 days ago',
      joinedAt: 'Apr 5, 2024',
    },
    {
      id: 'member-5',
      name: 'Emily Jung',
      email: 'emily.jung@micehub.com',
      avatar: null,
      role: 'Staff',
      groups: ['Team 2'],
      status: 'Pending',
      lastActive: '-',
      joinedAt: 'Jan 20, 2026',
    },
    {
      id: 'member-6',
      name: 'Michael Han',
      email: 'michael.han@micehub.com',
      avatar: null,
      role: 'Staff',
      groups: ['Team 3'],
      status: 'Inactive',
      lastActive: '30 days ago',
      joinedAt: 'May 15, 2024',
    },
    {
      id: 'member-7',
      name: 'Jennifer Yoon',
      email: 'jennifer.yoon@micehub.com',
      avatar: null,
      role: 'Staff',
      groups: ['Team 1', 'Team 3'],
      status: 'Active',
      lastActive: '12 hours ago',
      joinedAt: 'Jun 1, 2024',
    },
    {
      id: 'member-8',
      name: 'Chris Lim',
      email: 'chris.lim@micehub.com',
      avatar: null,
      role: 'Staff',
      groups: ['Team 2'],
      status: 'Pending',
      lastActive: '-',
      joinedAt: 'Jan 22, 2026',
    },
  ]

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = !filterRole || member.role === filterRole
      const matchesStatus = !filterStatus || member.status === filterStatus
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [searchQuery, filterRole, filterStatus])

  const totalPages = Math.ceil(filteredMembers.length / perPage)

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * perPage
    return filteredMembers.slice(start, start + perPage)
  }, [filteredMembers, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterRole, filterStatus])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleFilterRef.current && !roleFilterRef.current.contains(event.target as Node)) {
        setIsRoleFilterOpen(false)
      }
      if (statusFilterRef.current && !statusFilterRef.current.contains(event.target as Node)) {
        setIsStatusFilterOpen(false)
      }
      if (inviteRoleRef.current && !inviteRoleRef.current.contains(event.target as Node)) {
        setIsInviteRoleOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success' as const
      case 'Pending':
        return 'warning' as const
      default:
        return 'neutral' as const
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

  const handleSendInvite = () => {
    setInviteSent(true)
    setTimeout(() => {
      setInviteSent(false)
      setInviteEmail('')
      setShowInviteModal(false)
    }, 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://eventelly.com/invite/${workspaceId}?role=${inviteRole.toLowerCase()}`)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Team Members</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage workspace members and their permissions
          </p>
        </div>
        <button onClick={() => setShowInviteModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by name or email..."
            className="input max-w-sm"
          />
        </div>
        {/* Role Filter */}
        <div className="relative w-36" ref={roleFilterRef}>
          <button
            type="button"
            onClick={() => setIsRoleFilterOpen(!isRoleFilterOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            <span className={filterRole ? 'text-neutral-950' : 'text-neutral-500'}>
              {filterRole || 'All Roles'}
            </span>
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isRoleFilterOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <button
                type="button"
                onClick={() => { setFilterRole(''); setIsRoleFilterOpen(false) }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 ${!filterRole ? 'bg-admin-primary-50 text-admin-primary-700' : 'text-neutral-800'}`}
              >
                All Roles
              </button>
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => { setFilterRole(role); setIsRoleFilterOpen(false) }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 ${filterRole === role ? 'bg-admin-primary-50 text-admin-primary-700' : 'text-neutral-800'}`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Status Filter */}
        <div className="relative w-36" ref={statusFilterRef}>
          <button
            type="button"
            onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            <span className={filterStatus ? 'text-neutral-950' : 'text-neutral-500'}>
              {filterStatus || 'All Status'}
            </span>
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isStatusFilterOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <button
                type="button"
                onClick={() => { setFilterStatus(''); setIsStatusFilterOpen(false) }}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 ${!filterStatus ? 'bg-admin-primary-50 text-admin-primary-700' : 'text-neutral-800'}`}
              >
                All Status
              </button>
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => { setFilterStatus(status); setIsStatusFilterOpen(false) }}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 ${filterStatus === status ? 'bg-admin-primary-50 text-admin-primary-700' : 'text-neutral-800'}`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Members Table */}
      <div className="card">
        <div className="px-5 py-3 border-b border-neutral-100">
          <span className="text-sm text-neutral-500">Total <span className="font-medium text-neutral-800">{filteredMembers.length}</span> members</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Groups</th>
              <th>Status</th>
              <th>Last Active</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMembers.map((member) => (
              <tr key={member.id}>
                <td>
                  <div className="flex items-center gap-3">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-admin-primary-100 flex items-center justify-center text-admin-primary-700 font-semibold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-neutral-950">{member.name}</p>
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
                  <div className="flex flex-wrap gap-1">
                    {member.groups.slice(0, 2).map((group) => (
                      <span key={group} className="inline-flex px-2 py-0.5 text-xs bg-neutral-100 text-neutral-600 rounded">
                        {group}
                      </span>
                    ))}
                    {member.groups.length > 2 && (
                      <span className="inline-flex px-2 py-0.5 text-xs bg-neutral-100 text-neutral-500 rounded">
                        +{member.groups.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <Badge variant="status" color={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </td>
                <td>
                  <span className="text-sm text-neutral-500">{member.lastActive}</span>
                </td>
                <td className="text-right">
                  <Link
                    href={ws.team.members.detail(member.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:text-admin-primary-700 hover:bg-neutral-100 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {paginatedMembers.length === 0 && (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-4 text-sm text-neutral-500">No members found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredMembers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={filteredMembers.length}
            perPage={perPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowInviteModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Invite Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {inviteSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-status-success-bg flex items-center justify-center">
                  <svg className="w-8 h-8 text-status-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-neutral-950">Invitation Sent!</p>
                <p className="text-sm text-neutral-500 mt-1">An email has been sent to {inviteEmail}</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="label">Email address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="input"
                  />
                </div>

                {/* Role Select */}
                <div>
                  <label className="label">Role</label>
                  <div className="relative" ref={inviteRoleRef}>
                    <button
                      type="button"
                      onClick={() => setIsInviteRoleOpen(!isInviteRoleOpen)}
                      className="w-full input text-left flex items-center justify-between pr-4"
                    >
                      <span className="text-neutral-950 flex-1">{inviteRole}</span>
                      <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isInviteRoleOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                        <div className="py-1">
                          {['Manager', 'Staff'].map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => { setInviteRole(role); setIsInviteRoleOpen(false) }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${inviteRole === role ? 'bg-admin-primary-50' : ''}`}
                            >
                              <span className="text-sm text-neutral-800">{role}</span>
                              {inviteRole === role && (
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
                    {inviteRole === 'Manager' ? 'Can manage events, members, and settings' : 'Can view and edit assigned events only'}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-3">
                  <button
                    onClick={handleSendInvite}
                    disabled={!inviteEmail}
                    className={`btn btn-primary w-full ${!inviteEmail ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Invitation Email
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-neutral-400">or</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="btn btn-secondary w-full"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {linkCopied ? 'Link Copied!' : 'Copy Invitation Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

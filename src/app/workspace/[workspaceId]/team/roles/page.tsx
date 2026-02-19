'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'
import { Badge } from '@/components/Badge'

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  memberCount: number
  isSystem: boolean // Owner, Staff - cannot view/edit permissions
  isDefault: boolean // Manager - can view but shows as default
  workspacePermissions: string[]
  eventPermissions: string[]
  color: string
}

export default function RolesPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  // Workspace-level permissions
  const workspacePermissions: Permission[] = [
    // Event Series
    { id: 'ws.series.view', name: 'View Event Series', description: 'View event series list and details', category: 'Event Series' },
    { id: 'ws.series.create', name: 'Create Event Series', description: 'Create new event series', category: 'Event Series' },
    { id: 'ws.series.edit', name: 'Edit Event Series', description: 'Edit event series settings', category: 'Event Series' },
    { id: 'ws.series.delete', name: 'Delete Event Series', description: 'Delete event series', category: 'Event Series' },
    // Events
    { id: 'ws.events.view', name: 'View Events', description: 'View events list', category: 'Events' },
    { id: 'ws.events.create', name: 'Create Events', description: 'Create new events', category: 'Events' },
    { id: 'ws.events.delete', name: 'Delete Events', description: 'Delete events', category: 'Events' },
    // Members (Participants)
    { id: 'ws.members.view', name: 'View Members', description: 'View participant member list', category: 'Members' },
    { id: 'ws.members.edit', name: 'Edit Members', description: 'Edit participant member info', category: 'Members' },
    { id: 'ws.members.export', name: 'Export Members', description: 'Export member data', category: 'Members' },
    // Team
    { id: 'ws.team.view', name: 'View Team', description: 'View team members and groups', category: 'Team' },
    { id: 'ws.team.invite', name: 'Invite Team Members', description: 'Invite new team members', category: 'Team' },
    { id: 'ws.team.edit', name: 'Edit Team Members', description: 'Edit team member roles and permissions', category: 'Team' },
    { id: 'ws.team.remove', name: 'Remove Team Members', description: 'Remove team members from workspace', category: 'Team' },
    // Settings
    { id: 'ws.settings.view', name: 'View Settings', description: 'View workspace settings', category: 'Settings' },
    { id: 'ws.settings.edit', name: 'Edit Settings', description: 'Edit workspace settings', category: 'Settings' },
    // Payment
    { id: 'ws.payment.view', name: 'View Payment', description: 'View payment history and methods', category: 'Payment' },
    { id: 'ws.payment.manage', name: 'Manage Payment', description: 'Add/edit payment methods and subscriptions', category: 'Payment' },
  ]

  // Event Console-level permissions
  const eventPermissions: Permission[] = [
    // Event Settings
    { id: 'ev.settings.view', name: 'View Event Settings', description: 'View event basic info and settings', category: 'Event Settings' },
    { id: 'ev.settings.edit', name: 'Edit Event Settings', description: 'Edit event basic info and settings', category: 'Event Settings' },
    { id: 'ev.publish', name: 'Publish Event', description: 'Publish and unpublish event', category: 'Event Settings' },
    // Participants
    { id: 'ev.participants.view', name: 'View Participants', description: 'View event participants', category: 'Participants' },
    { id: 'ev.participants.manage', name: 'Manage Participants', description: 'Approve, reject, edit participants', category: 'Participants' },
    { id: 'ev.participants.export', name: 'Export Participants', description: 'Export participant data', category: 'Participants' },
    { id: 'ev.participants.checkin', name: 'Check-in Participants', description: 'Perform on-site check-in', category: 'Participants' },
    // Programs
    { id: 'ev.programs.view', name: 'View Programs', description: 'View event programs and sessions', category: 'Programs' },
    { id: 'ev.programs.edit', name: 'Edit Programs', description: 'Create and edit programs', category: 'Programs' },
    // Content
    { id: 'ev.content.view', name: 'View Content', description: 'View event content and pages', category: 'Content' },
    { id: 'ev.content.edit', name: 'Edit Content', description: 'Edit event content and pages', category: 'Content' },
    // Website
    { id: 'ev.website.view', name: 'View Website', description: 'View website settings', category: 'Website' },
    { id: 'ev.website.edit', name: 'Edit Website', description: 'Edit website settings and design', category: 'Website' },
    // Analytics
    { id: 'ev.analytics.view', name: 'View Analytics', description: 'View event statistics and reports', category: 'Analytics' },
    { id: 'ev.analytics.export', name: 'Export Analytics', description: 'Export analytics data', category: 'Analytics' },
    // Communications
    { id: 'ev.comms.view', name: 'View Communications', description: 'View email and notification history', category: 'Communications' },
    { id: 'ev.comms.send', name: 'Send Communications', description: 'Send emails and notifications', category: 'Communications' },
  ]

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full access to all workspace features and settings. Cannot be modified.',
      memberCount: 1,
      isSystem: true,
      isDefault: true,
      workspacePermissions: [],
      eventPermissions: [],
      color: 'bg-purple-600',
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Full management access to events, members, and settings. Cannot be modified.',
      memberCount: 3,
      isSystem: true,
      isDefault: true,
      workspacePermissions: [],
      eventPermissions: [],
      color: 'bg-blue-600',
    },
    {
      id: 'staff',
      name: 'Staff',
      description: 'Limited access to assigned event series only',
      memberCount: 8,
      isSystem: false,
      isDefault: true,
      workspacePermissions: [
        'ws.series.view',
        'ws.events.view',
        'ws.members.view',
        'ws.team.view',
      ],
      eventPermissions: [
        'ev.settings.view',
        'ev.participants.view', 'ev.participants.checkin',
        'ev.programs.view',
        'ev.content.view',
        'ev.website.view',
        'ev.analytics.view',
        'ev.comms.view',
      ],
      color: 'bg-neutral-500',
    },
  ])

  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [activePermissionTab, setActivePermissionTab] = useState<'workspace' | 'event'>('workspace')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    workspacePermissions: [] as string[],
    eventPermissions: [] as string[]
  })
  const [newRolePermissionTab, setNewRolePermissionTab] = useState<'workspace' | 'event'>('workspace')

  const getWorkspaceCategories = () => [...new Set(workspacePermissions.map(p => p.category))]
  const getEventCategories = () => [...new Set(eventPermissions.map(p => p.category))]

  const getWorkspacePermissionsByCategory = (category: string) => {
    return workspacePermissions.filter(p => p.category === category)
  }

  const getEventPermissionsByCategory = (category: string) => {
    return eventPermissions.filter(p => p.category === category)
  }

  const hasWorkspacePermission = (role: Role, permissionId: string) => {
    return role.workspacePermissions.includes(permissionId)
  }

  const hasEventPermission = (role: Role, permissionId: string) => {
    return role.eventPermissions.includes(permissionId)
  }

  const toggleWorkspacePermission = (permissionId: string) => {
    if (!selectedRole || selectedRole.isSystem || selectedRole.isDefault) return

    const updatedRoles = roles.map(role => {
      if (role.id === selectedRole.id) {
        const newPermissions = role.workspacePermissions.includes(permissionId)
          ? role.workspacePermissions.filter(p => p !== permissionId)
          : [...role.workspacePermissions, permissionId]
        const updatedRole = { ...role, workspacePermissions: newPermissions }
        setSelectedRole(updatedRole)
        return updatedRole
      }
      return role
    })
    setRoles(updatedRoles)
  }

  const toggleEventPermission = (permissionId: string) => {
    if (!selectedRole || selectedRole.isSystem || selectedRole.isDefault) return

    const updatedRoles = roles.map(role => {
      if (role.id === selectedRole.id) {
        const newPermissions = role.eventPermissions.includes(permissionId)
          ? role.eventPermissions.filter(p => p !== permissionId)
          : [...role.eventPermissions, permissionId]
        const updatedRole = { ...role, eventPermissions: newPermissions }
        setSelectedRole(updatedRole)
        return updatedRole
      }
      return role
    })
    setRoles(updatedRoles)
  }

  const toggleNewRoleWorkspacePermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      workspacePermissions: prev.workspacePermissions.includes(permissionId)
        ? prev.workspacePermissions.filter(p => p !== permissionId)
        : [...prev.workspacePermissions, permissionId]
    }))
  }

  const toggleNewRoleEventPermission = (permissionId: string) => {
    setNewRole(prev => ({
      ...prev,
      eventPermissions: prev.eventPermissions.includes(permissionId)
        ? prev.eventPermissions.filter(p => p !== permissionId)
        : [...prev.eventPermissions, permissionId]
    }))
  }

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return

    const colors = ['bg-indigo-600', 'bg-teal-600', 'bg-amber-600', 'bg-rose-600', 'bg-cyan-600', 'bg-lime-600']
    const newRoleData: Role = {
      id: newRole.name.toLowerCase().replace(/\s+/g, '-'),
      name: newRole.name,
      description: newRole.description,
      memberCount: 0,
      isSystem: false,
      isDefault: false,
      workspacePermissions: newRole.workspacePermissions,
      eventPermissions: newRole.eventPermissions,
      color: colors[roles.length % colors.length],
    }
    setRoles([...roles, newRoleData])
    setNewRole({ name: '', description: '', workspacePermissions: [], eventPermissions: [] })
    setShowCreateModal(false)
  }

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)
    if (role?.isSystem || role?.isDefault) {
      alert('System and default roles cannot be deleted')
      return
    }
    if (role?.memberCount && role.memberCount > 0) {
      alert('Cannot delete a role that has members assigned. Please reassign members first.')
      return
    }
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId))
      if (selectedRole?.id === roleId) {
        setSelectedRole(null)
      }
    }
  }

  const canEditPermissions = (role: Role) => {
    return !role.isSystem && !role.isDefault
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Roles & Permissions</h1>
          <p className="mt-1 text-sm text-neutral-500">Define roles and manage permissions for team members</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-neutral-950 mb-4">Roles</h3>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedRole?.id === role.id
                      ? 'bg-admin-primary-50 border-2 border-admin-primary-200'
                      : 'bg-neutral-50 hover:bg-neutral-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${role.color}`}>
                      {role.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-neutral-950">{role.name}</p>
                        {role.isSystem && (
                          <Badge variant="compact" color="neutral">System</Badge>
                        )}
                        {!role.isSystem && role.isDefault && (
                          <Badge variant="compact" color="primary">Default</Badge>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{role.memberCount} members</p>
                    </div>
                  </div>
                  {!role.isSystem && !role.isDefault && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteRole(role.id) }}
                      className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Permissions Panel */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg ${selectedRole.color}`}>
                      {selectedRole.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-950">{selectedRole.name}</h3>
                      <p className="text-sm text-neutral-500">{selectedRole.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System roles - no permission editing */}
              {selectedRole.isSystem ? (
                <div className="bg-neutral-50 rounded-lg p-8 text-center">
                  <svg className="w-12 h-12 mx-auto text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h4 className="mt-4 text-base font-medium text-neutral-950">System Role</h4>
                  <p className="mt-2 text-sm text-neutral-500">
                    {selectedRole.id === 'owner'
                      ? 'Owner has full access to all features. Permissions cannot be viewed or modified.'
                      : 'Manager has full management access to events, members, and settings. Permissions cannot be viewed or modified.'}
                  </p>
                </div>
              ) : (
                <>
                  {/* Permission Tabs */}
                  <div className="border-b border-neutral-200 mb-6">
                    <nav className="flex gap-6">
                      <button
                        onClick={() => setActivePermissionTab('workspace')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                          activePermissionTab === 'workspace'
                            ? 'border-admin-primary text-admin-primary-700'
                            : 'border-transparent text-neutral-500 hover:text-neutral-800'
                        }`}
                      >
                        Workspace Permissions
                      </button>
                      <button
                        onClick={() => setActivePermissionTab('event')}
                        className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                          activePermissionTab === 'event'
                            ? 'border-admin-primary text-admin-primary-700'
                            : 'border-transparent text-neutral-500 hover:text-neutral-800'
                        }`}
                      >
                        Event Console Permissions
                      </button>
                    </nav>
                  </div>

                  {selectedRole.isDefault && (
                    <div className="mb-4 px-3 py-2 bg-status-warning-bg text-status-warning-text text-sm rounded-md">
                      This is a default role. Permissions can be viewed but not modified.
                    </div>
                  )}

                  {/* Workspace Permissions */}
                  {activePermissionTab === 'workspace' && (
                    <div className="space-y-6">
                      {getWorkspaceCategories().map((category) => (
                        <div key={category}>
                          <h4 className="text-sm font-semibold text-neutral-950 mb-3">{category}</h4>
                          <div className="space-y-2">
                            {getWorkspacePermissionsByCategory(category).map((permission) => (
                              <label
                                key={permission.id}
                                className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
                                  !canEditPermissions(selectedRole)
                                    ? 'cursor-not-allowed bg-neutral-50 border-neutral-100'
                                    : 'cursor-pointer hover:bg-neutral-50 border-neutral-200'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={hasWorkspacePermission(selectedRole, permission.id)}
                                    onChange={() => toggleWorkspacePermission(permission.id)}
                                    disabled={!canEditPermissions(selectedRole)}
                                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500 disabled:opacity-50"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-neutral-950">{permission.name}</p>
                                    <p className="text-xs text-neutral-500">{permission.description}</p>
                                  </div>
                                </div>
                                {hasWorkspacePermission(selectedRole, permission.id) && (
                                  <svg className="w-5 h-5 text-status-success-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Event Console Permissions */}
                  {activePermissionTab === 'event' && (
                    <div className="space-y-6">
                      {getEventCategories().map((category) => (
                        <div key={category}>
                          <h4 className="text-sm font-semibold text-neutral-950 mb-3">{category}</h4>
                          <div className="space-y-2">
                            {getEventPermissionsByCategory(category).map((permission) => (
                              <label
                                key={permission.id}
                                className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
                                  !canEditPermissions(selectedRole)
                                    ? 'cursor-not-allowed bg-neutral-50 border-neutral-100'
                                    : 'cursor-pointer hover:bg-neutral-50 border-neutral-200'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={hasEventPermission(selectedRole, permission.id)}
                                    onChange={() => toggleEventPermission(permission.id)}
                                    disabled={!canEditPermissions(selectedRole)}
                                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500 disabled:opacity-50"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-neutral-950">{permission.name}</p>
                                    <p className="text-xs text-neutral-500">{permission.description}</p>
                                  </div>
                                </div>
                                {hasEventPermission(selectedRole, permission.id) && (
                                  <svg className="w-5 h-5 text-status-success-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Members with this role */}
              <div className="mt-8 pt-6 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-neutral-950">Members with this role</h4>
                  <Link
                    href={`${ws.team.members.list()}?role=${selectedRole.name}`}
                    className="text-sm text-admin-primary-700 hover:text-admin-primary-800 font-medium"
                  >
                    View all
                  </Link>
                </div>
                <p className="text-sm text-neutral-500">
                  <span className="font-medium text-neutral-800">{selectedRole.memberCount}</span> team members have this role
                </p>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-neutral-950">Select a role</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Click on a role from the list to view and manage its permissions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Role Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCreateModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Create Custom Role</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="label">Role Name <span className="text-form-required">*</span></label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="e.g., Event Coordinator"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Describe what this role can do"
                  rows={2}
                  className="input resize-none"
                />
              </div>
            </div>

            {/* Permission Tabs in Modal */}
            <div className="border-t border-neutral-100 pt-6">
              <div className="border-b border-neutral-200 mb-4">
                <nav className="flex gap-6">
                  <button
                    onClick={() => setNewRolePermissionTab('workspace')}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                      newRolePermissionTab === 'workspace'
                        ? 'border-admin-primary text-admin-primary-700'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Workspace Permissions
                  </button>
                  <button
                    onClick={() => setNewRolePermissionTab('event')}
                    className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                      newRolePermissionTab === 'event'
                        ? 'border-admin-primary text-admin-primary-700'
                        : 'border-transparent text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    Event Console Permissions
                  </button>
                </nav>
              </div>

              {/* Workspace Permissions in Modal */}
              {newRolePermissionTab === 'workspace' && (
                <div className="space-y-6 max-h-64 overflow-y-auto">
                  {getWorkspaceCategories().map((category) => (
                    <div key={category}>
                      <h5 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">{category}</h5>
                      <div className="space-y-1">
                        {getWorkspacePermissionsByCategory(category).map((permission) => (
                          <label
                            key={permission.id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={newRole.workspacePermissions.includes(permission.id)}
                              onChange={() => toggleNewRoleWorkspacePermission(permission.id)}
                              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-neutral-950">{permission.name}</p>
                              <p className="text-xs text-neutral-500">{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Event Permissions in Modal */}
              {newRolePermissionTab === 'event' && (
                <div className="space-y-6 max-h-64 overflow-y-auto">
                  {getEventCategories().map((category) => (
                    <div key={category}>
                      <h5 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">{category}</h5>
                      <div className="space-y-1">
                        {getEventPermissionsByCategory(category).map((permission) => (
                          <label
                            key={permission.id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-neutral-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={newRole.eventPermissions.includes(permission.id)}
                              onChange={() => toggleNewRoleEventPermission(permission.id)}
                              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-neutral-950">{permission.name}</p>
                              <p className="text-xs text-neutral-500">{permission.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-100">
              <button onClick={() => setShowCreateModal(false)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={handleCreateRole}
                disabled={!newRole.name.trim()}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

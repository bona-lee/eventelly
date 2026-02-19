'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'
import { Badge } from '@/components/Badge'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  seriesCount: number
  createdAt: string
  color: string
}

export default function GroupsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  const [groups, setGroups] = useState<Group[]>([
    { id: '1', name: 'Team 1', description: 'Seoul Living Design Fair team', memberCount: 8, seriesCount: 3, createdAt: 'Jan 15, 2024', color: 'bg-blue-600' },
    { id: '2', name: 'Team 2', description: 'Busan Living Design Fair team', memberCount: 5, seriesCount: 2, createdAt: 'Feb 10, 2024', color: 'bg-purple-600' },
    { id: '3', name: 'Team 3', description: 'Marketing & PR', memberCount: 4, seriesCount: 5, createdAt: 'Mar 5, 2024', color: 'bg-orange-600' },
    { id: '4', name: 'Team 4', description: 'Operations', memberCount: 6, seriesCount: 4, createdAt: 'Mar 20, 2024', color: 'bg-green-600' },
    { id: '5', name: 'Team 5', description: 'VIP & Partner Management', memberCount: 3, seriesCount: 2, createdAt: 'Apr 1, 2024', color: 'bg-rose-600' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: '', description: '' })

  const filteredGroups = useMemo(() => {
    return groups.filter(g =>
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [groups, searchQuery])

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) return

    const colors = ['bg-blue-600', 'bg-purple-600', 'bg-orange-600', 'bg-green-600', 'bg-rose-600', 'bg-indigo-600', 'bg-amber-600', 'bg-teal-600']
    const newGroupData: Group = {
      id: String(groups.length + 1),
      name: newGroup.name,
      description: newGroup.description,
      memberCount: 0,
      seriesCount: 0,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: colors[groups.length % colors.length],
    }
    setGroups([...groups, newGroupData])
    setNewGroup({ name: '', description: '' })
    setShowCreateModal(false)
  }

  const handleDeleteGroup = (groupId: string) => {
    if (confirm('Are you sure you want to delete this group?')) {
      setGroups(groups.filter(g => g.id !== groupId))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Groups</h1>
          <p className="mt-1 text-sm text-neutral-500">Organize team members into groups for easier management</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Group
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search groups..."
          className="input max-w-sm"
        />
      </div>

      {/* Groups Table */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Group</th>
              <th>Description</th>
              <th>Members</th>
              <th>Event Series</th>
              <th>Created</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${group.color}`}>
                      {group.name.charAt(0)}
                    </div>
                    <Link
                      href={ws.team.groups.detail(group.id)}
                      className="text-sm font-medium text-neutral-950 hover:text-admin-primary-700"
                    >
                      {group.name}
                    </Link>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-neutral-500">{group.description || '-'}</span>
                </td>
                <td>
                  <Badge variant="status" color="neutral" className="gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {group.memberCount}
                  </Badge>
                </td>
                <td>
                  <Badge variant="status" color="primary" className="gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {group.seriesCount}
                  </Badge>
                </td>
                <td>
                  <span className="text-sm text-neutral-500">{group.createdAt}</span>
                </td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={ws.team.groups.detail(group.id)}
                      className="p-2 text-neutral-400 hover:text-admin-primary-700 hover:bg-admin-primary-50 rounded-md transition-colors"
                      title="View group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                      title="Delete group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredGroups.length === 0 && (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-4 text-sm text-neutral-500">
              {searchQuery ? 'No groups found matching your search' : 'No groups created yet'}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowCreateModal(true)} className="btn btn-primary mt-4">
                Create your first group
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCreateModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Create Group</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Group Name <span className="text-form-required">*</span></label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  placeholder="e.g., Marketing Team"
                  className="input"
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  placeholder="Optional description for this group"
                  rows={3}
                  className="input resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!newGroup.name.trim()}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

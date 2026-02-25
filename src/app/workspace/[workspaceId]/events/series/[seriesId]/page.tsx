'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'
import { routes } from '@/lib/routes'

interface SeriesEvent {
  id: string
  name: string
  year: string
  date: string
  dateSort: string
  location: string
  status: string
  image: string | null
  siteUrl: string
}

export default function SeriesDetailPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const seriesId = params.seriesId as string
  const ws = routes.workspace(workspaceId)

  const [activeTab, setActiveTab] = useState('basic')
  const tabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'events', label: 'Event List' },
  ]

  const allGroups = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5']
  const [selectedGroup, setSelectedGroup] = useState('')
  const [isGroupOpen, setIsGroupOpen] = useState(false)
  const groupRef = useRef<HTMLDivElement>(null)
  const [sortField, setSortField] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const [series, setSeries] = useState({
    id: 'sldf',
    name: 'Seoul Living Design Fair',
    code: 'sldf',
    description: 'Annual living & interior design fair in Seoul. The largest design fair in Korea featuring furniture, interior, kitchen, and lifestyle products.',
    groups: ['Team 1', 'Team 2'],
    active: true,
  })

  const availableGroups = allGroups.filter(g => !series.groups.includes(g))

  const addGroup = (group: string) => {
    if (group && !series.groups.includes(group)) {
      setSeries({ ...series, groups: [...series.groups, group] })
      setSelectedGroup('')
    }
  }

  const removeGroup = (group: string) => {
    setSeries({ ...series, groups: series.groups.filter(g => g !== group) })
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (groupRef.current && !groupRef.current.contains(event.target as Node)) {
        setIsGroupOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSave = () => {
    alert('Changes saved successfully!')
  }

  const seriesEvents: SeriesEvent[] = [
    {
      id: 'sldf-2026',
      name: 'Seoul Living Design Fair 2026',
      year: '2026',
      date: 'Mar 14 - 17, 2026',
      dateSort: '2026-03-14',
      location: 'COEX, Seoul',
      status: 'Upcoming',
      image: '/sldf.png',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2025',
      name: 'Seoul Living Design Fair 2025',
      year: '2025',
      date: 'Mar 15 - 18, 2025',
      dateSort: '2025-03-15',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2024',
      name: 'Seoul Living Design Fair 2024',
      year: '2024',
      date: 'Mar 16 - 19, 2024',
      dateSort: '2024-03-16',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2023',
      name: 'Seoul Living Design Fair 2023',
      year: '2023',
      date: 'Mar 17 - 20, 2023',
      dateSort: '2023-03-17',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2022',
      name: 'Seoul Living Design Fair 2022',
      year: '2022',
      date: 'Mar 18 - 21, 2022',
      dateSort: '2022-03-18',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2021',
      name: 'Seoul Living Design Fair 2021',
      year: '2021',
      date: 'Mar 19 - 22, 2021',
      dateSort: '2021-03-19',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2020',
      name: 'Seoul Living Design Fair 2020',
      year: '2020',
      date: 'Cancelled',
      dateSort: '2020-03-20',
      location: 'COEX, Seoul',
      status: 'Cancelled',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2019',
      name: 'Seoul Living Design Fair 2019',
      year: '2019',
      date: 'Mar 21 - 24, 2019',
      dateSort: '2019-03-21',
      location: 'COEX, Seoul',
      status: 'Completed',
      image: null,
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
  ]

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const sortedSeriesEvents = [...seriesEvents].sort((a, b) => {
    let aVal: string
    let bVal: string

    if (sortField === 'date') {
      aVal = a.dateSort
      bVal = b.dateSort
    } else {
      aVal = a.status.toLowerCase()
      bVal = b.status.toLowerCase()
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'primary' as const
      case 'Ongoing':
        return 'info' as const
      case 'Completed':
        return 'neutral' as const
      case 'Cancelled':
        return 'error' as const
      case 'Draft':
        return 'neutral' as const
      default:
        return 'neutral' as const
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href={ws.events.series.list()}
          className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-800 mb-4"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event Series
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-admin-primary-700 flex items-center justify-center text-white font-bold text-xl">
              {series.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-950">{series.name}</h1>
              <p className="mt-1 text-sm text-neutral-500">
                <code className="font-mono text-neutral-400">{series.code}</code>
              </p>
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
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content: Basic Info */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="space-y-5">
              {/* Series Name */}
              <div>
                <label className="label">Series Name</label>
                <input
                  type="text"
                  value={series.name}
                  onChange={(e) => setSeries({ ...series, name: e.target.value })}
                  className="input"
                />
              </div>

              {/* Series Code (readonly) */}
              <div>
                <label className="label">Series Code</label>
                <input
                  type="text"
                  value={series.code}
                  className="input font-mono bg-neutral-50 text-neutral-500 cursor-not-allowed"
                  disabled
                />
                <p className="mt-1 text-xs text-neutral-400">Series code cannot be changed</p>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description <span className="text-neutral-400 font-normal">(optional)</span></label>
                <textarea
                  value={series.description}
                  onChange={(e) => setSeries({ ...series, description: e.target.value })}
                  rows={3}
                  className="input resize-none"
                  placeholder="Brief description of this event series"
                ></textarea>
              </div>

              {/* Assigned Groups */}
              <div>
                <label className="label">Assigned Groups</label>
                <div className="space-y-3">
                  {/* Selected Groups as Tags */}
                  <div className="flex flex-wrap gap-2 min-h-[36px]">
                    {series.groups.map((group) => (
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
                    {series.groups.length === 0 && (
                      <span className="text-sm text-neutral-400 py-1.5">
                        No groups assigned
                      </span>
                    )}
                  </div>
                  {/* Dropdown to Add Groups */}
                  <div className="relative" ref={groupRef}>
                    <button
                      type="button"
                      onClick={() => setIsGroupOpen(!isGroupOpen)}
                      className="w-full input text-left flex items-center justify-between pr-4"
                      disabled={availableGroups.length === 0}
                    >
                      <span className="text-neutral-500 flex-1">Select a group to add...</span>
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

              {/* Active Status */}
              <div className="flex items-center justify-between pt-5 border-t border-neutral-100">
                <div>
                  <p className="text-sm font-medium text-neutral-800">Active Status</p>
                  <p className="text-xs text-neutral-400 mt-0.5">Enable or disable this series</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={series.active}
                    onChange={(e) => setSeries({ ...series, active: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Link href={ws.events.series.list()} className="btn btn-secondary">
              Cancel
            </Link>
            <button onClick={handleSave} className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Event List */}
      {activeTab === 'events' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-neutral-500">{seriesEvents.length} events in this series</p>
            <button className="btn btn-primary">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Event
            </button>
          </div>

          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Code</th>
                  <th>
                    <button
                      onClick={() => toggleSort('date')}
                      className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
                    >
                      Date
                      <span className="flex flex-col">
                        <svg
                          className={`w-3 h-3 -mb-1 ${sortField === 'date' && sortOrder === 'asc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                        <svg
                          className={`w-3 h-3 ${sortField === 'date' && sortOrder === 'desc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </span>
                    </button>
                  </th>
                  <th>Location</th>
                  <th>
                    <button
                      onClick={() => toggleSort('status')}
                      className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
                    >
                      Status
                      <span className="flex flex-col">
                        <svg
                          className={`w-3 h-3 -mb-1 ${sortField === 'status' && sortOrder === 'asc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 14l5-5 5 5H7z" />
                        </svg>
                        <svg
                          className={`w-3 h-3 ${sortField === 'status' && sortOrder === 'desc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7 10l5 5 5-5H7z" />
                        </svg>
                      </span>
                    </button>
                  </th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedSeriesEvents.map((event) => (
                  <tr key={event.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                          {event.image ? (
                             
                            <img
                              src={event.image}
                              alt={event.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-admin-primary-600 to-admin-primary-800 text-white font-bold text-sm">
                              {event.year.slice(-2)}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-neutral-950">{event.name}</span>
                      </div>
                    </td>
                    <td>
                      <code className="text-sm font-mono text-neutral-500">{event.id}</code>
                    </td>
                    <td>
                      <span className="text-sm text-neutral-600">{event.date}</span>
                    </td>
                    <td>
                      <span className="text-sm text-neutral-600">{event.location}</span>
                    </td>
                    <td>
                      <Badge variant="status" color={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={ws.event(event.id).root()}
                          className="px-3 py-1.5 text-xs font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors"
                        >
                          Console
                        </Link>
                        <a
                          href={event.siteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors inline-flex items-center gap-1"
                        >
                          Website
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {seriesEvents.length === 0 && (
              <div className="p-12 text-center">
                <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-sm text-neutral-500">No events in this series yet</p>
                <button className="btn btn-primary mt-4">Create First Event</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

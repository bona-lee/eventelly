'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'
import { Badge } from '@/components/Badge'
import { routes } from '@/lib/routes'

interface Series {
  id: string
  name: string
  code: string
  groups: string[]
  initial: string
  color: string
  eventCount: number
  lastEvent: string
  lastEventDate: string
  active: boolean
}

export default function EventSeriesPage() {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGroup, setFilterGroup] = useState('')
  const [sortField, setSortField] = useState<string>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  // Filter dropdown state
  const [isFilterGroupOpen, setIsFilterGroupOpen] = useState(false)
  const filterGroupRef = useRef<HTMLDivElement>(null)

  // Modal group dropdown state
  const [isModalGroupOpen, setIsModalGroupOpen] = useState(false)
  const modalGroupRef = useRef<HTMLDivElement>(null)

  const [newSeries, setNewSeries] = useState({
    name: '',
    code: '',
    groups: [] as string[],
    description: '',
  })
  const [selectedNewGroup, setSelectedNewGroup] = useState('')

  const groupList = ['Team 1', 'Team 2', 'Team 3', 'Team 4', 'Team 5']

  const availableNewGroups = useMemo(() => {
    return groupList.filter(g => !newSeries.groups.includes(g))
  }, [newSeries.groups])

  const addNewSeriesGroup = () => {
    if (selectedNewGroup && !newSeries.groups.includes(selectedNewGroup)) {
      setNewSeries({ ...newSeries, groups: [...newSeries.groups, selectedNewGroup] })
      setSelectedNewGroup('')
    }
  }

  const removeNewSeriesGroup = (group: string) => {
    setNewSeries({ ...newSeries, groups: newSeries.groups.filter(g => g !== group) })
  }

  const eventSeries: Series[] = [
    {
      id: 'sldf',
      name: 'Seoul Living Design Fair',
      code: 'sldf',
      groups: ['Team 1', 'Team 2'],
      initial: 'S',
      color: 'bg-admin-primary-700',
      eventCount: 8,
      lastEvent: 'Mar 2026',
      lastEventDate: '2026-03',
      active: true,
    },
    {
      id: 'sdf',
      name: 'Seoul Design Festival',
      code: 'sdf',
      groups: ['Team 1'],
      initial: 'S',
      color: 'bg-purple-600',
      eventCount: 5,
      lastEvent: 'Dec 2026',
      lastEventDate: '2026-12',
      active: true,
    },
    {
      id: 'bldf',
      name: 'Busan Living Design Fair',
      code: 'bldf',
      groups: ['Team 2', 'Team 3'],
      initial: 'B',
      color: 'bg-blue-600',
      eventCount: 4,
      lastEvent: 'Apr 2026',
      lastEventDate: '2026-04',
      active: true,
    },
    {
      id: 'kdw',
      name: 'Korea Design Week',
      code: 'kdw',
      groups: ['Team 2'],
      initial: 'K',
      color: 'bg-indigo-600',
      eventCount: 3,
      lastEvent: 'May 2026',
      lastEventDate: '2026-05',
      active: true,
    },
    {
      id: 'mldf',
      name: 'Magok Living Design Fair',
      code: 'mldf',
      groups: ['Team 3'],
      initial: 'M',
      color: 'bg-orange-600',
      eventCount: 2,
      lastEvent: 'May 2026',
      lastEventDate: '2026-05',
      active: false,
    },
    {
      id: 'idf',
      name: 'Interior Design Fair',
      code: 'idf',
      groups: ['Team 3', 'Team 4'],
      initial: 'I',
      color: 'bg-amber-600',
      eventCount: 6,
      lastEvent: 'Jun 2026',
      lastEventDate: '2026-06',
      active: true,
    },
    {
      id: 'fdf',
      name: 'Furniture Design Fair',
      code: 'fdf',
      groups: ['Team 4', 'Team 5'],
      initial: 'F',
      color: 'bg-rose-600',
      eventCount: 4,
      lastEvent: 'Jul 2026',
      lastEventDate: '2026-07',
      active: true,
    },
  ]

  const filteredSeries = useMemo(() => {
    let result = eventSeries.filter(series => {
      const matchesSearch = series.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGroup = !filterGroup || series.groups.includes(filterGroup)
      return matchesSearch && matchesGroup
    })

    if (sortField) {
      result = [...result].sort((a, b) => {
        let aVal = a[sortField as keyof Series]
        let bVal = b[sortField as keyof Series]

        if (typeof aVal === 'string') aVal = aVal.toLowerCase()
        if (typeof bVal === 'string') bVal = bVal.toLowerCase()

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    }

    return result
  }, [searchQuery, filterGroup, sortField, sortOrder])

  const totalPages = Math.ceil(filteredSeries.length / perPage)

  const sortedAndFilteredSeries = useMemo(() => {
    const start = (currentPage - 1) * perPage
    const end = start + perPage
    return filteredSeries.slice(start, end)
  }, [filteredSeries, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterGroup])

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const goToDetail = (seriesId: string) => {
    router.push(ws.events.series.detail(seriesId))
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    setShowCreateModal(false)
    setNewSeries({ name: '', code: '', groups: [], description: '' })
    setSelectedNewGroup('')
  }

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterGroupRef.current && !filterGroupRef.current.contains(event.target as Node)) {
        setIsFilterGroupOpen(false)
      }
      if (modalGroupRef.current && !modalGroupRef.current.contains(event.target as Node)) {
        setIsModalGroupOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Event Series</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage recurring event brands
          </p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Series
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by series name..."
            className="input max-w-sm"
          />
        </div>
        {/* Group Filter Dropdown */}
        <div className="relative w-44" ref={filterGroupRef}>
          <button
            type="button"
            onClick={() => setIsFilterGroupOpen(!isFilterGroupOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            {filterGroup ? (
              <span className="text-neutral-950 flex-1 truncate">{filterGroup}</span>
            ) : (
              <span className="text-neutral-500 flex-1">All Groups</span>
            )}
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterGroupOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterGroup(''); setIsFilterGroupOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterGroup === '' ? 'bg-admin-primary-50' : ''}`}
                >
                  <span className="text-sm text-neutral-800">All Groups</span>
                  {filterGroup === '' && (
                    <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {groupList.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => { setFilterGroup(group); setIsFilterGroupOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterGroup === group ? 'bg-admin-primary-50' : ''}`}
                  >
                    {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative group tag */}
                    <span className="inline-flex px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded">{group}</span>
                    {filterGroup === group && (
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

      {/* Series List */}
      <div className="card">
        {/* Total Count Header */}
        <div className="px-5 py-3 border-b border-neutral-100">
          <span className="text-sm text-neutral-500">Total <span className="font-medium text-neutral-800">{filteredSeries.length}</span> series</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => toggleSort('name')}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
                >
                  Series Name
                  <span className="flex flex-col">
                    <svg
                      className={`w-3 h-3 -mb-1 ${sortField === 'name' && sortOrder === 'asc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                    <svg
                      className={`w-3 h-3 ${sortField === 'name' && sortOrder === 'desc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </button>
              </th>
              <th>
                Series Code
              </th>
              <th>
                Assigned Group
              </th>
              <th>
                <button
                  onClick={() => toggleSort('eventCount')}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
                >
                  Events
                  <span className="flex flex-col">
                    <svg
                      className={`w-3 h-3 -mb-1 ${sortField === 'eventCount' && sortOrder === 'asc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                    <svg
                      className={`w-3 h-3 ${sortField === 'eventCount' && sortOrder === 'desc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </button>
              </th>
              <th>
                <button
                  onClick={() => toggleSort('lastEventDate')}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 uppercase tracking-wider hover:text-neutral-700"
                >
                  Last Event
                  <span className="flex flex-col">
                    <svg
                      className={`w-3 h-3 -mb-1 ${sortField === 'lastEventDate' && sortOrder === 'asc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5H7z" />
                    </svg>
                    <svg
                      className={`w-3 h-3 ${sortField === 'lastEventDate' && sortOrder === 'desc' ? 'text-admin-primary-700' : 'text-neutral-300'}`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5H7z" />
                    </svg>
                  </span>
                </button>
              </th>
              <th>
                Status
              </th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredSeries.map((series) => (
              <tr
                key={series.id}
                className="cursor-pointer"
                onClick={() => goToDetail(series.id)}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-white font-bold text-sm ${series.color}`}
                    >
                      {series.initial}
                    </div>
                    <p className="text-sm font-medium text-neutral-950 hover:text-admin-primary-700">{series.name}</p>
                  </div>
                </td>
                <td>
                  <code className="px-2 py-0.5 text-xs font-mono bg-neutral-100 text-neutral-600 rounded">{series.code}</code>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {series.groups.map((group) => (
                      <span
                        key={group}
                        // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative group tag
                        className="inline-flex px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className="text-sm text-neutral-800">{series.eventCount}</span>
                </td>
                <td>
                  <span className="text-sm text-neutral-500">{series.lastEvent}</span>
                </td>
                <td>
                  <Badge variant="status" color={series.active ? 'primary' : 'neutral'}>
                    {series.active ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="text-right" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={ws.events.series.detail(series.id)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded transition-colors inline-flex"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {sortedAndFilteredSeries.length === 0 && (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="mt-4 text-sm text-neutral-500">No series found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredSeries.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={filteredSeries.length}
            perPage={perPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCreateModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold text-neutral-950 mb-5">Create Event Series</h3>
            <form onSubmit={handleCreate} className="space-y-5">
              {/* Series Name */}
              <div>
                <label htmlFor="seriesName" className="label">Series Name</label>
                <input
                  id="seriesName"
                  value={newSeries.name}
                  onChange={(e) => setNewSeries({ ...newSeries, name: e.target.value })}
                  type="text"
                  required
                  className="input"
                  placeholder="Seoul Living Design Fair"
                />
              </div>

              {/* Series Code */}
              <div>
                <label htmlFor="seriesCode" className="label">Series Code</label>
                <input
                  id="seriesCode"
                  value={newSeries.code}
                  onChange={(e) => setNewSeries({ ...newSeries, code: e.target.value })}
                  type="text"
                  required
                  maxLength={8}
                  pattern="[a-z]+"
                  className="input font-mono"
                  placeholder="sldf"
                />
                <p className="mt-1 text-xs text-neutral-400">8 characters max, lowercase letters only</p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="seriesDesc" className="label">Description <span className="text-neutral-400 font-normal">(optional)</span></label>
                <textarea
                  id="seriesDesc"
                  value={newSeries.description}
                  onChange={(e) => setNewSeries({ ...newSeries, description: e.target.value })}
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
                    {newSeries.groups.map((group) => (
                      <span
                        key={group}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-primary-50 text-admin-primary-700 rounded-md text-sm font-medium"
                      >
                        {group}
                        <button
                          type="button"
                          onClick={() => removeNewSeriesGroup(group)}
                          className="p-0.5 hover:bg-admin-primary-100 rounded transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    {newSeries.groups.length === 0 && (
                      <span className="text-sm text-neutral-400 py-1.5">
                        No groups assigned
                      </span>
                    )}
                  </div>
                  {/* Dropdown to Add Groups */}
                  <div className="relative" ref={modalGroupRef}>
                    <button
                      type="button"
                      onClick={() => setIsModalGroupOpen(!isModalGroupOpen)}
                      className="w-full input text-left flex items-center justify-between pr-4"
                      disabled={availableNewGroups.length === 0}
                    >
                      <span className="text-neutral-500 flex-1">Select a group to add...</span>
                      <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isModalGroupOpen && availableNewGroups.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                        <div className="py-1">
                          {availableNewGroups.map((group) => (
                            <button
                              key={group}
                              type="button"
                              onClick={() => {
                                setNewSeries({ ...newSeries, groups: [...newSeries.groups, group] })
                                setIsModalGroupOpen(false)
                              }}
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

              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

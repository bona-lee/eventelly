'use client'

import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/Badge'

type ViewMode = 'list' | 'settings'

interface Speaker {
  id: string
  name: string
  title: string
  company: string
  bio: string
  photoUrl?: string
  email?: string
}

interface Session {
  id: string
  title: string
  description: string
  type: 'keynote' | 'panel' | 'workshop' | 'presentation' | 'networking'
  track?: string
  date: string
  startTime: string
  endTime: string
  venue: string
  room?: string
  speakers: Speaker[]
  capacity: number | null
  registeredCount: number
  requiresRegistration: boolean
  isPublished: boolean
  tags: string[]
}

interface SessionSettings {
  enableRegistration: boolean
  allowWaitlist: boolean
  showSpeakerProfiles: boolean
  showSessionMaterials: boolean
  allowSessionFeedback: boolean
  feedbackFormId?: string
  registrationDeadlineHours: number
  cancellationDeadlineHours: number
  sendReminders: boolean
  reminderHoursBefore: number[]
  defaultCapacity: number
  tracks: string[]
  venues: { id: string; name: string; rooms: string[] }[]
}

const SESSION_TYPES = [
  { value: 'keynote', label: 'Keynote', color: 'purple' as const },
  { value: 'panel', label: 'Panel Discussion', color: 'blue' as const },
  { value: 'workshop', label: 'Workshop', color: 'green' as const },
  { value: 'presentation', label: 'Presentation', color: 'orange' as const },
  { value: 'networking', label: 'Networking', color: 'pink' as const },
]

const INITIAL_SPEAKERS: Speaker[] = [
  { id: 'spk-1', name: 'Dr. Sarah Kim', title: 'Chief Design Officer', company: 'Design Future Lab', bio: 'Award-winning designer with 20 years of experience in sustainable design.' },
  { id: 'spk-2', name: 'Michael Chen', title: 'Founder & CEO', company: 'EcoHome Innovations', bio: 'Pioneer in eco-friendly home solutions and smart living technologies.' },
  { id: 'spk-3', name: 'Emma Johnson', title: 'Head of Research', company: 'Living Trends Institute', bio: 'Leading researcher in consumer behavior and living space trends.' },
  { id: 'spk-4', name: 'Prof. James Park', title: 'Professor of Architecture', company: 'Seoul National University', bio: 'Expert in modern Korean architecture and space design.' },
  { id: 'spk-5', name: 'Lisa Wang', title: 'Creative Director', company: 'Nordic Living Co.', bio: 'Specialist in Scandinavian design principles for Asian markets.' },
]

const INITIAL_SESSIONS: Session[] = [
  {
    id: 'sess-1',
    title: 'Opening Keynote: The Future of Living Design',
    description: 'Join us for an inspiring keynote on how design is shaping the future of living spaces, from sustainable materials to smart home integration.',
    type: 'keynote',
    track: 'Main Stage',
    date: '2026-03-15',
    startTime: '10:00',
    endTime: '11:00',
    venue: 'COEX Hall A',
    room: 'Grand Ballroom',
    speakers: [INITIAL_SPEAKERS[0]],
    capacity: 500,
    registeredCount: 423,
    requiresRegistration: true,
    isPublished: true,
    tags: ['design', 'future', 'sustainability'],
  },
  {
    id: 'sess-2',
    title: 'Panel: Sustainable Materials in Modern Furniture',
    description: 'Industry experts discuss the latest innovations in sustainable materials and their applications in furniture design.',
    type: 'panel',
    track: 'Sustainability',
    date: '2026-03-15',
    startTime: '13:00',
    endTime: '14:30',
    venue: 'COEX Hall A',
    room: 'Conference Room A',
    speakers: [INITIAL_SPEAKERS[1], INITIAL_SPEAKERS[2], INITIAL_SPEAKERS[4]],
    capacity: 150,
    registeredCount: 142,
    requiresRegistration: true,
    isPublished: true,
    tags: ['sustainability', 'materials', 'furniture'],
  },
  {
    id: 'sess-3',
    title: 'Workshop: Smart Home Integration Basics',
    description: 'A hands-on workshop covering the fundamentals of smart home technology integration in residential spaces.',
    type: 'workshop',
    track: 'Technology',
    date: '2026-03-15',
    startTime: '15:00',
    endTime: '17:00',
    venue: 'COEX Hall B',
    room: 'Workshop Room 1',
    speakers: [INITIAL_SPEAKERS[1]],
    capacity: 30,
    registeredCount: 30,
    requiresRegistration: true,
    isPublished: true,
    tags: ['smart home', 'technology', 'workshop'],
  },
  {
    id: 'sess-4',
    title: 'Korean Architecture: Tradition Meets Modernity',
    description: 'Explore how traditional Korean architectural principles are being reinterpreted in contemporary design.',
    type: 'presentation',
    track: 'Main Stage',
    date: '2026-03-16',
    startTime: '11:00',
    endTime: '12:00',
    venue: 'COEX Hall A',
    room: 'Grand Ballroom',
    speakers: [INITIAL_SPEAKERS[3]],
    capacity: 300,
    registeredCount: 189,
    requiresRegistration: true,
    isPublished: true,
    tags: ['architecture', 'korean design', 'tradition'],
  },
  {
    id: 'sess-5',
    title: 'Networking Lunch: Designers & Manufacturers',
    description: 'Connect with fellow designers and manufacturers over lunch. A great opportunity to build partnerships.',
    type: 'networking',
    track: 'Networking',
    date: '2026-03-16',
    startTime: '12:30',
    endTime: '14:00',
    venue: 'COEX Hall A',
    room: 'Networking Lounge',
    speakers: [],
    capacity: 100,
    registeredCount: 78,
    requiresRegistration: true,
    isPublished: true,
    tags: ['networking', 'lunch'],
  },
  {
    id: 'sess-6',
    title: 'Scandinavian Design Principles for Asian Living',
    description: 'How to adapt Scandinavian design aesthetics to Asian living environments and consumer preferences.',
    type: 'presentation',
    track: 'Design Trends',
    date: '2026-03-17',
    startTime: '10:00',
    endTime: '11:00',
    venue: 'COEX Hall A',
    room: 'Conference Room B',
    speakers: [INITIAL_SPEAKERS[4]],
    capacity: 120,
    registeredCount: 45,
    requiresRegistration: true,
    isPublished: false,
    tags: ['scandinavian', 'asian market', 'design'],
  },
]

const INITIAL_SETTINGS: SessionSettings = {
  enableRegistration: true,
  allowWaitlist: true,
  showSpeakerProfiles: true,
  showSessionMaterials: true,
  allowSessionFeedback: true,
  feedbackFormId: 'form-feedback-1',
  registrationDeadlineHours: 24,
  cancellationDeadlineHours: 48,
  sendReminders: true,
  reminderHoursBefore: [24, 1],
  defaultCapacity: 100,
  tracks: ['Main Stage', 'Sustainability', 'Technology', 'Design Trends', 'Networking'],
  venues: [
    { id: 'venue-1', name: 'COEX Hall A', rooms: ['Grand Ballroom', 'Conference Room A', 'Conference Room B', 'Networking Lounge'] },
    { id: 'venue-2', name: 'COEX Hall B', rooms: ['Workshop Room 1', 'Workshop Room 2', 'Seminar Room'] },
  ],
}

export default function SessionsSettingsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-neutral-950">Sessions</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage conference sessions, speakers, and schedules</p>
        </div>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'settings' : 'list')}
          className="btn btn-secondary"
        >
          {viewMode === 'list' ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Session List
            </>
          )}
        </button>
      </div>

      {viewMode === 'list' ? <SessionListView /> : <SessionSettingsView />}
    </div>
  )
}

// ============ Session List View ============
function SessionListView() {
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS)
  const [speakers] = useState<Speaker[]>(INITIAL_SPEAKERS)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterTrack, setFilterTrack] = useState<string>('all')
  const [filterDate, setFilterDate] = useState<string>('all')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  const [formData, setFormData] = useState<Partial<Session>>({
    title: '',
    description: '',
    type: 'presentation',
    track: '',
    date: '',
    startTime: '',
    endTime: '',
    venue: 'COEX Hall A',
    room: '',
    speakers: [],
    capacity: 100,
    requiresRegistration: true,
    isPublished: false,
    tags: [],
  })

  const [newTag, setNewTag] = useState('')
  const [selectedSpeakerIds, setSelectedSpeakerIds] = useState<string[]>([])

  // Dropdown states
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const typeDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const uniqueDates = Array.from(new Set(sessions.map((s) => s.date))).sort()
  const uniqueTracks = Array.from(new Set(sessions.map((s) => s.track).filter(Boolean))) as string[]

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          session.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || session.type === filterType
    const matchesTrack = filterTrack === 'all' || session.track === filterTrack
    const matchesDate = filterDate === 'all' || session.date === filterDate
    return matchesSearch && matchesType && matchesTrack && matchesDate
  })

  const getTypeInfo = (type: string) => {
    return SESSION_TYPES.find((t) => t.value === type) || SESSION_TYPES[3]
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const handleOpenCreate = () => {
    setFormData({
      title: '',
      description: '',
      type: 'presentation',
      track: uniqueTracks[0] || '',
      date: uniqueDates[0] || '',
      startTime: '10:00',
      endTime: '11:00',
      venue: 'COEX Hall A',
      room: '',
      speakers: [],
      capacity: 100,
      requiresRegistration: true,
      isPublished: false,
      tags: [],
    })
    setSelectedSpeakerIds([])
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (session: Session) => {
    setSelectedSession(session)
    setFormData({
      title: session.title,
      description: session.description,
      type: session.type,
      track: session.track,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      venue: session.venue,
      room: session.room,
      speakers: session.speakers,
      capacity: session.capacity,
      requiresRegistration: session.requiresRegistration,
      isPublished: session.isPublished,
      tags: session.tags,
    })
    setSelectedSpeakerIds(session.speakers.map((s) => s.id))
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const selectedSpeakers = speakers.filter((s) => selectedSpeakerIds.includes(s.id))
    const newSession: Session = {
      id: `sess-${Date.now()}`,
      title: formData.title || '',
      description: formData.description || '',
      type: formData.type || 'presentation',
      track: formData.track,
      date: formData.date || '',
      startTime: formData.startTime || '',
      endTime: formData.endTime || '',
      venue: formData.venue || '',
      room: formData.room,
      speakers: selectedSpeakers,
      capacity: formData.capacity || null,
      registeredCount: 0,
      requiresRegistration: formData.requiresRegistration ?? true,
      isPublished: formData.isPublished ?? false,
      tags: formData.tags || [],
    }
    setSessions([...sessions, newSession])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedSession) return
    const selectedSpeakers = speakers.filter((s) => selectedSpeakerIds.includes(s.id))
    setSessions(
      sessions.map((s) =>
        s.id === selectedSession.id
          ? {
              ...s,
              title: formData.title || s.title,
              description: formData.description || s.description,
              type: formData.type || s.type,
              track: formData.track,
              date: formData.date || s.date,
              startTime: formData.startTime || s.startTime,
              endTime: formData.endTime || s.endTime,
              venue: formData.venue || s.venue,
              room: formData.room,
              speakers: selectedSpeakers,
              capacity: formData.capacity ?? null,
              requiresRegistration: formData.requiresRegistration ?? s.requiresRegistration,
              isPublished: formData.isPublished ?? s.isPublished,
              tags: formData.tags || s.tags,
            }
          : s
      )
    )
    setIsEditModalOpen(false)
    setSelectedSession(null)
  }

  const handleTogglePublish = (id: string) => {
    setSessions(sessions.map((s) => (s.id === id ? { ...s, isPublished: !s.isPublished } : s)))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      setSessions(sessions.filter((s) => s.id !== id))
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...(formData.tags || []), newTag.trim()] })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: (formData.tags || []).filter((t) => t !== tag) })
  }

  const handleToggleSpeaker = (speakerId: string) => {
    if (selectedSpeakerIds.includes(speakerId)) {
      setSelectedSpeakerIds(selectedSpeakerIds.filter((id) => id !== speakerId))
    } else {
      setSelectedSpeakerIds([...selectedSpeakerIds, speakerId])
    }
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Total Sessions</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{sessions.length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Published</p>
          <p className="text-2xl font-bold text-status-success-border mt-1">{sessions.filter((s) => s.isPublished).length}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Total Registrations</p>
          <p className="text-2xl font-bold text-admin-primary-600 mt-1">{sessions.reduce((sum, s) => sum + s.registeredCount, 0)}</p>
        </div>
        <div className="card p-4">
          <p className="text-sm text-neutral-500">Speakers</p>
          {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI stat */}
          <p className="text-2xl font-bold text-purple-600 mt-1">{speakers.length}</p>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-64"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input"
          >
            <option value="all">All Types</option>
            {SESSION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* Track Filter */}
          <select
            value={filterTrack}
            onChange={(e) => setFilterTrack(e.target.value)}
            className="input"
          >
            <option value="all">All Tracks</option>
            {uniqueTracks.map((track) => (
              <option key={track} value={track}>{track}</option>
            ))}
          </select>

          {/* Date Filter */}
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="input"
          >
            <option value="all">All Dates</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>{formatDate(date)}</option>
            ))}
          </select>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Session
        </button>
      </div>

      {/* Session List */}
      <div className="space-y-3">
        {filteredSessions.map((session) => {
          const typeInfo = getTypeInfo(session.type)
          const capacityPercentage = session.capacity
            ? Math.round((session.registeredCount / session.capacity) * 100)
            : 0

          return (
            <div key={session.id} className={`card p-4 ${!session.isPublished ? 'border-l-4 border-l-status-warning-solid' : ''}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-base font-semibold text-neutral-950">{session.title}</h3>
                    <Badge variant="category" color={typeInfo.color}>{typeInfo.label}</Badge>
                    {!session.isPublished && (
                      <Badge variant="status" color="warning">Draft</Badge>
                    )}
                  </div>

                  <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{session.description}</p>

                  <div className="flex items-center gap-6 text-sm">
                    {/* Date & Time */}
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(session.date)} | {session.startTime} - {session.endTime}
                    </div>

                    {/* Venue */}
                    <div className="flex items-center gap-1.5 text-neutral-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {session.venue}{session.room && ` - ${session.room}`}
                    </div>

                    {/* Track */}
                    {session.track && (
                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {session.track}
                      </div>
                    )}

                    {/* Speakers */}
                    {session.speakers.length > 0 && (
                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {session.speakers.map((s) => s.name).join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Capacity */}
                  {session.capacity && session.requiresRegistration && (
                    <div className="mt-3 max-w-xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-neutral-500">Registrations</span>
                        <span className="font-medium text-neutral-950">
                          {session.registeredCount} / {session.capacity}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            capacityPercentage >= 100 ? 'bg-status-error-solid' : capacityPercentage >= 80 ? 'bg-status-warning-solid' : 'bg-admin-primary-500'
                          }`}
                          style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleTogglePublish(session.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      session.isPublished
                        ? 'bg-status-success-bg text-status-success-text hover:bg-status-success-bg'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {session.isPublished ? 'Published' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleOpenEdit(session)}
                    className="p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        {filteredSessions.length === 0 && (
          <div className="card p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-neutral-500 mb-4">No sessions found</p>
            <button onClick={handleOpenCreate} className="btn btn-primary">
              Add First Session
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">
                {isEditModalOpen ? 'Edit Session' : 'Create Session'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedSession(null)
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Session Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input"
                  placeholder="e.g., Opening Keynote: The Future of Design"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[100px]"
                  placeholder="Session description..."
                />
              </div>

              {/* Type & Track */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Type</label>
                  <div className="relative" ref={typeDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                      className="w-full input text-left flex items-center justify-between pr-4"
                    >
                      <span className="text-neutral-950">{getTypeInfo(formData.type || 'presentation').label}</span>
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isTypeDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                        <div className="py-1">
                          {SESSION_TYPES.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, type: type.value as Session['type'] })
                                setIsTypeDropdownOpen(false)
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                                formData.type === type.value ? 'bg-admin-primary-50' : ''
                              }`}
                            >
                              <span className="text-sm text-neutral-800">{type.label}</span>
                              {formData.type === type.value && (
                                <svg className="w-4 h-4 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
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
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Track</label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="input"
                  >
                    {uniqueTracks.map((track) => (
                      <option key={track} value={track}>{track}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Venue</label>
                  <select
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="input"
                  >
                    <option value="COEX Hall A">COEX Hall A</option>
                    <option value="COEX Hall B">COEX Hall B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Room</label>
                  <input
                    type="text"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="input"
                    placeholder="e.g., Conference Room A"
                  />
                </div>
              </div>

              {/* Speakers */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Speakers</label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-neutral-200 rounded-lg p-3">
                  {speakers.map((speaker) => (
                    <label key={speaker.id} className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-md cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSpeakerIds.includes(speaker.id)}
                        onChange={() => handleToggleSpeaker(speaker.id)}
                        className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                      />
                      <div>
                        <p className="text-sm font-medium text-neutral-950">{speaker.name}</p>
                        <p className="text-xs text-neutral-500">{speaker.title}, {speaker.company}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity & Registration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value ? Number(e.target.value) : null })}
                    className="input"
                    placeholder="Unlimited"
                    min="1"
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiresRegistration}
                      onChange={(e) => setFormData({ ...formData, requiresRegistration: e.target.checked })}
                      className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                    />
                    <span className="text-sm text-neutral-950">Requires Registration</span>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.tags || []).map((tag) => (
                    <Badge key={tag} variant="tag" className="gap-1">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} className="text-neutral-400 hover:text-neutral-600">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="input flex-1"
                    placeholder="Add a tag..."
                  />
                  <button type="button" onClick={handleAddTag} className="btn btn-secondary">Add</button>
                </div>
              </div>

              {/* Publish */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isPublished ? 'bg-status-success-solid' : 'bg-neutral-200'
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    style={{ transform: formData.isPublished ? 'translateX(24px)' : 'translateX(4px)' }}
                  />
                </button>
                <span className="text-sm text-neutral-950">Publish immediately</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedSession(null)
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleUpdate : handleCreate}
                disabled={!formData.title?.trim() || !formData.date || !formData.startTime}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditModalOpen ? 'Save Changes' : 'Create Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ Session Settings View ============
function SessionSettingsView() {
  const [settings, setSettings] = useState<SessionSettings>(INITIAL_SETTINGS)
  const [hasChanges, setHasChanges] = useState(false)
  const [newTrack, setNewTrack] = useState('')
  const [newVenueName, setNewVenueName] = useState('')

  const handleChange = (field: keyof SessionSettings, value: any) => {
    setSettings({ ...settings, [field]: value })
    setHasChanges(true)
  }

  const handleAddTrack = () => {
    if (newTrack.trim() && !settings.tracks.includes(newTrack.trim())) {
      handleChange('tracks', [...settings.tracks, newTrack.trim()])
      setNewTrack('')
    }
  }

  const handleRemoveTrack = (track: string) => {
    handleChange('tracks', settings.tracks.filter((t) => t !== track))
  }

  const handleAddVenue = () => {
    if (newVenueName.trim()) {
      handleChange('venues', [...settings.venues, { id: `venue-${Date.now()}`, name: newVenueName.trim(), rooms: [] }])
      setNewVenueName('')
    }
  }

  const handleRemoveVenue = (venueId: string) => {
    handleChange('venues', settings.venues.filter((v) => v.id !== venueId))
  }

  const handleSave = () => {
    setHasChanges(false)
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-3xl">
      {/* Registration Settings */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Registration Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableRegistration}
              onChange={(e) => handleChange('enableRegistration', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Enable Session Registration</span>
              <p className="text-xs text-neutral-500">Allow attendees to register for individual sessions</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowWaitlist}
              onChange={(e) => handleChange('allowWaitlist', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Allow Waitlist</span>
              <p className="text-xs text-neutral-500">Enable waitlist when session reaches capacity</p>
            </div>
          </label>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-neutral-950 mb-2">Registration Deadline</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.registrationDeadlineHours}
                  onChange={(e) => handleChange('registrationDeadlineHours', Number(e.target.value))}
                  className="input w-24"
                  min="0"
                />
                <span className="text-sm text-neutral-500">hours before session</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-950 mb-2">Cancellation Deadline</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.cancellationDeadlineHours}
                  onChange={(e) => handleChange('cancellationDeadlineHours', Number(e.target.value))}
                  className="input w-24"
                  min="0"
                />
                <span className="text-sm text-neutral-500">hours before session</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Default Capacity</label>
            <input
              type="number"
              value={settings.defaultCapacity}
              onChange={(e) => handleChange('defaultCapacity', Number(e.target.value))}
              className="input w-32"
              min="1"
            />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Display Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showSpeakerProfiles}
              onChange={(e) => handleChange('showSpeakerProfiles', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Show Speaker Profiles</span>
              <p className="text-xs text-neutral-500">Display speaker bios and photos on session pages</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.showSessionMaterials}
              onChange={(e) => handleChange('showSessionMaterials', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Show Session Materials</span>
              <p className="text-xs text-neutral-500">Allow speakers to upload and share presentation materials</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowSessionFeedback}
              onChange={(e) => handleChange('allowSessionFeedback', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Allow Session Feedback</span>
              <p className="text-xs text-neutral-500">Enable attendees to leave feedback after sessions</p>
            </div>
          </label>
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Reminder Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.sendReminders}
              onChange={(e) => handleChange('sendReminders', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Send Session Reminders</span>
              <p className="text-xs text-neutral-500">Automatically send reminders to registered attendees</p>
            </div>
          </label>

          {settings.sendReminders && (
            <div>
              <label className="block text-sm font-medium text-neutral-950 mb-2">Reminder Times</label>
              <div className="flex flex-wrap gap-2">
                {settings.reminderHoursBefore.map((hours, index) => (
                  <Badge key={index} variant="status" color="neutral" onRemove={() => handleChange('reminderHoursBefore', settings.reminderHoursBefore.filter((_, i) => i !== index))}>
                    {hours} hour{hours > 1 ? 's' : ''} before
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tracks */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Session Tracks</h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {settings.tracks.map((track) => (
              <span key={track} className="inline-flex items-center gap-2 px-3 py-1.5 bg-admin-primary-50 text-admin-primary-700 rounded-md text-sm">
                {track}
                <button type="button" onClick={() => handleRemoveTrack(track)} className="text-admin-primary-400 hover:text-admin-primary-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTrack}
              onChange={(e) => setNewTrack(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTrack())}
              className="input flex-1 max-w-xs"
              placeholder="Add new track..."
            />
            <button type="button" onClick={handleAddTrack} className="btn btn-secondary">Add</button>
          </div>
        </div>
      </div>

      {/* Venues */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Venues</h3>
        <div className="space-y-3">
          {settings.venues.map((venue) => (
            <div key={venue.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
              <div>
                <p className="text-sm font-medium text-neutral-950">{venue.name}</p>
                <p className="text-xs text-neutral-500">{venue.rooms.length} rooms</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveVenue(venue.id)}
                className="p-1 text-neutral-400 hover:text-destructive-text"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              value={newVenueName}
              onChange={(e) => setNewVenueName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddVenue())}
              className="input flex-1 max-w-xs"
              placeholder="Add new venue..."
            />
            <button type="button" onClick={handleAddVenue} className="btn btn-secondary">Add</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

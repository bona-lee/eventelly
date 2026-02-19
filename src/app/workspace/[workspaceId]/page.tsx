'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'
import { Badge } from '@/components/Badge'

interface Event {
  id: string
  name: string
  date: string
  location: string
  status: string
  image: string | null
  gradient: string
}

interface Activity {
  id: number
  description: string
  time: string
  iconBg: string
  iconColor: string
  iconPath: string
}

export default function WorkspaceHomePage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  const [showBanner, setShowBanner] = useState(true)
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: '',
    startDate: '',
    endDate: '',
    location: '',
  })

  const events: Event[] = [
    {
      id: 'sldf-2026',
      name: 'Seoul Living Design Fair 2026',
      date: 'Mar 14-17, 2026',
      location: 'COEX, Seoul',
      status: 'Upcoming',
      image: '/sldf.png',
      gradient: 'bg-gradient-to-br from-admin-primary-600 to-admin-primary-800',
    },
    {
      id: 'sdf-2026',
      name: 'Seoul Design Festival 2026',
      date: 'Dec 3-6, 2026',
      location: 'DDP, Seoul',
      status: 'Draft',
      image: '/sdf.png',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
    },
    {
      id: 'bldf-2026',
      name: 'Busan Living Design Fair 2026',
      date: 'Apr 21-24, 2026',
      location: 'BEXCO, Busan',
      status: 'Upcoming',
      image: null,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
    },
    {
      id: 'kdw-2026',
      name: 'Korea Design Week 2026',
      date: 'May 8-12, 2026',
      location: 'SETEC, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
    },
    {
      id: 'idf-2026',
      name: 'Interior Design Fair 2026',
      date: 'Jun 5-8, 2026',
      location: 'KINTEX, Goyang',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-amber-500 to-amber-700',
    },
    {
      id: 'fdf-2026',
      name: 'Furniture Design Fair 2026',
      date: 'Jul 10-13, 2026',
      location: 'COEX, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-rose-500 to-rose-700',
    },
    {
      id: 'mldf-2026',
      name: 'Magok Living Design Fair 2026',
      date: 'May 15-18, 2026',
      location: 'SJ Kunsthalle, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
    },
    {
      id: 'gdf-2026',
      name: 'Graphic Design Festival 2026',
      date: 'Aug 20-23, 2026',
      location: 'DDP, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-700',
    },
    {
      id: 'pde-2026',
      name: 'Product Design Expo 2026',
      date: 'Sep 11-14, 2026',
      location: 'COEX, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    },
    {
      id: 'jdf-2026',
      name: 'Jeju Design Fair 2026',
      date: 'Oct 2-5, 2026',
      location: 'ICC Jeju',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-teal-500 to-teal-700',
    },
    {
      id: 'adf-2026',
      name: 'Asian Design Forum 2026',
      date: 'Oct 18-20, 2026',
      location: 'COEX, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-violet-500 to-violet-700',
    },
    {
      id: 'sdaw-2026',
      name: 'Seoul Design Awards 2026',
      date: 'Nov 5-7, 2026',
      location: 'DDP, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-700',
    },
    {
      id: 'wdf-2026',
      name: 'Winter Design Fair 2026',
      date: 'Nov 20-23, 2026',
      location: 'SETEC, Seoul',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-sky-500 to-sky-700',
    },
    {
      id: 'ydc-2026',
      name: 'Young Designers Collection 2026',
      date: 'Dec 10-13, 2026',
      location: 'KINTEX, Goyang',
      status: 'Draft',
      image: null,
      gradient: 'bg-gradient-to-br from-pink-500 to-pink-700',
    },
  ]

  const displayedEvents = showAllEvents ? events : events.slice(0, 9)

  const recentActivities: Activity[] = [
    {
      id: 1,
      description: 'New exhibitor registered for Seoul Living Design Fair 2026',
      time: '10 minutes ago',
      iconBg: 'bg-admin-primary/10',
      iconColor: 'text-admin-primary-700',
      iconPath: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    },
    {
      id: 2,
      description: 'Booth layout updated for Hall A',
      time: '1 hour ago',
      iconBg: 'bg-status-info-bg',
      iconColor: 'text-status-info-border',
      iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    },
    {
      id: 3,
      description: '15 new visitor registrations for Seoul Living Design Fair 2026',
      time: '3 hours ago',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-600',
      iconPath: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    },
    {
      id: 4,
      description: 'Invoice sent to ABC Furniture Co.',
      time: 'Yesterday',
      iconBg: 'bg-status-success-bg',
      iconColor: 'text-status-success-border',
      iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'primary-solid' as const
      case 'Draft':
        return 'neutral' as const
      case 'Completed':
        return 'dark' as const
      default:
        return 'neutral' as const
    }
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    setShowCreateEventModal(false)
    setNewEvent({ name: '', startDate: '', endDate: '', location: '' })
  }

  return (
    <div>
      {/* Promotion Banner */}
      {showBanner && (
        <div className="mb-6 rounded-lg bg-admin-primary-100 border border-admin-primary-200 p-5 relative">
          <button
            type="button"
            onClick={() => setShowBanner(false)}
            className="absolute top-3 right-3 p-1 rounded-md text-admin-primary-400 hover:text-admin-primary-600 hover:bg-admin-primary-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-md bg-admin-primary-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-admin-primary-900">Apply for Beta Access</p>
              <p className="text-xs text-admin-primary-700/70 mt-0.5">Be the first to try Eventelly&apos;s new features and receive exclusive benefits for early participants.</p>
              <button className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-white bg-admin-primary-700 hover:bg-admin-primary-800 rounded-md transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Workspace Home</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your events and team
          </p>
        </div>
        <button onClick={() => setShowCreateEventModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Event
        </button>
      </div>

      {/* Events Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-950">Events</h2>
          {!showAllEvents ? (
            <button
              onClick={() => setShowAllEvents(true)}
              className="text-sm text-admin-primary-700 hover:text-admin-primary-800 font-medium"
            >
              View all ({events.length})
            </button>
          ) : (
            <button
              onClick={() => setShowAllEvents(false)}
              className="text-sm text-neutral-500 hover:text-neutral-700 font-medium"
            >
              Show less
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedEvents.map((event) => (
            <div
              key={event.id}
              className="card overflow-hidden hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex">
                {/* Event Poster (Square) */}
                <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${event.gradient}`}
                    >
                      <span className="text-2xl font-bold text-white/30">{event.name.charAt(0)}</span>
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="flex-1 p-3 flex flex-col min-w-0">
                  {/* Status Badge */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-neutral-950 leading-tight line-clamp-2">
                      {event.name}
                    </h3>
                    <Badge variant="compact" color={getStatusColor(event.status)} className="flex-shrink-0">
                      {event.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 text-xs text-neutral-500">
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{event.location}</span>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2 mt-auto pt-2">
                    <Link
                      href={ws.event(event.id).root()}
                      className="flex-1 px-2 py-1.5 text-xs font-medium text-center text-white bg-admin-primary-700 hover:bg-admin-primary-800 rounded-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Console
                    </Link>
                    <a
                      href={`/events/${event.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-2 py-1.5 text-xs font-medium text-center text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Go to Site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-neutral-950 mb-4">Recent Activity</h2>
        <div className="card divide-y divide-neutral-50">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="p-4 flex items-center gap-4"
            >
              <div
                className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}
              >
                <svg className={`w-4 h-4 ${activity.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.iconPath} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-800">{activity.description}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateEventModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowCreateEventModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold text-neutral-950 mb-5">Create New Event</h3>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label htmlFor="eventName" className="label">Event name</label>
                <input
                  id="eventName"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  type="text"
                  required
                  className="input"
                  placeholder="Seoul Design Week 2026"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="label">Start date</label>
                  <input
                    id="startDate"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    type="date"
                    required
                    className="input"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="label">End date</label>
                  <input
                    id="endDate"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    type="date"
                    required
                    className="input"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="label">Location</label>
                <input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  type="text"
                  required
                  className="input"
                  placeholder="COEX, Seoul"
                />
              </div>
              <div className="flex gap-3 pt-3">
                <button type="button" onClick={() => setShowCreateEventModal(false)} className="btn btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

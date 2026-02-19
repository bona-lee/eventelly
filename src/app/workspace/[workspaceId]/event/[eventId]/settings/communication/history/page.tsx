'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Badge, type StatusColor } from '@/components/Badge'

type NotificationChannel = 'email' | 'sms' | 'in_app'
type SendingStatus = 'sent' | 'delivered' | 'failed' | 'pending'

interface SendingRecord {
  id: string
  templateId: string
  templateName: string
  triggerId: string
  triggerName: string
  channel: NotificationChannel
  recipientName: string
  recipientEmail?: string
  recipientPhone?: string
  subject?: string
  status: SendingStatus
  sentAt: string
  deliveredAt?: string
  errorMessage?: string
}

const CHANNEL_INFO: { channel: NotificationChannel; label: string; icon: React.ReactNode; color: string }[] = [
  {
    channel: 'email',
    label: 'Email',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    channel: 'sms',
    label: 'SMS',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-status-success-bg text-status-success-text border-status-success-border',
  },
  {
    channel: 'in_app',
    label: 'In-App',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
]

const STATUS_INFO: { status: SendingStatus; label: string; color: StatusColor }[] = [
  { status: 'sent', label: 'Sent', color: 'info' },
  { status: 'delivered', label: 'Delivered', color: 'success' },
  { status: 'failed', label: 'Failed', color: 'error' },
  { status: 'pending', label: 'Pending', color: 'warning' },
]

const MOCK_RECORDS: SendingRecord[] = [
  {
    id: 'rec-1',
    templateId: 'tpl-1',
    templateName: 'Application Received Confirmation',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'email',
    recipientName: 'John Doe',
    recipientEmail: 'john@designstudio.com',
    subject: 'Your application has been received - Seoul Living Design Fair 2026',
    status: 'delivered',
    sentAt: '2026-01-25 14:32:15',
    deliveredAt: '2026-01-25 14:32:18',
  },
  {
    id: 'rec-2',
    templateId: 'tpl-2',
    templateName: 'Application Received SMS',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'sms',
    recipientName: 'John Doe',
    recipientPhone: '+82-10-1234-5678',
    status: 'delivered',
    sentAt: '2026-01-25 14:32:16',
    deliveredAt: '2026-01-25 14:32:20',
  },
  {
    id: 'rec-3',
    templateId: 'tpl-3',
    templateName: 'Application Received Notification',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'in_app',
    recipientName: 'John Doe',
    status: 'delivered',
    sentAt: '2026-01-25 14:32:15',
    deliveredAt: '2026-01-25 14:32:15',
  },
  {
    id: 'rec-4',
    templateId: 'tpl-4',
    templateName: 'Application Approved Email',
    triggerId: 'exhibitor_application_approved',
    triggerName: 'Application Approved',
    channel: 'email',
    recipientName: 'Sarah Kim',
    recipientEmail: 'sarah@modernhome.kr',
    subject: 'Congratulations! Your application has been approved - Seoul Living Design Fair 2026',
    status: 'delivered',
    sentAt: '2026-01-24 10:15:30',
    deliveredAt: '2026-01-24 10:15:35',
  },
  {
    id: 'rec-5',
    templateId: 'tpl-5',
    templateName: 'Registration Confirmation Email',
    triggerId: 'visitor_registration_complete',
    triggerName: 'Registration Complete',
    channel: 'email',
    recipientName: 'Mike Johnson',
    recipientEmail: 'mike.j@gmail.com',
    subject: 'Registration Confirmed - Seoul Living Design Fair 2026',
    status: 'delivered',
    sentAt: '2026-01-24 09:45:12',
    deliveredAt: '2026-01-24 09:45:18',
  },
  {
    id: 'rec-6',
    templateId: 'tpl-6',
    templateName: 'Invoice Notification',
    triggerId: 'payment_invoice_issued',
    triggerName: 'Invoice Issued',
    channel: 'email',
    recipientName: 'Design Studio Co.',
    recipientEmail: 'billing@designstudio.com',
    subject: 'Invoice INV-2026-0015 - Seoul Living Design Fair 2026',
    status: 'failed',
    sentAt: '2026-01-23 16:20:45',
    errorMessage: 'Email address not found',
  },
  {
    id: 'rec-7',
    templateId: 'tpl-1',
    templateName: 'Application Received Confirmation',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'email',
    recipientName: 'Emma Lee',
    recipientEmail: 'emma@furnitureworld.com',
    subject: 'Your application has been received - Seoul Living Design Fair 2026',
    status: 'delivered',
    sentAt: '2026-01-23 11:08:22',
    deliveredAt: '2026-01-23 11:08:28',
  },
  {
    id: 'rec-8',
    templateId: 'tpl-2',
    templateName: 'Application Received SMS',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'sms',
    recipientName: 'Emma Lee',
    recipientPhone: '+82-10-9876-5432',
    status: 'failed',
    sentAt: '2026-01-23 11:08:23',
    errorMessage: 'Invalid phone number format',
  },
  {
    id: 'rec-9',
    templateId: 'tpl-5',
    templateName: 'Registration Confirmation Email',
    triggerId: 'visitor_registration_complete',
    triggerName: 'Registration Complete',
    channel: 'email',
    recipientName: 'David Park',
    recipientEmail: 'david.park@company.com',
    subject: 'Registration Confirmed - Seoul Living Design Fair 2026',
    status: 'pending',
    sentAt: '2026-01-25 15:01:00',
  },
  {
    id: 'rec-10',
    templateId: 'tpl-3',
    templateName: 'Application Received Notification',
    triggerId: 'exhibitor_application_submitted',
    triggerName: 'Application Submitted',
    channel: 'in_app',
    recipientName: 'Lisa Wang',
    status: 'delivered',
    sentAt: '2026-01-22 09:30:45',
    deliveredAt: '2026-01-22 09:30:45',
  },
]

export default function SendingHistoryPage() {
  const [records] = useState<SendingRecord[]>(MOCK_RECORDS)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterChannel, setFilterChannel] = useState<NotificationChannel | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<SendingStatus | 'all'>('all')
  const [filterTrigger, setFilterTrigger] = useState<string>('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [selectedRecord, setSelectedRecord] = useState<SendingRecord | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Dropdown states
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)
  const [isTriggerDropdownOpen, setIsTriggerDropdownOpen] = useState(false)
  const channelDropdownRef = useRef<HTMLDivElement>(null)
  const statusDropdownRef = useRef<HTMLDivElement>(null)
  const triggerDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (channelDropdownRef.current && !channelDropdownRef.current.contains(event.target as Node)) {
        setIsChannelDropdownOpen(false)
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false)
      }
      if (triggerDropdownRef.current && !triggerDropdownRef.current.contains(event.target as Node)) {
        setIsTriggerDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Get unique triggers from records
  const uniqueTriggers = Array.from(new Set(records.map((r) => r.triggerId))).map((id) => ({
    id,
    name: records.find((r) => r.triggerId === id)?.triggerName || id,
  }))

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.templateName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChannel = filterChannel === 'all' || record.channel === filterChannel
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus
    const matchesTrigger = filterTrigger === 'all' || record.triggerId === filterTrigger

    let matchesDate = true
    if (dateRange.from) {
      matchesDate = matchesDate && record.sentAt >= dateRange.from
    }
    if (dateRange.to) {
      matchesDate = matchesDate && record.sentAt <= dateRange.to + ' 23:59:59'
    }

    return matchesSearch && matchesChannel && matchesStatus && matchesTrigger && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getChannelInfo = (channel: NotificationChannel) => {
    return CHANNEL_INFO.find((c) => c.channel === channel)!
  }

  const getStatusInfo = (status: SendingStatus) => {
    return STATUS_INFO.find((s) => s.status === status)!
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr.replace(' ', 'T'))
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Stats
  const stats = {
    total: records.length,
    delivered: records.filter((r) => r.status === 'delivered').length,
    failed: records.filter((r) => r.status === 'failed').length,
    pending: records.filter((r) => r.status === 'pending').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">Sending History</h1>
        <p className="mt-1 text-sm text-neutral-500">View all notification sending records</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Sent</p>
              <p className="text-2xl font-bold text-neutral-950 mt-1">{stats.total}</p>
            </div>
            <div className="w-10 h-10 bg-neutral-100 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Delivered</p>
              <p className="text-2xl font-bold text-status-success-border mt-1">{stats.delivered}</p>
            </div>
            <div className="w-10 h-10 bg-status-success-bg rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Failed</p>
              <p className="text-2xl font-bold text-status-error-border mt-1">{stats.failed}</p>
            </div>
            <div className="w-10 h-10 bg-status-error-bg rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-error-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Pending</p>
              <p className="text-2xl font-bold text-status-warning-border mt-1">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-status-warning-bg rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-warning-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search recipient, template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Channel Filter */}
        <div className="relative" ref={channelDropdownRef}>
          <button
            type="button"
            onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
            className="input text-left flex items-center justify-between pr-4 min-w-[130px]"
          >
            <span className={filterChannel === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {filterChannel === 'all' ? 'All Channels' : getChannelInfo(filterChannel).label}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isChannelDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterChannel('all'); setIsChannelDropdownOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                    filterChannel === 'all' ? 'bg-admin-primary-50' : ''
                  }`}
                >
                  <span className="text-sm text-neutral-800">All Channels</span>
                  {filterChannel === 'all' && (
                    <svg className="w-4 h-4 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {CHANNEL_INFO.map((ch) => (
                  <button
                    key={ch.channel}
                    type="button"
                    onClick={() => { setFilterChannel(ch.channel); setIsChannelDropdownOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                      filterChannel === ch.channel ? 'bg-admin-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {ch.icon}
                      <span className="text-sm text-neutral-800">{ch.label}</span>
                    </div>
                    {filterChannel === ch.channel && (
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

        {/* Status Filter */}
        <div className="relative" ref={statusDropdownRef}>
          <button
            type="button"
            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            className="input text-left flex items-center justify-between pr-4 min-w-[130px]"
          >
            <span className={filterStatus === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {filterStatus === 'all' ? 'All Status' : getStatusInfo(filterStatus).label}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isStatusDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterStatus('all'); setIsStatusDropdownOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                    filterStatus === 'all' ? 'bg-admin-primary-50' : ''
                  }`}
                >
                  <span className="text-sm text-neutral-800">All Status</span>
                  {filterStatus === 'all' && (
                    <svg className="w-4 h-4 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {STATUS_INFO.map((st) => (
                  <button
                    key={st.status}
                    type="button"
                    onClick={() => { setFilterStatus(st.status); setIsStatusDropdownOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                      filterStatus === st.status ? 'bg-admin-primary-50' : ''
                    }`}
                  >
                    <span className="text-sm text-neutral-800">{st.label}</span>
                    {filterStatus === st.status && (
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

        {/* Trigger Filter */}
        <div className="relative" ref={triggerDropdownRef}>
          <button
            type="button"
            onClick={() => setIsTriggerDropdownOpen(!isTriggerDropdownOpen)}
            className="input text-left flex items-center justify-between pr-4 min-w-[180px]"
          >
            <span className={filterTrigger === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {filterTrigger === 'all' ? 'All Triggers' : uniqueTriggers.find((t) => t.id === filterTrigger)?.name}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isTriggerDropdownOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden max-h-64 overflow-y-auto">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterTrigger('all'); setIsTriggerDropdownOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                    filterTrigger === 'all' ? 'bg-admin-primary-50' : ''
                  }`}
                >
                  <span className="text-sm text-neutral-800">All Triggers</span>
                  {filterTrigger === 'all' && (
                    <svg className="w-4 h-4 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {uniqueTriggers.map((trigger) => (
                  <button
                    key={trigger.id}
                    type="button"
                    onClick={() => { setFilterTrigger(trigger.id); setIsTriggerDropdownOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                      filterTrigger === trigger.id ? 'bg-admin-primary-50' : ''
                    }`}
                  >
                    <span className="text-sm text-neutral-800">{trigger.name}</span>
                    {filterTrigger === trigger.id && (
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

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            className="input"
          />
          <span className="text-neutral-400">~</span>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            className="input"
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Channel</th>
              <th>Template / Trigger</th>
              <th>Recipient</th>
              <th>Status</th>
              <th>Sent At</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record) => {
              const channelInfo = getChannelInfo(record.channel)
              const statusInfo = getStatusInfo(record.status)
              return (
                <tr key={record.id}>
                  <td>
                    <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${channelInfo.color}`}>
                      {channelInfo.icon}
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-neutral-950">{record.templateName}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{record.triggerName}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm text-neutral-950">{record.recipientName}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {record.recipientEmail || record.recipientPhone || '-'}
                      </p>
                    </div>
                  </td>
                  <td>
                    <Badge variant="status" color={statusInfo.color}>
                      {statusInfo.label}
                    </Badge>
                    {record.status === 'failed' && record.errorMessage && (
                      <p className="text-xs text-status-error-solid mt-1 max-w-[150px] truncate" title={record.errorMessage}>
                        {record.errorMessage}
                      </p>
                    )}
                  </td>
                  <td>
                    <span className="text-sm text-neutral-500">{formatDateTime(record.sentAt)}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-neutral-500">No sending records found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded-md transition-colors ${
                    currentPage === page
                      ? 'bg-admin-primary-600 text-white'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-neutral-200 rounded-md hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">Sending Details</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center border ${getChannelInfo(selectedRecord.channel).color}`}>
                  {getChannelInfo(selectedRecord.channel).icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-950">{getChannelInfo(selectedRecord.channel).label}</p>
                  <Badge variant="status" color={getStatusInfo(selectedRecord.status).color}>
                    {getStatusInfo(selectedRecord.status).label}
                  </Badge>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4 bg-neutral-50 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-neutral-500">Template</p>
                  <p className="text-sm font-medium text-neutral-950 mt-0.5">{selectedRecord.templateName}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500">Trigger</p>
                  <p className="text-sm text-neutral-950 mt-0.5">{selectedRecord.triggerName}</p>
                </div>
                {selectedRecord.subject && (
                  <div>
                    <p className="text-xs text-neutral-500">Subject</p>
                    <p className="text-sm text-neutral-950 mt-0.5">{selectedRecord.subject}</p>
                  </div>
                )}
              </div>

              {/* Recipient Info */}
              <div className="p-4 bg-neutral-50 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-neutral-500">Recipient Name</p>
                  <p className="text-sm font-medium text-neutral-950 mt-0.5">{selectedRecord.recipientName}</p>
                </div>
                {selectedRecord.recipientEmail && (
                  <div>
                    <p className="text-xs text-neutral-500">Email</p>
                    <p className="text-sm text-neutral-950 mt-0.5">{selectedRecord.recipientEmail}</p>
                  </div>
                )}
                {selectedRecord.recipientPhone && (
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <p className="text-sm text-neutral-950 mt-0.5">{selectedRecord.recipientPhone}</p>
                  </div>
                )}
              </div>

              {/* Timestamps */}
              <div className="p-4 bg-neutral-50 rounded-lg space-y-3">
                <div>
                  <p className="text-xs text-neutral-500">Sent At</p>
                  <p className="text-sm text-neutral-950 mt-0.5">{formatDateTime(selectedRecord.sentAt)}</p>
                </div>
                {selectedRecord.deliveredAt && (
                  <div>
                    <p className="text-xs text-neutral-500">Delivered At</p>
                    <p className="text-sm text-neutral-950 mt-0.5">{formatDateTime(selectedRecord.deliveredAt)}</p>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {selectedRecord.status === 'failed' && selectedRecord.errorMessage && (
                <div className="p-4 bg-status-error-bg border border-status-error-bg rounded-lg">
                  <p className="text-xs text-status-error-border font-medium">Error Message</p>
                  <p className="text-sm text-status-error-text mt-1">{selectedRecord.errorMessage}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              {selectedRecord.status === 'failed' && (
                <button className="btn btn-secondary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </button>
              )}
              <button onClick={() => setSelectedRecord(null)} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Badge, type CategoryColor } from '@/components/Badge'

type NotificationChannel = 'email' | 'sms' | 'in_app'
type TriggerCategory = 'exhibitor' | 'visitor' | 'payment' | 'system'

interface NotificationTrigger {
  id: string
  category: TriggerCategory
  name: string
  description: string
  variables: { key: string; label: string; example: string }[]
}

interface NotificationTemplate {
  id: string
  triggerId: string
  channel: NotificationChannel
  name: string
  subject?: string // For email
  content: string
  isActive: boolean
  lastUpdated: string
}

const TRIGGERS: NotificationTrigger[] = [
  // Exhibitor triggers
  {
    id: 'exhibitor_application_submitted',
    category: 'exhibitor',
    name: 'Application Submitted',
    description: 'When an exhibitor submits their application',
    variables: [
      { key: '{{company_name}}', label: 'Company Name', example: 'Design Studio Co.' },
      { key: '{{applicant_name}}', label: 'Applicant Name', example: 'John Doe' },
      { key: '{{application_date}}', label: 'Application Date', example: 'Jan 15, 2026' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
    ],
  },
  {
    id: 'exhibitor_application_approved',
    category: 'exhibitor',
    name: 'Application Approved',
    description: 'When an exhibitor application is approved',
    variables: [
      { key: '{{company_name}}', label: 'Company Name', example: 'Design Studio Co.' },
      { key: '{{applicant_name}}', label: 'Applicant Name', example: 'John Doe' },
      { key: '{{booth_number}}', label: 'Booth Number', example: 'A-123' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
    ],
  },
  {
    id: 'exhibitor_application_rejected',
    category: 'exhibitor',
    name: 'Application Rejected',
    description: 'When an exhibitor application is rejected',
    variables: [
      { key: '{{company_name}}', label: 'Company Name', example: 'Design Studio Co.' },
      { key: '{{applicant_name}}', label: 'Applicant Name', example: 'John Doe' },
      { key: '{{rejection_reason}}', label: 'Rejection Reason', example: 'Incomplete documentation' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
    ],
  },
  {
    id: 'exhibitor_booth_assigned',
    category: 'exhibitor',
    name: 'Booth Assigned',
    description: 'When a booth is assigned to an exhibitor',
    variables: [
      { key: '{{company_name}}', label: 'Company Name', example: 'Design Studio Co.' },
      { key: '{{booth_number}}', label: 'Booth Number', example: 'A-123' },
      { key: '{{booth_size}}', label: 'Booth Size', example: '9sqm' },
      { key: '{{hall_name}}', label: 'Hall Name', example: 'Main Hall' },
    ],
  },
  {
    id: 'exhibitor_document_reminder',
    category: 'exhibitor',
    name: 'Document Submission Reminder',
    description: 'Reminder to submit required documents',
    variables: [
      { key: '{{company_name}}', label: 'Company Name', example: 'Design Studio Co.' },
      { key: '{{document_name}}', label: 'Document Name', example: 'Business License' },
      { key: '{{deadline}}', label: 'Deadline', example: 'Feb 1, 2026' },
      { key: '{{days_remaining}}', label: 'Days Remaining', example: '7' },
    ],
  },
  // Visitor triggers
  {
    id: 'visitor_registration_complete',
    category: 'visitor',
    name: 'Registration Complete',
    description: 'When a visitor completes registration',
    variables: [
      { key: '{{visitor_name}}', label: 'Visitor Name', example: 'Jane Smith' },
      { key: '{{ticket_type}}', label: 'Ticket Type', example: 'VIP Pass' },
      { key: '{{ticket_number}}', label: 'Ticket Number', example: 'VIS-2026-0001' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
      { key: '{{event_date}}', label: 'Event Date', example: 'Mar 15-18, 2026' },
    ],
  },
  {
    id: 'visitor_ticket_issued',
    category: 'visitor',
    name: 'Ticket Issued',
    description: 'When a ticket/badge is issued',
    variables: [
      { key: '{{visitor_name}}', label: 'Visitor Name', example: 'Jane Smith' },
      { key: '{{ticket_type}}', label: 'Ticket Type', example: 'VIP Pass' },
      { key: '{{qr_code_link}}', label: 'QR Code Link', example: 'https://...' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
    ],
  },
  {
    id: 'visitor_event_reminder',
    category: 'visitor',
    name: 'Event Reminder',
    description: 'Reminder before the event starts',
    variables: [
      { key: '{{visitor_name}}', label: 'Visitor Name', example: 'Jane Smith' },
      { key: '{{event_name}}', label: 'Event Name', example: 'Seoul Living Design Fair 2026' },
      { key: '{{event_date}}', label: 'Event Date', example: 'Mar 15, 2026' },
      { key: '{{venue_name}}', label: 'Venue', example: 'COEX Hall A' },
      { key: '{{days_until}}', label: 'Days Until Event', example: '3' },
    ],
  },
  // Payment triggers
  {
    id: 'payment_invoice_issued',
    category: 'payment',
    name: 'Invoice Issued',
    description: 'When an invoice is issued',
    variables: [
      { key: '{{recipient_name}}', label: 'Recipient Name', example: 'Design Studio Co.' },
      { key: '{{invoice_number}}', label: 'Invoice Number', example: 'INV-2026-0001' },
      { key: '{{amount}}', label: 'Amount', example: '$5,000' },
      { key: '{{due_date}}', label: 'Due Date', example: 'Feb 15, 2026' },
      { key: '{{payment_link}}', label: 'Payment Link', example: 'https://...' },
    ],
  },
  {
    id: 'payment_received',
    category: 'payment',
    name: 'Payment Received',
    description: 'When a payment is successfully processed',
    variables: [
      { key: '{{recipient_name}}', label: 'Recipient Name', example: 'Design Studio Co.' },
      { key: '{{amount}}', label: 'Amount', example: '$5,000' },
      { key: '{{payment_date}}', label: 'Payment Date', example: 'Jan 20, 2026' },
      { key: '{{receipt_link}}', label: 'Receipt Link', example: 'https://...' },
    ],
  },
  {
    id: 'payment_reminder',
    category: 'payment',
    name: 'Payment Reminder',
    description: 'Reminder for pending payment',
    variables: [
      { key: '{{recipient_name}}', label: 'Recipient Name', example: 'Design Studio Co.' },
      { key: '{{invoice_number}}', label: 'Invoice Number', example: 'INV-2026-0001' },
      { key: '{{amount}}', label: 'Amount', example: '$5,000' },
      { key: '{{due_date}}', label: 'Due Date', example: 'Feb 15, 2026' },
      { key: '{{days_overdue}}', label: 'Days Overdue', example: '5' },
    ],
  },
  // System triggers
  {
    id: 'system_password_reset',
    category: 'system',
    name: 'Password Reset',
    description: 'When user requests password reset',
    variables: [
      { key: '{{user_name}}', label: 'User Name', example: 'John Doe' },
      { key: '{{reset_link}}', label: 'Reset Link', example: 'https://...' },
      { key: '{{expiry_time}}', label: 'Link Expiry', example: '24 hours' },
    ],
  },
  {
    id: 'system_account_created',
    category: 'system',
    name: 'Account Created',
    description: 'When a new account is created',
    variables: [
      { key: '{{user_name}}', label: 'User Name', example: 'John Doe' },
      { key: '{{email}}', label: 'Email', example: 'john@example.com' },
      { key: '{{login_link}}', label: 'Login Link', example: 'https://...' },
    ],
  },
]

const INITIAL_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tpl-1',
    triggerId: 'exhibitor_application_submitted',
    channel: 'email',
    name: 'Application Received Confirmation',
    subject: 'Your application has been received - {{event_name}}',
    content: `Dear {{applicant_name}},

Thank you for submitting your application for {{event_name}}.

We have received your application on {{application_date}} for {{company_name}}.

Our team will review your application and get back to you within 5 business days.

If you have any questions, please don't hesitate to contact us.

Best regards,
{{event_name}} Team`,
    isActive: true,
    lastUpdated: 'Jan 15, 2026',
  },
  {
    id: 'tpl-2',
    triggerId: 'exhibitor_application_submitted',
    channel: 'sms',
    name: 'Application Received SMS',
    content: '[{{event_name}}] Application received for {{company_name}}. We will review and contact you soon.',
    isActive: true,
    lastUpdated: 'Jan 15, 2026',
  },
  {
    id: 'tpl-3',
    triggerId: 'exhibitor_application_submitted',
    channel: 'in_app',
    name: 'Application Received Notification',
    content: 'Your application for {{event_name}} has been submitted successfully.',
    isActive: true,
    lastUpdated: 'Jan 15, 2026',
  },
  {
    id: 'tpl-4',
    triggerId: 'exhibitor_application_approved',
    channel: 'email',
    name: 'Application Approved Email',
    subject: 'Congratulations! Your application has been approved - {{event_name}}',
    content: `Dear {{applicant_name}},

Great news! Your application for {{event_name}} has been approved.

Company: {{company_name}}
Booth Number: {{booth_number}}

Please log in to your account to complete the next steps and review your booth details.

We look forward to seeing you at the event!

Best regards,
{{event_name}} Team`,
    isActive: true,
    lastUpdated: 'Jan 18, 2026',
  },
  {
    id: 'tpl-5',
    triggerId: 'visitor_registration_complete',
    channel: 'email',
    name: 'Registration Confirmation Email',
    subject: 'Registration Confirmed - {{event_name}}',
    content: `Dear {{visitor_name}},

Thank you for registering for {{event_name}}!

Ticket Type: {{ticket_type}}
Ticket Number: {{ticket_number}}
Event Date: {{event_date}}

Please keep this email for your records. Your e-ticket will be sent separately.

See you at the event!

Best regards,
{{event_name}} Team`,
    isActive: true,
    lastUpdated: 'Jan 20, 2026',
  },
  {
    id: 'tpl-6',
    triggerId: 'payment_invoice_issued',
    channel: 'email',
    name: 'Invoice Notification',
    subject: 'Invoice {{invoice_number}} - {{event_name}}',
    content: `Dear {{recipient_name}},

An invoice has been issued for your participation in the event.

Invoice Number: {{invoice_number}}
Amount: {{amount}}
Due Date: {{due_date}}

Please click the link below to make your payment:
{{payment_link}}

If you have any questions about this invoice, please contact us.

Best regards,
{{event_name}} Team`,
    isActive: true,
    lastUpdated: 'Jan 22, 2026',
  },
]

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

const CATEGORY_INFO: { category: TriggerCategory; label: string; color: string }[] = [
  { category: 'exhibitor', label: 'Exhibitor', color: 'bg-orange-50 text-orange-700' },
  { category: 'visitor', label: 'Visitor', color: 'bg-cyan-50 text-cyan-700' },
  { category: 'payment', label: 'Payment', color: 'bg-emerald-50 text-emerald-700' },
  { category: 'system', label: 'System', color: 'bg-neutral-100 text-neutral-700' },
]

export default function NotificationTemplatesPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(INITIAL_TEMPLATES)
  const [selectedCategory, setSelectedCategory] = useState<TriggerCategory | 'all'>('all')
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    triggerId: '',
    channel: 'email' as NotificationChannel,
    name: '',
    subject: '',
    content: '',
    isActive: true,
  })

  // Dropdown states
  const [isTriggerDropdownOpen, setIsTriggerDropdownOpen] = useState(false)
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false)
  const triggerDropdownRef = useRef<HTMLDivElement>(null)
  const channelDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (triggerDropdownRef.current && !triggerDropdownRef.current.contains(event.target as Node)) {
        setIsTriggerDropdownOpen(false)
      }
      if (channelDropdownRef.current && !channelDropdownRef.current.contains(event.target as Node)) {
        setIsChannelDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const filteredTriggers = TRIGGERS.filter(
    (trigger) => selectedCategory === 'all' || trigger.category === selectedCategory
  )

  const getTemplatesForTrigger = (triggerId: string) => {
    return templates.filter((t) => t.triggerId === triggerId)
  }

  const getTrigger = (triggerId: string) => {
    return TRIGGERS.find((t) => t.id === triggerId)
  }

  const getChannelInfo = (channel: NotificationChannel) => {
    return CHANNEL_INFO.find((c) => c.channel === channel)!
  }

  const getCategoryInfo = (category: TriggerCategory) => {
    return CATEGORY_INFO.find((c) => c.category === category)!
  }

  const getCategoryBadgeColor = (category: TriggerCategory): CategoryColor => {
    switch (category) {
      case 'exhibitor': return 'orange'
      case 'visitor': return 'blue'
      case 'payment': return 'green'
      case 'system': return 'neutral'
      default: return 'neutral'
    }
  }

  const handleOpenCreate = (triggerId?: string) => {
    setFormData({
      triggerId: triggerId || '',
      channel: 'email',
      name: '',
      subject: '',
      content: '',
      isActive: true,
    })
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (template: NotificationTemplate) => {
    setSelectedTemplate(template)
    setFormData({
      triggerId: template.triggerId,
      channel: template.channel,
      name: template.name,
      subject: template.subject || '',
      content: template.content,
      isActive: template.isActive,
    })
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const newTemplate: NotificationTemplate = {
      id: `tpl-${Date.now()}`,
      triggerId: formData.triggerId,
      channel: formData.channel,
      name: formData.name,
      subject: formData.channel === 'email' ? formData.subject : undefined,
      content: formData.content,
      isActive: formData.isActive,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setTemplates([...templates, newTemplate])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedTemplate) return
    setTemplates(
      templates.map((t) =>
        t.id === selectedTemplate.id
          ? {
              ...t,
              triggerId: formData.triggerId,
              channel: formData.channel,
              name: formData.name,
              subject: formData.channel === 'email' ? formData.subject : undefined,
              content: formData.content,
              isActive: formData.isActive,
              lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            }
          : t
      )
    )
    setIsEditModalOpen(false)
    setSelectedTemplate(null)
  }

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter((t) => t.id !== id))
    }
  }

  const insertVariable = (variable: string) => {
    setFormData({ ...formData, content: formData.content + variable })
  }

  const currentTrigger = formData.triggerId ? getTrigger(formData.triggerId) : null

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Notification Templates</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Configure email, SMS, and in-app notification templates for different triggers
          </p>
        </div>
        <button onClick={() => handleOpenCreate()} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Template
        </button>
      </div>

      {/* Search & Category Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search triggers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              selectedCategory === 'all'
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All
          </button>
          {CATEGORY_INFO.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setSelectedCategory(cat.category)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === cat.category
                  ? 'bg-neutral-950 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Triggers List */}
      <div className="space-y-4">
        {filteredTriggers
          .filter((trigger) => trigger.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((trigger) => {
            const triggerTemplates = getTemplatesForTrigger(trigger.id)
            const categoryInfo = getCategoryInfo(trigger.category)
            const isExpanded = selectedTrigger === trigger.id

            return (
              <div key={trigger.id} className="card overflow-hidden">
                {/* Trigger Header */}
                <button
                  onClick={() => setSelectedTrigger(isExpanded ? null : trigger.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${categoryInfo.color}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-neutral-950">{trigger.name}</h3>
                        <Badge variant="category" color={getCategoryBadgeColor(trigger.category)}>
                          {categoryInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-500 mt-0.5">{trigger.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Channel badges */}
                    <div className="flex items-center gap-1.5">
                      {CHANNEL_INFO.map((channelInfo) => {
                        const hasTemplate = triggerTemplates.some(
                          (t) => t.channel === channelInfo.channel && t.isActive
                        )
                        return (
                          <div
                            key={channelInfo.channel}
                            className={`w-7 h-7 rounded-md flex items-center justify-center border ${
                              hasTemplate ? channelInfo.color : 'bg-neutral-50 text-neutral-300 border-neutral-200'
                            }`}
                            title={`${channelInfo.label}: ${hasTemplate ? 'Active' : 'Not configured'}`}
                          >
                            {channelInfo.icon}
                          </div>
                        )
                      })}
                    </div>

                    <svg
                      className={`w-5 h-5 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="border-t border-neutral-100">
                    {/* Variables */}
                    <div className="px-4 py-3 bg-neutral-50 border-b border-neutral-100">
                      <p className="text-xs font-medium text-neutral-500 mb-2">Available Variables</p>
                      <div className="flex flex-wrap gap-2">
                        {trigger.variables.map((v) => (
                          <span
                            key={v.key}
                            className="inline-flex items-center px-2 py-1 text-xs font-mono bg-white border border-neutral-200 rounded text-neutral-600"
                            title={`${v.label}: ${v.example}`}
                          >
                            {v.key}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Templates */}
                    <div className="p-4">
                      {triggerTemplates.length > 0 ? (
                        <div className="space-y-3">
                          {triggerTemplates.map((template) => {
                            const channelInfo = getChannelInfo(template.channel)
                            return (
                              <div
                                key={template.id}
                                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-8 h-8 rounded-md flex items-center justify-center border ${channelInfo.color}`}
                                  >
                                    {channelInfo.icon}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-neutral-950">
                                        {template.name}
                                      </span>
                                      <span
                                        className={`inline-flex px-1.5 py-0.5 text-micro font-medium rounded ${
                                          template.isActive
                                            ? 'bg-status-success-bg text-status-success-text'
                                            : 'bg-neutral-200 text-neutral-500'
                                        }`}
                                      >
                                        {template.isActive ? 'Active' : 'Inactive'}
                                      </span>
                                    </div>
                                    {template.subject && (
                                      <p className="text-xs text-neutral-500 mt-0.5 truncate max-w-md">
                                        Subject: {template.subject}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-neutral-400">{template.lastUpdated}</span>
                                  <button
                                    onClick={() => handleToggleActive(template.id)}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                                      template.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                                    }`}
                                  >
                                    <span
                                      className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
                                      style={{
                                        transform: template.isActive ? 'translateX(18px)' : 'translateX(4px)',
                                      }}
                                    />
                                  </button>
                                  <button
                                    onClick={() => handleOpenEdit(template)}
                                    className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(template.id)}
                                    className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-neutral-500">
                          <p className="text-sm">No templates configured for this trigger</p>
                        </div>
                      )}

                      <button
                        onClick={() => handleOpenCreate(trigger.id)}
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-neutral-200 rounded-lg text-sm text-neutral-500 hover:border-admin-primary-300 hover:text-admin-primary-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">
                {isEditModalOpen ? 'Edit Template' : 'Create Template'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedTemplate(null)
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Trigger Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Trigger</label>
                <div className="relative" ref={triggerDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTriggerDropdownOpen(!isTriggerDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    {formData.triggerId ? (
                      <span className="text-neutral-950">{getTrigger(formData.triggerId)?.name}</span>
                    ) : (
                      <span className="text-neutral-500">Select a trigger</span>
                    )}
                    <svg
                      className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTriggerDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden max-h-64 overflow-y-auto">
                      <div className="py-1">
                        {TRIGGERS.map((trigger) => {
                          const categoryInfo = getCategoryInfo(trigger.category)
                          return (
                            <button
                              key={trigger.id}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, triggerId: trigger.id })
                                setIsTriggerDropdownOpen(false)
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                                formData.triggerId === trigger.id ? 'bg-admin-primary-50' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-neutral-800">{trigger.name}</span>
                                <span
                                  className={`inline-flex px-1.5 py-0.5 text-micro font-medium rounded ${categoryInfo.color}`}
                                >
                                  {categoryInfo.label}
                                </span>
                              </div>
                              {formData.triggerId === trigger.id && (
                                <svg
                                  className="w-4 h-4 text-admin-primary-600 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Channel Selection */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Channel</label>
                <div className="relative" ref={channelDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <div className="flex items-center gap-2">
                      {getChannelInfo(formData.channel).icon}
                      <span className="text-neutral-950">{getChannelInfo(formData.channel).label}</span>
                    </div>
                    <svg
                      className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isChannelDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {CHANNEL_INFO.map((channelInfo) => (
                          <button
                            key={channelInfo.channel}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, channel: channelInfo.channel })
                              setIsChannelDropdownOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                              formData.channel === channelInfo.channel ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {channelInfo.icon}
                              <span className="text-sm text-neutral-800">{channelInfo.label}</span>
                            </div>
                            {formData.channel === channelInfo.channel && (
                              <svg
                                className="w-4 h-4 text-admin-primary-600 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Template Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Application Confirmation Email"
                />
              </div>

              {/* Subject (Email only) */}
              {formData.channel === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input"
                    placeholder="e.g., Your application has been received"
                  />
                </div>
              )}

              {/* Variables (if trigger selected) */}
              {currentTrigger && (
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">
                    Available Variables
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-neutral-50 rounded-lg">
                    {currentTrigger.variables.map((v) => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => insertVariable(v.key)}
                        className="inline-flex items-center px-2 py-1 text-xs font-mono bg-white border border-neutral-200 rounded text-neutral-600 hover:border-admin-primary-300 hover:text-admin-primary-600 transition-colors"
                        title={`${v.label}: ${v.example}`}
                      >
                        {v.key}
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input min-h-[200px] font-mono text-sm"
                  placeholder={
                    formData.channel === 'sms'
                      ? 'Enter SMS message (max 160 characters recommended)...'
                      : formData.channel === 'in_app'
                      ? 'Enter notification message...'
                      : 'Enter email body...'
                  }
                />
                {formData.channel === 'sms' && (
                  <p className="mt-1 text-xs text-neutral-500">
                    Character count: {formData.content.length} / 160 recommended
                  </p>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                  }`}
                >
                  <span
                    className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    style={{ transform: formData.isActive ? 'translateX(24px)' : 'translateX(4px)' }}
                  />
                </button>
                <span className="text-sm text-neutral-950">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedTemplate(null)
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleUpdate : handleCreate}
                disabled={!formData.triggerId || !formData.name.trim() || !formData.content.trim()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditModalOpen ? 'Save Changes' : 'Create Template'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

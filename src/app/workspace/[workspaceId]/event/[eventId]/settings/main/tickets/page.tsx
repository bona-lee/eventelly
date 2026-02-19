'use client'

import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/Badge'

type TabType = 'types' | 'pricing' | 'sales'

interface TicketType {
  id: string
  name: string
  description: string
  category: 'general' | 'vip' | 'group' | 'free' | 'invitation'
  basePrice: number
  currency: string
  maxQuantityPerOrder: number
  totalQuantity: number | null // null = unlimited
  soldCount: number
  isActive: boolean
  validDays: string[] // Event days this ticket is valid for
  benefits: string[]
  sortOrder: number
}

interface PricingTier {
  id: string
  ticketTypeId: string
  name: string
  type: 'early_bird' | 'regular' | 'late' | 'group' | 'custom'
  price: number
  discountPercent?: number
  startDate: string
  endDate: string
  minQuantity?: number
  maxQuantity?: number
  isActive: boolean
}

interface SalesSettings {
  salesStartDate: string
  salesEndDate: string
  timezone: string
  maxTicketsPerUser: number
  requireLogin: boolean
  allowGuestCheckout: boolean
  refundPolicy: 'full' | 'partial' | 'none'
  refundDeadlineDays: number
  termsId?: string
}

const TICKET_CATEGORIES = [
  { value: 'general', label: 'General Admission', color: 'blue' as const },
  { value: 'vip', label: 'VIP', color: 'purple' as const },
  { value: 'group', label: 'Group', color: 'green' as const },
  { value: 'free', label: 'Free', color: 'neutral' as const },
  { value: 'invitation', label: 'Invitation Only', color: 'amber' as const },
]

const EVENT_DAYS = [
  { id: 'day1', date: '2026-03-15', label: 'Day 1 (Mar 15)' },
  { id: 'day2', date: '2026-03-16', label: 'Day 2 (Mar 16)' },
  { id: 'day3', date: '2026-03-17', label: 'Day 3 (Mar 17)' },
  { id: 'day4', date: '2026-03-18', label: 'Day 4 (Mar 18)' },
]

const INITIAL_TICKET_TYPES: TicketType[] = [
  {
    id: 'ticket-1',
    name: 'General Admission',
    description: 'Standard entry ticket for all exhibition days',
    category: 'general',
    basePrice: 15000,
    currency: 'KRW',
    maxQuantityPerOrder: 10,
    totalQuantity: 5000,
    soldCount: 1250,
    isActive: true,
    validDays: ['day1', 'day2', 'day3', 'day4'],
    benefits: ['Access to all exhibition halls', 'Event guide booklet'],
    sortOrder: 1,
  },
  {
    id: 'ticket-2',
    name: 'VIP Pass',
    description: 'Premium access with exclusive benefits',
    category: 'vip',
    basePrice: 50000,
    currency: 'KRW',
    maxQuantityPerOrder: 5,
    totalQuantity: 500,
    soldCount: 120,
    isActive: true,
    validDays: ['day1', 'day2', 'day3', 'day4'],
    benefits: ['Priority entry', 'VIP lounge access', 'Complimentary refreshments', 'Exclusive networking session', 'Premium event guide'],
    sortOrder: 2,
  },
  {
    id: 'ticket-3',
    name: 'Group Ticket (10+)',
    description: 'Discounted ticket for groups of 10 or more',
    category: 'group',
    basePrice: 12000,
    currency: 'KRW',
    maxQuantityPerOrder: 50,
    totalQuantity: 2000,
    soldCount: 340,
    isActive: true,
    validDays: ['day1', 'day2', 'day3', 'day4'],
    benefits: ['Access to all exhibition halls', 'Group guide service'],
    sortOrder: 3,
  },
  {
    id: 'ticket-4',
    name: 'Student/Senior',
    description: 'Discounted ticket for students and seniors',
    category: 'general',
    basePrice: 10000,
    currency: 'KRW',
    maxQuantityPerOrder: 5,
    totalQuantity: 1000,
    soldCount: 215,
    isActive: true,
    validDays: ['day1', 'day2', 'day3', 'day4'],
    benefits: ['Access to all exhibition halls', 'Valid ID required at entry'],
    sortOrder: 4,
  },
  {
    id: 'ticket-5',
    name: 'Invitation Ticket',
    description: 'Complimentary ticket for invited guests',
    category: 'invitation',
    basePrice: 0,
    currency: 'KRW',
    maxQuantityPerOrder: 1,
    totalQuantity: 200,
    soldCount: 85,
    isActive: true,
    validDays: ['day1', 'day2', 'day3', 'day4'],
    benefits: ['Access to all exhibition halls', 'Invitation code required'],
    sortOrder: 5,
  },
]

const INITIAL_PRICING_TIERS: PricingTier[] = [
  {
    id: 'pricing-1',
    ticketTypeId: 'ticket-1',
    name: 'Early Bird',
    type: 'early_bird',
    price: 12000,
    discountPercent: 20,
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    isActive: true,
  },
  {
    id: 'pricing-2',
    ticketTypeId: 'ticket-1',
    name: 'Regular Price',
    type: 'regular',
    price: 15000,
    startDate: '2026-02-16',
    endDate: '2026-03-14',
    isActive: true,
  },
  {
    id: 'pricing-3',
    ticketTypeId: 'ticket-1',
    name: 'On-site Price',
    type: 'late',
    price: 18000,
    startDate: '2026-03-15',
    endDate: '2026-03-18',
    isActive: true,
  },
  {
    id: 'pricing-4',
    ticketTypeId: 'ticket-2',
    name: 'VIP Early Bird',
    type: 'early_bird',
    price: 40000,
    discountPercent: 20,
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    isActive: true,
  },
  {
    id: 'pricing-5',
    ticketTypeId: 'ticket-2',
    name: 'VIP Regular',
    type: 'regular',
    price: 50000,
    startDate: '2026-02-16',
    endDate: '2026-03-18',
    isActive: true,
  },
]

const INITIAL_SALES_SETTINGS: SalesSettings = {
  salesStartDate: '2026-01-15T09:00',
  salesEndDate: '2026-03-18T18:00',
  timezone: 'Asia/Seoul',
  maxTicketsPerUser: 20,
  requireLogin: false,
  allowGuestCheckout: true,
  refundPolicy: 'partial',
  refundDeadlineDays: 7,
  termsId: 'terms-1',
}

export default function TicketSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('types')

  const tabs = [
    { id: 'types' as TabType, label: 'Ticket Types' },
    { id: 'pricing' as TabType, label: 'Pricing & Discounts' },
    { id: 'sales' as TabType, label: 'Sales Settings' },
  ]

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-neutral-950">Ticket Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Configure ticket types, pricing, and sales options</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-5">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-admin-primary-600 text-admin-primary-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'types' && <TicketTypesTab />}
      {activeTab === 'pricing' && <PricingTab />}
      {activeTab === 'sales' && <SalesSettingsTab />}
    </div>
  )
}

// ============ Ticket Types Tab ============
function TicketTypesTab() {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(INITIAL_TICKET_TYPES)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null)
  const [formData, setFormData] = useState<Partial<TicketType>>({
    name: '',
    description: '',
    category: 'general',
    basePrice: 0,
    currency: 'KRW',
    maxQuantityPerOrder: 10,
    totalQuantity: null,
    validDays: [],
    benefits: [],
    isActive: true,
  })
  const [newBenefit, setNewBenefit] = useState('')

  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getCategoryInfo = (category: string) => {
    return TICKET_CATEGORIES.find((c) => c.value === category) || TICKET_CATEGORIES[0]
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency }).format(price)
  }

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      description: '',
      category: 'general',
      basePrice: 0,
      currency: 'KRW',
      maxQuantityPerOrder: 10,
      totalQuantity: null,
      validDays: EVENT_DAYS.map((d) => d.id),
      benefits: [],
      isActive: true,
    })
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (ticket: TicketType) => {
    setSelectedTicket(ticket)
    setFormData({
      name: ticket.name,
      description: ticket.description,
      category: ticket.category,
      basePrice: ticket.basePrice,
      currency: ticket.currency,
      maxQuantityPerOrder: ticket.maxQuantityPerOrder,
      totalQuantity: ticket.totalQuantity,
      validDays: ticket.validDays,
      benefits: ticket.benefits,
      isActive: ticket.isActive,
    })
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const newTicket: TicketType = {
      id: `ticket-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category || 'general',
      basePrice: formData.basePrice || 0,
      currency: formData.currency || 'KRW',
      maxQuantityPerOrder: formData.maxQuantityPerOrder || 10,
      totalQuantity: formData.totalQuantity || null,
      soldCount: 0,
      isActive: formData.isActive ?? true,
      validDays: formData.validDays || [],
      benefits: formData.benefits || [],
      sortOrder: ticketTypes.length + 1,
    }
    setTicketTypes([...ticketTypes, newTicket])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedTicket) return
    setTicketTypes(
      ticketTypes.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              name: formData.name || t.name,
              description: formData.description || t.description,
              category: formData.category || t.category,
              basePrice: formData.basePrice ?? t.basePrice,
              currency: formData.currency || t.currency,
              maxQuantityPerOrder: formData.maxQuantityPerOrder ?? t.maxQuantityPerOrder,
              totalQuantity: formData.totalQuantity ?? null,
              validDays: formData.validDays || t.validDays,
              benefits: formData.benefits || t.benefits,
              isActive: formData.isActive ?? t.isActive,
            }
          : t
      )
    )
    setIsEditModalOpen(false)
    setSelectedTicket(null)
  }

  const handleToggleActive = (id: string) => {
    setTicketTypes(ticketTypes.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this ticket type?')) {
      setTicketTypes(ticketTypes.filter((t) => t.id !== id))
    }
  }

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...(formData.benefits || []), newBenefit.trim()],
      })
      setNewBenefit('')
    }
  }

  const handleRemoveBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: (formData.benefits || []).filter((_, i) => i !== index),
    })
  }

  const handleToggleDay = (dayId: string) => {
    const days = formData.validDays || []
    if (days.includes(dayId)) {
      setFormData({ ...formData, validDays: days.filter((d) => d !== dayId) })
    } else {
      setFormData({ ...formData, validDays: [...days, dayId] })
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Ticket Types</h2>
          <p className="text-sm text-neutral-500 mt-0.5">Define the types of tickets available for purchase</p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Ticket Type
        </button>
      </div>

      {/* Ticket Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ticketTypes.map((ticket) => {
          const categoryInfo = getCategoryInfo(ticket.category)
          const soldPercentage = ticket.totalQuantity
            ? Math.round((ticket.soldCount / ticket.totalQuantity) * 100)
            : 0

          return (
            <div key={ticket.id} className={`card p-5 ${!ticket.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-admin-primary-50 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950">{ticket.name}</h3>
                    <Badge variant="category" color={categoryInfo.color}>{categoryInfo.label}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(ticket.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      ticket.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                    }`}
                  >
                    <span
                      className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
                      style={{ transform: ticket.isActive ? 'translateX(18px)' : 'translateX(4px)' }}
                    />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-500 mb-4">{ticket.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-2xl font-bold text-neutral-950">
                  {formatPrice(ticket.basePrice, ticket.currency)}
                </span>
                {ticket.category === 'free' && (
                  <span className="text-sm text-neutral-500">Free</span>
                )}
              </div>

              {/* Stock Info */}
              {ticket.totalQuantity && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-neutral-500">Sold</span>
                    <span className="font-medium text-neutral-950">
                      {ticket.soldCount.toLocaleString()} / {ticket.totalQuantity.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        soldPercentage > 90 ? 'bg-status-error-solid' : soldPercentage > 70 ? 'bg-status-warning-solid' : 'bg-admin-primary-500'
                      }`}
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Valid Days */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {ticket.validDays.map((dayId) => {
                  const day = EVENT_DAYS.find((d) => d.id === dayId)
                  return day ? (
                    <Badge key={dayId} variant="tag">{day.label}</Badge>
                  ) : null
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => handleOpenEdit(ticket)}
                  className="p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="p-2 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">
                {isEditModalOpen ? 'Edit Ticket Type' : 'Create Ticket Type'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedTicket(null)
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Ticket Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., General Admission"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[80px]"
                  placeholder="Brief description of this ticket type"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Category</label>
                <div className="relative" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950">{getCategoryInfo(formData.category || 'general').label}</span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isCategoryDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {TICKET_CATEGORIES.map((cat) => (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, category: cat.value as TicketType['category'] })
                              setIsCategoryDropdownOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                              formData.category === cat.value ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <span className="text-sm text-neutral-800">{cat.label}</span>
                            {formData.category === cat.value && (
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

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Base Price</label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                    className="input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="input"
                  >
                    <option value="KRW">KRW (₩)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>

              {/* Quantity Settings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Total Quantity</label>
                  <input
                    type="number"
                    value={formData.totalQuantity || ''}
                    onChange={(e) => setFormData({ ...formData, totalQuantity: e.target.value ? Number(e.target.value) : null })}
                    className="input"
                    min="0"
                    placeholder="Unlimited"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave empty for unlimited</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Max Per Order</label>
                  <input
                    type="number"
                    value={formData.maxQuantityPerOrder}
                    onChange={(e) => setFormData({ ...formData, maxQuantityPerOrder: Number(e.target.value) })}
                    className="input"
                    min="1"
                  />
                </div>
              </div>

              {/* Valid Days */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Valid Days</label>
                <div className="flex flex-wrap gap-2">
                  {EVENT_DAYS.map((day) => (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => handleToggleDay(day.id)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        formData.validDays?.includes(day.id)
                          ? 'bg-admin-primary-50 border-admin-primary-300 text-admin-primary-700'
                          : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Benefits</label>
                <div className="space-y-2 mb-3">
                  {(formData.benefits || []).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-neutral-50 rounded-md">
                      <svg className="w-4 h-4 text-status-success-solid flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="flex-1 text-sm text-neutral-950">{benefit}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveBenefit(index)}
                        className="p-1 text-neutral-400 hover:text-destructive-text"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddBenefit())}
                    className="input flex-1"
                    placeholder="Add a benefit..."
                  />
                  <button type="button" onClick={handleAddBenefit} className="btn btn-secondary">
                    Add
                  </button>
                </div>
              </div>

              {/* Active */}
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
                <span className="text-sm text-neutral-950">Active for sale</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedTicket(null)
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleUpdate : handleCreate}
                disabled={!formData.name?.trim()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditModalOpen ? 'Save Changes' : 'Create Ticket'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ Pricing Tab ============
function PricingTab() {
  const [ticketTypes] = useState<TicketType[]>(INITIAL_TICKET_TYPES)
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(INITIAL_PRICING_TIERS)
  const [selectedTicketId, setSelectedTicketId] = useState<string>(ticketTypes[0]?.id || '')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)
  const [formData, setFormData] = useState<Partial<PricingTier>>({
    name: '',
    type: 'regular',
    price: 0,
    startDate: '',
    endDate: '',
    isActive: true,
  })

  const selectedTicket = ticketTypes.find((t) => t.id === selectedTicketId)
  const filteredTiers = pricingTiers.filter((t) => t.ticketTypeId === selectedTicketId)

  const TIER_TYPES = [
    { value: 'early_bird', label: 'Early Bird', color: 'green' as const },
    { value: 'regular', label: 'Regular', color: 'blue' as const },
    { value: 'late', label: 'Late/On-site', color: 'orange' as const },
    { value: 'group', label: 'Group Discount', color: 'purple' as const },
    { value: 'custom', label: 'Custom', color: 'neutral' as const },
  ]

  const getTierTypeInfo = (type: string) => {
    return TIER_TYPES.find((t) => t.value === type) || TIER_TYPES[1]
  }

  const formatPrice = (price: number, currency: string = 'KRW') => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      type: 'regular',
      price: selectedTicket?.basePrice || 0,
      startDate: '',
      endDate: '',
      isActive: true,
    })
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (tier: PricingTier) => {
    setSelectedTier(tier)
    setFormData({
      name: tier.name,
      type: tier.type,
      price: tier.price,
      discountPercent: tier.discountPercent,
      startDate: tier.startDate,
      endDate: tier.endDate,
      minQuantity: tier.minQuantity,
      maxQuantity: tier.maxQuantity,
      isActive: tier.isActive,
    })
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const newTier: PricingTier = {
      id: `pricing-${Date.now()}`,
      ticketTypeId: selectedTicketId,
      name: formData.name || '',
      type: formData.type || 'regular',
      price: formData.price || 0,
      discountPercent: formData.discountPercent,
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      minQuantity: formData.minQuantity,
      maxQuantity: formData.maxQuantity,
      isActive: formData.isActive ?? true,
    }
    setPricingTiers([...pricingTiers, newTier])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedTier) return
    setPricingTiers(
      pricingTiers.map((t) =>
        t.id === selectedTier.id
          ? {
              ...t,
              name: formData.name || t.name,
              type: formData.type || t.type,
              price: formData.price ?? t.price,
              discountPercent: formData.discountPercent,
              startDate: formData.startDate || t.startDate,
              endDate: formData.endDate || t.endDate,
              minQuantity: formData.minQuantity,
              maxQuantity: formData.maxQuantity,
              isActive: formData.isActive ?? t.isActive,
            }
          : t
      )
    )
    setIsEditModalOpen(false)
    setSelectedTier(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this pricing tier?')) {
      setPricingTiers(pricingTiers.filter((t) => t.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    setPricingTiers(pricingTiers.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)))
  }

  return (
    <div>
      {/* Ticket Selector */}
      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium text-neutral-950">Select Ticket:</label>
        <div className="flex flex-wrap gap-2">
          {ticketTypes.map((ticket) => (
            <button
              key={ticket.id}
              onClick={() => setSelectedTicketId(ticket.id)}
              className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                selectedTicketId === ticket.id
                  ? 'bg-admin-primary-50 border-admin-primary-300 text-admin-primary-700'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {ticket.name}
            </button>
          ))}
        </div>
      </div>

      {selectedTicket && (
        <>
          {/* Base Price Info */}
          <div className="card p-4 mb-6 bg-neutral-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Base Price for {selectedTicket.name}</p>
                <p className="text-xl font-bold text-neutral-950 mt-1">
                  {formatPrice(selectedTicket.basePrice, selectedTicket.currency)}
                </p>
              </div>
              <button onClick={handleOpenCreate} className="btn btn-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Pricing Tier
              </button>
            </div>
          </div>

          {/* Pricing Tiers */}
          {filteredTiers.length > 0 ? (
            <div className="space-y-3">
              {filteredTiers.map((tier) => {
                const typeInfo = getTierTypeInfo(tier.type)
                const now = new Date()
                const startDate = new Date(tier.startDate)
                const endDate = new Date(tier.endDate)
                const isCurrentlyActive = now >= startDate && now <= endDate

                return (
                  <div key={tier.id} className={`card p-4 ${!tier.isActive ? 'opacity-60' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-semibold text-neutral-950">{tier.name}</h3>
                            <Badge variant="category" color={typeInfo.color}>{typeInfo.label}</Badge>
                            {isCurrentlyActive && tier.isActive && (
                              <Badge variant="status" color="success">Current</Badge>
                            )}
                          </div>
                          <p className="text-xs text-neutral-500">
                            {formatDate(tier.startDate)} ~ {formatDate(tier.endDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-bold text-neutral-950">
                            {formatPrice(tier.price, selectedTicket.currency)}
                          </p>
                          {tier.discountPercent && (
                            <p className="text-xs text-status-success-border">-{tier.discountPercent}% off</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleActive(tier.id)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              tier.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                            }`}
                          >
                            <span
                              className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
                              style={{ transform: tier.isActive ? 'translateX(18px)' : 'translateX(4px)' }}
                            />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(tier)}
                            className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(tier.id)}
                            className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-neutral-500 mb-4">No pricing tiers defined for this ticket</p>
              <button onClick={handleOpenCreate} className="btn btn-primary">
                Add First Pricing Tier
              </button>
            </div>
          )}
        </>
      )}

      {/* Create/Edit Modal */}
      {(isCreateModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">
                {isEditModalOpen ? 'Edit Pricing Tier' : 'Add Pricing Tier'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedTier(null)
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Tier Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Early Bird"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PricingTier['type'] })}
                  className="input"
                >
                  {TIER_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Discount %</label>
                  <input
                    type="number"
                    value={formData.discountPercent || ''}
                    onChange={(e) => setFormData({ ...formData, discountPercent: e.target.value ? Number(e.target.value) : undefined })}
                    className="input"
                    min="0"
                    max="100"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-950 mb-2">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              {/* Quantity Limits (for group discounts) */}
              {formData.type === 'group' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-950 mb-2">Min Quantity</label>
                    <input
                      type="number"
                      value={formData.minQuantity || ''}
                      onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value ? Number(e.target.value) : undefined })}
                      className="input"
                      min="1"
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-950 mb-2">Max Quantity</label>
                    <input
                      type="number"
                      value={formData.maxQuantity || ''}
                      onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value ? Number(e.target.value) : undefined })}
                      className="input"
                      min="1"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              )}

              {/* Active */}
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
                  setSelectedTier(null)
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleUpdate : handleCreate}
                disabled={!formData.name?.trim() || !formData.startDate || !formData.endDate}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditModalOpen ? 'Save Changes' : 'Add Tier'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ Sales Settings Tab ============
function SalesSettingsTab() {
  const [settings, setSettings] = useState<SalesSettings>(INITIAL_SALES_SETTINGS)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (field: keyof SalesSettings, value: any) => {
    setSettings({ ...settings, [field]: value })
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save logic here
    setHasChanges(false)
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-3xl">
      {/* Sales Period */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Sales Period</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Sales Start</label>
            <input
              type="datetime-local"
              value={settings.salesStartDate}
              onChange={(e) => handleChange('salesStartDate', e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Sales End</label>
            <input
              type="datetime-local"
              value={settings.salesEndDate}
              onChange={(e) => handleChange('salesEndDate', e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-950 mb-2">Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="input max-w-xs"
          >
            <option value="Asia/Seoul">Asia/Seoul (KST)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
            <option value="Europe/London">Europe/London (GMT)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>
      </div>

      {/* Purchase Limits */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Purchase Limits</h3>
        <div>
          <label className="block text-sm font-medium text-neutral-950 mb-2">
            Max Tickets Per User
          </label>
          <input
            type="number"
            value={settings.maxTicketsPerUser}
            onChange={(e) => handleChange('maxTicketsPerUser', Number(e.target.value))}
            className="input max-w-xs"
            min="1"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Maximum number of tickets a single user can purchase across all orders
          </p>
        </div>
      </div>

      {/* Checkout Options */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Checkout Options</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireLogin}
              onChange={(e) => handleChange('requireLogin', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Require Login</span>
              <p className="text-xs text-neutral-500">Users must be logged in to purchase tickets</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowGuestCheckout}
              onChange={(e) => handleChange('allowGuestCheckout', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
              disabled={settings.requireLogin}
            />
            <div>
              <span className={`text-sm font-medium ${settings.requireLogin ? 'text-neutral-400' : 'text-neutral-950'}`}>
                Allow Guest Checkout
              </span>
              <p className="text-xs text-neutral-500">Allow purchase without creating an account</p>
            </div>
          </label>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Refund Policy</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Refund Type</label>
            <div className="flex gap-4">
              {[
                { value: 'full', label: 'Full Refund' },
                { value: 'partial', label: 'Partial Refund' },
                { value: 'none', label: 'No Refund' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="refundPolicy"
                    value={option.value}
                    checked={settings.refundPolicy === option.value}
                    onChange={(e) => handleChange('refundPolicy', e.target.value)}
                    className="w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {settings.refundPolicy !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-neutral-950 mb-2">
                Refund Deadline
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={settings.refundDeadlineDays}
                  onChange={(e) => handleChange('refundDeadlineDays', Number(e.target.value))}
                  className="input w-24"
                  min="0"
                />
                <span className="text-sm text-neutral-500">days before event</span>
              </div>
            </div>
          )}
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

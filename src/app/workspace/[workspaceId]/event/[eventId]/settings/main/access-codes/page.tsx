'use client'

import { useState, useRef, useEffect } from 'react'
import { Badge } from '@/components/Badge'

type TabType = 'types' | 'allocation' | 'settings'

interface CodeType {
  id: string
  name: string
  description: string
  issuer: 'exhibitor' | 'admin'
  ticketTypeId: string
  ticketTypeName: string
  maxUsesPerCode: number
  validityDays: number | null // null = until event end
  isActive: boolean
  codePrefix: string
  totalIssued: number
  totalUsed: number
}

interface ExhibitorAllocation {
  exhibitorId: string
  companyName: string
  email: string
  codeTypeId: string
  allocatedQuantity: number
  usedQuantity: number
  sentQuantity: number
  lastUpdated: string
}

interface AdminCode {
  id: string
  code: string
  codeTypeId: string
  codeTypeName: string
  createdBy: string
  createdAt: string
  maxUses: number
  usedCount: number
  recipientEmail?: string
  recipientName?: string
  status: 'active' | 'used' | 'expired' | 'revoked'
  expiresAt: string
}

interface CodeSettings {
  codeFormat: 'alphanumeric' | 'numeric' | 'alpha'
  codeLength: number
  caseSensitive: boolean
  allowMultipleUsePerUser: boolean
  requireRecipientInfo: boolean
  notifyOnUse: boolean
  defaultValidityDays: number
}

const TICKET_TYPES = [
  { id: 'ticket-1', name: 'General Admission' },
  { id: 'ticket-2', name: 'VIP Pass' },
  { id: 'ticket-5', name: 'Invitation Ticket' },
]

const INITIAL_CODE_TYPES: CodeType[] = [
  {
    id: 'codetype-1',
    name: 'Exhibitor Invitation Code',
    description: 'Invitation codes issued by exhibitors to their clients and partners',
    issuer: 'exhibitor',
    ticketTypeId: 'ticket-5',
    ticketTypeName: 'Invitation Ticket',
    maxUsesPerCode: 1,
    validityDays: null,
    isActive: true,
    codePrefix: 'EXH',
    totalIssued: 2500,
    totalUsed: 890,
  },
  {
    id: 'codetype-2',
    name: 'VIP Invitation Code',
    description: 'Special VIP codes issued by event administrators',
    issuer: 'admin',
    ticketTypeId: 'ticket-2',
    ticketTypeName: 'VIP Pass',
    maxUsesPerCode: 1,
    validityDays: 30,
    isActive: true,
    codePrefix: 'VIP',
    totalIssued: 150,
    totalUsed: 45,
  },
  {
    id: 'codetype-3',
    name: 'Press Pass Code',
    description: 'Complimentary codes for press and media representatives',
    issuer: 'admin',
    ticketTypeId: 'ticket-5',
    ticketTypeName: 'Invitation Ticket',
    maxUsesPerCode: 1,
    validityDays: 14,
    isActive: true,
    codePrefix: 'PRESS',
    totalIssued: 80,
    totalUsed: 32,
  },
  {
    id: 'codetype-4',
    name: 'Group Invitation Code',
    description: 'Multi-use codes for corporate groups',
    issuer: 'admin',
    ticketTypeId: 'ticket-1',
    ticketTypeName: 'General Admission',
    maxUsesPerCode: 50,
    validityDays: 60,
    isActive: false,
    codePrefix: 'GRP',
    totalIssued: 20,
    totalUsed: 12,
  },
]

const INITIAL_EXHIBITOR_ALLOCATIONS: ExhibitorAllocation[] = [
  { exhibitorId: 'exh-1', companyName: 'Design Studio Co.', email: 'contact@designstudio.com', codeTypeId: 'codetype-1', allocatedQuantity: 50, usedQuantity: 23, sentQuantity: 35, lastUpdated: '2026-01-25' },
  { exhibitorId: 'exh-2', companyName: 'Modern Home Inc.', email: 'info@modernhome.kr', codeTypeId: 'codetype-1', allocatedQuantity: 100, usedQuantity: 45, sentQuantity: 78, lastUpdated: '2026-01-24' },
  { exhibitorId: 'exh-3', companyName: 'Furniture World', email: 'sales@furnitureworld.com', codeTypeId: 'codetype-1', allocatedQuantity: 30, usedQuantity: 12, sentQuantity: 20, lastUpdated: '2026-01-23' },
  { exhibitorId: 'exh-4', companyName: 'Living Art Gallery', email: 'hello@livingart.co', codeTypeId: 'codetype-1', allocatedQuantity: 75, usedQuantity: 38, sentQuantity: 52, lastUpdated: '2026-01-22' },
  { exhibitorId: 'exh-5', companyName: 'Nordic Design Lab', email: 'contact@nordicdesign.eu', codeTypeId: 'codetype-1', allocatedQuantity: 40, usedQuantity: 15, sentQuantity: 28, lastUpdated: '2026-01-21' },
]

const INITIAL_ADMIN_CODES: AdminCode[] = [
  { id: 'code-1', code: 'VIP-2026-A1B2C3', codeTypeId: 'codetype-2', codeTypeName: 'VIP Invitation Code', createdBy: 'Admin User', createdAt: '2026-01-20', maxUses: 1, usedCount: 0, recipientEmail: 'john.doe@company.com', recipientName: 'John Doe', status: 'active', expiresAt: '2026-02-19' },
  { id: 'code-2', code: 'VIP-2026-D4E5F6', codeTypeId: 'codetype-2', codeTypeName: 'VIP Invitation Code', createdBy: 'Admin User', createdAt: '2026-01-18', maxUses: 1, usedCount: 1, recipientEmail: 'sarah.kim@design.kr', recipientName: 'Sarah Kim', status: 'used', expiresAt: '2026-02-17' },
  { id: 'code-3', code: 'PRESS-2026-G7H8', codeTypeId: 'codetype-3', codeTypeName: 'Press Pass Code', createdBy: 'Marketing Team', createdAt: '2026-01-15', maxUses: 1, usedCount: 0, recipientEmail: 'editor@designmag.com', recipientName: 'Design Magazine', status: 'active', expiresAt: '2026-01-29' },
  { id: 'code-4', code: 'PRESS-2026-I9J0', codeTypeId: 'codetype-3', codeTypeName: 'Press Pass Code', createdBy: 'Marketing Team', createdAt: '2026-01-10', maxUses: 1, usedCount: 0, status: 'expired', expiresAt: '2026-01-24' },
  { id: 'code-5', code: 'GRP-CORP-2026-X1', codeTypeId: 'codetype-4', codeTypeName: 'Group Invitation Code', createdBy: 'Admin User', createdAt: '2026-01-05', maxUses: 50, usedCount: 32, recipientName: 'Samsung Electronics', status: 'active', expiresAt: '2026-03-06' },
]

const INITIAL_SETTINGS: CodeSettings = {
  codeFormat: 'alphanumeric',
  codeLength: 8,
  caseSensitive: false,
  allowMultipleUsePerUser: false,
  requireRecipientInfo: false,
  notifyOnUse: true,
  defaultValidityDays: 30,
}

export default function CodeSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('types')

  const tabs = [
    { id: 'types' as TabType, label: 'Code Types' },
    { id: 'allocation' as TabType, label: 'Allocation' },
    { id: 'settings' as TabType, label: 'Settings' },
  ]

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-neutral-950">Code Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage invitation codes for free event registration</p>
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
      {activeTab === 'types' && <CodeTypesTab />}
      {activeTab === 'allocation' && <AllocationTab />}
      {activeTab === 'settings' && <SettingsTab />}
    </div>
  )
}

// ============ Code Types Tab ============
function CodeTypesTab() {
  const [codeTypes, setCodeTypes] = useState<CodeType[]>(INITIAL_CODE_TYPES)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedCodeType, setSelectedCodeType] = useState<CodeType | null>(null)
  const [formData, setFormData] = useState<Partial<CodeType>>({
    name: '',
    description: '',
    issuer: 'admin',
    ticketTypeId: '',
    maxUsesPerCode: 1,
    validityDays: 30,
    isActive: true,
    codePrefix: '',
  })

  // Dropdown states
  const [isIssuerDropdownOpen, setIsIssuerDropdownOpen] = useState(false)
  const [isTicketDropdownOpen, setIsTicketDropdownOpen] = useState(false)
  const issuerDropdownRef = useRef<HTMLDivElement>(null)
  const ticketDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (issuerDropdownRef.current && !issuerDropdownRef.current.contains(event.target as Node)) {
        setIsIssuerDropdownOpen(false)
      }
      if (ticketDropdownRef.current && !ticketDropdownRef.current.contains(event.target as Node)) {
        setIsTicketDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getIssuerLabel = (issuer: string) => {
    return issuer === 'exhibitor' ? 'Exhibitor' : 'Admin'
  }

  const getIssuerCategoryColor = (issuer: string) => {
    return issuer === 'exhibitor' ? 'orange' as const : 'blue' as const
  }

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      description: '',
      issuer: 'admin',
      ticketTypeId: TICKET_TYPES[0]?.id || '',
      maxUsesPerCode: 1,
      validityDays: 30,
      isActive: true,
      codePrefix: '',
    })
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (codeType: CodeType) => {
    setSelectedCodeType(codeType)
    setFormData({
      name: codeType.name,
      description: codeType.description,
      issuer: codeType.issuer,
      ticketTypeId: codeType.ticketTypeId,
      maxUsesPerCode: codeType.maxUsesPerCode,
      validityDays: codeType.validityDays,
      isActive: codeType.isActive,
      codePrefix: codeType.codePrefix,
    })
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const ticketType = TICKET_TYPES.find((t) => t.id === formData.ticketTypeId)
    const newCodeType: CodeType = {
      id: `codetype-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      issuer: formData.issuer || 'admin',
      ticketTypeId: formData.ticketTypeId || '',
      ticketTypeName: ticketType?.name || '',
      maxUsesPerCode: formData.maxUsesPerCode || 1,
      validityDays: formData.validityDays ?? null,
      isActive: formData.isActive ?? true,
      codePrefix: formData.codePrefix || '',
      totalIssued: 0,
      totalUsed: 0,
    }
    setCodeTypes([...codeTypes, newCodeType])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedCodeType) return
    const ticketType = TICKET_TYPES.find((t) => t.id === formData.ticketTypeId)
    setCodeTypes(
      codeTypes.map((ct) =>
        ct.id === selectedCodeType.id
          ? {
              ...ct,
              name: formData.name || ct.name,
              description: formData.description || ct.description,
              issuer: formData.issuer || ct.issuer,
              ticketTypeId: formData.ticketTypeId || ct.ticketTypeId,
              ticketTypeName: ticketType?.name || ct.ticketTypeName,
              maxUsesPerCode: formData.maxUsesPerCode ?? ct.maxUsesPerCode,
              validityDays: formData.validityDays ?? null,
              isActive: formData.isActive ?? ct.isActive,
              codePrefix: formData.codePrefix || ct.codePrefix,
            }
          : ct
      )
    )
    setIsEditModalOpen(false)
    setSelectedCodeType(null)
  }

  const handleToggleActive = (id: string) => {
    setCodeTypes(codeTypes.map((ct) => (ct.id === id ? { ...ct, isActive: !ct.isActive } : ct)))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this code type?')) {
      setCodeTypes(codeTypes.filter((ct) => ct.id !== id))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Code Types</h2>
          <p className="text-sm text-neutral-500 mt-0.5">Define different types of invitation codes</p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Code Type
        </button>
      </div>

      {/* Code Types Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {codeTypes.map((codeType) => {
          const usagePercentage = codeType.totalIssued > 0
            ? Math.round((codeType.totalUsed / codeType.totalIssued) * 100)
            : 0

          return (
            <div key={codeType.id} className={`card p-5 ${!codeType.isActive ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
                    // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative issuer badge
                    codeType.issuer === 'exhibitor' ? 'bg-orange-50' : 'bg-blue-50'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative issuer badge
                      codeType.issuer === 'exhibitor' ? 'text-orange-600' : 'text-blue-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950">{codeType.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="category" color={getIssuerCategoryColor(codeType.issuer)}>
                        {getIssuerLabel(codeType.issuer)}
                      </Badge>
                      <span className="text-xs text-neutral-500">→ {codeType.ticketTypeName}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleActive(codeType.id)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    codeType.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                  }`}
                >
                  <span
                    className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform"
                    style={{ transform: codeType.isActive ? 'translateX(18px)' : 'translateX(4px)' }}
                  />
                </button>
              </div>

              <p className="text-sm text-neutral-500 mb-4">{codeType.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-neutral-50 rounded-md">
                  <p className="text-lg font-bold text-neutral-950">{codeType.totalIssued.toLocaleString()}</p>
                  <p className="text-xs text-neutral-500">Issued</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-md">
                  <p className="text-lg font-bold text-status-success-border">{codeType.totalUsed.toLocaleString()}</p>
                  <p className="text-xs text-neutral-500">Used</p>
                </div>
                <div className="text-center p-3 bg-neutral-50 rounded-md">
                  <p className="text-lg font-bold text-neutral-950">{usagePercentage}%</p>
                  <p className="text-xs text-neutral-500">Usage Rate</p>
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Prefix: {codeType.codePrefix}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {codeType.maxUsesPerCode === 1 ? 'Single use' : `${codeType.maxUsesPerCode} uses/code`}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {codeType.validityDays ? `${codeType.validityDays} days` : 'Until event'}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => handleOpenEdit(codeType)}
                  className="p-2 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(codeType.id)}
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
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">
                {isEditModalOpen ? 'Edit Code Type' : 'Create Code Type'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedCodeType(null)
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
                <label className="block text-sm font-medium text-neutral-950 mb-2">Code Type Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., VIP Invitation Code"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input min-h-[80px]"
                  placeholder="Brief description of this code type"
                />
              </div>

              {/* Issuer */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Issued By</label>
                <div className="relative" ref={issuerDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsIssuerDropdownOpen(!isIssuerDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950">{getIssuerLabel(formData.issuer || 'admin')}</span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isIssuerDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {[
                          { value: 'exhibitor', label: 'Exhibitor', desc: 'Exhibitors can issue codes to their invitees' },
                          { value: 'admin', label: 'Admin', desc: 'Only event administrators can issue codes' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, issuer: option.value as 'exhibitor' | 'admin' })
                              setIsIssuerDropdownOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-50 transition-colors ${
                              formData.issuer === option.value ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <div>
                              <p className="text-sm font-medium text-neutral-800">{option.label}</p>
                              <p className="text-xs text-neutral-500">{option.desc}</p>
                            </div>
                            {formData.issuer === option.value && (
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

              {/* Ticket Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Grants Access To</label>
                <div className="relative" ref={ticketDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTicketDropdownOpen(!isTicketDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950">
                      {TICKET_TYPES.find((t) => t.id === formData.ticketTypeId)?.name || 'Select ticket type'}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTicketDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {TICKET_TYPES.map((ticket) => (
                          <button
                            key={ticket.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, ticketTypeId: ticket.id })
                              setIsTicketDropdownOpen(false)
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                              formData.ticketTypeId === ticket.id ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <span className="text-sm text-neutral-800">{ticket.name}</span>
                            {formData.ticketTypeId === ticket.id && (
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

              {/* Code Prefix */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Code Prefix</label>
                <input
                  type="text"
                  value={formData.codePrefix}
                  onChange={(e) => setFormData({ ...formData, codePrefix: e.target.value.toUpperCase() })}
                  className="input max-w-[200px]"
                  placeholder="e.g., VIP"
                  maxLength={10}
                />
                <p className="text-xs text-neutral-500 mt-1">Codes will start with this prefix (e.g., VIP-XXXX)</p>
              </div>

              {/* Max Uses */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Uses Per Code</label>
                <input
                  type="number"
                  value={formData.maxUsesPerCode}
                  onChange={(e) => setFormData({ ...formData, maxUsesPerCode: Number(e.target.value) })}
                  className="input max-w-[200px]"
                  min="1"
                />
                <p className="text-xs text-neutral-500 mt-1">How many times each code can be used</p>
              </div>

              {/* Validity */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Validity Period</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={formData.validityDays || ''}
                    onChange={(e) => setFormData({ ...formData, validityDays: e.target.value ? Number(e.target.value) : null })}
                    className="input w-24"
                    min="1"
                    placeholder="∞"
                  />
                  <span className="text-sm text-neutral-500">days after issuance</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1">Leave empty for codes valid until event end</p>
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
                <span className="text-sm text-neutral-950">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button
                onClick={() => {
                  setIsCreateModalOpen(false)
                  setIsEditModalOpen(false)
                  setSelectedCodeType(null)
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={isEditModalOpen ? handleUpdate : handleCreate}
                disabled={!formData.name?.trim() || !formData.ticketTypeId}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEditModalOpen ? 'Save Changes' : 'Create Code Type'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ Allocation Tab ============
function AllocationTab() {
  const [codeTypes] = useState<CodeType[]>(INITIAL_CODE_TYPES)
  const [allocations, setAllocations] = useState<ExhibitorAllocation[]>(INITIAL_EXHIBITOR_ALLOCATIONS)
  const [adminCodes, setAdminCodes] = useState<AdminCode[]>(INITIAL_ADMIN_CODES)
  const [viewMode, setViewMode] = useState<'exhibitor' | 'admin'>('exhibitor')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateCodeModalOpen, setIsCreateCodeModalOpen] = useState(false)
  const [isEditAllocationModalOpen, setIsEditAllocationModalOpen] = useState(false)
  const [selectedAllocation, setSelectedAllocation] = useState<ExhibitorAllocation | null>(null)
  const [newAllocationQuantity, setNewAllocationQuantity] = useState(0)

  // Admin code form
  const [adminCodeForm, setAdminCodeForm] = useState({
    codeTypeId: '',
    quantity: 1,
    recipientName: '',
    recipientEmail: '',
  })

  const exhibitorCodeTypes = codeTypes.filter((ct) => ct.issuer === 'exhibitor')
  const adminCodeTypes = codeTypes.filter((ct) => ct.issuer === 'admin')

  const filteredAllocations = allocations.filter(
    (a) => a.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           a.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredAdminCodes = adminCodes.filter(
    (c) => c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.recipientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.recipientEmail?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'success' as const
      case 'used': return 'info' as const
      case 'expired': return 'neutral' as const
      case 'revoked': return 'error' as const
      default: return 'neutral' as const
    }
  }

  const handleEditAllocation = (allocation: ExhibitorAllocation) => {
    setSelectedAllocation(allocation)
    setNewAllocationQuantity(allocation.allocatedQuantity)
    setIsEditAllocationModalOpen(true)
  }

  const handleSaveAllocation = () => {
    if (!selectedAllocation) return
    setAllocations(
      allocations.map((a) =>
        a.exhibitorId === selectedAllocation.exhibitorId
          ? { ...a, allocatedQuantity: newAllocationQuantity, lastUpdated: new Date().toISOString().split('T')[0] }
          : a
      )
    )
    setIsEditAllocationModalOpen(false)
    setSelectedAllocation(null)
  }

  const handleCreateAdminCodes = () => {
    const codeType = adminCodeTypes.find((ct) => ct.id === adminCodeForm.codeTypeId)
    if (!codeType) return

    const newCodes: AdminCode[] = []
    for (let i = 0; i < adminCodeForm.quantity; i++) {
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()  
      newCodes.push({
        id: `code-${Date.now()}-${i}`,  
        code: `${codeType.codePrefix}-2026-${randomPart}`,
        codeTypeId: codeType.id,
        codeTypeName: codeType.name,
        createdBy: 'Admin User',
        createdAt: new Date().toISOString().split('T')[0],
        maxUses: codeType.maxUsesPerCode,
        usedCount: 0,
        recipientName: adminCodeForm.recipientName || undefined,
        recipientEmail: adminCodeForm.recipientEmail || undefined,
        status: 'active',
        expiresAt: codeType.validityDays
          ? new Date(Date.now() + codeType.validityDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]  
          : '2026-03-18',
      })
    }

    setAdminCodes([...newCodes, ...adminCodes])
    setIsCreateCodeModalOpen(false)
    setAdminCodeForm({ codeTypeId: '', quantity: 1, recipientName: '', recipientEmail: '' })
  }

  const handleRevokeCode = (id: string) => {
    if (confirm('Are you sure you want to revoke this code?')) {
      setAdminCodes(adminCodes.map((c) => (c.id === id ? { ...c, status: 'revoked' as const } : c)))
    }
  }

  return (
    <div>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-neutral-100 rounded-md p-1">
          <button
            onClick={() => setViewMode('exhibitor')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'exhibitor' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Exhibitor Allocation
          </button>
          <button
            onClick={() => setViewMode('admin')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'admin' ? 'bg-white text-neutral-950 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Admin Codes
          </button>
        </div>

        {viewMode === 'admin' && (
          <button onClick={() => setIsCreateCodeModalOpen(true)} className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate Codes
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={viewMode === 'exhibitor' ? 'Search exhibitors...' : 'Search codes...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Exhibitor Allocation View */}
      {viewMode === 'exhibitor' && (
        <div className="card overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Exhibitor</th>
                <th>Allocated</th>
                <th>Sent</th>
                <th>Used</th>
                <th>Remaining</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllocations.map((allocation) => {
                const remaining = allocation.allocatedQuantity - allocation.sentQuantity
                return (
                  <tr key={allocation.exhibitorId}>
                    <td>
                      <div>
                        <p className="text-sm font-medium text-neutral-950">{allocation.companyName}</p>
                        <p className="text-xs text-neutral-500">{allocation.email}</p>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm font-medium text-neutral-950">{allocation.allocatedQuantity}</span>
                    </td>
                    <td>
                      <span className="text-sm text-neutral-600">{allocation.sentQuantity}</span>
                    </td>
                    <td>
                      <span className="text-sm text-status-success-border">{allocation.usedQuantity}</span>
                    </td>
                    <td>
                      <span className={`text-sm font-medium ${remaining > 0 ? 'text-status-info-border' : 'text-neutral-400'}`}>
                        {remaining}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleEditAllocation(allocation)}
                          className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {filteredAllocations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">No exhibitors found</p>
            </div>
          )}
        </div>
      )}

      {/* Admin Codes View */}
      {viewMode === 'admin' && (
        <div className="card overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Type</th>
                <th>Recipient</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Expires</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdminCodes.map((code) => (
                <tr key={code.id}>
                  <td>
                    <code className="text-sm font-mono bg-neutral-100 px-2 py-1 rounded">{code.code}</code>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{code.codeTypeName}</span>
                  </td>
                  <td>
                    {code.recipientName || code.recipientEmail ? (
                      <div>
                        <p className="text-sm text-neutral-950">{code.recipientName || '-'}</p>
                        <p className="text-xs text-neutral-500">{code.recipientEmail || '-'}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-neutral-400">Not assigned</span>
                    )}
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{code.usedCount} / {code.maxUses}</span>
                  </td>
                  <td>
                    <Badge variant="status" color={getStatusBadgeColor(code.status)}>
                      {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-500">{code.expiresAt}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                        title="Copy code"
                        onClick={() => navigator.clipboard.writeText(code.code)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      {code.status === 'active' && (
                        <button
                          onClick={() => handleRevokeCode(code.id)}
                          className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                          title="Revoke code"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAdminCodes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">No codes found</p>
              <button onClick={() => setIsCreateCodeModalOpen(true)} className="btn btn-primary">
                Generate First Code
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Allocation Modal */}
      {isEditAllocationModalOpen && selectedAllocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">Edit Allocation</h2>
              <button
                onClick={() => {
                  setIsEditAllocationModalOpen(false)
                  setSelectedAllocation(null)
                }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm font-medium text-neutral-950">{selectedAllocation.companyName}</p>
                <p className="text-xs text-neutral-500">{selectedAllocation.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Allocated Quantity</label>
                <input
                  type="number"
                  value={newAllocationQuantity}
                  onChange={(e) => setNewAllocationQuantity(Number(e.target.value))}
                  className="input"
                  min={selectedAllocation.sentQuantity}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Minimum: {selectedAllocation.sentQuantity} (already sent)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-neutral-50 rounded-md">
                  <p className="text-neutral-500">Sent</p>
                  <p className="font-medium text-neutral-950">{selectedAllocation.sentQuantity}</p>
                </div>
                <div className="p-3 bg-neutral-50 rounded-md">
                  <p className="text-neutral-500">Used</p>
                  <p className="font-medium text-status-success-border">{selectedAllocation.usedQuantity}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button onClick={() => setIsEditAllocationModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleSaveAllocation} className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Admin Codes Modal */}
      {isCreateCodeModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">Generate Codes</h2>
              <button
                onClick={() => setIsCreateCodeModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Code Type</label>
                <select
                  value={adminCodeForm.codeTypeId}
                  onChange={(e) => setAdminCodeForm({ ...adminCodeForm, codeTypeId: e.target.value })}
                  className="input"
                >
                  <option value="">Select code type</option>
                  {adminCodeTypes.map((ct) => (
                    <option key={ct.id} value={ct.id}>{ct.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Quantity</label>
                <input
                  type="number"
                  value={adminCodeForm.quantity}
                  onChange={(e) => setAdminCodeForm({ ...adminCodeForm, quantity: Number(e.target.value) })}
                  className="input"
                  min="1"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Recipient Name (Optional)</label>
                <input
                  type="text"
                  value={adminCodeForm.recipientName}
                  onChange={(e) => setAdminCodeForm({ ...adminCodeForm, recipientName: e.target.value })}
                  className="input"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Recipient Email (Optional)</label>
                <input
                  type="email"
                  value={adminCodeForm.recipientEmail}
                  onChange={(e) => setAdminCodeForm({ ...adminCodeForm, recipientEmail: e.target.value })}
                  className="input"
                  placeholder="e.g., john@example.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button onClick={() => setIsCreateCodeModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleCreateAdminCodes}
                disabled={!adminCodeForm.codeTypeId}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate {adminCodeForm.quantity} Code{adminCodeForm.quantity > 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ Settings Tab ============
function SettingsTab() {
  const [settings, setSettings] = useState<CodeSettings>(INITIAL_SETTINGS)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (field: keyof CodeSettings, value: any) => {
    setSettings({ ...settings, [field]: value })
    setHasChanges(true)
  }

  const handleSave = () => {
    setHasChanges(false)
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-3xl">
      {/* Code Format */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Code Format</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Character Type</label>
            <div className="flex gap-4">
              {[
                { value: 'alphanumeric', label: 'Alphanumeric (A-Z, 0-9)' },
                { value: 'alpha', label: 'Letters Only (A-Z)' },
                { value: 'numeric', label: 'Numbers Only (0-9)' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="codeFormat"
                    value={option.value}
                    checked={settings.codeFormat === option.value}
                    onChange={(e) => handleChange('codeFormat', e.target.value)}
                    className="w-4 h-4 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Code Length</label>
            <input
              type="number"
              value={settings.codeLength}
              onChange={(e) => handleChange('codeLength', Number(e.target.value))}
              className="input max-w-[120px]"
              min="4"
              max="16"
            />
            <p className="text-xs text-neutral-500 mt-1">Number of characters after the prefix (4-16)</p>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.caseSensitive}
              onChange={(e) => handleChange('caseSensitive', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Case Sensitive</span>
              <p className="text-xs text-neutral-500">Codes must be entered with exact letter case</p>
            </div>
          </label>
        </div>
      </div>

      {/* Usage Rules */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Usage Rules</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowMultipleUsePerUser}
              onChange={(e) => handleChange('allowMultipleUsePerUser', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Allow Multiple Codes Per User</span>
              <p className="text-xs text-neutral-500">Same user can use multiple different codes</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.requireRecipientInfo}
              onChange={(e) => handleChange('requireRecipientInfo', e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-neutral-950">Require Recipient Info</span>
              <p className="text-xs text-neutral-500">Exhibitors must enter recipient details when sending codes</p>
            </div>
          </label>

          <div>
            <label className="block text-sm font-medium text-neutral-950 mb-2">Default Validity Period</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={settings.defaultValidityDays}
                onChange={(e) => handleChange('defaultValidityDays', Number(e.target.value))}
                className="input w-24"
                min="1"
              />
              <span className="text-sm text-neutral-500">days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Notifications</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifyOnUse}
            onChange={(e) => handleChange('notifyOnUse', e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
          />
          <div>
            <span className="text-sm font-medium text-neutral-950">Notify on Code Use</span>
            <p className="text-xs text-neutral-500">Send notification to issuer when their code is used</p>
          </div>
        </label>
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

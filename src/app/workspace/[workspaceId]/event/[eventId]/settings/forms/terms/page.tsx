'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Badge } from '@/components/Badge'

interface TermsItem {
  id: string
  name: string
  type: 'terms_of_service' | 'privacy_policy' | 'consent' | 'custom'
  content: string
  version: string
  isRequired: boolean
  isActive: boolean
  usedIn: { type: string; name: string }[]
  lastUpdated: string
  createdAt: string
}

// Simple Markdown Editor Component
function MarkdownEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const insertMarkdown = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [value, onChange])

  const handleBold = () => insertMarkdown('**', '**')
  const handleItalic = () => insertMarkdown('*', '*')
  const handleHeading1 = () => insertMarkdown('# ')
  const handleHeading2 = () => insertMarkdown('## ')
  const handleHeading3 = () => insertMarkdown('### ')
  const handleBulletList = () => insertMarkdown('- ')
  const handleNumberedList = () => insertMarkdown('1. ')
  const handleLink = () => insertMarkdown('[', '](url)')

  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-admin-primary-700 underline">$1</a>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-neutral-300 pl-4 italic text-neutral-600">$1</blockquote>')
      .replace(/^---$/gm, '<hr class="my-4 border-neutral-200" />')
      .replace(/\n/g, '<br />')

    return html
  }

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleBold}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleItalic}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Italic"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            type="button"
            onClick={handleHeading1}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={handleHeading2}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={handleHeading3}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 3"
          >
            H3
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            type="button"
            onClick={handleBulletList}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Bullet List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNumberedList}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Numbered List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="3" y="8" fontSize="8" fill="currentColor">1</text>
              <text x="3" y="14" fontSize="8" fill="currentColor">2</text>
              <text x="3" y="20" fontSize="8" fill="currentColor">3</text>
            </svg>
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            type="button"
            onClick={handleLink}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </button>
        </div>

        {/* Write/Preview Tabs */}
        <div className="flex items-center bg-neutral-200 rounded-md p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'write'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      {activeTab === 'write' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[400px] p-4 text-sm text-neutral-950 font-mono resize-none focus:outline-none"
          placeholder="Write your terms content using Markdown..."
        />
      ) : (
        <div
          className="w-full h-[400px] p-4 overflow-y-auto text-sm text-neutral-950"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      )}
    </div>
  )
}

const TERMS_TYPES = [
  { value: 'terms_of_service', label: 'Terms of Service' },
  { value: 'privacy_policy', label: 'Privacy Policy' },
  { value: 'consent', label: 'Data Collection Consent' },
  { value: 'custom', label: 'Custom Terms' },
]

export default function TermsPage() {
  const [terms, setTerms] = useState<TermsItem[]>([
    {
      id: 'terms-1',
      name: 'Exhibitor Terms of Service',
      type: 'terms_of_service',
      content: `# Exhibitor Terms of Service

## 1. Acceptance of Terms

By applying for exhibition space, you agree to be bound by these Terms of Service.

## 2. Exhibition Space

- Booth assignments are subject to availability
- Setup and teardown must follow the designated schedule
- All displays must comply with safety regulations

## 3. Payment Terms

- 50% deposit required upon confirmation
- Full payment due 30 days before event
- Cancellation fees apply as per the policy

## 4. Exhibitor Conduct

- Professional behavior is required at all times
- Noise levels must be kept reasonable
- Sales activities must remain within designated booth area`,
      version: '1.0',
      isRequired: true,
      isActive: true,
      usedIn: [
        { type: 'exhibitor_process', name: 'Standard Application' },
        { type: 'exhibitor_process', name: 'Premium Application' },
      ],
      lastUpdated: 'Jan 15, 2026',
      createdAt: 'Jan 1, 2026',
    },
    {
      id: 'terms-2',
      name: 'Privacy Policy',
      type: 'privacy_policy',
      content: `# Privacy Policy

## 1. Information We Collect

We collect information you provide during registration:
- Company information
- Contact details
- Business information

## 2. How We Use Your Information

- To process your application
- To communicate event updates
- To provide exhibitor services

## 3. Data Sharing

Your information may be shared with:
- Event organizers
- Service providers
- As required by law`,
      version: '1.2',
      isRequired: true,
      isActive: true,
      usedIn: [
        { type: 'exhibitor_process', name: 'Standard Application' },
        { type: 'exhibitor_process', name: 'Premium Application' },
        { type: 'visitor_registration', name: 'General Admission' },
      ],
      lastUpdated: 'Jan 20, 2026',
      createdAt: 'Jan 1, 2026',
    },
    {
      id: 'terms-3',
      name: 'Marketing Consent',
      type: 'consent',
      content: `# Marketing Consent

I agree to receive marketing communications from Seoul Living Design Fair and its partners, including:

- Event updates and announcements
- Partner offers and promotions
- Industry news and insights

You can unsubscribe at any time by clicking the unsubscribe link in our emails.`,
      version: '1.0',
      isRequired: false,
      isActive: true,
      usedIn: [
        { type: 'exhibitor_process', name: 'Standard Application' },
        { type: 'visitor_registration', name: 'General Admission' },
      ],
      lastUpdated: 'Jan 10, 2026',
      createdAt: 'Jan 10, 2026',
    },
    {
      id: 'terms-4',
      name: 'Photo/Video Release',
      type: 'custom',
      content: `# Photo and Video Release

I grant permission to Seoul Living Design Fair to capture and use photographs and video recordings of my company's booth and representatives for promotional purposes.`,
      version: '1.0',
      isRequired: false,
      isActive: false,
      usedIn: [],
      lastUpdated: 'Jan 5, 2026',
      createdAt: 'Jan 5, 2026',
    },
  ])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedTerms, setSelectedTerms] = useState<TermsItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Create/Edit form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'terms_of_service' as TermsItem['type'],
    content: '',
    isRequired: true,
    isActive: true,
  })

  // Dropdown states
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false)
  const [isFilterTypeOpen, setIsFilterTypeOpen] = useState(false)
  const [isFilterStatusOpen, setIsFilterStatusOpen] = useState(false)
  const typeDropdownRef = useRef<HTMLDivElement>(null)
  const filterTypeRef = useRef<HTMLDivElement>(null)
  const filterStatusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeDropdownOpen(false)
      }
      if (filterTypeRef.current && !filterTypeRef.current.contains(event.target as Node)) {
        setIsFilterTypeOpen(false)
      }
      if (filterStatusRef.current && !filterStatusRef.current.contains(event.target as Node)) {
        setIsFilterStatusOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const filteredTerms = terms.filter((term) => {
    const matchesSearch = term.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || term.type === filterType
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && term.isActive) ||
      (filterStatus === 'inactive' && !term.isActive)
    return matchesSearch && matchesType && matchesStatus
  })

  const handleOpenCreate = () => {
    setFormData({
      name: '',
      type: 'terms_of_service',
      content: '',
      isRequired: true,
      isActive: true,
    })
    setIsCreateModalOpen(true)
  }

  const handleOpenEdit = (term: TermsItem) => {
    setSelectedTerms(term)
    setFormData({
      name: term.name,
      type: term.type,
      content: term.content,
      isRequired: term.isRequired,
      isActive: term.isActive,
    })
    setIsEditModalOpen(true)
  }

  const handleCreate = () => {
    const newTerms: TermsItem = {
      id: `terms-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      content: formData.content,
      version: '1.0',
      isRequired: formData.isRequired,
      isActive: formData.isActive,
      usedIn: [],
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
    setTerms([...terms, newTerms])
    setIsCreateModalOpen(false)
  }

  const handleUpdate = () => {
    if (!selectedTerms) return
    const newVersion = (parseFloat(selectedTerms.version) + 0.1).toFixed(1)
    setTerms(terms.map(t =>
      t.id === selectedTerms.id
        ? {
            ...t,
            name: formData.name,
            type: formData.type,
            content: formData.content,
            isRequired: formData.isRequired,
            isActive: formData.isActive,
            version: newVersion,
            lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          }
        : t
    ))
    setIsEditModalOpen(false)
    setSelectedTerms(null)
  }

  const handleToggleActive = (id: string) => {
    setTerms(terms.map(t =>
      t.id === id ? { ...t, isActive: !t.isActive } : t
    ))
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this terms document?')) {
      setTerms(terms.filter(t => t.id !== id))
    }
  }

  const getTypeLabel = (type: string) => {
    return TERMS_TYPES.find(t => t.value === type)?.label || type
  }

  const getUsageTypeLabel = (type: string) => {
    switch (type) {
      case 'exhibitor_process': return 'Exhibitor Process'
      case 'visitor_registration': return 'Visitor Registration'
      case 'speaker_registration': return 'Speaker Registration'
      default: return type
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Terms & Agreements</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage terms, policies, and consent forms for this event</p>
        </div>
        <button onClick={handleOpenCreate} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Terms
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10"
          />
        </div>

        {/* Type Filter */}
        <div className="relative" ref={filterTypeRef}>
          <button
            type="button"
            onClick={() => setIsFilterTypeOpen(!isFilterTypeOpen)}
            className="input text-left flex items-center justify-between pr-4 min-w-[160px]"
          >
            <span className={filterType === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {filterType === 'all' ? 'All Types' : getTypeLabel(filterType)}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterTypeOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterType('all'); setIsFilterTypeOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                    filterType === 'all' ? 'bg-admin-primary-50' : ''
                  }`}
                >
                  <span className="text-sm text-neutral-800">All Types</span>
                  {filterType === 'all' && (
                    <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {TERMS_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => { setFilterType(type.value); setIsFilterTypeOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                      filterType === type.value ? 'bg-admin-primary-50' : ''
                    }`}
                  >
                    <span className="text-sm text-neutral-800">{type.label}</span>
                    {filterType === type.value && (
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

        {/* Status Filter */}
        <div className="relative" ref={filterStatusRef}>
          <button
            type="button"
            onClick={() => setIsFilterStatusOpen(!isFilterStatusOpen)}
            className="input text-left flex items-center justify-between pr-4 min-w-[140px]"
          >
            <span className={filterStatus === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {filterStatus === 'all' ? 'All Status' : filterStatus === 'active' ? 'Active' : 'Inactive'}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterStatusOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                {[
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ].map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => { setFilterStatus(status.value); setIsFilterStatusOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                      filterStatus === status.value ? 'bg-admin-primary-50' : ''
                    }`}
                  >
                    <span className="text-sm text-neutral-800">{status.label}</span>
                    {filterStatus === status.value && (
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

      {/* Terms List */}
      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Used In</th>
              <th>Status</th>
              <th>Version</th>
              <th>Last Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTerms.map((term) => (
              <tr key={term.id}>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-neutral-950">{term.name}</span>
                    {term.isRequired && (
                      <span className="inline-flex px-1.5 py-0.5 text-micro font-medium bg-status-error-bg text-status-error-border rounded">
                        Required
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <span className="text-sm text-neutral-600">{getTypeLabel(term.type)}</span>
                </td>
                <td>
                  {term.usedIn.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {term.usedIn.slice(0, 2).map((usage, idx) => (
                        <Badge key={idx} variant="status" color="info">
                          <span className="max-w-[100px] truncate">{usage.name}</span>
                        </Badge>
                      ))}
                      {term.usedIn.length > 2 && (
                        <Badge variant="status" color="neutral">
                          +{term.usedIn.length - 2} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-neutral-400">Not used</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleToggleActive(term.id)}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      term.isActive ? 'bg-admin-primary-600' : 'bg-neutral-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        term.isActive ? 'translate-x-4.5' : 'translate-x-1'
                      }`}
                      style={{ transform: term.isActive ? 'translateX(18px)' : 'translateX(4px)' }}
                    />
                  </button>
                </td>
                <td>
                  <span className="text-sm text-neutral-600">v{term.version}</span>
                </td>
                <td>
                  <span className="text-sm text-neutral-500">{term.lastUpdated}</span>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(term)}
                      className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-admin-primary-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(term.id)}
                      className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                      title="Delete"
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

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-neutral-500">No terms found</p>
            <button onClick={handleOpenCreate} className="mt-4 text-sm text-admin-primary-600 hover:text-admin-primary-700 font-medium">
              Create your first terms document
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h2 className="text-lg font-semibold text-neutral-950">Create Terms</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
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
                <label className="block text-sm font-medium text-neutral-950 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Exhibitor Terms of Service"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Type</label>
                <div className="relative" ref={typeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950">{getTypeLabel(formData.type)}</span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTypeDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {TERMS_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => { setFormData({ ...formData, type: type.value as TermsItem['type'] }); setIsTypeDropdownOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                              formData.type === type.value ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <span className="text-sm text-neutral-800">{type.label}</span>
                            {formData.type === type.value && (
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

              {/* Options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isRequired}
                    onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">Required agreement</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">Active</span>
                </label>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Content</label>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button onClick={() => setIsCreateModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!formData.name.trim() || !formData.content.trim()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Terms
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <div>
                <h2 className="text-lg font-semibold text-neutral-950">Edit Terms</h2>
                <p className="text-sm text-neutral-500 mt-0.5">Version {selectedTerms.version}</p>
              </div>
              <button
                onClick={() => { setIsEditModalOpen(false); setSelectedTerms(null) }}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Usage Info */}
              {selectedTerms.usedIn.length > 0 && (
                <div className="bg-status-info-bg border border-status-info-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-status-info-border flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-status-info-text">This terms document is currently in use</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedTerms.usedIn.map((usage, idx) => (
                          <Badge key={idx} variant="status" color="info">
                            {getUsageTypeLabel(usage.type)}: {usage.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Type</label>
                <div className="relative" ref={typeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950">{getTypeLabel(formData.type)}</span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isTypeDropdownOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1">
                        {TERMS_TYPES.map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => { setFormData({ ...formData, type: type.value as TermsItem['type'] }); setIsTypeDropdownOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${
                              formData.type === type.value ? 'bg-admin-primary-50' : ''
                            }`}
                          >
                            <span className="text-sm text-neutral-800">{type.label}</span>
                            {formData.type === type.value && (
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

              {/* Options */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isRequired}
                    onChange={(e) => setFormData({ ...formData, isRequired: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">Required agreement</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-950">Active</span>
                </label>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-neutral-950 mb-2">Content</label>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-100">
              <button onClick={() => { setIsEditModalOpen(false); setSelectedTerms(null) }} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!formData.name.trim() || !formData.content.trim()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

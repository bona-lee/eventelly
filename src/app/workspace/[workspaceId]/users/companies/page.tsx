'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

interface ContactPerson {
  id: string
  name: string
  email: string
  phone: string
  position: string
  isMain: boolean
}

interface EventParticipation {
  id: string
  eventName: string
  eventSeriesName: string
  date: string
  boothNumber: string
  boothSize: string
  status: 'Attended' | 'Registered' | 'Cancelled'
}

interface Exhibitor {
  id: string
  companyName: string
  companyNameEn: string
  representative: string
  email: string
  phone: string
  businessNumber: string
  industry: string
  country: string
  address: string
  website: string
  description: string
  registeredAt: string
  lastEventAt: string
  eventCount: number
  status: 'Active' | 'Inactive'
  contacts: ContactPerson[]
  participationHistory: EventParticipation[]
}

export default function ExhibitorsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const [exhibitors] = useState<Exhibitor[]>([
    {
      id: '1',
      companyName: '디자인하우스',
      companyNameEn: 'Design House Co.',
      representative: '김철수',
      email: 'info@designhouse.co.kr',
      phone: '02-1234-5678',
      businessNumber: '123-45-67890',
      industry: 'Furniture',
      country: 'South Korea',
      address: '서울시 강남구 테헤란로 123',
      website: 'www.designhouse.co.kr',
      description: '프리미엄 가구 디자인 및 제조 전문 기업',
      registeredAt: 'Jan 15, 2023',
      lastEventAt: 'Dec 10, 2024',
      eventCount: 5,
      status: 'Active',
      contacts: [
        { id: '1', name: '김철수', email: 'ceo@designhouse.co.kr', phone: '010-1111-2222', position: 'CEO', isMain: true },
        { id: '2', name: '박영희', email: 'marketing@designhouse.co.kr', phone: '010-3333-4444', position: 'Marketing Manager', isMain: false },
        { id: '3', name: '이민수', email: 'sales@designhouse.co.kr', phone: '010-5555-6666', position: 'Sales Director', isMain: false },
      ],
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Dec 10, 2024', boothNumber: 'A-101', boothSize: '36sqm', status: 'Attended' },
        { id: '2', eventName: 'Busan Living Design Fair 2024', eventSeriesName: 'Busan Living Design Fair', date: 'Oct 20, 2024', boothNumber: 'B-205', boothSize: '24sqm', status: 'Attended' },
        { id: '3', eventName: 'Seoul Design Festival 2024', eventSeriesName: 'Seoul Design Festival', date: 'Aug 5, 2024', boothNumber: 'C-301', boothSize: '18sqm', status: 'Attended' },
      ]
    },
    {
      id: '2',
      companyName: '모던리빙',
      companyNameEn: 'Modern Living Inc.',
      representative: '이영희',
      email: 'contact@modernliving.com',
      phone: '02-2345-6789',
      businessNumber: '234-56-78901',
      industry: 'Home Decor',
      country: 'South Korea',
      address: '서울시 서초구 강남대로 456',
      website: 'www.modernliving.com',
      description: '현대적인 홈 데코 제품 전문',
      registeredAt: 'Mar 20, 2023',
      lastEventAt: 'Nov 25, 2024',
      eventCount: 3,
      status: 'Active',
      contacts: [
        { id: '1', name: '이영희', email: 'ceo@modernliving.com', phone: '010-2222-3333', position: 'CEO', isMain: true },
        { id: '2', name: '정수진', email: 'design@modernliving.com', phone: '010-4444-5555', position: 'Design Director', isMain: false },
      ],
      participationHistory: [
        { id: '1', eventName: 'Seoul Living Design Fair 2024', eventSeriesName: 'Seoul Living Design Fair', date: 'Nov 25, 2024', boothNumber: 'A-205', boothSize: '24sqm', status: 'Attended' },
      ]
    },
    {
      id: '3',
      companyName: '노르딕 인테리어',
      companyNameEn: 'Nordic Interior',
      representative: 'Erik Johansson',
      email: 'erik@nordic-interior.se',
      phone: '+46-8-123-4567',
      businessNumber: 'SE556677-8899',
      industry: 'Interior Design',
      country: 'Sweden',
      address: 'Storgatan 15, Stockholm',
      website: 'www.nordic-interior.se',
      description: 'Scandinavian design furniture and interior',
      registeredAt: 'May 5, 2023',
      lastEventAt: 'Oct 15, 2024',
      eventCount: 2,
      status: 'Active',
      contacts: [
        { id: '1', name: 'Erik Johansson', email: 'erik@nordic-interior.se', phone: '+46-70-123-4567', position: 'Founder', isMain: true },
      ],
      participationHistory: []
    },
    {
      id: '4',
      companyName: '이태리 가구',
      companyNameEn: 'Italia Furniture',
      representative: 'Marco Rossi',
      email: 'marco@italiafurniture.it',
      phone: '+39-02-1234-5678',
      businessNumber: 'IT12345678901',
      industry: 'Furniture',
      country: 'Italy',
      address: 'Via Roma 100, Milano',
      website: 'www.italiafurniture.it',
      description: 'Premium Italian furniture manufacturer',
      registeredAt: 'Jun 10, 2023',
      lastEventAt: 'Sep 20, 2024',
      eventCount: 4,
      status: 'Active',
      contacts: [
        { id: '1', name: 'Marco Rossi', email: 'marco@italiafurniture.it', phone: '+39-335-123-4567', position: 'CEO', isMain: true },
        { id: '2', name: 'Giulia Bianchi', email: 'giulia@italiafurniture.it', phone: '+39-335-234-5678', position: 'Export Manager', isMain: false },
      ],
      participationHistory: []
    },
    {
      id: '5',
      companyName: '아트갤러리 서울',
      companyNameEn: 'Art Gallery Seoul',
      representative: '박지민',
      email: 'art@galleryseoul.kr',
      phone: '02-3456-7890',
      businessNumber: '345-67-89012',
      industry: 'Art & Gallery',
      country: 'South Korea',
      address: '서울시 종로구 인사동길 12',
      website: 'www.galleryseoul.kr',
      description: '현대 미술 갤러리 및 아트 컨설팅',
      registeredAt: 'Jul 15, 2023',
      lastEventAt: 'Aug 30, 2024',
      eventCount: 2,
      status: 'Active',
      contacts: [
        { id: '1', name: '박지민', email: 'art@galleryseoul.kr', phone: '010-6666-7777', position: 'Gallery Director', isMain: true },
      ],
      participationHistory: []
    },
    {
      id: '6',
      companyName: '라이프스타일 코리아',
      companyNameEn: 'Lifestyle Korea',
      representative: '최수진',
      email: 'hello@lifestylekorea.com',
      phone: '02-4567-8901',
      businessNumber: '456-78-90123',
      industry: 'Lifestyle',
      country: 'South Korea',
      address: '서울시 마포구 홍대길 55',
      website: 'www.lifestylekorea.com',
      description: '라이프스타일 브랜드 큐레이션',
      registeredAt: 'Aug 1, 2023',
      lastEventAt: 'Jul 10, 2024',
      eventCount: 1,
      status: 'Inactive',
      contacts: [
        { id: '1', name: '최수진', email: 'hello@lifestylekorea.com', phone: '010-7777-8888', position: 'CEO', isMain: true },
      ],
      participationHistory: []
    },
    {
      id: '7',
      companyName: '독일 키친',
      companyNameEn: 'German Kitchen GmbH',
      representative: 'Hans Mueller',
      email: 'info@germankitchen.de',
      phone: '+49-30-1234-5678',
      businessNumber: 'DE123456789',
      industry: 'Kitchen',
      country: 'Germany',
      address: 'Berliner Str. 50, Berlin',
      website: 'www.germankitchen.de',
      description: 'Premium German kitchen systems',
      registeredAt: 'Sep 20, 2023',
      lastEventAt: 'Jun 5, 2024',
      eventCount: 1,
      status: 'Active',
      contacts: [
        { id: '1', name: 'Hans Mueller', email: 'info@germankitchen.de', phone: '+49-170-123-4567', position: 'Managing Director', isMain: true },
      ],
      participationHistory: []
    },
    {
      id: '8',
      companyName: '일본 조명',
      companyNameEn: 'Japan Lighting Co.',
      representative: 'Yuki Tanaka',
      email: 'yuki@japanlighting.jp',
      phone: '+81-3-1234-5678',
      businessNumber: 'JP1234567890123',
      industry: 'Lighting',
      country: 'Japan',
      address: 'Shibuya-ku, Tokyo',
      website: 'www.japanlighting.jp',
      description: 'Innovative lighting solutions',
      registeredAt: 'Oct 5, 2023',
      lastEventAt: 'May 15, 2024',
      eventCount: 2,
      status: 'Active',
      contacts: [
        { id: '1', name: 'Yuki Tanaka', email: 'yuki@japanlighting.jp', phone: '+81-90-1234-5678', position: 'CEO', isMain: true },
        { id: '2', name: 'Kenji Sato', email: 'kenji@japanlighting.jp', phone: '+81-90-2345-6789', position: 'International Sales', isMain: false },
      ],
      participationHistory: []
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null)
  const [detailTab, setDetailTab] = useState<'info' | 'contacts' | 'history'>('info')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Exhibitor>>({})
  const [editingContactId, setEditingContactId] = useState<string | null>(null)
  const [editContactForm, setEditContactForm] = useState<Partial<ContactPerson>>({})
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState<Partial<ContactPerson>>({ name: '', email: '', phone: '', position: '', isMain: false })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createMode, setCreateMode] = useState<'single' | 'bulk' | null>(null)
  const [newExhibitor, setNewExhibitor] = useState<Partial<Exhibitor>>({
    companyName: '',
    companyNameEn: '',
    representative: '',
    email: '',
    phone: '',
    businessNumber: '',
    industry: '',
    country: '',
    address: '',
    website: '',
    description: '',
  })
  const [newExhibitorContact, setNewExhibitorContact] = useState<Partial<ContactPerson>>({
    name: '',
    email: '',
    phone: '',
    position: '',
    isMain: true,
  })
  const [bulkFile, setBulkFile] = useState<File | null>(null)
  const [bulkPreview, setBulkPreview] = useState<Array<{companyName: string, email: string, representative: string}>>([])

  // Dropdown states
  const [isIndustryOpen, setIsIndustryOpen] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const industryRef = useRef<HTMLDivElement>(null)
  const countryRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const industries = [...new Set(exhibitors.map(e => e.industry))]
  const countries = [...new Set(exhibitors.map(e => e.country))]

  const filteredExhibitors = useMemo(() => {
    return exhibitors.filter(e => {
      const matchesSearch =
        e.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.companyNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.representative.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesIndustry = !industryFilter || e.industry === industryFilter
      const matchesCountry = !countryFilter || e.country === countryFilter
      const matchesStatus = !statusFilter || e.status === statusFilter
      return matchesSearch && matchesIndustry && matchesCountry && matchesStatus
    })
  }, [exhibitors, searchQuery, industryFilter, countryFilter, statusFilter])

  // Click outside handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industryRef.current && !industryRef.current.contains(event.target as Node)) {
        setIsIndustryOpen(false)
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'success' as const : 'neutral' as const
  }

  const getParticipationStatusColor = (status: string) => {
    switch (status) {
      case 'Attended':
        return 'success' as const
      case 'Registered':
        return 'info' as const
      case 'Cancelled':
        return 'error' as const
      default:
        return 'neutral' as const
    }
  }

  const handleSelectExhibitor = (exhibitor: Exhibitor) => {
    setSelectedExhibitor(exhibitor)
    setDetailTab('info')
    setIsEditing(false)
    setEditForm({})
  }

  const handleStartEdit = () => {
    if (selectedExhibitor) {
      setEditForm({
        companyName: selectedExhibitor.companyName,
        companyNameEn: selectedExhibitor.companyNameEn,
        representative: selectedExhibitor.representative,
        businessNumber: selectedExhibitor.businessNumber,
        industry: selectedExhibitor.industry,
        country: selectedExhibitor.country,
        email: selectedExhibitor.email,
        phone: selectedExhibitor.phone,
        address: selectedExhibitor.address,
        website: selectedExhibitor.website,
        description: selectedExhibitor.description,
      })
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({})
  }

  const handleSaveEdit = () => {
    // In real app, this would call an API
    if (selectedExhibitor) {
      setSelectedExhibitor({
        ...selectedExhibitor,
        ...editForm,
      } as Exhibitor)
    }
    setIsEditing(false)
    setEditForm({})
  }

  // Contact editing functions
  const handleStartEditContact = (contact: ContactPerson) => {
    setEditingContactId(contact.id)
    setEditContactForm({ ...contact })
  }

  const handleCancelEditContact = () => {
    setEditingContactId(null)
    setEditContactForm({})
  }

  const handleSaveContact = () => {
    if (selectedExhibitor && editingContactId) {
      const updatedContacts = selectedExhibitor.contacts.map(c =>
        c.id === editingContactId ? { ...c, ...editContactForm } as ContactPerson : c
      )
      setSelectedExhibitor({ ...selectedExhibitor, contacts: updatedContacts })
    }
    setEditingContactId(null)
    setEditContactForm({})
  }

  const handleDeleteContact = (contactId: string) => {
    if (selectedExhibitor && confirm('Are you sure you want to delete this contact?')) {
      const updatedContacts = selectedExhibitor.contacts.filter(c => c.id !== contactId)
      setSelectedExhibitor({ ...selectedExhibitor, contacts: updatedContacts })
    }
  }

  const handleAddContact = () => {
    if (selectedExhibitor && newContact.name && newContact.email) {
      const contact: ContactPerson = {
        id: Date.now().toString(),
        name: newContact.name || '',
        email: newContact.email || '',
        phone: newContact.phone || '',
        position: newContact.position || '',
        isMain: newContact.isMain || false,
      }
      setSelectedExhibitor({
        ...selectedExhibitor,
        contacts: [...selectedExhibitor.contacts, contact]
      })
      setNewContact({ name: '', email: '', phone: '', position: '', isMain: false })
      setShowAddContact(false)
    }
  }

  const handleSetMainContact = (contactId: string) => {
    if (selectedExhibitor) {
      const updatedContacts = selectedExhibitor.contacts.map(c => ({
        ...c,
        isMain: c.id === contactId
      }))
      setSelectedExhibitor({ ...selectedExhibitor, contacts: updatedContacts })
    }
  }

  return (
    <div className="flex">
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${selectedExhibitor ? 'mr-[480px]' : ''}`}>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-950">Exhibitors</h1>
            <p className="mt-1 text-sm text-neutral-500">Unified exhibitor accounts registered in this workspace</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCreateModal(!showCreateModal)}
              className="btn btn-primary"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Exhibitor
            </button>
            {showCreateModal && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-10">
                <button
                  onClick={() => { setCreateMode('single'); setShowCreateModal(false); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-neutral-950 hover:bg-neutral-50 flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Add Single Exhibitor
                </button>
                <button
                  onClick={() => { setCreateMode('bulk'); setShowCreateModal(false); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-neutral-950 hover:bg-neutral-50 flex items-center gap-3"
                >
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Bulk Import (Excel)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Total Exhibitors</p>
            <p className="text-2xl font-bold text-neutral-950 mt-1">{exhibitors.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Active</p>
            <p className="text-2xl font-bold text-status-success-border mt-1">{exhibitors.filter(e => e.status === 'Active').length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Countries</p>
            <p className="text-2xl font-bold text-status-info-border mt-1">{countries.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-neutral-500">Industries</p>
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI stat */}
            <p className="text-2xl font-bold text-purple-600 mt-1">{industries.length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company, email, representative..."
                className="input"
              />
            </div>
            {/* Industry Filter Dropdown */}
            <div className="relative w-40" ref={industryRef}>
              <button
                type="button"
                onClick={() => setIsIndustryOpen(!isIndustryOpen)}
                className="w-full input text-left flex items-center justify-between pr-4"
              >
                {industryFilter ? (
                  <span className="text-neutral-950 flex-1 truncate">{industryFilter}</span>
                ) : (
                  <span className="text-neutral-500 flex-1">All Industries</span>
                )}
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isIndustryOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setIndustryFilter(''); setIsIndustryOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${industryFilter === '' ? 'bg-admin-primary-50' : ''}`}
                    >
                      <span className="text-sm text-neutral-800">All Industries</span>
                      {industryFilter === '' && (
                        <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => { setIndustryFilter(industry); setIsIndustryOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${industryFilter === industry ? 'bg-admin-primary-50' : ''}`}
                      >
                        <span className="text-sm text-neutral-800">{industry}</span>
                        {industryFilter === industry && (
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
            {/* Country Filter Dropdown */}
            <div className="relative w-40" ref={countryRef}>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-full input text-left flex items-center justify-between pr-4"
              >
                {countryFilter ? (
                  <span className="text-neutral-950 flex-1 truncate">{countryFilter}</span>
                ) : (
                  <span className="text-neutral-500 flex-1">All Countries</span>
                )}
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCountryOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setCountryFilter(''); setIsCountryOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${countryFilter === '' ? 'bg-admin-primary-50' : ''}`}
                    >
                      <span className="text-sm text-neutral-800">All Countries</span>
                      {countryFilter === '' && (
                        <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => { setCountryFilter(country); setIsCountryOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${countryFilter === country ? 'bg-admin-primary-50' : ''}`}
                      >
                        <span className="text-sm text-neutral-800">{country}</span>
                        {countryFilter === country && (
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
            {/* Status Filter Dropdown */}
            <div className="relative w-36" ref={statusRef}>
              <button
                type="button"
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="w-full input text-left flex items-center justify-between pr-4"
              >
                {statusFilter ? (
                  <span className="text-neutral-950 flex-1 truncate">{statusFilter}</span>
                ) : (
                  <span className="text-neutral-500 flex-1">All Status</span>
                )}
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isStatusOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => { setStatusFilter(''); setIsStatusOpen(false) }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${statusFilter === '' ? 'bg-admin-primary-50' : ''}`}
                    >
                      <span className="text-sm text-neutral-800">All Status</span>
                      {statusFilter === '' && (
                        <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    {['Active', 'Inactive'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => { setStatusFilter(status); setIsStatusOpen(false) }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${statusFilter === status ? 'bg-admin-primary-50' : ''}`}
                      >
                        <span className="text-sm text-neutral-800">{status}</span>
                        {statusFilter === status && (
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
        </div>

        {/* Table */}
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Representative</th>
                <th>Industry</th>
                <th>Country</th>
                <th>Events</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredExhibitors.map((exhibitor) => (
                <tr
                  key={exhibitor.id}
                  onClick={() => handleSelectExhibitor(exhibitor)}
                  className={`cursor-pointer ${selectedExhibitor?.id === exhibitor.id ? 'bg-admin-primary-50' : ''}`}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative company avatar */}
                      <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                        {exhibitor.companyName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-neutral-950">{exhibitor.companyName}</p>
                        <p className="text-xs text-neutral-500">{exhibitor.companyNameEn}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="text-sm text-neutral-950">{exhibitor.representative}</p>
                      <p className="text-xs text-neutral-500">{exhibitor.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{exhibitor.industry}</span>
                  </td>
                  <td>
                    <span className="text-sm text-neutral-600">{exhibitor.country}</span>
                  </td>
                  <td>
                    <Badge variant="compact" color="primary">
                      {exhibitor.eventCount} events
                    </Badge>
                  </td>
                  <td>
                    <Badge variant="status" color={getStatusColor(exhibitor.status)}>
                      {exhibitor.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredExhibitors.length === 0 && (
            <div className="py-12 text-center">
              <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="mt-4 text-sm text-neutral-500">No exhibitors found</p>
            </div>
          )}
        </div>
      </div>

      {/* Slide Panel */}
      {selectedExhibitor && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setSelectedExhibitor(null)}
          />

          {/* Panel */}
          <div className="fixed top-14 right-0 bottom-0 w-[480px] bg-white border-l border-neutral-200 shadow-lg z-50 overflow-hidden flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative company avatar */}
                <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xl">
                  {selectedExhibitor.companyName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-950">{selectedExhibitor.companyName}</h3>
                  <p className="text-sm text-neutral-500">{selectedExhibitor.companyNameEn}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExhibitor(null)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-neutral-200 px-6">
              <nav className="flex gap-6">
                <button
                  onClick={() => setDetailTab('info')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    detailTab === 'info'
                      ? 'border-admin-primary text-admin-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Company Info
                </button>
                <button
                  onClick={() => setDetailTab('contacts')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    detailTab === 'contacts'
                      ? 'border-admin-primary text-admin-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Contacts
                  <Badge variant="compact" color="neutral" className="ml-1.5">
                    {selectedExhibitor.contacts.length}
                  </Badge>
                </button>
                <button
                  onClick={() => setDetailTab('history')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                    detailTab === 'history'
                      ? 'border-admin-primary text-admin-primary-700'
                      : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Participation
                  <Badge variant="compact" color="neutral" className="ml-1.5">
                    {selectedExhibitor.participationHistory.length}
                  </Badge>
                </button>
              </nav>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {detailTab === 'info' ? (
                <div className="space-y-6">
                  {isEditing ? (
                    <>
                      {/* Edit Mode */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Company Information</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Company Name (Korean)</label>
                            <input
                              type="text"
                              value={editForm.companyName || ''}
                              onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Company Name (English)</label>
                            <input
                              type="text"
                              value={editForm.companyNameEn || ''}
                              onChange={(e) => setEditForm({ ...editForm, companyNameEn: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Representative</label>
                            <input
                              type="text"
                              value={editForm.representative || ''}
                              onChange={(e) => setEditForm({ ...editForm, representative: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Business Number</label>
                            <input
                              type="text"
                              value={editForm.businessNumber || ''}
                              onChange={(e) => setEditForm({ ...editForm, businessNumber: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Industry</label>
                            <input
                              type="text"
                              value={editForm.industry || ''}
                              onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Country</label>
                            <input
                              type="text"
                              value={editForm.country || ''}
                              onChange={(e) => setEditForm({ ...editForm, country: e.target.value })}
                              className="input"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Contact</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Email</label>
                            <input
                              type="email"
                              value={editForm.email || ''}
                              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Phone</label>
                            <input
                              type="text"
                              value={editForm.phone || ''}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Address</label>
                            <input
                              type="text"
                              value={editForm.address || ''}
                              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                              className="input"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-neutral-500 mb-1 block">Website</label>
                            <input
                              type="text"
                              value={editForm.website || ''}
                              onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                              className="input"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Description</h4>
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={3}
                          className="input resize-none"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* View Mode */}
                      {/* Company Information */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Company Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Representative</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.representative}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Business Number</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.businessNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Industry</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.industry}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Country</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.country}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Contact</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Email</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Phone</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Address</span>
                            <span className="text-sm text-neutral-950 text-right max-w-[200px]">{selectedExhibitor.address}</span>
                          </div>
                          {selectedExhibitor.website && (
                            <div className="flex justify-between">
                              <span className="text-sm text-neutral-500">Website</span>
                              <a href={`https://${selectedExhibitor.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-admin-primary-700 hover:underline">
                                {selectedExhibitor.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {selectedExhibitor.description && (
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-950 mb-3">Description</h4>
                          <p className="text-sm text-neutral-600">{selectedExhibitor.description}</p>
                        </div>
                      )}

                      {/* Activity */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-950 mb-3">Activity</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Registered</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.registeredAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Last Event</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.lastEventAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-neutral-500">Total Events</span>
                            <span className="text-sm text-neutral-950">{selectedExhibitor.eventCount} events</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="pt-4 border-t border-neutral-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-950">Account Status</p>
                            <p className="text-xs text-neutral-500 mt-0.5">Current status</p>
                          </div>
                          <Badge variant="status" color={getStatusColor(selectedExhibitor.status)}>
                            {selectedExhibitor.status}
                          </Badge>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : detailTab === 'contacts' ? (
                <div className="space-y-4">
                  {/* Add Contact Button */}
                  {!showAddContact && (
                    <button
                      onClick={() => setShowAddContact(true)}
                      className="w-full p-3 border-2 border-dashed border-neutral-200 rounded-lg text-sm text-neutral-500 hover:border-admin-primary-300 hover:text-admin-primary-700 hover:bg-admin-primary-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Contact
                    </button>
                  )}

                  {/* Add Contact Form */}
                  {showAddContact && (
                    <div className="p-4 bg-admin-primary-50 border border-admin-primary-200 rounded-lg">
                      <h5 className="text-sm font-medium text-neutral-950 mb-3">New Contact</h5>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newContact.name || ''}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                          placeholder="Name *"
                          className="input"
                        />
                        <input
                          type="text"
                          value={newContact.position || ''}
                          onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                          placeholder="Position"
                          className="input"
                        />
                        <input
                          type="email"
                          value={newContact.email || ''}
                          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                          placeholder="Email *"
                          className="input"
                        />
                        <input
                          type="text"
                          value={newContact.phone || ''}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                          placeholder="Phone"
                          className="input"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="new-contact-main"
                            checked={newContact.isMain || false}
                            onChange={(e) => setNewContact({ ...newContact, isMain: e.target.checked })}
                            className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600"
                          />
                          <label htmlFor="new-contact-main" className="text-sm text-neutral-950">Set as main contact</label>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => { setShowAddContact(false); setNewContact({ name: '', email: '', phone: '', position: '', isMain: false }); }}
                          className="btn btn-secondary flex-1 text-sm py-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddContact}
                          disabled={!newContact.name || !newContact.email}
                          className="btn btn-primary flex-1 text-sm py-2 disabled:opacity-50"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contact List */}
                  {selectedExhibitor.contacts.length > 0 ? (
                    selectedExhibitor.contacts.map((contact) => (
                      <div key={contact.id} className="p-4 bg-neutral-50 rounded-lg">
                        {editingContactId === contact.id ? (
                          // Edit Mode
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editContactForm.name || ''}
                              onChange={(e) => setEditContactForm({ ...editContactForm, name: e.target.value })}
                              placeholder="Name"
                              className="input"
                            />
                            <input
                              type="text"
                              value={editContactForm.position || ''}
                              onChange={(e) => setEditContactForm({ ...editContactForm, position: e.target.value })}
                              placeholder="Position"
                              className="input"
                            />
                            <input
                              type="email"
                              value={editContactForm.email || ''}
                              onChange={(e) => setEditContactForm({ ...editContactForm, email: e.target.value })}
                              placeholder="Email"
                              className="input"
                            />
                            <input
                              type="text"
                              value={editContactForm.phone || ''}
                              onChange={(e) => setEditContactForm({ ...editContactForm, phone: e.target.value })}
                              placeholder="Phone"
                              className="input"
                            />
                            <div className="flex gap-2 mt-2">
                              <button onClick={handleCancelEditContact} className="btn btn-secondary flex-1 text-sm py-2">
                                Cancel
                              </button>
                              <button onClick={handleSaveContact} className="btn btn-primary flex-1 text-sm py-2">
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 font-medium text-sm">
                                  {contact.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-neutral-950">{contact.name}</p>
                                    {contact.isMain && (
                                      <Badge variant="compact" color="primary">Main</Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-neutral-500 mt-0.5">{contact.position}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {!contact.isMain && (
                                  <button
                                    onClick={() => handleSetMainContact(contact.id)}
                                    className="p-1.5 text-neutral-400 hover:text-admin-primary-700 hover:bg-admin-primary-50 rounded-md transition-colors"
                                    title="Set as main"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                  </button>
                                )}
                                <button
                                  onClick={() => handleStartEditContact(contact)}
                                  className="p-1.5 text-neutral-400 hover:text-admin-primary-700 hover:bg-admin-primary-50 rounded-md transition-colors"
                                  title="Edit"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleDeleteContact(contact.id)}
                                  className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="mt-3 space-y-1.5 text-xs text-neutral-500">
                              <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {contact.phone}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : !showAddContact && (
                    <div className="py-8 text-center">
                      <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="mt-4 text-sm text-neutral-500">No contacts registered</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedExhibitor.participationHistory.length > 0 ? (
                    selectedExhibitor.participationHistory.map((event) => (
                      <div key={event.id} className="p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-950">{event.eventName}</p>
                            <p className="text-xs text-neutral-500 mt-0.5">{event.eventSeriesName}</p>
                          </div>
                          <Badge variant="status" color={getParticipationStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Booth {event.boothNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            {event.boothSize}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mt-4 text-sm text-neutral-500">No participation history</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Panel Footer */}
            {detailTab === 'info' && (
              <div className="p-4 border-t border-neutral-100">
                {isEditing ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancelEdit}
                      className="btn btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="btn btn-primary flex-1"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleStartEdit}
                    className="btn btn-secondary w-full"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Information
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Single Add Modal */}
      {createMode === 'single' && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setCreateMode(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl font-bold text-neutral-950">Add New Exhibitor</h2>
                  <p className="text-sm text-neutral-500 mt-1">Register a new exhibitor company</p>
                </div>
                <button
                  onClick={() => setCreateMode(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950 mb-4">Company Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Company Name *</label>
                        <input
                          type="text"
                          value={newExhibitor.companyName || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, companyName: e.target.value })}
                          className="input"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Company Name (English)</label>
                        <input
                          type="text"
                          value={newExhibitor.companyNameEn || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, companyNameEn: e.target.value })}
                          className="input"
                          placeholder="Enter English name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Representative *</label>
                        <input
                          type="text"
                          value={newExhibitor.representative || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, representative: e.target.value })}
                          className="input"
                          placeholder="Enter representative name"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Business Number</label>
                        <input
                          type="text"
                          value={newExhibitor.businessNumber || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, businessNumber: e.target.value })}
                          className="input"
                          placeholder="123-45-67890"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Industry</label>
                        <input
                          type="text"
                          value={newExhibitor.industry || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, industry: e.target.value })}
                          className="input"
                          placeholder="e.g., Furniture, Interior"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Country</label>
                        <input
                          type="text"
                          value={newExhibitor.country || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, country: e.target.value })}
                          className="input"
                          placeholder="e.g., South Korea"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Email *</label>
                        <input
                          type="email"
                          value={newExhibitor.email || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, email: e.target.value })}
                          className="input"
                          placeholder="company@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-neutral-500 mb-1.5 block">Phone</label>
                        <input
                          type="text"
                          value={newExhibitor.phone || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, phone: e.target.value })}
                          className="input"
                          placeholder="02-1234-5678"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-neutral-500 mb-1.5 block">Address</label>
                        <input
                          type="text"
                          value={newExhibitor.address || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, address: e.target.value })}
                          className="input"
                          placeholder="Enter company address"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs text-neutral-500 mb-1.5 block">Website</label>
                        <input
                          type="text"
                          value={newExhibitor.website || ''}
                          onChange={(e) => setNewExhibitor({ ...newExhibitor, website: e.target.value })}
                          className="input"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950 mb-4">Description</h3>
                    <textarea
                      value={newExhibitor.description || ''}
                      onChange={(e) => setNewExhibitor({ ...newExhibitor, description: e.target.value })}
                      rows={3}
                      className="input resize-none"
                      placeholder="Brief description of the company"
                    />
                  </div>

                  {/* Main Contact Person */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950 mb-4">Main Contact Person</h3>
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-neutral-500 mb-1.5 block">Name *</label>
                          <input
                            type="text"
                            value={newExhibitorContact.name || ''}
                            onChange={(e) => setNewExhibitorContact({ ...newExhibitorContact, name: e.target.value })}
                            className="input"
                            placeholder="Contact name"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500 mb-1.5 block">Position</label>
                          <input
                            type="text"
                            value={newExhibitorContact.position || ''}
                            onChange={(e) => setNewExhibitorContact({ ...newExhibitorContact, position: e.target.value })}
                            className="input"
                            placeholder="e.g., Marketing Manager"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500 mb-1.5 block">Email *</label>
                          <input
                            type="email"
                            value={newExhibitorContact.email || ''}
                            onChange={(e) => setNewExhibitorContact({ ...newExhibitorContact, email: e.target.value })}
                            className="input"
                            placeholder="contact@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-neutral-500 mb-1.5 block">Phone</label>
                          <input
                            type="text"
                            value={newExhibitorContact.phone || ''}
                            onChange={(e) => setNewExhibitorContact({ ...newExhibitorContact, phone: e.target.value })}
                            className="input"
                            placeholder="010-1234-5678"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setCreateMode(null)
                    setNewExhibitor({
                      companyName: '', companyNameEn: '', representative: '', email: '',
                      phone: '', businessNumber: '', industry: '', country: '',
                      address: '', website: '', description: '',
                    })
                    setNewExhibitorContact({ name: '', email: '', phone: '', position: '', isMain: true })
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In real app, this would call an API
                    alert('Exhibitor created successfully!')
                    setCreateMode(null)
                    setNewExhibitor({
                      companyName: '', companyNameEn: '', representative: '', email: '',
                      phone: '', businessNumber: '', industry: '', country: '',
                      address: '', website: '', description: '',
                    })
                    setNewExhibitorContact({ name: '', email: '', phone: '', position: '', isMain: true })
                  }}
                  disabled={!newExhibitor.companyName || !newExhibitor.representative || !newExhibitor.email || !newExhibitorContact.name || !newExhibitorContact.email}
                  className="btn btn-primary disabled:opacity-50"
                >
                  Create Exhibitor
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bulk Import Modal */}
      {createMode === 'bulk' && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setCreateMode(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <div>
                  <h2 className="text-xl font-bold text-neutral-950">Bulk Import Exhibitors</h2>
                  <p className="text-sm text-neutral-500 mt-1">Upload an Excel file to register multiple exhibitors</p>
                </div>
                <button
                  onClick={() => setCreateMode(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Download Template */}
                  <div className="p-4 bg-status-info-bg border border-status-info-border rounded-lg">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-status-info-border mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-status-info-text">Download Template First</p>
                        <p className="text-xs text-status-info-border mt-1">
                          Use our Excel template to ensure proper formatting. The template includes all required fields and formatting guidelines.
                        </p>
                        <button className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-status-info-border rounded-md text-sm font-medium text-status-info-text hover:bg-status-info-bg transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Template (.xlsx)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-950 mb-4">Upload File</h3>
                    <div className="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center hover:border-admin-primary-300 hover:bg-admin-primary-50/30 transition-colors">
                      <input
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setBulkFile(file)
                            // Simulate preview data
                            setBulkPreview([
                              { companyName: 'Sample Company 1', email: 'sample1@example.com', representative: 'John Doe' },
                              { companyName: 'Sample Company 2', email: 'sample2@example.com', representative: 'Jane Smith' },
                              { companyName: 'Sample Company 3', email: 'sample3@example.com', representative: 'Bob Wilson' },
                            ])
                          }
                        }}
                        className="hidden"
                        id="bulk-file-upload"
                      />
                      <label htmlFor="bulk-file-upload" className="cursor-pointer">
                        <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mt-4 text-sm text-neutral-600">
                          <span className="text-admin-primary-700 font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">
                          Excel files (.xlsx, .xls) or CSV (.csv)
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* File Info & Preview */}
                  {bulkFile && (
                    <div className="space-y-4">
                      {/* Selected File */}
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-status-success-bg rounded-md flex items-center justify-center">
                            <svg className="w-5 h-5 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-950">{bulkFile.name}</p>
                            <p className="text-xs text-neutral-500">{(bulkFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setBulkFile(null)
                            setBulkPreview([])
                          }}
                          className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Preview Table */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-neutral-950">Preview</h4>
                          <span className="text-xs text-neutral-500">{bulkPreview.length} exhibitors detected</span>
                        </div>
                        <div className="border border-neutral-200 rounded-md overflow-hidden">
                          <table className="table text-sm">
                            <thead>
                              <tr>
                                <th>Company Name</th>
                                <th>Representative</th>
                                <th>Email</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bulkPreview.map((row, index) => (
                                <tr key={index}>
                                  <td className="text-neutral-950">{row.companyName}</td>
                                  <td className="text-neutral-600">{row.representative}</td>
                                  <td className="text-neutral-600">{row.email}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">Showing first 3 rows from your file</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setCreateMode(null)
                    setBulkFile(null)
                    setBulkPreview([])
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In real app, this would process the file and call an API
                    alert(`${bulkPreview.length} exhibitors imported successfully!`)
                    setCreateMode(null)
                    setBulkFile(null)
                    setBulkPreview([])
                  }}
                  disabled={!bulkFile}
                  className="btn btn-primary disabled:opacity-50"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Import {bulkPreview.length > 0 ? `${bulkPreview.length} ` : ''}Exhibitors
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

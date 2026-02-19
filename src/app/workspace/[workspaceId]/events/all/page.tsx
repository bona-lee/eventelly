'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Pagination from '@/components/Pagination'
import { Badge } from '@/components/Badge'
import { routes } from '@/lib/routes'

interface Event {
  id: string
  name: string
  series: string
  seriesId: string
  date: string
  dateSort: string
  venue: string
  status: string
  icon: string | null
  gradient: string
  siteUrl: string
}

interface SeriesItem {
  id: string
  name: string
}

export default function EventsPage() {
  const params = useParams()
  const router = useRouter()
  const workspaceId = params.workspaceId as string
  const ws = routes.workspace(workspaceId)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [createdEventName, setCreatedEventName] = useState('')
  const [createdEventId, setCreatedEventId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSeries, setFilterSeries] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10
  const [sortField, setSortField] = useState<string>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  // Wizard state
  const [currentStep, setCurrentStep] = useState(0)
  const iconInputRef = useRef<HTMLInputElement>(null)
  const posterInputRef = useRef<HTMLInputElement>(null)

  // Dropdown states
  const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false)
  const seriesDropdownRef = useRef<HTMLDivElement>(null)
  const [seriesSearch, setSeriesSearch] = useState('')

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const languageDropdownRef = useRef<HTMLDivElement>(null)

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false)
  const currencyDropdownRef = useRef<HTMLDivElement>(null)

  // Form dropdown states for Year, Country, Timezone
  const [isYearOpen, setIsYearOpen] = useState(false)
  const yearRef = useRef<HTMLDivElement>(null)
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false)
  const timezoneRef = useRef<HTMLDivElement>(null)
  const [isPrimaryLanguageOpen, setIsPrimaryLanguageOpen] = useState(false)
  const primaryLanguageRef = useRef<HTMLDivElement>(null)
  const [isPrimaryCurrencyOpen, setIsPrimaryCurrencyOpen] = useState(false)
  const primaryCurrencyRef = useRef<HTMLDivElement>(null)

  // Filter dropdown states
  const [isFilterSeriesOpen, setIsFilterSeriesOpen] = useState(false)
  const filterSeriesRef = useRef<HTMLDivElement>(null)
  const [filterSeriesSearch, setFilterSeriesSearch] = useState('')

  const [isFilterStatusOpen, setIsFilterStatusOpen] = useState(false)
  const filterStatusRef = useRef<HTMLDivElement>(null)

  const statusOptions = ['Upcoming', 'Ongoing', 'Completed', 'Draft']

  const wizardSteps = [
    { title: 'Basic', description: 'Series & Event Info' },
    { title: 'Schedule', description: 'Date & Venue' },
    { title: 'Media', description: 'Icon & Poster' },
    { title: 'Language', description: 'Languages' },
    { title: 'Currency', description: 'Currencies' },
    { title: 'Modules', description: 'Features' },
    { title: 'Website', description: 'Domain & Template' },
    { title: 'Finish', description: 'Review & Create' },
  ]

  const [newEvent, setNewEvent] = useState({
    series: '',
    year: '',
    name: '',
    abbreviation: '',
    startDate: '',
    endDate: '',
    venue: '',
    country: '',
    timezone: '',
    iconPreview: '',
    posterPreview: '',
    languages: ['en'] as string[],
    primaryLanguage: 'en',
    currencies: ['USD'] as string[],
    primaryCurrency: 'USD',
    modules: ['exhibition', 'ticket'] as string[],
    subdomain: '',
    template: 'modern',
    notes: '',
  })

  const seriesList: SeriesItem[] = [
    { id: 'sldf', name: 'Seoul Living Design Fair' },
    { id: 'sdf', name: 'Seoul Design Festival' },
    { id: 'bldf', name: 'Busan Living Design Fair' },
    { id: 'kdw', name: 'Korea Design Week' },
    { id: 'mldf', name: 'Magok Living Design Fair' },
    { id: 'adf', name: 'Asia Design Forum' },
    { id: 'gdf', name: 'Global Design Fair' },
    { id: 'idf', name: 'Interior Design Festival' },
    { id: 'fdf', name: 'Furniture Design Fair' },
    { id: 'hdf', name: 'Home Decor Fair' },
  ]

  const events: Event[] = [
    {
      id: 'sldf-2026',
      name: 'Seoul Living Design Fair 2026',
      series: 'Seoul Living Design Fair',
      seriesId: 'sldf',
      date: 'Mar 14-17, 2026',
      dateSort: '2026-03-14',
      venue: 'COEX, Seoul',
      status: 'Upcoming',
      icon: '/sldficon.png',
      gradient: 'bg-gradient-to-br from-admin-primary-600 to-admin-primary-800',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sdf-2026',
      name: 'Seoul Design Festival 2026',
      series: 'Seoul Design Festival',
      seriesId: 'sdf',
      date: 'Dec 3-6, 2026',
      dateSort: '2026-12-03',
      venue: 'DDP, Seoul',
      status: 'Draft',
      icon: '/sdficon.png',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'bldf-2026',
      name: 'Busan Living Design Fair 2026',
      series: 'Busan Living Design Fair',
      seriesId: 'bldf',
      date: 'Apr 21-24, 2026',
      dateSort: '2026-04-21',
      venue: 'BEXCO, Busan',
      status: 'Upcoming',
      icon: null,
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'kdw-2026',
      name: 'Korea Design Week 2026',
      series: 'Korea Design Week',
      seriesId: 'kdw',
      date: 'May 8-12, 2026',
      dateSort: '2026-05-08',
      venue: 'SETEC, Seoul',
      status: 'Draft',
      icon: null,
      gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-700',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'mldf-2026',
      name: 'Magok Living Design Fair 2026',
      series: 'Magok Living Design Fair',
      seriesId: 'mldf',
      date: 'May 15-18, 2026',
      dateSort: '2026-05-15',
      venue: 'SJ Kunsthalle, Seoul',
      status: 'Draft',
      icon: null,
      gradient: 'bg-gradient-to-br from-orange-500 to-orange-700',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sldf-2025',
      name: 'Seoul Living Design Fair 2025',
      series: 'Seoul Living Design Fair',
      seriesId: 'sldf',
      date: 'Mar 15-18, 2025',
      dateSort: '2025-03-15',
      venue: 'COEX, Seoul',
      status: 'Completed',
      icon: '/sldficon.png',
      gradient: 'bg-gradient-to-br from-admin-primary-600 to-admin-primary-800',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
    {
      id: 'sdf-2025',
      name: 'Seoul Design Festival 2025',
      series: 'Seoul Design Festival',
      seriesId: 'sdf',
      date: 'Dec 4-7, 2025',
      dateSort: '2025-12-04',
      venue: 'DDP, Seoul',
      status: 'Completed',
      icon: '/sdficon.png',
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      siteUrl: 'https://livingdesignfair.co.kr/',
    },
  ]

  const availableYears = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 5 }, (_, i) => currentYear + i)
  }, [])

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: 'Korean' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'de', name: 'German' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ar', name: 'Arabic' },
  ]

  const availableCurrencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'KRW', name: 'Korean Won' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'SGD', name: 'Singapore Dollar' },
    { code: 'AED', name: 'UAE Dirham' },
  ]

  const availableModules = [
    { id: 'exhibition', name: 'Exhibition', description: 'Manage exhibitors, booths, and applications', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'ticket', name: 'Ticket', description: 'Visitor ticketing and registration', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z' },
    { id: 'bizmatching', name: 'Biz Matching', description: 'B2B meeting scheduling', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { id: 'conference', name: 'Conference', description: 'Sessions, speakers, and programs', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'directory', name: 'Online Directory', description: 'Searchable exhibitor & product listings', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'timetable', name: 'Timetable', description: 'Event schedule and timeline', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'payment', name: 'Payment', description: 'Online payment processing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  ]

  const availableTemplates = [
    { id: 'modern', name: 'Modern', description: 'Clean and minimal design', color: 'bg-gradient-to-br from-admin-primary-400 to-admin-primary-600' },
    { id: 'classic', name: 'Classic', description: 'Traditional exhibition style', color: 'bg-gradient-to-br from-neutral-400 to-neutral-600' },
    { id: 'vibrant', name: 'Vibrant', description: 'Bold colors and dynamic layout', color: 'bg-gradient-to-br from-purple-400 to-pink-600' },
    { id: 'elegant', name: 'Elegant', description: 'Sophisticated and premium feel', color: 'bg-gradient-to-br from-amber-400 to-orange-600' },
  ]

  const filteredFilterSeriesList = useMemo(() => {
    if (!filterSeriesSearch) return seriesList
    const search = filterSeriesSearch.toLowerCase()
    return seriesList.filter(s =>
      s.name.toLowerCase().includes(search) || s.id.toLowerCase().includes(search)
    )
  }, [filterSeriesSearch])

  const filteredSeriesList = useMemo(() => {
    if (!seriesSearch) return seriesList
    const search = seriesSearch.toLowerCase()
    return seriesList.filter(s =>
      s.name.toLowerCase().includes(search) || s.id.toLowerCase().includes(search)
    )
  }, [seriesSearch])

  const allFilteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSeries = !filterSeries || event.seriesId === filterSeries
      const matchesStatus = !filterStatus || event.status === filterStatus
      return matchesSearch && matchesSeries && matchesStatus
    })
  }, [searchQuery, filterSeries, filterStatus])

  const sortedEvents = useMemo(() => {
    return [...allFilteredEvents].sort((a, b) => {
      let aVal: string, bVal: string

      switch (sortField) {
        case 'name':
          aVal = a.name
          bVal = b.name
          break
        case 'series':
          aVal = a.series
          bVal = b.series
          break
        case 'date':
          aVal = a.dateSort
          bVal = b.dateSort
          break
        case 'venue':
          aVal = a.venue
          bVal = b.venue
          break
        case 'status':
          aVal = a.status
          bVal = b.status
          break
        default:
          aVal = a.dateSort
          bVal = b.dateSort
      }

      const comparison = aVal.localeCompare(bVal)
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [allFilteredEvents, sortField, sortOrder])

  const totalPages = Math.ceil(sortedEvents.length / perPage)

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * perPage
    const end = start + perPage
    return sortedEvents.slice(start, end)
  }, [sortedEvents, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterSeries, filterStatus])

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIconClass = (field: string) => {
    if (sortField === field) {
      return 'text-admin-primary-700'
    }
    return 'text-neutral-400'
  }

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

  const getStatusTextClass = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'text-admin-primary-700'
      case 'Ongoing':
        return 'text-status-info-text'
      case 'Completed':
        return 'text-neutral-600'
      case 'Cancelled':
        return 'text-status-error-text'
      case 'Draft':
        return 'text-status-warning-text'
      default:
        return 'text-neutral-600'
    }
  }

  const getSeriesName = (seriesId: string) => {
    const series = seriesList.find(s => s.id === seriesId)
    return series?.name || '-'
  }

  const getLanguageName = (code: string) => {
    const lang = availableLanguages.find(l => l.code === code)
    return lang?.name || code
  }

  const selectedLanguages = useMemo(() => {
    return availableLanguages.filter(lang => newEvent.languages.includes(lang.code))
  }, [newEvent.languages])

  const selectedCurrencies = useMemo(() => {
    return availableCurrencies.filter(curr => newEvent.currencies.includes(curr.code))
  }, [newEvent.currencies])

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 0:
        return newEvent.series && newEvent.year && newEvent.name
      case 1:
        return newEvent.startDate && newEvent.endDate && newEvent.venue && newEvent.country && newEvent.timezone
      case 2:
        return true
      case 3:
        return newEvent.languages.length > 0 && newEvent.primaryLanguage
      case 4:
        return newEvent.currencies.length > 0 && newEvent.primaryCurrency
      case 5:
        return true
      case 6:
        return newEvent.subdomain && newEvent.template
      case 7:
        return true
      default:
        return false
    }
  }, [currentStep, newEvent])

  const getStepClass = (index: number) => {
    if (index < currentStep) {
      return 'bg-admin-primary-600 text-white'
    } else if (index === currentStep) {
      return 'bg-admin-primary-100 text-admin-primary-700 border-2 border-admin-primary-600'
    } else {
      return 'bg-neutral-100 text-neutral-400'
    }
  }

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1 && canProceed) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const closeWizard = () => {
    setShowCreateModal(false)
    setCurrentStep(0)
    resetNewEvent()
  }

  const resetNewEvent = () => {
    setNewEvent({
      series: '',
      year: '',
      name: '',
      abbreviation: '',
      startDate: '',
      endDate: '',
      venue: '',
      country: '',
      timezone: '',
      iconPreview: '',
      posterPreview: '',
      languages: ['en'],
      primaryLanguage: 'en',
      currencies: ['USD'],
      primaryCurrency: 'USD',
      modules: ['exhibition', 'ticket'],
      subdomain: '',
      template: 'modern',
      notes: '',
    })
    setSeriesSearch('')
  }

  const selectSeries = (seriesId: string) => {
    setNewEvent({ ...newEvent, series: seriesId })
    setIsSeriesDropdownOpen(false)
    setSeriesSearch('')
  }

  const toggleLanguage = (code: string) => {
    const index = newEvent.languages.indexOf(code)
    if (index === -1) {
      setNewEvent({ ...newEvent, languages: [...newEvent.languages, code] })
    } else {
      const newLangs = newEvent.languages.filter(l => l !== code)
      setNewEvent({
        ...newEvent,
        languages: newLangs,
        primaryLanguage: newEvent.primaryLanguage === code ? (newLangs[0] || '') : newEvent.primaryLanguage
      })
    }
  }

  const removeLanguage = (code: string) => {
    const newLangs = newEvent.languages.filter(l => l !== code)
    setNewEvent({
      ...newEvent,
      languages: newLangs,
      primaryLanguage: newEvent.primaryLanguage === code ? (newLangs[0] || '') : newEvent.primaryLanguage
    })
  }

  const toggleCurrency = (code: string) => {
    const index = newEvent.currencies.indexOf(code)
    if (index === -1) {
      setNewEvent({ ...newEvent, currencies: [...newEvent.currencies, code] })
    } else {
      const newCurrs = newEvent.currencies.filter(c => c !== code)
      setNewEvent({
        ...newEvent,
        currencies: newCurrs,
        primaryCurrency: newEvent.primaryCurrency === code ? (newCurrs[0] || '') : newEvent.primaryCurrency
      })
    }
  }

  const removeCurrency = (code: string) => {
    const newCurrs = newEvent.currencies.filter(c => c !== code)
    setNewEvent({
      ...newEvent,
      currencies: newCurrs,
      primaryCurrency: newEvent.primaryCurrency === code ? (newCurrs[0] || '') : newEvent.primaryCurrency
    })
  }

  const toggleModule = (moduleId: string) => {
    const index = newEvent.modules.indexOf(moduleId)
    if (index === -1) {
      setNewEvent({ ...newEvent, modules: [...newEvent.modules, moduleId] })
    } else {
      setNewEvent({ ...newEvent, modules: newEvent.modules.filter(m => m !== moduleId) })
    }
  }

  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewEvent({ ...newEvent, iconPreview: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePosterUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewEvent({ ...newEvent, posterPreview: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  // Auto-generate subdomain from event name
  useEffect(() => {
    if (newEvent.name && !newEvent.subdomain) {
      const subdomain = newEvent.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setNewEvent(prev => ({ ...prev, subdomain }))
    }
  }, [newEvent.name])

  const handleCreate = () => {
    setCreatedEventName(newEvent.name)
    setCreatedEventId(newEvent.subdomain || 'new-event')
    setShowCreateModal(false)
    setCurrentStep(0)
    setShowSuccessModal(true)
  }

  const closeSuccessAndGoToList = () => {
    setShowSuccessModal(false)
    resetNewEvent()
  }

  const goToEventConsole = () => {
    setShowSuccessModal(false)
    resetNewEvent()
    router.push(ws.event(createdEventId).root())
  }

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (seriesDropdownRef.current && !seriesDropdownRef.current.contains(event.target as Node)) {
        setIsSeriesDropdownOpen(false)
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false)
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setIsCurrencyDropdownOpen(false)
      }
      if (filterSeriesRef.current && !filterSeriesRef.current.contains(event.target as Node)) {
        setIsFilterSeriesOpen(false)
      }
      if (filterStatusRef.current && !filterStatusRef.current.contains(event.target as Node)) {
        setIsFilterStatusOpen(false)
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false)
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false)
      }
      if (timezoneRef.current && !timezoneRef.current.contains(event.target as Node)) {
        setIsTimezoneOpen(false)
      }
      if (primaryLanguageRef.current && !primaryLanguageRef.current.contains(event.target as Node)) {
        setIsPrimaryLanguageOpen(false)
      }
      if (primaryCurrencyRef.current && !primaryCurrencyRef.current.contains(event.target as Node)) {
        setIsPrimaryCurrencyOpen(false)
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
          <h1 className="text-2xl font-bold text-neutral-950">Events</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage individual event editions
          </p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search events..."
            className="input max-w-sm"
          />
        </div>
        {/* Series Filter Dropdown */}
        <div className="relative w-56" ref={filterSeriesRef}>
          <button
            type="button"
            onClick={() => setIsFilterSeriesOpen(!isFilterSeriesOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            {filterSeries ? (
              <span className="text-neutral-950 flex-1 truncate">{getSeriesName(filterSeries)}</span>
            ) : (
              <span className="text-neutral-500 flex-1">All Series</span>
            )}
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterSeriesOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="p-2 border-b border-neutral-100">
                <input
                  value={filterSeriesSearch}
                  onChange={(e) => setFilterSeriesSearch(e.target.value)}
                  type="text"
                  placeholder="Search series..."
                  className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-admin-primary-500 focus:border-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => { setFilterSeries(''); setIsFilterSeriesOpen(false); setFilterSeriesSearch('') }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterSeries === '' ? 'bg-admin-primary-50' : ''}`}
                >
                  <span className="text-sm text-neutral-800">All Series</span>
                  {filterSeries === '' && (
                    <svg className="w-4 h-4 text-admin-primary-600 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {filteredFilterSeriesList.map((series) => (
                  <button
                    key={series.id}
                    type="button"
                    onClick={() => { setFilterSeries(series.id); setIsFilterSeriesOpen(false); setFilterSeriesSearch('') }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterSeries === series.id ? 'bg-admin-primary-50' : ''}`}
                  >
                    <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                      {series.name.charAt(0)}
                    </div>
                    <span className="text-sm text-neutral-800 flex-1 truncate">{series.name}</span>
                    {filterSeries === series.id && (
                      <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
                {filteredFilterSeriesList.length === 0 && (
                  <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                    No series found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Status Filter Dropdown */}
        <div className="relative w-40" ref={filterStatusRef}>
          <button
            type="button"
            onClick={() => setIsFilterStatusOpen(!isFilterStatusOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            {filterStatus ? (
              <span className={`flex-1 ${getStatusTextClass(filterStatus)}`}>{filterStatus}</span>
            ) : (
              <span className="text-neutral-500 flex-1">All Status</span>
            )}
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isFilterStatusOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                <button
                  type="button"
                  onClick={() => { setFilterStatus(''); setIsFilterStatusOpen(false) }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterStatus === '' ? 'bg-admin-primary-50' : ''}`}
                >
                  <span className="text-sm text-neutral-800">All Status</span>
                  {filterStatus === '' && (
                    <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => { setFilterStatus(status); setIsFilterStatusOpen(false) }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${filterStatus === status ? 'bg-admin-primary-50' : ''}`}
                  >
                    <Badge variant="status" color={getStatusColor(status)}>{status}</Badge>
                    {filterStatus === status && (
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

      {/* Events Table */}
      <div className="card">
        {/* Total Count Header */}
        <div className="px-5 py-3 border-b border-neutral-100">
          <span className="text-sm text-neutral-500">Total <span className="font-medium text-neutral-800">{allFilteredEvents.length}</span> events</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-neutral-700">
                  Event
                  <svg className={`w-3.5 h-3.5 ${getSortIconClass('name')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortField === 'name' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : sortField === 'name' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    )}
                  </svg>
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort('series')} className="flex items-center gap-1 hover:text-neutral-700">
                  Series
                  <svg className={`w-3.5 h-3.5 ${getSortIconClass('series')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortField === 'series' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : sortField === 'series' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    )}
                  </svg>
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort('date')} className="flex items-center gap-1 hover:text-neutral-700">
                  Date
                  <svg className={`w-3.5 h-3.5 ${getSortIconClass('date')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortField === 'date' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : sortField === 'date' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    )}
                  </svg>
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort('venue')} className="flex items-center gap-1 hover:text-neutral-700">
                  Venue
                  <svg className={`w-3.5 h-3.5 ${getSortIconClass('venue')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortField === 'venue' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : sortField === 'venue' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    )}
                  </svg>
                </button>
              </th>
              <th>
                <button onClick={() => toggleSort('status')} className="flex items-center gap-1 hover:text-neutral-700">
                  Status
                  <svg className={`w-3.5 h-3.5 ${getSortIconClass('status')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {sortField === 'status' && sortOrder === 'asc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    ) : sortField === 'status' && sortOrder === 'desc' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    )}
                  </svg>
                </button>
              </th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event) => (
              <tr
                key={event.id}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-neutral-100">
                      {event.icon ? (
                        <img
                          src={event.icon}
                          alt={event.name}
                          className="w-full h-full object-contain p-1"
                        />
                      ) : (
                        <div
                          className={`w-full h-full flex items-center justify-center text-white text-sm font-bold ${event.gradient}`}
                        >
                          {event.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-950 hover:text-admin-primary-700">{event.name}</p>
                      <p className="text-xs text-neutral-400">{event.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-neutral-600">{event.series}</span>
                </td>
                <td>
                  <span className="text-sm text-neutral-600">{event.date}</span>
                </td>
                <td>
                  <span className="text-sm text-neutral-600">{event.venue}</span>
                </td>
                <td>
                  <Badge variant="status" color={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                </td>
                <td className="text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={ws.event(event.id).root()}
                      className="px-3 py-1 text-xs font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors"
                    >
                      Console
                    </Link>
                    <a
                      href={event.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs font-medium text-neutral-500 bg-neutral-50 hover:bg-neutral-100 rounded-md transition-colors"
                    >
                      Site
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {paginatedEvents.length === 0 && (
          <div className="py-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 text-sm text-neutral-500">No events found</p>
          </div>
        )}

        {/* Pagination */}
        {sortedEvents.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={sortedEvents.length}
            perPage={perPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create Event Wizard Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl my-8 flex flex-col" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
            {/* Wizard Header */}
            <div className="px-6 py-4 border-b border-neutral-100 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-neutral-950">Create New Event</h3>
                <button onClick={closeWizard} className="p-1 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Step Indicator */}
              <div className="flex items-center gap-1">
                {wizardSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-1.5 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${getStepClass(index)}`}
                      >
                        {index < currentStep ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <span className={`text-xs hidden lg:block ${index === currentStep ? 'font-medium text-neutral-950' : 'text-neutral-400'}`}>
                        {step.title}
                      </span>
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div className="flex-1 h-px bg-neutral-200 mx-1"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Wizard Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Step 1: Series & Basic */}
              {currentStep === 0 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Event Series <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">Select which series this event belongs to</p>
                    <div className="relative" ref={seriesDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsSeriesDropdownOpen(!isSeriesDropdownOpen)}
                        className="w-full input text-left flex items-center justify-between pr-4"
                      >
                        {newEvent.series ? (
                          <span className="text-neutral-950 flex-1">{getSeriesName(newEvent.series)}</span>
                        ) : (
                          <span className="text-neutral-400 flex-1">Select event series</span>
                        )}
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isSeriesDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                          <div className="p-2 border-b border-neutral-100">
                            <input
                              value={seriesSearch}
                              onChange={(e) => setSeriesSearch(e.target.value)}
                              type="text"
                              placeholder="Search series..."
                              className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-admin-primary-500 focus:border-transparent"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div className="max-h-48 overflow-y-auto">
                            {filteredSeriesList.map((series) => (
                              <button
                                key={series.id}
                                type="button"
                                onClick={() => selectSeries(series.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 transition-colors ${newEvent.series === series.id ? 'bg-admin-primary-50' : ''}`}
                              >
                                <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                                  {series.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-neutral-950 truncate">{series.name}</p>
                                  <p className="text-xs text-neutral-400">{series.id}</p>
                                </div>
                                {newEvent.series === series.id && (
                                  <svg className="w-5 h-5 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </button>
                            ))}
                            {filteredSeriesList.length === 0 && (
                              <div className="px-4 py-3 text-sm text-neutral-500 text-center">
                                No series found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Event Year <span className="text-form-required">*</span></label>
                      <div className="relative" ref={yearRef}>
                        <button
                          type="button"
                          onClick={() => setIsYearOpen(!isYearOpen)}
                          className="w-full input text-left flex items-center justify-between pr-4"
                        >
                          {newEvent.year ? (
                            <span className="text-neutral-950 flex-1">{newEvent.year}</span>
                          ) : (
                            <span className="text-neutral-500 flex-1">Select year</span>
                          )}
                          <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isYearOpen && (
                          <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="py-1">
                              {availableYears.map((year) => (
                                <button
                                  key={year}
                                  type="button"
                                  onClick={() => { setNewEvent({ ...newEvent, year: String(year) }); setIsYearOpen(false) }}
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${newEvent.year === String(year) ? 'bg-admin-primary-50' : ''}`}
                                >
                                  <span className="text-sm text-neutral-800">{year}</span>
                                  {newEvent.year === String(year) && (
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
                    <div>
                      <label className="label">Event Name <span className="text-form-required">*</span></label>
                      <input
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        type="text"
                        required
                        className="input"
                        placeholder="Seoul Living Design Fair 2027"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Event Abbreviation</label>
                    <p className="text-xs text-neutral-400 mb-2">Short name used in compact UI elements (e.g., tabs, badges)</p>
                    <input
                      value={newEvent.abbreviation}
                      onChange={(e) => setNewEvent({ ...newEvent, abbreviation: e.target.value })}
                      type="text"
                      className="input max-w-xs"
                      placeholder="SLDF 2027"
                      maxLength={20}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Schedule & Venue */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Event Period <span className="text-form-required">*</span></label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-neutral-400 mb-1">Start date</p>
                        <input
                          value={newEvent.startDate}
                          onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                          type="date"
                          required
                          className="input"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400 mb-1">End date</p>
                        <input
                          value={newEvent.endDate}
                          onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                          type="date"
                          required
                          className="input"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="label">Venue <span className="text-form-required">*</span></label>
                    <input
                      value={newEvent.venue}
                      onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                      type="text"
                      required
                      className="input"
                      placeholder="COEX"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Country <span className="text-form-required">*</span></label>
                      <div className="relative" ref={countryRef}>
                        <button
                          type="button"
                          onClick={() => setIsCountryOpen(!isCountryOpen)}
                          className="w-full input text-left flex items-center justify-between pr-4"
                        >
                          {newEvent.country ? (
                            <span className="text-neutral-950 flex-1 truncate">
                              {newEvent.country === 'KR' ? 'South Korea' : newEvent.country === 'JP' ? 'Japan' : newEvent.country === 'CN' ? 'China' : newEvent.country === 'US' ? 'United States' : newEvent.country === 'DE' ? 'Germany' : newEvent.country === 'UK' ? 'United Kingdom' : newEvent.country === 'FR' ? 'France' : 'Singapore'}
                            </span>
                          ) : (
                            <span className="text-neutral-500 flex-1">Select country</span>
                          )}
                          <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isCountryOpen && (
                          <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="py-1 max-h-60 overflow-y-auto">
                              {[
                                { value: 'KR', label: 'South Korea' },
                                { value: 'JP', label: 'Japan' },
                                { value: 'CN', label: 'China' },
                                { value: 'US', label: 'United States' },
                                { value: 'DE', label: 'Germany' },
                                { value: 'UK', label: 'United Kingdom' },
                                { value: 'FR', label: 'France' },
                                { value: 'SG', label: 'Singapore' },
                              ].map((country) => (
                                <button
                                  key={country.value}
                                  type="button"
                                  onClick={() => { setNewEvent({ ...newEvent, country: country.value }); setIsCountryOpen(false) }}
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${newEvent.country === country.value ? 'bg-admin-primary-50' : ''}`}
                                >
                                  <span className="text-sm text-neutral-800">{country.label}</span>
                                  {newEvent.country === country.value && (
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
                    <div>
                      <label className="label">Timezone <span className="text-form-required">*</span></label>
                      <div className="relative" ref={timezoneRef}>
                        <button
                          type="button"
                          onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                          className="w-full input text-left flex items-center justify-between pr-4"
                        >
                          {newEvent.timezone ? (
                            <span className="text-neutral-950 flex-1 truncate">{newEvent.timezone}</span>
                          ) : (
                            <span className="text-neutral-500 flex-1">Select timezone</span>
                          )}
                          <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isTimezoneOpen && (
                          <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                            <div className="py-1 max-h-60 overflow-y-auto">
                              {[
                                { value: 'Asia/Seoul', label: 'Asia/Seoul (GMT+9)' },
                                { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
                                { value: 'Asia/Shanghai', label: 'Asia/Shanghai (GMT+8)' },
                                { value: 'Asia/Singapore', label: 'Asia/Singapore (GMT+8)' },
                                { value: 'America/New_York', label: 'America/New_York (GMT-5)' },
                                { value: 'America/Los_Angeles', label: 'America/Los_Angeles (GMT-8)' },
                                { value: 'Europe/London', label: 'Europe/London (GMT+0)' },
                                { value: 'Europe/Berlin', label: 'Europe/Berlin (GMT+1)' },
                                { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1)' },
                              ].map((tz) => (
                                <button
                                  key={tz.value}
                                  type="button"
                                  onClick={() => { setNewEvent({ ...newEvent, timezone: tz.value }); setIsTimezoneOpen(false) }}
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${newEvent.timezone === tz.value ? 'bg-admin-primary-50' : ''}`}
                                >
                                  <span className="text-sm text-neutral-800">{tz.label}</span>
                                  {newEvent.timezone === tz.value && (
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
                </div>
              )}

              {/* Step 3: Media */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Event Icon</label>
                    <p className="text-xs text-neutral-400 mb-2">Square image recommended (512x512px)</p>
                    <div
                      className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center hover:border-neutral-300 transition-colors cursor-pointer"
                      onClick={() => iconInputRef.current?.click()}
                    >
                      {newEvent.iconPreview ? (
                        <div className="flex justify-center mb-3">
                          <img src={newEvent.iconPreview} alt="Icon preview" className="w-20 h-20 rounded-md object-contain bg-neutral-50" />
                        </div>
                      ) : (
                        <div className="flex justify-center mb-3">
                          <div className="w-20 h-20 rounded-md bg-neutral-100 flex items-center justify-center">
                            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm text-neutral-500">Click to upload icon</p>
                      <p className="text-xs text-neutral-400 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                    <input ref={iconInputRef} type="file" accept="image/*" className="hidden" onChange={handleIconUpload} />
                  </div>
                  <div>
                    <label className="label">Event Poster</label>
                    <p className="text-xs text-neutral-400 mb-2">Recommended size: 1200x628px</p>
                    <div
                      className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center hover:border-neutral-300 transition-colors cursor-pointer"
                      onClick={() => posterInputRef.current?.click()}
                    >
                      {newEvent.posterPreview ? (
                        <div className="flex justify-center mb-3">
                          <img src={newEvent.posterPreview} alt="Poster preview" className="h-32 rounded-md object-contain bg-neutral-50" />
                        </div>
                      ) : (
                        <div className="flex justify-center mb-3">
                          <div className="w-48 h-32 rounded-md bg-neutral-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                      <p className="text-sm text-neutral-500">Click to upload poster</p>
                      <p className="text-xs text-neutral-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input ref={posterInputRef} type="file" accept="image/*" className="hidden" onChange={handlePosterUpload} />
                  </div>
                </div>
              )}

              {/* Step 4: Language */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Supported Languages <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">Select all languages your event will support</p>
                    <div className="relative" ref={languageDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                        className="w-full input text-left flex items-center justify-between min-h-[42px] pr-4"
                      >
                        {newEvent.languages.length > 0 ? (
                          <div className="flex flex-wrap gap-1 flex-1">
                            {newEvent.languages.map((langCode) => (
                              <Badge key={langCode} variant="status" color="primary" onRemove={() => removeLanguage(langCode)}>
                                {getLanguageName(langCode)}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-400 flex-1">Select languages</span>
                        )}
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isLanguageDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                          <div className="max-h-48 overflow-y-auto">
                            {availableLanguages.map((lang) => (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => toggleLanguage(lang.code)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors"
                              >
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${newEvent.languages.includes(lang.code) ? 'bg-admin-primary-600 border-admin-primary-600' : 'border-neutral-300'}`}
                                >
                                  {newEvent.languages.includes(lang.code) && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-neutral-800">{lang.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="label">Primary Language <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">The default language for your event website</p>
                    <div className="relative max-w-xs" ref={primaryLanguageRef}>
                      <button
                        type="button"
                        onClick={() => setIsPrimaryLanguageOpen(!isPrimaryLanguageOpen)}
                        className="w-full input text-left flex items-center justify-between pr-4"
                      >
                        {newEvent.primaryLanguage ? (
                          <span className="text-neutral-950 flex-1 truncate">
                            {selectedLanguages.find(l => l.code === newEvent.primaryLanguage)?.name || newEvent.primaryLanguage}
                          </span>
                        ) : (
                          <span className="text-neutral-500 flex-1">Select primary language</span>
                        )}
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isPrimaryLanguageOpen && selectedLanguages.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                          <div className="py-1 max-h-60 overflow-y-auto">
                            {selectedLanguages.map((lang) => (
                              <button
                                key={lang.code}
                                type="button"
                                onClick={() => { setNewEvent({ ...newEvent, primaryLanguage: lang.code }); setIsPrimaryLanguageOpen(false) }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${newEvent.primaryLanguage === lang.code ? 'bg-admin-primary-50' : ''}`}
                              >
                                <span className="text-sm text-neutral-800">{lang.name}</span>
                                {newEvent.primaryLanguage === lang.code && (
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
              )}

              {/* Step 5: Currency */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Supported Currencies <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">Select all currencies your event will accept for payments</p>
                    <div className="relative" ref={currencyDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                        className="w-full input text-left flex items-center justify-between min-h-[42px] pr-4"
                      >
                        {newEvent.currencies.length > 0 ? (
                          <div className="flex flex-wrap gap-1 flex-1">
                            {newEvent.currencies.map((currCode) => (
                              <Badge key={currCode} variant="status" color="primary" onRemove={() => removeCurrency(currCode)}>
                                {currCode}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-neutral-400 flex-1">Select currencies</span>
                        )}
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isCurrencyDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                          <div className="max-h-48 overflow-y-auto">
                            {availableCurrencies.map((curr) => (
                              <button
                                key={curr.code}
                                type="button"
                                onClick={() => toggleCurrency(curr.code)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors"
                              >
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${newEvent.currencies.includes(curr.code) ? 'bg-admin-primary-600 border-admin-primary-600' : 'border-neutral-300'}`}
                                >
                                  {newEvent.currencies.includes(curr.code) && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm text-neutral-800">{curr.code} - {curr.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="label">Primary Currency <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">The default currency for pricing display</p>
                    <div className="relative max-w-xs" ref={primaryCurrencyRef}>
                      <button
                        type="button"
                        onClick={() => setIsPrimaryCurrencyOpen(!isPrimaryCurrencyOpen)}
                        className="w-full input text-left flex items-center justify-between pr-4"
                      >
                        {newEvent.primaryCurrency ? (
                          <span className="text-neutral-950 flex-1 truncate">
                            {selectedCurrencies.find(c => c.code === newEvent.primaryCurrency)?.code} - {selectedCurrencies.find(c => c.code === newEvent.primaryCurrency)?.name}
                          </span>
                        ) : (
                          <span className="text-neutral-500 flex-1">Select primary currency</span>
                        )}
                        <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isPrimaryCurrencyOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                          <div className="py-1 max-h-60 overflow-y-auto">
                            {selectedCurrencies.map((curr) => (
                              <button
                                key={curr.code}
                                type="button"
                                onClick={() => {
                                  setNewEvent({ ...newEvent, primaryCurrency: curr.code });
                                  setIsPrimaryCurrencyOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${newEvent.primaryCurrency === curr.code ? 'bg-admin-primary-50' : ''}`}
                              >
                                <span className="text-neutral-950">{curr.code} - {curr.name}</span>
                                {newEvent.primaryCurrency === curr.code && (
                                  <svg className="w-4 h-4 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
              )}

              {/* Step 6: Modules */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Modules to Enable</label>
                    <p className="text-xs text-neutral-400 mb-3">Select the features you want to use for this event</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableModules.map((module) => (
                        <label
                          key={module.id}
                          className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${newEvent.modules.includes(module.id) ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                        >
                          <input
                            type="checkbox"
                            checked={newEvent.modules.includes(module.id)}
                            onChange={() => toggleModule(module.id)}
                            className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={module.icon} />
                              </svg>
                              <span className="text-sm font-medium text-neutral-950">{module.name}</span>
                            </div>
                            <p className="text-xs text-neutral-400 mt-1">{module.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Website */}
              {currentStep === 6 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Event Domain <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-2">Your event website URL. You can connect a custom domain later.</p>
                    <div className="flex items-center">
                      <input
                        value={newEvent.subdomain}
                        onChange={(e) => setNewEvent({ ...newEvent, subdomain: e.target.value })}
                        type="text"
                        required
                        className="input rounded-r-none border-r-0"
                        placeholder="my-event-2027"
                      />
                      <span className="px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-r-lg text-sm text-neutral-500">.eventelly.com</span>
                    </div>
                    {newEvent.subdomain && (
                      <p className="text-xs text-admin-primary-600 mt-1">
                        https://{newEvent.subdomain}.eventelly.com
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="label">Website Template <span className="text-form-required">*</span></label>
                    <p className="text-xs text-neutral-400 mb-3">Choose a template. You can change it later in the console.</p>
                    <div className="grid grid-cols-2 gap-4">
                      {availableTemplates.map((template) => (
                        <label
                          key={template.id}
                          className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${newEvent.template === template.id ? 'border-admin-primary-500 ring-2 ring-admin-primary-200' : 'border-neutral-200 hover:border-neutral-300'}`}
                        >
                          <input
                            type="radio"
                            checked={newEvent.template === template.id}
                            onChange={() => setNewEvent({ ...newEvent, template: template.id })}
                            className="sr-only"
                          />
                          <div className={`aspect-video flex items-center justify-center ${template.color}`}>
                            <div className="text-white/80">
                              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                              </svg>
                              <p className="text-xs mt-1">{template.name}</p>
                            </div>
                          </div>
                          <div className="p-3 bg-white">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-neutral-950">{template.name}</span>
                              {newEvent.template === template.id && (
                                <svg className="w-5 h-5 text-admin-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <p className="text-xs text-neutral-400 mt-0.5">{template.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 8: Finish */}
              {currentStep === 7 && (
                <div className="space-y-5">
                  <div>
                    <label className="label">Notes</label>
                    <p className="text-xs text-neutral-400 mb-2">Internal notes about this event (optional)</p>
                    <textarea
                      value={newEvent.notes}
                      onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                      rows={4}
                      className="input"
                      placeholder="Add any notes or descriptions..."
                    ></textarea>
                  </div>

                  {/* Summary */}
                  <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-neutral-950 mb-3">Summary</h4>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <dt className="text-neutral-500">Series</dt>
                      <dd className="text-neutral-950">{getSeriesName(newEvent.series)}</dd>
                      <dt className="text-neutral-500">Event Name</dt>
                      <dd className="text-neutral-950">{newEvent.name || '-'}</dd>
                      <dt className="text-neutral-500">Abbreviation</dt>
                      <dd className="text-neutral-950">{newEvent.abbreviation || '-'}</dd>
                      <dt className="text-neutral-500">Period</dt>
                      <dd className="text-neutral-950">{newEvent.startDate} ~ {newEvent.endDate}</dd>
                      <dt className="text-neutral-500">Venue</dt>
                      <dd className="text-neutral-950">{newEvent.venue || '-'}</dd>
                      <dt className="text-neutral-500">Languages</dt>
                      <dd className="text-neutral-950">{newEvent.languages.map(l => getLanguageName(l)).join(', ') || '-'}</dd>
                      <dt className="text-neutral-500">Currencies</dt>
                      <dd className="text-neutral-950">{newEvent.currencies.join(', ') || '-'}</dd>
                      <dt className="text-neutral-500">Domain</dt>
                      <dd className="text-neutral-950">{newEvent.subdomain}.eventelly.com</dd>
                      <dt className="text-neutral-500">Modules</dt>
                      <dd className="text-neutral-950">{newEvent.modules.length} selected</dd>
                    </dl>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between flex-shrink-0">
              {currentStep > 0 ? (
                <button onClick={prevStep} className="btn btn-secondary">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              <div className="flex items-center gap-3">
                <button onClick={closeWizard} className="btn btn-secondary">
                  Cancel
                </button>
                {currentStep < wizardSteps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed}
                    className={`btn btn-primary ${!canProceed ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Next
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={handleCreate} className="btn btn-primary">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Event
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-admin-primary-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-950 mb-2">Event Created!</h3>
            <p className="text-neutral-500 mb-6">
              <span className="font-medium text-neutral-800">{createdEventName}</span> has been successfully created.
            </p>
            <div className="flex gap-3">
              <button onClick={closeSuccessAndGoToList} className="btn btn-secondary flex-1">
                Back to List
              </button>
              <button onClick={goToEventConsole} className="btn btn-primary flex-1">
                Go to Console
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

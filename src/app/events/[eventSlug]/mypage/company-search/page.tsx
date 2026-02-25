'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useMemo } from 'react'
import { Badge } from '@/components/Badge'

interface SearchResult {
  id: string
  name: string
  country: string
  memberCount: number
  joinType: 'open' | 'invite-only'
}

const MOCK_COMPANIES: SearchResult[] = [
  { id: '1', name: 'Design House Co.', country: 'South Korea', memberCount: 12, joinType: 'open' },
  { id: '2', name: 'Modern Living Inc.', country: 'South Korea', memberCount: 5, joinType: 'open' },
  { id: '3', name: 'Nordic Interior', country: 'Sweden', memberCount: 3, joinType: 'invite-only' },
  { id: '4', name: 'Italia Furniture', country: 'Italy', memberCount: 8, joinType: 'open' },
  { id: '5', name: 'Art Gallery Seoul', country: 'South Korea', memberCount: 2, joinType: 'invite-only' },
  { id: '6', name: 'German Kitchen GmbH', country: 'Germany', memberCount: 4, joinType: 'open' },
  { id: '7', name: 'Japan Lighting Co.', country: 'Japan', memberCount: 6, joinType: 'invite-only' },
  { id: '8', name: 'Lifestyle Korea', country: 'South Korea', memberCount: 1, joinType: 'open' },
]

const VALID_INVITE_CODES = ['INVITE-2026', 'NORDIC-VIP', 'SLDF-CODE']

const COUNTRIES = [
  'South Korea', 'United States', 'Japan', 'China', 'Germany',
  'United Kingdom', 'France', 'Italy', 'Sweden', 'Australia',
  'Canada', 'Singapore', 'Netherlands', 'Spain', 'Switzerland',
]

type ModalState =
  | null
  | { type: 'confirm-open'; company: SearchResult }
  | { type: 'confirm-invite'; company: SearchResult }
  | { type: 'invite-code'; company: SearchResult }

type View = 'search' | 'register'

export default function CompanySearchPage() {
  const params = useParams()
  const router = useRouter()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  const [view, setView] = useState<View>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [modal, setModal] = useState<ModalState>(null)

  // Invite code
  const [inviteCode, setInviteCode] = useState('')
  const [inviteError, setInviteError] = useState('')

  // Register form
  const [registerForm, setRegisterForm] = useState({ name: '', country: '' })

  const searchResults = useMemo(() => {
    if (!hasSearched || !searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return MOCK_COMPANIES.filter(
      c => c.name.toLowerCase().includes(q) || c.id.includes(q)
    )
  }, [hasSearched, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setHasSearched(true)
    }
  }

  const handleRowClick = (company: SearchResult) => {
    if (company.joinType === 'open') {
      setModal({ type: 'confirm-open', company })
    } else {
      setModal({ type: 'confirm-invite', company })
    }
  }

  const handleJoin = () => {
    // Mock join
    alert(`Successfully joined ${modal && 'company' in modal ? modal.company.name : ''}.`)
    setModal(null)
    router.push(`${basePath}/mypage`)
  }

  const handleRequestJoin = () => {
    if (modal && 'company' in modal) {
      alert(`Join request sent to ${modal.company.name}.`)
    }
    setModal(null)
  }

  const handleInviteCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (VALID_INVITE_CODES.includes(inviteCode.trim())) {
      alert('Invite code verified. Successfully joined.')
      setModal(null)
      setInviteCode('')
      setInviteError('')
      router.push(`${basePath}/mypage`)
    } else {
      setInviteError('Invalid invite code.')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`${registerForm.name} has been registered.`)
    router.push(`${basePath}/mypage`)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back link */}
        <button
          type="button"
          onClick={() => {
            if (view === 'register') {
              setView('search')
            } else {
              router.push(`${basePath}/mypage`)
            }
          }}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {view === 'register' ? 'Back to Search' : 'My Page'}
        </button>

        {view === 'search' ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-neutral-950">Find Company</h1>
              <p className="text-sm text-neutral-500 mt-1">Search by company name or registration number</p>
            </div>

            {/* Search */}
            <div className="card p-4 mb-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setHasSearched(false) }}
                  placeholder="Enter company name or registration number..."
                  className="input flex-1"
                />
                <button type="submit" className="btn btn-primary flex-shrink-0">
                  Search
                </button>
              </form>
            </div>

            {/* Results */}
            {hasSearched && (
              <div className="card mb-6">
                {searchResults.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Country</th>
                          <th>Members</th>
                          <th className="text-right">Join</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((company) => (
                          <tr
                            key={company.id}
                            onClick={() => handleRowClick(company)}
                            className="cursor-pointer"
                          >
                            <td>
                              <span className="text-sm font-medium text-neutral-950">{company.name}</span>
                            </td>
                            <td>
                              <span className="text-sm text-neutral-600">{company.country}</span>
                            </td>
                            <td>
                              <span className="text-sm text-neutral-600">{company.memberCount}</span>
                            </td>
                            <td className="text-right">
                              {company.joinType === 'open' ? (
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); handleRowClick(company) }}
                                  className="btn btn-primary text-xs px-3 py-1.5"
                                >
                                  Join
                                </button>
                              ) : (
                                <div className="flex items-center justify-end gap-2">
                                  <Badge variant="compact" color="neutral">Invite Only</Badge>
                                  <button
                                    type="button"
                                    disabled
                                    className="btn btn-primary text-xs px-3 py-1.5 opacity-50 cursor-not-allowed"
                                  >
                                    Join
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="py-12 text-center">
                    <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <p className="text-sm text-neutral-500">No results found.</p>
                  </div>
                )}
              </div>
            )}

            {/* Register link */}
            {hasSearched && (
              <div className="text-center">
                <p className="text-sm text-neutral-500">
                  Can&apos;t find your company?{' '}
                  <button
                    type="button"
                    onClick={() => setView('register')}
                    className="text-admin-primary-700 font-medium hover:underline"
                  >
                    Register manually
                  </button>
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Register View */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-neutral-950">Register Company</h1>
              <p className="text-sm text-neutral-500 mt-1">Enter company details to register and automatically join</p>
            </div>

            <div className="card p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="company-name" className="label">
                    Company Name <span className="text-form-required">*</span>
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    className="input"
                    placeholder="Enter company name"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company-country" className="label">
                    Country <span className="text-form-required">*</span>
                  </label>
                  <select
                    id="company-country"
                    className="input"
                    value={registerForm.country}
                    onChange={(e) => setRegisterForm({ ...registerForm, country: e.target.value })}
                    required
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 mt-2"
                  disabled={!registerForm.name || !registerForm.country}
                >
                  Register
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Modal: Open join confirm */}
      {modal?.type === 'confirm-open' && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-neutral-950 text-center mb-2">Join Company</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed mb-6">
              Would you like to join <span className="font-medium text-neutral-700">{modal.company.name}</span>?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleJoin}
                className="btn btn-primary flex-1"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Invite-only confirm */}
      {modal?.type === 'confirm-invite' && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-neutral-950 text-center mb-2">Invite Only</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed mb-6">
              <span className="font-medium text-neutral-700">{modal.company.name}</span> is an invite-only company.
            </p>
            <div className="flex gap-3 mb-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRequestJoin}
                className="btn btn-primary flex-1"
              >
                Request to Join
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setInviteCode('')
                  setInviteError('')
                  setModal({ type: 'invite-code', company: modal.company })
                }}
                className="text-xs text-neutral-500 hover:text-admin-primary-700 transition-colors"
              >
                Have an invite code?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Invite code entry */}
      {modal?.type === 'invite-code' && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setModal(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h3 className="text-base font-semibold text-neutral-950 text-center mb-2">Enter Invite Code</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed mb-6">
              Enter the invite code for <span className="font-medium text-neutral-700">{modal.company.name}</span>
            </p>
            <form onSubmit={handleInviteCodeSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  className={`input ${inviteError ? 'border-destructive-text focus:ring-destructive-text/20' : ''}`}
                  placeholder="Enter invite code"
                  value={inviteCode}
                  onChange={(e) => { setInviteCode(e.target.value); setInviteError('') }}
                  autoFocus
                />
                {inviteError && (
                  <p className="text-xs text-destructive-text mt-1.5">{inviteError}</p>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setInviteCode('')
                    setInviteError('')
                    setModal({ type: 'confirm-invite', company: modal.company })
                  }}
                  className="btn btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={!inviteCode.trim()}
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

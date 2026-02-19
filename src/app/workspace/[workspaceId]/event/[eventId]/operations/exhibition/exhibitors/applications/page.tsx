'use client'

import { useState, useRef, useEffect } from 'react'
import Pagination from '@/components/Pagination'
import { Badge, type StatusColor } from '@/components/Badge'

export default function ApplicationPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const statusRef = useRef<HTMLDivElement>(null)

  const statusOptions = ['Approved', 'Pending', 'Rejected']

  const applications = [
    { id: 1, company: 'Hanssem', contact: 'Kim Minjun', date: '2024-01-15', boothType: 'Premium', status: 'Approved' },
    { id: 2, company: 'Livart', contact: 'Lee Soyeon', date: '2024-01-14', boothType: 'Standard', status: 'Pending' },
    { id: 3, company: 'Casamia', contact: 'Park Jihye', date: '2024-01-13', boothType: 'Standard', status: 'Pending' },
    { id: 4, company: 'IKEA Korea', contact: 'Choi Eunji', date: '2024-01-12', boothType: 'Premium', status: 'Approved' },
    { id: 5, company: 'Design Furniture', contact: 'Jung Woojin', date: '2024-01-11', boothType: 'Basic', status: 'Rejected' },
  ]

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const filteredApplications = applications.filter(app =>
    !statusFilter || app.status === statusFilter
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Exhibition Applications</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage exhibitor applications</p>
        </div>
        <button className="btn btn-primary">
          Export
        </button>
      </div>

      <div className="card">
        <div className="px-5 py-4 border-b border-neutral-100 flex gap-4">
          <input
            type="text"
            placeholder="Search applications..."
            className="input max-w-sm"
          />
          {/* Status Filter Dropdown */}
          <div className="relative w-40" ref={statusRef}>
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
                  {statusOptions.map((status) => (
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

        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Applied Date</th>
              <th>Booth Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id}>
                <td className="font-medium text-neutral-950">{app.company}</td>
                <td className="text-neutral-500">{app.contact}</td>
                <td className="text-neutral-500">{app.date}</td>
                <td className="text-neutral-500">{app.boothType}</td>
                <td>
                  <Badge variant="status" color={
                    app.status === 'Approved' ? 'primary' :
                    app.status === 'Pending' ? 'warning' :
                    'error'
                  }>
                    {app.status}
                  </Badge>
                </td>
                <td className="text-right">
                  <button className="text-sm text-admin-primary-700 hover:text-admin-primary-800 font-medium">Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={10}
          total={48}
          perPage={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

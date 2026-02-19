'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/Badge';

// Mock invoice data
const invoices = [
  {
    id: 'INV-2026-0003',
    period: 'February 2026',
    issueDate: '2026-03-01',
    dueDate: '2026-03-15',
    amount: 2847.50,
    status: 'pending',
    paidDate: null,
  },
  {
    id: 'INV-2026-0002',
    period: 'January 2026',
    issueDate: '2026-02-01',
    dueDate: '2026-02-15',
    amount: 2156.25,
    status: 'paid',
    paidDate: '2026-02-12',
  },
  {
    id: 'INV-2026-0001',
    period: 'December 2025',
    issueDate: '2026-01-01',
    dueDate: '2026-01-15',
    amount: 1892.00,
    status: 'paid',
    paidDate: '2026-01-14',
  },
  {
    id: 'INV-2025-0012',
    period: 'November 2025',
    issueDate: '2025-12-01',
    dueDate: '2025-12-15',
    amount: 1654.75,
    status: 'paid',
    paidDate: '2025-12-10',
  },
  {
    id: 'INV-2025-0011',
    period: 'October 2025',
    issueDate: '2025-11-01',
    dueDate: '2025-11-15',
    amount: 1423.00,
    status: 'paid',
    paidDate: '2025-11-13',
  },
];

// Invoice detail breakdown
const invoiceDetails: Record<string, any> = {
  'INV-2026-0003': {
    items: [
      { description: 'Registrants (15,200)', quantity: 15200, rate: 0.05, amount: 760.00 },
      { description: 'Visitors (18,500)', quantity: 18500, rate: 0.02, amount: 370.00 },
      { description: 'Exhibitors (425)', quantity: 425, rate: 2.00, amount: 850.00 },
      { description: 'Traffic (62.5 GB)', quantity: 62.5, rate: 0.15, amount: 9.38 },
      { description: 'Emails Sent (45,200)', quantity: 45200, rate: 0.003, amount: 135.60 },
      { description: 'SMS Sent (14,450)', quantity: 14450, rate: 0.05, amount: 722.50 },
    ],
    subtotal: 2847.48,
    tax: 0,
    total: 2847.50,
  },
  'INV-2026-0002': {
    items: [
      { description: 'Registrants (12,100)', quantity: 12100, rate: 0.05, amount: 605.00 },
      { description: 'Visitors (14,200)', quantity: 14200, rate: 0.02, amount: 284.00 },
      { description: 'Exhibitors (380)', quantity: 380, rate: 2.00, amount: 760.00 },
      { description: 'Traffic (48.2 GB)', quantity: 48.2, rate: 0.15, amount: 7.23 },
      { description: 'Emails Sent (38,000)', quantity: 38000, rate: 0.003, amount: 114.00 },
      { description: 'SMS Sent (7,720)', quantity: 7720, rate: 0.05, amount: 386.00 },
    ],
    subtotal: 2156.23,
    tax: 0,
    total: 2156.25,
  },
};

export default function PaymentHistoryPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredInvoices = invoices.filter(inv =>
    statusFilter === 'all' || inv.status === statusFilter
  );

  const formatCurrency = (num: number) => `$${num.toFixed(2)}`;
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="status" color="success">Paid</Badge>;
      case 'pending':
        return <Badge variant="status" color="warning">Pending</Badge>;
      case 'overdue':
        return <Badge variant="status" color="error">Overdue</Badge>;
      default:
        return null;
    }
  };

  // Calculate totals
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Payment History</h1>
          <p className="text-neutral-500 mt-1">View your invoices and payment records</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-neutral-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-status-success-bg rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Total Paid</p>
              <p className="text-xl font-bold text-neutral-950">{formatCurrency(totalPaid)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-status-warning-bg rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-warning-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Pending</p>
              <p className="text-xl font-bold text-neutral-950">{formatCurrency(totalPending)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-5">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
            <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Total Invoices</p>
              <p className="text-xl font-bold text-neutral-950">{invoices.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-40" ref={statusRef}>
          <button
            type="button"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="w-full input text-left flex items-center justify-between pr-4"
          >
            <span className={statusFilter === 'all' ? 'text-neutral-500' : 'text-neutral-950'}>
              {statusOptions.find(s => s.value === statusFilter)?.label}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isStatusOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setStatusFilter(option.value);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${statusFilter === option.value ? 'bg-admin-primary-50' : ''}`}
                  >
                    <span className="text-neutral-950">{option.label}</span>
                    {statusFilter === option.value && (
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

      {/* Invoice List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Billing Period</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <p className="text-sm font-medium text-neutral-950">{invoice.id}</p>
                  </td>
                  <td>
                    <p className="text-sm text-neutral-950">{invoice.period}</p>
                  </td>
                  <td>
                    <p className="text-sm text-neutral-500">{formatDate(invoice.issueDate)}</p>
                  </td>
                  <td>
                    <p className="text-sm text-neutral-500">{formatDate(invoice.dueDate)}</p>
                    {invoice.paidDate && (
                      <p className="text-xs text-status-success-border">Paid {formatDate(invoice.paidDate)}</p>
                    )}
                  </td>
                  <td className="text-right">
                    <p className="text-sm font-medium text-neutral-950">{formatCurrency(invoice.amount)}</p>
                  </td>
                  <td className="text-center">
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedInvoice(invoice.id)}
                        className="p-2 text-neutral-400 hover:text-admin-primary-600 transition-colors"
                        title="View details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-neutral-400 hover:text-admin-primary-600 transition-colors"
                        title="Download PDF"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-lg max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">Invoice {selectedInvoice}</h3>
                <p className="text-sm text-neutral-500">{invoices.find(i => i.id === selectedInvoice)?.period}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Invoice Info */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Issue Date</p>
                  <p className="text-sm text-neutral-950">
                    {formatDate(invoices.find(i => i.id === selectedInvoice)?.issueDate || '')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Due Date</p>
                  <p className="text-sm text-neutral-950">
                    {formatDate(invoices.find(i => i.id === selectedInvoice)?.dueDate || '')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Status</p>
                  {getStatusBadge(invoices.find(i => i.id === selectedInvoice)?.status || '')}
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Payment Method</p>
                  <p className="text-sm text-neutral-950">Visa •••• 4242</p>
                </div>
              </div>

              {/* Line Items */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden mb-6">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Rate</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(invoiceDetails[selectedInvoice]?.items || []).map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="text-neutral-950">{item.description}</td>
                        <td className="text-neutral-500 text-right">{item.quantity.toLocaleString()}</td>
                        <td className="text-neutral-500 text-right">${item.rate}</td>
                        <td className="text-neutral-950 text-right font-medium">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="text-neutral-950">{formatCurrency(invoiceDetails[selectedInvoice]?.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Tax</span>
                  <span className="text-neutral-950">{formatCurrency(invoiceDetails[selectedInvoice]?.tax || 0)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-neutral-200">
                  <span className="text-neutral-950">Total</span>
                  <span className="text-admin-primary-600">{formatCurrency(invoiceDetails[selectedInvoice]?.total || 0)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                {invoices.find(i => i.id === selectedInvoice)?.status === 'pending' ? (
                  <>
                    <button className="flex-1 btn btn-secondary flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </button>
                    <button className="flex-1 btn btn-primary">
                      Pay Now
                    </button>
                  </>
                ) : (
                  <button className="btn btn-secondary flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { routes } from '@/lib/routes';

export default function PaymentPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const ws = routes.workspace(workspaceId);

  const paymentSections = [
    {
      title: 'Usage History',
      description: 'Monitor your usage across all events and view estimated charges based on current consumption.',
      href: ws.billing.usage(),
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'bg-status-info-bg text-status-info-border',
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment method for automatic billing. Add, update, or remove your card.',
      href: ws.billing.methods(),
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      color: 'bg-status-success-bg text-status-success-border',
    },
    {
      title: 'Payment History',
      description: 'View your invoices and payment records. Download invoices for your records.',
      href: ws.billing.history(),
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-950">Payment & Billing</h1>
        <p className="text-neutral-500 mt-1">Manage your billing, usage, and payment information</p>
      </div>

      {/* Info Banner */}
      <div className="bg-status-info-bg border border-status-info-border rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-status-info-border mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-status-info-text font-medium">Pay-as-you-go Billing Model</p>
            <p className="text-sm text-status-info-text mt-1">
              Eventelly uses a postpaid billing system. You only pay for what you use. At the end of each billing cycle, you will receive an invoice based on your actual usage across all events. No subscription fees or upfront costs.
            </p>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="bg-white rounded-lg border border-neutral-200 p-6 hover:border-admin-primary-300 hover:shadow-sm transition-all group"
          >
            <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center mb-4`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-950 mb-2 group-hover:text-admin-primary-600 transition-colors">
              {section.title}
            </h3>
            <p className="text-sm text-neutral-500">{section.description}</p>
            <div className="mt-4 flex items-center text-sm text-admin-primary-600 font-medium">
              View details
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white rounded-lg border border-neutral-200 p-6">
        <h3 className="text-lg font-semibold text-neutral-950 mb-4">Current Billing Period</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Period</p>
            <p className="text-lg font-semibold text-neutral-950 mt-1">March 2026</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Active Events</p>
            <p className="text-lg font-semibold text-neutral-950 mt-1">3</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Estimated Charges</p>
            <p className="text-lg font-semibold text-admin-primary-600 mt-1">$2,847.50</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Billing Date</p>
            <p className="text-lg font-semibold text-neutral-950 mt-1">Apr 1, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}

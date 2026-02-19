'use client';

import React, { useState, useRef, useEffect } from 'react';

// Mock data for running events with usage metrics
const runningEvents = [
  {
    id: 1,
    name: 'Seoul Living Design Fair 2026',
    series: 'Seoul Living Design Fair',
    status: 'live',
    period: 'Mar 15 - Mar 20, 2026',
    metrics: {
      registrants: 12450,
      visitors: 8920,
      exhibitors: 342,
      trafficGB: 45.2,
      emailsSent: 28500,
      smsSent: 5200,
    },
  },
  {
    id: 2,
    name: 'Busan Design Week 2026',
    series: 'Busan Design Week',
    status: 'live',
    period: 'Mar 10 - Mar 25, 2026',
    metrics: {
      registrants: 8320,
      visitors: 6150,
      exhibitors: 215,
      trafficGB: 32.8,
      emailsSent: 18200,
      smsSent: 3100,
    },
  },
  {
    id: 3,
    name: 'Korea Startup Expo 2026',
    series: 'Korea Startup Expo',
    status: 'upcoming',
    period: 'Apr 5 - Apr 8, 2026',
    metrics: {
      registrants: 3200,
      visitors: 0,
      exhibitors: 128,
      trafficGB: 8.5,
      emailsSent: 9600,
      smsSent: 1800,
    },
  },
];

// Pricing tiers (example pricing structure)
const pricingRates = {
  registrants: { rate: 0.05, unit: 'per registrant' },
  visitors: { rate: 0.02, unit: 'per visitor' },
  exhibitors: { rate: 2.0, unit: 'per exhibitor' },
  trafficGB: { rate: 0.15, unit: 'per GB' },
  emailsSent: { rate: 0.003, unit: 'per email' },
  smsSent: { rate: 0.05, unit: 'per SMS' },
};

export default function UsageHistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState('2026-03');
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);

  const months = [
    { value: '2026-03', label: 'March 2026' },
    { value: '2026-02', label: 'February 2026' },
    { value: '2026-01', label: 'January 2026' },
    { value: '2025-12', label: 'December 2025' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate totals
  const totals = runningEvents.reduce(
    (acc, event) => ({
      registrants: acc.registrants + event.metrics.registrants,
      visitors: acc.visitors + event.metrics.visitors,
      exhibitors: acc.exhibitors + event.metrics.exhibitors,
      trafficGB: acc.trafficGB + event.metrics.trafficGB,
      emailsSent: acc.emailsSent + event.metrics.emailsSent,
      smsSent: acc.smsSent + event.metrics.smsSent,
    }),
    { registrants: 0, visitors: 0, exhibitors: 0, trafficGB: 0, emailsSent: 0, smsSent: 0 }
  );

  // Calculate estimated charges
  const estimatedCharges = {
    registrants: totals.registrants * pricingRates.registrants.rate,
    visitors: totals.visitors * pricingRates.visitors.rate,
    exhibitors: totals.exhibitors * pricingRates.exhibitors.rate,
    trafficGB: totals.trafficGB * pricingRates.trafficGB.rate,
    emailsSent: totals.emailsSent * pricingRates.emailsSent.rate,
    smsSent: totals.smsSent * pricingRates.smsSent.rate,
  };

  const totalEstimated = Object.values(estimatedCharges).reduce((a, b) => a + b, 0);

  const formatNumber = (num: number) => num.toLocaleString();
  const formatCurrency = (num: number) => `$${num.toFixed(2)}`;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Usage History</h1>
          <p className="text-neutral-500 mt-1">Monitor your usage across all events and estimated charges</p>
        </div>
        <div className="relative" ref={monthRef}>
          <button
            type="button"
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="input text-left flex items-center justify-between pr-4 w-48"
          >
            <span className="text-neutral-950 flex-1 truncate">
              {months.find(m => m.value === selectedMonth)?.label}
            </span>
            <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isMonthOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
              <div className="py-1">
                {months.map((month) => (
                  <button
                    key={month.value}
                    type="button"
                    onClick={() => {
                      setSelectedMonth(month.value);
                      setIsMonthOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-50 transition-colors flex items-center justify-between ${selectedMonth === month.value ? 'bg-admin-primary-50' : ''}`}
                  >
                    <span className="text-neutral-950">{month.label}</span>
                    {selectedMonth === month.value && (
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

      {/* Info Banner */}
      <div className="bg-status-info-bg border border-status-info-border rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-status-info-border mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-status-info-text font-medium">Pay-as-you-go Billing</p>
            <p className="text-sm text-status-info-text mt-1">
              Eventelly uses a postpaid billing model. You will receive an invoice at the end of each billing cycle based on your actual usage. No upfront costs or subscription fees.
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Active Events</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{runningEvents.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Total Registrants</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{formatNumber(totals.registrants)}</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Total Visitors</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{formatNumber(totals.visitors)}</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Traffic Used</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{totals.trafficGB.toFixed(1)} GB</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">Emails Sent</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{formatNumber(totals.emailsSent)}</p>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <p className="text-xs text-neutral-500 uppercase tracking-wide">SMS Sent</p>
          <p className="text-2xl font-bold text-neutral-950 mt-1">{formatNumber(totals.smsSent)}</p>
        </div>
      </div>

      {/* Usage by Event */}
      <div className="bg-white rounded-lg border border-neutral-200 mb-8">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-950">Usage by Event</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th className="text-right">Registrants</th>
                <th className="text-right">Visitors</th>
                <th className="text-right">Exhibitors</th>
                <th className="text-right">Traffic</th>
                <th className="text-right">Emails</th>
                <th className="text-right">SMS</th>
              </tr>
            </thead>
            <tbody>
              {runningEvents.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div>
                      <p className="text-sm font-medium text-neutral-950">{event.name}</p>
                      <p className="text-xs text-neutral-500">{event.period}</p>
                    </div>
                  </td>
                  <td className="text-right text-neutral-950">{formatNumber(event.metrics.registrants)}</td>
                  <td className="text-right text-neutral-950">{formatNumber(event.metrics.visitors)}</td>
                  <td className="text-right text-neutral-950">{formatNumber(event.metrics.exhibitors)}</td>
                  <td className="text-right text-neutral-950">{event.metrics.trafficGB.toFixed(1)} GB</td>
                  <td className="text-right text-neutral-950">{formatNumber(event.metrics.emailsSent)}</td>
                  <td className="text-right text-neutral-950">{formatNumber(event.metrics.smsSent)}</td>
                </tr>
              ))}
              {/* Totals Row */}
              <tr className="bg-neutral-50 font-semibold">
                <td className="text-neutral-950">Total</td>
                <td className="text-right text-neutral-950">{formatNumber(totals.registrants)}</td>
                <td className="text-right text-neutral-950">{formatNumber(totals.visitors)}</td>
                <td className="text-right text-neutral-950">{formatNumber(totals.exhibitors)}</td>
                <td className="text-right text-neutral-950">{totals.trafficGB.toFixed(1)} GB</td>
                <td className="text-right text-neutral-950">{formatNumber(totals.emailsSent)}</td>
                <td className="text-right text-neutral-950">{formatNumber(totals.smsSent)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Estimated Charges */}
      <div className="bg-white rounded-lg border border-neutral-200">
        <div className="px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-950">Estimated Charges</h2>
          <p className="text-sm text-neutral-500 mt-1">Based on current usage for {months.find(m => m.value === selectedMonth)?.label}</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">Registrants</p>
                <p className="text-xs text-neutral-500">{formatNumber(totals.registrants)} × ${pricingRates.registrants.rate} {pricingRates.registrants.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.registrants)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">Visitors</p>
                <p className="text-xs text-neutral-500">{formatNumber(totals.visitors)} × ${pricingRates.visitors.rate} {pricingRates.visitors.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.visitors)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">Exhibitors</p>
                <p className="text-xs text-neutral-500">{formatNumber(totals.exhibitors)} × ${pricingRates.exhibitors.rate} {pricingRates.exhibitors.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.exhibitors)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">Traffic</p>
                <p className="text-xs text-neutral-500">{totals.trafficGB.toFixed(1)} GB × ${pricingRates.trafficGB.rate} {pricingRates.trafficGB.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.trafficGB)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">Emails</p>
                <p className="text-xs text-neutral-500">{formatNumber(totals.emailsSent)} × ${pricingRates.emailsSent.rate} {pricingRates.emailsSent.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.emailsSent)}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-neutral-100">
              <div>
                <p className="text-sm font-medium text-neutral-950">SMS</p>
                <p className="text-xs text-neutral-500">{formatNumber(totals.smsSent)} × ${pricingRates.smsSent.rate} {pricingRates.smsSent.unit}</p>
              </div>
              <p className="text-sm font-medium text-neutral-950">{formatCurrency(estimatedCharges.smsSent)}</p>
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t-2 border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-neutral-950">Estimated Total</p>
                <p className="text-sm text-neutral-500">Final invoice may vary based on usage until billing date</p>
              </div>
              <p className="text-2xl font-bold text-admin-primary-600">{formatCurrency(totalEstimated)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

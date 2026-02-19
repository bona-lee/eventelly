'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { routes } from '@/lib/routes'

export default function EventHomePage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string
  const eventId = params.eventId as string
  const ev = routes.workspace(workspaceId).event(eventId)

  // Setup checklist items
  const [setupItems] = useState([
    { id: 1, title: 'Add an event cover image', completed: true, link: ev.settings.design.theme() },
    { id: 2, title: 'Brand the event with your colors', completed: true, link: ev.settings.design.theme() },
    { id: 3, title: 'Configure exhibition settings', completed: true, link: ev.settings.main.exhibition() },
    { id: 4, title: 'Set up ticket types and pricing', completed: true, link: ev.settings.main.tickets() },
    { id: 5, title: 'Create registration form', completed: true, link: ev.settings.forms.registration() },
    { id: 6, title: 'Enable notification emails', completed: false, link: ev.settings.communication.templates() },
    { id: 7, title: 'Publish the event', completed: false, link: ev.settings.design.pages() },
  ])

  const completedCount = setupItems.filter(item => item.completed).length
  const totalCount = setupItems.length
  const progressPercent = Math.round((completedCount / totalCount) * 100)

  // Additional action cards
  const additionalActions = [
    {
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
      title: 'Programs & Sessions',
      description: 'Create engaging sessions and allow participants to plan their agendas.',
      buttonText: 'Add Program',
      link: ev.settings.main.sessions(),
    },
    {
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
      title: 'Exhibitors',
      description: 'Manage exhibitor applications, booth assignments, and company profiles.',
      buttonText: 'Add Exhibitor',
      link: ev.operations.exhibition.exhibitors.applications(),
    },
    {
      icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
      title: 'Tickets & Registration',
      description: 'Create ticket types and manage visitor registration settings.',
      buttonText: 'Manage Tickets',
      link: ev.operations.registration.tickets.orders(),
    },
    {
      icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
      title: 'Business Matching',
      description: 'Set up meeting schedules and enable buyer-seller matching.',
      buttonText: 'Configure Matching',
      link: ev.settings.main.meetings(),
    },
    {
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      title: 'Notifications',
      description: 'Set up automated emails and SMS to inform attendees and exhibitors.',
      buttonText: 'Schedule Notification',
      link: ev.settings.communication.templates(),
    },
    {
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      title: 'Website Builder',
      description: 'Customize your event website pages, menus, and design theme.',
      buttonText: 'Edit Website',
      link: ev.settings.design.pages(),
    },
    {
      icon: '3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      title: 'Invitations',
      description: 'Send invitation codes to VIPs and track registration status.',
      buttonText: 'Send Invitations',
      link: ev.operations.registration.accessCodes.usage(),
    },
    {
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      title: 'Analytics & Reports',
      description: 'Track visitor statistics, exhibitor performance, and event insights.',
      buttonText: 'View Reports',
      link: ev.settings.reports.statistics.overview(),
    },
  ]

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">Hi Bona, let's manage your event</h1>
        <p className="mt-1 text-sm text-neutral-500">Seoul Living Design Fair 2026</p>
      </div>

      <div className="flex gap-5 mb-6">
        {/* Setup Checklist - Left Side */}
        <div className="flex-1 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-neutral-950">Set up your event basics</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">{completedCount}/{totalCount} completed</span>
              <div className="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-admin-primary-500 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-0.5">
            {setupItems.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center justify-between px-2 py-2.5 rounded-md hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {item.completed ? (
                    <div className="w-5 h-5 rounded-full bg-admin-primary-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-neutral-300 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.completed ? 'text-admin-primary-700' : 'text-neutral-600'}`}>
                    {item.title}
                  </span>
                </div>
                <svg className="w-5 h-5 text-neutral-300 group-hover:text-neutral-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Preview Card - Right Side */}
        <div className="w-72 flex-shrink-0">
          <div className="card p-5 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center mb-3">
              <div className="relative">
                {/* Illustration placeholder */}
                <div className="w-40 h-28 bg-gradient-to-br from-admin-primary-50 to-admin-primary-100 rounded-lg flex items-center justify-center">
                  <div className="flex items-end gap-1.5">
                    <div className="w-10 h-16 bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1.5">
                      <div className="w-6 h-6 rounded-full bg-admin-primary-100 mb-1" />
                      <div className="w-5 h-0.5 bg-neutral-200 rounded mb-0.5" />
                      <div className="w-6 h-0.5 bg-neutral-200 rounded" />
                    </div>
                    <div className="w-12 h-20 bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1.5">
                      <div className="w-8 h-8 rounded-full bg-admin-primary-200 mb-1" />
                      <div className="w-6 h-0.5 bg-neutral-200 rounded mb-0.5" />
                      <div className="w-8 h-0.5 bg-neutral-200 rounded mb-0.5" />
                      <div className="w-5 h-0.5 bg-neutral-200 rounded" />
                    </div>
                    <div className="w-10 h-16 bg-white rounded-md shadow-sm flex flex-col items-center justify-center p-1.5">
                      <div className="w-6 h-6 rounded-full bg-admin-primary-100 mb-1" />
                      <div className="w-5 h-0.5 bg-neutral-200 rounded mb-0.5" />
                      <div className="w-6 h-0.5 bg-neutral-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-950 text-sm mb-1">Preview your event</h3>
              <p className="text-xs text-neutral-500 mb-3">
                See how your event looks to participants before publishing it live.
              </p>
              <button className="w-full px-4 py-2 text-sm font-medium text-admin-primary-700 bg-admin-primary-50 hover:bg-admin-primary-100 rounded-md transition-colors">
                Preview Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Steps Section */}
      <div className="mb-6">
        <h2 className="font-semibold text-neutral-950 mb-3">Additional steps for a successful event</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {additionalActions.map((action, index) => (
            <div key={index} className="card p-4 flex flex-col">
              <div className="w-9 h-9 rounded-md bg-admin-primary-50 flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <h3 className="font-medium text-neutral-950 text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-neutral-500 mb-3 flex-1">{action.description}</p>
              <Link
                href={action.link}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 hover:border-neutral-300 transition-colors w-fit"
              >
                {action.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6">
        <h2 className="font-semibold text-neutral-950 mb-3">Event Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-950">245</p>
                <p className="text-xs text-neutral-500">Exhibitors</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-status-success-bg flex items-center justify-center">
                <svg className="w-4 h-4 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-950">12,500</p>
                <p className="text-xs text-neutral-500">Visitors</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-9 h-9 rounded-md bg-purple-50 flex items-center justify-center">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-950">156</p>
                <p className="text-xs text-neutral-500">Biz Meetings</p>
              </div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-9 h-9 rounded-md bg-amber-50 flex items-center justify-center">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-950">$125K</p>
                <p className="text-xs text-neutral-500">Revenue</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Help Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Activity */}
        <div className="card p-5">
          <h2 className="font-semibold text-neutral-950 mb-3">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-status-success-bg flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-status-success-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-950">New exhibitor <span className="font-medium">IKEA Korea</span> registered</p>
                <p className="text-xs text-neutral-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-950"><span className="font-medium">52 visitors</span> registered today</p>
                <p className="text-xs text-neutral-400">Today</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-950"><span className="font-medium">8 new meetings</span> scheduled</p>
                <p className="text-xs text-neutral-400">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
              <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative KPI icon */}
                <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-950">Booth <span className="font-medium">A-101</span> assigned to Samsung</p>
                <p className="text-xs text-neutral-400">2 days ago</p>
              </div>
            </div>
          </div>
          <Link
            href={ev.settings.reports.statistics.overview()}
            className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-admin-primary-700 hover:text-admin-primary-800"
          >
            View all activity
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Need Help */}
        <div className="card p-5 bg-gradient-to-br from-admin-primary-50 to-white">
          <h2 className="font-semibold text-neutral-950 mb-3">Need help getting started?</h2>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-3 p-2.5 bg-white rounded-md hover:shadow-sm transition-shadow">
              <div className="w-7 h-7 rounded-md bg-admin-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-950">Quick Start Guide</p>
                <p className="text-xs text-neutral-500">Learn the basics in 5 minutes</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-2.5 bg-white rounded-md hover:shadow-sm transition-shadow">
              <div className="w-7 h-7 rounded-md bg-admin-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-950">Video Tutorials</p>
                <p className="text-xs text-neutral-500">Watch step-by-step guides</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-2.5 bg-white rounded-md hover:shadow-sm transition-shadow">
              <div className="w-7 h-7 rounded-md bg-admin-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-950">Help Center</p>
                <p className="text-xs text-neutral-500">Browse FAQs and documentation</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 p-2.5 bg-white rounded-md hover:shadow-sm transition-shadow">
              <div className="w-7 h-7 rounded-md bg-admin-primary-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-950">Contact Support</p>
                <p className="text-xs text-neutral-500">Get help from our team</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

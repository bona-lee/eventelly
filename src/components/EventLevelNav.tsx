'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { routes, routeSegments } from '@/lib/routes'

interface EventLevelNavProps {
  workspaceId: string
  eventId: string
}

export default function EventLevelNav({ workspaceId, eventId }: EventLevelNavProps) {
  const pathname = usePathname()
  const ev = routes.workspace(workspaceId).event(eventId)
  const basePath = ev.root()
  const [consoleMode, setConsoleMode] = useState<'operation' | 'settings'>('operation')

  const [expandedSections, setExpandedSections] = useState({
    // Operations
    participants: false,
    registration: false,
    exhibition: false,
    meetings: false,
    extraForms: false,
    // Settings
    mainSettings: false,
    formTerms: false,
    communication: false,
    design: false,
    reports: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const isActiveRoute = (section: string) => {
    if (section === 'home') {
      return pathname === basePath || pathname === `${basePath}/`
    }
    return pathname.includes(`${basePath}/${section}`)
  }

  const isExactRoute = (route: string) => {
    return pathname === route || pathname.startsWith(`${route}/`)
  }

  useEffect(() => {
    if (pathname.startsWith(`${basePath}/settings/`)) {
      setConsoleMode('settings')
    }

    // Operations
    if (pathname.includes(routeSegments.operationsParticipants)) setExpandedSections((prev) => ({ ...prev, participants: true }))
    if (pathname.includes(routeSegments.operationsRegistration)) setExpandedSections((prev) => ({ ...prev, registration: true }))
    if (pathname.includes(routeSegments.operationsExhibition)) setExpandedSections((prev) => ({ ...prev, exhibition: true }))
    if (pathname.includes(routeSegments.operationsMeetings)) setExpandedSections((prev) => ({ ...prev, meetings: true }))
    if (pathname.includes(routeSegments.operationsExtraForms)) setExpandedSections((prev) => ({ ...prev, extraForms: true }))
    // Settings
    if (pathname.includes(routeSegments.settingsMain)) setExpandedSections((prev) => ({ ...prev, mainSettings: true }))
    if (pathname.includes(routeSegments.settingsForms)) setExpandedSections((prev) => ({ ...prev, formTerms: true }))
    if (pathname.includes(routeSegments.settingsCommunication)) setExpandedSections((prev) => ({ ...prev, communication: true }))
    if (pathname.includes(routeSegments.settingsDesign)) setExpandedSections((prev) => ({ ...prev, design: true }))
    if (pathname.includes(routeSegments.settingsReports)) setExpandedSections((prev) => ({ ...prev, reports: true }))
  }, [pathname, basePath])
  const SubMenuItem = ({ route, label }: { route: string; label: string }) => (
    <Link
      href={route}
      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
        isExactRoute(route) ? 'bg-admin-primary/10 text-admin-primary-700 font-medium' : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
      }`}
    >
      {label}
    </Link>
  )

  const SubMenuGroup = ({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) => (
    <div className="mt-2">
      <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral-600">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
        <span>{label}</span>
      </div>
      <div className="ml-5 mt-1 space-y-0.5 border-l border-neutral-200 pl-3">
        {children}
      </div>
    </div>
  )

  const SectionToggle = ({ label, sectionKey }: { label: string; sectionKey: keyof typeof expandedSections }) => (
    <div className="pt-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-neutral-400 uppercase tracking-wider hover:text-neutral-600 transition-colors"
      >
        <span>{label}</span>
        <svg className={`w-3.5 h-3.5 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
  return (
    <aside className="w-60 bg-white border-r border-neutral-100 fixed left-0 top-14 bottom-0 flex flex-col">
      {/* Mode Toggle Switch */}
      <div className="p-4 border-b border-neutral-100">
        <div className="relative bg-neutral-100 rounded-lg p-1">
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-all duration-300 ease-out ${
              consoleMode === 'operation' ? 'left-1' : 'left-[calc(50%+2px)]'
            }`}
          />
          <div className="relative flex">
            <button
              onClick={() => setConsoleMode('operation')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs font-medium rounded-md transition-colors z-10 whitespace-nowrap ${
                consoleMode === 'operation' ? 'text-admin-primary-700' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Operation</span>
            </button>
            <button
              onClick={() => setConsoleMode('settings')}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 text-xs font-medium rounded-md transition-colors z-10 whitespace-nowrap ${
                consoleMode === 'settings' ? 'text-admin-primary-700' : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {consoleMode === 'operation' ? (
          <>
            {/* Overview */}
            <Link
              href={basePath}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActiveRoute('home') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>

            {/* Participants */}
            <SectionToggle label="Participants" sectionKey="participants" />
            {expandedSections.participants && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" label="All Participants">
                  <SubMenuItem route={ev.operations.participants.all.individuals()} label="Individuals" />
                  <SubMenuItem route={ev.operations.participants.all.companies()} label="Companies" />
                </SubMenuGroup>

                <SubMenuGroup icon="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" label="Marketing">
                  <SubMenuItem route={ev.operations.participants.marketing.leads()} label="Lead Management" />
                  <SubMenuItem route={ev.operations.participants.marketing.newsletter()} label="Newsletter Subscribers" />
                </SubMenuGroup>
              </div>
            )}

            {/* Registration */}
            <SectionToggle label="Registration" sectionKey="registration" />
            {expandedSections.registration && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" label="Registrations">
                  <SubMenuItem route={ev.operations.registration.registrations.all()} label="All Registrations" />
                </SubMenuGroup>

                <SubMenuGroup icon="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" label="Tickets">
                  <SubMenuItem route={ev.operations.registration.tickets.orders()} label="Orders" />
                </SubMenuGroup>

                <SubMenuGroup icon="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" label="Access Codes">
                  <SubMenuItem route={ev.operations.registration.accessCodes.usage()} label="Usage" />
                  <SubMenuItem route={ev.operations.registration.accessCodes.inventory()} label="Inventory" />
                </SubMenuGroup>
              </div>
            )}

            {/* Exhibition */}
            <SectionToggle label="Exhibition" sectionKey="exhibition" />
            {expandedSections.exhibition && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" label="Exhibitors">
                  <SubMenuItem route={ev.operations.exhibition.exhibitors.applications()} label="Applications" />
                  <SubMenuItem route={ev.operations.exhibition.exhibitors.booths()} label="Booths" />
                  <SubMenuItem route={ev.operations.exhibition.exhibitors.services()} label="Exhibitor Services" />
                  <SubMenuItem route={ev.operations.exhibition.exhibitors.profiles()} label="Company Profiles" />
                  <SubMenuItem route={ev.operations.exhibition.exhibitors.products()} label="Products" />
                </SubMenuGroup>

                <SubMenuGroup icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" label="Invoicing">
                  <SubMenuItem route={ev.operations.exhibition.invoicing.issue()} label="Issue Invoices" />
                  <SubMenuItem route={ev.operations.exhibition.invoicing.records()} label="Invoice Records" />
                </SubMenuGroup>
              </div>
            )}

            {/* Meetings */}
            <SectionToggle label="Meetings" sectionKey="meetings" />
            {expandedSections.meetings && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" label="Participants">
                  <SubMenuItem route={ev.operations.meetings.participants.all()} label="All Participants" />
                </SubMenuGroup>

                <SubMenuGroup icon="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" label="Scheduling">
                  <SubMenuItem route={ev.operations.meetings.scheduling.availability()} label="Availability Management" />
                  <SubMenuItem route={ev.operations.meetings.scheduling.auto()} label="Auto Matching" />
                  <SubMenuItem route={ev.operations.meetings.scheduling.manual()} label="Manual Matching" />
                </SubMenuGroup>

                <SubMenuGroup icon="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" label="Matching Results">
                  <SubMenuItem route={ev.operations.meetings.results.schedule()} label="Schedule" />
                  <SubMenuItem route={ev.operations.meetings.results.meetings()} label="Meetings" />
                  <SubMenuItem route={ev.operations.meetings.results.waiting()} label="Waiting List" />
                  <SubMenuItem route={ev.operations.meetings.results.consultationReports()} label="Consultation Reports" />
                </SubMenuGroup>
              </div>
            )}

            {/* Extra Forms */}
            <SectionToggle label="Extra Forms" sectionKey="extraForms" />
            {expandedSections.extraForms && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" label="Submissions">
                  <SubMenuItem route={ev.operations.extraForms.submissions.all()} label="All Submissions" />
                </SubMenuGroup>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Settings Mode */}

            {/* Overview */}
            <Link
              href={basePath}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActiveRoute('home') ? 'bg-admin-primary/10 text-admin-primary-700' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Overview
            </Link>

            {/* Main Settings */}
            <SectionToggle label="Main Settings" sectionKey="mainSettings" />
            {expandedSections.mainSettings && (
              <div className="mt-1 space-y-0.5">
                <div className="ml-5 mt-1 space-y-0.5 border-l border-neutral-200 pl-3">
                  <SubMenuItem route={ev.settings.main.exhibition()} label="Exhibition" />
                  <SubMenuItem route={ev.settings.main.tickets()} label="Tickets" />
                  <SubMenuItem route={ev.settings.main.accessCodes()} label="Access Codes" />
                  <SubMenuItem route={ev.settings.main.sessions()} label="Sessions" />
                  <SubMenuItem route={ev.settings.main.meetings()} label="Meetings" />
                  <SubMenuItem route={ev.settings.main.extraForms()} label="Extra Forms" />
                  <SubMenuItem route={ev.settings.main.newsletter()} label="Newsletter" />
                </div>
              </div>
            )}

            {/* Forms & Terms */}
            <SectionToggle label="Forms & Terms" sectionKey="formTerms" />
            {expandedSections.formTerms && (
              <div className="mt-1 space-y-0.5">
                <div className="ml-5 mt-1 space-y-0.5 border-l border-neutral-200 pl-3">
                  <SubMenuItem route={ev.settings.forms.registration()} label="Forms" />
                  <SubMenuItem route={ev.settings.forms.terms()} label="Terms & Policies" />
                </div>
              </div>
            )}

            {/* Communication */}
            <SectionToggle label="Communication" sectionKey="communication" />
            {expandedSections.communication && (
              <div className="mt-1 space-y-0.5">
                <div className="ml-5 mt-1 space-y-0.5 border-l border-neutral-200 pl-3">
                  <SubMenuItem route={ev.settings.communication.templates()} label="Templates" />
                  <SubMenuItem route={ev.settings.communication.scheduled()} label="Scheduled Sends" />
                  <SubMenuItem route={ev.settings.communication.history()} label="Sending History" />
                </div>
              </div>
            )}

            {/* Design */}
            <SectionToggle label="Design" sectionKey="design" />
            {expandedSections.design && (
              <div className="mt-1 space-y-0.5">
                <div className="ml-5 mt-1 space-y-0.5 border-l border-neutral-200 pl-3">
                  <SubMenuItem route={ev.settings.design.theme()} label="Theme" />
                  <SubMenuItem route={ev.settings.design.pages()} label="Pages" />
                  <SubMenuItem route={ev.settings.design.sitemap()} label="Sitemap" />
                  <SubMenuItem route={ev.settings.design.platformTheme()} label="Platform Theme" />
                </div>
              </div>
            )}

            {/* Reports */}
            <SectionToggle label="Reports" sectionKey="reports" />
            {expandedSections.reports && (
              <div className="mt-1 space-y-0.5">
                <SubMenuGroup icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" label="Statistics">
                  <SubMenuItem route={ev.settings.reports.statistics.overview()} label="Overview" />
                  <SubMenuItem route={ev.settings.reports.statistics.registrations()} label="Registrations" />
                  <SubMenuItem route={ev.settings.reports.statistics.exhibitions()} label="Exhibitions" />
                  <SubMenuItem route={ev.settings.reports.statistics.sessions()} label="Sessions" />
                  <SubMenuItem route={ev.settings.reports.statistics.meetings()} label="Meetings" />
                </SubMenuGroup>

                <SubMenuGroup icon="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" label="Analytics">
                  <SubMenuItem route={ev.settings.reports.analytics.data()} label="Data Analytics" />
                </SubMenuGroup>
              </div>
            )}
          </>
        )}
      </nav>
    </aside>
  )
}

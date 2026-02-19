'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function EventOverviewPage() {
  const params = useParams()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary-900 via-brand-primary-800 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(40,228,134,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(197,245,69,0.15)_0%,_transparent_50%)]" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-sm text-white/80 font-medium">2026 서울</span>
          </div>

          {/* Event Title */}
          <h1 className="text-[36px] sm:text-[48px] lg:text-[60px] font-bold text-white mb-6 leading-tight tracking-tight">
            서울리빙디자인페어
            <br />
            <span className="text-brand-primary-300">2026</span>
          </h1>

          {/* Event Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/70 mb-12">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="text-sm font-medium">2026.03.25 (수) – 03.29 (일)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-sm font-medium">COEX Hall A, B</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`${basePath}/login`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-lg bg-white text-neutral-950 hover:bg-neutral-100 transition-all shadow-lg shadow-black/20"
            >
              사전 등록하기
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={`${basePath}/exhibitor`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              참가업체 보기
            </Link>
          </div>
        </div>

      </section>

      {/* Info Cards Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Card */}
            <div className="card p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-admin-primary-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-neutral-950 mb-1">일시</h3>
              <p className="text-sm text-neutral-500">2026.03.25 (수) – 03.29 (일)</p>
              <p className="text-xs text-neutral-400 mt-1">10:00 – 18:00 (마지막 날 17:00)</p>
            </div>

            {/* Venue Card */}
            <div className="card p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-admin-primary-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-neutral-950 mb-1">장소</h3>
              <p className="text-sm text-neutral-500">코엑스 (COEX) Hall A, B</p>
              <p className="text-xs text-neutral-400 mt-1">서울특별시 강남구 영동대로 513</p>
            </div>

            {/* Scale Card */}
            <div className="card p-6 hover:shadow-sm transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-admin-primary-50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-neutral-950 mb-1">규모</h3>
              <p className="text-sm text-neutral-500">참가업체 450+ / 관람객 120,000+</p>
              <p className="text-xs text-neutral-400 mt-1">국내 최대 리빙디자인 박람회</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

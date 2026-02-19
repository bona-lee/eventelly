'use client'

import { useState } from 'react'
import { Badge } from '@/components/Badge'

const noticeCategoryBadge = (category: string) => {
  switch (category) {
    case '안내':
      return { variant: 'category' as const, color: 'neutral' as const }
    case '참가업체':
      return { variant: 'category' as const, color: 'blue' as const }
    case '프로그램':
      return { variant: 'category' as const, color: 'purple' as const }
    default:
      return { variant: 'status' as const, color: 'primary' as const }
  }
}

const notices = [
  {
    id: 1,
    title: '서울리빙디자인페어 2026 사전등록 오픈 안내',
    date: '2026.01.15',
    category: '안내',
    pinned: true,
    content: '서울리빙디자인페어 2026의 사전등록이 시작되었습니다. 사전등록을 하시면 현장에서 빠르게 입장하실 수 있습니다.',
  },
  {
    id: 2,
    title: '참가업체 리스트 1차 공개',
    date: '2026.02.01',
    category: '참가업체',
    pinned: true,
    content: '서울리빙디자인페어 2026의 1차 참가업체 리스트가 공개되었습니다. Exhibitor 메뉴에서 확인하세요.',
  },
  {
    id: 3,
    title: '주차 안내 및 교통편 정보',
    date: '2026.02.05',
    category: '안내',
    pinned: false,
    content: 'COEX 주차장 이용 안내 및 대중교통 접근 정보입니다.',
  },
  {
    id: 4,
    title: '특별 세미나 프로그램 공개',
    date: '2026.02.08',
    category: '프로그램',
    pinned: false,
    content: '올해 새롭게 준비된 특별 세미나 프로그램을 확인하세요.',
  },
  {
    id: 5,
    title: '바이어 사전 미팅 신청 안내',
    date: '2026.02.10',
    category: '비즈니스',
    pinned: false,
    content: '바이어 등록 후 1:1 비즈니스 미팅을 사전에 신청할 수 있습니다.',
  },
]

export default function NoticePage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-950">Notice</h1>
          <p className="text-sm text-neutral-500 mt-1">서울리빙디자인페어 2026 공지사항</p>
        </div>

        {/* Notice List */}
        <div className="space-y-3">
          {notices.map((notice) => (
            <div key={notice.id} className="card overflow-hidden">
              <button
                type="button"
                onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
                className="w-full p-5 text-left hover:bg-neutral-50/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* Pin icon for pinned items */}
                  {notice.pinned && (
                    <div className="w-5 h-5 rounded-full bg-admin-primary-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-admin-primary-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15z" />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge {...noticeCategoryBadge(notice.category)}>
                        {notice.category}
                      </Badge>
                      <span className="text-xs text-neutral-400">{notice.date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-neutral-950">{notice.title}</h3>
                  </div>

                  <svg
                    className={`w-4 h-4 text-neutral-400 flex-shrink-0 mt-1 transition-transform ${
                      expandedId === notice.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded content */}
              {expandedId === notice.id && (
                <div className="px-5 pb-5 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600 pt-4 leading-relaxed">{notice.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

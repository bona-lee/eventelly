'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

export default function MyPage() {
  const params = useParams()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Workspace Notice */}
        <div className="mb-6 rounded-lg bg-admin-primary-50 border border-admin-primary-100 px-4 py-3 flex items-center gap-3">
          <svg className="w-4 h-4 text-admin-primary-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
          </svg>
          <p className="text-sm text-admin-primary-800">
            <span className="font-semibold">디자인하우스</span> 통합회원 마이페이지입니다. 서울리빙디자인페어 2026에 참가 중입니다.
          </p>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-950">My Page</h1>
          <p className="text-sm text-neutral-500 mt-1">서울리빙디자인페어 2026 참가 정보를 확인하세요</p>
        </div>

        {/* Registration Status Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-950">등록 현황</h2>
            <Badge variant="status" color="primary">
              등록 완료
            </Badge>
          </div>
          <div className="bg-neutral-50 rounded-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-400 mb-1">등록 유형</p>
                <p className="text-sm font-medium text-neutral-950">일반 관람객 (사전등록)</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">등록일</p>
                <p className="text-sm font-medium text-neutral-950">2026.02.10</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">등록 번호</p>
                <p className="text-sm font-medium text-neutral-950">SLDF-2026-00001</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-1">상태</p>
                <p className="text-sm font-medium text-admin-primary-700">승인됨</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-neutral-950">내 정보</h2>
            <button type="button" className="btn btn-ghost text-xs">
              수정
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-4 py-2 border-b border-neutral-100">
              <span className="text-xs text-neutral-400 w-20 flex-shrink-0">이름</span>
              <span className="text-sm text-neutral-950">홍길동</span>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-neutral-100">
              <span className="text-xs text-neutral-400 w-20 flex-shrink-0">이메일</span>
              <span className="text-sm text-neutral-950">hong@example.com</span>
            </div>
            <div className="flex items-center gap-4 py-2 border-b border-neutral-100">
              <span className="text-xs text-neutral-400 w-20 flex-shrink-0">연락처</span>
              <span className="text-sm text-neutral-950">010-1234-5678</span>
            </div>
            <div className="flex items-center gap-4 py-2">
              <span className="text-xs text-neutral-400 w-20 flex-shrink-0">소속</span>
              <span className="text-sm text-neutral-950">디자인하우스</span>
            </div>
          </div>
        </div>

        {/* QR Ticket Card */}
        <div className="card p-6 mb-6">
          <h2 className="text-sm font-semibold text-neutral-950 mb-4">입장 QR 코드</h2>
          <div className="flex flex-col items-center py-6">
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 rounded-lg bg-neutral-100 border-2 border-dashed border-neutral-200 flex items-center justify-center mb-4">
              <div className="text-center">
                <svg className="w-10 h-10 text-neutral-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                </svg>
                <p className="text-xs text-neutral-400">QR Code</p>
              </div>
            </div>
            <p className="text-xs text-neutral-400 text-center">
              이 QR 코드를 현장에서 제시하면 빠르게 입장하실 수 있습니다
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`${basePath}/exhibitor`}
            className="card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="w-9 h-9 rounded-md bg-admin-primary-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.15c0 .415.336.75.75.75z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-950">참가업체</p>
              <p className="text-xs text-neutral-400">전시 업체 보기</p>
            </div>
          </Link>
          <Link
            href={`${basePath}/notice`}
            className="card p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
          >
            <div className="w-9 h-9 rounded-md bg-admin-primary-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-950">공지사항</p>
              <p className="text-xs text-neutral-400">최신 소식 확인</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

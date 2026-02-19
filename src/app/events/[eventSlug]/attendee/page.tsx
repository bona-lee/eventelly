'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

const attendeeTypeBadge = (typeId: string) => {
  switch (typeId) {
    case 'general':
      return { variant: 'status' as const, color: 'primary' as const }
    case 'buyer':
      return { variant: 'category' as const, color: 'blue' as const }
    default:
      return { variant: 'category' as const, color: 'purple' as const }
  }
}

const participationTypes = [
  {
    id: 'general',
    title: '일반 관람객',
    description: '전시 관람 및 부대행사 참여',
    features: ['전시 관람', '세미나 참석', '네트워킹 이벤트'],
    price: '무료 (사전등록)',
    tag: 'Popular',
  },
  {
    id: 'buyer',
    title: '바이어',
    description: '비즈니스 미팅 및 상담 진행',
    features: ['전시 관람', '1:1 비즈니스 미팅', 'VIP 라운지 이용', '전용 주차'],
    price: '무료 (사전등록 필수)',
    tag: 'Business',
  },
  {
    id: 'press',
    title: '프레스 / 미디어',
    description: '취재 및 프레스 행사 참여',
    features: ['전시 관람', '프레스 컨퍼런스', '프레스킷 제공', '미디어 라운지'],
    price: '초대',
    tag: 'Media',
  },
]

export default function AttendeePage() {
  const params = useParams()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-950">Attendee</h1>
          <p className="text-sm text-neutral-500 mt-1">참가 유형을 확인하고 사전 등록하세요</p>
        </div>

        {/* Participation Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {participationTypes.map((type) => (
            <div key={type.id} className="card p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <Badge {...attendeeTypeBadge(type.id)}>
                  {type.tag}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-neutral-950 mb-1">{type.title}</h3>
              <p className="text-sm text-neutral-500 mb-4">{type.description}</p>

              <ul className="space-y-2 mb-6 flex-1">
                {type.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-neutral-100 pt-4">
                <p className="text-sm font-semibold text-neutral-950 mb-3">{type.price}</p>
                <Link
                  href={`${basePath}/signup`}
                  className="btn btn-primary w-full text-sm"
                >
                  사전 등록하기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Event Info */}
        <div className="card p-6">
          <h2 className="text-sm font-semibold text-neutral-950 mb-4">참관 안내</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-medium text-neutral-400 mb-2">관람 시간</h3>
              <div className="space-y-1.5">
                <p className="text-sm text-neutral-950">평일: 10:00 – 18:00</p>
                <p className="text-sm text-neutral-950">주말: 10:00 – 18:00</p>
                <p className="text-sm text-neutral-500">* 마지막 날은 17:00 마감</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-medium text-neutral-400 mb-2">유의 사항</h3>
              <div className="space-y-1.5">
                <p className="text-sm text-neutral-950">사전등록 시 현장에서 빠르게 입장 가능</p>
                <p className="text-sm text-neutral-950">현장등록도 가능하나 대기가 발생할 수 있음</p>
                <p className="text-sm text-neutral-950">비즈니스 미팅은 사전 예약 필수</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Badge } from '@/components/Badge'

const categories = ['전체', '가구', '조명', '패브릭', '주방', '욕실', '데코', '아웃도어']

const exhibitors = [
  { id: 1, name: '한샘', category: '가구', booth: 'A-101', description: '프리미엄 홈퍼니싱 브랜드' },
  { id: 2, name: '일룸', category: '가구', booth: 'A-115', description: '라이프스타일 가구' },
  { id: 3, name: '루이스폴센', category: '조명', booth: 'A-201', description: '덴마크 디자인 조명' },
  { id: 4, name: 'FLOS', category: '조명', booth: 'A-205', description: '이탈리안 모던 조명' },
  { id: 5, name: 'Kvadrat', category: '패브릭', booth: 'B-101', description: '텍스타일 & 패브릭' },
  { id: 6, name: '한국도자기', category: '주방', booth: 'B-201', description: '프리미엄 테이블웨어' },
  { id: 7, name: 'TOTO', category: '욕실', booth: 'B-301', description: '욕실 솔루션' },
  { id: 8, name: 'HAY', category: '데코', booth: 'A-301', description: '북유럽 리빙 데코' },
  { id: 9, name: 'Dedon', category: '아웃도어', booth: 'B-401', description: '아웃도어 럭셔리 퍼니처' },
  { id: 10, name: '시몬스', category: '가구', booth: 'A-120', description: '프리미엄 매트리스 & 침대' },
  { id: 11, name: 'Artemide', category: '조명', booth: 'A-210', description: '건축 조명 디자인' },
  { id: 12, name: '에이스침대', category: '가구', booth: 'A-125', description: '대한민국 대표 침대 브랜드' },
]

export default function ExhibitorPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('전체')

  const filtered = exhibitors.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.booth.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === '전체' || e.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-neutral-950">Exhibitor</h1>
          <p className="text-sm text-neutral-500 mt-1">서울리빙디자인페어 2026 참가업체를 확인하세요</p>
        </div>

        {/* Search & Filter */}
        <div className="card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                className="input pl-9"
                placeholder="업체명 또는 부스 번호로 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap gap-2 mt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  selectedCategory === cat
                    ? 'bg-admin-primary-700 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-neutral-400 mb-4">{filtered.length}개 업체</p>

        {/* Exhibitor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exhibitor) => (
            <div
              key={exhibitor.id}
              className="card p-5 hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-neutral-400">
                    {exhibitor.name.charAt(0)}
                  </span>
                </div>
                <Badge variant="status" color="neutral">
                  {exhibitor.booth}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-neutral-950 mb-1">{exhibitor.name}</h3>
              <p className="text-xs text-neutral-500 mb-2">{exhibitor.description}</p>
              <Badge variant="status" color="primary">
                {exhibitor.category}
              </Badge>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="text-sm text-neutral-400">검색 결과가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  )
}

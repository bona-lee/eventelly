'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function EventSignupPage() {
  const params = useParams()
  const router = useRouter()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  const [step, setStep] = useState<'email' | 'form'>('email')
  const [showExistingAccount, setShowExistingAccount] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    passwordConfirm: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate checking existing account
    setShowExistingAccount(true)
  }

  const handleGoToLogin = () => {
    router.push(`${basePath}/login`)
  }

  const handleContinueSignup = () => {
    setShowExistingAccount(false)
    setStep('form')
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`${basePath}/mypage`)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary-500 to-brand-primary-700 flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-lg font-bold">E</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-950 mb-2">회원가입</h1>
          <p className="text-sm text-neutral-500">서울리빙디자인페어 2026 참가를 위해 가입해 주세요</p>
        </div>

        {/* Step 1: Email */}
        {step === 'email' && (
          <div className="card p-6">
            <form onSubmit={handleEmailNext} className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="label">이메일 <span className="text-form-required">*</span></label>
                <input
                  id="signup-email"
                  type="email"
                  className="input"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary w-full py-3">
                Next
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-neutral-200" />
              <span className="text-xs text-neutral-400">또는</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div className="text-center">
              <p className="text-sm text-neutral-500">
                이미 계정이 있으신가요?{' '}
                <Link
                  href={`${basePath}/login`}
                  className="text-admin-primary-700 font-semibold hover:text-admin-primary-800 transition-colors"
                >
                  로그인
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Full Form */}
        {step === 'form' && (
          <div className="card p-6">
            {/* Email display */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-neutral-950 truncate">{form.email}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep('email')}
                className="text-xs text-neutral-400 hover:text-neutral-600 flex-shrink-0"
              >
                변경
              </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="label">이름 <span className="text-form-required">*</span></label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="홍길동"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">연락처 <span className="text-form-required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  className="input"
                  placeholder="010-1234-5678"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="label">소속 / 회사</label>
                <input
                  id="company"
                  type="text"
                  className="input"
                  placeholder="회사명 또는 소속 (선택)"
                  value={form.company}
                  onChange={(e) => updateField('company', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="label">비밀번호 <span className="text-form-required">*</span></label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    className="input pr-10"
                    placeholder="8자 이상 입력하세요"
                    value={form.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-password-confirm" className="label">비밀번호 확인 <span className="text-form-required">*</span></label>
                <input
                  id="signup-password-confirm"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={form.passwordConfirm}
                  onChange={(e) => updateField('passwordConfirm', e.target.value)}
                  minLength={8}
                  required
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  id="agree"
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-admin-primary-700 focus:ring-admin-primary-500"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="agree" className="text-sm text-neutral-500 leading-snug">
                  <span className="text-admin-primary-700 font-medium cursor-pointer hover:underline">개인정보 처리방침</span>
                  {' '}및{' '}
                  <span className="text-admin-primary-700 font-medium cursor-pointer hover:underline">이용약관</span>
                  에 동의합니다.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3 mt-2"
                disabled={!agreed}
              >
                가입하기
              </button>
            </form>
          </div>
        )}

        {/* Back to event */}
        <div className="text-center mt-6">
          <Link
            href={basePath}
            className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            이벤트 페이지로 돌아가기
          </Link>
        </div>
      </div>

      {/* Existing Account Alert Modal */}
      {showExistingAccount && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowExistingAccount(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-4">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-neutral-950 text-center mb-2">기존 가입 이력 확인</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed mb-6">
              과거에 디자인하우스 워크스페이스의 &lsquo;서울 디자인 페스티벌 2026&rsquo;에서 가입한 이력이 있습니다. 이 계정으로 로그인하시겠습니까?
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoToLogin}
                className="btn btn-primary w-full py-2.5"
              >
                로그인하기
              </button>
              <button
                type="button"
                onClick={handleContinueSignup}
                className="btn btn-ghost w-full py-2.5 text-neutral-500"
              >
                새 계정으로 계속 가입
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

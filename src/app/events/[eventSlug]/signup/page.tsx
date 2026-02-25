'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface ExistingAccount {
  primaryEvent: string
  otherEvents: string[]
}

// Simulated lookup for existing accounts
const EXISTING_ACCOUNTS: Record<string, ExistingAccount> = {
  'bona@micehub.com': {
    primaryEvent: 'SDF 2025',
    otherEvents: [
      'Korea Living Fair 2025',
      'MICE Expo Seoul 2025',
      'Design House Summer Exhibition 2024',
    ],
  },
}

export default function EventSignupPage() {
  const params = useParams()
  const router = useRouter()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  const [step, setStep] = useState<'email' | 'form'>('email')
  const [existingAccount, setExistingAccount] = useState<ExistingAccount | null>(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [termsModal, setTermsModal] = useState<'privacy' | 'terms' | null>(null)
  const [showSignupComplete, setShowSignupComplete] = useState(false)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEmailNext = (e: React.FormEvent) => {
    e.preventDefault()
    const match = EXISTING_ACCOUNTS[form.email.toLowerCase()]
    if (match) {
      setExistingAccount(match)
    } else {
      setStep('form')
    }
  }

  const handleGoToLogin = () => {
    router.push(`${basePath}/signin`)
  }

  const handleContinueNewAccount = () => {
    setExistingAccount(null)
    setStep('form')
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual signup logic
    setShowSignupComplete(true)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-950 mb-2">Create Account</h1>
          <p className="text-sm text-neutral-500">Create a Design House account to join events</p>
        </div>

        {/* Step 1: Email */}
        {step === 'email' && (
          <div className="card p-6">
            <form onSubmit={handleEmailNext} className="space-y-4">
              <div>
                <label htmlFor="signup-email" className="label">Email <span className="text-form-required">*</span></label>
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
              <span className="text-xs text-neutral-400">or</span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <div className="text-center">
              <p className="text-sm text-neutral-500">
                Already have an account?{' '}
                <Link
                  href={`${basePath}/signin`}
                  className="text-admin-primary-700 font-semibold hover:text-admin-primary-800 transition-colors"
                >
                  Sign In
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
                Change
              </button>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="name" className="label">Name <span className="text-form-required">*</span></label>
                <input
                  id="name"
                  type="text"
                  className="input"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">Phone <span className="text-form-required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  className="input"
                  placeholder="+82-10-1234-5678"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="signup-password" className="label">Password <span className="text-form-required">*</span></label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    className="input pr-10"
                    placeholder="Enter your password"
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
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">8–20 characters</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">Letters</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">Numbers</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-500">Special characters</span>
                </div>
              </div>

              <div>
                <label htmlFor="signup-password-confirm" className="label">Confirm Password <span className="text-form-required">*</span></label>
                <input
                  id="signup-password-confirm"
                  type={showPassword ? 'text' : 'password'}
                  className="input"
                  placeholder="Re-enter your password"
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
                  I agree to the{' '}
                  <button type="button" onClick={() => setTermsModal('privacy')} className="text-admin-primary-700 font-medium hover:underline">Privacy Policy</button>
                  {' '}and{' '}
                  <button type="button" onClick={() => setTermsModal('terms')} className="text-admin-primary-700 font-medium hover:underline">Terms of Service</button>.
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3 mt-2"
                disabled={!agreed}
              >
                Create Account
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Terms Modal */}
      {termsModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setTermsModal(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-neutral-950">
                {termsModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                onClick={() => setTermsModal(null)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="py-8 text-center">
              <p className="text-sm text-neutral-400">Coming soon</p>
            </div>
          </div>
        </div>
      )}

      {/* Signup Complete Modal */}
      {showSignupComplete && (
        <div className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-status-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-neutral-950 mb-2">Account Created</h3>
            <p className="text-sm text-neutral-500 leading-relaxed mb-6">
              You&apos;re now a Design House member. Join the event to get started.
            </p>
            <button
              onClick={() => router.push(`${basePath}/mypage`)}
              className="btn btn-primary w-full py-2.5"
            >
              Go to My Page
            </button>
          </div>
        </div>
      )}

      {/* Existing Account Modal */}
      {existingAccount && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setExistingAccount(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mx-auto mb-4">
              {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative icon */}
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold text-neutral-950 text-center mb-2">Existing Account Found</h3>
            <p className="text-sm text-neutral-500 text-center leading-relaxed mb-6">
              Found an account from <span className="font-medium text-neutral-700">{existingAccount.primaryEvent}</span>
              {existingAccount.otherEvents.length > 0 && (
                <>
                  {' and '}
                  <span className="relative inline-block group/tooltip">
                    <span className="font-medium text-neutral-700 cursor-default">
                      {existingAccount.otherEvents.length} other{existingAccount.otherEvents.length > 1 ? 's' : ''}
                    </span>
                    <span className="invisible opacity-0 group-hover/tooltip:visible group-hover/tooltip:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-neutral-800 text-white text-xs rounded-lg p-3 shadow-lg z-10">
                      <span className="block font-medium mb-1.5 text-neutral-300">Other events</span>
                      {existingAccount.otherEvents.map((event, i) => (
                        <span key={i} className="block py-0.5">{event}</span>
                      ))}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-neutral-800" />
                    </span>
                  </span>
                </>
              )}
              . Continue <span className="font-medium text-neutral-700">SLDF 2026</span> with your existing integrated account?
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoToLogin}
                className="btn btn-primary w-full py-2.5"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={handleContinueNewAccount}
                className="btn btn-ghost w-full py-2.5 text-neutral-500"
              >
                Continue with New Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

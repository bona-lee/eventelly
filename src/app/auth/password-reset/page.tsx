'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PasswordResetPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-10">
        <Image src="/blacklogo.png" alt="Eventelly" width={120} height={32} className="h-8 w-auto mx-auto mb-3" />
        <p className="text-neutral-500 text-sm">Reset your password</p>
      </div>

      {/* Reset Card */}
      <div className="card p-8">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-neutral-600">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="input"
                placeholder="you@example.com"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full py-2.5">
              Send reset link
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-admin-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-admin-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-950 mb-2">Check your email</h3>
            <p className="text-sm text-neutral-600">
              We&apos;ve sent a password reset link to <span className="font-medium">{email}</span>
            </p>
          </div>
        )}
      </div>

      {/* Back to login */}
      <p className="mt-8 text-center text-sm text-neutral-500">
        <Link href="/auth/login" className="text-admin-primary-700 hover:text-admin-primary-800 font-medium">
          Back to sign in
        </Link>
      </p>
    </div>
  )
}

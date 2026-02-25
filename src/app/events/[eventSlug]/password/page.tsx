'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function ResetPasswordPage() {
  const params = useParams()
  const eventSlug = params.eventSlug as string
  const basePath = `/events/${eventSlug}`

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual password reset logic
    setSent(true)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-neutral-50">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-950 mb-2">Reset Password</h1>
          <p className="text-sm text-neutral-500">Enter your email to receive a password reset link</p>
        </div>

        <div className="card p-6">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="resetEmail" className="label">Email</label>
                <input
                  id="resetEmail"
                  type="email"
                  className="input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3"
              >
                Send Reset Link
              </button>

              <Link
                href={`${basePath}/signin`}
                className="block w-full text-center text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-status-success-bg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-status-success-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-neutral-950 mb-2">Check Your Email</h3>
              <p className="text-sm text-neutral-500 mb-6">
                We&apos;ve sent a password reset link to <span className="font-medium text-neutral-700">{email}</span>
              </p>
              <Link
                href={`${basePath}/signin`}
                className="btn btn-secondary w-full"
              >
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

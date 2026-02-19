'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-10">
        <Image src="/blacklogo.png" alt="Eventelly" width={120} height={32} className="h-8 w-auto mx-auto mb-3" />
        <p className="text-neutral-500 text-sm">Create your account</p>
      </div>

      {/* Signup Card */}
      <div className="card p-8">
        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="label">Full name</label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              type="text"
              autoComplete="name"
              required
              className="input"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              autoComplete="email"
              required
              className="input"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              autoComplete="new-password"
              required
              className="input"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="label">Confirm password</label>
            <input
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              type="password"
              autoComplete="new-password"
              required
              className="input"
              placeholder="Confirm your password"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              checked={form.agreeTerms}
              onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
              type="checkbox"
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-admin-primary focus:ring-admin-primary"
              required
            />
            <span className="ml-2 text-sm text-neutral-600">
              I agree to the{' '}
              <Link href="/terms" className="text-admin-primary-700 hover:text-admin-primary-800 font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-admin-primary-700 hover:text-admin-primary-800 font-medium">
                Privacy Policy
              </Link>
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full py-2.5">
            Create account
          </button>
        </form>
      </div>

      {/* Sign in link */}
      <p className="mt-8 text-center text-sm text-neutral-500">
        Already have an account?
        <Link href="/auth/login" className="text-admin-primary-700 hover:text-admin-primary-800 font-medium ml-1">
          Sign in
        </Link>
      </p>
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function PasswordPage() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Change password
  }

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6 max-w-md">
          <div>
            <label htmlFor="currentPassword" className="label">Current password</label>
            <input
              id="currentPassword"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              type="password"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="label">New password</label>
            <input
              id="newPassword"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              type="password"
              className="input"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="label">Confirm new password</label>
            <input
              id="confirmPassword"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              type="password"
              className="input"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

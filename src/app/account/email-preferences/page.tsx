'use client'

import { useState } from 'react'

export default function EmailPreferencesPage() {
  const [preferences, setPreferences] = useState({
    productUpdates: true,
    weeklyDigest: false,
    promotions: false,
    eventReminders: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save email preferences
  }

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.productUpdates}
              onChange={(e) => setPreferences({ ...preferences, productUpdates: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-admin-primary focus:ring-admin-primary"
            />
            <div>
              <p className="text-sm font-medium text-neutral-950">Product updates</p>
              <p className="text-sm text-neutral-500">Get notified about new features and improvements</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.weeklyDigest}
              onChange={(e) => setPreferences({ ...preferences, weeklyDigest: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-admin-primary focus:ring-admin-primary"
            />
            <div>
              <p className="text-sm font-medium text-neutral-950">Weekly digest</p>
              <p className="text-sm text-neutral-500">Receive a weekly summary of your workspace activity</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.promotions}
              onChange={(e) => setPreferences({ ...preferences, promotions: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-admin-primary focus:ring-admin-primary"
            />
            <div>
              <p className="text-sm font-medium text-neutral-950">Promotions</p>
              <p className="text-sm text-neutral-500">Special offers and promotional content</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.eventReminders}
              onChange={(e) => setPreferences({ ...preferences, eventReminders: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-admin-primary focus:ring-admin-primary"
            />
            <div>
              <p className="text-sm font-medium text-neutral-950">Event reminders</p>
              <p className="text-sm text-neutral-500">Get reminded about upcoming events in your workspaces</p>
            </div>
          </label>
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

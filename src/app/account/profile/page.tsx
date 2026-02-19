'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [profileForm, setProfileForm] = useState({
    name: 'Bona Lee',
    email: 'bona@micehub.com',
    phone: '+82 10-1234-5678',
    company: 'MICEHUB',
    position: 'Product Manager',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Save profile
  }

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="label">Full name</label>
            <input
              id="name"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              type="text"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              type="email"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="phone" className="label">Phone</label>
            <input
              id="phone"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              type="tel"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="company" className="label">Company</label>
            <input
              id="company"
              value={profileForm.company}
              onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
              type="text"
              className="input"
            />
          </div>
          <div>
            <label htmlFor="position" className="label">Position</label>
            <input
              id="position"
              value={profileForm.position}
              onChange={(e) => setProfileForm({ ...profileForm, position: e.target.value })}
              type="text"
              className="input"
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

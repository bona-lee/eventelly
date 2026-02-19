import DashboardHeader from '@/components/DashboardHeader'
import AccountSettingsTabs from '@/components/account/AccountSettingsTabs'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader />
      <main>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-neutral-950">Account Settings</h1>
            <p className="mt-1 text-sm text-neutral-500">Manage your account preferences</p>
          </div>
          <AccountSettingsTabs />
          <div className="mt-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

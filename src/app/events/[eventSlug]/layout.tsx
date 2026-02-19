import EventPublicHeader from '@/components/EventPublicHeader'

export default async function EventPublicLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ eventSlug: string }>
}) {
  const { eventSlug } = await params

  return (
    <div className="min-h-screen bg-white">
      <EventPublicHeader eventSlug={eventSlug} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

import EventHeader from '@/components/EventHeader'
import EventLevelNav from '@/components/EventLevelNav'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default async function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ workspaceId: string; eventId: string }>
}) {
  const { workspaceId, eventId } = await params

  return (
    <div className="fixed inset-0 bg-neutral-50 z-50">
      <EventHeader workspaceId={workspaceId} eventId={eventId} />
      <div className="flex pt-14 h-full">
        <EventLevelNav workspaceId={workspaceId} eventId={eventId} />
        <main className="flex-1 ml-60 py-5 pl-5 pr-6 overflow-auto">
          <Breadcrumb workspaceId={workspaceId} eventId={eventId} />
          {children}
        </main>
      </div>
    </div>
  )
}

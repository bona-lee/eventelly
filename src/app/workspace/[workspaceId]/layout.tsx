import WorkspaceHeader from '@/components/WorkspaceHeader'
import WorkspaceLevelNav from '@/components/WorkspaceLevelNav'
import Breadcrumb from '@/components/navigation/Breadcrumb'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ workspaceId: string }>
}) {
  const { workspaceId } = await params

  return (
    <div className="min-h-screen bg-neutral-50">
      <WorkspaceHeader workspaceId={workspaceId} />
      <div className="flex pt-14">
        <WorkspaceLevelNav workspaceId={workspaceId} />
        <main className="flex-1 ml-60 p-8">
          <Breadcrumb workspaceId={workspaceId} />
          {children}
        </main>
      </div>
    </div>
  )
}

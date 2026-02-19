export default function ExtraFormSubmissionsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">All Submissions</h1>
        <p className="mt-1 text-sm text-neutral-500">View and manage all extra form submissions</p>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-sm font-medium text-neutral-950 mb-1">No submissions yet</h3>
          <p className="text-sm text-neutral-500">Extra form submissions will appear here once participants submit their forms.</p>
        </div>
      </div>
    </div>
  )
}

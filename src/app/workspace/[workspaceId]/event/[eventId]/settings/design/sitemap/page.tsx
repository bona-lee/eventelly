export default function SitemapPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">Sitemap</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage the sitemap structure for your event website</p>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <h3 className="text-sm font-medium text-neutral-950 mb-1">Sitemap configuration</h3>
          <p className="text-sm text-neutral-500">Configure the page hierarchy and navigation structure of your event site.</p>
        </div>
      </div>
    </div>
  )
}

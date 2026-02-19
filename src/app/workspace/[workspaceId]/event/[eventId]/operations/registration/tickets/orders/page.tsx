export default function ExhibitionTicketPage() {
  const tickets = [
    { id: 1, name: 'General Admission', price: 'Free', sold: 8500, limit: 'Unlimited' },
    { id: 2, name: 'VIP Pass', price: '$50', sold: 245, limit: '500' },
    { id: 3, name: 'Business Pass', price: '$100', sold: 128, limit: '300' },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950">Exhibition Tickets</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage ticket types for the exhibition</p>
        </div>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="card p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-neutral-950">{ticket.name}</h3>
                <p className="text-2xl font-bold text-admin-primary-700 mt-1">{ticket.price}</p>
              </div>
              <button className="text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-500">Sold</span>
                <span className="font-medium text-neutral-950">{ticket.sold.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Limit</span>
                <span className="font-medium text-neutral-950">{ticket.limit}</span>
              </div>
            </div>
            <button className="mt-4 w-full btn btn-secondary text-sm">
              Edit Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

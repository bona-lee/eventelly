'use client'

import { useState, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

interface TermsDocument {
  id: string
  type: 'terms_of_service' | 'privacy_policy'
  title: string
  content: string
  version: string
  isActive: boolean
  lastUpdated: string
  createdAt: string
}

// Simple Markdown Editor Component
function MarkdownEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')

  const insertMarkdown = useCallback((before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }, [value, onChange])

  const handleBold = () => insertMarkdown('**', '**')
  const handleItalic = () => insertMarkdown('*', '*')
  const handleHeading1 = () => insertMarkdown('# ')
  const handleHeading2 = () => insertMarkdown('## ')
  const handleHeading3 = () => insertMarkdown('### ')
  const handleBulletList = () => insertMarkdown('- ')
  const handleNumberedList = () => insertMarkdown('1. ')
  const handleLink = () => insertMarkdown('[', '](url)')
  const handleQuote = () => insertMarkdown('> ')
  const handleHorizontalRule = () => insertMarkdown('\n---\n')

  // Simple markdown to HTML converter
  const renderMarkdown = (text: string) => {
    let html = text
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
      // Bold and Italic
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-admin-primary-700 underline">$1</a>')
      // Bullet lists
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      // Blockquotes
      .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-neutral-300 pl-4 italic text-neutral-600">$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gm, '<hr class="my-4 border-neutral-200" />')
      // Line breaks
      .replace(/\n/g, '<br />')

    return html
  }

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={handleBold}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Bold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
              <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
            </svg>
          </button>
          <button
            onClick={handleItalic}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Italic"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="19" y1="4" x2="10" y2="4" />
              <line x1="14" y1="20" x2="5" y2="20" />
              <line x1="15" y1="4" x2="9" y2="20" />
            </svg>
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            onClick={handleHeading1}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 1"
          >
            H1
          </button>
          <button
            onClick={handleHeading2}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 2"
          >
            H2
          </button>
          <button
            onClick={handleHeading3}
            className="px-1.5 py-1 text-xs font-bold text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Heading 3"
          >
            H3
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            onClick={handleBulletList}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Bullet List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <circle cx="4" cy="6" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="4" cy="18" r="1" fill="currentColor" />
            </svg>
          </button>
          <button
            onClick={handleNumberedList}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Numbered List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <text x="3" y="8" fontSize="8" fill="currentColor">1</text>
              <text x="3" y="14" fontSize="8" fill="currentColor">2</text>
              <text x="3" y="20" fontSize="8" fill="currentColor">3</text>
            </svg>
          </button>
          <div className="w-px h-5 bg-neutral-300 mx-1" />
          <button
            onClick={handleLink}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Link"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button
            onClick={handleQuote}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Quote"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" />
            </svg>
          </button>
          <button
            onClick={handleHorizontalRule}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200 rounded transition-colors"
            title="Horizontal Rule"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </button>
        </div>

        {/* Write/Preview Tabs */}
        <div className="flex items-center bg-neutral-200 rounded-md p-0.5">
          <button
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'write'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      {activeTab === 'write' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[500px] p-4 text-sm text-neutral-950 font-mono resize-none focus:outline-none"
          placeholder="Write your content using Markdown..."
        />
      ) : (
        <div
          className="w-full h-[500px] p-4 overflow-y-auto text-sm text-neutral-950"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
        />
      )}
    </div>
  )
}

export default function TermsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const [activeTab, setActiveTab] = useState<'terms_of_service' | 'privacy_policy'>('terms_of_service')
  const [isEditing, setIsEditing] = useState(false)

  const [termsOfService, setTermsOfService] = useState<TermsDocument>({
    id: '1',
    type: 'terms_of_service',
    title: 'Terms of Service',
    content: `# Terms of Service

## 1. Acceptance of Terms

By accessing or using our services, you agree to be bound by these Terms of Service.

## 2. Description of Service

Our platform provides event management services including but not limited to:

- Event registration and ticketing
- Exhibitor management
- Visitor management
- Event analytics and reporting

## 3. User Accounts

You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

## 4. User Conduct

You agree not to:

- Violate any applicable laws or regulations
- Infringe upon the rights of others
- Submit false or misleading information
- Interfere with the proper functioning of the service

## 5. Intellectual Property

All content and materials available through our service are protected by intellectual property laws.

## 6. Limitation of Liability

We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.

## 7. Changes to Terms

We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

## 8. Contact

For questions about these Terms, please contact us.`,
    version: '1.0',
    isActive: true,
    lastUpdated: 'Jan 15, 2025',
    createdAt: 'Jan 1, 2025',
  })

  const [privacyPolicy, setPrivacyPolicy] = useState<TermsDocument>({
    id: '2',
    type: 'privacy_policy',
    title: 'Privacy Policy',
    content: `# Privacy Policy

## 1. Information We Collect

We collect information you provide directly:

- Name, email, phone number
- Company information
- Event participation data

We automatically collect:

- Device information
- Usage data
- Cookies and similar technologies

## 2. How We Use Your Information

We use collected information to:

- Provide and improve our services
- Process event registrations
- Send relevant communications
- Analyze service usage
- Ensure security and prevent fraud

## 3. Information Sharing

We may share your information with:

- Event organizers (for events you participate in)
- Service providers who assist our operations
- Legal authorities when required by law

## 4. Data Retention

We retain your information for as long as necessary to provide services and comply with legal obligations.

## 5. Your Rights

You have the right to:

- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Opt-out of marketing communications

## 6. Data Security

We implement appropriate security measures to protect your personal information.

## 7. International Transfers

Your information may be transferred to and processed in countries other than your own.

## 8. Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes.

## 9. Contact Us

For questions about this Privacy Policy, please contact our privacy team.`,
    version: '1.0',
    isActive: true,
    lastUpdated: 'Jan 15, 2025',
    createdAt: 'Jan 1, 2025',
  })

  const [editContent, setEditContent] = useState('')

  const currentDocument = activeTab === 'terms_of_service' ? termsOfService : privacyPolicy
  const setCurrentDocument = activeTab === 'terms_of_service' ? setTermsOfService : setPrivacyPolicy

  const handleEdit = () => {
    setEditContent(currentDocument.content)
    setIsEditing(true)
  }

  const handleSave = () => {
    const newVersion = (parseFloat(currentDocument.version) + 0.1).toFixed(1)
    setCurrentDocument(prev => ({
      ...prev,
      content: editContent,
      version: newVersion,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent('')
    setIsEditing(false)
  }

  // Simple markdown to HTML converter for preview
  const renderMarkdownPreview = (text: string) => {
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-5 mb-2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-3">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-admin-primary-700 underline">$1</a>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-neutral-300 pl-4 italic text-neutral-600">$1</blockquote>')
      .replace(/^---$/gm, '<hr class="my-4 border-neutral-200" />')
      .replace(/\n/g, '<br />')
    return html
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">Terms</h1>
        <p className="mt-1 text-sm text-neutral-500">Manage Terms of Service and Privacy Policy for your workspace</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <nav className="flex gap-8">
          <button
            onClick={() => { setActiveTab('terms_of_service'); setIsEditing(false); }}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'terms_of_service'
                ? 'border-admin-primary text-admin-primary-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => { setActiveTab('privacy_policy'); setIsEditing(false); }}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'privacy_policy'
                ? 'border-admin-primary text-admin-primary-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Privacy Policy
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Area */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Document Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-semibold text-neutral-950">{currentDocument.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">Version {currentDocument.version}</p>
              </div>
              {!isEditing ? (
                <button onClick={handleEdit} className="btn btn-secondary">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleCancel} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {isEditing ? (
                <MarkdownEditor
                  value={editContent}
                  onChange={setEditContent}
                />
              ) : (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(currentDocument.content) }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Document Info */}
          <div className="card p-4">
            <h4 className="text-sm font-semibold text-neutral-950 mb-4">Document Info</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Status</span>
                <Badge variant="status" color={currentDocument.isActive ? 'success' : 'neutral'}>
                  {currentDocument.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Version</span>
                <span className="text-sm font-medium text-neutral-950">{currentDocument.version}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Last Updated</span>
                <span className="text-sm text-neutral-950">{currentDocument.lastUpdated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-500">Created</span>
                <span className="text-sm text-neutral-950">{currentDocument.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div className="card p-4">
            <h4 className="text-sm font-semibold text-neutral-950 mb-4">Where It Appears</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <svg className="w-4 h-4 text-status-success-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Exhibitor Registration
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <svg className="w-4 h-4 text-status-success-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Visitor Registration
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <svg className="w-4 h-4 text-status-success-solid" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Event Sign-up Pages
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="card p-4 bg-status-warning-bg border-status-warning-border">
            <h4 className="text-sm font-semibold text-status-warning-text mb-2">Important</h4>
            <ul className="text-xs text-status-warning-text space-y-1.5">
              <li>Changes will affect all events in this workspace</li>
              <li>Users who already agreed will not be asked again unless the version changes significantly</li>
              <li>Keep a record of previous versions for compliance purposes</li>
            </ul>
          </div>

          {/* Markdown Help */}
          {isEditing && (
            <div className="card p-4 bg-status-info-bg border-status-info-border">
              <h4 className="text-sm font-semibold text-status-info-text mb-2">Markdown Tips</h4>
              <ul className="text-xs text-status-info-text space-y-1">
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded"># Heading 1</code></li>
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded">## Heading 2</code></li>
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded">**bold**</code></li>
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded">*italic*</code></li>
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded">- bullet point</code></li>
                {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative code snippet */}
                <li><code className="bg-blue-100 px-1 rounded">[link](url)</code></li>
              </ul>
            </div>
          )}

          {/* Version History */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-neutral-950">Version History</h4>
              <button className="text-xs text-admin-primary-700 hover:text-admin-primary-800 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-neutral-50">
                <div>
                  <p className="text-sm font-medium text-neutral-950">v{currentDocument.version}</p>
                  <p className="text-xs text-neutral-500">Current version</p>
                </div>
                <span className="text-xs text-neutral-500">{currentDocument.lastUpdated}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-neutral-500">v1.0</p>
                  <p className="text-xs text-neutral-400">Initial version</p>
                </div>
                <span className="text-xs text-neutral-400">{currentDocument.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

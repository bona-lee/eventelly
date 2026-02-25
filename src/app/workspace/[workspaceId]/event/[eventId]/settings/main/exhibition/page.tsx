'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

type TabType = 'process' | 'booths' | 'extras' | 'invoices'

export default function ExhibitionSettingsPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState<TabType>('process')

  const tabs = [
    { id: 'process' as TabType, label: 'Exhibitor Process' },
    { id: 'booths' as TabType, label: 'Booths' },
    { id: 'extras' as TabType, label: 'Extras' },
    { id: 'invoices' as TabType, label: 'Invoices' },
  ]

  return (
    <div className="">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-neutral-950">Exhibition Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Configure exhibitor registration and booth management</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-5">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-admin-primary-600 text-admin-primary-700'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'process' && <ExhibitorProcessTab />}
      {activeTab === 'booths' && <BoothsTab />}
      {activeTab === 'extras' && <ExtrasTab />}
      {activeTab === 'invoices' && <InvoicesTab />}
    </div>
  )
}

// Available modules for process steps
const AVAILABLE_MODULES = [
  { id: 'terms', name: 'Terms & Conditions', description: 'Accept terms and conditions', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'application', name: 'Application Form', description: 'Fill out application form', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'booth-selection', name: 'Booth Selection', description: 'Select booth from floor plan', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 'approval', name: 'Approval', description: 'Admin approval step', icon: 'M5 13l4 4L19 7' },
  { id: 'extras', name: 'Extras', description: 'Select additional items and services', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  { id: 'contract', name: 'Contract & Payment', description: 'Sign contract and process payment', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'company-profile', name: 'Company Profile', description: 'Complete company profile information', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { id: 'product-registration', name: 'Product Registration', description: 'Register products for directory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 'badge-info', name: 'Badge Information', description: 'Enter exhibitor badge details', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
  { id: 'custom', name: 'Custom Step', description: 'Custom step with no linked module', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
]

// Available terms (from another page)
const AVAILABLE_TERMS = [
  { id: 'privacy', name: 'Privacy Policy', required: true, lastModified: '2026-01-10' },
  { id: 'exhibition-rules', name: 'Exhibition Rules & Regulations', required: true, lastModified: '2026-01-08' },
  { id: 'payment-terms', name: 'Payment Terms', required: true, lastModified: '2025-12-20' },
  { id: 'cancellation', name: 'Cancellation & Refund Policy', required: false, lastModified: '2025-12-15' },
  { id: 'liability', name: 'Liability Waiver', required: false, lastModified: '2025-12-10' },
  { id: 'marketing', name: 'Marketing Consent', required: false, lastModified: '2025-12-01' },
]

interface SelectedTerm {
  id: string
  order: number
}

interface SelectedBooth {
  id: number
  useSelectiveDiscounts?: boolean
  discountIds: number[]
}

interface SelectedExtra {
  id: string
  order: number
  useConditionalVisibility?: boolean
  boothVisibility?: BoothVisibility[]
}

interface BoothVisibility {
  boothId: number
  visible: boolean
}

interface PaymentInstallment {
  type: 'down' | 'interim' | 'final'
  percentage: number
  dueDateType: 'fixed' | 'relative'
  fixedDate?: string
  relativeDays?: number
}

interface ContractSettings {
  installments: PaymentInstallment[]
  invoiceTemplateId?: string
  bankAccountId?: string
}

interface ProfileDisplaySettings {
  selectedFormFields: string[]
  selectedMemberFields: string[]
}

interface ProductSettings {
  productFormId?: string
  selectedDisplayFields: string[]
}

interface MultiLangPeriod {
  [langCode: string]: { start: string; end: string }
}

interface ProcessStep {
  id: string
  name: string
  description: string
  moduleId: string
  enabled: boolean
  selectedTerms?: SelectedTerm[]
  selectedFormId?: string
  selectedBooths?: SelectedBooth[]
  selectedExtras?: SelectedExtra[]
  contractSettings?: ContractSettings
  profileDisplaySettings?: ProfileDisplaySettings
  productSettings?: ProductSettings
  applicationPeriod?: MultiLangPeriod
  useCustomLangPeriod?: boolean
  maxProducts?: number
}

// Website languages (multi-language support)
const WEBSITE_LANGUAGES = [
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
]

// Available booth types (shared with BoothsTab)
const AVAILABLE_BOOTH_TYPES = [
  { id: 1, name: 'Standard Booth (3m x 3m)', type: 'shell-scheme' as const, price: 2500000 },
  { id: 2, name: 'Premium Booth (6m x 3m)', type: 'shell-scheme' as const, price: 4500000 },
  { id: 3, name: 'Corner Booth (6m x 6m)', type: 'shell-scheme' as const, price: 7000000 },
  { id: 4, name: 'Island Booth (9m x 9m)', type: 'raw-space' as const, price: 15000000 },
  { id: 5, name: 'Mini Booth (2m x 2m)', type: 'shell-scheme' as const, price: 1500000 },
  { id: 6, name: 'Raw Space (per sqm)', type: 'raw-space' as const, price: 350000 },
]

const AVAILABLE_DISCOUNTS = [
  { id: 1, name: 'Early Bird Discount', value: 10 },
  { id: 2, name: 'Returning Exhibitor', value: 5 },
  { id: 3, name: 'Multiple Booth Discount', value: 15 },
]

// Available extras categories (shared with ExtrasTab)
const AVAILABLE_EXTRAS_CATEGORIES = [
  { id: 'facilities', name: 'Facilities', type: 'quote' },
  { id: 'equipments', name: 'Equipments', type: 'quote' },
  { id: 'furnitures', name: 'Furnitures', type: 'quote' },
  { id: 'signboard', name: 'Signboard', type: 'form' },
  { id: 'passcards', name: 'Passcards', type: 'form' },
  { id: 'invitation-cards', name: 'Invitation Cards', type: 'form' },
  { id: 'constructions', name: 'Constructions', type: 'form' },
  { id: 'hazards', name: 'Hazards', type: 'form' },
  { id: 'weights', name: 'Weights', type: 'form' },
  { id: 'customs-bonds', name: 'Customs Bonds', type: 'form' },
]

// Available forms (from Form Builder)
const AVAILABLE_FORMS = [
  { id: 'form-1', name: 'Standard Exhibitor Form', description: 'Basic exhibitor application with company info and product details', fields: 12, lastModified: '2026-01-10', status: 'active', recommended: true },
  { id: 'form-2', name: 'International Exhibitor Form', description: 'Extended form with customs, shipping, and international requirements', fields: 15, lastModified: '2026-01-08', status: 'active', recommended: false },
  { id: 'form-3', name: 'Sponsor Application Form', description: 'Comprehensive form for sponsors with branding and package details', fields: 18, lastModified: '2025-12-20', status: 'draft', recommended: false },
  { id: 'form-4', name: 'Startup Exhibitor Form', description: 'Simplified form designed for startups and small businesses', fields: 8, lastModified: '2025-12-15', status: 'active', recommended: false },
  { id: 'form-5', name: 'VIP Exhibitor Form', description: 'Premium form with dedicated support options', fields: 14, lastModified: '2025-12-10', status: 'active', recommended: false },
  { id: 'form-6', name: 'Government Pavilion Form', description: 'Form for government and public sector exhibitors', fields: 20, lastModified: '2025-12-05', status: 'active', recommended: false },
  { id: 'form-7', name: 'Media Partner Form', description: 'Simplified form for media and press partners', fields: 6, lastModified: '2025-11-28', status: 'draft', recommended: false },
  { id: 'form-8', name: 'Association Member Form', description: 'Form for association and member organization exhibitors', fields: 10, lastModified: '2025-11-20', status: 'active', recommended: false },
]

// Available invoice templates (from Invoices tab)
const AVAILABLE_INVOICE_TEMPLATES = [
  { id: 'inv-1', name: 'Standard Invoice', description: 'Default invoice template for exhibitors', lastModified: '2026-01-12' },
  { id: 'inv-2', name: 'International Invoice', description: 'Invoice with multi-currency support', lastModified: '2026-01-10' },
  { id: 'inv-3', name: 'Sponsor Invoice', description: 'Detailed invoice for sponsors', lastModified: '2025-12-28' },
]

// Available bank accounts (from Invoices tab)
const AVAILABLE_BANK_ACCOUNTS = [
  { id: 'bank-1', bankName: 'Shinhan Bank', accountNumber: '110-xxx-xxxxxx', accountHolder: 'Design House Co., Ltd.', currency: 'KRW' },
  { id: 'bank-2', bankName: 'Kookmin Bank', accountNumber: '012-xx-xxxx-xxx', accountHolder: 'Design House Co., Ltd.', currency: 'KRW' },
  { id: 'bank-3', bankName: 'Citibank', accountNumber: '89xxxxxxxx', accountHolder: 'Design House Inc.', currency: 'USD' },
]

// Default payment installments
const DEFAULT_INSTALLMENTS: PaymentInstallment[] = [
  { type: 'down', percentage: 30, dueDateType: 'relative', relativeDays: 7 },
  { type: 'interim', percentage: 40, dueDateType: 'relative', relativeDays: 30 },
  { type: 'final', percentage: 30, dueDateType: 'fixed', fixedDate: '2026-03-01' },
]

// Application form fields (dynamic based on selected form)
const APPLICATION_FORM_FIELDS = [
  { id: 'company-name', name: 'Company Name', required: true },
  { id: 'business-number', name: 'Business Registration Number', required: true },
  { id: 'representative', name: 'Representative Name', required: true },
  { id: 'contact-phone', name: 'Contact Phone', required: true },
  { id: 'contact-email', name: 'Contact Email', required: true },
  { id: 'product-category', name: 'Product Category', required: true },
  { id: 'company-intro', name: 'Company Introduction', required: false },
  { id: 'company-logo', name: 'Company Logo', required: false },
  { id: 'website', name: 'Website URL', required: false },
  { id: 'address', name: 'Business Address', required: false },
]

// Member info fields (from workspace member data)
const MEMBER_INFO_FIELDS = [
  { id: 'member-name', name: 'Member Name', source: 'member' },
  { id: 'member-email', name: 'Email Address', source: 'member' },
  { id: 'member-phone', name: 'Phone Number', source: 'member' },
  { id: 'member-company', name: 'Company Name', source: 'member' },
  { id: 'member-position', name: 'Position/Title', source: 'member' },
  { id: 'member-department', name: 'Department', source: 'member' },
]

// Product registration forms
const AVAILABLE_PRODUCT_FORMS = [
  { id: 'product-form-1', name: 'Standard Product Form', description: 'Balanced form with essential product info and images', fields: 8, lastModified: '2026-01-10', status: 'active', recommended: true },
  { id: 'product-form-2', name: 'Detailed Product Form', description: 'Comprehensive form with specs, variants, and certifications', fields: 15, lastModified: '2026-01-08', status: 'active', recommended: false },
  { id: 'product-form-3', name: 'Simple Product Form', description: 'Minimal form with just name, category, and image', fields: 5, lastModified: '2025-12-20', status: 'draft', recommended: false },
  { id: 'product-form-4', name: 'Food & Beverage Product Form', description: 'Includes nutritional info and certifications', fields: 12, lastModified: '2025-12-15', status: 'active', recommended: false },
  { id: 'product-form-5', name: 'Tech Product Form', description: 'Technical specifications and compatibility info', fields: 14, lastModified: '2025-12-10', status: 'active', recommended: false },
  { id: 'product-form-6', name: 'Fashion Product Form', description: 'Size, material, and style attributes', fields: 10, lastModified: '2025-12-05', status: 'active', recommended: false },
]

// Product form fields (for display selection)
const PRODUCT_FORM_FIELDS = [
  { id: 'product-name', name: 'Product Name', required: true },
  { id: 'product-category', name: 'Product Category', required: true },
  { id: 'product-description', name: 'Product Description', required: false },
  { id: 'product-image', name: 'Product Image', required: true },
  { id: 'product-price', name: 'Product Price', required: false },
  { id: 'product-spec', name: 'Specifications', required: false },
  { id: 'product-brand', name: 'Brand', required: false },
  { id: 'product-model', name: 'Model Number', required: false },
]

interface Process {
  id: string
  name: string
  isDefault: boolean
  steps: ProcessStep[]
}

function ExhibitorProcessTab() {
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: 'default',
      name: 'Default Process',
      isDefault: true,
      steps: [
        { id: '1', name: 'Terms & Conditions', description: 'Accept terms and conditions', moduleId: 'terms', enabled: true, selectedTerms: [{ id: 'privacy', order: 1 }, { id: 'exhibition-rules', order: 2 }, { id: 'payment-terms', order: 3 }] },
        { id: '2', name: 'Application', description: 'Fill out application form', moduleId: 'application', enabled: true, selectedFormId: 'form-1', applicationPeriod: { ko: { start: '2025-10-01', end: '2026-01-15' }, en: { start: '2025-10-01', end: '2026-01-15' } } },
        { id: '3', name: 'Booth Selection', description: 'Select booth from floor plan', moduleId: 'booth-selection', enabled: true, selectedBooths: [{ id: 1, discountIds: [1, 2] }, { id: 2, discountIds: [1, 2] }, { id: 4, discountIds: [1] }, { id: 6, discountIds: [] }], applicationPeriod: { ko: { start: '2025-10-01', end: '2026-02-01' }, en: { start: '2025-10-01', end: '2026-02-01' } } },
        { id: '4', name: 'Approval', description: 'Admin approval step', moduleId: 'approval', enabled: true },
        { id: '5', name: 'Extras', description: 'Select additional items and services', moduleId: 'extras', enabled: true, selectedExtras: [
          { id: 'facilities', order: 1 },
          { id: 'equipments', order: 2 },
          { id: 'furnitures', order: 3 },
          { id: 'constructions', order: 4, useConditionalVisibility: true, boothVisibility: [{ boothId: 4, visible: true }, { boothId: 6, visible: true }, { boothId: 1, visible: false }, { boothId: 2, visible: false }] },
          { id: 'signboard', order: 5 },
          { id: 'passcards', order: 6 },
        ] },
        { id: '6', name: 'Contract & Payment', description: 'Sign contract and process payment', moduleId: 'contract', enabled: true, contractSettings: { installments: [{ type: 'down', percentage: 30, dueDateType: 'relative', relativeDays: 7 }, { type: 'interim', percentage: 40, dueDateType: 'relative', relativeDays: 30 }, { type: 'final', percentage: 30, dueDateType: 'fixed', fixedDate: '2026-03-01' }], invoiceTemplateId: 'inv-1', bankAccountId: 'bank-1' } },
        { id: '7', name: 'Products', description: 'Register products for directory', moduleId: 'product-registration', enabled: true, productSettings: { productFormId: 'product-form-1', selectedDisplayFields: ['product-name', 'product-category', 'product-image', 'product-description'] }, applicationPeriod: { ko: { start: '2025-12-01', end: '2026-03-15' }, en: { start: '2025-12-01', end: '2026-03-15' } }, maxProducts: 20 },
        { id: '8', name: 'Company Profile', description: 'Display company profile information', moduleId: 'company-profile', enabled: true, profileDisplaySettings: { selectedFormFields: ['company-name', 'company-intro', 'company-logo', 'website'], selectedMemberFields: ['member-email', 'member-phone'] } },
      ],
    },
    {
      id: 'simple',
      name: 'Simple Process',
      isDefault: false,
      steps: [
        { id: '1', name: 'Terms & Conditions', description: 'Accept terms and conditions', moduleId: 'terms', enabled: true, selectedTerms: [{ id: 'privacy', order: 1 }] },
        { id: '2', name: 'Application', description: 'Fill out application form', moduleId: 'application', enabled: true, selectedFormId: 'form-4' },
        { id: '3', name: 'Payment', description: 'Process payment', moduleId: 'contract', enabled: true },
      ],
    },
  ])

  const [selectedProcessId, setSelectedProcessId] = useState('default')
  const [isAddingProcess, setIsAddingProcess] = useState(false)
  const [newProcessName, setNewProcessName] = useState('')

  // Add Step Modal
  const [isAddStepModalOpen, setIsAddStepModalOpen] = useState(false)
  const [newStepName, setNewStepName] = useState('')
  const [newStepDescription, setNewStepDescription] = useState('')
  const [newStepModuleId, setNewStepModuleId] = useState('')
  const [newStepTerms, setNewStepTerms] = useState<SelectedTerm[]>([])

  // Edit Step Slide Panel
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false)
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null)
  const [editStepName, setEditStepName] = useState('')
  const [editStepDescription, setEditStepDescription] = useState('')
  const [editStepTerms, setEditStepTerms] = useState<SelectedTerm[]>([])
  const [editStepFormId, setEditStepFormId] = useState('')
  const [editStepBooths, setEditStepBooths] = useState<SelectedBooth[]>([])
  const [editStepExtras, setEditStepExtras] = useState<SelectedExtra[]>([])
  const [editStepContractSettings, setEditStepContractSettings] = useState<ContractSettings>({
    installments: DEFAULT_INSTALLMENTS,
    invoiceTemplateId: '',
    bankAccountId: ''
  })
  const [editStepProfileSettings, setEditStepProfileSettings] = useState<ProfileDisplaySettings>({
    selectedFormFields: [],
    selectedMemberFields: []
  })
  const [editStepProductSettings, setEditStepProductSettings] = useState<ProductSettings>({
    productFormId: '',
    selectedDisplayFields: []
  })
  const [editStepApplicationPeriod, setEditStepApplicationPeriod] = useState<MultiLangPeriod>({})
  const [editStepUseCustomLangPeriod, setEditStepUseCustomLangPeriod] = useState(false)
  const [editStepMaxProducts, setEditStepMaxProducts] = useState<number>(10)

  // Form Preview & Builder Popups
  const [isFormPreviewOpen, setIsFormPreviewOpen] = useState(false)
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false)
  const [isProductFormPreviewOpen, setIsProductFormPreviewOpen] = useState(false)
  const [isProductFormBuilderOpen, setIsProductFormBuilderOpen] = useState(false)
  const [isInvoicePreviewOpen, setIsInvoicePreviewOpen] = useState(false)
  const [isInvoiceBuilderOpen, setIsInvoiceBuilderOpen] = useState(false)

  // Layout Builder Modals
  const [isProductLayoutBuilderOpen, setIsProductLayoutBuilderOpen] = useState(false)
  const [isProfileLayoutBuilderOpen, setIsProfileLayoutBuilderOpen] = useState(false)
  const [draggedField, setDraggedField] = useState<string | null>(null)
  const [productLayoutMode, setProductLayoutMode] = useState<'edit' | 'preview'>('edit')
  const [profileLayoutMode, setProfileLayoutMode] = useState<'edit' | 'preview'>('edit')

  const selectedProcess = processes.find(p => p.id === selectedProcessId)

  // Get the selected booths from the booth-selection step in the current process
  const processSelectedBooths = selectedProcess?.steps
    .find(s => s.moduleId === 'booth-selection')?.selectedBooths || []

  const moveStep = (index: number, direction: 'up' | 'down') => {
    if (!selectedProcess) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= selectedProcess.steps.length) return

    setProcesses(procs => procs.map(p => {
      if (p.id !== selectedProcessId) return p
      const newSteps = [...p.steps]
      ;[newSteps[index], newSteps[newIndex]] = [newSteps[newIndex], newSteps[index]]
      return { ...p, steps: newSteps }
    }))
  }

  const toggleStep = (stepId: string) => {
    setProcesses(procs => procs.map(p => {
      if (p.id !== selectedProcessId) return p
      return {
        ...p,
        steps: p.steps.map(s => s.id === stepId ? { ...s, enabled: !s.enabled } : s)
      }
    }))
  }

  const deleteStep = (stepId: string) => {
    if (confirm('Are you sure you want to delete this step?')) {
      setProcesses(procs => procs.map(p => {
        if (p.id !== selectedProcessId) return p
        return { ...p, steps: p.steps.filter(s => s.id !== stepId) }
      }))
    }
  }

  const openAddStepModal = () => {
    setNewStepName('')
    setNewStepDescription('')
    setNewStepModuleId('')
    setNewStepTerms([])
    setIsAddStepModalOpen(true)
  }

  const handleModuleSelect = (moduleId: string) => {
    const mod = AVAILABLE_MODULES.find(m => m.id === moduleId)
    if (mod) {
      setNewStepModuleId(moduleId)
      if (!newStepName) setNewStepName(mod.name)
      if (!newStepDescription) setNewStepDescription(mod.description)
      if (moduleId !== 'terms') setNewStepTerms([])
    }
  }

  const toggleNewStepTerm = (termId: string) => {
    const existing = newStepTerms.find(t => t.id === termId)
    if (existing) {
      setNewStepTerms(newStepTerms.filter(t => t.id !== termId))
    } else {
      setNewStepTerms([...newStepTerms, { id: termId, order: newStepTerms.length + 1 }])
    }
  }

  const moveTermOrder = (termId: string, direction: 'up' | 'down') => {
    const index = newStepTerms.findIndex(t => t.id === termId)
    if (index === -1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= newStepTerms.length) return
    const updated = [...newStepTerms]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setNewStepTerms(updated.map((t, i) => ({ ...t, order: i + 1 })))
  }

  const addStep = () => {
    if (!newStepName.trim() || !newStepModuleId) return
    if (newStepModuleId === 'terms' && newStepTerms.length === 0) return
    setProcesses(procs => procs.map(p => {
      if (p.id !== selectedProcessId) return p
      return {
        ...p,
        steps: [...p.steps, {
          id: Date.now().toString(),
          name: newStepName,
          description: newStepDescription || 'Step description',
          moduleId: newStepModuleId,
          enabled: true,
          selectedTerms: newStepModuleId === 'terms' ? newStepTerms : undefined
        }]
      }
    }))
    setIsAddStepModalOpen(false)
  }

  const openEditPanel = (step: ProcessStep) => {
    setEditingStep(step)
    setEditStepName(step.name)
    setEditStepDescription(step.description)
    setEditStepTerms(step.selectedTerms || [])
    setEditStepFormId(step.selectedFormId || '')
    setEditStepBooths(step.selectedBooths || [])
    setEditStepExtras(step.selectedExtras || [])
    setEditStepContractSettings(step.contractSettings || {
      installments: DEFAULT_INSTALLMENTS,
      invoiceTemplateId: '',
      bankAccountId: ''
    })
    setEditStepProfileSettings(step.profileDisplaySettings || {
      selectedFormFields: [],
      selectedMemberFields: []
    })
    setEditStepProductSettings(step.productSettings || {
      productFormId: '',
      selectedDisplayFields: []
    })
    setEditStepApplicationPeriod(step.applicationPeriod || {})
    setEditStepUseCustomLangPeriod(step.useCustomLangPeriod || false)
    setEditStepMaxProducts(step.maxProducts || 10)
    setIsEditPanelOpen(true)
  }

  const toggleEditStepTerm = (termId: string) => {
    const existing = editStepTerms.find(t => t.id === termId)
    if (existing) {
      setEditStepTerms(editStepTerms.filter(t => t.id !== termId))
    } else {
      setEditStepTerms([...editStepTerms, { id: termId, order: editStepTerms.length + 1 }])
    }
  }

  const moveEditTermOrder = (termId: string, direction: 'up' | 'down') => {
    const index = editStepTerms.findIndex(t => t.id === termId)
    if (index === -1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= editStepTerms.length) return
    const updated = [...editStepTerms]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setEditStepTerms(updated.map((t, i) => ({ ...t, order: i + 1 })))
  }

  // Booth selection helpers
  const toggleEditBooth = (boothId: number) => {
    const existing = editStepBooths.find(b => b.id === boothId)
    if (existing) {
      setEditStepBooths(editStepBooths.filter(b => b.id !== boothId))
    } else {
      setEditStepBooths([...editStepBooths, { id: boothId, discountIds: [] }])
    }
  }

  const toggleBoothDiscount = (boothId: number, discountId: number) => {
    setEditStepBooths(editStepBooths.map(b => {
      if (b.id !== boothId) return b
      const hasDiscount = b.discountIds.includes(discountId)
      return {
        ...b,
        discountIds: hasDiscount
          ? b.discountIds.filter(d => d !== discountId)
          : [...b.discountIds, discountId]
      }
    }))
  }

  const toggleBoothSelectiveDiscounts = (boothId: number) => {
    setEditStepBooths(editStepBooths.map(b => {
      if (b.id !== boothId) return b
      return {
        ...b,
        useSelectiveDiscounts: !b.useSelectiveDiscounts,
        // When turning on selective mode, start with all discounts selected
        discountIds: !b.useSelectiveDiscounts
          ? AVAILABLE_DISCOUNTS.map(d => d.id)
          : b.discountIds
      }
    }))
  }

  const getBoothHasDiscount = (boothId: number, discountId: number): boolean => {
    const booth = editStepBooths.find(b => b.id === boothId)
    if (!booth) return false
    // If not using selective discounts, all discounts apply
    if (!booth.useSelectiveDiscounts) return true
    return booth.discountIds.includes(discountId)
  }

  // Extras selection helpers
  const toggleEditExtra = (extraId: string) => {
    const existing = editStepExtras.find(e => e.id === extraId)
    if (existing) {
      setEditStepExtras(editStepExtras.filter(e => e.id !== extraId).map((e, i) => ({ ...e, order: i + 1 })))
    } else {
      setEditStepExtras([...editStepExtras, { id: extraId, order: editStepExtras.length + 1 }])
    }
  }

  const moveEditExtraOrder = (extraId: string, direction: 'up' | 'down') => {
    const index = editStepExtras.findIndex(e => e.id === extraId)
    if (index === -1) return
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= editStepExtras.length) return
    const updated = [...editStepExtras]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    setEditStepExtras(updated.map((e, i) => ({ ...e, order: i + 1 })))
  }

  const toggleExtraConditionalVisibility = (extraId: string) => {
    setEditStepExtras(editStepExtras.map(e => {
      if (e.id !== extraId) return e
      return {
        ...e,
        useConditionalVisibility: !e.useConditionalVisibility,
        // Initialize boothVisibility with all booths visible when turning on
        boothVisibility: !e.useConditionalVisibility
          ? processSelectedBooths.map(b => ({ boothId: b.id, visible: true }))
          : e.boothVisibility
      }
    }))
  }

  const toggleBoothVisibility = (extraId: string, boothId: number) => {
    setEditStepExtras(editStepExtras.map(e => {
      if (e.id !== extraId) return e
      const currentVisibility = e.boothVisibility || []
      const existing = currentVisibility.find(bv => bv.boothId === boothId)

      if (existing) {
        return {
          ...e,
          boothVisibility: currentVisibility.map(bv =>
            bv.boothId === boothId ? { ...bv, visible: !bv.visible } : bv
          )
        }
      } else {
        return {
          ...e,
          boothVisibility: [...currentVisibility, { boothId, visible: false }]
        }
      }
    }))
  }

  const getBoothVisibility = (extraId: string, boothId: number): boolean => {
    const extra = editStepExtras.find(e => e.id === extraId)
    if (!extra?.boothVisibility) return true // Default to visible
    const visibility = extra.boothVisibility.find(bv => bv.boothId === boothId)
    return visibility?.visible ?? true
  }

  const saveEditStep = () => {
    if (!editingStep || !editStepName.trim()) return
    if (editingStep.moduleId === 'terms' && editStepTerms.length === 0) return
    if (editingStep.moduleId === 'application' && !editStepFormId) return
    if (editingStep.moduleId === 'booth-selection' && editStepBooths.length === 0) return
    if (editingStep.moduleId === 'extras' && editStepExtras.length === 0) return
    if (editingStep.moduleId === 'contract' && (!editStepContractSettings.invoiceTemplateId || !editStepContractSettings.bankAccountId)) return
    if (editingStep.moduleId === 'product-registration' && (!editStepProductSettings.productFormId || editStepProductSettings.selectedDisplayFields.length === 0)) return
    if (editingStep.moduleId === 'company-profile' && (editStepProfileSettings.selectedFormFields.length === 0 && editStepProfileSettings.selectedMemberFields.length === 0)) return
    setProcesses(procs => procs.map(p => {
      if (p.id !== selectedProcessId) return p
      return {
        ...p,
        steps: p.steps.map(s => s.id === editingStep.id ? {
          ...s,
          name: editStepName,
          description: editStepDescription,
          selectedTerms: editingStep.moduleId === 'terms' ? editStepTerms : s.selectedTerms,
          selectedFormId: editingStep.moduleId === 'application' ? editStepFormId : s.selectedFormId,
          selectedBooths: editingStep.moduleId === 'booth-selection' ? editStepBooths : s.selectedBooths,
          selectedExtras: editingStep.moduleId === 'extras' ? editStepExtras : s.selectedExtras,
          contractSettings: editingStep.moduleId === 'contract' ? editStepContractSettings : s.contractSettings,
          profileDisplaySettings: editingStep.moduleId === 'company-profile' ? editStepProfileSettings : s.profileDisplaySettings,
          productSettings: editingStep.moduleId === 'product-registration' ? editStepProductSettings : s.productSettings,
          applicationPeriod: ['application', 'booth-selection', 'product-registration'].includes(editingStep.moduleId) ? editStepApplicationPeriod : s.applicationPeriod,
          useCustomLangPeriod: ['application', 'booth-selection', 'product-registration'].includes(editingStep.moduleId) ? editStepUseCustomLangPeriod : s.useCustomLangPeriod,
          maxProducts: editingStep.moduleId === 'product-registration' ? editStepMaxProducts : s.maxProducts
        } : s)
      }
    }))
    setIsEditPanelOpen(false)
    setEditingStep(null)
  }

  // Profile display settings helpers
  const toggleProfileFormField = (fieldId: string) => {
    setEditStepProfileSettings(prev => ({
      ...prev,
      selectedFormFields: prev.selectedFormFields.includes(fieldId)
        ? prev.selectedFormFields.filter(f => f !== fieldId)
        : [...prev.selectedFormFields, fieldId]
    }))
  }

  const toggleProfileMemberField = (fieldId: string) => {
    setEditStepProfileSettings(prev => ({
      ...prev,
      selectedMemberFields: prev.selectedMemberFields.includes(fieldId)
        ? prev.selectedMemberFields.filter(f => f !== fieldId)
        : [...prev.selectedMemberFields, fieldId]
    }))
  }

  // Product settings helpers
  const toggleProductDisplayField = (fieldId: string) => {
    setEditStepProductSettings(prev => ({
      ...prev,
      selectedDisplayFields: prev.selectedDisplayFields.includes(fieldId)
        ? prev.selectedDisplayFields.filter(f => f !== fieldId)
        : [...prev.selectedDisplayFields, fieldId]
    }))
  }

  // Contract settings helpers
  const updateInstallmentPercentage = (type: 'down' | 'interim' | 'final', percentage: number) => {
    setEditStepContractSettings(prev => ({
      ...prev,
      installments: prev.installments.map(inst =>
        inst.type === type ? { ...inst, percentage } : inst
      )
    }))
  }

  const updateInstallmentDueDate = (
    type: 'down' | 'interim' | 'final',
    dueDateType: 'fixed' | 'relative',
    value: string | number
  ) => {
    setEditStepContractSettings(prev => ({
      ...prev,
      installments: prev.installments.map(inst =>
        inst.type === type
          ? {
              ...inst,
              dueDateType,
              fixedDate: dueDateType === 'fixed' ? value as string : undefined,
              relativeDays: dueDateType === 'relative' ? value as number : undefined
            }
          : inst
      )
    }))
  }

  const addProcess = () => {
    if (!newProcessName.trim()) return
    const newProcess: Process = {
      id: Date.now().toString(),
      name: newProcessName,
      isDefault: false,
      steps: [
        { id: '1', name: 'Application', description: 'Fill out application form', moduleId: 'application', enabled: true },
      ]
    }
    setProcesses([...processes, newProcess])
    setSelectedProcessId(newProcess.id)
    setNewProcessName('')
    setIsAddingProcess(false)
  }

  const deleteProcess = (processId: string) => {
    const proc = processes.find(p => p.id === processId)
    if (proc?.isDefault) return
    setProcesses(procs => procs.filter(p => p.id !== processId))
    if (selectedProcessId === processId) {
      setSelectedProcessId('default')
    }
  }

  const setAsDefault = (processId: string) => {
    setProcesses(procs => procs.map(p => ({
      ...p,
      isDefault: p.id === processId
    })))
  }

  const getModuleName = (moduleId: string) => {
    const mod = AVAILABLE_MODULES.find(m => m.id === moduleId)
    return mod?.name || 'Custom'
  }

  return (
    <div className="space-y-5">
      {/* Add Step Modal */}
      {isAddStepModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Add New Step</h3>
              <button onClick={() => setIsAddStepModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Module Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Module</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_MODULES.map((module) => (
                    <div
                      key={module.id}
                      onClick={() => handleModuleSelect(module.id)}
                      className={`p-3 rounded-md border-2 cursor-pointer transition-all ${
                        newStepModuleId === module.id
                          ? 'border-admin-primary-500 bg-admin-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          newStepModuleId === module.id ? 'bg-admin-primary-100' : 'bg-neutral-100'
                        }`}>
                          <svg className={`w-4 h-4 ${newStepModuleId === module.id ? 'text-admin-primary-600' : 'text-neutral-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={module.icon} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-neutral-950 truncate">{module.name}</p>
                          <p className="text-xs text-neutral-500 truncate">{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms Selection (only for terms module) */}
              {newStepModuleId === 'terms' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Select Terms to Include</label>
                  <div className="border border-neutral-200 rounded-md divide-y divide-neutral-100">
                    {AVAILABLE_TERMS.map((term) => {
                      const isSelected = newStepTerms.some(t => t.id === term.id)
                      const selectedTerm = newStepTerms.find(t => t.id === term.id)
                      const index = selectedTerm ? newStepTerms.indexOf(selectedTerm) : -1
                      return (
                        <div key={term.id} className={`p-3 flex items-center gap-3 ${isSelected ? 'bg-admin-primary-50' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleNewStepTerm(term.id)}
                            className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-950">{term.name}</p>
                            <p className="text-xs text-neutral-500">Modified {term.lastModified} {term.required && <span className="text-status-error-solid">*Required</span>}</p>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-neutral-500 mr-2">Order: {index + 1}</span>
                              <button onClick={() => moveTermOrder(term.id, 'up')} disabled={index === 0} className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                              </button>
                              <button onClick={() => moveTermOrder(term.id, 'down')} disabled={index === newStepTerms.length - 1} className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {newStepModuleId === 'terms' && newStepTerms.length === 0 && (
                    <p className="text-xs text-status-error-solid mt-1">Please select at least one term</p>
                  )}
                </div>
              )}

              {/* Step Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Step Name</label>
                  <input
                    type="text"
                    value={newStepName}
                    onChange={(e) => setNewStepName(e.target.value)}
                    placeholder="Enter step name"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newStepDescription}
                    onChange={(e) => setNewStepDescription(e.target.value)}
                    placeholder="Enter step description"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsAddStepModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={addStep} disabled={!newStepName.trim() || !newStepModuleId || (newStepModuleId === 'terms' && newStepTerms.length === 0)} className="btn btn-primary disabled:opacity-50">Add Step</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Step Slide Panel */}
      {isEditPanelOpen && editingStep && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsEditPanelOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-lg z-50 flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Edit Step</h3>
              <button onClick={() => setIsEditPanelOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Linked Module (Read-only) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Linked Module</label>
                <div className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
                  <p className="text-sm font-medium text-neutral-950">{getModuleName(editingStep.moduleId)}</p>
                  <p className="text-xs text-neutral-500">Module cannot be changed after creation</p>
                </div>
              </div>

              {/* Terms Selection (only for terms module) */}
              {editingStep.moduleId === 'terms' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Terms to Include</label>
                  <div className="border border-neutral-200 rounded-md divide-y divide-neutral-100">
                    {AVAILABLE_TERMS.map((term) => {
                      const isSelected = editStepTerms.some(t => t.id === term.id)
                      const selectedTerm = editStepTerms.find(t => t.id === term.id)
                      const index = selectedTerm ? editStepTerms.indexOf(selectedTerm) : -1
                      return (
                        <div key={term.id} className={`p-3 flex items-center gap-3 ${isSelected ? 'bg-admin-primary-50' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleEditStepTerm(term.id)}
                            className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-950">{term.name}</p>
                            <p className="text-xs text-neutral-500">{term.required && <span className="text-status-error-solid">*Required</span>}</p>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-neutral-500 mr-1">{index + 1}</span>
                              <button onClick={() => moveEditTermOrder(term.id, 'up')} disabled={index === 0} className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                              </button>
                              <button onClick={() => moveEditTermOrder(term.id, 'down')} disabled={index === editStepTerms.length - 1} className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {editStepTerms.length === 0 && (
                    <p className="text-xs text-status-error-solid mt-1">Please select at least one term</p>
                  )}
                </div>
              )}

              {/* Application Form Selection (only for application module) */}
              {editingStep.moduleId === 'application' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Application Form</label>

                  {/* Recommendation Banner - only show when no form selected */}
                  {!editStepFormId && (
                    <div className="mb-3 p-3 bg-status-warning-bg border border-status-warning-border rounded-md">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-status-warning-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-status-warning-border" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-status-warning-text">Recommended for you</p>
                          <p className="text-xs text-status-warning-text mt-0.5">
                            {AVAILABLE_FORMS.find(f => f.recommended)?.name} — {AVAILABLE_FORMS.find(f => f.recommended)?.description}
                          </p>
                          <button
                            onClick={() => setEditStepFormId(AVAILABLE_FORMS.find(f => f.recommended)?.id || '')}
                            className="mt-2 text-xs font-medium text-status-warning-text underline"
                          >
                            Use this form
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border border-neutral-200 rounded-md overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      {AVAILABLE_FORMS.map((form, index) => (
                        <div
                          key={form.id}
                          onClick={() => setEditStepFormId(editStepFormId === form.id ? '' : form.id)}
                          className={`px-3 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                            editStepFormId === form.id
                              ? 'bg-admin-primary-50'
                              : 'hover:bg-neutral-50'
                          } ${index !== AVAILABLE_FORMS.length - 1 ? 'border-b border-neutral-100' : ''}`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            editStepFormId === form.id ? 'border-admin-primary-500' : 'border-neutral-300'
                          }`}>
                            {editStepFormId === form.id && (
                              <div className="w-2 h-2 rounded-full bg-admin-primary-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2">
                            <span className="text-sm text-neutral-950 truncate">{form.name}</span>
                            {form.recommended && !editStepFormId && (
                              <Badge variant="compact" color="warning" className="flex-shrink-0">Recommended</Badge>
                            )}
                          </div>
                          <Badge variant="compact" color={form.status === 'active' ? 'success' : 'neutral'} className="flex-shrink-0">
                            {form.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  {!editStepFormId && (
                    <p className="text-xs text-status-error-solid mt-1">Please select a form</p>
                  )}

                  {/* Selected Form Actions */}
                  {editStepFormId && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setIsFormPreviewOpen(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview Form
                      </button>
                      <button
                        onClick={() => setIsFormBuilderOpen(true)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-admin-primary-700 bg-admin-primary-100 hover:bg-admin-primary-200 rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Edit Form
                      </button>
                    </div>
                  )}

                  {/* Application Period */}
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Application Period</label>

                    {/* Default Period (applies to all languages) */}
                    {!editStepUseCustomLangPeriod && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.start || ''}
                            onChange={(e) => {
                              const newPeriod = { start: e.target.value, end: editStepApplicationPeriod['default']?.end || '' }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">End Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.end || ''}
                            onChange={(e) => {
                              const newPeriod = { start: editStepApplicationPeriod['default']?.start || '', end: e.target.value }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Custom Language Period Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editStepUseCustomLangPeriod}
                        onChange={() => setEditStepUseCustomLangPeriod(!editStepUseCustomLangPeriod)}
                        className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                      />
                      <span className="text-sm text-neutral-600">Set different periods for each language</span>
                    </label>

                    {/* Per-Language Periods */}
                    {editStepUseCustomLangPeriod && (
                      <div className="mt-3 space-y-2">
                        {WEBSITE_LANGUAGES.map((lang) => (
                          <div key={lang.code} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-md">
                            <div className="flex items-center gap-1.5 w-20">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-xs font-medium text-neutral-950">{lang.name}</span>
                            </div>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.start || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: e.target.value, end: prev[lang.code]?.end || '' }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                            <span className="text-neutral-400">~</span>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.end || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: prev[lang.code]?.start || '', end: e.target.value }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Booth Selection (only for booth-selection module) */}
              {editingStep.moduleId === 'booth-selection' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Available Booths & Discounts</label>
                  <p className="text-xs text-neutral-500 mb-3">Select which booth types to offer and configure applicable discounts for each.</p>
                  <div className="border border-neutral-200 rounded-md divide-y divide-neutral-100">
                    {AVAILABLE_BOOTH_TYPES.map((booth) => {
                      const isSelected = editStepBooths.some(b => b.id === booth.id)
                      const selectedBooth = editStepBooths.find(b => b.id === booth.id)
                      return (
                        <div key={booth.id} className={`p-3 ${isSelected ? 'bg-admin-primary-50' : ''}`}>
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleEditBooth(booth.id)}
                              className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-neutral-950">{booth.name}</p>
                                <Badge variant="category" color={booth.type === 'raw-space' ? 'amber' : 'blue'}>
                                  {booth.type === 'raw-space' ? 'Raw Space' : 'Shell Scheme'}
                                </Badge>
                              </div>
                              <p className="text-xs text-neutral-500">{booth.price.toLocaleString()} KRW</p>
                            </div>
                          </div>
                          {/* Discount options - subtle inline */}
                          {isSelected && (
                            <div className="mt-2 ml-7">
                              {!selectedBooth?.useSelectiveDiscounts ? (
                                <button
                                  onClick={() => toggleBoothSelectiveDiscounts(booth.id)}
                                  className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                  + Customize discounts
                                </button>
                              ) : (
                                <div className="p-2.5 bg-white rounded-md border border-neutral-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-neutral-500">Apply discounts:</span>
                                    <button
                                      onClick={() => toggleBoothSelectiveDiscounts(booth.id)}
                                      className="text-xs text-neutral-400 hover:text-destructive-text transition-colors"
                                    >
                                      Apply all
                                    </button>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {AVAILABLE_DISCOUNTS.map((discount) => {
                                      const hasDiscount = selectedBooth?.discountIds.includes(discount.id)
                                      return (
                                        <button
                                          key={discount.id}
                                          onClick={() => toggleBoothDiscount(booth.id, discount.id)}
                                          className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                                            hasDiscount
                                              ? 'bg-admin-primary-50 border-admin-primary-200 text-admin-primary-700'
                                              : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                                          }`}
                                        >
                                          {discount.name} (-{discount.value}%)
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {editStepBooths.length === 0 && (
                    <p className="text-xs text-status-error-solid mt-1">Please select at least one booth type</p>
                  )}

                  {/* Application Period */}
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Application Period</label>

                    {/* Default Period (applies to all languages) */}
                    {!editStepUseCustomLangPeriod && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.start || ''}
                            onChange={(e) => {
                              const newPeriod = { start: e.target.value, end: editStepApplicationPeriod['default']?.end || '' }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">End Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.end || ''}
                            onChange={(e) => {
                              const newPeriod = { start: editStepApplicationPeriod['default']?.start || '', end: e.target.value }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Custom Language Period Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editStepUseCustomLangPeriod}
                        onChange={() => setEditStepUseCustomLangPeriod(!editStepUseCustomLangPeriod)}
                        className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                      />
                      <span className="text-sm text-neutral-600">Set different periods for each language</span>
                    </label>

                    {/* Per-Language Periods */}
                    {editStepUseCustomLangPeriod && (
                      <div className="mt-3 space-y-2">
                        {WEBSITE_LANGUAGES.map((lang) => (
                          <div key={lang.code} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-md">
                            <div className="flex items-center gap-1.5 w-20">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-xs font-medium text-neutral-950">{lang.name}</span>
                            </div>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.start || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: e.target.value, end: prev[lang.code]?.end || '' }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                            <span className="text-neutral-400">~</span>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.end || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: prev[lang.code]?.start || '', end: e.target.value }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Extras Selection (only for extras module) */}
              {editingStep.moduleId === 'extras' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Available Extras</label>
                  <p className="text-xs text-neutral-500 mb-3">Select extras to offer and configure their display order and conditional visibility.</p>

                  {/* Selected Extras (Ordered) */}
                  {editStepExtras.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-neutral-600 mb-2">Selected Extras (in display order)</p>
                      <div className="border border-neutral-200 rounded-md divide-y divide-neutral-100">
                        {[...editStepExtras].sort((a, b) => a.order - b.order).map((selectedExtra, index) => {
                          const extra = AVAILABLE_EXTRAS_CATEGORIES.find(e => e.id === selectedExtra.id)
                          if (!extra) return null
                          return (
                            <div key={extra.id} className="p-3 bg-admin-primary-50">
                              <div className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={true}
                                  onChange={() => toggleEditExtra(extra.id)}
                                  className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="text-sm font-medium text-neutral-950">{extra.name}</p>
                                    <Badge variant="category" color={extra.type === 'quote' ? 'green' : 'purple'}>
                                      {extra.type === 'quote' ? 'Quote-based' : 'Form-based'}
                                    </Badge>
                                    {selectedExtra.useConditionalVisibility && (
                                      <Badge variant="category" color="amber">
                                        Conditional
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-xs text-neutral-500 mr-1">{index + 1}</span>
                                  <button
                                    onClick={() => moveEditExtraOrder(extra.id, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => moveEditExtraOrder(extra.id, 'down')}
                                    disabled={index === editStepExtras.length - 1}
                                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {/* Conditional visibility - subtle inline option */}
                              <div className="mt-2 ml-7">
                                {!selectedExtra.useConditionalVisibility ? (
                                  <button
                                    onClick={() => toggleExtraConditionalVisibility(extra.id)}
                                    className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
                                  >
                                    + Set conditional visibility
                                  </button>
                                ) : (
                                  <div className="p-2.5 bg-white rounded-md border border-neutral-200">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-neutral-500">Show only for:</span>
                                      <button
                                        onClick={() => toggleExtraConditionalVisibility(extra.id)}
                                        className="text-xs text-neutral-400 hover:text-destructive-text transition-colors"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                    {processSelectedBooths.length === 0 ? (
                                      <p className="text-xs text-status-warning-border">Configure Booth Selection first</p>
                                    ) : (
                                      <div className="flex flex-wrap gap-1.5">
                                        {processSelectedBooths.map(selectedBooth => {
                                          const booth = AVAILABLE_BOOTH_TYPES.find(b => b.id === selectedBooth.id)
                                          if (!booth) return null
                                          const isVisible = getBoothVisibility(extra.id, booth.id)
                                          return (
                                            <button
                                              key={booth.id}
                                              onClick={() => toggleBoothVisibility(extra.id, booth.id)}
                                              className={`px-2 py-1 text-xs rounded-md border transition-colors ${
                                                isVisible
                                                  ? 'bg-admin-primary-50 border-admin-primary-200 text-admin-primary-700'
                                                  : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                                              }`}
                                            >
                                              {booth.name.length > 20 ? booth.name.substring(0, 20) + '...' : booth.name}
                                            </button>
                                          )
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Available Extras (Not selected) */}
                  {AVAILABLE_EXTRAS_CATEGORIES.filter(e => !editStepExtras.some(se => se.id === e.id)).length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-neutral-600 mb-2">Available to Add</p>
                      <div className="border border-neutral-200 rounded-md divide-y divide-neutral-100">
                        {AVAILABLE_EXTRAS_CATEGORIES.filter(e => !editStepExtras.some(se => se.id === e.id)).map((extra) => (
                          <div key={extra.id} className="p-3 flex items-center gap-3 hover:bg-neutral-50">
                            <input
                              type="checkbox"
                              checked={false}
                              onChange={() => toggleEditExtra(extra.id)}
                              className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-neutral-950">{extra.name}</p>
                                <Badge variant="category" color={extra.type === 'quote' ? 'green' : 'purple'}>
                                  {extra.type === 'quote' ? 'Quote-based' : 'Form-based'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {editStepExtras.length === 0 && (
                    <p className="text-xs text-status-error-solid mt-1">Please select at least one extra</p>
                  )}
                </div>
              )}

              {/* Contract & Payment Settings (only for contract module) */}
              {editingStep.moduleId === 'contract' && (
                <div className="mb-4 space-y-4">
                  {/* Payment Installments */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Payment Schedule</label>
                    <p className="text-xs text-neutral-500 mb-3">Set the percentage and due date for each installment. Total must equal 100%.</p>

                    <div className="space-y-3">
                      {[
                        { type: 'down' as const, label: 'Down Payment' },
                        { type: 'interim' as const, label: 'Interim Payment' },
                        { type: 'final' as const, label: 'Final Payment' },
                      ].map(({ type, label }) => {
                        const installment = editStepContractSettings.installments.find(i => i.type === type)
                        if (!installment) return null
                        return (
                          <div key={type} className="p-3 bg-neutral-50 rounded-md border border-neutral-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-neutral-950">{label}</span>
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={installment.percentage}
                                  onChange={(e) => updateInstallmentPercentage(type, parseInt(e.target.value) || 0)}
                                  className="w-16 px-2 py-1 text-sm text-right border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-admin-primary-500"
                                />
                                <span className="text-sm text-neutral-500">%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <select
                                value={installment.dueDateType}
                                onChange={(e) => {
                                  const newType = e.target.value as 'fixed' | 'relative'
                                  updateInstallmentDueDate(
                                    type,
                                    newType,
                                    newType === 'fixed' ? '2026-03-01' : 7
                                  )
                                }}
                                className="px-2 py-1.5 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-admin-primary-500"
                              >
                                <option value="relative">Days after application</option>
                                <option value="fixed">Fixed date</option>
                              </select>
                              {installment.dueDateType === 'relative' ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    min="1"
                                    value={installment.relativeDays || 7}
                                    onChange={(e) => updateInstallmentDueDate(type, 'relative', parseInt(e.target.value) || 7)}
                                    className="w-16 px-2 py-1.5 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-admin-primary-500"
                                  />
                                  <span className="text-xs text-neutral-500">days</span>
                                </div>
                              ) : (
                                <input
                                  type="date"
                                  value={installment.fixedDate || ''}
                                  onChange={(e) => updateInstallmentDueDate(type, 'fixed', e.target.value)}
                                  className="px-2 py-1.5 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-admin-primary-500"
                                />
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Total percentage indicator */}
                    {(() => {
                      const total = editStepContractSettings.installments.reduce((sum, i) => sum + i.percentage, 0)
                      return (
                        <div className={`mt-2 text-xs ${total === 100 ? 'text-status-success-border' : 'text-status-error-solid'}`}>
                          Total: {total}% {total !== 100 && '(must equal 100%)'}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Invoice Template Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Invoice Template</label>
                    <div className="border border-neutral-200 rounded-md overflow-hidden">
                      <div className="max-h-48 overflow-y-auto">
                        {AVAILABLE_INVOICE_TEMPLATES.map((template, index) => (
                          <div
                            key={template.id}
                            onClick={() => setEditStepContractSettings(prev => ({ ...prev, invoiceTemplateId: template.id }))}
                            className={`px-3 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                              editStepContractSettings.invoiceTemplateId === template.id
                                ? 'bg-admin-primary-50'
                                : 'hover:bg-neutral-50'
                            } ${index !== AVAILABLE_INVOICE_TEMPLATES.length - 1 ? 'border-b border-neutral-100' : ''}`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              editStepContractSettings.invoiceTemplateId === template.id ? 'border-admin-primary-500' : 'border-neutral-300'
                            }`}>
                              {editStepContractSettings.invoiceTemplateId === template.id && (
                                <div className="w-2 h-2 rounded-full bg-admin-primary-500" />
                              )}
                            </div>
                            <span className="text-sm text-neutral-950">{template.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {!editStepContractSettings.invoiceTemplateId && (
                      <p className="text-xs text-status-error-solid mt-1">Please select an invoice template</p>
                    )}

                    {/* Selected Template Actions */}
                    {editStepContractSettings.invoiceTemplateId && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setIsInvoicePreviewOpen(true)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview
                        </button>
                        <button
                          onClick={() => setIsInvoiceBuilderOpen(true)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-admin-primary-700 bg-admin-primary-100 hover:bg-admin-primary-200 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit Template
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Bank Account Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Bank Account</label>
                    <div className="space-y-2">
                      {AVAILABLE_BANK_ACCOUNTS.map((account) => (
                        <div
                          key={account.id}
                          onClick={() => setEditStepContractSettings(prev => ({ ...prev, bankAccountId: account.id }))}
                          className={`p-3 rounded-md border-2 cursor-pointer transition-all ${
                            editStepContractSettings.bankAccountId === account.id
                              ? 'border-admin-primary-500 bg-admin-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              editStepContractSettings.bankAccountId === account.id ? 'border-admin-primary-500' : 'border-neutral-300'
                            }`}>
                              {editStepContractSettings.bankAccountId === account.id && (
                                <div className="w-2 h-2 rounded-full bg-admin-primary-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-neutral-950">{account.bankName}</p>
                                <Badge variant="compact" color="neutral">{account.currency}</Badge>
                              </div>
                              <p className="text-xs text-neutral-500">{account.accountNumber} · {account.accountHolder}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {!editStepContractSettings.bankAccountId && (
                      <p className="text-xs text-status-error-solid mt-1">Please select a bank account</p>
                    )}
                  </div>
                </div>
              )}

              {/* Product Registration Settings (only for product-registration module) */}
              {editingStep.moduleId === 'product-registration' && (
                <div className="mb-4 space-y-4">
                  {/* Product Form Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Product Registration Form</label>

                    {/* Recommendation Banner - only show when no form selected */}
                    {!editStepProductSettings.productFormId && (
                      <div className="mb-3 p-3 bg-status-warning-bg border border-status-warning-border rounded-md">
                        <div className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-status-warning-bg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-status-warning-border" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-status-warning-text">Recommended for you</p>
                            <p className="text-xs text-status-warning-text mt-0.5">
                              {AVAILABLE_PRODUCT_FORMS.find(f => f.recommended)?.name} — {AVAILABLE_PRODUCT_FORMS.find(f => f.recommended)?.description}
                            </p>
                            <button
                              onClick={() => setEditStepProductSettings(prev => ({ ...prev, productFormId: AVAILABLE_PRODUCT_FORMS.find(f => f.recommended)?.id || '' }))}
                              className="mt-2 text-xs font-medium text-status-warning-text underline"
                            >
                              Use this form
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border border-neutral-200 rounded-md overflow-hidden">
                      <div className="max-h-64 overflow-y-auto">
                        {AVAILABLE_PRODUCT_FORMS.map((form, index) => (
                          <div
                            key={form.id}
                            onClick={() => setEditStepProductSettings(prev => ({
                              ...prev,
                              productFormId: prev.productFormId === form.id ? '' : form.id
                            }))}
                            className={`px-3 py-2.5 flex items-center gap-3 cursor-pointer transition-colors ${
                              editStepProductSettings.productFormId === form.id
                                ? 'bg-admin-primary-50'
                                : 'hover:bg-neutral-50'
                            } ${index !== AVAILABLE_PRODUCT_FORMS.length - 1 ? 'border-b border-neutral-100' : ''}`}
                          >
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              editStepProductSettings.productFormId === form.id ? 'border-admin-primary-500' : 'border-neutral-300'
                            }`}>
                              {editStepProductSettings.productFormId === form.id && (
                                <div className="w-2 h-2 rounded-full bg-admin-primary-500" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 flex items-center gap-2">
                              <span className="text-sm text-neutral-950 truncate">{form.name}</span>
                              {form.recommended && !editStepProductSettings.productFormId && (
                                <Badge variant="compact" color="warning" className="flex-shrink-0">Recommended</Badge>
                              )}
                            </div>
                            <Badge variant="compact" color={form.status === 'active' ? 'success' : 'neutral'} className="flex-shrink-0">
                              {form.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    {!editStepProductSettings.productFormId && (
                      <p className="text-xs text-status-error-solid mt-1">Please select a product form</p>
                    )}

                    {/* Selected Form Actions */}
                    {editStepProductSettings.productFormId && (
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => setIsProductFormPreviewOpen(true)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Preview Form
                        </button>
                        <button
                          onClick={() => setIsProductFormBuilderOpen(true)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-admin-primary-700 bg-admin-primary-100 hover:bg-admin-primary-200 rounded-md transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Edit Form
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Display Fields Selection */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Product Detail Page Layout</label>
                    <p className="text-xs text-neutral-500 mb-3">Configure which fields to display on the product detail page.</p>
                    <button
                      onClick={() => setIsProductLayoutBuilderOpen(true)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-admin-primary-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-neutral-950">Configure Layout</p>
                          <p className="text-xs text-neutral-500">
                            {editStepProductSettings.selectedDisplayFields.length > 0
                              ? `${editStepProductSettings.selectedDisplayFields.length} fields configured`
                              : 'No fields configured yet'}
                          </p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {editStepProductSettings.selectedDisplayFields.length === 0 && (
                      <p className="text-xs text-status-error-solid mt-1">Please configure at least one display field</p>
                    )}
                  </div>

                  {/* Max Products Limit */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Maximum Products per Exhibitor</label>
                    <p className="text-xs text-neutral-500 mb-2">Limit the number of products each exhibitor can register.</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={editStepMaxProducts}
                        onChange={(e) => setEditStepMaxProducts(parseInt(e.target.value) || 10)}
                        className="w-24 px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                      />
                      <span className="text-sm text-neutral-500">products</span>
                    </div>
                  </div>

                  {/* Application Period */}
                  <div className="pt-4 border-t border-neutral-100">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Registration Period</label>

                    {/* Default Period (applies to all languages) */}
                    {!editStepUseCustomLangPeriod && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.start || ''}
                            onChange={(e) => {
                              const newPeriod = { start: e.target.value, end: editStepApplicationPeriod['default']?.end || '' }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">End Date</label>
                          <input
                            type="date"
                            value={editStepApplicationPeriod['default']?.end || ''}
                            onChange={(e) => {
                              const newPeriod = { start: editStepApplicationPeriod['default']?.start || '', end: e.target.value }
                              const allLangPeriod: MultiLangPeriod = { default: newPeriod }
                              WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
                              setEditStepApplicationPeriod(allLangPeriod)
                            }}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Custom Language Period Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editStepUseCustomLangPeriod}
                        onChange={() => setEditStepUseCustomLangPeriod(!editStepUseCustomLangPeriod)}
                        className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                      />
                      <span className="text-sm text-neutral-600">Set different periods for each language</span>
                    </label>

                    {/* Per-Language Periods */}
                    {editStepUseCustomLangPeriod && (
                      <div className="mt-3 space-y-2">
                        {WEBSITE_LANGUAGES.map((lang) => (
                          <div key={lang.code} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-md">
                            <div className="flex items-center gap-1.5 w-20">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-xs font-medium text-neutral-950">{lang.name}</span>
                            </div>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.start || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: e.target.value, end: prev[lang.code]?.end || '' }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                            <span className="text-neutral-400">~</span>
                            <input
                              type="date"
                              value={editStepApplicationPeriod[lang.code]?.end || ''}
                              onChange={(e) => setEditStepApplicationPeriod(prev => ({
                                ...prev,
                                [lang.code]: { ...prev[lang.code], start: prev[lang.code]?.start || '', end: e.target.value }
                              }))}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Company Profile Display Settings (only for company-profile module) */}
              {editingStep.moduleId === 'company-profile' && (
                <div className="mb-4 space-y-4">
                  {/* Company Profile Layout Builder */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Company Profile Layout</label>
                    <p className="text-xs text-neutral-500 mb-3">Configure which fields to display on the company profile page.</p>
                    <button
                      onClick={() => setIsProfileLayoutBuilderOpen(true)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-md transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-admin-primary-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-admin-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                          </svg>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-neutral-950">Configure Layout</p>
                          <p className="text-xs text-neutral-500">
                            {(editStepProfileSettings.selectedFormFields.length + editStepProfileSettings.selectedMemberFields.length) > 0
                              ? `${editStepProfileSettings.selectedFormFields.length + editStepProfileSettings.selectedMemberFields.length} fields configured`
                              : 'No fields configured yet'}
                          </p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {(editStepProfileSettings.selectedFormFields.length === 0 && editStepProfileSettings.selectedMemberFields.length === 0) && (
                      <p className="text-xs text-status-error-solid mt-1">Please configure at least one display field</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Step Name</label>
                  <input
                    type="text"
                    value={editStepName}
                    onChange={(e) => setEditStepName(e.target.value)}
                    placeholder="Enter step name"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  <textarea
                    value={editStepDescription}
                    onChange={(e) => setEditStepDescription(e.target.value)}
                    placeholder="Enter step description"
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsEditPanelOpen(false)} className="btn btn-secondary">Cancel</button>
              <button
                onClick={saveEditStep}
                disabled={
                  !editStepName.trim() ||
                  (editingStep.moduleId === 'terms' && editStepTerms.length === 0) ||
                  (editingStep.moduleId === 'application' && !editStepFormId) ||
                  (editingStep.moduleId === 'booth-selection' && editStepBooths.length === 0) ||
                  (editingStep.moduleId === 'extras' && editStepExtras.length === 0) ||
                  (editingStep.moduleId === 'contract' && (
                    !editStepContractSettings.invoiceTemplateId ||
                    !editStepContractSettings.bankAccountId ||
                    editStepContractSettings.installments.reduce((sum, i) => sum + i.percentage, 0) !== 100
                  )) ||
                  (editingStep.moduleId === 'product-registration' && (
                    !editStepProductSettings.productFormId ||
                    editStepProductSettings.selectedDisplayFields.length === 0
                  )) ||
                  (editingStep.moduleId === 'company-profile' && (
                    editStepProfileSettings.selectedFormFields.length === 0 &&
                    editStepProfileSettings.selectedMemberFields.length === 0
                  ))
                }
                className="btn btn-primary disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      )}

      {/* Form Preview Popup */}
      {isFormPreviewOpen && editStepFormId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsFormPreviewOpen(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-950">Form Preview</h3>
                  <p className="text-sm text-neutral-500">{AVAILABLE_FORMS.find(f => f.id === editStepFormId)?.name}</p>
                </div>
                <button onClick={() => setIsFormPreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
                <div className="bg-white rounded-md border border-neutral-200 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name <span className="text-form-required">*</span></label>
                    <input type="text" placeholder="Enter company name" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Business Registration Number <span className="text-form-required">*</span></label>
                    <input type="text" placeholder="000-00-00000" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Representative Name <span className="text-form-required">*</span></label>
                      <input type="text" placeholder="Full name" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Phone <span className="text-form-required">*</span></label>
                      <input type="text" placeholder="010-0000-0000" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Email <span className="text-form-required">*</span></label>
                    <input type="email" placeholder="email@company.com" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Product Category <span className="text-form-required">*</span></label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm text-neutral-500" disabled>
                      <option>Select category</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Company Introduction</label>
                    <textarea placeholder="Briefly describe your company" rows={3} className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Company Logo</label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-md p-4 text-center">
                      <svg className="w-8 h-8 text-neutral-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-neutral-400">Upload image</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-neutral-400 pt-2">+ more fields...</p>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-100 flex justify-end">
                <button onClick={() => setIsFormPreviewOpen(false)} className="btn btn-secondary">Close</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Form Builder Full-Screen Popup */}
      {isFormBuilderOpen && editStepFormId && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          {/* Header */}
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsFormBuilderOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Form Builder</h1>
                <p className="text-xs text-neutral-500">{AVAILABLE_FORMS.find(f => f.id === editStepFormId)?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button onClick={() => setIsFormBuilderOpen(false)} className="btn btn-primary text-sm">Save Form</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Field Types Sidebar */}
            <div className="w-64 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Field Types</h3>
              <div className="space-y-2">
                {[
                  { icon: 'M4 6h16M4 12h16M4 18h7', label: 'Text Input' },
                  { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', label: 'Text Area' },
                  { icon: 'M19 9l-7 7-7-7', label: 'Dropdown' },
                  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Checkbox' },
                  { icon: 'M9 12l2 2 4-4', label: 'Radio Button' },
                  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Date Picker' },
                  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'File Upload' },
                  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone' },
                  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email' },
                ].map((field, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-md border border-neutral-200 cursor-grab hover:border-admin-primary-300 hover:shadow-sm transition-all">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={field.icon} />
                    </svg>
                    <span className="text-sm text-neutral-950">{field.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Canvas */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100">
              <div className="max-w-2xl mx-auto bg-white rounded-lg border border-neutral-200 p-6">
                <div className="space-y-4">
                  {/* Existing Fields */}
                  {[
                    { label: 'Company Name', type: 'text', required: true },
                    { label: 'Business Registration Number', type: 'text', required: true },
                    { label: 'Representative Name', type: 'text', required: true },
                    { label: 'Contact Phone', type: 'phone', required: true },
                    { label: 'Contact Email', type: 'email', required: true },
                    { label: 'Product Category', type: 'dropdown', required: true },
                    { label: 'Company Introduction', type: 'textarea', required: false },
                    { label: 'Company Logo', type: 'file', required: false },
                  ].map((field, i) => (
                    <div key={i} className="group p-4 border border-neutral-200 rounded-md hover:border-admin-primary-300 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-neutral-300 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                          </svg>
                          <span className="text-sm font-medium text-neutral-950">{field.label}</span>
                          {field.required && <span className="text-xs text-form-required">*</span>}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-neutral-400 hover:text-neutral-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-1 text-neutral-400 hover:text-destructive-text">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-neutral-400 capitalize">{field.type}</div>
                    </div>
                  ))}

                  {/* Drop Zone */}
                  <div className="p-4 border-2 border-dashed border-neutral-300 rounded-md text-center">
                    <p className="text-sm text-neutral-400">Drag fields here or click to add</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Field Settings Sidebar */}
            <div className="w-72 border-l border-neutral-200 bg-white overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Field Settings</h3>
              <div className="text-sm text-neutral-400 text-center py-8">
                Select a field to edit its settings
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Preview Popup */}
      {isInvoicePreviewOpen && editStepContractSettings.invoiceTemplateId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsInvoicePreviewOpen(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-950">Invoice Preview</h3>
                  <p className="text-sm text-neutral-500">{AVAILABLE_INVOICE_TEMPLATES.find(t => t.id === editStepContractSettings.invoiceTemplateId)?.name}</p>
                </div>
                <button onClick={() => setIsInvoicePreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
                <div className="bg-white rounded-md border border-neutral-200 p-6">
                  {/* Invoice Preview Content */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-xl font-bold text-neutral-950">INVOICE</h2>
                      <p className="text-sm text-neutral-500">Invoice #: INV-2026-XXXX</p>
                      <p className="text-sm text-neutral-500">Date: 2026-XX-XX</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-neutral-950">Design House Co., Ltd.</p>
                      <p className="text-sm text-neutral-500">123 Exhibition Way</p>
                      <p className="text-sm text-neutral-500">Seoul, Korea</p>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-neutral-50 rounded-md">
                    <p className="text-sm font-medium text-neutral-600 mb-1">Bill To:</p>
                    <p className="text-sm text-neutral-500">[Company Name]</p>
                    <p className="text-sm text-neutral-500">[Address]</p>
                  </div>

                  <table className="table text-sm mb-6">
                    <thead>
                      <tr>
                        <th className="font-medium text-neutral-600">Description</th>
                        <th className="text-right font-medium text-neutral-600">Qty</th>
                        <th className="text-right font-medium text-neutral-600">Price</th>
                        <th className="text-right font-medium text-neutral-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-neutral-700">Standard Booth (3m x 3m)</td>
                        <td className="text-right text-neutral-700">1</td>
                        <td className="text-right text-neutral-700">₩2,500,000</td>
                        <td className="text-right text-neutral-700">₩2,500,000</td>
                      </tr>
                      <tr>
                        <td className="text-neutral-700">Facilities Package</td>
                        <td className="text-right text-neutral-700">1</td>
                        <td className="text-right text-neutral-700">₩500,000</td>
                        <td className="text-right text-neutral-700">₩500,000</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end">
                    <div className="w-64">
                      <div className="flex justify-between py-1 text-sm">
                        <span className="text-neutral-600">Subtotal</span>
                        <span className="text-neutral-700">₩3,000,000</span>
                      </div>
                      <div className="flex justify-between py-1 text-sm">
                        <span className="text-neutral-600">VAT (10%)</span>
                        <span className="text-neutral-700">₩300,000</span>
                      </div>
                      <div className="flex justify-between py-2 text-base font-semibold border-t border-neutral-200 mt-1">
                        <span className="text-neutral-950">Total</span>
                        <span className="text-neutral-950">₩3,300,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200">
                    <p className="text-sm font-medium text-neutral-600 mb-2">Payment Information</p>
                    <p className="text-sm text-neutral-500">Bank: {AVAILABLE_BANK_ACCOUNTS.find(a => a.id === editStepContractSettings.bankAccountId)?.bankName || 'N/A'}</p>
                    <p className="text-sm text-neutral-500">Account: {AVAILABLE_BANK_ACCOUNTS.find(a => a.id === editStepContractSettings.bankAccountId)?.accountNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-100 flex justify-end">
                <button onClick={() => setIsInvoicePreviewOpen(false)} className="btn btn-secondary">Close</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Invoice Builder Full-Screen Popup */}
      {isInvoiceBuilderOpen && editStepContractSettings.invoiceTemplateId && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsInvoiceBuilderOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Invoice Template Editor</h1>
                <p className="text-xs text-neutral-500">{AVAILABLE_INVOICE_TEMPLATES.find(t => t.id === editStepContractSettings.invoiceTemplateId)?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button onClick={() => setIsInvoiceBuilderOpen(false)} className="btn btn-primary text-sm">Save Template</button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Settings Sidebar */}
            <div className="w-72 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Template Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Company Logo</label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-md p-4 text-center cursor-pointer hover:border-neutral-400">
                    <svg className="w-6 h-6 text-neutral-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-neutral-400">Upload logo</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Invoice Prefix</label>
                  <input type="text" defaultValue="INV-2026-" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Currency</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm">
                    <option>KRW (₩)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">VAT Rate</label>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue="10" className="w-20 px-3 py-2 border border-neutral-200 rounded-md text-sm" />
                    <span className="text-sm text-neutral-500">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Footer Notes</label>
                  <textarea rows={3} placeholder="Payment terms, notes, etc." className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm" />
                </div>
              </div>
            </div>

            {/* Invoice Canvas */}
            <div className="flex-1 overflow-y-auto p-8 bg-neutral-100">
              <div className="max-w-2xl mx-auto bg-white rounded-lg border border-neutral-200 p-8">
                <p className="text-center text-neutral-400 text-sm">Invoice template preview will appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Form Preview Popup */}
      {isProductFormPreviewOpen && editStepProductSettings.productFormId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsProductFormPreviewOpen(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-950">Product Form Preview</h3>
                  <p className="text-sm text-neutral-500">{AVAILABLE_PRODUCT_FORMS.find(f => f.id === editStepProductSettings.productFormId)?.name}</p>
                </div>
                <button onClick={() => setIsProductFormPreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
                <div className="bg-white rounded-md border border-neutral-200 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Product Name <span className="text-form-required">*</span></label>
                    <input type="text" placeholder="Enter product name" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Product Category <span className="text-form-required">*</span></label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm text-neutral-500" disabled>
                      <option>Select category</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Product Image <span className="text-form-required">*</span></label>
                    <div className="border-2 border-dashed border-neutral-300 rounded-md p-4 text-center">
                      <svg className="w-8 h-8 text-neutral-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-xs text-neutral-400">Upload product image</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                    <textarea placeholder="Enter product description" rows={3} className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Brand</label>
                      <input type="text" placeholder="Brand name" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Model Number</label>
                      <input type="text" placeholder="Model number" className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm" disabled />
                    </div>
                  </div>
                  <p className="text-center text-sm text-neutral-400 pt-2">+ more fields...</p>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-100 flex justify-end">
                <button onClick={() => setIsProductFormPreviewOpen(false)} className="btn btn-secondary">Close</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Form Builder Full-Screen Popup */}
      {isProductFormBuilderOpen && editStepProductSettings.productFormId && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsProductFormBuilderOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Product Form Builder</h1>
                <p className="text-xs text-neutral-500">{AVAILABLE_PRODUCT_FORMS.find(f => f.id === editStepProductSettings.productFormId)?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button onClick={() => setIsProductFormBuilderOpen(false)} className="btn btn-primary text-sm">Save Form</button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Field Types Sidebar */}
            <div className="w-64 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Field Types</h3>
              <div className="space-y-2">
                {[
                  { icon: 'M4 6h16M4 12h16M4 18h7', label: 'Text Input' },
                  { icon: 'M4 6h16M4 10h16M4 14h16M4 18h16', label: 'Text Area' },
                  { icon: 'M19 9l-7 7-7-7', label: 'Dropdown' },
                  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Image Upload' },
                  { icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', label: 'File Upload' },
                  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Price' },
                ].map((field, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-md border border-neutral-200 cursor-grab hover:border-admin-primary-300 hover:shadow-sm transition-all">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={field.icon} />
                    </svg>
                    <span className="text-sm text-neutral-950">{field.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Canvas */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100">
              <div className="max-w-2xl mx-auto bg-white rounded-lg border border-neutral-200 p-6">
                <p className="text-center text-neutral-400 text-sm">Drag fields here to build product form</p>
              </div>
            </div>

            {/* Field Settings Sidebar */}
            <div className="w-72 border-l border-neutral-200 bg-white overflow-y-auto p-4">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Field Settings</h3>
              <div className="text-sm text-neutral-400 text-center py-8">
                Select a field to edit its settings
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Layout Builder Modal */}
      {isProductLayoutBuilderOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => { setIsProductLayoutBuilderOpen(false); setProductLayoutMode('edit') }} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Product Detail Page Layout</h1>
                <p className="text-xs text-neutral-500">
                  {productLayoutMode === 'edit' ? 'Drag fields to the drop zones below' : 'Preview of the actual layout'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <div className="flex items-center bg-neutral-100 rounded-md p-1">
                <button
                  onClick={() => setProductLayoutMode('edit')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    productLayoutMode === 'edit'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setProductLayoutMode('preview')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    productLayoutMode === 'preview'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Preview
                </button>
              </div>
              <button onClick={() => { setIsProductLayoutBuilderOpen(false); setProductLayoutMode('edit') }} className="btn btn-primary text-sm">Save Layout</button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Available Fields Sidebar */}
            <div className={`w-72 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-4 transition-opacity ${productLayoutMode === 'preview' ? 'opacity-50 pointer-events-none' : ''}`}>
              <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-3">Product Form Fields</h3>
              <p className="text-xs text-neutral-400 mb-3">Drag fields to add them to the layout</p>
              <div className="space-y-2">
                {PRODUCT_FORM_FIELDS.map((field) => {
                  const isUsed = editStepProductSettings.selectedDisplayFields.includes(field.id)
                  return (
                    <div
                      key={field.id}
                      draggable={!isUsed && productLayoutMode === 'edit'}
                      onDragStart={() => setDraggedField(field.id)}
                      onDragEnd={() => setDraggedField(null)}
                      className={`flex items-center gap-3 p-3 rounded-md border transition-all ${
                        isUsed
                          ? 'bg-neutral-100 border-neutral-200 opacity-50 cursor-not-allowed'
                          : 'bg-white border-neutral-200 cursor-grab hover:border-admin-primary-300 hover:shadow-sm'
                      }`}
                    >
                      <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                      </svg>
                      <span className="text-sm text-neutral-950 flex-1">{field.name}</span>
                      {field.required && (
                        <Badge variant="compact" color="error">Required</Badge>
                      )}
                      {isUsed && (
                        <svg className="w-4 h-4 text-status-success-solid" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Template Canvas */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100">
              <div className="max-w-4xl mx-auto">
                {/* EDIT MODE */}
                {productLayoutMode === 'edit' && (
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                    {/* Edit Mode Layout */}
                    <div className="flex">
                      {/* Left Column - Image */}
                      <div className="w-[45%] p-4 border-r border-neutral-100">
                        <div
                          className={`aspect-square rounded-md border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                            draggedField === 'product-image'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'product-image' && !editStepProductSettings.selectedDisplayFields.includes('product-image')) {
                              toggleProductDisplayField('product-image')
                            }
                            setDraggedField(null)
                          }}
                        >
                          {editStepProductSettings.selectedDisplayFields.includes('product-image') ? (
                            <div className="text-center relative w-full h-full flex flex-col items-center justify-center">
                              <svg className="w-12 h-12 text-admin-primary-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm font-medium text-admin-primary-600">Product Image</span>
                              <button
                                onClick={() => toggleProductDisplayField('product-image')}
                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-8 h-8 text-neutral-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs text-neutral-400">Drop Product Image here</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Info */}
                      <div className="flex-1 p-4 space-y-3">
                        {/* Header Zone - Category & Brand */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[50px] transition-colors ${
                            draggedField && ['product-category', 'product-brand'].includes(draggedField)
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField && ['product-category', 'product-brand'].includes(draggedField) && !editStepProductSettings.selectedDisplayFields.includes(draggedField)) {
                              toggleProductDisplayField(draggedField)
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Category & Brand</p>
                          <div className="flex flex-wrap gap-2">
                            {editStepProductSettings.selectedDisplayFields.includes('product-category') && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-neutral-200">
                                <span className="text-xs text-neutral-950">Category</span>
                                <button onClick={() => toggleProductDisplayField('product-category')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {editStepProductSettings.selectedDisplayFields.includes('product-brand') && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-white rounded border border-neutral-200">
                                <span className="text-xs text-neutral-950">Brand</span>
                                <button onClick={() => toggleProductDisplayField('product-brand')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {!editStepProductSettings.selectedDisplayFields.includes('product-category') && !editStepProductSettings.selectedDisplayFields.includes('product-brand') && (
                              <span className="text-xs text-neutral-400">Drop Category or Brand</span>
                            )}
                          </div>
                        </div>

                        {/* Title Zone - Product Name */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[60px] transition-colors ${
                            draggedField === 'product-name'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'product-name' && !editStepProductSettings.selectedDisplayFields.includes('product-name')) {
                              toggleProductDisplayField('product-name')
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Product Title</p>
                          {editStepProductSettings.selectedDisplayFields.includes('product-name') ? (
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-neutral-950">Product Name</span>
                              <button onClick={() => toggleProductDisplayField('product-name')} className="text-neutral-400 hover:text-destructive-text">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">Drop Product Name here</span>
                          )}
                        </div>

                        {/* Price Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[50px] transition-colors ${
                            draggedField === 'product-price'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'product-price' && !editStepProductSettings.selectedDisplayFields.includes('product-price')) {
                              toggleProductDisplayField('product-price')
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Price</p>
                          {editStepProductSettings.selectedDisplayFields.includes('product-price') ? (
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-admin-primary-600">₩ 0,000,000</span>
                              <button onClick={() => toggleProductDisplayField('product-price')} className="text-neutral-400 hover:text-destructive-text">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">Drop Price here</span>
                          )}
                        </div>

                        {/* Description Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[80px] transition-colors ${
                            draggedField === 'product-description'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'product-description' && !editStepProductSettings.selectedDisplayFields.includes('product-description')) {
                              toggleProductDisplayField('product-description')
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Description</p>
                          {editStepProductSettings.selectedDisplayFields.includes('product-description') ? (
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-neutral-500 flex-1">Product description text will appear here...</p>
                              <button onClick={() => toggleProductDisplayField('product-description')} className="text-neutral-400 hover:text-destructive-text ml-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">Drop Description here</span>
                          )}
                        </div>

                        {/* Specs & Model Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[80px] transition-colors ${
                            draggedField && ['product-spec', 'product-model'].includes(draggedField)
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField && ['product-spec', 'product-model'].includes(draggedField) && !editStepProductSettings.selectedDisplayFields.includes(draggedField)) {
                              toggleProductDisplayField(draggedField)
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Specifications & Details</p>
                          <div className="space-y-2">
                            {editStepProductSettings.selectedDisplayFields.includes('product-spec') && (
                              <div className="flex items-center justify-between bg-white rounded p-2 border border-neutral-200">
                                <span className="text-xs text-neutral-950">Specifications</span>
                                <button onClick={() => toggleProductDisplayField('product-spec')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {editStepProductSettings.selectedDisplayFields.includes('product-model') && (
                              <div className="flex items-center justify-between bg-white rounded p-2 border border-neutral-200">
                                <span className="text-xs text-neutral-950">Model Number</span>
                                <button onClick={() => toggleProductDisplayField('product-model')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {!editStepProductSettings.selectedDisplayFields.includes('product-spec') && !editStepProductSettings.selectedDisplayFields.includes('product-model') && (
                              <span className="text-xs text-neutral-400">Drop Specs or Model here</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100">
                      <p className="text-xs text-neutral-400 text-center">Exhibitor information will be displayed here automatically</p>
                    </div>
                  </div>
                )}

                {/* PREVIEW MODE */}
                {productLayoutMode === 'preview' && (
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                    {/* Product Content */}
                    <div className="flex">
                    {/* Product Image Area */}
                    <div className="w-[45%] p-6 border-r border-neutral-100">
                      {editStepProductSettings.selectedDisplayFields.includes('product-image') ? (
                        <div className="aspect-square bg-neutral-100 rounded-md flex items-center justify-center relative group">
                          <div className="text-center">
                            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm text-neutral-400">Product Image</p>
                          </div>
                          <button
                            onClick={() => toggleProductDisplayField('product-image')}
                            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="aspect-square bg-neutral-50 rounded-md border-2 border-dashed border-neutral-200 flex items-center justify-center">
                          <p className="text-sm text-neutral-400">Image not displayed</p>
                        </div>
                      )}
                    </div>

                    {/* Product Info Area */}
                    <div className="flex-1 p-6">
                      {/* Category & Brand */}
                      <div className="flex items-center gap-2 mb-3">
                        {editStepProductSettings.selectedDisplayFields.includes('product-category') && (
                          <div className="relative group">
                            <span className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded">Category Name</span>
                            <button
                              onClick={() => toggleProductDisplayField('product-category')}
                              className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                        {editStepProductSettings.selectedDisplayFields.includes('product-brand') && (
                          <div className="relative group">
                            <span className="px-2 py-1 text-xs font-medium bg-admin-primary-50 text-admin-primary-700 rounded">Brand</span>
                            <button
                              onClick={() => toggleProductDisplayField('product-brand')}
                              className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Product Name */}
                      {editStepProductSettings.selectedDisplayFields.includes('product-name') ? (
                        <div className="relative group mb-4">
                          <h1 className="text-2xl font-bold text-neutral-950">Product Name</h1>
                          <button
                            onClick={() => toggleProductDisplayField('product-name')}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="mb-4 py-2 border-b border-dashed border-neutral-200">
                          <p className="text-sm text-neutral-400">Product name not displayed</p>
                        </div>
                      )}

                      {/* Price */}
                      {editStepProductSettings.selectedDisplayFields.includes('product-price') && (
                        <div className="relative group mb-4">
                          <p className="text-xl font-semibold text-admin-primary-600">₩ 1,200,000</p>
                          <button
                            onClick={() => toggleProductDisplayField('product-price')}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Description */}
                      {editStepProductSettings.selectedDisplayFields.includes('product-description') && (
                        <div className="relative group mb-4">
                          <p className="text-sm text-neutral-600 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                          </p>
                          <button
                            onClick={() => toggleProductDisplayField('product-description')}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Specifications */}
                      {editStepProductSettings.selectedDisplayFields.includes('product-spec') && (
                        <div className="relative group mb-4">
                          <h3 className="text-sm font-medium text-neutral-950 mb-2">Specifications</h3>
                          <div className="bg-neutral-50 rounded-md p-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div className="text-neutral-500">Size</div>
                              <div className="text-neutral-950">100 x 50 x 30 cm</div>
                              <div className="text-neutral-500">Weight</div>
                              <div className="text-neutral-950">2.5 kg</div>
                              <div className="text-neutral-500">Material</div>
                              <div className="text-neutral-950">Aluminum</div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleProductDisplayField('product-spec')}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Model Number */}
                      {editStepProductSettings.selectedDisplayFields.includes('product-model') && (
                        <div className="relative group">
                          <p className="text-xs text-neutral-500">Model: ABC-12345</p>
                          <button
                            onClick={() => toggleProductDisplayField('product-model')}
                            className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}

                      {/* Empty State */}
                      {editStepProductSettings.selectedDisplayFields.length === 0 && (
                        <div className="text-center py-8">
                          <svg className="w-12 h-12 text-neutral-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-sm text-neutral-400">Drag fields here to build the layout</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Exhibitor Info Footer */}
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-200 rounded-md"></div>
                      <div>
                        <p className="text-sm font-medium text-neutral-950">Exhibitor Company Name</p>
                        <p className="text-xs text-neutral-500">Booth A-123</p>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Company Profile Layout Builder Modal */}
      {isProfileLayoutBuilderOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => { setIsProfileLayoutBuilderOpen(false); setProfileLayoutMode('edit') }} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Company Profile Layout</h1>
                <p className="text-xs text-neutral-500">
                  {profileLayoutMode === 'edit' ? 'Drag fields to the drop zones below' : 'Preview of the actual layout'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <div className="flex items-center bg-neutral-100 rounded-md p-1">
                <button
                  onClick={() => setProfileLayoutMode('edit')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    profileLayoutMode === 'edit'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setProfileLayoutMode('preview')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    profileLayoutMode === 'preview'
                      ? 'bg-white text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Preview
                </button>
              </div>
              <button onClick={() => { setIsProfileLayoutBuilderOpen(false); setProfileLayoutMode('edit') }} className="btn btn-primary text-sm">Save Layout</button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Available Fields Sidebar */}
            <div className={`w-72 border-r border-neutral-200 bg-neutral-50 overflow-y-auto p-4 transition-opacity ${profileLayoutMode === 'preview' ? 'opacity-50 pointer-events-none' : ''}`}>
              {/* Application Form Fields */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-2">Application Form Fields</h3>
                <p className="text-xs text-neutral-400 mb-3">From exhibitor application</p>
                <div className="space-y-2">
                  {APPLICATION_FORM_FIELDS.map((field) => {
                    const isUsed = editStepProfileSettings.selectedFormFields.includes(field.id)
                    return (
                      <div
                        key={field.id}
                        draggable={!isUsed && profileLayoutMode === 'edit'}
                        onDragStart={() => setDraggedField(`form:${field.id}`)}
                        onDragEnd={() => setDraggedField(null)}
                        className={`flex items-center gap-3 p-2.5 rounded-md border transition-all ${
                          isUsed
                            ? 'bg-neutral-100 border-neutral-200 opacity-50 cursor-not-allowed'
                            : 'bg-white border-neutral-200 cursor-grab hover:border-admin-primary-300 hover:shadow-sm'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                        <span className="text-sm text-neutral-950 flex-1 truncate">{field.name}</span>
                        {isUsed && (
                          <svg className="w-3.5 h-3.5 text-status-success-solid flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Member Info Fields */}
              <div>
                <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-2">Member Information</h3>
                <p className="text-xs text-neutral-400 mb-3">From workspace member data</p>
                <div className="space-y-2">
                  {MEMBER_INFO_FIELDS.map((field) => {
                    const isUsed = editStepProfileSettings.selectedMemberFields.includes(field.id)
                    return (
                      <div
                        key={field.id}
                        draggable={!isUsed && profileLayoutMode === 'edit'}
                        onDragStart={() => setDraggedField(`member:${field.id}`)}
                        onDragEnd={() => setDraggedField(null)}
                        className={`flex items-center gap-3 p-2.5 rounded-md border transition-all ${
                          isUsed
                            ? 'bg-neutral-100 border-neutral-200 opacity-50 cursor-not-allowed'
                            : 'bg-white border-neutral-200 cursor-grab hover:border-admin-primary-300 hover:shadow-sm'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                        <span className="text-sm text-neutral-950 flex-1 truncate">{field.name}</span>
                        {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative badge */}
                        <span className="px-1 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-600 flex-shrink-0">Member</span>
                        {isUsed && (
                          <svg className="w-3.5 h-3.5 text-status-success-solid flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Template Canvas */}
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100">
              <div className="max-w-4xl mx-auto">
                {/* EDIT MODE */}
                {profileLayoutMode === 'edit' && (
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                    {/* Header Section */}
                    <div className="p-4 border-b border-neutral-100">
                      <div className="flex gap-4">
                        {/* Logo Drop Zone */}
                        <div
                          className={`w-24 h-24 rounded-md border-2 border-dashed flex flex-col items-center justify-center transition-colors flex-shrink-0 ${
                            draggedField === 'form:company-logo'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'form:company-logo' && !editStepProfileSettings.selectedFormFields.includes('company-logo')) {
                              toggleProfileFormField('company-logo')
                            }
                            setDraggedField(null)
                          }}
                        >
                          {editStepProfileSettings.selectedFormFields.includes('company-logo') ? (
                            <div className="text-center relative w-full h-full flex flex-col items-center justify-center">
                              <svg className="w-8 h-8 text-admin-primary-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="text-xs text-admin-primary-600">Logo</span>
                              <button
                                onClick={() => toggleProfileFormField('company-logo')}
                                className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg className="w-6 h-6 text-neutral-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span className="text-xs text-neutral-400">Logo</span>
                            </>
                          )}
                        </div>

                        {/* Company Name & Category Zone */}
                        <div className="flex-1 space-y-2">
                          <div
                            className={`p-3 rounded-md border-2 border-dashed min-h-[40px] transition-colors ${
                              draggedField === 'form:company-name'
                                ? 'border-admin-primary-400 bg-admin-primary-50'
                                : 'border-neutral-300 bg-neutral-50'
                            }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (draggedField === 'form:company-name' && !editStepProfileSettings.selectedFormFields.includes('company-name')) {
                                toggleProfileFormField('company-name')
                              }
                              setDraggedField(null)
                            }}
                          >
                            {editStepProfileSettings.selectedFormFields.includes('company-name') ? (
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-neutral-950">Company Name</span>
                                <button onClick={() => toggleProfileFormField('company-name')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-neutral-400">Drop Company Name here</span>
                            )}
                          </div>
                          <div
                            className={`p-2 rounded-md border-2 border-dashed transition-colors ${
                              draggedField === 'form:product-category'
                                ? 'border-admin-primary-400 bg-admin-primary-50'
                                : 'border-neutral-300 bg-neutral-50'
                            }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (draggedField === 'form:product-category' && !editStepProfileSettings.selectedFormFields.includes('product-category')) {
                                toggleProfileFormField('product-category')
                              }
                              setDraggedField(null)
                            }}
                          >
                            {editStepProfileSettings.selectedFormFields.includes('product-category') ? (
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 text-xs bg-admin-primary-50 text-admin-primary-700 rounded">Category</span>
                                <button onClick={() => toggleProfileFormField('product-category')} className="text-neutral-400 hover:text-destructive-text">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <span className="text-xs text-neutral-400">Category</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-4 grid grid-cols-3 gap-4">
                      {/* Left Column - About & Business Info */}
                      <div className="col-span-2 space-y-3">
                        {/* About Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[100px] transition-colors ${
                            draggedField === 'form:company-intro'
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField === 'form:company-intro' && !editStepProfileSettings.selectedFormFields.includes('company-intro')) {
                              toggleProfileFormField('company-intro')
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">About / Introduction</p>
                          {editStepProfileSettings.selectedFormFields.includes('company-intro') ? (
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-neutral-500 flex-1">Company introduction text will appear here...</p>
                              <button onClick={() => toggleProfileFormField('company-intro')} className="text-neutral-400 hover:text-destructive-text ml-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-neutral-400">Drop Company Introduction here</span>
                          )}
                        </div>

                        {/* Business Info Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[80px] transition-colors ${
                            draggedField && ['form:business-number', 'form:representative', 'form:address'].includes(draggedField)
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField) {
                              const [type, id] = draggedField.split(':')
                              if (type === 'form' && ['business-number', 'representative', 'address'].includes(id) && !editStepProfileSettings.selectedFormFields.includes(id)) {
                                toggleProfileFormField(id)
                              }
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Business Information</p>
                          <div className="space-y-1">
                            {['representative', 'business-number', 'address'].map(fieldId => {
                              const field = APPLICATION_FORM_FIELDS.find(f => f.id === fieldId)
                              if (!editStepProfileSettings.selectedFormFields.includes(fieldId)) return null
                              return (
                                <div key={fieldId} className="flex items-center justify-between bg-white rounded p-2 border border-neutral-200">
                                  <span className="text-xs text-neutral-950">{field?.name}</span>
                                  <button onClick={() => toggleProfileFormField(fieldId)} className="text-neutral-400 hover:text-destructive-text">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )
                            })}
                            {!['representative', 'business-number', 'address'].some(id => editStepProfileSettings.selectedFormFields.includes(id)) && (
                              <span className="text-xs text-neutral-400">Drop Representative, Business No., or Address</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Contact */}
                      <div className="space-y-3">
                        {/* Contact Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[100px] transition-colors ${
                            draggedField && ['form:contact-email', 'form:contact-phone', 'form:website', 'member:member-email', 'member:member-phone'].includes(draggedField)
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField) {
                              const [type, id] = draggedField.split(':')
                              if (type === 'form' && ['contact-email', 'contact-phone', 'website'].includes(id) && !editStepProfileSettings.selectedFormFields.includes(id)) {
                                toggleProfileFormField(id)
                              } else if (type === 'member' && ['member-email', 'member-phone'].includes(id) && !editStepProfileSettings.selectedMemberFields.includes(id)) {
                                toggleProfileMemberField(id)
                              }
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Contact Information</p>
                          <div className="space-y-1">
                            {['contact-email', 'contact-phone', 'website'].map(fieldId => {
                              if (!editStepProfileSettings.selectedFormFields.includes(fieldId)) return null
                              const field = APPLICATION_FORM_FIELDS.find(f => f.id === fieldId)
                              return (
                                <div key={fieldId} className="flex items-center justify-between bg-white rounded p-2 border border-neutral-200">
                                  <span className="text-xs text-neutral-950">{field?.name}</span>
                                  <button onClick={() => toggleProfileFormField(fieldId)} className="text-neutral-400 hover:text-destructive-text">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )
                            })}
                            {['member-email', 'member-phone'].map(fieldId => {
                              if (!editStepProfileSettings.selectedMemberFields.includes(fieldId)) return null
                              const field = MEMBER_INFO_FIELDS.find(f => f.id === fieldId)
                              return (
                                <div key={fieldId} className="flex items-center justify-between bg-admin-primary-50 rounded p-2 border border-admin-primary-200">
                                  <span className="text-xs text-admin-primary-700">{field?.name}</span>
                                  <button onClick={() => toggleProfileMemberField(fieldId)} className="text-neutral-400 hover:text-destructive-text">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )
                            })}
                            {!['contact-email', 'contact-phone', 'website'].some(id => editStepProfileSettings.selectedFormFields.includes(id)) &&
                             !['member-email', 'member-phone'].some(id => editStepProfileSettings.selectedMemberFields.includes(id)) && (
                              <span className="text-xs text-neutral-400">Drop contact fields here</span>
                            )}
                          </div>
                        </div>

                        {/* Contact Person Zone */}
                        <div
                          className={`p-3 rounded-md border-2 border-dashed min-h-[80px] transition-colors ${
                            draggedField && ['member:member-name', 'member:member-position', 'member:member-department', 'member:member-company'].includes(draggedField)
                              ? 'border-admin-primary-400 bg-admin-primary-50'
                              : 'border-neutral-300 bg-neutral-50'
                          }`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (draggedField) {
                              const [type, id] = draggedField.split(':')
                              if (type === 'member' && ['member-name', 'member-position', 'member-department', 'member-company'].includes(id) && !editStepProfileSettings.selectedMemberFields.includes(id)) {
                                toggleProfileMemberField(id)
                              }
                            }
                            setDraggedField(null)
                          }}
                        >
                          <p className="text-xs text-neutral-400 mb-2">Contact Person (Member)</p>
                          <div className="space-y-1">
                            {['member-name', 'member-position', 'member-department', 'member-company'].map(fieldId => {
                              if (!editStepProfileSettings.selectedMemberFields.includes(fieldId)) return null
                              const field = MEMBER_INFO_FIELDS.find(f => f.id === fieldId)
                              return (
                                <div key={fieldId} className="flex items-center justify-between bg-admin-primary-50 rounded p-2 border border-admin-primary-200">
                                  <span className="text-xs text-admin-primary-700">{field?.name}</span>
                                  <button onClick={() => toggleProfileMemberField(fieldId)} className="text-neutral-400 hover:text-destructive-text">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )
                            })}
                            {!['member-name', 'member-position', 'member-department', 'member-company'].some(id => editStepProfileSettings.selectedMemberFields.includes(id)) && (
                              <span className="text-xs text-neutral-400">Drop member info here</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-100">
                      <p className="text-xs text-neutral-400 text-center">Booth information will be displayed here automatically</p>
                    </div>
                  </div>
                )}

                {/* PREVIEW MODE */}
                {profileLayoutMode === 'preview' && (
                  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                    {/* Profile Header with Logo */}
                    <div className="relative">
                      {/* Cover Image */}
                      <div className="h-32 bg-gradient-to-r from-admin-primary-100 to-admin-primary-50"></div>

                    {/* Logo & Company Name */}
                    <div className="px-6 pb-4">
                      <div className="flex items-end gap-4 -mt-10">
                        {/* Company Logo */}
                        {editStepProfileSettings.selectedFormFields.includes('company-logo') ? (
                          <div className="relative group">
                            <div className="w-24 h-24 bg-white rounded-lg border-4 border-white shadow-sm flex items-center justify-center">
                              <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <button
                              onClick={() => toggleProfileFormField('company-logo')}
                              className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-neutral-100 rounded-lg border-4 border-white shadow-sm flex items-center justify-center">
                            <span className="text-xs text-neutral-400">No Logo</span>
                          </div>
                        )}

                        <div className="flex-1 pb-2">
                          {/* Company Name */}
                          {editStepProfileSettings.selectedFormFields.includes('company-name') ? (
                            <div className="relative group inline-block">
                              <h1 className="text-2xl font-bold text-neutral-950">Company Name Inc.</h1>
                              <button
                                onClick={() => toggleProfileFormField('company-name')}
                                className="absolute -top-1 -right-4 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <p className="text-lg text-neutral-400">Company name not displayed</p>
                          )}

                          {/* Product Category */}
                          {editStepProfileSettings.selectedFormFields.includes('product-category') && (
                            <div className="relative group inline-block mt-1">
                              <span className="px-2 py-1 text-xs font-medium bg-admin-primary-50 text-admin-primary-700 rounded">Furniture & Interior</span>
                              <button
                                onClick={() => toggleProfileFormField('product-category')}
                                className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Content */}
                  <div className="px-6 py-5 border-t border-neutral-100">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Left Column - Company Info */}
                      <div className="col-span-2 space-y-5">
                        {/* Company Introduction */}
                        {editStepProfileSettings.selectedFormFields.includes('company-intro') && (
                          <div className="relative group">
                            <h3 className="text-sm font-semibold text-neutral-950 mb-2">About</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                            </p>
                            <button
                              onClick={() => toggleProfileFormField('company-intro')}
                              className="absolute -top-1 right-0 p-1 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Business Info Section */}
                        {(editStepProfileSettings.selectedFormFields.includes('business-number') ||
                          editStepProfileSettings.selectedFormFields.includes('representative') ||
                          editStepProfileSettings.selectedFormFields.includes('address')) && (
                          <div className="bg-neutral-50 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-neutral-950 mb-3">Business Information</h3>
                            <div className="space-y-2">
                              {editStepProfileSettings.selectedFormFields.includes('representative') && (
                                <div className="flex items-center justify-between relative group">
                                  <span className="text-sm text-neutral-500">Representative</span>
                                  <span className="text-sm text-neutral-950">John Smith</span>
                                  <button
                                    onClick={() => toggleProfileFormField('representative')}
                                    className="absolute -right-2 top-0 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                              {editStepProfileSettings.selectedFormFields.includes('business-number') && (
                                <div className="flex items-center justify-between relative group">
                                  <span className="text-sm text-neutral-500">Business No.</span>
                                  <span className="text-sm text-neutral-950">123-45-67890</span>
                                  <button
                                    onClick={() => toggleProfileFormField('business-number')}
                                    className="absolute -right-2 top-0 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                              {editStepProfileSettings.selectedFormFields.includes('address') && (
                                <div className="flex items-center justify-between relative group">
                                  <span className="text-sm text-neutral-500">Address</span>
                                  <span className="text-sm text-neutral-950">123 Business St, Seoul</span>
                                  <button
                                    onClick={() => toggleProfileFormField('address')}
                                    className="absolute -right-2 top-0 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right Column - Contact Info */}
                      <div className="space-y-4">
                        {/* Contact Card */}
                        <div className="bg-neutral-50 rounded-md p-4">
                          <h3 className="text-sm font-semibold text-neutral-950 mb-3">Contact</h3>
                          <div className="space-y-3">
                            {/* Member/Form Contact Fields */}
                            {(editStepProfileSettings.selectedMemberFields.includes('member-email') ||
                              editStepProfileSettings.selectedFormFields.includes('contact-email')) && (
                              <div className="flex items-center gap-2 relative group">
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm text-neutral-950">contact@company.com</span>
                                <button
                                  onClick={() => {
                                    if (editStepProfileSettings.selectedMemberFields.includes('member-email')) {
                                      toggleProfileMemberField('member-email')
                                    } else {
                                      toggleProfileFormField('contact-email')
                                    }
                                  }}
                                  className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {(editStepProfileSettings.selectedMemberFields.includes('member-phone') ||
                              editStepProfileSettings.selectedFormFields.includes('contact-phone')) && (
                              <div className="flex items-center gap-2 relative group">
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm text-neutral-950">+82-2-1234-5678</span>
                                <button
                                  onClick={() => {
                                    if (editStepProfileSettings.selectedMemberFields.includes('member-phone')) {
                                      toggleProfileMemberField('member-phone')
                                    } else {
                                      toggleProfileFormField('contact-phone')
                                    }
                                  }}
                                  className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                            {editStepProfileSettings.selectedFormFields.includes('website') && (
                              <div className="flex items-center gap-2 relative group">
                                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="text-sm text-admin-primary-600 underline">www.company.com</span>
                                <button
                                  onClick={() => toggleProfileFormField('website')}
                                  className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Person Info */}
                        {(editStepProfileSettings.selectedMemberFields.includes('member-name') ||
                          editStepProfileSettings.selectedMemberFields.includes('member-position') ||
                          editStepProfileSettings.selectedMemberFields.includes('member-department')) && (
                          <div className="bg-admin-primary-50 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-neutral-950 mb-3">Contact Person</h3>
                            <div className="space-y-1">
                              {editStepProfileSettings.selectedMemberFields.includes('member-name') && (
                                <div className="relative group">
                                  <p className="text-sm font-medium text-neutral-950">Jane Doe</p>
                                  <button
                                    onClick={() => toggleProfileMemberField('member-name')}
                                    className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                              {editStepProfileSettings.selectedMemberFields.includes('member-position') && (
                                <div className="relative group">
                                  <p className="text-xs text-neutral-600">Marketing Manager</p>
                                  <button
                                    onClick={() => toggleProfileMemberField('member-position')}
                                    className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                              {editStepProfileSettings.selectedMemberFields.includes('member-department') && (
                                <div className="relative group">
                                  <p className="text-xs text-neutral-500">Marketing Dept.</p>
                                  <button
                                    onClick={() => toggleProfileMemberField('member-department')}
                                    className="absolute -right-1 -top-1 p-0.5 bg-white rounded-full shadow-sm text-neutral-400 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Empty State */}
                    {editStepProfileSettings.selectedFormFields.length === 0 && editStepProfileSettings.selectedMemberFields.length === 0 && (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-neutral-400">Drag fields from the left panel to build the company profile layout</p>
                      </div>
                    )}
                  </div>

                  {/* Booth Info Footer */}
                  <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-neutral-600">Booth A-123 · Hall 1</span>
                      </div>
                      <button className="text-sm text-admin-primary-600 font-medium">View Products →</button>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Selector */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-neutral-950">Registration Processes</h2>
            <p className="text-sm text-neutral-500">Manage different registration flows for exhibitors</p>
          </div>
          <button
            onClick={() => setIsAddingProcess(true)}
            className="btn btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Process
          </button>
        </div>

        {isAddingProcess && (
          <div className="mb-4 p-3 bg-neutral-50 rounded-md flex items-center gap-3">
            <input
              type="text"
              value={newProcessName}
              onChange={(e) => setNewProcessName(e.target.value)}
              placeholder="Process name"
              className="flex-1 px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
              autoFocus
            />
            <button onClick={addProcess} className="btn btn-primary text-sm">Add</button>
            <button onClick={() => { setIsAddingProcess(false); setNewProcessName('') }} className="btn btn-secondary text-sm">Cancel</button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {processes.map((process) => (
            <div
              key={process.id}
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors ${
                selectedProcessId === process.id
                  ? 'border-admin-primary-500 bg-admin-primary-50 text-admin-primary-700'
                  : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
              }`}
              onClick={() => setSelectedProcessId(process.id)}
            >
              <span className="text-sm font-medium">{process.name}</span>
              {process.isDefault && (
                <Badge variant="compact" color="primary">Default</Badge>
              )}
              {!process.isDefault && selectedProcessId === process.id && (
                <div className="flex items-center gap-1 ml-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); setAsDefault(process.id) }}
                    className="p-1 text-neutral-400 hover:text-admin-primary-600"
                    title="Set as default"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteProcess(process.id) }}
                    className="p-1 text-neutral-400 hover:text-destructive-text"
                    title="Delete process"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      {selectedProcess && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-neutral-950">{selectedProcess.name} Steps</h2>
              <p className="text-sm text-neutral-500">Configure the steps in your exhibitor registration flow</p>
            </div>
            <button
              onClick={openAddStepModal}
              className="btn btn-secondary text-sm"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Step
            </button>
          </div>

          <div className="space-y-2">
            {selectedProcess.steps.map((step, index) => (
              <div
                key={step.id}
                className={`group flex items-center gap-3 p-3 rounded-md border transition-colors ${
                  step.enabled ? 'bg-white border-neutral-200 hover:border-neutral-300' : 'bg-neutral-50 border-neutral-100'
                }`}
              >
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => moveStep(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveStep(index, 'down')}
                    disabled={index === selectedProcess.steps.length - 1}
                    className="p-1 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Step Number */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  step.enabled ? 'bg-admin-primary-100 text-admin-primary-700' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {index + 1}
                </div>

                {/* Step Info - Clickable to Edit */}
                <button
                  onClick={() => openEditPanel(step)}
                  className="flex-1 min-w-0 text-left"
                >
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium ${step.enabled ? 'text-neutral-950' : 'text-neutral-400'}`}>
                      {step.name}
                    </p>
                    <Badge variant="compact" color="neutral">
                      {getModuleName(step.moduleId)}
                    </Badge>
                  </div>
                  <p className={`text-xs ${step.enabled ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    {step.moduleId === 'terms' && step.selectedTerms && step.selectedTerms.length > 0 ? (
                      <>{step.selectedTerms.length} terms selected</>
                    ) : step.moduleId === 'application' && step.selectedFormId ? (
                      <>Form: {AVAILABLE_FORMS.find(f => f.id === step.selectedFormId)?.name || 'Unknown'}</>
                    ) : step.moduleId === 'booth-selection' && step.selectedBooths && step.selectedBooths.length > 0 ? (
                      <>
                        {step.selectedBooths.length} booth type{step.selectedBooths.length > 1 ? 's' : ''} available
                        {step.selectedBooths.some(b => b.discountIds.length > 0) && (
                          <span className="ml-1 text-status-success-border">
                            (with discounts)
                          </span>
                        )}
                      </>
                    ) : step.moduleId === 'extras' && step.selectedExtras && step.selectedExtras.length > 0 ? (
                      <>
                        {step.selectedExtras.length} extra{step.selectedExtras.length > 1 ? 's' : ''} enabled
                        {step.selectedExtras.some(e => e.useConditionalVisibility) && (
                          // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative badge
                          <span className="ml-1 text-amber-600">
                            ({step.selectedExtras.filter(e => e.useConditionalVisibility).length} conditional)
                          </span>
                        )}
                      </>
                    ) : step.moduleId === 'contract' && step.contractSettings ? (
                      <>
                        {step.contractSettings.installments.map(i => `${i.percentage}%`).join(' / ')}
                        {step.contractSettings.invoiceTemplateId && (
                          <span className="ml-1 text-neutral-400">
                            · {AVAILABLE_INVOICE_TEMPLATES.find(t => t.id === step.contractSettings?.invoiceTemplateId)?.name}
                          </span>
                        )}
                      </>
                    ) : step.moduleId === 'product-registration' && step.productSettings ? (
                      <>
                        {AVAILABLE_PRODUCT_FORMS.find(f => f.id === step.productSettings?.productFormId)?.name || 'No form selected'}
                        {step.productSettings.selectedDisplayFields.length > 0 && (
                          <span className="ml-1 text-neutral-400">
                            · {step.productSettings.selectedDisplayFields.length} display fields
                          </span>
                        )}
                      </>
                    ) : step.moduleId === 'company-profile' && step.profileDisplaySettings ? (
                      <>
                        {step.profileDisplaySettings.selectedFormFields.length + step.profileDisplaySettings.selectedMemberFields.length} fields selected
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                </button>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {/* Toggle - Always Visible */}
                  <label className="relative inline-flex items-center cursor-pointer" title={step.enabled ? 'Disable step' : 'Enable step'}>
                    <input
                      type="checkbox"
                      checked={step.enabled}
                      onChange={() => toggleStep(step.id)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-admin-primary-600"></div>
                  </label>

                  {/* Delete - Shows on Hover */}
                  <button
                    onClick={() => deleteStep(step.id)}
                    className="p-1.5 text-neutral-300 hover:text-destructive-text opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete step"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-start">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  )
}

function BoothsTab() {
  const [boothTypes, setBoothTypes] = useState([
    { id: 1, name: 'Standard Booth (3m x 3m)', price: 2500000, currency: 'KRW', note: 'Basic booth with shell scheme', applicationPeriod: { ko: { start: '2026-01-15', end: '2026-03-31' }, en: { start: '2026-01-15', end: '2026-03-31' } } },
    { id: 2, name: 'Premium Booth (6m x 3m)', price: 4500000, currency: 'KRW', note: 'Double-sized booth with premium location', applicationPeriod: { ko: { start: '2026-01-15', end: '2026-03-31' }, en: { start: '2026-01-15', end: '2026-03-31' } } },
    { id: 3, name: 'Corner Booth (6m x 6m)', price: 7000000, currency: 'KRW', note: 'Corner position with two open sides', applicationPeriod: { ko: { start: '2026-01-15', end: '2026-03-15' }, en: { start: '2026-01-15', end: '2026-03-15' } } },
    { id: 4, name: 'Island Booth (9m x 9m)', price: 15000000, currency: 'KRW', note: 'Premium island booth, 4 open sides', applicationPeriod: { ko: { start: '2026-01-15', end: '2026-02-28' }, en: { start: '2026-01-15', end: '2026-02-28' } } },
    { id: 5, name: 'Mini Booth (2m x 2m)', price: 1500000, currency: 'KRW', note: 'For startups and small businesses', applicationPeriod: { ko: { start: '2026-02-01', end: '2026-03-31' }, en: { start: '2026-02-01', end: '2026-03-31' } } },
  ])

  const [discounts, setDiscounts] = useState([
    { id: 1, name: 'Early Bird Discount', type: 'percentage', value: 10, condition: 'Apply before Feb 28, 2026', enabled: true },
    { id: 2, name: 'Returning Exhibitor', type: 'percentage', value: 5, condition: 'Participated in previous edition', enabled: true },
    { id: 3, name: 'Multiple Booth Discount', type: 'percentage', value: 15, condition: '3 or more booths', enabled: false },
  ])

  const [showFloorPlanSuggestion, setShowFloorPlanSuggestion] = useState(true)
  const [isEditBoothOpen, setIsEditBoothOpen] = useState(false)
  const [editingBooth, setEditingBooth] = useState<typeof boothTypes[0] | null>(null)
  const [editBoothUseCustomLangPeriod, setEditBoothUseCustomLangPeriod] = useState(false)
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false)

  const openEditBooth = (booth: typeof boothTypes[0]) => {
    setEditingBooth(booth)
    setEditBoothUseCustomLangPeriod(false)
    setIsEditBoothOpen(true)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-5">
      {/* Booth Types */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-neutral-950">Booth Types</h2>
            <p className="text-sm text-neutral-500">Define booth types and pricing</p>
          </div>
          <button className="btn btn-secondary text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Booth Type
          </button>
        </div>

        <div className="border border-neutral-200 rounded-md overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Booth Name</th>
                <th>Price</th>
                <th>Note</th>
                <th>Application Period</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {boothTypes.map((booth) => (
                <tr key={booth.id}>
                  <td>
                    <p className="text-sm font-medium text-neutral-950">{booth.name}</p>
                  </td>
                  <td>
                    <p className="text-sm font-semibold text-admin-primary-700">{booth.price.toLocaleString()} {booth.currency}</p>
                  </td>
                  <td>
                    <p className="text-sm text-neutral-500">{booth.note}</p>
                  </td>
                  <td>
                    <div className="space-y-1">
                      {Object.entries(booth.applicationPeriod).slice(0, 2).map(([langCode, period]) => (
                        <div key={langCode} className="flex items-center gap-1.5 text-xs">
                          <span className="text-base">{WEBSITE_LANGUAGES.find(l => l.code === langCode)?.flag}</span>
                          <span className="text-neutral-600">{formatDate(period.start)} - {formatDate(period.end)}</span>
                        </div>
                      ))}
                      {Object.keys(booth.applicationPeriod).length > 2 && (
                        <p className="text-xs text-neutral-400">+{Object.keys(booth.applicationPeriod).length - 2} more languages</p>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditBooth(booth)}
                        className="p-1.5 text-neutral-400 hover:text-admin-primary-600 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-neutral-400 hover:text-destructive-text transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discounts */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-neutral-950">Discounts</h2>
            <p className="text-sm text-neutral-500">Configure discount options for booth pricing</p>
          </div>
          <button
            onClick={() => setIsAddDiscountOpen(true)}
            className="btn btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Discount
          </button>
        </div>

        <div className="border border-neutral-200 rounded-md overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th>Discount Name</th>
                <th>Value</th>
                <th>Condition</th>
                <th className="text-center">Enabled</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td>
                    <p className="text-sm font-medium text-neutral-950">{discount.name}</p>
                  </td>
                  <td>
                    <span className="px-2 py-1 text-sm font-semibold text-status-success-text bg-status-success-bg rounded">
                      {discount.type === 'percentage' ? `${discount.value}%` : `${discount.value.toLocaleString()} KRW`}
                    </span>
                  </td>
                  <td>
                    <p className="text-sm text-neutral-500">{discount.condition}</p>
                  </td>
                  <td className="text-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={discount.enabled}
                        onChange={() => {
                          setDiscounts(d => d.map(item =>
                            item.id === discount.id ? { ...item, enabled: !item.enabled } : item
                          ))
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-admin-primary-600"></div>
                    </label>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-neutral-400 hover:text-admin-primary-600 transition-colors" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1.5 text-neutral-400 hover:text-destructive-text transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floor Plan Integration Suggestion */}
      {showFloorPlanSuggestion && (
        <div className="bg-status-info-bg border border-status-info-border rounded-md p-4">
          <div className="flex items-start gap-3">
            {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative info icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg className="w-5 h-5 text-status-info-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-status-info-text">Floor Plan Integration</h3>
              <p className="text-sm text-status-info-text mt-1">
                Integrate with floor plan services like Expofp, Map Your Show, or ExpoFP to provide interactive booth selection for exhibitors.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button className="px-3 py-1.5 text-sm font-medium text-admin-primary-700 bg-admin-primary-100 hover:bg-admin-primary-200 rounded-md transition-colors">
                  Learn More
                </button>
                <button className="px-3 py-1.5 text-sm font-medium text-admin-primary-600 hover:text-admin-primary-800 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowFloorPlanSuggestion(false)}
              className="flex-shrink-0 p-1 text-admin-primary-400 hover:text-admin-primary-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Edit Booth Slide Panel */}
      {isEditBoothOpen && editingBooth && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setIsEditBoothOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-[480px] bg-white shadow-lg z-50 flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Edit Booth Type</h3>
              <button onClick={() => setIsEditBoothOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Booth Name</label>
                <input
                  type="text"
                  defaultValue={editingBooth.name}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Price (KRW)</label>
                <input
                  type="number"
                  defaultValue={editingBooth.price}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Note</label>
                <textarea
                  defaultValue={editingBooth.note}
                  rows={2}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              {/* Application Period */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Application Period</label>

                {/* Default Period (applies to all languages) */}
                {!editBoothUseCustomLangPeriod && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">Start Date</label>
                      <input
                        type="date"
                        defaultValue={(editingBooth.applicationPeriod as MultiLangPeriod)['ko']?.start || ''}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-500 mb-1">End Date</label>
                      <input
                        type="date"
                        defaultValue={(editingBooth.applicationPeriod as MultiLangPeriod)['ko']?.end || ''}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                      />
                    </div>
                  </div>
                )}

                {/* Custom Language Period Toggle */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editBoothUseCustomLangPeriod}
                    onChange={() => setEditBoothUseCustomLangPeriod(!editBoothUseCustomLangPeriod)}
                    className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                  />
                  <span className="text-sm text-neutral-600">Set different periods for each language</span>
                </label>

                {/* Per-Language Periods */}
                {editBoothUseCustomLangPeriod && (
                  <div className="mt-3 space-y-2">
                    {WEBSITE_LANGUAGES.map((lang) => (
                      <div key={lang.code} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-md">
                        <div className="flex items-center gap-1.5 w-20">
                          <span className="text-base">{lang.flag}</span>
                          <span className="text-xs font-medium text-neutral-950">{lang.name}</span>
                        </div>
                        <input
                          type="date"
                          defaultValue={(editingBooth.applicationPeriod as MultiLangPeriod)[lang.code]?.start || ''}
                          className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                        />
                        <span className="text-neutral-400">~</span>
                        <input
                          type="date"
                          defaultValue={(editingBooth.applicationPeriod as MultiLangPeriod)[lang.code]?.end || ''}
                          className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsEditBoothOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => setIsEditBoothOpen(false)} className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </>
      )}

      {/* Add Discount Modal */}
      {isAddDiscountOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Add Discount</h3>
              <button onClick={() => setIsAddDiscountOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Discount Name</label>
                <input
                  type="text"
                  placeholder="e.g., Early Bird Discount"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Type</label>
                  <select className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (KRW)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Value</label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Condition</label>
                <input
                  type="text"
                  placeholder="e.g., Apply before Feb 28, 2026"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsAddDiscountOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => setIsAddDiscountOpen(false)} className="btn btn-primary">Add Discount</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start">
        <button className="btn btn-primary">Save Changes</button>
      </div>
    </div>
  )
}

interface CurrencyPrice {
  currency: string
  price: number
}

interface ExtraCategory {
  id: string
  name: string
  type: 'quote' | 'form'
  enabled: boolean
  isCustom: boolean
  linkedFormId?: string
  items?: QuoteItem[]
  applicationPeriod?: MultiLangPeriod
  useCustomLangPeriod?: boolean
}

interface QuoteItem {
  id: string
  name: string
  prices: CurrencyPrice[]
  minQty: number
  maxQty: number
  discountPercent: number
}

const SUPPORTED_CURRENCIES = [
  { code: 'KRW', symbol: '₩', name: 'Korean Won' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
]

function ExtrasTab() {
  const [categories, setCategories] = useState<ExtraCategory[]>([
    { id: 'facilities', name: 'Facilities', type: 'quote', enabled: true, isCustom: false, items: [], applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'equipments', name: 'Equipments', type: 'quote', enabled: true, isCustom: false, items: [], applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'furnitures', name: 'Furnitures', type: 'quote', enabled: false, isCustom: false, items: [], applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'signboard', name: 'Signboard', type: 'form', enabled: true, isCustom: false, linkedFormId: 'form-1', applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'passcards', name: 'Passcards', type: 'form', enabled: true, isCustom: false, linkedFormId: 'form-2', applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'invitation-cards', name: 'Invitation Cards', type: 'form', enabled: false, isCustom: false, applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'constructions', name: 'Constructions', type: 'form', enabled: true, isCustom: false, linkedFormId: 'form-3', applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'hazards', name: 'Hazards', type: 'form', enabled: false, isCustom: false, applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'weights', name: 'Weights', type: 'form', enabled: false, isCustom: false, applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
    { id: 'customs-bonds', name: 'Customs Bonds', type: 'form', enabled: false, isCustom: false, applicationPeriod: { ko: { start: '2026-01-01', end: '2026-03-31' }, en: { start: '2026-01-01', end: '2026-03-31' } } },
  ])

  const [selectedCategory, setSelectedCategory] = useState<ExtraCategory | null>(null)
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false)
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [isFormPreviewOpen, setIsFormPreviewOpen] = useState(false)
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false)
  const [previewFormId, setPreviewFormId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', type: 'form' as 'quote' | 'form' })
  const [newItem, setNewItem] = useState<QuoteItem>({
    id: '',
    name: '',
    prices: [{ currency: 'KRW', price: 0 }],
    minQty: 1,
    maxQty: 100,
    discountPercent: 0
  })

  const availableForms = [
    { id: 'form-1', name: 'Signboard Application Form', fields: 8 },
    { id: 'form-2', name: 'Passcard Request Form', fields: 6 },
    { id: 'form-3', name: 'Construction Permit Form', fields: 12 },
    { id: 'form-4', name: 'General Request Form', fields: 5 },
  ]

  const openFormPreview = (formId: string) => {
    setPreviewFormId(formId)
    setIsFormPreviewOpen(true)
  }

  const openFormBuilder = (formId: string) => {
    setPreviewFormId(formId)
    setIsFormBuilderOpen(true)
  }

  const toggleCategory = (id: string) => {
    setCategories(cats => cats.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))
  }

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return
    const newCat: ExtraCategory = {
      id: `custom-${Date.now()}`,
      name: newCategory.name,
      type: newCategory.type,
      enabled: true,
      isCustom: true,
      items: newCategory.type === 'quote' ? [] : undefined,
      applicationPeriod: { ko: { start: '', end: '' }, en: { start: '', end: '' } }
    }
    setCategories([...categories, newCat])
    setNewCategory({ name: '', type: 'form' })
    setIsAddCategoryModalOpen(false)
  }

  const handleAddItem = () => {
    if (!selectedCategory || !newItem.name.trim()) return
    const item: QuoteItem = { ...newItem, id: `item-${Date.now()}` }
    setCategories(cats => cats.map(c =>
      c.id === selectedCategory.id
        ? { ...c, items: [...(c.items || []), item] }
        : c
    ))
    setNewItem({
      id: '',
      name: '',
      prices: [{ currency: 'KRW', price: 0 }],
      minQty: 1,
      maxQty: 100,
      discountPercent: 0
    })
    setIsAddItemModalOpen(false)
  }

  const updateNewItemPrice = (currency: string, price: number) => {
    setNewItem(item => ({
      ...item,
      prices: item.prices.some(p => p.currency === currency)
        ? item.prices.map(p => p.currency === currency ? { ...p, price } : p)
        : [...item.prices, { currency, price }]
    }))
  }

  const toggleNewItemCurrency = (currency: string) => {
    setNewItem(item => ({
      ...item,
      prices: item.prices.some(p => p.currency === currency)
        ? item.prices.filter(p => p.currency !== currency)
        : [...item.prices, { currency, price: 0 }]
    }))
  }

  const handleDeleteItem = (categoryId: string, itemId: string) => {
    setCategories(cats => cats.map(c =>
      c.id === categoryId
        ? { ...c, items: (c.items || []).filter(i => i.id !== itemId) }
        : c
    ))
  }

  const handleLinkForm = (categoryId: string, formId: string) => {
    setCategories(cats => cats.map(c =>
      c.id === categoryId ? { ...c, linkedFormId: formId } : c
    ))
  }

  const handleUpdatePeriod = (categoryId: string, langCode: string, field: 'start' | 'end', value: string) => {
    setCategories(cats => cats.map(c => {
      if (c.id !== categoryId) return c
      const currentPeriod = c.applicationPeriod || {}
      const currentLangPeriod = currentPeriod[langCode] || { start: '', end: '' }
      return {
        ...c,
        applicationPeriod: {
          ...currentPeriod,
          [langCode]: {
            ...currentLangPeriod,
            [field]: value
          }
        }
      } as ExtraCategory
    }))
  }

  const handleUpdateDefaultPeriod = (categoryId: string, field: 'start' | 'end', value: string) => {
    setCategories(cats => cats.map(c => {
      if (c.id !== categoryId) return c
      const currentDefault = c.applicationPeriod?.['default'] || { start: '', end: '' }
      const newPeriod = { ...currentDefault, [field]: value }
      const allLangPeriod: MultiLangPeriod = { default: newPeriod }
      WEBSITE_LANGUAGES.forEach(lang => { allLangPeriod[lang.code] = newPeriod })
      return { ...c, applicationPeriod: allLangPeriod } as ExtraCategory
    }))
  }

  const toggleCustomLangPeriod = (categoryId: string) => {
    setCategories(cats => cats.map(c =>
      c.id === categoryId ? { ...c, useCustomLangPeriod: !c.useCustomLangPeriod } as ExtraCategory : c
    ))
  }

  return (
    <div className="space-y-5">
      {/* GSC Payment Integration Notice */}
      <div className="bg-status-info-bg border border-status-info-border rounded-lg p-4">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative info icon */}
          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-status-info-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-status-info-text">GSC Direct Payment Module</h3>
            <p className="text-sm text-status-info-text mt-1">
              You can integrate the GSC direct payment module to allow exhibitors to pay for extras directly to your GSC partner.
            </p>
            <button className="mt-2 text-sm font-medium text-admin-primary-600 hover:text-admin-primary-800 inline-flex items-center gap-1">
              Learn more
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-neutral-950">Additional Usage Categories</h2>
            <p className="text-sm text-neutral-500">Manage categories for exhibitor additional services</p>
          </div>
          <button
            onClick={() => setIsAddCategoryModalOpen(true)}
            className="btn btn-secondary text-sm"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Custom Category
          </button>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`border rounded-lg overflow-hidden transition-all ${
                selectedCategory?.id === category.id ? 'border-admin-primary-300 ring-1 ring-admin-primary-200' : 'border-neutral-200'
              }`}
            >
              {/* Category Header */}
              <div
                className="flex items-center justify-between p-3 bg-neutral-50 cursor-pointer hover:bg-neutral-100 transition-colors"
                onClick={() => setSelectedCategory(selectedCategory?.id === category.id ? null : category)}
              >
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={category.enabled}
                      onChange={() => toggleCategory(category.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-admin-primary-600"></div>
                  </label>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-950">{category.name}</span>
                      {category.isCustom && (
                        <Badge variant="compact" color="neutral">Custom</Badge>
                      )}
                    </div>
                    <Badge variant="category" color={category.type === 'quote' ? 'purple' : 'green'}>
                      {category.type === 'quote' ? 'Quote-based' : 'Form-based'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {category.type === 'form' && category.linkedFormId && (
                    <span className="text-xs text-neutral-500">Form linked</span>
                  )}
                  {category.type === 'quote' && category.items && (
                    <span className="text-xs text-neutral-500">{category.items.length} items</span>
                  )}
                  <svg className={`w-4 h-4 text-neutral-400 transition-transform ${selectedCategory?.id === category.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Content */}
              {selectedCategory?.id === category.id && (
                <div className="p-4 border-t border-neutral-200 bg-white">
                  {/* Application Period */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Application Period</label>

                    {/* Default Period (applies to all languages) */}
                    {!category.useCustomLangPeriod && (
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">Start Date</label>
                          <input
                            type="date"
                            value={category.applicationPeriod?.['default']?.start || category.applicationPeriod?.['ko']?.start || ''}
                            onChange={(e) => handleUpdateDefaultPeriod(category.id, 'start', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-neutral-500 mb-1">End Date</label>
                          <input
                            type="date"
                            value={category.applicationPeriod?.['default']?.end || category.applicationPeriod?.['ko']?.end || ''}
                            onChange={(e) => handleUpdateDefaultPeriod(category.id, 'end', e.target.value)}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Custom Language Period Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={category.useCustomLangPeriod || false}
                        onChange={() => toggleCustomLangPeriod(category.id)}
                        className="w-4 h-4 text-admin-primary-600 rounded focus:ring-admin-primary-500"
                      />
                      <span className="text-sm text-neutral-600">Set different periods for each language</span>
                    </label>

                    {/* Per-Language Periods */}
                    {category.useCustomLangPeriod && (
                      <div className="mt-3 space-y-2">
                        {WEBSITE_LANGUAGES.map((lang) => (
                          <div key={lang.code} className="flex items-center gap-3 p-2 bg-neutral-50 rounded-md">
                            <div className="flex items-center gap-1.5 w-20">
                              <span className="text-base">{lang.flag}</span>
                              <span className="text-xs font-medium text-neutral-950">{lang.name}</span>
                            </div>
                            <input
                              type="date"
                              value={category.applicationPeriod?.[lang.code]?.start || ''}
                              onChange={(e) => handleUpdatePeriod(category.id, lang.code, 'start', e.target.value)}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                            <span className="text-neutral-400">~</span>
                            <input
                              type="date"
                              value={category.applicationPeriod?.[lang.code]?.end || ''}
                              onChange={(e) => handleUpdatePeriod(category.id, lang.code, 'end', e.target.value)}
                              className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Form-based Category */}
                  {category.type === 'form' && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Linked Application Form</label>
                      <select
                        value={category.linkedFormId || ''}
                        onChange={(e) => handleLinkForm(category.id, e.target.value)}
                        className="w-full max-w-sm px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                      >
                        <option value="">Select a form...</option>
                        {availableForms.map(form => (
                          <option key={form.id} value={form.id}>{form.name}</option>
                        ))}
                      </select>
                      <p className="mt-2 text-xs text-neutral-500">
                        Connect an application form from the Form Builder for exhibitors to submit requests.
                      </p>

                      {/* Preview & Edit Form Buttons */}
                      {category.linkedFormId && (
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => openFormPreview(category.linkedFormId!)}
                            className="flex-1 max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Preview Form
                          </button>
                          <button
                            onClick={() => openFormBuilder(category.linkedFormId!)}
                            className="flex-1 max-w-[160px] flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-admin-primary-700 bg-admin-primary-100 hover:bg-admin-primary-200 rounded-md transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Form
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quote-based Category */}
                  {category.type === 'quote' && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-medium text-neutral-700">Quote Items</label>
                        <button
                          onClick={() => {
                            setSelectedCategory(category)
                            setIsAddItemModalOpen(true)
                          }}
                          className="text-sm text-admin-primary-700 hover:text-admin-primary-800 font-medium inline-flex items-center gap-1"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Item
                        </button>
                      </div>

                      {category.items && category.items.length > 0 ? (
                        <div className="border border-neutral-200 rounded-md overflow-hidden">
                          <table className="table text-sm">
                            <thead>
                              <tr>
                                <th>Item Name</th>
                                <th>Unit Prices</th>
                                <th className="text-center">Qty Range</th>
                                <th className="text-center">Discount</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.items.map(item => (
                                <tr key={item.id}>
                                  <td className="font-medium text-neutral-950">{item.name}</td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.prices.map(p => {
                                        const curr = SUPPORTED_CURRENCIES.find(c => c.code === p.currency)
                                        return (
                                          <Badge key={p.currency} variant="tag">
                                            <span className="font-medium">{curr?.symbol || p.currency}</span>
                                            <span className="ml-1">{p.price.toLocaleString()}</span>
                                          </Badge>
                                        )
                                      })}
                                    </div>
                                  </td>
                                  <td className="text-center text-neutral-600 text-xs">
                                    {item.minQty} ~ {item.maxQty}
                                  </td>
                                  <td className="text-center">
                                    {item.discountPercent > 0 ? (
                                      // eslint-disable-next-line custom/no-raw-tailwind-colors -- decorative discount
                                      <span className="text-red-600 text-xs font-medium">-{item.discountPercent}%</span>
                                    ) : (
                                      <span className="text-neutral-400">-</span>
                                    )}
                                  </td>
                                  <td className="text-right">
                                    <button
                                      onClick={() => handleDeleteItem(category.id, item.id)}
                                      className="p-1 text-neutral-400 hover:text-destructive-text"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="border border-dashed border-neutral-300 rounded-md p-6 text-center">
                          <svg className="w-8 h-8 text-neutral-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-sm text-neutral-500">No items added yet</p>
                          <p className="text-xs text-neutral-400 mt-1">Add items with unit price, quantity limits, and discounts</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Delete Custom Category */}
                  {category.isCustom && (
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <button
                        onClick={() => setCategories(cats => cats.filter(c => c.id !== category.id))}
                        className="text-sm text-destructive-text hover:text-destructive-hover font-medium"
                      >
                        Delete this category
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start">
        <button className="btn btn-primary">Save Changes</button>
      </div>

      {/* Add Category Modal */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
            <h3 className="text-lg font-semibold text-neutral-950 mb-4">Add Custom Category</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g., Storage Service"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Category Type</label>
                <div className="flex gap-3">
                  <label className={`flex-1 p-3 border rounded-md cursor-pointer transition-all ${
                    newCategory.type === 'form' ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="categoryType"
                      value="form"
                      checked={newCategory.type === 'form'}
                      onChange={() => setNewCategory({ ...newCategory, type: 'form' })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium text-neutral-950">Form-based</div>
                      <div className="text-xs text-neutral-500 mt-1">Link to application form</div>
                    </div>
                  </label>
                  <label className={`flex-1 p-3 border rounded-md cursor-pointer transition-all ${
                    newCategory.type === 'quote' ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:bg-neutral-50'
                  }`}>
                    <input
                      type="radio"
                      name="categoryType"
                      value="quote"
                      checked={newCategory.type === 'quote'}
                      onChange={() => setNewCategory({ ...newCategory, type: 'quote' })}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className="text-sm font-medium text-neutral-950">Quote-based</div>
                      <div className="text-xs text-neutral-500 mt-1">Add items with pricing</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddCategoryModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="btn btn-primary"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {isAddItemModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-5">
            <h3 className="text-lg font-semibold text-neutral-950 mb-4">Add Quote Item</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Additional Power Outlet"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>

              {/* Multi-Currency Prices */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Unit Prices by Currency</label>
                <div className="space-y-2">
                  {SUPPORTED_CURRENCIES.map(curr => {
                    const isEnabled = newItem.prices.some(p => p.currency === curr.code)
                    const currentPrice = newItem.prices.find(p => p.currency === curr.code)?.price || 0
                    return (
                      <div key={curr.code} className="flex items-center gap-2">
                        <label className="flex items-center gap-2 w-24">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => toggleNewItemCurrency(curr.code)}
                            className="w-4 h-4 text-admin-primary-600 border-neutral-300 rounded focus:ring-admin-primary-500"
                          />
                          <span className="text-sm font-medium text-neutral-700">{curr.code}</span>
                        </label>
                        <div className="flex-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">{curr.symbol}</span>
                          <input
                            type="number"
                            value={currentPrice}
                            onChange={(e) => updateNewItemPrice(curr.code, parseInt(e.target.value) || 0)}
                            disabled={!isEnabled}
                            placeholder="0"
                            className="w-full pl-8 pr-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500 disabled:bg-neutral-50 disabled:text-neutral-400"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <p className="mt-2 text-xs text-neutral-500">Select currencies and set prices for each. At least one currency is required.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Min Quantity</label>
                  <input
                    type="number"
                    value={newItem.minQty}
                    onChange={(e) => setNewItem({ ...newItem, minQty: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Max Quantity</label>
                  <input
                    type="number"
                    value={newItem.maxQty}
                    onChange={(e) => setNewItem({ ...newItem, maxQty: parseInt(e.target.value) || 100 })}
                    min="1"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Discount (%)</label>
                <input
                  type="number"
                  value={newItem.discountPercent}
                  onChange={(e) => setNewItem({ ...newItem, discountPercent: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  placeholder="0"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                disabled={!newItem.name.trim() || newItem.prices.length === 0}
                className="btn btn-primary disabled:opacity-50"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Preview Modal */}
      {isFormPreviewOpen && previewFormId && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsFormPreviewOpen(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-neutral-950">Form Preview</h3>
                  <p className="text-sm text-neutral-500">{availableForms.find(f => f.id === previewFormId)?.name}</p>
                </div>
                <button onClick={() => setIsFormPreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Company Name <span className="text-form-required">*</span></label>
                    <input type="text" disabled placeholder="Enter company name" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-neutral-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Person <span className="text-form-required">*</span></label>
                    <input type="text" disabled placeholder="Enter contact name" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-neutral-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email <span className="text-form-required">*</span></label>
                    <input type="email" disabled placeholder="Enter email" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-neutral-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
                    <input type="tel" disabled placeholder="Enter phone number" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-neutral-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Request Details <span className="text-form-required">*</span></label>
                    <textarea disabled placeholder="Describe your request" rows={4} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-neutral-50 resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Attachments</label>
                    <div className="border border-dashed border-neutral-300 rounded-md p-4 text-center">
                      <svg className="w-8 h-8 text-neutral-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-xs text-neutral-400">Upload files</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
                <button onClick={() => setIsFormPreviewOpen(false)} className="btn btn-secondary">Close</button>
                <button
                  onClick={() => { setIsFormPreviewOpen(false); openFormBuilder(previewFormId) }}
                  className="btn btn-primary"
                >
                  Edit Form
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Form Builder Full-Screen */}
      {isFormBuilderOpen && previewFormId && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
          <div className="h-14 border-b border-neutral-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsFormBuilderOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="h-6 w-px bg-neutral-200" />
              <div>
                <h1 className="text-base font-semibold text-neutral-950">Form Builder</h1>
                <p className="text-xs text-neutral-500">{availableForms.find(f => f.id === previewFormId)?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button className="btn btn-primary text-sm">
                Save Form
              </button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-64 border-r border-neutral-200 p-4 overflow-auto">
              <h3 className="text-xs font-medium text-neutral-500 uppercase mb-3">Field Types</h3>
              <div className="space-y-2">
                {['Text Input', 'Textarea', 'Email', 'Phone', 'Number', 'Dropdown', 'Checkbox', 'Radio', 'Date', 'File Upload'].map(type => (
                  <div key={type} className="p-2 bg-neutral-50 border border-neutral-200 rounded-md text-sm text-neutral-700 cursor-move hover:bg-neutral-100 transition-colors">
                    {type}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-6 bg-neutral-50 overflow-auto">
              <div className="max-w-xl mx-auto bg-white rounded-lg border border-neutral-200 p-6">
                <h2 className="text-lg font-semibold text-neutral-950 mb-4">{availableForms.find(f => f.id === previewFormId)?.name}</h2>
                <div className="space-y-3">
                  {['Company Name', 'Contact Person', 'Email', 'Phone', 'Request Details', 'Attachments'].map((field, idx) => (
                    <div key={idx} className="p-3 border border-neutral-200 rounded-md hover:border-admin-primary-300 cursor-pointer transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-neutral-700">{field}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1 text-neutral-400 hover:text-neutral-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button className="p-1 text-neutral-400 hover:text-destructive-text">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full p-3 border-2 border-dashed border-neutral-300 rounded-md text-sm text-neutral-500 hover:border-admin-primary-400 hover:text-admin-primary-600 transition-colors">
                  + Add Field
                </button>
              </div>
            </div>
            <div className="w-72 border-l border-neutral-200 p-4 overflow-auto">
              <h3 className="text-xs font-medium text-neutral-500 uppercase mb-3">Field Properties</h3>
              <p className="text-sm text-neutral-400">Select a field to edit its properties</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

interface BankAccount {
  id: string
  bankName: string
  accountNumber: string
  accountHolder: string
  currency: string
  isDefault: boolean
}

interface InvoiceTemplate {
  id: string
  name: string
  description: string
  lastModified: string
  isDefault: boolean
  layout: 'classic' | 'modern' | 'minimal'
  content: {
    headerTitle: string
    companyTagline: string
    paymentInstructions: string
    termsAndConditions: string
    footerNote: string
    thankYouMessage: string
  }
}

function InvoicesTab() {
  const [invoiceSettings, setInvoiceSettings] = useState({
    autoGenerate: true,
    reminderEnabled: true,
    reminderDaysBefore: 3,
  })

  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    { id: '1', bankName: 'Shinhan Bank', accountNumber: '110-123-456789', accountHolder: 'Design House Co., Ltd.', currency: 'KRW', isDefault: true },
    { id: '2', bankName: 'Citibank', accountNumber: '89-1234567', accountHolder: 'Design House Inc.', currency: 'USD', isDefault: false },
  ])

  const [invoiceTemplates, setInvoiceTemplates] = useState<InvoiceTemplate[]>([
    {
      id: '1',
      name: 'Standard Invoice',
      description: 'Default invoice for exhibitors',
      lastModified: '2026-01-15',
      isDefault: true,
      layout: 'classic',
      content: {
        headerTitle: 'INVOICE',
        companyTagline: 'Your trusted event partner',
        paymentInstructions: 'Please transfer the amount to the bank account below within the payment due date.',
        termsAndConditions: 'Payment is due within 14 days. Late payments may incur additional fees.',
        footerNote: 'This invoice was automatically generated. For inquiries, please contact our support team.',
        thankYouMessage: 'Thank you for your business!'
      }
    },
    {
      id: '2',
      name: 'International Invoice',
      description: 'Invoice with multi-currency support',
      lastModified: '2026-01-10',
      isDefault: false,
      layout: 'modern',
      content: {
        headerTitle: 'TAX INVOICE',
        companyTagline: 'Global Event Solutions',
        paymentInstructions: 'Wire transfer to the designated account. Include invoice number as reference.',
        termsAndConditions: 'Net 30 payment terms apply. All amounts are in the currency specified.',
        footerNote: 'For international transfers, please ensure all bank charges are covered by the sender.',
        thankYouMessage: 'We appreciate your partnership!'
      }
    },
    {
      id: '3',
      name: 'Sponsor Invoice',
      description: 'Detailed invoice for sponsors',
      lastModified: '2025-12-28',
      isDefault: false,
      layout: 'minimal',
      content: {
        headerTitle: 'SPONSORSHIP INVOICE',
        companyTagline: '',
        paymentInstructions: 'Please complete payment before the event date to secure your sponsorship benefits.',
        termsAndConditions: 'Sponsorship packages are non-refundable once confirmed.',
        footerNote: 'Contact your account manager for any questions regarding this invoice.',
        thankYouMessage: 'Thank you for supporting our event!'
      }
    },
  ])

  // Bank Account Modal States
  const [isAddAccountModalOpen, setIsAddAccountModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null)
  const [accountForm, setAccountForm] = useState({ bankName: '', accountNumber: '', accountHolder: '', currency: 'KRW' })

  // Invoice Template Modal States
  const [isAddTemplateModalOpen, setIsAddTemplateModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<InvoiceTemplate | null>(null)
  const [previewingTemplate, setPreviewingTemplate] = useState<InvoiceTemplate | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editorTemplate, setEditorTemplate] = useState<InvoiceTemplate | null>(null)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    layout: 'classic' as 'classic' | 'modern' | 'minimal',
    content: {
      headerTitle: 'INVOICE',
      companyTagline: 'Your trusted event partner',
      paymentInstructions: 'Please transfer the amount to the bank account below within the payment due date.',
      termsAndConditions: 'Payment is due within 14 days. Late payments may incur additional fees.',
      footerNote: 'This invoice was automatically generated. For inquiries, please contact our support team.',
      thankYouMessage: 'Thank you for your business!'
    }
  })

  // Bank Account Handlers
  const openAddAccountModal = () => {
    setAccountForm({ bankName: '', accountNumber: '', accountHolder: '', currency: 'KRW' })
    setEditingAccount(null)
    setIsAddAccountModalOpen(true)
  }

  const openEditAccountModal = (account: BankAccount) => {
    setAccountForm({ bankName: account.bankName, accountNumber: account.accountNumber, accountHolder: account.accountHolder, currency: account.currency })
    setEditingAccount(account)
    setIsAddAccountModalOpen(true)
  }

  const saveAccount = () => {
    if (!accountForm.bankName || !accountForm.accountNumber || !accountForm.accountHolder) return
    if (editingAccount) {
      setBankAccounts(accounts => accounts.map(a => a.id === editingAccount.id ? { ...a, ...accountForm } : a))
    } else {
      setBankAccounts(accounts => [...accounts, { id: Date.now().toString(), ...accountForm, isDefault: accounts.length === 0 }])
    }
    setIsAddAccountModalOpen(false)
  }

  const deleteAccount = (id: string) => {
    if (confirm('Are you sure you want to delete this bank account?')) {
      setBankAccounts(accounts => {
        const remaining = accounts.filter(a => a.id !== id)
        if (remaining.length > 0 && !remaining.some(a => a.isDefault)) {
          remaining[0].isDefault = true
        }
        return remaining
      })
    }
  }

  const setDefaultAccount = (id: string) => {
    setBankAccounts(accounts => accounts.map(a => ({ ...a, isDefault: a.id === id })))
  }

  // Invoice Template Handlers
  const defaultContent = {
    headerTitle: 'INVOICE',
    companyTagline: 'Your trusted event partner',
    paymentInstructions: 'Please transfer the amount to the bank account below within the payment due date.',
    termsAndConditions: 'Payment is due within 14 days. Late payments may incur additional fees.',
    footerNote: 'This invoice was automatically generated. For inquiries, please contact our support team.',
    thankYouMessage: 'Thank you for your business!'
  }

  const openAddTemplateModal = () => {
    setTemplateForm({
      name: '',
      description: '',
      layout: 'classic',
      content: { ...defaultContent }
    })
    setEditingTemplate(null)
    setIsAddTemplateModalOpen(true)
  }

  const openEditTemplateModal = (template: InvoiceTemplate) => {
    setTemplateForm({
      name: template.name,
      description: template.description,
      layout: template.layout,
      content: { ...template.content }
    })
    setEditingTemplate(template)
    setIsAddTemplateModalOpen(true)
  }

  const openEditor = (template: InvoiceTemplate) => {
    setTemplateForm({
      name: template.name,
      description: template.description,
      layout: template.layout,
      content: { ...template.content }
    })
    setEditorTemplate(template)
    setIsEditorOpen(true)
  }

  const saveTemplate = () => {
    if (!templateForm.name) return
    if (editingTemplate) {
      setInvoiceTemplates(templates => templates.map(t => t.id === editingTemplate.id ? { ...t, ...templateForm, lastModified: new Date().toISOString().split('T')[0] } : t))
    } else {
      setInvoiceTemplates(templates => [...templates, { id: Date.now().toString(), ...templateForm, lastModified: new Date().toISOString().split('T')[0], isDefault: templates.length === 0 }])
    }
    setIsAddTemplateModalOpen(false)
  }

  const saveEditorTemplate = () => {
    if (!editorTemplate) return
    setInvoiceTemplates(templates => templates.map(t => t.id === editorTemplate.id ? { ...t, layout: templateForm.layout, content: { ...templateForm.content }, lastModified: new Date().toISOString().split('T')[0] } : t))
    setIsEditorOpen(false)
    setEditorTemplate(null)
  }

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setInvoiceTemplates(templates => {
        const remaining = templates.filter(t => t.id !== id)
        if (remaining.length > 0 && !remaining.some(t => t.isDefault)) {
          remaining[0].isDefault = true
        }
        return remaining
      })
    }
  }

  const setDefaultTemplate = (id: string) => {
    setInvoiceTemplates(templates => templates.map(t => ({ ...t, isDefault: t.id === id })))
  }

  return (
    <div className="space-y-5">
      {/* Invoice Settings */}
      <div className="card p-4">
        <h2 className="font-semibold text-neutral-950 mb-3">Invoice Settings</h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
            <div>
              <p className="text-sm font-medium text-neutral-950">Automatic Invoice Generation</p>
              <p className="text-xs text-neutral-500">Generate invoices automatically when application is approved</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={invoiceSettings.autoGenerate}
                onChange={() => setInvoiceSettings(s => ({ ...s, autoGenerate: !s.autoGenerate }))}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-admin-primary-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between p-3 bg-neutral-50 rounded-md">
            <div>
              <p className="text-sm font-medium text-neutral-950">Payment Reminder</p>
              <p className="text-xs text-neutral-500">Send reminder email before payment deadline</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={invoiceSettings.reminderDaysBefore}
                onChange={(e) => setInvoiceSettings(s => ({ ...s, reminderDaysBefore: parseInt(e.target.value) }))}
                className="w-14 px-2 py-1 border border-neutral-200 rounded text-sm text-center"
              />
              <span className="text-xs text-neutral-500">days before</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoiceSettings.reminderEnabled}
                  onChange={() => setInvoiceSettings(s => ({ ...s, reminderEnabled: !s.reminderEnabled }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-admin-primary-600"></div>
              </label>
            </div>
          </label>
        </div>
      </div>

      {/* Bank Accounts */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-neutral-950">Bank Accounts</h2>
            <p className="text-sm text-neutral-500">Manage bank accounts for invoice payments</p>
          </div>
          <button onClick={openAddAccountModal} className="btn btn-secondary text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Account
          </button>
        </div>

        <div className="space-y-2">
          {bankAccounts.map((account) => (
            <div key={account.id} className={`p-3 border rounded-md ${account.isDefault ? 'border-admin-primary-200 bg-admin-primary-50' : 'border-neutral-200 bg-white'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-950">{account.bankName}</p>
                      <Badge variant="compact" color="neutral">{account.currency}</Badge>
                      {account.isDefault && (
                        <Badge variant="compact" color="primary">Default</Badge>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{account.accountNumber} · {account.accountHolder}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!account.isDefault && (
                    <button
                      onClick={() => setDefaultAccount(account.id)}
                      className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-neutral-100 rounded"
                      title="Set as default"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => openEditAccountModal(account)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteAccount(account.id)}
                    className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-neutral-100 rounded"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {bankAccounts.length === 0 && (
            <div className="text-center py-8 text-neutral-400">
              <svg className="w-12 h-12 mx-auto mb-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <p className="text-sm">No bank accounts added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Templates */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-neutral-950">Invoice Templates</h2>
            <p className="text-sm text-neutral-500">Create and manage invoice templates</p>
          </div>
          <button onClick={openAddTemplateModal} className="btn btn-secondary text-sm">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Template
          </button>
        </div>

        <div className="space-y-2">
          {invoiceTemplates.map((template) => (
            <div key={template.id} className={`p-3 border rounded-md ${template.isDefault ? 'border-admin-primary-200 bg-admin-primary-50' : 'border-neutral-200 bg-white'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-neutral-950">{template.name}</p>
                      <Badge variant="compact" color="neutral" className="capitalize">{template.layout}</Badge>
                      {template.isDefault && (
                        <Badge variant="compact" color="primary">Default</Badge>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{template.description} · Modified {template.lastModified}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!template.isDefault && (
                    <button
                      onClick={() => setDefaultTemplate(template.id)}
                      className="p-1.5 text-neutral-400 hover:text-admin-primary-600 hover:bg-neutral-100 rounded"
                      title="Set as default"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => setPreviewingTemplate(template)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                    title="Preview"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openEditor(template)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                    title="Edit Layout & Content"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openEditTemplateModal(template)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                    title="Edit Name"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-neutral-100 rounded"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {invoiceTemplates.length === 0 && (
            <div className="text-center py-8 text-neutral-400">
              <svg className="w-12 h-12 mx-auto mb-2 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm">No invoice templates added yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-start">
        <button className="btn btn-primary">Save Changes</button>
      </div>

      {/* Add/Edit Bank Account Modal */}
      {isAddAccountModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">{editingAccount ? 'Edit Bank Account' : 'Add Bank Account'}</h3>
              <button onClick={() => setIsAddAccountModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={accountForm.bankName}
                  onChange={(e) => setAccountForm(f => ({ ...f, bankName: e.target.value }))}
                  placeholder="e.g., Shinhan Bank"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountForm.accountNumber}
                  onChange={(e) => setAccountForm(f => ({ ...f, accountNumber: e.target.value }))}
                  placeholder="e.g., 110-123-456789"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Account Holder</label>
                <input
                  type="text"
                  value={accountForm.accountHolder}
                  onChange={(e) => setAccountForm(f => ({ ...f, accountHolder: e.target.value }))}
                  placeholder="e.g., Design House Co., Ltd."
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Currency</label>
                <select
                  value={accountForm.currency}
                  onChange={(e) => setAccountForm(f => ({ ...f, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                >
                  <option value="KRW">KRW</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="JPY">JPY</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsAddAccountModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={saveAccount} className="btn btn-primary">{editingAccount ? 'Save Changes' : 'Add Account'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Template Modal */}
      {isAddTemplateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">{editingTemplate ? 'Edit Template' : 'Add Template'}</h3>
              <button onClick={() => setIsAddTemplateModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Template Name</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g., Standard Invoice"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                <textarea
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Brief description of this template"
                  rows={3}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsAddTemplateModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={saveTemplate} className="btn btn-primary">{editingTemplate ? 'Save Changes' : 'Add Template'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {previewingTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-950">Invoice Preview</h3>
                <p className="text-sm text-neutral-500">{previewingTemplate.name}</p>
              </div>
              <button onClick={() => setPreviewingTemplate(null)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-100">
              {/* Invoice Preview Content */}
              <div className="bg-white rounded-md border border-neutral-200 p-8 max-w-2xl mx-auto">
                {/* Invoice Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="w-32 h-10 bg-neutral-200 rounded mb-2"></div>
                    <p className="text-xs text-neutral-500">Design House Co., Ltd.</p>
                    <p className="text-xs text-neutral-500">123 Business St, Seoul</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-bold text-neutral-950 mb-1">INVOICE</h1>
                    <p className="text-sm text-neutral-500">No. INV-2026-0001</p>
                    <p className="text-sm text-neutral-500">Date: Jan 15, 2026</p>
                  </div>
                </div>

                {/* Bill To */}
                <div className="mb-6">
                  <p className="text-xs text-neutral-500 uppercase mb-1">Bill To</p>
                  <p className="text-sm font-medium text-neutral-950">Sample Company Inc.</p>
                  <p className="text-sm text-neutral-600">456 Client Ave, Busan</p>
                </div>

                {/* Items Table */}
                <table className="table mb-6">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th className="text-right">Qty</th>
                      <th className="text-right">Price</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-neutral-950">Standard Booth (3m x 3m)</td>
                      <td className="text-right text-neutral-600">1</td>
                      <td className="text-right text-neutral-600">₩2,500,000</td>
                      <td className="text-right text-neutral-950">₩2,500,000</td>
                    </tr>
                    <tr>
                      <td className="text-neutral-950">Extra Furniture Package</td>
                      <td className="text-right text-neutral-600">1</td>
                      <td className="text-right text-neutral-600">₩300,000</td>
                      <td className="text-right text-neutral-950">₩300,000</td>
                    </tr>
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-6">
                  <div className="w-64">
                    <div className="flex justify-between py-1">
                      <span className="text-sm text-neutral-600">Subtotal</span>
                      <span className="text-sm text-neutral-950">₩2,800,000</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-sm text-neutral-600">VAT (10%)</span>
                      <span className="text-sm text-neutral-950">₩280,000</span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-neutral-200 mt-1">
                      <span className="text-sm font-semibold text-neutral-950">Total</span>
                      <span className="text-sm font-semibold text-neutral-950">₩3,080,000</span>
                    </div>
                  </div>
                </div>

                {/* Bank Info */}
                <div className="bg-neutral-50 rounded-md p-4">
                  <p className="text-xs text-neutral-500 uppercase mb-2">Payment Information</p>
                  <p className="text-sm text-neutral-950">Shinhan Bank · 110-123-456789</p>
                  <p className="text-sm text-neutral-600">Design House Co., Ltd.</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => { openEditor(previewingTemplate); setPreviewingTemplate(null) }} className="btn btn-secondary">Edit Template</button>
              <button onClick={() => setPreviewingTemplate(null)} className="btn btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Editor Modal */}
      {isEditorOpen && editorTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Editor Header */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-950">Invoice Editor</h3>
                <p className="text-sm text-neutral-500">Customize layout and content for &quot;{editorTemplate.name}&quot;</p>
              </div>
              <button onClick={() => { setIsEditorOpen(false); setEditorTemplate(null) }} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Left Panel - Settings */}
              <div className="w-96 border-r border-neutral-100 overflow-y-auto">
                <div className="p-4 space-y-5">
                  {/* Layout Selection */}
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-950 mb-3">Select Layout</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {/* Classic Layout */}
                      <button
                        onClick={() => setTemplateForm(f => ({ ...f, layout: 'classic' }))}
                        className={`p-2 border-2 rounded-md transition-colors ${templateForm.layout === 'classic' ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                      >
                        <div className="aspect-[3/4] bg-white border border-neutral-100 rounded mb-2 p-1.5">
                          <div className="h-2 w-8 bg-neutral-200 rounded mb-1"></div>
                          <div className="h-1 w-6 bg-neutral-100 rounded mb-2"></div>
                          <div className="flex justify-between mb-2">
                            <div className="h-1.5 w-10 bg-neutral-200 rounded"></div>
                            <div className="h-3 w-8 bg-neutral-300 rounded"></div>
                          </div>
                          <div className="h-6 w-full bg-neutral-100 rounded mb-1"></div>
                          <div className="h-3 w-full bg-neutral-50 rounded"></div>
                        </div>
                        <p className="text-xs font-medium text-center text-neutral-950">Classic</p>
                      </button>

                      {/* Modern Layout */}
                      <button
                        onClick={() => setTemplateForm(f => ({ ...f, layout: 'modern' }))}
                        className={`p-2 border-2 rounded-md transition-colors ${templateForm.layout === 'modern' ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                      >
                        <div className="aspect-[3/4] bg-white border border-neutral-100 rounded mb-2 p-1.5">
                          <div className="h-4 w-full bg-admin-primary-100 rounded mb-2"></div>
                          <div className="flex gap-1 mb-2">
                            <div className="h-4 w-1/2 bg-neutral-100 rounded"></div>
                            <div className="h-4 w-1/2 bg-neutral-100 rounded"></div>
                          </div>
                          <div className="h-5 w-full bg-neutral-100 rounded mb-1"></div>
                          <div className="h-2 w-full bg-admin-primary-50 rounded"></div>
                        </div>
                        <p className="text-xs font-medium text-center text-neutral-950">Modern</p>
                      </button>

                      {/* Minimal Layout */}
                      <button
                        onClick={() => setTemplateForm(f => ({ ...f, layout: 'minimal' }))}
                        className={`p-2 border-2 rounded-md transition-colors ${templateForm.layout === 'minimal' ? 'border-admin-primary-500 bg-admin-primary-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                      >
                        <div className="aspect-[3/4] bg-white border border-neutral-100 rounded mb-2 p-1.5">
                          <div className="text-center mb-2">
                            <div className="h-2 w-10 bg-neutral-300 rounded mx-auto mb-1"></div>
                            <div className="h-1 w-6 bg-neutral-100 rounded mx-auto"></div>
                          </div>
                          <div className="h-5 w-full bg-neutral-50 rounded mb-1"></div>
                          <div className="h-3 w-full bg-neutral-100 rounded mb-1"></div>
                          <div className="h-2 w-16 bg-neutral-200 rounded mx-auto"></div>
                        </div>
                        <p className="text-xs font-medium text-center text-neutral-950">Minimal</p>
                      </button>
                    </div>
                  </div>

                  {/* Content Fields */}
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-950 mb-3">Edit Content</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Header Title</label>
                        <input
                          type="text"
                          value={templateForm.content.headerTitle}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, headerTitle: e.target.value } }))}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="INVOICE"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Company Tagline</label>
                        <input
                          type="text"
                          value={templateForm.content.companyTagline}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, companyTagline: e.target.value } }))}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="Your trusted event partner"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Payment Instructions</label>
                        <textarea
                          value={templateForm.content.paymentInstructions}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, paymentInstructions: e.target.value } }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="Payment instructions..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Terms & Conditions</label>
                        <textarea
                          value={templateForm.content.termsAndConditions}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, termsAndConditions: e.target.value } }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="Terms and conditions..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Footer Note</label>
                        <textarea
                          value={templateForm.content.footerNote}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, footerNote: e.target.value } }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="Footer note..."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">Thank You Message</label>
                        <input
                          type="text"
                          value={templateForm.content.thankYouMessage}
                          onChange={(e) => setTemplateForm(f => ({ ...f, content: { ...f.content, thankYouMessage: e.target.value } }))}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                          placeholder="Thank you for your business!"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Live Preview */}
              <div className="flex-1 overflow-y-auto bg-neutral-100 p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-neutral-950">Live Preview</h4>
                  <span className="text-xs text-neutral-500 px-2 py-1 bg-white rounded border border-neutral-200 capitalize">{templateForm.layout} Layout</span>
                </div>

                {/* Classic Layout Preview */}
                {templateForm.layout === 'classic' && (
                  <div className="bg-white rounded-md border border-neutral-200 p-8 max-w-xl mx-auto">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="w-28 h-8 bg-neutral-200 rounded mb-1"></div>
                        {templateForm.content.companyTagline && (
                          <p className="text-xs text-neutral-500 italic">{templateForm.content.companyTagline}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <h1 className="text-xl font-bold text-neutral-950">{templateForm.content.headerTitle || 'INVOICE'}</h1>
                        <p className="text-xs text-neutral-500">No. INV-2026-0001</p>
                        <p className="text-xs text-neutral-500">Date: Jan 15, 2026</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-micro text-neutral-400 uppercase mb-0.5">From</p>
                        <p className="text-xs font-medium text-neutral-950">Design House Co., Ltd.</p>
                        <p className="text-xs text-neutral-500">123 Business St, Seoul</p>
                      </div>
                      <div>
                        <p className="text-micro text-neutral-400 uppercase mb-0.5">Bill To</p>
                        <p className="text-xs font-medium text-neutral-950">Sample Company Inc.</p>
                        <p className="text-xs text-neutral-500">456 Client Ave, Busan</p>
                      </div>
                    </div>

                    <table className="table mb-4 text-xs">
                      <thead>
                        <tr>
                          <th className="text-neutral-500">Description</th>
                          <th className="text-right text-neutral-500">Qty</th>
                          <th className="text-right text-neutral-500">Price</th>
                          <th className="text-right text-neutral-500">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-neutral-950">Standard Booth (3m x 3m)</td>
                          <td className="text-right text-neutral-600">1</td>
                          <td className="text-right text-neutral-600">₩2,500,000</td>
                          <td className="text-right text-neutral-950">₩2,500,000</td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="flex justify-end mb-4">
                      <div className="w-48 text-xs">
                        <div className="flex justify-between py-0.5">
                          <span className="text-neutral-500">Subtotal</span>
                          <span className="text-neutral-950">₩2,500,000</span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-neutral-500">VAT (10%)</span>
                          <span className="text-neutral-950">₩250,000</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-t border-neutral-200 mt-1 font-semibold">
                          <span className="text-neutral-950">Total</span>
                          <span className="text-neutral-950">₩2,750,000</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-50 rounded p-3 mb-3 text-xs">
                      <p className="font-medium text-neutral-950 mb-1">Payment Information</p>
                      <p className="text-neutral-600">{templateForm.content.paymentInstructions}</p>
                      <p className="text-neutral-950 mt-1">Shinhan Bank · 110-123-456789 · Design House Co., Ltd.</p>
                    </div>

                    {templateForm.content.termsAndConditions && (
                      <p className="text-micro text-neutral-400 mb-2">{templateForm.content.termsAndConditions}</p>
                    )}

                    <div className="border-t border-neutral-100 pt-3 text-center">
                      {templateForm.content.thankYouMessage && (
                        <p className="text-xs font-medium text-admin-primary-600 mb-1">{templateForm.content.thankYouMessage}</p>
                      )}
                      {templateForm.content.footerNote && (
                        <p className="text-micro text-neutral-400">{templateForm.content.footerNote}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Modern Layout Preview */}
                {templateForm.layout === 'modern' && (
                  <div className="bg-white rounded-md border border-neutral-200 overflow-hidden max-w-xl mx-auto">
                    {/* Header Banner */}
                    <div className="bg-admin-primary-600 text-white p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="w-24 h-6 bg-white/20 rounded mb-1"></div>
                          {templateForm.content.companyTagline && (
                            <p className="text-xs text-admin-primary-100">{templateForm.content.companyTagline}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <h1 className="text-lg font-bold">{templateForm.content.headerTitle || 'INVOICE'}</h1>
                          <p className="text-xs text-admin-primary-200">INV-2026-0001</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6 p-3 bg-neutral-50 rounded-md">
                        <div>
                          <p className="text-micro text-neutral-400 uppercase mb-0.5">Issued To</p>
                          <p className="text-xs font-medium text-neutral-950">Sample Company Inc.</p>
                          <p className="text-xs text-neutral-500">456 Client Ave, Busan</p>
                        </div>
                        <div className="text-right">
                          <p className="text-micro text-neutral-400 uppercase mb-0.5">Invoice Date</p>
                          <p className="text-xs font-medium text-neutral-950">January 15, 2026</p>
                          <p className="text-micro text-neutral-400 uppercase mt-2 mb-0.5">Due Date</p>
                          <p className="text-xs font-medium text-neutral-950">January 29, 2026</p>
                        </div>
                      </div>

                      <table className="table mb-4 text-xs">
                        <thead>
                          <tr className="bg-neutral-100">
                            <th className="text-neutral-600 rounded-l">Item</th>
                            <th className="text-center text-neutral-600">Qty</th>
                            <th className="text-right text-neutral-600">Rate</th>
                            <th className="text-right text-neutral-600 rounded-r">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-neutral-950">Standard Booth (3m x 3m)</td>
                            <td className="text-center text-neutral-600">1</td>
                            <td className="text-right text-neutral-600">₩2,500,000</td>
                            <td className="text-right text-neutral-950 font-medium">₩2,500,000</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="flex justify-end mb-4">
                        <div className="w-56 bg-admin-primary-50 rounded-md p-3">
                          <div className="flex justify-between py-0.5 text-xs">
                            <span className="text-neutral-600">Subtotal</span>
                            <span className="text-neutral-950">₩2,500,000</span>
                          </div>
                          <div className="flex justify-between py-0.5 text-xs">
                            <span className="text-neutral-600">VAT (10%)</span>
                            <span className="text-neutral-950">₩250,000</span>
                          </div>
                          <div className="flex justify-between py-2 border-t border-admin-primary-200 mt-1 font-bold text-sm">
                            <span className="text-admin-primary-700">Total Due</span>
                            <span className="text-admin-primary-700">₩2,750,000</span>
                          </div>
                        </div>
                      </div>

                      <div className="border border-admin-primary-200 rounded-md p-3 mb-4">
                        <p className="text-xs font-medium text-admin-primary-700 mb-1">Payment Instructions</p>
                        <p className="text-xs text-neutral-600">{templateForm.content.paymentInstructions}</p>
                        <div className="mt-2 pt-2 border-t border-admin-primary-100 text-xs">
                          <span className="text-neutral-500">Bank:</span> <span className="text-neutral-950">Shinhan Bank · 110-123-456789</span>
                        </div>
                      </div>

                      {templateForm.content.termsAndConditions && (
                        <div className="text-micro text-neutral-400 mb-3 p-2 bg-neutral-50 rounded">
                          <span className="font-medium">Terms:</span> {templateForm.content.termsAndConditions}
                        </div>
                      )}

                      <div className="text-center pt-3 border-t border-neutral-100">
                        {templateForm.content.thankYouMessage && (
                          <p className="text-xs font-semibold text-admin-primary-600">{templateForm.content.thankYouMessage}</p>
                        )}
                        {templateForm.content.footerNote && (
                          <p className="text-micro text-neutral-400 mt-1">{templateForm.content.footerNote}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Minimal Layout Preview */}
                {templateForm.layout === 'minimal' && (
                  <div className="bg-white rounded-md border border-neutral-200 p-8 max-w-xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <div className="w-10 h-4 bg-neutral-300 rounded"></div>
                      </div>
                      <h1 className="text-xl font-light tracking-wide text-neutral-950">{templateForm.content.headerTitle || 'INVOICE'}</h1>
                      {templateForm.content.companyTagline && (
                        <p className="text-xs text-neutral-400 mt-1">{templateForm.content.companyTagline}</p>
                      )}
                      <p className="text-xs text-neutral-500 mt-2">No. INV-2026-0001 · January 15, 2026</p>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-micro text-neutral-400 uppercase">Billed To</p>
                      <p className="text-sm font-medium text-neutral-950">Sample Company Inc.</p>
                    </div>

                    <div className="border-t border-b border-neutral-100 py-4 mb-4">
                      <div className="flex justify-between items-center py-2 text-xs">
                        <span className="text-neutral-600">Standard Booth (3m x 3m)</span>
                        <span className="text-neutral-950">₩2,500,000</span>
                      </div>
                      <div className="flex justify-between items-center py-2 text-xs">
                        <span className="text-neutral-600">VAT (10%)</span>
                        <span className="text-neutral-950">₩250,000</span>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-micro text-neutral-400 uppercase mb-1">Amount Due</p>
                      <p className="text-2xl font-light text-neutral-950">₩2,750,000</p>
                    </div>

                    <div className="text-center text-xs text-neutral-500 mb-4">
                      <p>{templateForm.content.paymentInstructions}</p>
                      <p className="mt-2 font-medium text-neutral-950">Shinhan Bank · 110-123-456789</p>
                    </div>

                    {templateForm.content.termsAndConditions && (
                      <p className="text-micro text-neutral-400 text-center mb-4">{templateForm.content.termsAndConditions}</p>
                    )}

                    <div className="text-center pt-4 border-t border-neutral-100">
                      {templateForm.content.thankYouMessage && (
                        <p className="text-xs text-admin-primary-600">{templateForm.content.thankYouMessage}</p>
                      )}
                      {templateForm.content.footerNote && (
                        <p className="text-micro text-neutral-400 mt-1">{templateForm.content.footerNote}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Editor Footer */}
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => { setIsEditorOpen(false); setEditorTemplate(null) }} className="btn btn-secondary">Cancel</button>
              <button onClick={saveEditorTemplate} className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

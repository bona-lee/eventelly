'use client'

import { useState, useEffect, useRef } from 'react'
import { Badge } from '@/components/Badge'

// Field Types
type FieldType = 'text' | 'textarea' | 'email' | 'phone' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'heading' | 'divider'

// Event-level Field (reusable field definition)
interface EventField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  options?: string[]
  description?: string
  defaultWidth: 'full' | 'half'
  defaultRequired: boolean
  usageCount: number
  createdAt: string
  tags?: string[]
}

// Form Field (field instance in a form)
interface FormField {
  id: string
  eventFieldId: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  description?: string
  width: 'full' | 'half'
}

interface Form {
  id: string
  name: string
  fields: FormField[]
  status: 'draft' | 'active'
  lastModified: string
  usedIn: string[] // Where the form is used
}

// Workspace Field (from other events)
interface WorkspaceField extends EventField {
  eventId: string
  eventName: string
}

// AI Recommendation
interface AIRecommendation {
  fieldId: string
  reason: string
  confidence: number
}

// New field suggestion (doesn't exist yet)
interface NewFieldSuggestion {
  id: string
  type: FieldType
  label: string
  reason: string
  placeholder?: string
  options?: string[]
}

const FIELD_TYPE_INFO: { type: FieldType; label: string; icon: string }[] = [
  { type: 'text', label: 'Short Text', icon: 'M4 6h16M4 12h8' },
  { type: 'textarea', label: 'Long Text', icon: 'M4 6h16M4 10h16M4 14h16M4 18h10' },
  { type: 'email', label: 'Email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { type: 'phone', label: 'Phone', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { type: 'number', label: 'Number', icon: 'M7 20l4-16m2 16l4-16M6 9h14M4 15h14' },
  { type: 'date', label: 'Date', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { type: 'file', label: 'File Upload', icon: 'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' },
  { type: 'select', label: 'Dropdown', icon: 'M19 9l-7 7-7-7' },
  { type: 'radio', label: 'Single Choice', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { type: 'checkbox', label: 'Multiple Choice', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { type: 'heading', label: 'Section Heading', icon: 'M4 6h16M4 12h8' },
  { type: 'divider', label: 'Divider', icon: 'M4 12h16' },
]

export default function FormsRegistrationPage() {
  // Event-level fields (field library for this event)
  const [eventFields, setEventFields] = useState<EventField[]>([
    { id: 'ef-1', type: 'text', label: 'Company Name', defaultWidth: 'full', defaultRequired: true, usageCount: 3, createdAt: '2026-01-10', tags: ['basic', 'company'] },
    { id: 'ef-2', type: 'text', label: 'Representative Name', defaultWidth: 'half', defaultRequired: true, usageCount: 3, createdAt: '2026-01-10', tags: ['basic', 'contact'] },
    { id: 'ef-3', type: 'email', label: 'Business Email', defaultWidth: 'half', defaultRequired: true, usageCount: 3, createdAt: '2026-01-10', tags: ['basic', 'contact'] },
    { id: 'ef-4', type: 'phone', label: 'Contact Phone', defaultWidth: 'half', defaultRequired: true, usageCount: 2, createdAt: '2026-01-10', tags: ['basic', 'contact'] },
    { id: 'ef-5', type: 'text', label: 'Website URL', placeholder: 'https://', defaultWidth: 'half', defaultRequired: false, usageCount: 2, createdAt: '2026-01-10', tags: ['basic', 'online'] },
    { id: 'ef-6', type: 'textarea', label: 'Company Introduction', description: 'Brief description of your company and products', defaultWidth: 'full', defaultRequired: true, usageCount: 2, createdAt: '2026-01-10', tags: ['profile'] },
    { id: 'ef-7', type: 'select', label: 'Industry Category', options: ['Furniture', 'Lighting', 'Home Decor', 'Kitchen', 'Bathroom', 'Outdoor', 'Other'], defaultWidth: 'half', defaultRequired: true, usageCount: 2, createdAt: '2026-01-10', tags: ['category'] },
    { id: 'ef-8', type: 'file', label: 'Company Logo', description: 'PNG or JPG, max 5MB', defaultWidth: 'half', defaultRequired: false, usageCount: 1, createdAt: '2026-01-11', tags: ['media', 'brand'] },
    { id: 'ef-9', type: 'text', label: 'Business Registration Number', defaultWidth: 'half', defaultRequired: true, usageCount: 1, createdAt: '2026-01-12', tags: ['legal'] },
    { id: 'ef-10', type: 'radio', label: 'Participation Type', options: ['New Exhibitor', 'Returning Exhibitor'], defaultWidth: 'full', defaultRequired: true, usageCount: 1, createdAt: '2026-01-12', tags: ['participation'] },
    { id: 'ef-11', type: 'checkbox', label: 'Preferred Booth Location', options: ['Main Hall', 'Side Hall A', 'Side Hall B', 'Outdoor Area'], defaultWidth: 'full', defaultRequired: false, usageCount: 1, createdAt: '2026-01-12', tags: ['booth'] },
    { id: 'ef-12', type: 'number', label: 'Number of Products to Display', placeholder: '0', defaultWidth: 'half', defaultRequired: false, usageCount: 0, createdAt: '2026-01-15', tags: ['product'] },
  ])

  // Workspace-level fields (from other events)
  const [workspaceFields] = useState<WorkspaceField[]>([
    { id: 'wf-1', type: 'text', label: 'Brand Name', defaultWidth: 'half', defaultRequired: true, usageCount: 5, createdAt: '2025-12-01', eventId: 'sdf-2026', eventName: 'Seoul Design Festival 2026', tags: ['brand'] },
    { id: 'wf-2', type: 'textarea', label: 'Product Description', defaultWidth: 'full', defaultRequired: true, usageCount: 8, createdAt: '2025-11-15', eventId: 'sdf-2026', eventName: 'Seoul Design Festival 2026', tags: ['product'] },
    { id: 'wf-3', type: 'select', label: 'Target Market', options: ['B2B', 'B2C', 'Both'], defaultWidth: 'half', defaultRequired: true, usageCount: 4, createdAt: '2025-11-20', eventId: 'sdf-2026', eventName: 'Seoul Design Festival 2026', tags: ['market'] },
    { id: 'wf-4', type: 'file', label: 'Product Catalog', description: 'PDF format, max 20MB', defaultWidth: 'half', defaultRequired: false, usageCount: 3, createdAt: '2025-12-05', eventId: 'bldf-2026', eventName: 'Busan Living Design Fair 2026', tags: ['media', 'product'] },
    { id: 'wf-5', type: 'checkbox', label: 'Services Needed', options: ['Booth Installation', 'Electricity', 'Wi-Fi', 'Furniture Rental', 'Interpreter'], defaultWidth: 'full', defaultRequired: false, usageCount: 6, createdAt: '2025-12-10', eventId: 'bldf-2026', eventName: 'Busan Living Design Fair 2026', tags: ['service'] },
    { id: 'wf-6', type: 'date', label: 'Preferred Setup Date', defaultWidth: 'half', defaultRequired: false, usageCount: 2, createdAt: '2025-12-12', eventId: 'bldf-2026', eventName: 'Busan Living Design Fair 2026', tags: ['schedule'] },
  ])

  // Forms
  const [forms, setForms] = useState<Form[]>([
    {
      id: 'form-1',
      name: 'Standard Exhibitor Application',
      fields: [
        { id: 'ff-1', eventFieldId: 'ef-1', type: 'text', label: 'Company Name', required: true, width: 'full' },
        { id: 'ff-2', eventFieldId: 'ef-2', type: 'text', label: 'Representative Name', required: true, width: 'half' },
        { id: 'ff-3', eventFieldId: 'ef-3', type: 'email', label: 'Business Email', required: true, width: 'half' },
      ],
      status: 'active',
      lastModified: '2026-01-15',
      usedIn: ['Application']
    },
    {
      id: 'form-2',
      name: 'Premium Exhibitor Application',
      fields: [],
      status: 'draft',
      lastModified: '2026-01-10',
      usedIn: ['Application - Premium']
    },
    {
      id: 'form-3',
      name: 'Signboard Order Form',
      fields: [],
      status: 'active',
      lastModified: '2026-01-12',
      usedIn: ['Extras - Signboard']
    },
  ])

  // UI States
  const [selectedForm, setSelectedForm] = useState<Form | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isAddFormModalOpen, setIsAddFormModalOpen] = useState(false)
  const [isCreateFieldModalOpen, setIsCreateFieldModalOpen] = useState(false)
  const [newFormName, setNewFormName] = useState('')

  // Editor states
  const [editingFields, setEditingFields] = useState<FormField[]>([])
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null)
  const [draggedEventField, setDraggedEventField] = useState<string | null>(null)
  const [draggedFormField, setDraggedFormField] = useState<string | null>(null)

  // Search & Filter
  const [eventFieldSearch, setEventFieldSearch] = useState('')
  const [workspaceFieldSearch, setWorkspaceFieldSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'event' | 'workspace' | 'ai'>('event')

  // New field creation
  const [newField, setNewField] = useState<Partial<EventField>>({
    type: 'text',
    label: '',
    defaultWidth: 'half',
    defaultRequired: false,
    options: [],
    tags: [],
  })
  const [newFieldTag, setNewFieldTag] = useState('')

  // AI Recommendations (simulated)
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [newFieldSuggestions, setNewFieldSuggestions] = useState<NewFieldSuggestion[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Refs for dropdowns
  const learnMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (learnMoreRef.current && !learnMoreRef.current.contains(event.target as Node)) {
        setIsLearnMoreOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Simulate AI analysis when form fields change
  useEffect(() => {
    if (isEditorOpen && editingFields.length > 0) {
      setIsAnalyzing(true)
      const timer = setTimeout(() => {
        const recommendations: AIRecommendation[] = []
        const suggestions: NewFieldSuggestion[] = []
        const usedFieldIds = new Set(editingFields.map(f => f.eventFieldId))
        const existingLabels = new Set([...eventFields.map(f => f.label.toLowerCase()), ...editingFields.map(f => f.label.toLowerCase())])

        const hasCompanyName = editingFields.some(f => f.label.toLowerCase().includes('company'))
        const hasContact = editingFields.some(f => f.type === 'email' || f.type === 'phone')
        const hasDescription = editingFields.some(f => f.type === 'textarea')
        const hasAddress = editingFields.some(f => f.label.toLowerCase().includes('address'))
        const hasBooth = editingFields.some(f => f.label.toLowerCase().includes('booth'))

        if (!hasCompanyName) {
          const companyField = eventFields.find(f => f.label.toLowerCase().includes('company') && !usedFieldIds.has(f.id))
          if (companyField) {
            recommendations.push({ fieldId: companyField.id, reason: 'Essential for identifying exhibitors', confidence: 95 })
          }
        }

        if (!hasContact) {
          const emailField = eventFields.find(f => f.type === 'email' && !usedFieldIds.has(f.id))
          if (emailField) {
            recommendations.push({ fieldId: emailField.id, reason: 'Important for communication', confidence: 90 })
          }
        }

        if (!hasDescription) {
          const descField = eventFields.find(f => f.type === 'textarea' && !usedFieldIds.has(f.id))
          if (descField) {
            recommendations.push({ fieldId: descField.id, reason: 'Helps understand exhibitor profile', confidence: 85 })
          }
        }

        const popularUnused = eventFields
          .filter(f => !usedFieldIds.has(f.id) && f.usageCount > 0)
          .sort((a, b) => b.usageCount - a.usageCount)
          .slice(0, 2)

        popularUnused.forEach(f => {
          if (!recommendations.some(r => r.fieldId === f.id)) {
            recommendations.push({ fieldId: f.id, reason: `Used in ${f.usageCount} other forms`, confidence: 70 + f.usageCount * 5 })
          }
        })

        // Suggest new fields that don't exist yet
        if (!hasAddress && !existingLabels.has('company address')) {
          suggestions.push({
            id: `suggestion-${Date.now()}-1`,
            type: 'textarea',
            label: 'Company Address',
            reason: 'Useful for shipping and logistics',
            placeholder: 'Enter full address'
          })
        }

        if (!hasBooth && !existingLabels.has('booth size preference')) {
          suggestions.push({
            id: `suggestion-${Date.now()}-2`,
            type: 'select',
            label: 'Booth Size Preference',
            reason: 'Common requirement for exhibitor applications',
            options: ['Small (9m²)', 'Medium (18m²)', 'Large (36m²)', 'Custom']
          })
        }

        if (!existingLabels.has('special requirements')) {
          suggestions.push({
            id: `suggestion-${Date.now()}-3`,
            type: 'textarea',
            label: 'Special Requirements',
            reason: 'Helps capture additional exhibitor needs',
            placeholder: 'Any special requirements or requests'
          })
        }

        setAiRecommendations(recommendations.slice(0, 4))
        setNewFieldSuggestions(suggestions.slice(0, 3))
        setIsAnalyzing(false)
      }, 800)
      return () => clearTimeout(timer)
    } else if (isEditorOpen && editingFields.length === 0) {
      const popular = eventFields.filter(f => f.usageCount > 0).sort((a, b) => b.usageCount - a.usageCount).slice(0, 4)
      setAiRecommendations(popular.map(f => ({
        fieldId: f.id,
        reason: f.usageCount > 2 ? 'Most commonly used field' : 'Frequently used in similar forms',
        confidence: 80 + f.usageCount * 3
      })))
      // Initial suggestions for empty forms
      setNewFieldSuggestions([
        { id: 'suggestion-init-1', type: 'textarea', label: 'Company Address', reason: 'Useful for shipping and logistics', placeholder: 'Enter full address' },
        { id: 'suggestion-init-2', type: 'select', label: 'Booth Size Preference', reason: 'Common requirement for exhibitor applications', options: ['Small (9m²)', 'Medium (18m²)', 'Large (36m²)', 'Custom'] },
      ])
    }
  }, [editingFields, isEditorOpen, eventFields])

  // Filtered fields
  const filteredEventFields = eventFields.filter(f =>
    f.label.toLowerCase().includes(eventFieldSearch.toLowerCase()) ||
    f.tags?.some(t => t.toLowerCase().includes(eventFieldSearch.toLowerCase()))
  )

  const filteredWorkspaceFields = workspaceFields.filter(f =>
    f.label.toLowerCase().includes(workspaceFieldSearch.toLowerCase()) ||
    f.eventName.toLowerCase().includes(workspaceFieldSearch.toLowerCase()) ||
    f.tags?.some(t => t.toLowerCase().includes(workspaceFieldSearch.toLowerCase()))
  )

  const openEditor = (form: Form) => {
    setSelectedForm(form)
    setEditingFields([...form.fields])
    setSelectedFieldId(null)
    setIsEditorOpen(true)
  }

  const saveForm = () => {
    if (!selectedForm) return
    setForms(forms.map(f => f.id === selectedForm.id ? { ...f, fields: editingFields, lastModified: new Date().toISOString().split('T')[0] } : f))
    setIsEditorOpen(false)
    setSelectedForm(null)
  }

  const addNewForm = () => {
    if (!newFormName.trim()) return
    const newForm: Form = {
      id: `form-${Date.now()}`,
      name: newFormName,
      fields: [],
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      usedIn: []
    }
    setForms([...forms, newForm])
    setNewFormName('')
    setIsAddFormModalOpen(false)
    openEditor(newForm)
  }

  const deleteForm = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(f => f.id !== formId))
    }
  }

  const duplicateForm = (form: Form) => {
    const newForm: Form = {
      ...form,
      id: `form-${Date.now()}`,
      name: `${form.name} (Copy)`,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      usedIn: []
    }
    setForms([...forms, newForm])
  }

  // Add event field to form
  const addFieldToForm = (eventField: EventField, index?: number) => {
    const newFormField: FormField = {
      id: `ff-${Date.now()}`,
      eventFieldId: eventField.id,
      type: eventField.type,
      label: eventField.label,
      placeholder: eventField.placeholder,
      required: eventField.defaultRequired,
      options: eventField.options,
      description: eventField.description,
      width: eventField.defaultWidth,
    }

    if (index !== undefined) {
      const newFields = [...editingFields]
      newFields.splice(index, 0, newFormField)
      setEditingFields(newFields)
    } else {
      setEditingFields([...editingFields, newFormField])
    }
    setSelectedFieldId(newFormField.id)

    setEventFields(eventFields.map(f => f.id === eventField.id ? { ...f, usageCount: f.usageCount + 1 } : f))
  }

  // Import workspace field to event fields
  const importWorkspaceField = (wsField: WorkspaceField) => {
    const newEventField: EventField = {
      id: `ef-${Date.now()}`,
      type: wsField.type,
      label: wsField.label,
      placeholder: wsField.placeholder,
      options: wsField.options,
      description: wsField.description,
      defaultWidth: wsField.defaultWidth,
      defaultRequired: wsField.defaultRequired,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      tags: wsField.tags,
    }
    setEventFields([...eventFields, newEventField])
    addFieldToForm(newEventField)
  }

  // Create new event field
  const createNewField = () => {
    if (!newField.label?.trim()) return
    const eventField: EventField = {
      id: `ef-${Date.now()}`,
      type: newField.type || 'text',
      label: newField.label,
      placeholder: newField.placeholder,
      options: newField.options,
      description: newField.description,
      defaultWidth: newField.defaultWidth || 'half',
      defaultRequired: newField.defaultRequired || false,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      tags: newField.tags,
    }
    setEventFields([...eventFields, eventField])
    addFieldToForm(eventField)
    setNewField({ type: 'text', label: '', defaultWidth: 'half', defaultRequired: false, options: [], tags: [] })
    setIsCreateFieldModalOpen(false)
  }

  // Create and add a suggested new field
  const createSuggestedField = (suggestion: NewFieldSuggestion) => {
    const eventField: EventField = {
      id: `ef-${Date.now()}`,
      type: suggestion.type,
      label: suggestion.label,
      placeholder: suggestion.placeholder,
      options: suggestion.options,
      defaultWidth: suggestion.type === 'textarea' ? 'full' : 'half',
      defaultRequired: false,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      tags: ['ai-suggested'],
    }
    setEventFields([...eventFields, eventField])
    addFieldToForm(eventField)
    setNewFieldSuggestions(newFieldSuggestions.filter(s => s.id !== suggestion.id))
  }

  const updateFormField = (fieldId: string, updates: Partial<FormField>) => {
    setEditingFields(editingFields.map(f => f.id === fieldId ? { ...f, ...updates } : f))
  }

  const deleteFormField = (fieldId: string) => {
    setEditingFields(editingFields.filter(f => f.id !== fieldId))
    if (selectedFieldId === fieldId) setSelectedFieldId(null)
  }

  const moveFormField = (fromIndex: number, toIndex: number) => {
    const newFields = [...editingFields]
    const [removed] = newFields.splice(fromIndex, 1)
    newFields.splice(toIndex, 0, removed)
    setEditingFields(newFields)
  }

  const selectedFormField = editingFields.find(f => f.id === selectedFieldId)

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedEventField) {
      const eventField = eventFields.find(f => f.id === draggedEventField) || workspaceFields.find(f => f.id === draggedEventField)
      if (eventField) {
        if ('eventId' in eventField) {
          importWorkspaceField(eventField as WorkspaceField)
        } else {
          addFieldToForm(eventField, targetIndex)
        }
      }
      setDraggedEventField(null)
    } else if (draggedFormField) {
      const fromIndex = editingFields.findIndex(f => f.id === draggedFormField)
      if (fromIndex !== -1 && fromIndex !== targetIndex) {
        moveFormField(fromIndex, targetIndex)
      }
      setDraggedFormField(null)
    }
  }

  const getFieldTypeInfo = (type: FieldType) => FIELD_TYPE_INFO.find(f => f.type === type)

  const FieldIcon = ({ type, className = "w-4 h-4" }: { type: FieldType; className?: string }) => {
    const info = getFieldTypeInfo(type)
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info?.icon || ''} />
      </svg>
    )
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-neutral-950">Forms</h1>
          <p className="text-sm text-neutral-500 mt-0.5">Create and manage forms using your field library</p>
        </div>
        <button
          onClick={() => setIsAddFormModalOpen(true)}
          className="btn btn-primary"
        >
          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Form
        </button>
      </div>

      {/* Empty State Banner */}
      {forms.length === 0 && (
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md bg-white border border-neutral-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-neutral-950 mb-1">Build Forms with Reusable Fields</h2>
              <p className="text-sm text-neutral-600 mb-4">
                Create fields once and reuse them across multiple forms. AI-powered recommendations help you build better forms faster.
              </p>
              <button
                onClick={() => setIsAddFormModalOpen(true)}
                className="btn btn-primary"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your First Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Learn More Button */}
      {forms.length > 0 && (
        <div className="relative" ref={learnMoreRef}>
          <button
            onClick={() => setIsLearnMoreOpen(!isLearnMoreOpen)}
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learn more
            <svg className={`w-3 h-3 transition-transform ${isLearnMoreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isLearnMoreOpen && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral-200 p-4 z-10">
              <h3 className="font-medium text-neutral-950 mb-2">Field-Based Form Builder</h3>
              <p className="text-sm text-neutral-600 mb-3">
                Fields are created at the event level and can be reused across multiple forms.
                AI analyzes your form in real-time to suggest relevant fields.
              </p>
              <div className="space-y-2 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create once, use everywhere
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Import fields from other events
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Smart field suggestions
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form List */}
      {forms.length > 0 && (
        <div className="card">
          <div className="divide-y divide-neutral-100">
            {forms.map((form) => (
              <div
                key={form.id}
                className="p-4 hover:bg-neutral-50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openEditor(form)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-neutral-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-neutral-950">{form.name}</h3>
                          <Badge variant="compact" color={form.status === 'active' ? 'success' : 'neutral'}>
                            {form.status}
                          </Badge>
                        </div>
                        {form.usedIn.length > 0 && (
                          <p className="text-sm text-neutral-500">
                            Used in: {form.usedIn.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">{form.fields.length} fields</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditor(form) }}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); duplicateForm(form) }}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                        title="Duplicate"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedForm(form); setIsPreviewOpen(true) }}
                        className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded"
                        title="Preview"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteForm(form.id) }}
                        className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-neutral-100 rounded"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Form Modal */}
      {isAddFormModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Create New Form</h3>
              <button onClick={() => setIsAddFormModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Form Name</label>
              <input
                type="text"
                value={newFormName}
                onChange={(e) => setNewFormName(e.target.value)}
                placeholder="e.g., Standard Exhibitor Application"
                className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
              />
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsAddFormModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={addNewForm} className="btn btn-primary" disabled={!newFormName.trim()}>Create Form</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Field Modal */}
      {isCreateFieldModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="font-semibold text-neutral-950">Create New Field</h3>
              <button onClick={() => setIsCreateFieldModalOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              {/* Field Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Field Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {FIELD_TYPE_INFO.filter(f => f.type !== 'heading' && f.type !== 'divider').map((ft) => (
                    <button
                      key={ft.type}
                      onClick={() => setNewField({ ...newField, type: ft.type, options: ['select', 'radio', 'checkbox'].includes(ft.type) ? ['Option 1', 'Option 2'] : undefined })}
                      className={`p-2 rounded-md border text-center transition-colors ${
                        newField.type === ft.type ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <FieldIcon type={ft.type} className="w-5 h-5 mx-auto mb-1 text-neutral-500" />
                      <span className="text-xs text-neutral-600">{ft.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Label */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Label</label>
                <input
                  type="text"
                  value={newField.label || ''}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                  placeholder="e.g., Company Name"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>

              {/* Placeholder */}
              {!['radio', 'checkbox', 'file'].includes(newField.type || '') && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Placeholder (optional)</label>
                  <input
                    type="text"
                    value={newField.placeholder || ''}
                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                    placeholder="Enter placeholder text"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                  />
                </div>
              )}

              {/* Options */}
              {['select', 'radio', 'checkbox'].includes(newField.type || '') && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Options</label>
                  <div className="space-y-2">
                    {(newField.options || []).map((opt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...(newField.options || [])]
                            newOpts[i] = e.target.value
                            setNewField({ ...newField, options: newOpts })
                          }}
                          className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                        />
                        <button
                          onClick={() => setNewField({ ...newField, options: (newField.options || []).filter((_, idx) => idx !== i) })}
                          className="p-1 text-neutral-400 hover:text-destructive-text"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setNewField({ ...newField, options: [...(newField.options || []), `Option ${(newField.options || []).length + 1}`] })}
                      className="text-sm text-neutral-600 hover:text-neutral-800"
                    >
                      + Add Option
                    </button>
                  </div>
                </div>
              )}

              {/* Default Width */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Default Width</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewField({ ...newField, defaultWidth: 'half' })}
                    className={`flex-1 px-3 py-2 text-sm rounded-md border ${
                      newField.defaultWidth === 'half' ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Half Width
                  </button>
                  <button
                    onClick={() => setNewField({ ...newField, defaultWidth: 'full' })}
                    className={`flex-1 px-3 py-2 text-sm rounded-md border ${
                      newField.defaultWidth === 'full' ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 text-neutral-600'
                    }`}
                  >
                    Full Width
                  </button>
                </div>
              </div>

              {/* Default Required */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newField.defaultRequired}
                    onChange={(e) => setNewField({ ...newField, defaultRequired: e.target.checked })}
                    className="w-4 h-4 text-neutral-600 rounded focus:ring-neutral-500"
                  />
                  <span className="text-sm text-neutral-700">Required by default</span>
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Tags (optional)</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(newField.tags || []).map((tag, i) => (
                    <Badge key={i} variant="status" color="neutral" onRemove={() => setNewField({ ...newField, tags: (newField.tags || []).filter((_, idx) => idx !== i) })}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <input
                  type="text"
                  value={newFieldTag}
                  onChange={(e) => setNewFieldTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newFieldTag.trim()) {
                      setNewField({ ...newField, tags: [...(newField.tags || []), newFieldTag.trim()] })
                      setNewFieldTag('')
                    }
                  }}
                  placeholder="Add tag and press Enter"
                  className="w-full px-3 py-1.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-admin-primary-500"
                />
              </div>
            </div>
            <div className="p-4 border-t border-neutral-100 flex justify-end gap-2">
              <button onClick={() => setIsCreateFieldModalOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={createNewField} className="btn btn-primary" disabled={!newField.label?.trim()}>Create & Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Editor Modal - Full Screen */}
      {isEditorOpen && selectedForm && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col">
          {/* Editor Header */}
          <div className="h-14 border-b border-neutral-200 px-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsEditorOpen(false)} className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="font-semibold text-neutral-950">{selectedForm.name}</h2>
                <p className="text-xs text-neutral-500">{editingFields.length} fields</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="btn btn-secondary text-sm"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </button>
              <button onClick={saveForm} className="btn btn-primary text-sm">
                Save Form
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Field Library */}
            <div className="w-80 border-r border-neutral-200 bg-neutral-50 flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-neutral-200 bg-white">
                <button
                  onClick={() => setActiveTab('event')}
                  className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === 'event' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Event
                </button>
                <button
                  onClick={() => setActiveTab('workspace')}
                  className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === 'workspace' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Workspace
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex-1 px-2 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === 'ai' ? 'text-neutral-900 border-b-2 border-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  Recommend
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {/* Event Fields Tab */}
                {activeTab === 'event' && (
                  <div className="space-y-3">
                    {/* Search */}
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={eventFieldSearch}
                        onChange={(e) => setEventFieldSearch(e.target.value)}
                        placeholder="Search fields..."
                        className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                      />
                    </div>

                    {/* Create New Field Button */}
                    <button
                      onClick={() => setIsCreateFieldModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border-2 border-dashed border-neutral-300 rounded-md text-sm text-neutral-600 hover:border-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Create New Field
                    </button>

                    {/* Field List */}
                    <div className="space-y-1.5">
                      {filteredEventFields.map((field) => {
                        const isUsed = editingFields.some(f => f.eventFieldId === field.id)
                        return (
                          <div
                            key={field.id}
                            draggable={!isUsed}
                            onDragStart={() => !isUsed && setDraggedEventField(field.id)}
                            onDragEnd={() => setDraggedEventField(null)}
                            onClick={() => !isUsed && addFieldToForm(field)}
                            className={`p-2.5 bg-white border rounded-md transition-all ${
                              isUsed
                                ? 'border-neutral-100 opacity-50 cursor-not-allowed'
                                : 'border-neutral-200 cursor-grab hover:border-neutral-300 hover:shadow-sm active:cursor-grabbing'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 flex items-center justify-center rounded bg-neutral-100 flex-shrink-0">
                                <FieldIcon type={field.type} className="w-3.5 h-3.5 text-neutral-500" />
                              </div>
                              <p className="flex-1 text-sm text-neutral-800 truncate">{field.label}</p>
                              {isUsed ? (
                                <Badge variant="compact" color="neutral" className="flex-shrink-0">Added</Badge>
                              ) : (
                                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Workspace Fields Tab */}
                {activeTab === 'workspace' && (
                  <div className="space-y-3">
                    {/* Search */}
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        value={workspaceFieldSearch}
                        onChange={(e) => setWorkspaceFieldSearch(e.target.value)}
                        placeholder="Search fields..."
                        className="w-full pl-9 pr-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                      />
                    </div>

                    <p className="text-xs text-neutral-500">Import from other events</p>

                    {/* Workspace Field List */}
                    <div className="space-y-2">
                      {filteredWorkspaceFields.map((field) => {
                        const alreadyImported = eventFields.some(ef => ef.label === field.label && ef.type === field.type)
                        const isUsedInForm = editingFields.some(f => f.label === field.label && f.type === field.type)
                        const isDisabled = alreadyImported || isUsedInForm
                        return (
                          <div
                            key={field.id}
                            draggable={!isDisabled}
                            onDragStart={() => !isDisabled && setDraggedEventField(field.id)}
                            onDragEnd={() => setDraggedEventField(null)}
                            onClick={() => !isDisabled && importWorkspaceField(field)}
                            className={`p-2.5 bg-white border rounded-md transition-all ${
                              isDisabled
                                ? 'border-neutral-100 opacity-50 cursor-not-allowed'
                                : 'border-neutral-200 cursor-pointer hover:border-neutral-300 hover:shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 flex items-center justify-center rounded bg-neutral-100 flex-shrink-0">
                                <FieldIcon type={field.type} className="w-3.5 h-3.5 text-neutral-500" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-neutral-800 truncate">{field.label}</p>
                                <p className="text-[11px] text-neutral-400 truncate">{field.eventName}</p>
                              </div>
                              {isUsedInForm ? (
                                <Badge variant="compact" color="neutral" className="flex-shrink-0">Added</Badge>
                              ) : alreadyImported ? (
                                <Badge variant="compact" color="neutral" className="flex-shrink-0">Imported</Badge>
                              ) : (
                                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Recommendation Tab */}
                {activeTab === 'ai' && (
                  <div className="space-y-3">
                    <p className="text-xs text-neutral-500">
                      {isAnalyzing ? 'Analyzing your form...' : 'Suggested fields for your form'}
                    </p>

                    {isAnalyzing ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin w-5 h-5 border-2 border-neutral-400 border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <>
                        {/* Existing field recommendations */}
                        {aiRecommendations.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide">From Library</p>
                            {aiRecommendations.map((rec) => {
                              const field = eventFields.find(f => f.id === rec.fieldId)
                              if (!field) return null
                              const isUsed = editingFields.some(f => f.eventFieldId === field.id)
                              return (
                                <div
                                  key={rec.fieldId}
                                  onClick={() => !isUsed && addFieldToForm(field)}
                                  className={`p-2.5 bg-white border rounded-md transition-all ${
                                    isUsed
                                      ? 'border-neutral-100 opacity-50 cursor-not-allowed'
                                      : 'border-neutral-200 cursor-pointer hover:border-neutral-300 hover:shadow-sm'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 flex items-center justify-center rounded bg-neutral-100 flex-shrink-0">
                                      <FieldIcon type={field.type} className="w-3.5 h-3.5 text-neutral-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-neutral-800 truncate">{field.label}</p>
                                      <p className="text-[11px] text-neutral-400 truncate">{rec.reason}</p>
                                    </div>
                                    {isUsed ? (
                                      <Badge variant="compact" color="neutral" className="flex-shrink-0">Added</Badge>
                                    ) : (
                                      <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}

                        {/* New field suggestions */}
                        {newFieldSuggestions.length > 0 && (
                          <div className="space-y-2 mt-3">
                            <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wide">Create New</p>
                            {newFieldSuggestions.map((suggestion) => (
                              <div
                                key={suggestion.id}
                                onClick={() => createSuggestedField(suggestion)}
                                className="p-2.5 bg-white border border-dashed border-neutral-300 rounded-md cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-all"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 flex items-center justify-center rounded bg-neutral-50 border border-neutral-200 flex-shrink-0">
                                    <FieldIcon type={suggestion.type} className="w-3.5 h-3.5 text-neutral-400" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-neutral-700 truncate">{suggestion.label}</p>
                                    <p className="text-[11px] text-neutral-400 truncate">{suggestion.reason}</p>
                                  </div>
                                  <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {aiRecommendations.length === 0 && newFieldSuggestions.length === 0 && (
                          <div className="text-center py-8 text-neutral-400 text-sm">
                            <p>No recommendations</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Center Panel - Form Canvas */}
            <div className="flex-1 overflow-y-auto bg-neutral-100 p-6">
              <div className="max-w-2xl mx-auto">
                {editingFields.length === 0 ? (
                  <div
                    className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center bg-white"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, 0)}
                  >
                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-neutral-500 mb-1">Drag fields here to build your form</p>
                    <p className="text-sm text-neutral-400">Select fields from the left panel or create new ones</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="space-y-1">
                      {editingFields.map((field, index) => (
                        <div key={field.id}>
                          {/* Drop Zone Before */}
                          <div
                            className={`h-1 rounded transition-all ${
                              (draggedEventField || draggedFormField) ? 'bg-neutral-200 h-12 border-2 border-dashed border-neutral-300 my-2' : ''
                            }`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, index)}
                          />

                          {/* Field Item */}
                          <div
                            draggable
                            onDragStart={() => setDraggedFormField(field.id)}
                            onDragEnd={() => setDraggedFormField(null)}
                            onClick={() => setSelectedFieldId(field.id)}
                            className={`group relative p-4 rounded-md cursor-pointer transition-all ${
                              selectedFieldId === field.id
                                ? 'bg-neutral-50 ring-2 ring-neutral-300'
                                : 'hover:bg-neutral-50'
                            } ${field.width === 'half' ? 'inline-block w-[calc(50%-6px)] mr-3 align-top' : 'block'}`}
                          >
                            {/* Drag Handle - only visible on hover */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                              </svg>
                            </div>

                            {field.type === 'heading' ? (
                              <h3 className="font-semibold text-neutral-950">{field.label}</h3>
                            ) : field.type === 'divider' ? (
                              <hr className="border-neutral-200" />
                            ) : (
                              <>
                                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                                  {field.label}
                                  {field.required && <span className="text-form-required ml-0.5">*</span>}
                                </label>
                                {field.description && (
                                  <p className="text-xs text-neutral-500 mb-2">{field.description}</p>
                                )}
                                {/* Field Preview */}
                                {field.type === 'text' && (
                                  <input type="text" disabled placeholder={field.placeholder || 'Enter text'} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'textarea' && (
                                  <textarea disabled placeholder={field.placeholder || 'Enter text'} rows={3} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'email' && (
                                  <input type="email" disabled placeholder="email@example.com" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'phone' && (
                                  <input type="tel" disabled placeholder="+82 10-1234-5678" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'number' && (
                                  <input type="number" disabled placeholder="0" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'date' && (
                                  <input type="date" disabled className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white" />
                                )}
                                {field.type === 'file' && (
                                  <div className="px-3 py-4 border border-dashed border-neutral-200 rounded-md text-center bg-white">
                                    <p className="text-sm text-neutral-400">Click or drag to upload</p>
                                  </div>
                                )}
                                {field.type === 'select' && (
                                  <select disabled className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm bg-white text-neutral-400">
                                    <option>Select an option</option>
                                  </select>
                                )}
                                {field.type === 'radio' && field.options && (
                                  <div className="space-y-1.5 mt-1">
                                    {field.options.map((opt, i) => (
                                      <label key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                        <input type="radio" disabled className="text-neutral-400" /> {opt}
                                      </label>
                                    ))}
                                  </div>
                                )}
                                {field.type === 'checkbox' && field.options && (
                                  <div className="space-y-1.5 mt-1">
                                    {field.options.map((opt, i) => (
                                      <label key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                        <input type="checkbox" disabled className="text-neutral-400" /> {opt}
                                      </label>
                                    ))}
                                  </div>
                                )}
                              </>
                            )}

                            {/* Delete Button - only visible when selected */}
                            {selectedFieldId === field.id && (
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteFormField(field.id) }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-700 text-white rounded-full flex items-center justify-center hover:bg-neutral-800 shadow-sm"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      {/* Final Drop Zone */}
                      <div
                        className={`h-1 rounded transition-all ${
                          (draggedEventField || draggedFormField) ? 'bg-neutral-200 h-12 border-2 border-dashed border-neutral-300 mt-2' : ''
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(e, editingFields.length)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Field Settings */}
            <div className="w-80 border-l border-neutral-200 bg-white overflow-y-auto">
              {selectedFormField ? (
                <div className="p-4">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase mb-4">Field Settings</h3>

                  <div className="space-y-4">
                    {/* Field Type Badge */}
                    <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-md">
                      <div className="w-7 h-7 flex items-center justify-center rounded bg-white border border-neutral-200">
                        <FieldIcon type={selectedFormField.type} className="w-4 h-4 text-neutral-500" />
                      </div>
                      <span className="text-sm text-neutral-600">{getFieldTypeInfo(selectedFormField.type)?.label}</span>
                    </div>

                    {/* Label */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">Label</label>
                      <input
                        type="text"
                        value={selectedFormField.label}
                        onChange={(e) => updateFormField(selectedFormField.id, { label: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                      />
                    </div>

                    {/* Placeholder */}
                    {!['heading', 'divider', 'radio', 'checkbox', 'file'].includes(selectedFormField.type) && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Placeholder</label>
                        <input
                          type="text"
                          value={selectedFormField.placeholder || ''}
                          onChange={(e) => updateFormField(selectedFormField.id, { placeholder: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                        />
                      </div>
                    )}

                    {/* Description */}
                    {!['heading', 'divider'].includes(selectedFormField.type) && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Help Text</label>
                        <input
                          type="text"
                          value={selectedFormField.description || ''}
                          onChange={(e) => updateFormField(selectedFormField.id, { description: e.target.value })}
                          placeholder="Optional description"
                          className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                        />
                      </div>
                    )}

                    {/* Options */}
                    {['select', 'radio', 'checkbox'].includes(selectedFormField.type) && selectedFormField.options && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Options</label>
                        <div className="space-y-2">
                          {selectedFormField.options.map((opt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...selectedFormField.options!]
                                  newOpts[i] = e.target.value
                                  updateFormField(selectedFormField.id, { options: newOpts })
                                }}
                                className="flex-1 px-3 py-1.5 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                              />
                              <button
                                onClick={() => {
                                  const newOpts = selectedFormField.options!.filter((_, idx) => idx !== i)
                                  updateFormField(selectedFormField.id, { options: newOpts })
                                }}
                                className="p-1 text-neutral-400 hover:text-destructive-text"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => updateFormField(selectedFormField.id, { options: [...selectedFormField.options!, `Option ${selectedFormField.options!.length + 1}`] })}
                            className="text-sm text-neutral-600 hover:text-neutral-800"
                          >
                            + Add Option
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Width */}
                    {!['heading', 'divider', 'textarea'].includes(selectedFormField.type) && (
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">Width</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateFormField(selectedFormField.id, { width: 'half' })}
                            className={`flex-1 px-3 py-2 text-sm rounded-md border ${
                              selectedFormField.width === 'half' ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 text-neutral-600'
                            }`}
                          >
                            Half
                          </button>
                          <button
                            onClick={() => updateFormField(selectedFormField.id, { width: 'full' })}
                            className={`flex-1 px-3 py-2 text-sm rounded-md border ${
                              selectedFormField.width === 'full' ? 'border-neutral-400 bg-neutral-50' : 'border-neutral-200 text-neutral-600'
                            }`}
                          >
                            Full
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Required */}
                    {!['heading', 'divider'].includes(selectedFormField.type) && (
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFormField.required}
                            onChange={(e) => updateFormField(selectedFormField.id, { required: e.target.checked })}
                            className="w-4 h-4 text-neutral-600 rounded focus:ring-neutral-500"
                          />
                          <span className="text-sm text-neutral-700">Required field</span>
                        </label>
                      </div>
                    )}

                    {/* Delete Field */}
                    <div className="pt-4 border-t border-neutral-100">
                      <button
                        onClick={() => deleteFormField(selectedFormField.id)}
                        className="w-full px-3 py-2 text-sm text-destructive-text hover:bg-destructive-bg rounded-md transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove from Form
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center text-neutral-500">
                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <p className="text-sm">Select a field to edit its settings</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {isPreviewOpen && selectedForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-8">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-full overflow-hidden flex flex-col">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-950">Form Preview</h3>
                <p className="text-sm text-neutral-500">{selectedForm.name}</p>
              </div>
              <button onClick={() => setIsPreviewOpen(false)} className="p-1 text-neutral-400 hover:text-neutral-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-neutral-50">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 max-w-xl mx-auto">
                <h2 className="text-lg font-semibold text-neutral-950 mb-6">{selectedForm.name}</h2>
                <div className="space-y-4">
                  {(isEditorOpen ? editingFields : selectedForm.fields).map((field) => (
                    <div key={field.id} className={field.width === 'half' ? 'inline-block w-[calc(50%-8px)] mr-4 align-top' : 'block'}>
                      {field.type === 'heading' ? (
                        <h3 className="font-semibold text-neutral-950 text-lg mt-4">{field.label}</h3>
                      ) : field.type === 'divider' ? (
                        <hr className="border-neutral-200 my-4" />
                      ) : (
                        <>
                          <label className="block text-sm font-medium text-neutral-700 mb-1">
                            {field.label}
                            {field.required && <span className="text-form-required ml-0.5">*</span>}
                          </label>
                          {field.description && (
                            <p className="text-xs text-neutral-500 mb-1">{field.description}</p>
                          )}
                          {field.type === 'text' && (
                            <input type="text" placeholder={field.placeholder} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'textarea' && (
                            <textarea placeholder={field.placeholder} rows={3} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'email' && (
                            <input type="email" placeholder={field.placeholder || 'email@example.com'} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'phone' && (
                            <input type="tel" placeholder={field.placeholder || '+82 10-1234-5678'} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'number' && (
                            <input type="number" placeholder={field.placeholder || '0'} className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'date' && (
                            <input type="date" className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                          )}
                          {field.type === 'file' && (
                            <div className="px-3 py-6 border-2 border-dashed border-neutral-300 rounded-md text-center hover:border-neutral-400 transition-colors cursor-pointer">
                              <svg className="w-8 h-8 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-sm text-neutral-500">Click or drag file to upload</p>
                            </div>
                          )}
                          {field.type === 'select' && field.options && (
                            <select className="w-full px-3 py-2 border border-neutral-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300">
                              <option value="">Select an option</option>
                              {field.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          )}
                          {field.type === 'radio' && field.options && (
                            <div className="space-y-2">
                              {field.options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                  <input type="radio" name={field.id} className="w-4 h-4 text-neutral-600" />
                                  <span className="text-sm text-neutral-700">{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          {field.type === 'checkbox' && field.options && (
                            <div className="space-y-2">
                              {field.options.map((opt, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" className="w-4 h-4 text-neutral-600 rounded" />
                                  <span className="text-sm text-neutral-700">{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200">
                  <button className="w-full btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

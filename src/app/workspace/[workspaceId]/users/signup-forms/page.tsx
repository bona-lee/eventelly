'use client'

import { useState, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Badge } from '@/components/Badge'

interface FieldOption {
  id: string
  label: string
  isOther?: boolean // 기타 입력란 여부
}

interface FormField {
  id: string
  name: string
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'file'
  required: boolean
  enabled: boolean
  order: number
  options?: FieldOption[]
  allowOther?: boolean // 기타 입력란 허용 여부
  hasData?: boolean // 데이터가 있는지 여부
}

interface MemberTypeSettings {
  name: string
  description: string
  fields: FormField[]
}

export default function MemberSettingsPage() {
  const params = useParams()
  const workspaceId = params.workspaceId as string

  const [activeTab, setActiveTab] = useState<'exhibitor' | 'visitor'>('exhibitor')
  const [showAddFieldModal, setShowAddFieldModal] = useState(false)
  const [editingField, setEditingField] = useState<FormField | null>(null)

  const [exhibitorSettings, setExhibitorSettings] = useState<MemberTypeSettings>({
    name: 'Exhibitor',
    description: 'Companies participating in events as exhibitors',
    fields: [
      { id: '1', name: 'Company Name', type: 'text', required: true, enabled: true, order: 1, hasData: true },
      { id: '2', name: 'Business Registration Number', type: 'text', required: true, enabled: true, order: 2, hasData: true },
      { id: '3', name: 'Representative Name', type: 'text', required: true, enabled: true, order: 3, hasData: true },
      { id: '4', name: 'Email', type: 'email', required: true, enabled: true, order: 4, hasData: true },
      { id: '5', name: 'Phone', type: 'phone', required: true, enabled: true, order: 5, hasData: true },
      { id: '6', name: 'Company Address', type: 'text', required: false, enabled: true, order: 6, hasData: true },
      { id: '7', name: 'Website', type: 'text', required: false, enabled: true, order: 7, hasData: false },
      { id: '8', name: 'Industry', type: 'select', required: false, enabled: true, order: 8, hasData: true, options: [
        { id: '1', label: 'Furniture' },
        { id: '2', label: 'Interior Design' },
        { id: '3', label: 'Home Appliances' },
        { id: '4', label: 'Lighting' },
        { id: '5', label: 'Other' },
      ]},
      { id: '9', name: 'Company Introduction', type: 'textarea', required: false, enabled: true, order: 9, hasData: false },
      { id: '10', name: 'Logo', type: 'file', required: false, enabled: false, order: 10, hasData: false },
    ]
  })

  const [visitorSettings, setVisitorSettings] = useState<MemberTypeSettings>({
    name: 'Visitor',
    description: 'Individual visitors attending events',
    fields: [
      { id: '1', name: 'Name', type: 'text', required: true, enabled: true, order: 1, hasData: true },
      { id: '2', name: 'Email', type: 'email', required: true, enabled: true, order: 2, hasData: true },
      { id: '3', name: 'Phone', type: 'phone', required: true, enabled: true, order: 3, hasData: true },
      { id: '4', name: 'Company', type: 'text', required: false, enabled: true, order: 4, hasData: true },
      { id: '5', name: 'Position', type: 'text', required: false, enabled: true, order: 5, hasData: false },
      { id: '6', name: 'Country', type: 'select', required: false, enabled: true, order: 6, hasData: true, options: [
        { id: '1', label: 'South Korea' },
        { id: '2', label: 'United States' },
        { id: '3', label: 'Japan' },
        { id: '4', label: 'China' },
        { id: '5', label: 'Other' },
      ]},
      { id: '7', name: 'Interest Areas', type: 'checkbox', required: false, enabled: false, order: 7, hasData: false, options: [
        { id: '1', label: 'Furniture' },
        { id: '2', label: 'Interior Design' },
        { id: '3', label: 'Home Appliances' },
      ]},
      { id: '8', name: 'Visit Purpose', type: 'radio', required: false, enabled: false, order: 8, hasData: false, options: [
        { id: '1', label: 'Business' },
        { id: '2', label: 'Personal Interest' },
        { id: '3', label: 'Press/Media' },
      ]},
    ]
  })

  const [newField, setNewField] = useState<Partial<FormField>>({
    name: '',
    type: 'text',
    required: false,
    options: [],
    allowOther: false,
  })
  const [newOption, setNewOption] = useState('')
  const [editNewOption, setEditNewOption] = useState('')

  // Dropdown states for field type
  const [isNewFieldTypeOpen, setIsNewFieldTypeOpen] = useState(false)
  const newFieldTypeRef = useRef<HTMLDivElement>(null)
  const [isEditFieldTypeOpen, setIsEditFieldTypeOpen] = useState(false)
  const editFieldTypeRef = useRef<HTMLDivElement>(null)

  const fieldTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'select', label: 'Dropdown' },
    { value: 'checkbox', label: 'Checkbox (Multiple)' },
    { value: 'radio', label: 'Radio (Single)' },
    { value: 'textarea', label: 'Long Text' },
    { value: 'date', label: 'Date' },
    { value: 'file', label: 'File Upload' },
  ]

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newFieldTypeRef.current && !newFieldTypeRef.current.contains(event.target as Node)) {
        setIsNewFieldTypeOpen(false)
      }
      if (editFieldTypeRef.current && !editFieldTypeRef.current.contains(event.target as Node)) {
        setIsEditFieldTypeOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const currentSettings = activeTab === 'exhibitor' ? exhibitorSettings : visitorSettings
  const setCurrentSettings = activeTab === 'exhibitor' ? setExhibitorSettings : setVisitorSettings

  const hasOptionsType = (type: string) => ['select', 'checkbox', 'radio'].includes(type)

  const openEditModal = (field: FormField) => {
    setEditingField({ ...field, options: field.options ? [...field.options] : [] })
  }

  const handleDeleteField = (fieldId: string) => {
    const field = currentSettings.fields.find(f => f.id === fieldId)
    if (field?.hasData) {
      alert('This field cannot be deleted because it contains existing data. Please remove all data first.')
      return
    }
    if (confirm('Are you sure you want to delete this field?')) {
      setCurrentSettings(prev => ({
        ...prev,
        fields: prev.fields.filter(f => f.id !== fieldId)
      }))
    }
  }

  const handleAddField = () => {
    if (!newField.name) return

    const newFieldData: FormField = {
      id: Date.now().toString(),
      name: newField.name,
      type: newField.type as FormField['type'],
      required: newField.required || false,
      enabled: true,
      order: currentSettings.fields.length + 1,
      options: hasOptionsType(newField.type || 'text') ? newField.options : undefined,
      hasData: false,
    }

    setCurrentSettings(prev => ({
      ...prev,
      fields: [...prev.fields, newFieldData]
    }))

    setNewField({ name: '', type: 'text', required: false, options: [] })
    setShowAddFieldModal(false)
  }

  const handleSaveField = () => {
    if (!editingField) return

    setCurrentSettings(prev => ({
      ...prev,
      fields: prev.fields.map(f =>
        f.id === editingField.id ? editingField : f
      )
    }))
    setEditingField(null)
  }

  const addOptionToNewField = () => {
    if (!newOption.trim()) return
    setNewField(prev => ({
      ...prev,
      options: [...(prev.options || []), { id: Date.now().toString(), label: newOption.trim() }]
    }))
    setNewOption('')
  }

  const removeOptionFromNewField = (optionId: string) => {
    setNewField(prev => ({
      ...prev,
      options: (prev.options || []).filter(o => o.id !== optionId)
    }))
  }

  const addOptionToEditingField = () => {
    if (!newOption.trim() || !editingField) return
    setEditingField(prev => prev ? {
      ...prev,
      options: [...(prev.options || []), { id: Date.now().toString(), label: newOption.trim() }]
    } : null)
    setNewOption('')
  }

  const removeOptionFromEditingField = (optionId: string) => {
    if (!editingField) return
    setEditingField(prev => prev ? {
      ...prev,
      options: (prev.options || []).filter(o => o.id !== optionId)
    } : null)
  }

  const moveOptionInNewField = (index: number, direction: 'up' | 'down') => {
    const options = [...(newField.options || [])]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= options.length) return
    ;[options[index], options[newIndex]] = [options[newIndex], options[index]]
    setNewField(prev => ({ ...prev, options }))
  }

  const moveOptionInEditingField = (index: number, direction: 'up' | 'down') => {
    if (!editingField) return
    const options = [...(editingField.options || [])]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= options.length) return
    ;[options[index], options[newIndex]] = [options[newIndex], options[index]]
    setEditingField(prev => prev ? { ...prev, options } : null)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'text': return 'Text'
      case 'email': return 'Email'
      case 'phone': return 'Phone'
      case 'select': return 'Dropdown'
      case 'textarea': return 'Long Text'
      case 'checkbox': return 'Checkbox'
      case 'radio': return 'Radio'
      case 'date': return 'Date'
      case 'file': return 'File Upload'
      default: return type
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        )
      case 'select':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        )
      case 'checkbox':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'radio':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        )
      case 'textarea':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h10" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-950">Signup Forms</h1>
        <p className="mt-1 text-sm text-neutral-500">Configure signup forms for exhibitors and visitors</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab('exhibitor')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'exhibitor'
                ? 'border-admin-primary text-admin-primary-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Exhibitor Registration
          </button>
          <button
            onClick={() => setActiveTab('visitor')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === 'visitor'
                ? 'border-admin-primary text-admin-primary-700'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Visitor Registration
          </button>
        </nav>
      </div>

      {/* Form Fields */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-neutral-950">{currentSettings.name} Form Fields</h3>
            <p className="text-sm text-neutral-500 mt-1">{currentSettings.description}</p>
          </div>
          <button
            onClick={() => setShowAddFieldModal(true)}
            className="btn btn-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Field
          </button>
        </div>

        {/* Fields Table */}
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <table className="table">
            <thead>
              <tr>
                <th className="w-12">#</th>
                <th>Field Name</th>
                <th className="w-32">Type</th>
                <th className="text-center w-24">Required</th>
                <th className="text-center w-24">Enabled</th>
                <th className="text-right w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSettings.fields.map((field, index) => (
                <tr
                  key={field.id}
                  className={field.enabled ? 'bg-white' : 'bg-neutral-50'}
                >
                  <td>
                    <span className="text-sm text-neutral-400">{index + 1}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${field.enabled ? 'text-neutral-950' : 'text-neutral-400'}`}>
                        {field.name}
                      </span>
                      {field.hasData && (
                        <Badge variant="compact" color="info">Has Data</Badge>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-neutral-500">
                      {getTypeIcon(field.type)}
                      <span className="text-sm">{getTypeLabel(field.type)}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={() => {
                        setCurrentSettings(prev => ({
                          ...prev,
                          fields: prev.fields.map(f =>
                            f.id === field.id ? { ...f, required: !f.required } : f
                          )
                        }))
                      }}
                      disabled={!field.enabled}
                      className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500 disabled:opacity-50"
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={field.enabled}
                      onChange={() => {
                        setCurrentSettings(prev => ({
                          ...prev,
                          fields: prev.fields.map(f =>
                            f.id === field.id ? { ...f, enabled: !f.enabled } : f
                          )
                        }))
                      }}
                      className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                    />
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(field)}
                        className="p-1.5 text-neutral-400 hover:text-admin-primary-700 hover:bg-admin-primary-50 rounded-md transition-colors"
                        title="Edit field"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteField(field.id)}
                        className="p-1.5 text-neutral-400 hover:text-destructive-text hover:bg-destructive-bg rounded-md transition-colors"
                        title="Delete field"
                      >
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

        {/* Tips */}
        <div className="mt-6 p-4 bg-status-info-bg border border-status-info-border rounded-lg">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-status-info-border flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-status-info-text">Tips</p>
              <ul className="text-xs text-status-info-text mt-1 space-y-0.5">
                <li>Required fields must be filled during registration</li>
                <li>Disabled fields will not appear on the registration form</li>
                <li>Fields with existing data cannot be deleted</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-end">
          <button className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      {/* Add Field Modal */}
      {showAddFieldModal && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowAddFieldModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Add New Field</h3>
              <button onClick={() => setShowAddFieldModal(false)} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Field Name <span className="text-form-required">*</span></label>
                <input
                  type="text"
                  value={newField.name || ''}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  placeholder="e.g., Job Title"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Field Type</label>
                <div className="relative" ref={newFieldTypeRef}>
                  <button
                    type="button"
                    onClick={() => setIsNewFieldTypeOpen(!isNewFieldTypeOpen)}
                    className="w-full input text-left flex items-center justify-between pr-4"
                  >
                    <span className="text-neutral-950 flex-1">
                      {fieldTypeOptions.find(opt => opt.value === newField.type)?.label || 'Text'}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isNewFieldTypeOpen && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {fieldTypeOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => { setNewField({ ...newField, type: opt.value as FormField['type'], options: [] }); setIsNewFieldTypeOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${newField.type === opt.value ? 'bg-admin-primary-50' : ''}`}
                          >
                            <span className="text-sm text-neutral-800">{opt.label}</span>
                            {newField.type === opt.value && (
                              <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Options for select, checkbox, radio */}
              {hasOptionsType(newField.type || 'text') && (
                <div>
                  <label className="label">Options</label>
                  <div className="space-y-2">
                    {(newField.options || []).map((option, index) => (
                      <div key={option.id} className="flex items-center gap-1">
                        <div className="flex flex-col">
                          <button
                            onClick={() => moveOptionInNewField(index, 'up')}
                            disabled={index === 0}
                            className="p-0.5 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveOptionInNewField(index, 'down')}
                            disabled={index === (newField.options?.length || 0) - 1}
                            className="p-0.5 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <span className="flex-1 px-3 py-2 bg-neutral-50 rounded-md text-sm text-neutral-950">
                          {index + 1}. {option.label}
                        </span>
                        <button
                          onClick={() => removeOptionFromNewField(option.id)}
                          className="p-1.5 text-neutral-400 hover:text-destructive-text rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOptionToNewField())}
                        placeholder="Add option"
                        className="input flex-1"
                      />
                      <button
                        onClick={addOptionToNewField}
                        className="btn btn-secondary"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Allow Other Option */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
                    <input
                      type="checkbox"
                      id="allow-other-new"
                      checked={newField.allowOther || false}
                      onChange={(e) => setNewField({ ...newField, allowOther: e.target.checked })}
                      className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                    />
                    <label htmlFor="allow-other-new" className="text-sm text-neutral-950">
                      Allow &quot;Other&quot; option with text input
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="required"
                  checked={newField.required || false}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                />
                <label htmlFor="required" className="text-sm text-neutral-950">Required field</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-100">
              <button onClick={() => setShowAddFieldModal(false)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={handleAddField}
                disabled={!newField.name || (hasOptionsType(newField.type || 'text') && (!newField.options || newField.options.length === 0))}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Field Modal */}
      {editingField && (
        <div
          className="fixed inset-0 bg-neutral-950/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setEditingField(null)}
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-neutral-950">Edit Field</h3>
              <button onClick={() => setEditingField(null)} className="p-1 text-neutral-400 hover:text-neutral-600 rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Field Name <span className="text-form-required">*</span></label>
                <input
                  type="text"
                  value={editingField.name}
                  onChange={(e) => setEditingField({ ...editingField, name: e.target.value })}
                  placeholder="e.g., Job Title"
                  className="input"
                />
              </div>

              <div>
                <label className="label">Field Type</label>
                <div className="relative" ref={editFieldTypeRef}>
                  <button
                    type="button"
                    onClick={() => !editingField.hasData && setIsEditFieldTypeOpen(!isEditFieldTypeOpen)}
                    className={`w-full input text-left flex items-center justify-between pr-4 ${editingField.hasData ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                    disabled={editingField.hasData}
                  >
                    <span className="text-neutral-950 flex-1">
                      {fieldTypeOptions.find(opt => opt.value === editingField.type)?.label || 'Text'}
                    </span>
                    <svg className="w-4 h-4 text-neutral-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isEditFieldTypeOpen && !editingField.hasData && (
                    <div className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-neutral-100 overflow-hidden">
                      <div className="py-1 max-h-60 overflow-y-auto">
                        {fieldTypeOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => { setEditingField({ ...editingField, type: opt.value as FormField['type'], options: hasOptionsType(opt.value) ? editingField.options || [] : undefined }); setIsEditFieldTypeOpen(false) }}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-neutral-50 transition-colors ${editingField.type === opt.value ? 'bg-admin-primary-50' : ''}`}
                          >
                            <span className="text-sm text-neutral-800">{opt.label}</span>
                            {editingField.type === opt.value && (
                              <svg className="w-4 h-4 text-admin-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {editingField.hasData && (
                  <p className="text-xs text-status-warning-border mt-1">Field type cannot be changed because it contains data</p>
                )}
              </div>

              {/* Options for select, checkbox, radio */}
              {hasOptionsType(editingField.type) && (
                <div>
                  <label className="label">Options</label>
                  <div className="space-y-2">
                    {(editingField.options || []).map((option, index) => (
                      <div key={option.id} className="flex items-center gap-1">
                        <div className="flex flex-col">
                          <button
                            onClick={() => moveOptionInEditingField(index, 'up')}
                            disabled={index === 0}
                            className="p-0.5 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            onClick={() => moveOptionInEditingField(index, 'down')}
                            disabled={index === (editingField.options?.length || 0) - 1}
                            className="p-0.5 text-neutral-400 hover:text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <span className="flex-1 px-3 py-2 bg-neutral-50 rounded-md text-sm text-neutral-950">
                          {index + 1}. {option.label}
                        </span>
                        <button
                          onClick={() => removeOptionFromEditingField(option.id)}
                          className="p-1.5 text-neutral-400 hover:text-destructive-text rounded"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editNewOption}
                        onChange={(e) => setEditNewOption(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            if (editNewOption.trim() && editingField) {
                              setEditingField(prev => prev ? {
                                ...prev,
                                options: [...(prev.options || []), { id: Date.now().toString(), label: editNewOption.trim() }]
                              } : null)
                              setEditNewOption('')
                            }
                          }
                        }}
                        placeholder="Add option"
                        className="input flex-1"
                      />
                      <button
                        onClick={() => {
                          if (editNewOption.trim() && editingField) {
                            setEditingField(prev => prev ? {
                              ...prev,
                              options: [...(prev.options || []), { id: Date.now().toString(), label: editNewOption.trim() }]
                            } : null)
                            setEditNewOption('')
                          }
                        }}
                        className="btn btn-secondary"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Allow Other Option */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100">
                    <input
                      type="checkbox"
                      id="allow-other-edit"
                      checked={editingField.allowOther || false}
                      onChange={(e) => setEditingField(prev => prev ? { ...prev, allowOther: e.target.checked } : null)}
                      className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                    />
                    <label htmlFor="allow-other-edit" className="text-sm text-neutral-950">
                      Allow &quot;Other&quot; option with text input
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-required"
                  checked={editingField.required}
                  onChange={(e) => setEditingField({ ...editingField, required: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                />
                <label htmlFor="edit-required" className="text-sm text-neutral-950">Required field</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="edit-enabled"
                  checked={editingField.enabled}
                  onChange={(e) => setEditingField({ ...editingField, enabled: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 text-admin-primary-600 focus:ring-admin-primary-500"
                />
                <label htmlFor="edit-enabled" className="text-sm text-neutral-950">Enabled</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-neutral-100">
              <button onClick={() => setEditingField(null)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button
                onClick={handleSaveField}
                disabled={!editingField.name || (hasOptionsType(editingField.type) && (!editingField.options || editingField.options.length === 0))}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

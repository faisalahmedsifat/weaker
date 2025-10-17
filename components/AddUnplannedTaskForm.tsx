'use client'

import { useState } from 'react'

interface AddUnplannedTaskFormProps {
  onSubmit: (data: { name: string; estimatedHours?: number; category: string }) => void
  onCancel: () => void
}

export default function AddUnplannedTaskForm({ onSubmit, onCancel }: AddUnplannedTaskFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    estimatedHours: '',
    category: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : undefined,
      category: formData.category
    })
    setFormData({ name: '', estimatedHours: '', category: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4 border-2 border-red-200 dark:border-red-800">
      <div className="mb-2">
        <p className="text-sm font-medium text-red-700 dark:text-red-300">
          Add Unplanned Task
        </p>
        <p className="text-xs text-red-600 dark:text-red-400">
          Track work you're doing that wasn't planned
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Task name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          required
        />

        <input
          type="number"
          step="0.5"
          placeholder="Hours (optional)"
          value={formData.estimatedHours}
          onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
          className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        />

        <input
          type="text"
          list="category-suggestions-unplanned"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          required
        />
        <datalist id="category-suggestions-unplanned">
          <option value="PhD" />
          <option value="Test Project" />
          <option value="Dev" />
          <option value="Life" />
          <option value="Flat" />
          <option value="Admin" />
        </datalist>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Add Unplanned
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

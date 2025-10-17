'use client'

import { useState } from 'react'

interface AddTaskFormProps {
  onSubmit: (data: { name: string; estimatedHours?: number; category: string }) => void
  onCancel: () => void
}

export default function AddTaskForm({ onSubmit, onCancel }: AddTaskFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    estimatedHours: '',
    category: 'PhD'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name: formData.name,
      estimatedHours: formData.estimatedHours ? parseFloat(formData.estimatedHours) : undefined,
      category: formData.category
    })
    setFormData({ name: '', estimatedHours: '', category: 'PhD' })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
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

        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="px-3 py-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
        >
          <option>PhD</option>
          <option>Jomidaar</option>
          <option>Dev</option>
          <option>Life</option>
          <option>Flat</option>
          <option>Admin</option>
        </select>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Add Task
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

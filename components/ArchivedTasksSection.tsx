'use client'

import { useState } from 'react'
import { unarchiveTask, deleteTask } from '@/app/actions'
import TaskItem from './TaskItem'

interface Task {
  id: number
  name: string
  estimatedHours: number | null
  category: string
  archived: boolean
  archivedAt: Date | null
}

interface ArchivedTasksSectionProps {
  tasks: Task[]
}

export default function ArchivedTasksSection({ tasks }: ArchivedTasksSectionProps) {
  const [showArchived, setShowArchived] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <button
        onClick={() => setShowArchived(!showArchived)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Archived Tasks ({tasks.length})
        </h2>
        <span className="text-gray-500 dark:text-gray-400">
          {showArchived ? '▼' : '▶'}
        </span>
      </button>

      {showArchived && (
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-gray-400 italic">
              No archived tasks yet.
            </p>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <div className="flex-1">
                  <TaskItem
                    task={task}
                    completed={true}
                    showCheckbox={false}
                    showAddButton={false}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => unarchiveTask(task.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
                    title="Restore to All Tasks"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                    title="Delete permanently"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

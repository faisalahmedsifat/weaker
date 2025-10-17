'use client'

import { useState } from 'react'
import { addToThisWeek, createTask } from '@/app/actions'
import TaskItem from './TaskItem'
import AddTaskForm from './AddTaskForm'

interface Task {
  id: number
  name: string
  estimatedHours: number | null
  category: string
}

interface AllTasksSectionProps {
  tasks: Task[]
  addedTaskIds: number[]
}

export default function AllTasksSection({ tasks, addedTaskIds }: AllTasksSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          All Tasks
        </h2>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          + New Task
        </button>
      </div>

      {showAddForm && (
        <AddTaskForm
          onSubmit={async (data) => {
            await createTask(data)
            setShowAddForm(false)
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="space-y-2 mt-4">
        {tasks.length === 0 ? (
          <p className="text-gray-400 italic">
            No tasks yet. Create your first task!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onAdd={() => addToThisWeek(task.id)}
              showAddButton={true}
              isAdded={addedTaskIds.includes(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

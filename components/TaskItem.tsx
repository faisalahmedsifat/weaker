'use client'

const categoryColors: Record<string, string> = {
  PhD: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Test Project': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Dev: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Life: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Flat: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Admin: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
}

interface Task {
  id: number
  name: string
  estimatedHours: number | null
  category: string
}

interface TaskItemProps {
  task: Task
  weeklyTaskId?: number
  completed?: boolean
  onToggle?: () => void
  onAdd?: () => void
  showCheckbox?: boolean
  showAddButton?: boolean
}

export default function TaskItem({
  task,
  completed = false,
  onToggle,
  onAdd,
  showCheckbox = false,
  showAddButton = false
}: TaskItemProps) {
  return (
    <div className={`
      flex items-center justify-between p-3 rounded-lg border
      ${completed
        ? 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600'
        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
      }
      hover:shadow-md transition
    `}>
      <div className="flex items-center gap-3 flex-1">
        {showCheckbox && (
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
        )}

        <div className="flex-1">
          <p className={`font-medium ${completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
            {task.name}
          </p>

          {task.estimatedHours && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {task.estimatedHours}h
            </p>
          )}
        </div>

        <span className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${categoryColors[task.category] || categoryColors.Admin}
        `}>
          {task.category}
        </span>
      </div>

      {showAddButton && (
        <button
          onClick={onAdd}
          className="ml-3 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add
        </button>
      )}
    </div>
  )
}

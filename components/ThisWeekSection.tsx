'use client'

import { useState } from 'react'
import { toggleTaskCompletion, clearCompletedTasks, startNewWeek } from '@/app/actions'
import TaskItem from './TaskItem'
import WeeklyStats from './WeeklyStats'

interface Task {
  id: number
  name: string
  estimatedHours: number | null
  category: string
}

interface WeeklyTask {
  id: number
  taskId: number
  completed: boolean
  completedAt: Date | null
  addedAt: Date
  task: Task
}

interface ThisWeekSectionProps {
  activeTasks: WeeklyTask[]
  completedTasks: WeeklyTask[]
  completionRate: number
  totalHoursPlanned: number
  hoursCompleted: number
}

export default function ThisWeekSection({
  activeTasks,
  completedTasks,
  completionRate,
  totalHoursPlanned,
  hoursCompleted
}: ThisWeekSectionProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          This Week
        </h2>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      <WeeklyStats
        completed={completedTasks.length}
        total={activeTasks.length + completedTasks.length}
        completionRate={completionRate}
        hoursCompleted={hoursCompleted}
        totalHoursPlanned={totalHoursPlanned}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Active Tasks ({activeTasks.length})
        </h3>

        {activeTasks.length === 0 ? (
          <p className="text-gray-400 italic">
            No active tasks. Add some from below!
          </p>
        ) : (
          <div className="space-y-2">
            {activeTasks.map((wt) => (
              <TaskItem
                key={wt.id}
                task={wt.task}
                weeklyTaskId={wt.id}
                completed={wt.completed}
                onToggle={() => toggleTaskCompletion(wt.id)}
                showCheckbox={true}
              />
            ))}
          </div>
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-3"
          >
            <span className="mr-2">{showCompleted ? '▼' : '▶'}</span>
            Completed this week ({completedTasks.length})
          </button>

          {showCompleted && (
            <div className="space-y-2">
              {completedTasks.map((wt) => (
                <TaskItem
                  key={wt.id}
                  task={wt.task}
                  weeklyTaskId={wt.id}
                  completed={true}
                  onToggle={() => toggleTaskCompletion(wt.id)}
                  showCheckbox={true}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => startNewWeek()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start New Week
        </button>

        {completedTasks.length > 0 && (
          <button
            onClick={() => clearCompletedTasks()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  )
}

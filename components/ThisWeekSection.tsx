'use client'

import { useState } from 'react'
import { toggleTaskCompletion, toggleInProgress, clearCompletedTasks, startNewWeek, addUnplannedTask } from '@/app/actions'
import TaskItem from './TaskItem'
import WeeklyStats from './WeeklyStats'
import AddUnplannedTaskForm from './AddUnplannedTaskForm'

interface Task {
  id: number
  name: string
  estimatedHours: number | null
  category: string
}

interface WeeklyTask {
  id: number
  taskId: number | null
  completed: boolean
  completedAt: Date | null
  inProgress: boolean
  unplanned: boolean
  addedAt: Date
  task: Task | null
  unplannedName: string | null
  unplannedHours: number | null
  unplannedCategory: string | null
}

interface ThisWeekSectionProps {
  activeTasks: WeeklyTask[]
  completedTasks: WeeklyTask[]
  completionRate: number
  totalHoursPlanned: number
  hoursCompleted: number
  plannedHours: number
  unplannedHours: number
}

export default function ThisWeekSection({
  activeTasks,
  completedTasks,
  completionRate,
  totalHoursPlanned,
  hoursCompleted,
  plannedHours,
  unplannedHours
}: ThisWeekSectionProps) {
  const [showCompleted, setShowCompleted] = useState(false)
  const [showUnplannedForm, setShowUnplannedForm] = useState(false)

  const handleAddUnplanned = async (data: { name: string; estimatedHours?: number; category: string }) => {
    await addUnplannedTask(data)
    setShowUnplannedForm(false)
  }

  // Separate planned and unplanned tasks
  const plannedTasks = activeTasks.filter(wt => !wt.unplanned)
  const unplannedTasks = activeTasks.filter(wt => wt.unplanned)

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
        plannedHours={plannedHours}
        unplannedHours={unplannedHours}
      />

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Planned Tasks ({plannedTasks.length})
        </h3>

        {plannedTasks.length === 0 ? (
          <p className="text-gray-400 italic">
            No planned tasks. Add some from below!
          </p>
        ) : (
          <div className="space-y-2">
            {[...plannedTasks]
              .sort((a, b) => (b.inProgress ? 1 : 0) - (a.inProgress ? 1 : 0))
              .map((wt) => (
                <TaskItem
                  key={wt.id}
                  task={wt.task!}
                  weeklyTaskId={wt.id}
                  completed={wt.completed}
                  inProgress={wt.inProgress}
                  onToggle={() => toggleTaskCompletion(wt.id)}
                  onToggleInProgress={() => toggleInProgress(wt.id)}
                  showCheckbox={true}
                />
              ))}
          </div>
        )}
      </div>

      {/* Unplanned Tasks Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Unplanned Tasks ({unplannedTasks.length})
          </h3>
          <button
            onClick={() => setShowUnplannedForm(!showUnplannedForm)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            {showUnplannedForm ? 'Cancel' : '+ Add Unplanned'}
          </button>
        </div>

        {showUnplannedForm && (
          <AddUnplannedTaskForm
            onSubmit={handleAddUnplanned}
            onCancel={() => setShowUnplannedForm(false)}
          />
        )}

        {unplannedTasks.length > 0 && (
          <div className="space-y-2">
            {unplannedTasks.map((wt) => (
              <TaskItem
                key={wt.id}
                task={{
                  id: wt.id,
                  name: wt.unplannedName!,
                  estimatedHours: wt.unplannedHours,
                  category: wt.unplannedCategory!
                }}
                weeklyTaskId={wt.id}
                completed={wt.completed}
                inProgress={wt.inProgress}
                unplanned={true}
                onToggle={() => toggleTaskCompletion(wt.id)}
                onToggleInProgress={() => toggleInProgress(wt.id)}
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
                  task={wt.unplanned ? {
                    id: wt.id,
                    name: wt.unplannedName!,
                    estimatedHours: wt.unplannedHours,
                    category: wt.unplannedCategory!
                  } : wt.task!}
                  weeklyTaskId={wt.id}
                  completed={true}
                  unplanned={wt.unplanned}
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

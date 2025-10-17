import { getAllTasks, getThisWeekTasks, getArchivedTasks } from './actions'
import ThisWeekSection from '@/components/ThisWeekSection'
import AllTasksSection from '@/components/AllTasksSection'
import ArchivedTasksSection from '@/components/ArchivedTasksSection'

// Force dynamic rendering since this is a task manager with dynamic data
export const dynamic = 'force-dynamic'

export default async function Home() {
  const allTasks = await getAllTasks()
  const thisWeekTasks = await getThisWeekTasks()
  const archivedTasks = await getArchivedTasks()

  const activeTasks = thisWeekTasks.filter(t => !t.completed)
  const completedTasks = thisWeekTasks.filter(t => t.completed)

  const completionRate = thisWeekTasks.length > 0
    ? Math.round((completedTasks.length / thisWeekTasks.length) * 100)
    : 0

  // Calculate planned and unplanned hours
  const plannedTasks = thisWeekTasks.filter(wt => !wt.unplanned)
  const unplannedTasks = thisWeekTasks.filter(wt => wt.unplanned)

  const plannedHours = plannedTasks.reduce(
    (sum, wt) => sum + (wt.task?.estimatedHours || 0), 0
  )

  const unplannedHours = unplannedTasks.reduce(
    (sum, wt) => sum + (wt.unplannedHours || 0), 0
  )

  const totalHoursPlanned = plannedHours + unplannedHours

  const hoursCompleted = completedTasks.reduce(
    (sum, wt) => {
      if (wt.unplanned) {
        return sum + (wt.unplannedHours || 0)
      }
      return sum + (wt.task?.estimatedHours || 0)
    }, 0
  )

  // Get IDs of tasks already added to this week (exclude unplanned tasks)
  const addedTaskIds = thisWeekTasks
    .filter(wt => !wt.unplanned && wt.task)
    .map(wt => wt.task!.id)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Weekly Task Planner
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ThisWeekSection
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            completionRate={completionRate}
            totalHoursPlanned={totalHoursPlanned}
            hoursCompleted={hoursCompleted}
            plannedHours={plannedHours}
            unplannedHours={unplannedHours}
          />

          <AllTasksSection tasks={allTasks} addedTaskIds={addedTaskIds} />
        </div>

        <div className="mt-8">
          <ArchivedTasksSection tasks={archivedTasks} />
        </div>
      </div>
    </main>
  )
}

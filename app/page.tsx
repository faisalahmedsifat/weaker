import { getAllTasks, getThisWeekTasks, getArchivedTasks } from './actions'
import ThisWeekSection from '@/components/ThisWeekSection'
import AllTasksSection from '@/components/AllTasksSection'
import ArchivedTasksSection from '@/components/ArchivedTasksSection'

export default async function Home() {
  const allTasks = await getAllTasks()
  const thisWeekTasks = await getThisWeekTasks()
  const archivedTasks = await getArchivedTasks()

  const activeTasks = thisWeekTasks.filter(t => !t.completed)
  const completedTasks = thisWeekTasks.filter(t => t.completed)

  const completionRate = thisWeekTasks.length > 0
    ? Math.round((completedTasks.length / thisWeekTasks.length) * 100)
    : 0

  const totalHoursPlanned = thisWeekTasks.reduce(
    (sum, wt) => sum + (wt.task.estimatedHours || 0), 0
  )

  const hoursCompleted = completedTasks.reduce(
    (sum, wt) => sum + (wt.task.estimatedHours || 0), 0
  )

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
          />

          <AllTasksSection tasks={allTasks} />
        </div>

        <div className="mt-8">
          <ArchivedTasksSection tasks={archivedTasks} />
        </div>
      </div>
    </main>
  )
}

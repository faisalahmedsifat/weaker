interface WeeklyStatsProps {
  completed: number
  total: number
  completionRate: number
  hoursCompleted: number
  totalHoursPlanned: number
  plannedHours: number
  unplannedHours: number
}

export default function WeeklyStats({
  completed,
  total,
  completionRate,
  hoursCompleted,
  totalHoursPlanned,
  plannedHours,
  unplannedHours
}: WeeklyStatsProps) {
  const totalHours = plannedHours + unplannedHours
  const unplannedPercentage = totalHours > 0 ? Math.round((unplannedHours / totalHours) * 100) : 0
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {completed}/{total} tasks ({completionRate}%)
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-600 dark:text-gray-400">Total Hours</div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {hoursCompleted.toFixed(1)}h / {totalHoursPlanned.toFixed(1)}h
          </div>
        </div>

        <div>
          <div className="text-gray-600 dark:text-gray-400">Time Allocation</div>
          <div className="font-semibold">
            <span className="text-blue-600 dark:text-blue-400">{plannedHours.toFixed(1)}h planned</span>
            {unplannedHours > 0 && (
              <>
                {' / '}
                <span className="text-red-600 dark:text-red-400">{unplannedHours.toFixed(1)}h unplanned</span>
              </>
            )}
          </div>
        </div>
      </div>

      {unplannedHours > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Unplanned Work</span>
            <span className="font-semibold text-red-600 dark:text-red-400">{unplannedPercentage}% of total time</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
            <div
              className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${unplannedPercentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

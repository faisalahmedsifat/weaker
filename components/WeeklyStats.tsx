interface WeeklyStatsProps {
  completed: number
  total: number
  completionRate: number
  hoursCompleted: number
  totalHoursPlanned: number
}

export default function WeeklyStats({
  completed,
  total,
  completionRate,
  hoursCompleted,
  totalHoursPlanned
}: WeeklyStatsProps) {
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

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Hours: {hoursCompleted.toFixed(1)}h / {totalHoursPlanned.toFixed(1)}h planned
      </div>
    </div>
  )
}

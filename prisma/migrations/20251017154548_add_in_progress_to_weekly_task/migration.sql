-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WeeklyTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" DATETIME,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WeeklyTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WeeklyTask" ("addedAt", "completed", "completedAt", "id", "taskId") SELECT "addedAt", "completed", "completedAt", "id", "taskId" FROM "WeeklyTask";
DROP TABLE "WeeklyTask";
ALTER TABLE "new_WeeklyTask" RENAME TO "WeeklyTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

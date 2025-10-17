'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Get all repository tasks (excluding archived)
export async function getAllTasks() {
  return await prisma.task.findMany({
    where: { archived: false },
    orderBy: { createdAt: 'desc' }
  })
}

// Get archived tasks
export async function getArchivedTasks() {
  return await prisma.task.findMany({
    where: { archived: true },
    orderBy: { archivedAt: 'desc' }
  })
}

// Get this week's tasks (with task details)
export async function getThisWeekTasks() {
  return await prisma.weeklyTask.findMany({
    include: { task: true },
    orderBy: { addedAt: 'asc' }
  })
}

// Add new task to repository
export async function createTask(data: {
  name: string
  estimatedHours?: number
  category: string
}) {
  const task = await prisma.task.create({ data })
  revalidatePath('/')
  return task
}

// Add task to this week
export async function addToThisWeek(taskId: number) {
  const weeklyTask = await prisma.weeklyTask.create({
    data: { taskId }
  })
  revalidatePath('/')
  return weeklyTask
}

// Toggle task completion
export async function toggleTaskCompletion(weeklyTaskId: number) {
  const weeklyTask = await prisma.weeklyTask.findUnique({
    where: { id: weeklyTaskId },
    include: { task: true }
  })

  if (!weeklyTask) return

  const isCompleting = !weeklyTask.completed

  // Update weekly task completion status
  await prisma.weeklyTask.update({
    where: { id: weeklyTaskId },
    data: {
      completed: isCompleting,
      completedAt: isCompleting ? new Date() : null
    }
  })

  // If completing the task, archive the underlying Task
  if (isCompleting) {
    await prisma.task.update({
      where: { id: weeklyTask.taskId },
      data: {
        archived: true,
        archivedAt: new Date()
      }
    })
  } else {
    // If uncompleting, unarchive the Task
    await prisma.task.update({
      where: { id: weeklyTask.taskId },
      data: {
        archived: false,
        archivedAt: null
      }
    })
  }

  revalidatePath('/')
}

// Clear completed tasks
export async function clearCompletedTasks() {
  await prisma.weeklyTask.deleteMany({
    where: { completed: true }
  })
  revalidatePath('/')
}

// Start new week (delete all weekly tasks)
export async function startNewWeek() {
  await prisma.weeklyTask.deleteMany({})
  await prisma.weekMetadata.create({
    data: { weekStart: new Date() }
  })
  revalidatePath('/')
}

// Delete task from repository
export async function deleteTask(taskId: number) {
  await prisma.task.delete({ where: { id: taskId } })
  revalidatePath('/')
}

// Unarchive a task
export async function unarchiveTask(taskId: number) {
  await prisma.task.update({
    where: { id: taskId },
    data: {
      archived: false,
      archivedAt: null
    }
  })
  revalidatePath('/')
}

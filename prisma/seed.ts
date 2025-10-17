import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed some example tasks
  const tasks = [
    { name: 'IELTS prep session', estimatedHours: 1, category: 'PhD' },
    { name: 'Email Adelaide professor', estimatedHours: 0.5, category: 'PhD' },
    { name: 'Professor research', estimatedHours: 2, category: 'PhD' },
    { name: 'Book IELTS test', estimatedHours: 0.25, category: 'PhD' },
    { name: 'Auth system', estimatedHours: 3, category: 'Test' },
    { name: 'Database schema', estimatedHours: 2, category: 'Test' },
    { name: 'User model', estimatedHours: 2, category: 'Test' },
    { name: 'flat visit', estimatedHours: 4, category: 'Flat' },
    { name: 'list flat on bproperty', estimatedHours: 1, category: 'Flat' },
    { name: 'weekly family dinner', estimatedHours: 2, category: 'Life' },
    { name: 'nsu certificate request', estimatedHours: 0.5, category: 'Admin' },
  ]

  for (const task of tasks) {
    await prisma.task.create({ data: task })
  }

  console.log('✅ Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

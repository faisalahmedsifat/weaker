# Weekly Task Planner (Weaker)

A minimalist weekly task planning application designed for INTP-T productivity patterns. Built with Next.js 14, Prisma, SQLite, and Tailwind CSS.

## Features

- **Task Repository**: Maintain a library of reusable tasks
- **Weekly Planning**: Select tasks for the current week
- **Progress Tracking**: Visual progress bar and completion statistics
- **Hour Estimation**: Track estimated and completed hours
- **Category Management**: Organize tasks by category (PhD, Test Project, Dev, Life, Flat, Admin)
- **Dark Mode Support**: System-preference aware dark mode
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js Server Actions
- **Database**: Prisma ORM + SQLite
- **Language**: TypeScript
- **Containerization**: Docker + Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
```bash
cd weaker
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# (Optional) Seed with example data
npm run prisma:seed
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database in Prisma Studio
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Seed database
npm run prisma:seed
```

## Docker Deployment

### Development Mode

```bash
# Start development environment
npm run docker:dev
# or
docker-compose up
```

### Production Mode

```bash
# Build and start production environment
npm run docker:build
npm run docker:prod
# or
docker-compose build
docker-compose --profile production up -d
```

### Stop Containers

```bash
npm run docker:down
# or
docker-compose down
```

## Project Structure

```
weaker/
├── app/
│   ├── actions.ts          # Server actions for mutations
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── AddTaskForm.tsx     # Form for creating tasks
│   ├── AllTasksSection.tsx # Task repository section
│   ├── TaskItem.tsx        # Reusable task component
│   ├── ThisWeekSection.tsx # Current week section
│   └── WeeklyStats.tsx     # Progress statistics
├── lib/
│   └── prisma.ts           # Prisma client singleton
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data script
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose config
└── CLAUDE.md              # AI assistant guidance
```

## Database Schema

### Task
Master repository of reusable task templates
- `id`: Auto-increment primary key
- `name`: Task name
- `estimatedHours`: Optional time estimate
- `category`: Task category
- `createdAt`: Creation timestamp

### WeeklyTask
Instances of tasks added to the current week
- `id`: Auto-increment primary key
- `taskId`: Foreign key to Task
- `completed`: Completion status
- `completedAt`: Completion timestamp
- `addedAt`: When added to week

### WeekMetadata
Tracks week start dates for history feature
- `id`: Auto-increment primary key
- `weekStart`: Week start date
- `createdAt`: Creation timestamp

## Usage

1. **Create Tasks**: Click "+ New Task" in the "All Tasks" section to add reusable tasks to your repository
2. **Add to Week**: Click "+ Add" next to any task to add it to your current week
3. **Track Progress**: Check off tasks as you complete them
4. **View Statistics**: Monitor your completion rate and hours in the progress bar
5. **Start New Week**: Click "Start New Week" to clear all weekly tasks and begin fresh
6. **Clear Completed**: Remove completed tasks while keeping active ones

## Key Design Decisions

- **Reusable Tasks**: Tasks can be added to the week multiple times (e.g., "IELTS prep" for different days)
- **Cascade Delete**: Deleting a task from the repository removes it from the current week
- **Server Actions**: All mutations use Next.js Server Actions with automatic revalidation
- **SQLite**: Single-file database suitable for personal use
- **No Authentication**: Single-user application (add auth if needed for multi-user)

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

For Docker deployment:
```env
DATABASE_URL="file:/app/data/planner.db"
```

## Troubleshooting

### Database Locked Error
```bash
# Close any database connections and recreate
rm -rf prisma/*.db
npx prisma migrate dev
```

### Prisma Client Not Found
```bash
npx prisma generate
```

### Docker Issues
```bash
# Check logs
docker-compose logs app

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Future Enhancements (v2)

- Past weeks history
- Weekly streak tracking
- Task editing and deletion
- Recurring tasks automation
- Export to CSV
- Charts and analytics
- Drag-and-drop reordering
- Keyboard shortcuts

## License

MIT

## Contributing

This is a personal productivity tool. Feel free to fork and customize for your needs!

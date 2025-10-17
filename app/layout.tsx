import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weekly Task Planner',
  description: 'A minimalist weekly task planning application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">{children}</body>
    </html>
  )
}

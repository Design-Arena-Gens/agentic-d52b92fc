import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'What Do You Want? | Life Survey',
  description: 'Discover what you truly desire in life • 45 seconds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

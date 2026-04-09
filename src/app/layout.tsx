import './globals.css'
import Header from '@/components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grammai Pen',
  description: 'AI-powered English grammar learning for curious minds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Miami Fresh',
  description: 'Discover the best restaurants in Miami',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans bg-gradient-to-br from-[#ff6b6b] to-[#4ecdc4] min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </body>
    </html>
  )
}
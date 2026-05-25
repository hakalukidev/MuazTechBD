import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import TopBar from '@/components/layout/TopBar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Muaz Technology - Industrial Machinery & Automobile Equipment',
  description: 'Trusted supplier of industrial machinery and automobile equipment in Bangladesh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <TopBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
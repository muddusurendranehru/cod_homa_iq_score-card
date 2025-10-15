import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from "sonner"
import './globals.css'

export const metadata: Metadata = {
  title: 'C.O.D. H.O.M.A I.Q TEST - Cardiometabolic Risk Assessment',
  description: 'Comprehensive cardiometabolic risk assessment by Dr. Muddu Surendra Nehru MD',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}


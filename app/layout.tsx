import type { Metadata } from 'next'
import { JetBrains_Mono, Inter } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shivansh Kalra — Founding Engineer / Systems Architect',
  description: '20-year-old CS student at Shiv Nadar University. Founding engineer at multiple early-stage startups, builder of production systems serving tens of thousands of concurrent users, published researcher. Building since 16.',
  keywords: ['Shivansh Kalra', 'Software Engineer', 'Full Stack', 'Systems Architect', 'SNU', 'Founding Engineer'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

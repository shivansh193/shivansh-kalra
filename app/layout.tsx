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
  title: 'Shivansh Kalra â€” Founding Engineer / Systems Architect',
  description: 'CS student at Shiv Nadar University. Founding engineer at multiple early-stage startups, builder of production systems used by tens of thousands of people, author of research papers. Building since 16.',
  keywords: ['Shivansh Kalra', 'Software Engineer', 'Full Stack', 'Systems Architect', 'SNU', 'Founding Engineer'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${jetbrainsMono.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  )
}

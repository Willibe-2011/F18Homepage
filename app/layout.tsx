import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'F18 — Extraordinary Under 18',
  description: 'A registry of people under 18 who built something that matters.',
  icons: {
    icon: [
      {
        url: '/logo.jpg',
        type: 'image/jpg',
      },
    ],
    apple: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

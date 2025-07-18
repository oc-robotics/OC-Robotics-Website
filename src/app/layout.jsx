import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OC Robotics',
  description: 'Your one-stop solution for all things robotics. Explore our latest projects and innovations.',
  keywords: 'robotics, automation, engineering, innovation, technology',
  authors: [{ name: 'OC-Robotics' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-light.png" id="favicon-default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

import React from 'react'
import ClientThemeProvider from '@/components/ClientThemeProvider'
import Footer from '@/components/Footer'
import NavBar from '@/components/Navbar'
import '@primer/css/index.scss'
import '@/styles/codeBlock.css'

export const metadata = {
  title: 'OC Robotics',
  description: 'The OCC Robotics website showcases our expertise in robotics and automation, offering innovative solutions for various industries.',
  keywords: 'robotics, automation, engineering, innovation, technology, OCC Robotics',
  authors: [{ name: 'OC-Robotics' }],
  icons: {
    icon: '/oc-robotics-icon.png',
  },
  charset: 'utf-8',
}

export const viewport = 'width=device-width, initial-scale=1';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientThemeProvider>
          <NavBar />
          {children}
          <Footer />
        </ClientThemeProvider>
      </body>
    </html>
  );
}

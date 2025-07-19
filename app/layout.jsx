import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme'
import Navbar from './components/Navbar'

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
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

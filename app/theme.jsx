import { createTheme, responsiveFontSizes } from '@mui/material/styles'

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {'main': '#0c243c'},
    secondary: {'main': '#c8732c'},
    background: {
      default: '#0c234c',
      paper: '#103454',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a5a5a5',
      disabled: '#c0c0c0',
    },
    divider: '#a5a5a5',
    subteams: {
      software: { main: '#d21919', lowOpacity: '#d21919' + '20' },
      mechanical: { main: '#08cdeb', lowOpacity: '#08cdeb' + '20' },
      business: { main: '#29eb66', lowOpacity: '#29eb66' + '20' },
      electrical: { main: '#ffd700', lowOpacity: '#ffd700' + '20' },
      club: { main: '#c8732c', lowOpacity: '#c8732c' + '20' },
      default: { main: '#9e9e9e', lowOpacity: '#9e9e9e' + '20' },
    }
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 350,
      sm: 500,
      events: 550,
      projects: 750,
      workshop: 700,
      calendar: 700,
      md: 900,
      navbar: 1000,
      tableOfContents: 1050,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h4: {
      fontSize: '1.8rem',
      fontWeight: 900,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 900,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 800,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    documentLinks: {
      fontSize: '1rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '0.018em'
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01238em',
    },
    body2: {
      fontSize: '1.2rem',
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: '0.01238em',
    },
    caption: {
      fontSize: '0.6rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
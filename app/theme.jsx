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
  },
  breakpoints: {
    values: {
      xxs: 0,
      xs: 350,
      sm: 500,
      events: 550,
      workshop: 700,
      calendar: 700,
      md: 900,
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
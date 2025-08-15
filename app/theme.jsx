import { createTheme } from '@mui/material/styles'

const theme = createTheme({
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
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'sans-serif',
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
      fontSize: '1.8rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h5: {
      fontSize: '1.2rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 1000,
      lineHeight: 1.5,
      letterSpacing: '0.01562em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.01238em',
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.03333em',
    },
  },
})

export default theme
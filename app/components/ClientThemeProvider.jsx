'use client';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../emotionCache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme'; // adjust path to your theme

const clientSideEmotionCache = createEmotionCache();

export default function ClientThemeProvider({ children }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
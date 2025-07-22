'use client';
import React, { useEffect, useState } from 'react';
import createEmotionCache from '../emotionCache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../theme'; // adjust path to your theme

const clientSideEmotionCache = createEmotionCache();

export default function ClientThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
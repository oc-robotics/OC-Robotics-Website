'use client'
import { useEffect, useState } from 'react';
import { Box, LinearProgress } from '@mui/material';

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      zIndex: 20,
    }}>
      <LinearProgress variant="determinate" value={progress} color="secondary" sx={{
        display: progress > 0 ? 'block' : 'none',
      }} />
    </Box>
  );
}
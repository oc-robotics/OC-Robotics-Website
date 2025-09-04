'use client'
import React, { useState, useEffect } from 'react';
import { List, ListItem, Typography, Drawer, IconButton, Box, Tooltip, Grow, LinearProgress } from '@mui/material';
import { Toc, Close } from '@mui/icons-material';
import Link from 'next/link';

export default function Sidebar({ toc }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const tocContent = (
    <Box sx={{ 
      width: { xxs: 280, sm: 300 }, // Fixed width for mobile/tablet
      padding: 2,
      height: '100%',
      overflow: 'hidden',
    }}>
      <Box sx={{ 
        display: { xxs: 'flex', lg: 'none' }, 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h4">Table of Contents</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ display: { xxs: 'none', lg: 'block' } }}>
        Table of Contents
      </Typography>

      <Box sx={{
        height: 'calc(100% - 100px)', 
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'secondary.main',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb:active': {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}>
        <List sx={{ padding: 0 }}>
          {toc.map(({ id, text, level }, idx) => (
            text && level < 3 && (
              <ListItem
                key={id || idx}
                sx={{
                  px: 0,
                  py: '6px',
                  ml: `${level * 13}px`,
                  maxWidth: 'calc(100% - 12px)',
                  overflow: 'hidden',
                }}
              >
                <Link 
                  href={`#${id}`} 
                  onClick={e => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setTimeout(() => {
                        window.location.hash = id;
                      }, 400);
                    }
                    setMobileOpen(false); // Close drawer on link click
                  }}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="documentLinks" sx={{
                    margin: 0,
                    p: 0,
                    position: 'relative',
                    display: 'inline-block',
                    textOverflow: 'wrap',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 0,
                      height: '2px',
                      backgroundColor: "secondary.main",
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover::after': {
                      width: '100%',
                    }
                  }}>
                    {text}
                  </Typography>
                </Link>
              </ListItem>
            )
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile menu button - only render when properly positioned */}
      <Tooltip title="Open Table Of Contents" arrow>
        <Grow in={!mobileOpen}>
          <Toc
            onClick={handleDrawerToggle}
            sx={{
              display: { xxs: mobileOpen ? 'none' : 'block', lg: 'none' },
              position: 'fixed',
              top: 80,
              right: 16,
              zIndex: 1300,
              backgroundColor: 'background.paper',
              width: 45,
              height: 45,
              borderRadius: '50%',
              p: '5px',
              boxShadow: 2,
              cursor: 'pointer',
              transition: 'display 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: 'action.hover',
              }
            }}
          />
        </Grow>
      </Tooltip>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xxs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: { xxs: 280, sm: 300 },
            backgroundColor: 'background.paper',
          },
        }}
      >
        {tocContent}
      </Drawer>

      {/* Desktop sidebar */}
      <Box sx={{
        display: { xxs: 'none', lg: 'block' },
        width: 300, // Fixed width for desktop
        position: 'sticky',
        top: 16,
        height: 'calc(100vh - 32px)',
        overflowY: 'auto',
        flexShrink: 0, // Prevents shrinking
      }}>
        {tocContent}
      </Box>
    </>
  );
}
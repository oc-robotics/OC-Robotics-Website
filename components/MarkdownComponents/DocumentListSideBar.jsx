'use client'
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Drawer, IconButton, Tooltip, Grow } from '@mui/material';
import { ViewSidebar, Close } from '@mui/icons-material';
import Link from 'next/link';
import ScrollTracker from '../scrollbar.jsx';

function DocumentListSideBar({ documentList }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
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
        <Typography variant="h4" sx={{fontSize: '2rem'}}>
          Document List
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ display: { xxs: 'none', lg: 'block' } }}>
        Document List
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
        <List sx={{ listStyleType: 'none', padding: 0 }}>
          {documentList.map((doc, index) => (
            <ListItem key={index} sx={{ marginBottom: '10px', pl: 2 }}>
              <Link 
                href={`/pages/${doc.slug}`} 
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => setMobileOpen(false)} // Close drawer on link click
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
                  {doc.frontmatter.title || doc.slug}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile menu button - only render when properly positioned */}
      <Tooltip title="Open Document List" arrow>
        <Grow in={!mobileOpen}>
          <ViewSidebar
            onClick={handleDrawerToggle}
            sx={{
              display: { xxs: mobileOpen ? 'none' : 'block', lg: 'none' },
              position: 'fixed',
              top: 80,
              left: 16,
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
        {sidebarContent}
      </Drawer>

      {/* Desktop sidebar */}
      <Box sx={{ 
        display: { xxs: 'none', lg: 'block' },
        width: 300, // Fixed width for desktop
        position: 'sticky', 
        top: 16, 
        height: 'calc(100vh - 64px)', 
        overflowY: 'auto',
        flexShrink: 0, // Prevents shrinking
      }}>
        {sidebarContent}
      </Box>
    </>
  );
}

export default DocumentListSideBar;

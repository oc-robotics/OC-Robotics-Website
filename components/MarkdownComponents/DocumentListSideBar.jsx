'use client'
import React, { useState } from 'react';
import { Box, Typography, List, ListItem, Drawer, IconButton, Tooltip, Grow } from '@mui/material';
import { ViewSidebar, Close } from '@mui/icons-material';
import Link from 'next/link';

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
      overflowY: 'auto',
    }}>
      <Box sx={{ 
        display: { xxs: 'flex', lg: 'none' }, 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6">
          Document List
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      
      <Typography variant="h6" gutterBottom sx={{ display: { xxs: 'none', lg: 'block' } }}>
        Document List
      </Typography>
      
      <List sx={{ listStyleType: 'none', padding: 0 }}>
        {documentList.map((doc, index) => (
          <ListItem key={index} sx={{ marginBottom: '10px', pl: 2 }}>
            <Link 
              href={`/pages/${doc.slug}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => setMobileOpen(false)} // Close drawer on link click
            >
              <Typography variant="body2">
                {doc.frontmatter.title || doc.slug}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
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

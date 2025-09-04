'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('navbar'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Updates', href: '/updates' },
    { label: 'Events', href: '/events' },
    { label: 'Projects', href: '/projects' },
    { label: 'Workshops', href: '/workshops' },
    { label: 'Images', href: '/images' },
    { label: 'Documents', href: '/pages' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: 'secondary.main', zIndex: 30}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          OC Robotics
        </Typography>
        
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {menuItems.map((item) => (
                <MenuItem key={item.label} component={Link} href={item.href} onClick={handleMenuClose}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <Button key={item.label} component={Link} href={item.href} color="inherit">
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
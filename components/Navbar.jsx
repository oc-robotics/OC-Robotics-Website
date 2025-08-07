'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import Link from 'next/link';

function Navbar() {
  const [state, setState] = useState({
    open: false,
    anchorEl: null,
  });

  const handleClick = event => {
    setState({
      open: true,
      anchorEl: event.currentTarget,
    })
  }

  const handleClose = () => {
    setState({
      open: false,
      anchorEl: null,
    })
  }

  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Button component={Link} href="/" color="inherit">Home</Button>
            <Button component={Link} href="/about" color="inherit">About</Button>
            <Button component={Link} href="/contact" color="inherit">Contact</Button>
            <Button component={Link} href="/projects" color="inherit">Projects</Button>
            <Button component={Link} href="/pages" color="inherit">Pages</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
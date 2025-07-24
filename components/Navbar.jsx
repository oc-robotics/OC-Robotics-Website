'use client'
import React from 'react'
import { AppBar, Container, Toolbar, Button, Box } from '@mui/material'
import Link from 'next/link'

function Navbar() {
  return (
    <Box>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Button component={Link} href="/" color="inherit">Home</Button>
            <Button component={Link} href="/about" color="inherit">About</Button>
            <Button component={Link} href="/contact" color="inherit">Contact</Button>
            <Button component={Link} href="/projects" color="inherit">Projects</Button>
            <Button component={Link} href="/pages" color="inherit">Page</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Navbar;

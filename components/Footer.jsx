import { Container, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Container component="footer" maxWidth="false" sx={{
      position: 'relative',
      bottom: 0,
      bgcolor: 'primary.main',
      color: 'white',
      py: 2,
      width: '100%',
      mx: 0,
      mt: 4,
    }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} OC Robotics. All rights reserved.
      </Typography>
    </Container>
  )
}

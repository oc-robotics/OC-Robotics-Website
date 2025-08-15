import { Container, Typography } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Container component="footer" maxWidth="false" sx={{
      bgcolor: 'secondary.main',
      color: 'white',
      py: 2,
      width: '100%',
      mt: 'auto',
    }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} OC Robotics. All rights reserved.
      </Typography>
    </Container>
  )
}

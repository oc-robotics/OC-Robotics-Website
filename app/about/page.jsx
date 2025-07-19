import React from 'react'
import { Typography, Container, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function About() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About OC Robotics
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          We are a leading robotics company dedicated to innovation and excellence in automation technology.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Our team of expert engineers and researchers work tirelessly to develop cutting-edge solutions
          that help businesses and individuals achieve their automation goals.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" component={Link} href="/">
            Back to Home
          </Button>
          <Button variant="outlined" component={Link} href="/services">
            Our Services
          </Button>
          <Button variant="outlined" component={Link} href="/contact">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

import { Typography, Container, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to OC Robotics
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Your one-stop solution for all things robotics.
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Explore our latest projects and innovations.
        </Typography>
        
        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" component={Link} href="/about">
            About Us
          </Button>
          <Button variant="outlined" size="large" component={Link} href="/services">
            Our Services
          </Button>
          <Button variant="outlined" size="large" component={Link} href="/contact">
            Contact
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

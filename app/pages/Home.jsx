import { Typography, Container, Button, Box } from '@mui/material'

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
        <Button variant="contained" size="large">
          Get Started
        </Button>
      </Box>
    </Container>
  )
}

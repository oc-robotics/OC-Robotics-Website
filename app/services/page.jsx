import { Typography, Container, Button, Box, Grid, Card, CardContent } from '@mui/material'
import Link from 'next/link'

export default function Services() {
  const services = [
    {
      title: "Industrial Automation",
      description: "Complete automation solutions for manufacturing and industrial processes."
    },
    {
      title: "Robotic Systems",
      description: "Custom robotic systems designed for specific industry requirements."
    },
    {
      title: "AI Integration",
      description: "Artificial intelligence integration for smarter automation solutions."
    },
    {
      title: "Maintenance & Support",
      description: "Comprehensive maintenance and technical support services."
    }
  ]

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Our Services
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }} align="center" color="text.secondary">
          Comprehensive robotics and automation solutions
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" component={Link} href="/contact">
            Get Quote
          </Button>
          <Button variant="outlined" component={Link} href="/">
            Back to Home
          </Button>
          <Button variant="outlined" component={Link} href="/about">
            About Us
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

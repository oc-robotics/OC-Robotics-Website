import { Typography, Container, Button, Box, TextField, Paper } from '@mui/material'
import Link from 'next/link'

export default function Contact() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }} align="center" color="text.secondary">
          Get in touch with our team
        </Typography>
        
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
            />
            <Button variant="contained" size="large" sx={{ alignSelf: 'flex-start' }}>
              Send Message
            </Button>
          </Box>
        </Paper>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="outlined" component={Link} href="/">
            Back to Home
          </Button>
          <Button variant="outlined" component={Link} href="/about">
            About Us
          </Button>
          <Button variant="outlined" component={Link} href="/services">
            Our Services
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

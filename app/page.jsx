import { Container, Box, Grid } from '@mui/material'
import UpcomingEventsWidget from '../components/UpcomingEventsWidget'

function Home() {
  return(
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <h1>Welcome to OC Robotics</h1>
      <p>Your one-stop solution for all things robotics.</p>
        {/* Upcoming Events Widget */}
        <UpcomingEventsWidget count={5} showDescription={true} />
        
        {/* Calendar Embed
        <Grid item xs={12} md={8}>
          <Box sx={{ width: '100%', height: 600 }}>
            <object
              type="text/html"
              data="https://calendar.google.com/calendar/embed?src=ocroboticsgroup%40gmail.com&ctz=America%2FLos_Angeles&showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0"
              title="OC Robotics Calendar"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </Box>
        </Grid> */}
    </Container>
  )
}

export default Home;
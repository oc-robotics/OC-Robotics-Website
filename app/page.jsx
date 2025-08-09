import { Container, Box, Grid } from '@mui/material'
import UpcomingEventsWidget from '../components/UpcomingEventsWidget'

function Home() {
  return(
    <Container>
      <h1>Welcome to OC Robotics</h1>
      <p>Your one-stop solution for all things robotics.</p>
      
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Upcoming Events Widget */}
        <Grid item xs={12} md={4}>
          <UpcomingEventsWidget count={5} showDescription={false} />
        </Grid>
        
        {/* Calendar Embed */}
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home;
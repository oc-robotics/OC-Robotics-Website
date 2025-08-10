import { Container, Box, Grid } from '@mui/material'
import UpcomingEventsWidget from '../components/UpcomingEventsWidget'
import Calendar from '@/components/Calendar';

function Home() {
  return(
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <h1>Welcome to OC Robotics</h1>
      <p>Your one-stop solution for all things robotics.</p>
        <Calendar />
        <UpcomingEventsWidget count={5} showDescription={true} />
    </Container>
  )
}

export default Home;
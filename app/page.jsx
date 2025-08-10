import { Container, Typography } from '@mui/material'
import UpcomingEventsWidget from '../components/UpcomingEventsWidget'
import Calendar from '@/components/Calendar';

function Home() {
  return(
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h1">Welcome to OC Robotics</Typography>
      <Typography variant="body1">Your one-stop solution for all things robotics.</Typography>
        <Calendar />
        <UpcomingEventsWidget count={5} showDescription={true} />
    </Container>
  )
}

export default Home;
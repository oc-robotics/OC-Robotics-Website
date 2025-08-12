import { getUpcomingEvents, getEventsInRange } from '@/lib/calendarData';
import { Typography, Container, Alert, Grid, Box } from '@mui/material';
import EventCard from './EventCard';

// This function runs at build time in a static export
export async function generateStaticParams() {
  return [{}]; // Return empty params since this is a static page
}

async function getEventsData() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  if (!shouldFetch || !apiKey) {
    console.log('Calendar fetch disabled or no API key provided');
    return {
      upcomingEvents: [],
      thisMonthEvents: [],
      hasUpcomingEvents: false
    };
  }

  try {
    // Get upcoming events (or recent if no upcoming)
    const upcomingEvents = await getUpcomingEvents({
      calendarId,
      apiKey,
      count: 10
    });

    // Check if events are actually upcoming (future) or recent (past)
    const now = new Date();
    const hasUpcomingEvents = upcomingEvents.some(event => 
      new Date(event.start) > now
    );

    // Get events for this month and last month to show more activity
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    
    const thisMonthEvents = await getEventsInRange({
      calendarId,
      apiKey,
      startDate: startOfLastMonth,
      endDate: endOfNextMonth,
      maxResults: 50
    });

    return {
      upcomingEvents,
      thisMonthEvents,
      hasUpcomingEvents,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return {
      upcomingEvents: [],
      thisMonthEvents: [],
      hasUpcomingEvents: false,
      error: error.message
    };
  }
}

export default async function EventsPage() {
  const { upcomingEvents, thisMonthEvents, hasUpcomingEvents, lastUpdated, error } = await getEventsData();

  return (
    <Container>
      <Box sx={{
        mb: 4
      }}>
        <Typography variant="h1">Events</Typography>
        {error && (
          <Alert severity="error">
            <strong>Error loading events:</strong> {error}
          </Alert>
        )}
        
        {lastUpdated && (
          <Typography variant="body2" color="textSecondary">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </Typography>
        )}
      </Box>
      <Grid container spacing={4} column={16}>
        <Grid size={6}>
          <Typography variant="h2">
            {hasUpcomingEvents ? 'Upcoming Events' : 'Recent Events'}
          </Typography>

          {upcomingEvents.length === 0 ? (
            <Box>
              <Typography variant='body1'>No events found.</Typography>
            </Box>
          ) : (
            <Box sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Box>
          )}
        </Grid>
        <Grid size={6}>
          <Typography variant="h2">All Recent Events</Typography>

          {thisMonthEvents.length === 0 ? (
            <Box>
              <Typography variant="body1">No recent events found.</Typography>
            </Box>
          ) : (
            <Box sx={{
              mt: 2, 
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {thisMonthEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
import { getEventsNextWeek } from '../lib/calendarData.js';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default async function UpcomingEventsWidget({ 
  count = 5, 
  showDescription = false,
  className = "" 
}) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  let events = [];
  
  if (shouldFetch && apiKey) {
    try {
      events = await getEventsNextWeek({
        calendarId,
        apiKey,
        maxResults: count * 2 // Get more events to account for filtering
      });
      
      // Limit to the requested count
      events = events.slice(0, count);
    } catch (error) {
      console.error('Error fetching events for widget:', error);
    }
  }

  if (events.length === 0) {
    return (
      <Box>
        <Typography variant='h3'>Upcoming Week Events</Typography>
        <Typography>No upcoming events for the week.</Typography>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatLocation = (location) => {
    const address = ", 2701 Fairview Rd, Costa Mesa, CA 92626, USA"
    if (location && location.includes(address)) {
      return location.replace(address, '').trim(); // Remove the address part
    }
    return location ? location : 'Online';
  };

  return (
    <Box sx={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 2,
      p: 6
    }}>
      <Typography variant='h3'>Upcoming Week Events</Typography>

      <Box>
        {events.map((event) => (
          <Box key={event.id}>
            <Typography variant='h4' >{event.title}</Typography>
            <Box>
              {formatDate(event.start)}, {formatTime(event.start)} - {formatTime(event.end)}
              <Typography variant='body2'>
                {formatLocation(event.location)}
              </Typography>
            </Box>
            
            {showDescription && event.description && (
              <Typography variant='body2' >
                {event.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      
      <Box className="mt-4">
        <Link href="/events">
          View all events →
        </Link>
      </Box>
    </Box>
  );
}

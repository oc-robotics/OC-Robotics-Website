import { getEventsNextWeek } from '../lib/calendarData.js';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import Link from 'next/link';

export default async function UpcomingEventsWidget({ 
  count = 5,
  showDescription
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

  const getEventType = (event) => {
    let type;
    let color;
    if (event.title.toLowerCase().includes('meeting')) {
      type = 'Meeting';
      color = '#4caf50';
    } else if (event.title.toLowerCase().includes('workshop')) {
      type = 'Workshop';
      color = '#f44336';
    } else if (event.title.toLowerCase().includes('social')) {
      type = 'Social';
      color = '#ff9800';
    } else if (event.title.toLowerCase().includes('networking')) {
      type = 'Networking';
      color = '#3f51b5';
    } else if (event.title.toLowerCase().includes('competition')) {
      type = 'Competition';
      color = '#9c27b0';
    } else if (event.title.toLowerCase().includes('drop-in')) {
      type = 'Optional Drop-in';
      color = '#1976d2';
    } else {
      type = 'Other';
      color = '#9e9e9e';
    }
    return (
      <Chip label={type} variant="outlined" sx={{
        borderColor: color,
        backgroundColor: `${color}10`,
        color: color,
        '&.MuiChip-outlined': {
          borderColor: color,
        },
      }}/>
    )
  };

  return (
    <Paper sx={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 2,
      p: 3,
      mx: 'auto'
    }}>
      <Typography variant='h3'>Upcoming Week Events</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 3,
        ml: 2
      }}>
        {events.map((event) => (
          <Box key={event.id} sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Box>
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
            {getEventType(event)}
          </Box>
        ))}
      </Box>
      
      <Box className="mt-4">
        <Button component={Link} href="/events" variant="outlined" sx={{
          my: 2,
          p: 1,
          width: 'auto',
          height: '40px',
          borderRadius: '20px',
          color: 'primary.main',
          transition: 'scale 0.3s',
          '&:hover': {
            cursor: 'pointer',
            scale: 1.2,
          },
        }}>
          View all events →
        </Button>
      </Box>
    </Paper>
  );
}

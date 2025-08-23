import { getEventsNextWeek } from '../lib/calendarData.js';
import { Box, Typography, Paper, Chip, Button, Divider } from '@mui/material';
import Link from 'next/link';

export default async function UpcomingEventsWidget({ count }) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  let events = [];
  
  if (apiKey) {
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
    if (event.title.toLowerCase().includes('meeting')) {
      return {
        type: 'Meeting',
        color: '#4caf50'
      };
    } else if (event.title.toLowerCase().includes('workshop')) {
      return {
        type: 'Workshop',
        color: '#f44336'
      };
    } else if (event.title.toLowerCase().includes('social')) {
      return {
        type: 'Social',
        color: '#ff9800'
      };
    } else if (event.title.toLowerCase().includes('networking')) {
      return {
        type: 'Networking',
        color: '#3f51b5'
      };
    } else if (event.title.toLowerCase().includes('competition')) {
      return {
        type: 'Competition',
        color: '#9c27b0'
      };
    } else if (event.title.toLowerCase().includes('drop-in')) {
      return {
        type: 'Optional Drop-in',
        color: '#1976d2'
      };
    } else {
      return {
        type: 'Other',
        color: '#9e9e9e'
      };
    }
  };

  function extractUrlFromAnchor(anchorString) {
    const match = anchorString.match(/href\s*=\s*["']([^"']*)["']/i);
    return match ? match[1] : null;
  }

  return (
    <Paper elevation={3} sx={{
      borderRadius: '8px',
      p: 3,
      mx: 'auto'
    }}>
      <Typography variant='h2'>Upcoming Week Events</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 3,
        ml: 2
      }}>
        {events.map((event) => {
          const { type, color } = getEventType(event);
          const workshopHaveLink = type === 'Workshop' && extractUrlFromAnchor(event.description);
          return (
            <Paper 
              elevation={7}
              key={event.id}
              sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '8px',
                borderLeft: `4px solid ${color}`,
                p: 2,
                transition: 'transform 0.3s',
              }}
            >
              <Box sx={{
                flexGrow: 1,
                mr: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
                <Typography variant='h3'>{event.title}</Typography>
                <Box sx={{mt: 1}}>
                  <Typography variant='body2'>
                    {formatDate(event.start)}, {formatTime(event.start)} - {formatTime(event.end)}
                  </Typography>
                  <Typography variant='body2'>
                    {formatLocation(event.location)}
                  </Typography>
                </Box>
                <Typography variant='body2' >
                  {workshopHaveLink ? <>Slides are available</> : <>{event.description}</>}
                </Typography>
                {workshopHaveLink && (
                  <Box component={Link} href={extractUrlFromAnchor(event.description)} target="_blank" rel="noopener" sx={{
                    mt: 1,
                    ml: 2
                  }}>
                    <Button variant="outlined" size="small">View Slides</Button>
                  </Box>
                )}
              </Box>
              <Chip label={type} variant="outlined" sx={{
                display: {xxs: 'none', xs: 'flex'},
                borderColor: color,
                backgroundColor: `${color}10`,
                color: color,
                '&.MuiChip-outlined': {
                  borderColor: color,
                },
              }}/>
            </Paper>
          )
        })}
      </Box>
      <Box sx={{ mt: 1 }}>
        <Button component={Link} href="/events" variant="outlined" sx={{
          my: 2,
          p: 1,
          width: 'auto',
          height: '40px',
          borderColor: 'secondary.main',
          color: 'secondary.main',
          transition: 'all 0.3s ease',
          '&:hover': {
            cursor: 'pointer',
            color: 'white',
            border: 'none',
            bgcolor: 'secondary.main',
          },
        }}>
          View all events →
        </Button>
      </Box>
    </Paper>
  );
}

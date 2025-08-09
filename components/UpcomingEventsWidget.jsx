import { getUpcomingEvents } from '../lib/calendarData.js';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export default async function UpcomingEventsWidget({ 
  count = 3, 
  showDescription = false,
  className = "" 
}) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';
  const shouldFetch = process.env.FETCH_CALENDAR_AT_BUILD === 'true';

  let events = [];
  
  if (shouldFetch && apiKey) {
    try {
      events = await getUpcomingEvents({
        calendarId,
        apiKey,
        count
      });
    } catch (error) {
      console.error('Error fetching events for widget:', error);
    }
  }

  if (events.length === 0) {
    return (
      <Box className={`bg-gray-100 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upcoming Events</h3>
        <p className="text-gray-600">No upcoming events.</p>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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

  return (
    <Box sx={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: 2,
      p: 6
    }}>
      <Typography variant='h3' className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</Typography>

      <Box className="space-y-3">
        {events.map((event) => (
          <Box key={event.id} className="border-l-4 border-blue-500 pl-4">
            <Typography variant='h4' className="font-medium text-gray-900">{event.title}</Typography>

            <Box className="text-sm text-gray-600">
              <Box>{formatDate(event.start)}</Box>
              {!event.isAllDay && (
                <Box>{formatTime(event.start)}</Box>
              )}
              {event.location && (
                <Box className="text-xs text-gray-500">{event.location}</Box>
              )}
            </Box>
            
            {showDescription && event.description && (
              <Typography variant='body2' className="text-sm text-gray-700 mt-1 line-clamp-2">
                {event.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      
      <Box className="mt-4">
        <Link 
          href="/events" 
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View all events →
        </Link>
      </Box>
    </Box>
  );
}

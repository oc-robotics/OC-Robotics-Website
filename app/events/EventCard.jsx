'use client'
import { Tooltip, Typography, Box, CardContent, Card } from "@mui/material";
import { CalendarMonth, LocationPin } from "@mui/icons-material";

export default function EventCard({ event }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatLocation = (location) => {
    const address = ", 2701 Fairview Rd, Costa Mesa, CA 92626, USA"
    if (location && location.includes(address)) {
      return location.replace(address, '').trim(); 
    }
    return location ? location : 'Online';
  };

  const getLocationSearchUrl = (location) => {
    if (!location) return '';
    const searchQuery = encodeURIComponent(location);
    return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  };

  return (
    <Card sx={{
      mb: 2,
      boxShadow: 2,
      borderRadius: 2,
      '&:hover': {
        boxShadow: 4,
        transform: 'translateY(-2px)'
      }
    }}>
      <CardContent>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Typography variant="h4">
            {event.title}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 1,
            gap: 2
          }}>
            <Tooltip title="View in Google Calendar" arrow placement="top">
              <CalendarMonth 
                onClick={() => {
                  window.open(event.link, '_blank');
                }} 
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, color 0.2s',
                  fontSize: '2rem',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }}
              />
            </Tooltip>
            <Tooltip title="View Location" arrow placement="top">
              <LocationPin 
                onClick={() => {
                  window.open(getLocationSearchUrl(event.location), '_blank');
                }}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, color 0.2s',
                  fontSize: '2rem',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                }} 
              />
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          px: 2,
          py: 1
        }}>
          <Typography variant='subtitle1'>Date: {formatDate(startDate)}</Typography>
          {!event.isAllDay && (
            <Box>
              <Typography variant='subtitle1'>Time: {formatTime(startDate)} - {formatTime(endDate)}</Typography>
              <Typography variant='subtitle1'>Duration: {Math.floor(Math.ceil((endDate - startDate) / 60000) / 60)} hours, {Math.ceil((endDate - startDate) / 60000) % 60} minutes</Typography>
            </Box>
          )}
          
          {event.location && (
            <Typography variant='subtitle1'>Location: {formatLocation(event.location)}</Typography>
          )}
        </Box>
        
        {event.description && (
          <Typography variant='body1'>
            {event.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
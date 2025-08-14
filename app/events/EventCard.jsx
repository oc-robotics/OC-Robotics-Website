'use client'
import { Tooltip, Typography, Box, CardContent, Card, Chip, Button } from "@mui/material";
import { CalendarMonth, LocationPin } from "@mui/icons-material";

export default function EventCard({ event }) {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

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

  function extractUrlFromAnchor(anchorString){
    const match = anchorString.match(/href\s*=\s*['"]([^'"]*)['"]/i);
    if (match){
      return match[1];
    }
    return null;
  }

  function getWorkshopIdFromUrl(url) {
    if (!url) return null;
    try {
      const match = url.match(/design\/([^/]*)/);
      if (match && match[1]) {
        return match[1];
      }
    } catch (error) {
      console.warn('Could not extract workshop ID from URL:', url);
    }
    return null;
  }

  function cleanDescription(description) {
    if (!description) return '';
    
    // Remove HTML tags like <br>, <a>, etc.
    let cleaned = description.replace(/<[^>]*>/g, '');
    
    // Remove extra whitespace and line breaks
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    // Remove URLs that are just text (not in anchor tags)
    cleaned = cleaned.replace(/https?:\/\/[^\s]+/g, '').trim();
    
    return cleaned;
  }

  const workshopUrl = extractUrlFromAnchor(event.description);
  const workshopId = getWorkshopIdFromUrl(workshopUrl);
  const workshopHaveLink = type === 'Workshop' && workshopUrl;
  const cleanedDescription = cleanDescription(event.description);

  return (
    <Card sx={{
      mb: 2,
      borderLeft: '4px solid',
      borderColor: color,
      boxShadow: 2,
      borderRadius: 2,
      transition: 'transform 0.2s, box-shadow 0.2s',
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
            <Chip label={type} variant="outlined" sx={{
              borderColor: color,
              backgroundColor: `${color}10`,
              color: color,
              '&.MuiChip-outlined': {
                borderColor: color,
              },
            }}/>
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
          <Box>
            {cleanedDescription && (
              <Typography variant='body1' sx={{ mb: 1 }}>
                {cleanedDescription}
              </Typography>
            )}
            {workshopHaveLink && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => {
                  if (workshopId) {
                    window.open(`/workshops#workshop-${workshopId}`, '_blank');
                  } else {
                    window.open(workshopUrl, '_blank');
                  }
                }}
                sx={{ mt: 1 }}
              >
                View Slides
              </Button>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
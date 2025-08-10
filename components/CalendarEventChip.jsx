'use client'
import { Chip, Box, Typography, Divider, Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import Link from 'next/link';

const CalendarEventChip = ({ event, id, isAllDay, eventTime, eventStart, eventEnd, eventLocation }) => {
  const [showPopup, setShowPopup] = useState({
    event: null,
    show: false
  });

  // Create Google search URL for the location
  const getLocationSearchUrl = (location) => {
    if (!location) return '';
    const searchQuery = encodeURIComponent(location);
    return `https://www.google.com/search?q=${searchQuery}`;
  };

  return (
    <Box>
      <Chip
        key={id}
        label={eventStart}
        variant="outlined"
        onClick={() => setShowPopup({ event, show: !showPopup.show })}
        sx={{
          borderColor: 'primary.main',
          backgroundColor: '',
          color: 'primary.main',

          cursor: 'pointer',
          margin: '4px 0',
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center'
        }}
      />
      {showPopup.show && (
        <Card sx={{ 
          position: 'absolute', 
          zIndex: 1000, 
          maxWidth: 300,
          mt: 1,
        }}>
          <CardContent>
            <Box>
              <Typography variant="h6">
                {event.title}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">
                {isAllDay ? 'All Day' : `${eventStart} - ${eventEnd}`}
              </Typography>
              <Typography variant="body2">
                {eventLocation}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexDirection: 'column' }}>
              <Button 
                variant="outlined" 
                size="small" 
                component={Link}
                href={event.link}
                target="_blank"
              >
                View in Google Calendar
              </Button>
              {eventLocation && (
                <Button 
                  variant="outlined" 
                  size="small"
                  component={Link}
                  href={getLocationSearchUrl(eventLocation)}
                  target="_blank"
                >
                  Search Location
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CalendarEventChip;

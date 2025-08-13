'use client'
import { Chip, Box, Typography, Divider, Button, Card, CardContent, Slide, Snackbar, Alert, Tooltip } from "@mui/material";
import { CalendarMonth, Map, Notifications, Close, School } from "@mui/icons-material";
import Link from 'next/link';
import { useState } from "react";

const CalendarEventChip = ({ event, id, isAllDay, eventStart, eventEnd, eventLocation, activePopup, onPopupToggle, workshops }) => {
  const [copiedEvent, setCopiedEvent] = useState(false);
  const isPopupOpen = activePopup === id;

  const handleChipClick = () => {
    onPopupToggle(isPopupOpen ? null : id, event);
  };

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
      return location.replace(address, '').trim(); 
    }
    return location ? location : 'Online';
  };

  const handleEventAnnouncement = () => {
    if (isAllDay){
      navigator.clipboard.writeText(
        `Event: ${event.title}\nDate: ${formatDate(eventStart)}, All Day\nLocation: ${formatLocation(eventLocation)}\n`
      )
    } else {
      navigator.clipboard.writeText(
        `Event: ${event.title}\nDate: ${formatDate(eventStart)}, ${formatTime(eventStart)} - ${formatTime(eventEnd)}\nLocation: ${formatLocation(eventLocation)}\n`
      )
    }
    setCopiedEvent(true);
    setTimeout(() => setCopiedEvent(false), 1500);
  };

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

  function extractUrlFromAnchor(anchorString) {
    const match = anchorString.match(/href\s*=\s*["']([^"']*)["']/i);
    if (!match) return null;
    
    const url = match[1];
    
    // Check if this is a Canva design URL
    const canvaMatch = url.match(/design\s*\/\s*([^\/]*)\s*\/\s*([^\/]*)\s*\/\s*view/i);
    if (!canvaMatch) return url;

    const designId = canvaMatch[1];
    const embedUrl = url + '?embed';
    
    // Check if workshop exists in our data
    const existingWorkshop = workshops.find(workshop => workshop.slidesUrl === embedUrl);
    if (existingWorkshop) {
      return `/workshops/#workshop-${existingWorkshop.id}`;
    }
    
    return embedUrl;
  }

  const workshopHaveLink = type === 'Workshop' && extractUrlFromAnchor(event.description);

  return (
    <Box>
      <Chip
        key={id}
        label={formatTime(eventStart)}
        variant="outlined"
        onClick={handleChipClick}
        sx={{
          borderColor: color,
          backgroundColor: `${color}33`,
          color: color,
          cursor: 'pointer',
          margin: '4px 0',
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'center'
        }}
      />
      <Slide in={isPopupOpen} direction="up" mountOnEnter unmountOnExit>
        <Card sx={{ 
          position: 'fixed', 
          zIndex: 1000, 
          maxWidth: 300,
          maxHeight: '40vh',
          right: 12,
          bottom: 36,
          mt: 1,
        }}>
          <CardContent>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              mb: 1
            }}>
              <Tooltip title="Copy Event Details" arrow placement="top">
                <Notifications onClick={handleEventAnnouncement} sx={{
                  cursor: 'pointer',
                  color: 'primary.main',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s, transform 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.1)'
                  }
                }}/>
              </Tooltip>
              <Tooltip title="Close" arrow placement="top">
                <Close onClick={() => onPopupToggle(null)} sx={{
                  cursor: 'pointer',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s, transform 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transform: 'scale(1.1)'
                  }
                }}/>
              </Tooltip>
            </Box>
            <Box sx={{
              maxHeight: '30vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto',
              alignItems: 'flex-start',
              justifyContent: 'flex-start'
            }}>
              <Typography variant="h6">
                {event.title}
              </Typography>
              <Divider sx={{ my: 1, width: '100%', borderColor: 'primary.main' }} />
              <Typography variant="body2">
                {isAllDay ? 'All Day' : `${formatDate(eventStart)}, ${formatTime(eventStart)} - ${formatTime(eventEnd)}`}
              </Typography>
              <Typography variant="body2">
                {formatLocation(eventLocation)}
              </Typography>
              <Typography variant="body1" sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 5,
                textOverflow: 'ellipsis'
              }}>
                {workshopHaveLink ? (
                  <>Slides are available</>
                ) : (
                  event.description
                )}
              </Typography>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexDirection: 'row' }}>
              <Tooltip title="View on Google Calendar" arrow placement="bottom">
                <Button 
                  variant="outlined" 
                  size="small" 
                  component={Link}
                  href={event.link}
                  target="_blank"
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    height: "40px",
                    borderRadius: "20px",
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }
                  }}
                >
                  <CalendarMonth sx={{ m: 1}} />
                </Button>
              </Tooltip>
              {eventLocation && (
                <Tooltip title="View on Map" arrow placement="bottom">
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    href={eventLocation}
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      height: "40px",
                      borderRadius: "20px",
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      }
                    }}
                  >
                    <Map sx={{ m: 1}} />
                  </Button>
                </Tooltip>
              )}
              {workshopHaveLink && (
                <Tooltip title="View Workshop Details" arrow placement="bottom">
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    href={workshopHaveLink}
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      height: "40px",
                      borderRadius: "20px",
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      }
                    }}
                  >
                    <School sx={{ m: 1}} />
                  </Button>
                </Tooltip>
              )}
            </Box>
          </CardContent>
        </Card>
      </Slide>
      <Snackbar
        open={copiedEvent}
        autoHideDuration={1500}
        onClose={() => setCopiedEvent(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert severity="success" variant="outlined" sx={{
          borderColor: 'success.main',
          backgroundColor: '#92ffbaff',
          color: 'success.main',
          width: '100%'
        }}>
          Event details copied to clipboard
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CalendarEventChip;

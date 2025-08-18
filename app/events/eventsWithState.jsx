'use client'
import React from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Grow, Stack, Box, Button, Paper } from '@mui/material';
import EventCard from "./EventCard";

export default function EventsPageWithState({ allRecentEvents }) {
  const upcomingEvents = allRecentEvents.filter(event => new Date(event.start) >= new Date());
  const pastEvents = allRecentEvents.filter(event => new Date(event.start) < new Date());
  const all = allRecentEvents;

  const [selectedEvent, setSelectedEvent] = React.useState("upcoming");

  const getCurrentEvents = () => {
    switch (selectedEvent) {
      case "upcoming":
        return { events: upcomingEvents.sort((a, b) => new Date(a.start) - new Date(b.start)) };
      case "past":
        return { events: pastEvents.sort((a, b) => new Date(b.start) - new Date(a.start)) };
      default:
        return { events: all.sort((a, b) => new Date(a.start) - new Date(b.start)) };
    }
  };

  const currentData = getCurrentEvents();

  return (
    <Container>
      <Typography variant="h1" sx={{ my: 4 }}>Upcoming Events</Typography>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: {xxs: 'space-evenly', events: 'space-between'}, 
        gap: {xxs: 2, sm: 'auto'},
        alignItems: {xxs: 'flex-start', events: 'center'}, 
        flexDirection: { xxs: 'column', events: 'row' }
      }}>
        <FormControl sx={{bgColor: 'background.paper'}}>
          <InputLabel id="event-select-label" sx={{ color: 'secondary.main', '&.Mui-focused': { color: 'secondary.main' }}}>Filter Event</InputLabel>
          <Select
            labelId="event-select-label"
            label="Event Type"
            value={selectedEvent}
            sx={{
              color: '#ffffff',
              '& .MuiOutlinedInput-input':{
                padding: "20px 14px"
              },
              '& .MuiSelect-icon': {
                color: '#ffffff',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
                borderWidth: '1px'
              }
            }}
            onChange={e => setSelectedEvent(e.target.value)}
          >
            <MenuItem value="all">All Recent Events</MenuItem>
            <MenuItem value="upcoming">Upcoming Events</MenuItem>
            <MenuItem value="past">Past Events</MenuItem>
          </Select>
        </FormControl>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => {
            const event = currentData.events[0];
            if (event) {
              window.open(event.link, '_blank');
            }
          }}
          sx={{
            backgroundColor: 'background.paper',
            height: '100%',
            color: '#ffffff',
            p: "20px 14px",
            '&:hover': {
              backgroundColor: 'secondary.main',
            },
          }}
        >
          View in Google Calendar
        </Button>
      </Box>
      <Paper elevation={3} sx={{
        p: 2,
        borderRadius: 2,
        my: 2,
      }}>
        <Grow in={true} key={selectedEvent}>
          <Stack spacing={2}>
            {currentData.events
              .map(event => (
                <EventCard key={event.id} event={event} />
            ))}
          </Stack>
        </Grow>
      </Paper>
    </Container>
  );
}
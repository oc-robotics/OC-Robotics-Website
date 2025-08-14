'use client'
import React from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Grow, Stack, Box, Button } from '@mui/material';
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
      <Typography variant="h3" sx={{ my: 4, fontWeight: 'bold' }}>Upcoming Events</Typography>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormControl>
          <InputLabel id="event-select-label">Filter Event</InputLabel>
          <Select
            labelId="event-select-label"
            label="Event Type"
            value={selectedEvent}
            onChange={e => setSelectedEvent(e.target.value)}
          >
            <MenuItem value="all">All Recent Events</MenuItem>
            <MenuItem value="upcoming">Upcoming Events</MenuItem>
            <MenuItem value="past">Past Events</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => {
          const event = currentData.events[0];
          if (event) {
            window.open(event.link, '_blank');
          }
        }}>
          View in Google Calendar
        </Button>
      </Box>
      <Grow in={true} key={selectedEvent}>
        <Stack spacing={2}>
          {currentData.events
            .map(event => (
              <EventCard key={event.id} event={event} />
          ))}
        </Stack>
      </Grow>
    </Container>
  );
}
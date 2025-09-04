'use client'
import { useState, useEffect, useMemo, useCallback } from "react";
import { Typography, Grid, Paper, Slide, Box, Button } from "@mui/material";
import { CalendarMonth, CloudDownload } from "@mui/icons-material";
import CalendarEventChip from "./CalendarEventChip";

export default function CalendarWithState({ events, workshops }) {
  const [activePopup, setActivePopup] = useState(null);
  const [showEvent, setShowEvent] = useState(false);

  const handlePopupToggle = useCallback((chipId, event) => {
    setActivePopup(chipId);
  }, []);

  const handleDayClick = useCallback(() => {
    setShowEvent(true);
  }, []);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activePopup && !event.target.closest('.MuiChip-root') && !event.target.closest('.MuiCard-root')) {
        setActivePopup(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activePopup]);

  const currentYear = new Date().getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonth = new Date().getMonth();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getNumberOfDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const daysInCurrentMonth = getNumberOfDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    
    // Get previous month info
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getNumberOfDaysInMonth(prevMonth, prevYear);
    
    const calendarDays = [];
    
    // Add previous month's trailing dates
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }
    
    // Add current month's dates
    for (let day = 1; day <= daysInCurrentMonth; day++) {
      calendarDays.push({
        day: day,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }
    
    // Add next month's leading dates to fill the grid (42 cells = 6 weeks)
    const remainingCells = 42 - calendarDays.length;
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({
        day: day,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }
    
    return calendarDays;
  }, [currentMonth, currentYear]);

  // Memoize events by day to prevent re-filtering on every render
  const eventsByDay = useMemo(() => {
    const eventsMap = new Map();
    
    events.forEach(event => {
      const eventDate = new Date(event.start);
      const dayKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;
      
      if (!eventsMap.has(dayKey)) {
        eventsMap.set(dayKey, []);
      }
      eventsMap.get(dayKey).push(event);
    });
    
    return eventsMap;
  }, [events]);
  const today = new Date().getDate();

  return (
    <Paper elevation={3} sx={{
      my: 2,
      p: 2,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1
      }}>
        <Typography variant="h2" gutterBottom>
          {monthNames[currentMonth]} {currentYear}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Button 
            variant="outlined" 
            onClick={() => {
              window.open('https://calendar.google.com/calendar/u/0/r/month/2025/4/1?cid=b2Nyb2JvdGljc2dyb3VwQGdtYWlsLmNvbQ&pli=1', "__blank")
            }} 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              color: 'secondary.main',
              borderColor: 'secondary.main',
              height: '40px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'white',
                borderColor: 'none',
                bgcolor: 'secondary.main',
              }
            }}
          >
            <CloudDownload />Subscribe
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              window.open('https://calendar.google.com/calendar/u/2/r', '__blank')
            }} 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              color: 'secondary.main',
              borderColor: 'secondary.main',
              height: '40px',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'white',
                borderColor: 'none',
                bgcolor: 'secondary.main',
              }
            }}
          >
            <CalendarMonth />Google Calendar
          </Button>
        </Box>
      </Box>
      <Grid 
        container 
        spacing={1} 
        columns={7}
        sx={{
          '--Grid-borderWidth': {xxs: '1px', sm: '2px'},
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderRight: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          }
        }}
      >
        {days.map((day, index) => (
          <Grid size={1} key={index} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{fontSize: {xxs: '0.65rem', xs: '1rem'}}}>{day}</Typography>
          </Grid>
        ))}
        {calendarDays.map((dayObj, index) => {
          const isToday = dayObj.isCurrentMonth && dayObj.day === today;
          
          return (
            <Grid size={1} key={index} sx={{ 
              textAlign: 'center',
              height: {xxs: 'auto', xs: '80px', sm: '120px'},
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <Box onClick={() => setShowEvent(true)}>
                <Typography 
                  variant="body1" 
                  sx={{
                    color: dayObj.isCurrentMonth ? (isToday ? 'white' : 'text.primary') : 'text.disabled',
                    fontWeight: isToday ? 'bold' : 'normal',
                    backgroundColor: isToday ? 'secondary.main' : 'transparent',
                    borderRadius: isToday ? '50%' : '0',
                    width: {xxs: '1.2rem', xs: '30px'},
                    height: {xxs: '1.2rem', xs: '30px'},
                    fontSize: {xxs: '0.65rem', xs: '1rem'},
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {dayObj.day}
                </Typography>
              </Box>
              {(() => {
                const dayKey = `${currentYear}-${currentMonth}-${dayObj.day}`;
                const dayEvents = dayObj.isCurrentMonth ? (eventsByDay.get(dayKey) || []) : [];
                
                return dayEvents.map(event => (
                  <CalendarEventChip 
                    key={event.id} 
                    event={event} 
                    id={event.id} 
                    isAllDay={event.allDay}
                    eventStart={event.start} 
                    eventEnd={event.end} 
                    eventLocation={event.location}
                    activePopup={activePopup}
                    onPopupToggle={handlePopupToggle}
                    workshops={workshops}
                  />
                ));
              })()}
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

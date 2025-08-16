'use client'
import { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import CalendarEventChip from "./CalendarEventChip";

export default function CalendarWithState({ events, workshops }) {
  const [activePopup, setActivePopup] = useState(null);

  const handlePopupToggle = (chipId, event) => {
    setActivePopup(chipId);
  };

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
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getNumberOfDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
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
  };

  const calendarDays = generateCalendarDays();
  const today = new Date().getDate();

  return (
    <Paper elevation={3} sx={{
      my: 2,
      p: 2
    }}>
      <Typography variant="h3" gutterBottom>
        {monthNames[currentMonth]} {currentYear}
      </Typography>
      <Grid 
        container 
        spacing={1} 
        columns={7}
        sx={{
          '--Grid-borderWidth': '2px',
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
            <Typography variant="h6">{day}</Typography>
          </Grid>
        ))}
        {calendarDays.map((dayObj, index) => {
          const isToday = dayObj.isCurrentMonth && dayObj.day === today;
          
          return (
            <Grid size={1} key={index} sx={{ 
              textAlign: 'center',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
              <Typography 
                variant="body1" 
                sx={{
                  color: dayObj.isCurrentMonth ? 'text.primary' : 'text.disabled',
                  fontWeight: isToday ? 'bold' : 'normal',
                  backgroundColor: isToday ? 'secondary.main' : 'transparent',
                  color: dayObj.isCurrentMonth ? 'text.primary' : 'text.disabled',
                  borderRadius: isToday ? '50%' : '0',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {dayObj.day}
              </Typography>
              {events.map(event => {
                const eventDate = new Date(event.start);
                const isEventToday = eventDate.getDate() === dayObj.day && eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear && dayObj.isCurrentMonth;
                if (isEventToday) {
                  return (
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
                  );
                }
                return null;
              })}
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}

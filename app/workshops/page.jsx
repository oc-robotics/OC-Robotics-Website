'use client'
import React, { useEffect } from 'react'
import { Box, Container, Grid, Select, Typography, MenuItem, Grow, FormControl, InputLabel } from '@mui/material'
import WorkshopCards from './workshopCards'
import { workshops } from '@/lib/workshopsData.js'

export default function Workshops() {
  const mechanicalWorkshops = workshops.filter(workshop => workshop.type === 'mechanical')
  const electricalWorkshops = workshops.filter(workshop => workshop.type === 'electrical')
  const softwareWorkshops = workshops.filter(workshop => workshop.type === 'software')
  const businessWorkshops = workshops.filter(workshop => workshop.type === 'business')

  const [selectedWorkshop, setSelectedWorkshop] = React.useState("software")

  useEffect(() => {
    // Function to find which category a workshop belongs to
    const findWorkshopCategory = (workshopId) => {
      const workshop = workshops.find(w => w.id.toString() === workshopId);
      if (!workshop) return null;
      return workshop.type;
    };

    // Function to handle scrolling to element based on URL hash
    const scrollToHashElement = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1); // Remove the # symbol
        
        // Check if it's a workshop ID (format: workshop-123)
        if (elementId.startsWith('workshop-')) {
          const workshopId = elementId.replace('workshop-', '');
          const workshopCategory = findWorkshopCategory(workshopId);
          
          if (workshopCategory) {
            // Switch to the correct category first
            setSelectedWorkshop(workshopCategory);
            
            // Wait for the category to render, then scroll
            setTimeout(() => {
              const element = document.getElementById(elementId);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center',
                  inline: 'nearest'
                });
              }
            }, 300); // Give time for the category switch and re-render
          }
        } else {
          // Handle other hash elements normally
          const element = document.getElementById(elementId);
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }, 100);
          }
        }
      }
    };

    // Scroll to hash element on initial load
    scrollToHashElement();

    // Listen for hash changes (when user clicks links with #id)
    const handleHashChange = () => {
      scrollToHashElement();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [workshops]); // Include workshops in dependency array

  // Function to get the current workshops and title
  const getCurrentWorkshopData = () => {
    switch(selectedWorkshop) {
      case "mechanical":
        return { workshops: mechanicalWorkshops }
      case "electrical":
        return { workshops: electricalWorkshops }
      case "business":
        return { workshops: businessWorkshops }
      default:
        return { workshops: softwareWorkshops }
    }
  }

  console.log(workshops)
  const currentData = getCurrentWorkshopData()

  return (
    <Container>
      <Typography variant="h3" sx={{ my: 4, fontWeight: 'bold' }}>Workshops</Typography>
      <FormControl sx={{ mb: 4 }}>
        <InputLabel id="workshop-select-label">Workshop Type</InputLabel>
        <Select
          labelId="workshop-select-label"
          label="Workshop Type"
          value={selectedWorkshop}
          onChange={e => setSelectedWorkshop(e.target.value)}
        >
          <MenuItem value="software">Software Workshops</MenuItem>
          <MenuItem value="mechanical">Mechanical Workshops</MenuItem>
          <MenuItem value="electrical">Electrical Workshops</MenuItem>
          <MenuItem value="business">Business Workshops</MenuItem>
        </Select>
      </FormControl>
      <Grow in={true} key={selectedWorkshop}>
        <Box>
          <Grid container spacing={2} column={16}>
            {currentData.workshops
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(workshop => (
              <Grid item xs={12} sm={6} md={4} key={workshop.id} size={6}>
                <WorkshopCards id={workshop.id} workshop={workshop} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grow>
    </Container>
  )
}

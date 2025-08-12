'use client'
import React from 'react'
import { Box, Container, Grid, Select, Typography, MenuItem, Grow, FormControl, InputLabel } from '@mui/material'
import WorkshopCards from './workshopCards'
import { workshops } from '@/lib/workshopsData'

export default function Workshops() {
  const mechanicalWorkshops = workshops.filter(workshop => workshop.type === 'mechanical')
  const electricalWorkshops = workshops.filter(workshop => workshop.type === 'electrical')
  const softwareWorkshops = workshops.filter(workshop => workshop.type === 'software')
  const businessWorkshops = workshops.filter(workshop => workshop.type === 'business')

  const [selectedWorkshop, setSelectedWorkshop] = React.useState("software")

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

'use client'
import React from 'react'
import { Box, Container, Grid, Select, Typography, MenuItem, Grow, FormControl, InputLabel } from '@mui/material'
import WorkshopCards from './workshopCards'

export default function Workshops() {
  const workshops = [
    {
      id: 1,
      title: 'Git Version Control',
      description: 'Learn the basics of Git and version control for your projects.',
      date: '2025-05-16',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGnmxS-vPs/94TKyuDgHo-7agUSG_GYBw/view?embed'
    },
    {
      id: 2,
      title: 'Material UI',
      description: 'Learn how to build beautiful user interfaces with Material UI.',
      date: '2025-07-17',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGtfioxyd4/tGN_eFWIN9yBQ4ZO_iDOxg/view?embed'
    },
    {
      id: 3,
      title: 'Web Dev 102: React',
      description: 'Explore the fundamentals of web development using React.',
      date: '2025-07-11',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGs3BaughQ/tW7fv3XFfK1lMiHuQ7z-AA/view?embed'
    },
    {
      id: 4,
      title: 'AI Search Algorithms',
      description: 'Learn about AI search algorithms and their applications.',
      date: '2025-07-27',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGuZhJ-25A/ORzIP1Gakyj1KfMIUq0PoA/view?embed'
    },
    {
      id: 5,
      title: 'Operating Systems',
      description: 'Learn about the fundamentals of operating systems and their design.',
      date: '2025-07-22',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGt6hBREm8/zIEoE_NFuLPffW05sDtJug/view?embed'
    },
    {
      id: 6,
      title: 'Web Dev 101: Build & Deploy Your First Website',
      description: 'Learn about the basics of web development and how to deploy your first website.',
      date: '2025-07-27',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGuawG6qQg/yU_SM6iK-L6sQePOIpkpug/view?embed'
    },
    {
      id: 7,
      title: 'Chassis Design with SolidWorks',
      description: 'Learn the basics of chassis design using SolidWorks.',
      date: '2025-07-31',
      type: 'mechanical',
      slidesUrl: 'https://www.canva.com/design/DAGuxVQEYHU/FsAeJd-NadxueMOUCDwPNQ/view?embed'
    },
    {
      id: 8,
      title: 'Robot Operating System (ROS)',
      description: 'Learn the basics of the Robot Operating System (ROS) and its applications.',
      date: '2025-08-01',
      type: 'software',
      slidesUrl: 'https://www.canva.com/design/DAGu14wMSPg/VBsftQX2Fss2oFRLR9kSTw/view?embed'
    },
  ]
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
                <WorkshopCards workshop={workshop} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grow>
    </Container>
  )
}

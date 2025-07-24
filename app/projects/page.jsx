import React from 'react'
import { Typography, Container, Button, Box, Grid, CardContent, Card } from '@mui/material'
import Link from 'next/link'

export default function About() {
  return (
    <Container maxWidth="md">
        <Grid container spacing={4} sx={{ my: 4 }}>
          <Grid>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6">P0 Cheap ROS Mobile Robot</Typography>
                <Typography variant="body2" color="text.secondary">
                  A low-cost mobile robot platform using ROS for educational and research purposes.
                </Typography>
                {/* <Button component={Link} href="/projects/p0-cheap-ros-mobile-robot" variant="contained" color="primary">
                  View Project
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6">P0 Sonar Viz Robot</Typography>
                <Typography variant="body2" color="text.secondary">
                  A sonar-equipped robot for environmental monitoring and data collection.
                </Typography>
                {/* <Button component={Link} href="/projects/p0-sonar-viz-robot" variant="contained" color="primary">
                  View Project
                </Button> */}
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6">P1 Mars Rover</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h6">P2 KIBO RPC</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </Container>
  )
}
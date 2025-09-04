'use client'
import { Typography, Container, Grid, CardContent, Card, CardMedia, Button, Chip, Stack, Box } from '@mui/material'

export default function DefaultProjects({ projects }) {

  function getProjectStatusColor(status) {
    switch (status) {
      case 'Completed':
        return '#29eb66';
      case 'In Progress':
        return '#c8732c';
      case 'Planning':
        return '#d21919';
      default:
        return '#9e9e9e';
    }
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h1" gutterBottom>
        Projects
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explore our innovative robotics projects spanning education, research, and competition.
      </Typography>
      
      <Grid container spacing={3} column={16}>
        {projects.map((project) => (
          <Grid item key={project.slug} size={{xxs: 12, projects: 6}}>
            <Card 
              onClick={() => {
                window.location.href = `/projects/${project.slug}`;
              }}
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardMedia
                component="img"
                image={project.image}
                alt={project.title}
                sx={{
                  objectFit: 'fill',
                  height: 450,
                  maxHeight: '100%',
                  maxWidth: '100%',
                  display: 'block',
                }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    mb: 2,
                    height: '3em',
                    lineHeight: '1em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 3
                  }}>
                    {project.description}
                  </Typography>
                </Box>

                {/* Status and Year */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={project.status} 
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: getProjectStatusColor(project.status),
                      color: getProjectStatusColor(project.status),
                      bgcolor: `${getProjectStatusColor(project.status)}1a`
                    }}
                  />
                  <Chip label={project.year} size="small" variant="outlined" />
                </Stack>

                {/* Tags */}
                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mb: 2 }}>
                  {project.tags.slice(0, 3).map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                  {project.tags.length > 3 && (
                    <Chip label={`+${project.tags.length - 3}`} size="small" variant="outlined" />
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

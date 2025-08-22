import React from 'react';
import { Container, Typography, Box, Chip, Stack, Card, CardContent, CardMedia, Button, IconButton } from '@mui/material';
import { ArrowBack, Description, GitHub } from '@mui/icons-material';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getProjectSlugs } from '@/lib/projectsData';

export async function generateStaticParams() {
  // Generate static params for all project slugs
  return getProjectSlugs().map((slug) => ({
    slug: slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back button */}
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          href="/projects"
          startIcon={<ArrowBack />}
          variant="filled"
          sx={{ mb: 2, bgcolor: 'secondary.main' }}
        >
          Back to Projects
        </Button>
      </Box>

      {/* Main content */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left column - Image and quick info */}
        <Box sx={{ flex: { md: '0 0 400px' } }}>
          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
              image={project.image}
              alt={project.title}
            />
          </Card>

          {/* Project info card */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Team(s)
                </Typography>
                {project.team.map((team) => (
                  <Chip key={team} label={team} size="small" variant="outlined" sx={{
                    borderColor: `subteams.${team.toLowerCase()}.main`,
                    color: `subteams.${team.toLowerCase()}.main`,
                    bgcolor: `subteams.${team.toLowerCase()}.lowOpacity`
                  }}/>
                ))}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Technologies
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
                  {project.technologies.map((tech) => (
                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>

              {/* Action buttons */}
              <Stack spacing={1} sx={{ mt: 3 }} direction="row">
                {project.github && (
                  <IconButton
                    variant="outlined"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHub />
                  </IconButton>
                )}
                {project.documentation && (
                  <IconButton
                    variant="contained"
                    component={Link}
                    href={project.documentation}
                  >
                    <Description />
                  </IconButton>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Right column - Description */}
        <Box sx={{ flex: 1 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About This Project
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>
                {project.fullDescription}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | OC Robotics`,
    description: project.description,
  };
}

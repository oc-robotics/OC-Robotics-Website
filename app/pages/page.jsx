"use client";
import React from 'react';
import styles from './Markdown.module.css';
import * as Blogs from './blogs/index.jsx';
import { Grid, Container, Box, Card, Typography, CardContent } from '@mui/material';

const Page = () => {
  const [selectedDoc, setSelectedDoc] = React.useState(null);

  const documentList = [
    {
      title: 'Git SSH',
      description: 'Learn how to set up SSH for Git.',
      component: Blogs.GitSSH,
    },
    {
      title: "Jason's Portfolio Website",
      description: 'A modern, responsive portfolio website showcasing my professional journey, skills, and projects.',
      component: Blogs.JsonWebsiteDoc,
    },
    {
      title: 'Test Table',
      description: 'A test table for demonstration purposes.',
      component: Blogs.Test,
    },
  ];

  const handleToggle = (doc) => {
    if (selectedDoc && selectedDoc.title === doc.title) {
      setSelectedDoc(null);
    } else {
      setSelectedDoc(doc);
    }
  };

  return (
    <Container>
      <Box>
        <Grid container spacing={2}>
          <Grid>
            <Box>
              {documentList.map((doc, index) => (
                <Card key={index}>
                  <CardContent onClick={() => handleToggle(doc)}>
                    <Typography variant="h6">{doc.title}</Typography>
                    <Typography variant="body2">
                      {doc.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
        {selectedDoc && (
          <Box className={styles['markdown-body']}>
            <selectedDoc.component />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Page;

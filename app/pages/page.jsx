// "use client";
import {Box, Collapse, Container, Grid, Card, CardContent, Typography, Button, List, ListItem} from '@mui/material'
import Link from 'next/link';
import React from 'react';
import fs from 'fs';
import path from 'path';

export default function Pages() {
  const docsDir = path.join(process.cwd(), 'documentation');
  const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.mdx'));

  return (
    <Container>
      <Typography variant="h1" sx={{ marginBottom: 2 }}>
        Documentations
      </Typography>
      <List>
        {files.map(file => {
          const slug = file.replace(/\.mdx$/, '');
          return (
            <ListItem key={slug}>
              <Button component={Link} href={`/pages/${slug}`}>{slug}</Button>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}
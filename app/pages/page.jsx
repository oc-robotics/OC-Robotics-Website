// "use client";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {Container, Typography, Button, List, ListItem, Box, Paper, Tooltip} from '@mui/material'
import Link from 'next/link';
import React from 'react';
import BackToTopButton from '@/components/BackToTopButton';
import styles from '@/styles/markdown.module.css';
import { KeyboardArrowUp } from '@mui/icons-material';

export default async function Pages() {
  const docsDir = path.join(process.cwd(), "documentation");
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));
  
  const documentList = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const rawContent = fs.readFileSync(path.join(docsDir, file), 'utf8')
        const { data: frontmatter } = matter(rawContent)
        const slug = file.replace(/\.mdx$/, '')
        return { slug, frontmatter }
      })
  )
  return (
    <Container>
      <List>
        {documentList.map(doc => {
          const slug = doc.slug;
          return (
            <ListItem key={slug} sx={{ display: 'inline-block', marginRight: 2 }}>
              <Button component={Link} href={`/pages/${slug}`}>{doc.frontmatter.title || slug}</Button>
            </ListItem>
          );
        })}
      </List>
      <BackToTopButton />
    </Container>
  );
}
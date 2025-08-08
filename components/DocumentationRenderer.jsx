'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Container, Typography, Paper } from '@mui/material'
import Admonitions from '@/components/Admonitions.jsx'
import CodeBlock from '@/components/CodeBlock.jsx'
import { h1Link, h2Link, h3Link } from '@/components/HeaderLinks.jsx'
import React from 'react'
import '@/styles/codeBlock.css'
import styles from '@/app/pages/Markdown.module.css'
import Sidebar from './TableOfContents'
import DocumentListSideBar from './DocumentListSideBar'

export default function DocumentationRenderer({ frontmatter, source, toc, documentList }) {
  const customComponents = {
      Admonitions,
      pre: (props) => <CodeBlock {...props} />,
      h1: h1Link,
      h2: h2Link,
      h3: h3Link,
    }
  
  return (
    <Container disableGutters sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      m: 0,
      p: 0,
      mt: 3,
      width: '100%',
      mx: 'auto'
    }}>
      <DocumentListSideBar documentList={documentList} />
      <Paper className={styles["markdown-body"]} sx={{ marginTop: 3, width: '60%', px: 2 }}>
        <Typography variant="h4" gutterBottom>
          {frontmatter.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ml: 2}}>
          {frontmatter.date ? new Date(frontmatter.date).toLocaleDateString() : ""}
        </Typography>
        <MDXRemote {...source} components={customComponents} />
      </Paper>
      <Sidebar toc={toc} />
    </Container>
  )
}
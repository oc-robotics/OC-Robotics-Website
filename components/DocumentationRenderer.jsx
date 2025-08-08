'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Container, Typography, Paper, Box, Tooltip } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
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
      px: 2,
      mt: 3,
      width: '100%',
      mx: 'auto'
    }}>
      <DocumentListSideBar documentList={documentList} />
      <Box sx={{ flexGrow: 1, px: 2 }}>
        <Typography variant="h4" gutterBottom>
          {frontmatter.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ml: 2}}>
          {frontmatter.date ? new Date(frontmatter.date).toLocaleDateString() : ""}
        </Typography>
        <Paper className={styles["markdown-body"]} sx={{ marginTop: 3, px: 2 }}>
          <MDXRemote {...source} components={customComponents} />
        </Paper>
      </Box>
      <Sidebar toc={toc} />
      <Box sx={{
        width: "45px",
        height: "45px",
        position: "fixed",
        bottom: "32px",
        right: "32px",
        backgroundColor: "#0080ffff",
        borderRadius: "50%",
      }}>
        <Tooltip title="Back to top" arrow>
          <KeyboardArrowUp
            sx={{
              color: "white",
              fontSize: "45px",
              cursor: "pointer"
            }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </Tooltip>
      </Box>
    </Container>
  )
}
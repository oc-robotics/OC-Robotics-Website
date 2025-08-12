'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Typography, Paper, Box } from '@mui/material'
import Admonitions from '@/components/MarkdownComponents/Admonitions.jsx'
import CodeBlock from '@/components/MarkdownComponents/CodeBlock.jsx'
import { h1Link, h2Link } from '@/components/MarkdownComponents/HeaderLinks.jsx'
import React from 'react'
import '@/styles/codeBlock.css'
import styles from '@/styles/Markdown.module.css'
import Sidebar from './TableOfContents'
import DocumentListSideBar from './DocumentListSideBar'

export default function DocumentationRenderer({ frontmatter, source, toc, documentList }) {
  const customComponents = {
      Admonitions,
      pre: (props) => <CodeBlock {...props} />,
      h1: h1Link,
      h2: h2Link,
    }
  
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <DocumentListSideBar documentList={documentList} />
      <Box sx={{ flexGrow: 1, px: 2 }}>
        <Paper className={styles["markdown-body"]} sx={{ marginTop: 3, px: 2, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            {frontmatter.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom sx={{ml: 2}}>
            {frontmatter.date ? new Date(frontmatter.date).toLocaleDateString() : ""}
          </Typography>
          <MDXRemote {...source} components={customComponents} />
        </Paper>
      </Box>
      <Sidebar toc={toc} />
    </Box>
  )
}
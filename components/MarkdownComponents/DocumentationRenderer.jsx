'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Typography, Paper, Box } from '@mui/material'
import Admonitions from '@/components/MarkdownComponents/Admonitions.jsx'
import CodeBlock from '@/components/MarkdownComponents/CodeBlock.jsx'
import { h1Link, h2Link } from '@/components/MarkdownComponents/HeaderLinks.jsx'
import React from 'react'
import '@/styles/codeBlock.css'
import '@/styles/markdown.css'
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
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        m: 0,
        p: 0,
        px: 2,
        mt: 3,
        width: '100%',
        position: 'relative',
      }}>
        <DocumentListSideBar documentList={documentList}/>
        <Box sx={{ 
          flexGrow: 1, 
          px: 2,
          minWidth: 0, // Prevents flex item from overflowing
        }}>    
          <Paper className="markdown-body" sx={{
            flexGrow: 1,
            width: {xxs: '80vw', md: '90vw', lg: '100%'},
            mx: 'auto',
          }}>
            <Typography variant="h1" sx={{margin: 0}}>
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
      
    </>
  )
}
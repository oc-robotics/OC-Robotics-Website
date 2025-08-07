'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Card, CardContent, Typography, Box } from '@mui/material'
import Admonitions from '@/components/Admonitions.jsx'
import CodeBlock from '@/components/CodeBlock.jsx'
import { h1Link, h2Link, h3Link } from '@/components/HeaderLinks.jsx'
import React from 'react'
import '@/styles/codeBlock.css'
import styles from '@/app/pages/Markdown.module.css'

export default function DocumentationRenderer({ frontmatter, source }) {
  const customComponents = {
      Admonitions,
      pre: (props) => <CodeBlock {...props} />,
      h1: h1Link,
      h2: h2Link,
      h3: h3Link,
    }
  
  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Box className={styles["markdown-body"]} sx={{ marginTop: 3 }}>
          <MDXRemote {...source} components={customComponents} />
        </Box>
      </CardContent>
    </Card>
  )
}
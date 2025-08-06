'use client'
import { MDXRemote } from 'next-mdx-remote'
import { Card, CardContent, Typography, Box } from '@mui/material'
import '@/app/pages/Markdown.module.css'

export default function DocumentationRenderer({ frontmatter, source }) {
  console.log("Source:", source)
  
  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {frontmatter.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {frontmatter.description}
        </Typography>
        <Box className="markdown-body" sx={{ marginTop: 3 }}>
          <MDXRemote {...source} />
        </Box>
      </CardContent>
    </Card>
  )
}
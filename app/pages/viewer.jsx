"use client"
import React from 'react'
import { useState } from 'react'
import { Container, Grid, Box, Card, Typography, CardContent, Collapse } from '@mui/material'
import { MDXRemote } from 'next-mdx-remote'
import '@/styles/codeBlock.css'
import styles from './Markdown.module.css'
import Admonitions from '@/components/Admonitions.jsx'
import CodeBlock from '@/components/CodeBlock.jsx'

export default function Viewer({ documentList }) {
	const [selectedDoc, setSelectedDoc] = useState(null)

	const handleToggle = (doc) => {
		setSelectedDoc(prev =>
			prev?.slug === doc.slug ? null : doc
		)
	}

	const customComponents = {
		Admonitions,
		pre: (props) => <CodeBlock {...props} />,
	}

	return (
		<Container sx={{ marginTop: 4 }}>
			<Grid container spacing={2}>
				{documentList.map((doc, index) => (
					<Grid item xs={12} key={index}>
						<Card onClick={() => handleToggle(doc)} sx={{ cursor: 'pointer' }}>
						<CardContent>
							<Typography variant="h6">{doc.frontmatter.title}</Typography>
							<Typography variant="body2">
								{doc.frontmatter.description}
							</Typography>
						</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
			{selectedDoc?.source && (
				<Collapse in={!!selectedDoc} timeout="auto" unmountOnExit>
					<Box className={styles['markdown-body']} sx={{ marginTop: 3 }}>
						<MDXRemote {...selectedDoc.source} components={customComponents} />
					</Box>
				</Collapse>
			)}
		</Container>
	)
}
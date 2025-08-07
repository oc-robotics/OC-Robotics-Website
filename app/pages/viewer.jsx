"use client"
import React from 'react'
import { useState } from 'react'
import { Container, Grid, Box, Card, Typography, CardContent, Collapse } from '@mui/material'
import { MDXRemote } from 'next-mdx-remote'
import '@/styles/codeBlock.css'
import styles from './Markdown.module.css'
import Admonitions from '@/components/Admonitions.jsx'
import CodeBlock from '@/components/CodeBlock.jsx'
import { h1Link, h2Link, h3Link } from '@/components/HeaderLinks.jsx'

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
		h1: h1Link,
		h2: h2Link,
		h3: h3Link,
	}

	// Smooth scroll to anchor after document is rendered
	React.useEffect(() => {
		if (selectedDoc) {
			const hash = window.location.hash;
			if (hash) {
				// Wait for collapse animation to finish
				setTimeout(() => {
					const el = document.getElementById(hash.substring(1));
					if (el) {
						el.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				}, 300); // Adjust delay as needed for Collapse
			}
		}
	}, [selectedDoc]);

	return (
		<Container sx={{ marginTop: 4 }}>
			

			{/* <Grid container spacing={2}>
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
			</Grid> */}
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

// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
// import { serialize } from 'next-mdx-remote/serialize'
// import remarkGfm from 'remark-gfm'
// import Viewer from './viewer'
// import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeSlug from 'rehype-slug'

// const options={
//   theme: 'github-light', // or 'dark'
//   defaultLanguage: "plaintext",
//   autoHeight: true,
// }


// export default async function Page() {
//   const docsDir = path.join(process.cwd(), 'documentation')
//   const files = fs.readdirSync(docsDir)

//   const documentList = await Promise.all(
//     files
//       .filter(file => file.endsWith('.mdx'))
//       .map(async (file) => {
//         const slug = file.replace(/\.mdx$/, '')
//         const rawContent = fs.readFileSync(path.join(docsDir, file), 'utf8')
//         const { data: frontmatter, content } = matter(rawContent)
//         const source = await serialize(content, {
//           mdxOptions: {
//             remarkPlugins: [remarkGfm],
//             rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
//           },
//         })
//         return { slug, frontmatter, source }
//       })
//   )

//   return <Viewer documentList={documentList} />
// }
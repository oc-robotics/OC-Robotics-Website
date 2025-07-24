import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { getPost } from '@/lib/getPost'
import DocumentationRenderer from '../docRenderer'
import remarkGfm from 'remark-gfm'
import rehypeStarryNight from 'rehype-starry-night'
import fs from 'fs'
import path from 'path'

// import { Card, CardContent, Typography, Collapse } from '@mui/material'

// // 🔁 Generate paths from filenames
// export async function generateStaticParams() {
//   const postsDir = path.join(process.cwd(), 'content/posts')
//   const files = fs.readdirSync(postsDir)

//   return files
//     .filter(file => file.endsWith('.mdx'))
//     .map(file => ({
//       slug: file.replace(/\.mdx$/, ''),
//     }))
// }

// // 🧠 Load content + frontmatter per slug
// export async function getStaticProps({ params }) {
//   const { content, frontmatter } = getPost(params.slug)

//   const mdxSource = await serialize(content, {
//     mdxOptions: {
//       remarkPlugins: [remarkGfm],
//       rehypePlugins: [rehypeStarryNight],
//     },
//   })

//   return {
//     props: {
//       frontmatter,
//       source: mdxSource,
//     },
//   }
// }

// // 🎨 Display metadata and rendered MDX
// export default function BlogPost({ frontmatter, source }) {
//   return (
//     <Card sx={{ margin: 4, padding: 2 }}>
//       <CardContent>
//         <Typography variant="h4" gutterBottom>
//           {frontmatter.title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           {frontmatter.description}
//         </Typography>
//         <Collapse in={true} timeout="auto" unmountOnExit>
//           <Box className={styles['markdown-body']}>
//             <MDXRemote {...source} />
//           </Box>
//         </Collapse>
//       </CardContent>
//     </Card>
//   )
// }

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'documentation')
  const files = fs.readdirSync(docsDir)

  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
    }))
}

export async function getStaticProps({ params }) {
  const { content, frontmatter } = getPost(params.slug)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeStarryNight],
    },
  })

  return {
    props: {
      frontmatter,
      source: mdxSource,
    },
  }
}

export default function DocPage({ frontmatter, source }) {
  return <DocumentationRenderer frontmatter={frontmatter} source={source} />
}

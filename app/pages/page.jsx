import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import Viewer from './viewer'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const options={
  theme: 'github-light', // or 'dark'
  defaultLanguage: "plaintext",
  autoHeight: true,
}


export default async function Page() {
  const docsDir = path.join(process.cwd(), 'documentation')
  const files = fs.readdirSync(docsDir)

  const documentList = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        const rawContent = fs.readFileSync(path.join(docsDir, file), 'utf8')
        const { data: frontmatter, content } = matter(rawContent)
        const source = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
          },
        })
        return { slug, frontmatter, source }
      })
  )

  return <Viewer documentList={documentList} />
}
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getPost(slug) {
  const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content } = matter(fileContent)
  return { frontmatter, content }
}
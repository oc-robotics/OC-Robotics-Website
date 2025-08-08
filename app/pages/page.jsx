import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';
import DefaultDocument from './defaultDocument';

export default async function Pages() {
  const docsDir = path.join(process.cwd(), "documentation");
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));
  
  const documentList = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const rawContent = fs.readFileSync(path.join(docsDir, file), 'utf8')
        const { data: frontmatter } = matter(rawContent)
        const slug = file.replace(/\.mdx$/, '')
        return { slug, frontmatter }
      })
  )

  return (
    <DefaultDocument documentList={documentList} />
  );
}
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { getPost } from "@/lib/getPost";
import DocumentationRenderer from "@/components/DocumentationRenderer.jsx";
import remarkGfm from "remark-gfm";
import remarkEmbedImages from "remark-embed-images";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import {rehypeToc} from "@/lib/rehypeToc.js";
import '@/styles/codeBlock.css';

const options={
  theme: 'github-light', // or 'dark'
  defaultLanguage: "plaintext",
  autoHeight: true,
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "documentation");
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function Page({ params }) {
  params = await params
  const { frontmatter, content } = getPost(params.slug);
  let toc = [];

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkEmbedImages],
      rehypePlugins: [
        rehypeSlug, 
        [rehypePrettyCode, options], 
        function rehypeTocWithCapture() {
          return (tree, file) => {
            rehypeToc()(tree, file);
            toc = file.data?.toc ?? [];
          };
        },
      ],
      format: "mdx",
    },
  });

  const docsDir = path.join(process.cwd(), 'documentation')
  const files = fs.readdirSync(docsDir)

  const documentList = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '')
        return { slug }
      })
  )

  return (
    <DocumentationRenderer frontmatter={frontmatter} source={mdxSource} toc={toc} documentList={documentList} />
  );
} 
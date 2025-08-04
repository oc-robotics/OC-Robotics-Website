import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { getPost } from "@/lib/getPost";
import DocumentationRenderer from "@/components/DocumentationRenderer.jsx";
import remarkGfm from "remark-gfm";
import remarkEmbedImages from "remark-embed-images";
import rehypePrettyCode from "rehype-pretty-code";
import '@/styles/codeBlock.css';

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), "documentation");
  const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
}

export default async function Page({ params }) {
  const { frontmatter, content } = getPost(params.slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkEmbedImages],
      rehypePlugins: [rehypePrettyCode],
      format: "mdx",
    },
  });

  return (
    <DocumentationRenderer 
      frontmatter={frontmatter} 
      source={mdxSource}
    />
  );
} 
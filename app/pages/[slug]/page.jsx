// app/documentation/[slug]/page.jsx
import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import { getPost } from "@/lib/getPost";
import DocumentationRenderer from "@/components/DocumentationRenderer";
import remarkGfm from "remark-gfm";
import remarkEmbedImages from "remark-embed-images";
import rehypeStarryNight from "rehype-starry-night";
// (You can drop rehype-mdx-import-media if you don’t need local media imports)

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
      rehypePlugins: [rehypeStarryNight],
      format: "mdx",
    },
  });

  return <DocumentationRenderer frontmatter={frontmatter} source={mdxSource} />;
}
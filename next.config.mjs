import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import remarkEmbedImages from 'remark-embed-images'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkEmbedImages],
    rehypePlugins: [rehypeSlug, rehypePrettyCode],
  },
})

const nextConfig = {
  experimental: { mdxRs: false },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
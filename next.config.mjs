import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypeStarryNight from 'rehype-starry-night'
import remarkEmbedImages from 'remark-embed-images'
import rehypeMdxImportMedia from 'rehype-mdx-import-media'

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkEmbedImages],
    rehypePlugins: [rehypeStarryNight, rehypeMdxImportMedia],
  },
})

const nextConfig = {
  experimental: { mdxRs: false },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'
import rehypeStarryNight from 'rehype-starry-night'


const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeStarryNight],
  },
})

const nextConfig = {
  experimental: { mdxRs: false },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
}

export default withMDX(nextConfig)
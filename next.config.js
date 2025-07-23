import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
// import rehypeStarryNight from '@microflash/rehype-starry-night';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkRehype],
    // rehypePlugins: [rehypeStarryNight],
  },
});


/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);

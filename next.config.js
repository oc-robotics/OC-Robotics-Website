import createMDX from '@next/mdx';
import remarkRehype from 'remark-rehype';
// import rehypeStarryNight from '@microflash/rehype-starry-night';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
    format: 'mdx',
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

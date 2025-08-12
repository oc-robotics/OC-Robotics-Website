/**
 * Static blogs data loader
 * Client-safe version that loads blogs data
 */

// Import the generated blogs data directly from the JS file
import { blogs as generatedBlogs } from '../data/blogs.js';

// Use the generated blogs data
const blogs = generatedBlogs;

/**
 * Get blogs data (client-safe)
 * @returns {Array} - Array of blog objects
 */
export function getBlogs() {
  return blogs;
}

// Export blogs for immediate use
export { blogs };

// Export static blogs for backward compatibility (same as blogs now)
export const staticBlogs = blogs;

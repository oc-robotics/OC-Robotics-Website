/**
 * Static workshops data loader
 * Client-safe version that loads workshops data
 */

// Import the generated workshops data directly from the JS file
import { workshops as generatedWorkshops } from '../data/workshops.js';

// Use the generated workshops data
const workshops = generatedWorkshops;

/**
 * Get workshops data (client-safe)
 * @returns {Array} - Array of workshop objects
 */
export function getWorkshops() {
  return workshops;
}

// Export workshops for immediate use
export { workshops };

// Export static workshops for backward compatibility (same as workshops now)
export const staticWorkshops = workshops;

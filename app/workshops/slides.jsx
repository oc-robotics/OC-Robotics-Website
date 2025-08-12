/**
 * Workshops data - loads from pre-generated static JSON file
 * Data is fetched from Google Sheets during build time
 */

import { workshops, staticWorkshops, getWorkshops } from '@/lib/workshopsData';

// Export workshops data (loaded from build-time generated file)
export { workshops, staticWorkshops };

// Export function to get fresh workshops data
export const getAllWorkshops = getWorkshops;
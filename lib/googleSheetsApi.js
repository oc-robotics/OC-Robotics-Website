/**
 * Google Sheets API integration for loading workshop and blog data
 * This will fetch workshop data from a Google Sheets document
 */

/**
 * Fetches workshop data from Google Sheets
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {string} range - The range of cells to fetch (e.g., 'Sheet1!A1:F100')
 * @param {string} apiKey - The Google Sheets API key
 * @returns {Promise<Array>} - Array of workshop objects
 */
export async function fetchWorkshopsFromGoogleSheets(spreadsheetId, range, apiKey) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.warn('No data found in Google Sheets');
      return [];
    }

    // Assuming first row contains headers
    const headers = data.values[0];
    const rows = data.values.slice(1);

    // Convert rows to workshop objects
    const workshops = rows.map((row, index) => {
      const workshop = {};
      headers.forEach((header, headerIndex) => {
        workshop[header.toLowerCase().replace(/\s+/g, '')] = row[headerIndex] || '';
      });
      
      // Ensure we have required fields and proper formatting
      return {
        id: workshop.id || index + 1000, // Use high IDs to avoid conflicts with static workshops
        title: workshop.title || workshop.workshoptitle || '',
        description: workshop.description || workshop.workshopdescription || '',
        date: workshop.dateholdingtheworkshop || workshop.workshopdate || workshop.date || new Date().toISOString().split('T')[0],
        type: (workshop.typeofworkshop || workshop.type || workshop.workshoptype || 'software').toLowerCase(),
        slidesUrl: workshop.slideurl || workshop.slidesurl || workshop.slideslink || workshop.canvaurl || ''
      };
    });

    return workshops;
  } catch (error) {
    console.error('Error fetching workshops from Google Sheets:', error);
    throw error;
  }
}

/**
 * Fetches workshops data for static site generation
 * This function should be called during build time
 * @returns {Promise<Array>} - Array of workshop objects
 */
export async function getWorkshopsFromGoogleSheets() {
  // Environment variables for Google Sheets API
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_SLIDES_RANGE || 'Sheet1!A1:F100';
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!spreadsheetId || !apiKey) {
    console.warn('Google Sheets configuration missing. Please set GOOGLE_SHEETS_SPREADSHEET_ID and GOOGLE_API_KEY environment variables.');
    return [];
  }

  try {
    const workshops = await fetchWorkshopsFromGoogleSheets(spreadsheetId, range, apiKey);
    
    console.log(`Fetched ${workshops.length} workshops from Google Sheets`);
    
    return workshops;
  } catch (error) {
    console.error('Error in getWorkshopsFromGoogleSheets:', error);
    // Return empty array to prevent build failures
    return [];
  }
}

/**
 * Merges workshops from Google Sheets with static workshops
 * @param {Array} staticWorkshops - Workshops from the static slides.jsx file
 * @param {Array} googleSheetsWorkshops - Workshops from Google Sheets
 * @returns {Array} - Merged workshop array
 */
export function mergeWorkshops(staticWorkshops, googleSheetsWorkshops) {
  // Create a map of existing workshops by slides URL to avoid duplicates
  const workshopMap = new Map();
  
  // Add static workshops first
  staticWorkshops.forEach(workshop => {
    if (workshop.slidesUrl) {
      workshopMap.set(workshop.slidesUrl, workshop);
    }
  });
  
  // Add Google Sheets workshops (will overwrite static ones if URL matches)
  googleSheetsWorkshops.forEach(workshop => {
    if (workshop.slidesUrl) {
      workshopMap.set(workshop.slidesUrl, {
        ...workshop,
        source: 'google-sheets'
      });
    }
  });
  
  return Array.from(workshopMap.values());
}

/**
 * Validates workshop data format
 * @param {Object} workshop - Workshop object to validate
 * @returns {boolean} - True if valid
 */
export function validateWorkshop(workshop) {
  const requiredFields = ['title', 'description', 'date', 'type'];
  
  return requiredFields.every(field => {
    const value = workshop[field];
    return value && typeof value === 'string' && value.trim().length > 0;
  });
}

/**
 * Filters and validates workshops
 * @param {Array} workshops - Array of workshop objects
 * @returns {Array} - Filtered and validated workshops
 */
export function processWorkshops(workshops) {
  return workshops
    .filter(validateWorkshop)
    .map(workshop => ({
      ...workshop,
      // Ensure proper formatting
      id: parseInt(workshop.id) || Math.random(),
      title: workshop.title.trim(),
      description: workshop.description.trim(),
      date: workshop.date.trim(),
      type: workshop.type.toLowerCase().trim(),
      slidesUrl: workshop.slidesUrl.trim() + "?embed"
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
}

/**
 * Fetches blog posts data from Google Sheets
 * @param {string} spreadsheetId - The Google Sheets spreadsheet ID
 * @param {string} range - The range of cells to fetch
 * @param {string} apiKey - The Google API key
 * @returns {Promise<Array>} - Array of blog post objects
 */
export async function fetchBlogsFromGoogleSheets(spreadsheetId, range, apiKey) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      console.warn('No data found in Google Sheets');
      return [];
    }

    // Assuming first row contains headers
    const headers = data.values[0];
    const rows = data.values.slice(1);

    // Convert rows to blog objects
    const blogs = rows.map((row, index) => {
      const blog = {};
      headers.forEach((header, headerIndex) => {
        blog[header.toLowerCase().replace(/\s+/g, '')] = row[headerIndex] || '';
      });
      
      // Ensure we have required fields and proper formatting
      return {
        id: blog.id || index + 1000, // Use high IDs to avoid conflicts with static blogs
        title: blog.updatetitle || blog.title || '',
        description: blog.updatedescription || blog.description || '',
        author: blog.author || 'OC Robotics Team',
        tags: blog.tags ? [blog.tags] : ['general'], // Convert to array format
        date: blog.date || blog.timestamp || new Date().toISOString().split('T')[0],
      };
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs from Google Sheets:', error);
    throw error;
  }
}

/**
 * Fetches blog data for static site generation
 * This function should be called during build time
 * @returns {Promise<Array>} - Array of blog objects
 */
export async function getBlogsFromGoogleSheets(){
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = process.env.GOOGLE_SHEETS_BLOG_RANGE;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!spreadsheetId || !apiKey) {
    console.warn('Google Sheets configuration missing. Please set GOOGLE_SHEETS_SPREADSHEET_ID and GOOGLE_API_KEY environment variables.');
    return [];
  }

  try{
    const blogs = await fetchBlogsFromGoogleSheets(spreadsheetId, range, apiKey);

    console.log(`Fetched ${blogs.length} blog posts from Google Sheets`);
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs from Google Sheets:', error);
    return [];
  }
}

/**
 * Filters and validates blogs
 * @param {Array} blogs - Array of blog objects
 * @returns {Array} - Filtered and validated blogs
 */
export function processBlogs(blogs) {
  return blogs
    .filter(validateBlog)
    .map(blog => ({
      ...blog,
      // Ensure proper formatting
      id: parseInt(blog.id) || Math.random(),
      title: blog.title.trim(),
      description: blog.Description.trim(),
      date: blog.Date.trim(),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date, newest first
}
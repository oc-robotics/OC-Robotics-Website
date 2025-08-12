/**
 * Build-time script to fetch blogs from Google Sheets
 * This runs during `npm run build` to generate static data
 */
import fs from 'fs';
import path from 'path';
import { fetchBlogsFromGoogleSheets } from './googleSheetsApi.js';

// Load environment variables from .env.local
function loadEnvVars() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const envLines = envContent.split('\n');
      
      envLines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            process.env[key.trim()] = value;
          }
        }
      });
    }
  } catch (error) {
    console.warn('Warning: Could not load .env.local file:', error.message);
  }
}

//load environment variables
loadEnvVars();

// Static fallback blogs for when Google Sheets is empty
const fallbackBlogs = [
  {
    id: 1,
    title: "Getting Started with Robotics",
    description: "A beginner's guide to understanding the basics of robotics and automation.",
    date: "2025-08-10",
    author: "OC Robotics Team",
    content: "Robotics is an exciting field that combines engineering, programming, and creativity...",
    tags: ["robotics", "beginner", "programming"]
  },
  {
    id: 2,
    title: "Building Your First Robot",
    description: "Step-by-step guide to building a simple robot using Arduino and sensors.",
    date: "2025-08-05",
    author: "Engineering Department",
    content: "In this tutorial, we'll walk through building a basic robot that can navigate obstacles...",
    tags: ["arduino", "sensors", "tutorial", "hardware"]
  },
  {
    id: 3,
    title: "Programming Tips for Robotics",
    description: "Essential programming concepts every robotics enthusiast should know.",
    date: "2025-07-28",
    author: "Software Team",
    content: "Programming robots requires understanding both hardware interfaces and algorithms...",
    tags: ["programming", "algorithms", "software", "tips"]
  }
];

async function generateStaticBlogs() {
  console.log('Fetching blogs from Google Sheets...');
  try{
    // Get environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_BLOG_RANGE || 'Blog!A1:F100';
    const apiKey = process.env.GOOGLE_API_KEY;

    let allBlogs = fallbackBlogs; // Start with fallback data

    if (spreadsheetId && apiKey) {
      try{
        // Fetch from Google Sheets
        const googleSheetsBlogs = await fetchBlogsFromGoogleSheets(spreadsheetId, range, apiKey);
        console.log(`Fetched ${googleSheetsBlogs.length} blogs from Google Sheets`);
        
        if (googleSheetsBlogs.length > 0) {
          allBlogs = googleSheetsBlogs; // Use Google Sheets data if available
        } else {
          console.log('Using fallback blog data since Google Sheets is empty');
        }
      } catch (error) {
        console.error('Error fetching blogs from Google Sheets:', error);
        console.warn('Using fallback blog data');
        allBlogs = fallbackBlogs;
      }
    } else {
      console.warn('Google Sheets configuration missing. Using fallback blog data.');
      allBlogs = fallbackBlogs;
    }

    // Sort blogs by date (newest first)
    const processedBlogs = allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, {recursive: true});
    }

    // Write to JSON file
    const blogsJson = JSON.stringify(processedBlogs, null, 2);
    const jsonFilePath = path.join(dataDir, 'blogs.json');
    fs.writeFileSync(jsonFilePath, blogsJson);

    // Write a JavaScript file that can be imported
    const blogsJs = `// Auto-generated blogs data
export const blogs = ${JSON.stringify(processedBlogs, null, 2)};
export default blogs;
`;

    const jsFilePath = path.join(dataDir, 'blogs.js');
    fs.writeFileSync(jsFilePath, blogsJs);

    console.log(`Blogs data saved to ${jsonFilePath} and ${jsFilePath}`);
    console.log(`Generated ${processedBlogs.length} blogs for static site`);

    return processedBlogs;
  } catch (error) {
    console.error('Error in generateStaticBlogs:', error);
    return [];
  }
}

// Run the function
generateStaticBlogs()
  .then(() => {
    console.log('Blog data generation complete!');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to generate blog data:', error);
    process.exit(1);
  });

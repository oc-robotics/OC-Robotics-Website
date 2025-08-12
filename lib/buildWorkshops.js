/**
 * Build-time script to fetch workshops from Google Sheets
 * This runs during `npm run build` to generate static data
 */
import fs from 'fs';
import path from 'path';
import { fetchWorkshopsFromGoogleSheets, mergeWorkshops, processWorkshops } from './googleSheetsApi.js';

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

// Load environment variables
loadEnvVars();

// Static workshops (fallback/default data)
const staticWorkshops = [
  {
    id: 0,
    title: 'Git Version Control',
    description: 'Learn the basics of Git and version control for your projects.',
    date: '2025-05-16',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGnmxS-vPs/94TKyuDgHo-7agUSG_GYBw/view'
  },
  {
    id: 1,
    title: 'Material UI',
    description: 'Learn how to build beautiful user interfaces with Material UI.',
    date: '2025-07-17',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGtfioxyd4/tGN_eFWIN9yBQ4ZO_iDOxg/view'
  },
  {
    id: 2,
    title: 'Web Dev 102: React',
    description: 'Explore the fundamentals of web development using React.',
    date: '2025-07-11',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGs3BaughQ/tW7fv3XFfK1lMiHuQ7z-AA/view'
  },
  {
    id: 3,
    title: 'AI Search Algorithms',
    description: 'Learn about AI search algorithms and their applications.',
    date: '2025-07-27',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGuZhJ-25A/ORzIP1Gakyj1KfMIUq0PoA/view'
  },
  {
    id: 4,
    title: 'Operating Systems',
    description: 'Learn about the fundamentals of operating systems and their design.',
    date: '2025-07-22',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGt6hBREm8/zIEoE_NFuLPffW05sDtJug/view'
  },
  {
    id: 5,
    title: 'Web Dev 101: Build & Deploy Your First Website',
    description: 'Learn about the basics of web development and how to deploy your first website.',
    date: '2025-07-27',
    type: 'software',
    slidesUrl: 'https://www.canva.com/design/DAGuawG6qQg/yU_SM6iK-L6sQePOIpkpug/view'
  },
  {
    id: 6,
    title: 'Chassis Design with SolidWorks',
    description: 'Learn the basics of chassis design using SolidWorks.',
    date: '2025-07-31',
    type: 'mechanical',
    slidesUrl: 'https://www.canva.com/design/DAGuxVQEYHU/FsAeJd-NadxueMOUCDwPNQ/view'
  },
];

async function generateWorkshopsData() {
  console.log('Fetching workshops from Google Sheets...');
  
  try {
    // Get environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = process.env.GOOGLE_SHEETS_RANGE || 'Sheet1!A1:F100';
    const apiKey = process.env.GOOGLE_API_KEY;

    let allWorkshops = staticWorkshops;

    if (spreadsheetId && apiKey) {
      try {
        // Fetch from Google Sheets
        const googleSheetsWorkshops = await fetchWorkshopsFromGoogleSheets(spreadsheetId, range, apiKey);
        console.log(`Fetched ${googleSheetsWorkshops.length} workshops from Google Sheets`);
        
        // Merge with static workshops
        allWorkshops = mergeWorkshops(staticWorkshops, googleSheetsWorkshops);
        console.log(`Total workshops after merge: ${allWorkshops.length}`);
      } catch (error) {
        console.warn('Failed to fetch from Google Sheets, using static workshops:', error.message);
      }
    } else {
      console.warn('Google Sheets credentials not found, using static workshops only');
    }

    // Process and validate workshops
    const processedWorkshops = processWorkshops(allWorkshops);
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to JSON file
    const workshopsJson = JSON.stringify(processedWorkshops, null, 2);
    const jsonFilePath = path.join(dataDir, 'workshops.json');
    fs.writeFileSync(jsonFilePath, workshopsJson);
    
    // Also write a JavaScript file that can be imported
    const workshopsJs = `// Auto-generated workshops data
export const workshops = ${JSON.stringify(processedWorkshops, null, 2)};
export default workshops;
`;
    const jsFilePath = path.join(dataDir, 'workshops.js');
    fs.writeFileSync(jsFilePath, workshopsJs);
    
    console.log(`Workshops data saved to ${jsonFilePath} and ${jsFilePath}`);
    console.log(`Generated ${processedWorkshops.length} workshops for static site`);
    
    return processedWorkshops;
  } catch (error) {
    console.error('Error generating workshops data:', error);
    
    // Fallback: save static workshops
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const processedStatic = processWorkshops(staticWorkshops);
    const workshopsJson = JSON.stringify(processedStatic, null, 2);
    const filePath = path.join(dataDir, 'workshops.json');
    fs.writeFileSync(filePath, workshopsJson);
    
    console.log('Fallback: Static workshops saved');
    return processedStatic;
  }
}

// Run the function
generateWorkshopsData()
  .then(() => {
    console.log('Workshop data generation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to generate workshop data:', error);
    process.exit(1);
  });

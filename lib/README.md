# Library Files

This folder contains utility functions and data management for the OC Robotics website.

## Files Overview

### 📅 **calendarData.js**
- Calendar/events data fetching and utilities
- Used by: Calendar components, Events page, Upcoming Events widget

### 🔨 **buildWorkshops.js** 
- Build-time script that fetches workshop data from Google Sheets
- Generates `data/workshops.json` for static site generation
- Runs automatically during `npm run build` (prebuild script)
- Usage: `npm run generate-workshops`

### 📊 **googleSheetsApi.js**
- Google Sheets API integration functions
- Used by: buildWorkshops.js for fetching workshop data
- Handles data fetching, validation, and processing

### 📖 **getPost.js**
- MDX post/page content loading utilities
- Used by: Dynamic page routes for documentation and content

### 🔗 **rehypeToc.js**
- Table of contents generation for MDX content
- Used by: Documentation pages for navigation

### 🎓 **workshopsData.js**
- Workshop data loader that reads from generated JSON file
- Provides fallback static workshop data
- Used by: Workshop components and pages

## Build Process

```
npm run build
├── prebuild: node lib/buildWorkshops.js
│   ├── Fetch from Google Sheets (if configured)
│   ├── Merge with static data
│   └── Generate data/workshops.json
└── next build (uses generated data)
```

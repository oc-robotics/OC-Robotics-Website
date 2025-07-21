# OC Robotics Website

> The official website for the OC Robotics team - showcasing projects, team members, and providing information about joining our robotics community.

## 🚀 Project Overview

This website serves as the central hub for the OC Robotics team, featuring:
- **Project Showcase** - Display our latest robotics projects and innovations
- **Team Introduction** - Meet our talented team members and their specialties
- **Social Media Links** - Connect with us across various platforms
- **Join Our Team** - Information for prospective members and recruitment

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Emotion CSS-in-JS
- **Language**: JavaScript/JSX
- **Deployment**: Vercel (configured)

<detail> <summary><strong>## 📁 Next.js File Structure </strong></summary> 

```
OC-Robotics-Website/
├── app/                          # App Router directory (Next.js 13+)
│   ├── layout.jsx               # Root layout (applies to all pages)
│   ├── page.jsx                 # Home page (/)
│   ├── theme.jsx                # Material-UI theme configuration
│   ├── about/
│   │   └── page.jsx            # About page (/about)
│   ├── services/
│   │   └── page.jsx            # Services page (/services)
│   ├── contact/
│   │   └── page.jsx            # Contact page (/contact)
│   └── components/
│       ├── ClientThemeProvider.jsx  # Material-UI theme wrapper
│       ├── Navbar.jsx              # Navigation component
│       └── Footer.jsx              # Footer component
├── public/                       # Static assets (images, icons, etc.)
├── package.json                 # Dependencies and scripts
├── next.config.js              # Next.js configuration
├── eslint.config.mjs           # ESLint configuration
└── README.md                   # This file
```
</detail>
### 🌐 How Folders Become Website Pages

In Next.js App Router, the folder structure inside `app/` directly maps to your website's URL structure:

| **Folder Path** | **Website URL** | **Purpose** |
|-----------------|-----------------|-------------|
| `app/page.jsx` | `yourdomain.com/` | **Home Page** - Main landing page with welcome message and navigation |
| `app/about/page.jsx` | `yourdomain.com/about` | **About Page** - Team introduction, mission, and company background |
| `app/services/page.jsx` | `yourdomain.com/services` | **Services Page** - Robotics services, capabilities, and offerings |
| `app/contact/page.jsx` | `yourdomain.com/contact` | **Contact Page** - Contact form, team contact info, and location |

### 📂 Adding New Pages

To create a new page, simply:

1. **Create a folder** with the desired URL name
2. **Add a `page.jsx` file** inside that folder

```bash
# Example: Adding a "projects" page
app/
├── projects/           # Creates /projects URL
│   └── page.jsx       # The actual page content
```

This would create a new page accessible at `yourdomain.com/projects`

### 🔧 Special Files in App Router

- **`page.jsx`** - The main content for that route
- **`layout.jsx`** - Shared layout that wraps pages (can exist at any level)
- **`loading.jsx`** - Loading UI for that route segment
- **`error.jsx`** - Error handling UI
- **`not-found.jsx`** - 404 page for that segment

### 🗂️ Nested Routes Example

You can create nested routes with deeper folder structures:

```
app/
├── projects/
│   ├── page.jsx                    # /projects
│   ├── [id]/
│   │   └── page.jsx               # /projects/[dynamic-id]
│   └── categories/
│       ├── page.jsx               # /projects/categories
│       └── robotics/
│           └── page.jsx           # /projects/categories/robotics
```

### Key Next.js App Router Concepts:

- **`layout.jsx`** - Shared layout that wraps all pages
- **`page.jsx`** - Defines a route (folder name becomes the URL path)
- **Server Components** - Default, render on server for better performance
- **Client Components** - Use `'use client'` for interactivity (hooks, events)
- **`metadata` export** - SEO and head tags configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oc-robotics/OC-Robotics-Website.git
   cd OC-Robotics-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

### Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

## 📝 Basic Git Operations

### Initial Setup
```bash
# Configure your Git identity (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Daily Workflow

#### 1. **Before Starting Work**
```bash
# Pull latest changes from main branch
git pull origin main

# Create a new feature branch
git checkout -b feature/your-feature-name
```

#### 2. **Making Changes**
```bash
# Check what files you've modified
git status

# Add specific files to staging
git add filename.jsx
# OR add all changes
git add .

# Commit your changes with a descriptive message
git commit -m "Add contact form to contact page"
```

#### 3. **Sharing Your Work**
```bash
# Push your branch to GitHub
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
# Go to GitHub.com → your repo → "Compare & pull request"
```

#### 4. **Useful Commands**
```bash
# View commit history
git log --oneline

# Switch between branches
git checkout main
git checkout feature/your-branch

# View differences
git diff filename.jsx

# Undo changes (before commit)
git checkout -- filename.jsx

# View all branches
git branch -a
```

## 🎨 Development Guidelines

### File Organization
- Keep components in `app/components/`
- One component per file
- Use descriptive file names (`ContactForm.jsx`, not `form.jsx`)

### Component Structure
```jsx
// Server Component (default)
import React from 'react'
import { Typography, Container } from '@mui/material'

export default function AboutPage() {
  return (
    <Container>
      <Typography variant="h1">About Us</Typography>
    </Container>
  )
}

// Client Component (when needed)
'use client'
import React, { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  // ... interactive logic
}
```

### When to Use `'use client'`:
- Event handlers (`onClick`, `onChange`)
- React hooks (`useState`, `useEffect`)
- Browser APIs (`window`, `localStorage`)
- Real-time features
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { getImagesFromGoogleDrive, getImagesByCategory, getImageCategories } from '@/lib/googleDriveApi';
import ImagesWithState from './ImagesWithState';

// Server-side function to fetch media data
async function getImagesData() {
  try {
    // Fetch all images and videos with category information
    const images = await getImagesFromGoogleDrive(); // Uses nested structure by default
    
    // Get images grouped by category (subfolder)
    const imagesByCategory = await getImagesByCategory();
    
    // Get list of categories (subfolder names)
    const categories = await getImageCategories();
    
    console.log(`Loaded ${images.length} media files from ${categories.length} categories`);
    
    return {
      images,
      imagesByCategory,
      categories
    };
  } catch (error) {
    console.error('Error loading media data:', error);
    return {
      images: [],
      imagesByCategory: {},
      categories: []
    };
  }
}

export default async function ImageGallery() {
  // Fetch media data server-side
  const { images, imagesByCategory, categories } = await getImagesData();

  return (
    <Container>
      <Typography variant="h1" sx={{ my: 4 }}>Media Gallery</Typography>
      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Browse our collection of images and videos. Hover over videos to preview them!
      </Typography>
      <Box sx={{ 
        mb: 4, 
        display: 'flex', 
        justifyContent: {xxs: 'space-evenly', events: 'space-between'}, 
        gap: {xxs: 2, sm: 'auto'},
        alignItems: {xxs: 'flex-start', events: 'center'}, 
        flexDirection: { xxs: 'column', events: 'row' }
      }}>
        <ImagesWithState 
          images={images}
          imagesByCategory={imagesByCategory}
          categories={categories}
        />
      </Box>
    </Container>
  );
}
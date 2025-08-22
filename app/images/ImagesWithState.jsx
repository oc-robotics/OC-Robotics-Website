'use client'
import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  ImageList,
  ImageListItem
} from '@mui/material';
import ImageCard from './ImageCard';

export default function ImagesWithState({ images, imagesByCategory, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter media based on selected category
  const filteredMedia = useMemo(() => {
    let result = images;

    // Filter by category
    if (selectedCategory !== 'all') {
      result = imagesByCategory[selectedCategory];
    }

    return result;
  }, [images, imagesByCategory, selectedCategory]);

  const handleMediaClick = (item) => {
    window.open(item.webViewLink, '_blank');
  };

  // Count different media types
  const mediaStats = useMemo(() => {
    const stats = filteredMedia.reduce((acc, item) => {
      if (item.isVideo) acc.videos++;
      else if (item.isImage) acc.images++;
      return acc;
    }, { images: 0, videos: 0 });
    
    return stats;
  }, [filteredMedia]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Add CSS for loading animation */}
      <style jsx>{`
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(359deg);
          }
        }
      `}</style>
      
      <FormControl sx={{ mb: 4 }}>
        <InputLabel id="workshop-select-label" sx={{ color: 'secondary.main', '&.Mui-focused': { color: 'secondary.main' }}}>Album</InputLabel>
        <Select
          labelId="workshop-select-label"
          label="Album"
          value={selectedCategory}
          sx={{
            color: '#ffffff',
            '& .MuiOutlinedInput-input':{
              padding: "20px 14px"
            },
            '& .MuiSelect-icon': {
              color: '#ffffff',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'secondary.main',
              borderWidth: '1px'
            }
          }}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="all">All Albums ({images.length} files)</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category} ({imagesByCategory[category]?.length || 0} files)
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Media stats */}
      {filteredMedia.length > 0 && (
        <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {mediaStats.images > 0 && (
            <Chip 
              label={`${mediaStats.images} Images`} 
              color="primary" 
              variant="outlined" 
              size="small" 
            />
          )}
          {mediaStats.videos > 0 && (
            <Chip 
              label={`${mediaStats.videos} Videos`} 
              color="secondary" 
              variant="outlined" 
              size="small" 
            />
          )}
        </Box>
      )}

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No media found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your category filter
          </Typography>
        </Paper>
      ) : (
        <ImageList variant='masonry' cols={3} gap={8}>
          {filteredMedia.map((item) => (
            <ImageListItem key={item.id}>
              <ImageCard item={item} onItemClick={handleMediaClick} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Box>
  );
}

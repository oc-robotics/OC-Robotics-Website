'use client'
import { Box, Typography, Chip } from "@mui/material";

export default function UpdateTag({ blog }) {
  const tags = (blog.tags).toString().split(',').map(tag => tag.trim());
  function getChipColor(tag) {
    switch (tag.toLowerCase()) {
      case 'software':
        return '#d21919';
      case 'mechanical':
        return '#08cdeb';
      case 'business':
        return '#29eb66';
      case 'electrical':
        return '#ffd700';
      case 'club':
        return '#c8732c';
      default:
        return '#9e9e9e';
    }
  }

  return (
    <Box sx={{
      width: '100%',
      minHeight: '250px',
      p: 3,
      pr: 0,
      mx: 'auto',
      borderInlineStart: '6px solid',
      borderColor: 'secondary.main',
      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      borderRadius: 2,
      my: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 2
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
      }}>
        <Box sx={{ 
          width: '30%',
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pr: 2
        }}>
          <Box sx={{mb: 1}}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Updated By: {blog.author}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{blog.date}</Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                sx={{
                  m: 0.5,
                  borderColor: getChipColor(tag),
                  color: getChipColor(tag),
                  backgroundColor: `${getChipColor(tag)}15`
                }} />
            ))}
          </Box>
        </Box>
        <Box sx={{ width: '70%', pr: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description: </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{blog.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

'use client'
import { Box, Typography, Chip, Card, CardContent } from "@mui/material";
import { Circle } from "@mui/icons-material";

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
    <Card elevation={7} sx={{
      width: '100%',
      mb: 2,
      borderLeft: '4px solid',
      borderColor: 'secondary.main',
      boxShadow: 2,
      borderRadius: 2,
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        boxShadow: 4,
        transform: 'translateY(-2px)'
      }
    }}>
      <CardContent sx={{
        display: 'flex',
        flexDirection: {xxs: 'column', sm: 'row'},
        alignItems: 'flex-start',
      }}>
        <Box sx={{ 
          width: {xxs: '100%', sm: '35%'},
          display: 'flex',
          flexDirection: {xxs: 'row', sm: 'column'},
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          pr: 2
        }}>
          <Box sx={{mb: 1}}>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Updated By: {blog.author}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{blog.date}</Typography>
          </Box>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', flexDirection: {xxs: 'row', sm: 'column'}}}>
            {tags.map((tag, index) => (
              <Box key={index}>
                <Chip
                  label={tag}
                  variant="outlined"
                  sx={{
                    display: { xxs: 'none', sm: 'flex' },
                    m: 0.5,
                    borderColor: getChipColor(tag),
                    color: getChipColor(tag),
                    backgroundColor: `${getChipColor(tag)}25`
                  }} 
                />
                <Circle sx={{ 
                  display: { xxs: 'flex', sm: 'none' },
                  width: {xxs: 12, xs: 20},
                  height: {xxs: 12, xs: 20},
                  color: getChipColor(tag),
                  m: 0.5,
                }} />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: '60%', pr: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Description: </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{blog.description}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

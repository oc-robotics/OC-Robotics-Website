import { Box, Typography, Chip } from "@mui/material";

export default function UpdateTag({ blog }) {
  function getChipColor(tag) {
    switch (tag) {
      case 'Software':
        return '#d21919';
      case 'Mechanical':
        return '#0f53b8';
      case 'Business':
        return '#29eb66';
      case 'Electrical':
        return '#ffdd00';
      case 'Club':
        return '#f57c00';
      default:
        return '#9e9e9e';
    }
  }

  return (
    <Box sx={{
      width: '80%',
      p: 3,
      mx: 'auto',
      borderInlineStart: '3px solid',
      borderColor: 'primary.main',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      my: 1,
    }}>
      <Box sx={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Box sx={{flexGrow: 1, maxWidth: '50%'}}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{blog.title}</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>By {blog.author}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{blog.date}</Typography>
          </Box>
        </Box>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
          {blog.tags.map((tag, index) => (
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
      <Box sx={{ mt: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description: </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>{blog.description}</Typography>
      </Box>
    </Box>
  );
}

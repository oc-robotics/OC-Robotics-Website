import { Box, Typography } from "@mui/material";

export default function UpdateTag({ update }) {
  return (
    <Box sx={{
      width: '100%',
      p: 3,
      borderInlineStart: '3px solid',
      borderColor: 'primary.main',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      my: 1,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Week {update.week}: {update.title}</Typography>
        <Typography variant="caption">{update.date}</Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 1, color: 'text.secondary' }}>{update.description}</Typography>

    </Box>
  );
}

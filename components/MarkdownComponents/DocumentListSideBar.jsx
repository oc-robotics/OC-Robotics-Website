import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import Link from 'next/link';

function DocumentListSideBar({ documentList }) {
  return (
    <Box sx={{
      position: 'sticky', 
      top: 100, 
      maxHeight: 'calc(90vh - 64px)', 
      height: 'fit-content',
      overflowY: 'auto',
      borderRadius: 1,
      boxShadow: 2,
      p: 2
    }}>
      <Typography variant="h6" gutterBottom>
        Document List
      </Typography>
      <List sx={{ listStyleType: 'none', padding: 0 }}>
        {documentList.map((doc, index) => (
          <ListItem key={index} sx={{ marginBottom: '10px' }}>
            <Link href={`/pages/${doc.slug}`} style={{ textDecoration: 'none', color: '#333' }}>
              <Typography variant="body2">
                {doc.frontmatter.title || doc.slug}
              </Typography>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DocumentListSideBar;

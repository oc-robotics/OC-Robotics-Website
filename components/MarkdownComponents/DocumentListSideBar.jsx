import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import Link from 'next/link';

function DocumentListSideBar({ documentList }) {
  return (
    <Box sx={{ padding: 0, margin: 0, position: 'sticky', top: 64, height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Document List
      </Typography>
      <List sx={{ listStyleType: 'none', padding: 0 }}>
        {documentList.map((doc, index) => (
          <ListItem key={index} sx={{ marginBottom: '10px' }}>
            <Link href={`/pages/${doc.slug}`} style={{ textDecoration: 'none', color: 'white'}}>
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

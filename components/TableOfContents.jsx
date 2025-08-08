import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import Link from 'next/link';

export default function Sidebar({ toc }) {
  return (
    <List sx={{
      width: '20%',
      borderRadius: 1,
      maxHeight: 'calc(100vh - 64px)',
      position: 'sticky',
      top: 64, 
    }}>
      {toc.map(({ id, text, level }, idx) => (
        text && level < 3 && (
          <ListItem key={id || idx} style={{ marginLeft: level * 16 }} sx={{px: 0, py: '4px'}}>
              <Link href={`#${id}`} style={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
              }}>
                <Typography variant="body2" id={id} sx={{ 
                  margin: 0,
                  p: 0,
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'wrap',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: "black",
                    transition: 'width 0.3s ease-in-out',
                  },
                  '&:hover::after': {
                    width: '100%',
                  }
                }}>
                  {text}
                </Typography>
              </Link>
          </ListItem>
        )
      ))}
    </List>
  )
}
'use client'
import {Card, CardContent, CardHeader, Typography, Avatar, Box, CardMedia } from '@mui/material';
import { Work, Construction, FlashOn, Laptop } from '@mui/icons-material';
import { useState } from 'react';

export default function WorkshopCards({ workshop, targetId }) {
  const isTargeted = targetId && targetId === workshop.id.toString();
  const [remind, setRemind] = useState(isTargeted);
  const animation = remind ? 'bouncing 0.6s infinite' : 'none';
  const handleCardClick = () => {
    window.open(workshop.slidesUrl, '_blank', 'fullscreen=yes,scrollbars=yes,resizable=yes');
  };

  return (
    <Card 
      id={`workshop-${workshop.id}`} // Add unique ID for scrolling
      sx={{
        "@keyframes bouncing": {
          "0%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-5px)"
          },
          "100%": {
            transform: "translateY(0)"
          }
        },
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.6s box-shadow 0.3s',
        cursor: 'pointer',
        animation: animation,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-5px)',
        },
      }}
      onClick={handleCardClick}
      onMouseOver={() => setRemind(false)}
    >
      <CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{
              color: 'primary.main',
              bgcolor: 'transparent'
            }}>
              {workshop.type === 'business' && <Work />}
              {workshop.type === 'mechanical' && <Construction />}
              {workshop.type === 'electrical' && <FlashOn />}
              {workshop.type === 'software' && <Laptop />}
            </Avatar>
          }
          title={workshop.title}
          subheader={workshop.date}
          sx={{
            pl: 0,
            pt: 0,
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {workshop.description}
        </Typography>
        <CardMedia sx={{
          position: "relative",
          width: "100%",
          height: 0,
          pt: "56.2500%",
          pb: 0,
          px: 2,
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          mt: 2,
          mb: "0.9em",
          overflow: "hidden",
          borderRadius: "8px",
          willChange: "transform"
        }}>
          <Box 
            component="iframe" 
            title={workshop.title}
            loading="lazy"
            src={`${workshop.slidesUrl}?embed`}
            allowFullScreen
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              border: "none",
              padding: 0,
              margin: 0
            }}
          />
        </CardMedia>
      </CardContent>
    </Card>
  );
}
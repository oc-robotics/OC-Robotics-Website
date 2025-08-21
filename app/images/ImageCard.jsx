import { OndemandVideo, ImageOutlined, OpenInNew } from '@mui/icons-material';
import { useState } from 'react';
import { Box, Typography, ImageListItemBar, Skeleton, IconButton } from '@mui/material';

export default function ImageCard({ item, onItemClick }) {
  const [showPreview, setShowPreview] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 1,
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out'
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.isVideo ? (
        <>
          {videoError ? (
            <Box
              sx={{
                width: '100%',
                height: 200,
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexDirection: 'column',
                gap: 1
              }}
            >
              <Typography variant="body2">🎥 Video Preview Unavailable</Typography>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
              {/* Show thumbnail initially */}
              <Box
                component="img"
                src={`https://drive.google.com/thumbnail?id=${item.id}&sz=w1000`}
                alt={item.alt}
                sx={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  display: showPreview ? 'none' : 'block',
                  backgroundColor: '#000'
                }}
                onError={(e) => {
                  // Fallback to regular thumbnail
                  e.target.src = item.thumbnailLink;
                }}
                loading="lazy"
              />
              
              {/* Show video preview on hover */}
              {showPreview && (
                <>
                  {isLoading && <Skeleton variant="rounded" animation="wave" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />}
                  <Box
                    component="iframe"
                    src={`https://drive.google.com/file/d/${item.id}/preview?usp=sharing`}
                    sx={{
                      width: '100%',
                      height: '300px',
                      border: 'none',
                      opacity: isLoading ? 0 : 1,
                      transition: 'opacity 0.2s ease-in-out'
                    }}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={`Video preview: ${item.name}`}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                      setLoading(false)
                      handleVideoError();
                    }}
                  />
                </>
              )}
            </Box>
          )}
          
          {/* Video overlay indicator */}
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              color: 'white',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <OndemandVideo/> Video
          </Box>
        </>
      ) : (
        <>
          <img
            src={`https://drive.google.com/thumbnail?id=${item.id}&sz=w1000`}
            alt={item.alt}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
            onError={(e) => { e.target.src = item.directLink }}
            loading="lazy"
          />
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: 1,
              px: 1,
              py: 0.5,
              color: 'white',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <ImageOutlined/>Image
          </Box>
        </>
      )}

      {showPreview && (
        <ImageListItemBar
          title={new Date(item.createdTime).toLocaleDateString()}
          subtitle={item.isVideo ? `🎥 ${item.name}` : `📷 ${item.name}`}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              onClick={(e) => {
                e.stopPropagation();
                onItemClick(item);
              }}
            >
              <OpenInNew />
            </IconButton>
          }
        />
      )}
    </Box>
  );
}
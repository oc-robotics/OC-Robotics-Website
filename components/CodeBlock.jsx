import { IconButton, Slide, Snackbar, Alert } from '@mui/material';
import React, { useRef, useState } from 'react';
import {Close, CheckRounded, ContentCopyRounded } from '@mui/icons-material';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CodeBlock({ children, ...props }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => setCopied(false)}>
        <Close fontSize="small" sx={{
            borderRadius: '50%',
            '&:hover': {
                color: 'red',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)',
                transition: 'color 0.3s ease, transform 0.3s ease, background-color 0.3s ease',
            }
        }} />
      </IconButton>
    </React.Fragment>
  );

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleCopy}
        className="copy-btn"
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          background: '#eee',
          border: 'none',
          borderRadius: 4,
          padding: '2px 8px',
          cursor: 'pointer'
        }}
      >
        {copied ? <CheckRounded fontSize="small" sx={{ color: 'green' }} /> : <ContentCopyRounded fontSize="small" />}
      </button>
      <pre {...props} style={{ margin: 0 }}>
        {React.cloneElement(children, { ref: codeRef })}
      </pre>
      <Snackbar
        open={copied}
        onClose={() => setCopied(false)}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success"
          onClose={() => setCopied(false)}
          variant="filled"
          sx={{width: '100%'}}
        >
          Code copied to clipboard
        </Alert>
      </Snackbar>
    </div>
  );
}
import { Slide, Snackbar, Alert, Button, Box } from '@mui/material';
import React, { useRef, useState } from 'react';
import { CheckRounded, ContentCopyRounded } from '@mui/icons-material';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function CodeBlock({ children, ...props }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  
  return (
    <Box style={{ position: 'relative' }}>
      <Button
        onClick={handleCopy}
        className="copy-btn"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          background: 'transparent',
          border: 'none',
          borderRadius: 4,
          padding: '2px 8px',
          cursor: 'pointer',
          border: copied ? '1px solid green' : '1px solid #444',
          borderRadius: '4px',
          '&:hover': { background: '#333' },
          minWidth: '32px',
        }}
      >
        {copied ? <CheckRounded fontSize="small" sx={{ color: 'green' }} /> : <ContentCopyRounded fontSize="small" sx={{color: 'white'}} />}
      </Button>
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
    </Box>
  );
}
import React from 'react';
import Typography from '@mui/material/Typography';

function Counter({ timeLeft }) {
  return (
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: 'calc(100vh - 240px)',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      <Typography 
        variant="h1" 
        align="center" 
        style={{ color: '#f4f4f4' }}
      >
        {formatTime(timeLeft)}
      </Typography>
    </div>
  );
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default Counter;

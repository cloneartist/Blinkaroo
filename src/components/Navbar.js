
import React from 'react';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <div style={{ padding: '10px', textAlign: 'center', fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h5" style={{ color: '#ffffff', textShadow: '1px 1px 5px rgba(255, 255, 255, 0.5)' }}>
        Blinkaroo
      </Typography>
    </div>
  );
};

export default Navbar;

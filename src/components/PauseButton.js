
import React from 'react';
import Button from '@mui/material/Button';

function PauseButton({ isPaused, handlePauseResume, handleEditTimer }) {
  const buttonColor = isPaused ? 'green' : 'red';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: buttonColor, color: 'white' }}
        onClick={handlePauseResume}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </Button>
      {!isPaused && (
        <Button variant="outlined" size="large" onClick={handleEditTimer} style={{ marginLeft: '10px' }}>
          Edit
        </Button>
      )}
    </div>
  );
}

export default PauseButton;

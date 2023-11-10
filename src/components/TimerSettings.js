
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function TimerSettings({ setTime, setIsPaused }) {
  const [inputValue, setInputValue] = useState('20'); // Default val: 20 minutes
  const [open, setOpen] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetTimer = () => {
    const newTime = parseInt(inputValue, 10) * 60;
    setTime(newTime);
    setIsPaused(false); 
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Timer</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Set Timer (minutes)"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            margin="dense" 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSetTimer} color="primary">
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TimerSettings;

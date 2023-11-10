// BlinkarooApp.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar from './components/Navbar';
import Counter from './components/Counter';
import PauseButton from './components/PauseButton';
import TimerSettings from './components/TimerSettings';

function BlinkarooApp() {
  const [timeLeft, setTimeLeft] = useState(1200); // Default: 20 min
  const [originalTime, setOriginalTime] = useState(1200); // User input time
  const [isPaused, setIsPaused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const workerRef = useRef(null); // Reference to the Web Worker

  const handleCountdown = useCallback(() => {
    // Countdown for 20 seconds
    setTimeLeft(originalTime);

    const countdownTimer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(countdownTimer);
          showNotification('Timer Restarted', 'The timer has been restarted.');
          console.log('Timer manipulated: Countdown reset');
          return originalTime;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  }, [originalTime]);

  const updateTimer = useCallback(() => {
    if (!isPaused && !isEditing) {
      if (timeLeft === 0) {
        showNotification('Time is up!');
        handleCountdown();
        console.log('Timer manipulated: Time is up, countdown started');
      } else {
        setTimeLeft((prevTime) => {
          console.log('Timer manipulated: Countdown updated');
          return prevTime - 1;
        });
      }
    }
  }, [isPaused, isEditing, timeLeft, handleCountdown]);

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          showNotification('Notification Enabled', 'You will now receive notifications.');
        } else if (permission === 'denied') {
          alert('Notifications are currently blocked. Please enable them for a better experience.');
        } else if (permission === 'default') {
          alert('To receive notifications, please enable them in your browser settings.');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      setOpenDialog(true);
    }

    workerRef.current = new Worker(URL.createObjectURL(new Blob([`(${workerFunction.toString()})()`], { type: 'application/javascript' })));

    workerRef.current.addEventListener('message', (event) => {
      if (event.data.command === 'tick') {
       
        console.log('Tick received from Web Worker');
   
        updateTimer();
      }
    });

    // Start the timer
    workerRef.current.postMessage({ command: 'start' });

    return () => {
      workerRef.current.postMessage({ command: 'stop' });
      workerRef.current.terminate();
    };
  }, [isPaused, isEditing, updateTimer]);

  const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => {
      console.log(`Timer manipulated: Pause/Resume clicked (Paused: ${!prevIsPaused})`);
      return !prevIsPaused;
    });
  };

  const handleSetTime = (newTime) => {
    setOriginalTime(newTime);
    setTimeLeft(newTime);
    console.log('Timer manipulated: User-set time updated');
  };

  const handleEditTimer = () => {
    setIsEditing(true);
    console.log('Timer manipulated: Edit timer clicked');
  };

  const handleRequestPermission = () => {
    if (!permissionRequested) {
      requestNotificationPermission();
      setPermissionRequested(true);
      console.log('Timer manipulated: Notification permission requested');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    requestNotificationPermission();
    setPermissionRequested(true);
    setOpenDialog(false);
    console.log('Timer manipulated: Notification permission confirmed');
  };

  const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  return (
    <Container
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #141e30, #243b55)',
        padding: 0,
      }}
    >
      <Navbar />
      <Counter timeLeft={timeLeft} isPaused={isPaused} />
      <PauseButton
        isPaused={isPaused}
        handlePauseResume={handlePauseResume}
        handleEditTimer={handleEditTimer}
        startTimer={handleRequestPermission}
      />
      {isEditing && (
        <TimerSettings
          setTime={handleSetTime}
          setIsPaused={(value) => {
            setIsPaused(value);
            setIsEditing(false);
          }}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Request Notification Permission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This app requires notification permission to alert you when the timer reaches zero.
            Would you like to enable notifications?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDialog} color="primary">
            Enable Notifications
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

// Web Worker function
function workerFunction() {
  let timerInterval;
/* eslint-disable-next-line no-restricted-globals */
  self.addEventListener('message', (event) => {
    if (event.data.command === 'start') {
      timerInterval = setInterval(() => {
        /* eslint-disable-next-line no-restricted-globals */
        self.postMessage({ command: 'tick' });
      }, 1000);
    } else if (event.data.command === 'stop') {
      clearInterval(timerInterval);
    }
  });
}

export default BlinkarooApp;

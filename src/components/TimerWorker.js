let timer;
let paused = false;
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('message', (event) => {
  if (event.data.command === 'start') {
    startTimer();
  } else if (event.data.command === 'stop') {
    stopTimer();
  } else if (event.data.command === 'pause') {
    pauseTimer();
  } else if (event.data.command === 'resume') {
    resumeTimer();
  }
});

function startTimer() {
  timer = setInterval(() => {
    if (!paused) {
        /* eslint-disable-next-line no-restricted-globals */
      self.postMessage({ command: 'tick' });
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function pauseTimer() {
  paused = true;
}

function resumeTimer() {
  paused = false;
}

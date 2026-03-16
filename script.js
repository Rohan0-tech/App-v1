const timerDisplay = document.getElementById('timerDisplay');
const minutesInput = document.getElementById('minutesInput');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('statusText');

let totalSeconds = Number(minutesInput.value) * 60;
let remainingSeconds = totalSeconds;
let intervalId = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function render() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function setStatus(text, done = false) {
  statusText.textContent = text;
  statusText.classList.toggle('done', done);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
  startPauseBtn.textContent = 'Start';
}

function tick() {
  if (remainingSeconds <= 0) {
    stopTimer();
    setStatus("Time's up! Great work 🎉", true);
    return;
  }

  remainingSeconds -= 1;
  render();

  if (remainingSeconds === 0) {
    stopTimer();
    setStatus("Time's up! Great work 🎉", true);
  }
}

startPauseBtn.addEventListener('click', () => {
  if (intervalId) {
    stopTimer();
    setStatus('Paused ⏸️');
    return;
  }

  if (remainingSeconds <= 0) {
    remainingSeconds = totalSeconds;
    render();
  }

  intervalId = setInterval(tick, 1000);
  startPauseBtn.textContent = 'Pause';
  setStatus('Timer is running...');
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  const minutes = Math.max(1, Math.min(180, Number(minutesInput.value) || 5));
  totalSeconds = minutes * 60;
  remainingSeconds = totalSeconds;
  render();
  setStatus('Reset complete. Ready when you are ✨');
});

minutesInput.addEventListener('change', () => {
  const minutes = Math.max(1, Math.min(180, Number(minutesInput.value) || 5));
  minutesInput.value = minutes;

  if (!intervalId) {
    totalSeconds = minutes * 60;
    remainingSeconds = totalSeconds;
    render();
    setStatus('Duration updated.');
  } else {
    setStatus('Duration will apply after reset.');
  }
});

render();

 let timerDisplay = document.getElementById('timer');
let toggleBtn = document.getElementById('toggle');
let resetBtn = document.getElementById('reset');
let addTimeBtn = document.getElementById('add-time');
let inputTime = document.getElementById('input-time');
let seriesCountDisplay = document.getElementById('series-count');
let resetSeriesBtn = document.getElementById('reset-series');
let circle = document.querySelector('.progress-ring__circle');

let radius = circle.r.baseVal.value;
let circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let totalTime = parseInt(inputTime.value);
let remainingTime = totalTime;
let interval = null;
let running = false;
let seriesCount = 0;

function updateTimerDisplay(time) {
  let mins = Math.floor(time / 60);
  let secs = time % 60;
  timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

function startTimer() {
  if (interval || remainingTime <= 0) return;
  running = true;
  toggleBtn.textContent = '⏸️';
  interval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateTimerDisplay(remainingTime);
      setProgress(((totalTime - remainingTime) / totalTime) * 100);
    } else {
      clearInterval(interval);
      interval = null;
      running = false;
      toggleBtn.textContent = '▶️';
      seriesCount++;
      seriesCountDisplay.textContent = seriesCount;
    }
  }, 1000);
}

function pauseTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
    toggleBtn.textContent = '▶️';
    running = false;
  }
}

toggleBtn.addEventListener('click', () => {
  if (running) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', () => {
  pauseTimer();
  totalTime = parseInt(inputTime.value);
  remainingTime = totalTime;
  updateTimerDisplay(remainingTime);
  setProgress(0);
});

addTimeBtn.addEventListener('click', () => {
  remainingTime += 60;
  totalTime += 60;
  updateTimerDisplay(remainingTime);
});

resetSeriesBtn.addEventListener('click', () => {
  seriesCount = 0;
  seriesCountDisplay.textContent = seriesCount;
});

inputTime.addEventListener('change', () => {
  totalTime = parseInt(inputTime.value);
  remainingTime = totalTime;
  updateTimerDisplay(remainingTime);
  setProgress(0);
});

updateTimerDisplay(remainingTime);
setProgress(0);

// get the necessary elements from the HTML
const display = document.querySelector('.timer-display');
const startButton = document.querySelector('.start-button');
const pauseButton = document.querySelector('.pause-button');
const resetButton = document.querySelector('.reset-button');
const alarmSound = document.querySelector('.alarm-sound');

let timerInterval; // variable to hold the setInterval instance

// function to update the timer display
function updateDisplay(minutes, seconds) {
  // add leading zeros if needed
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');
  display.textContent = `${paddedMinutes}:${paddedSeconds}`;
}

// function to start the timer
function startTimer(duration) {
  let remainingSeconds = duration;

  // immediately display the initial time
  updateDisplay(Math.floor(remainingSeconds / 60), remainingSeconds % 60);

  // start the interval to update the display every second
  timerInterval = setInterval(() => {
    remainingSeconds--;

    if (remainingSeconds < 0) {
      clearInterval(timerInterval);
      display.textContent = '00:00';
      alarmSound.play(); // play the alarm sound
    } else {
      updateDisplay(Math.floor(remainingSeconds / 60), remainingSeconds % 60);
    }
  }, 1000);
}

// event listener for the start button
startButton.addEventListener('click', () => {
  const inputMinutes = parseInt(prompt('Enter minutes:', '1'));
  const inputSeconds = parseInt(prompt('Enter seconds:', '0'));

  if (isNaN(inputMinutes) || isNaN(inputSeconds)) {
    alert('Invalid input');
    return;
  }

  const duration = inputMinutes * 60 + inputSeconds;
  startTimer(duration);
});

// event listener for the pause button
pauseButton.addEventListener('click', () => {
  clearInterval(timerInterval);
});

// event listener for the reset button
resetButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  updateDisplay(0, 0);
});

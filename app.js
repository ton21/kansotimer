let countdownTimeout;
let totalRemainingTime;
let currentIntervalTime;
const beep = new Audio('./beep.mp3');

const playBeep = (callback) => {
  beep.play();
  if (callback) callback();
};

const updateDisplay = (timeInSeconds) => {
  const displayElement = document.querySelector('#timeDisplay');
  displayElement.textContent = `${timeInSeconds}`;
};

const resetFields = () => {
  document
    .querySelectorAll('input[type="number"]')
    .forEach((item) => (item.value = 0));
};

const startTimer = () => {
  const totalMinutesInput = document.querySelector('#totalMinutes');
  const intervalSecondsInput = document.querySelector('#intervalSeconds');
  const startButton = document.querySelector('#startButton');
  const stopButton = document.querySelector('#stopButton');

  const getInputs = () => ({
    totalMinutes: parseInt(totalMinutesInput.value) || 0,
    intervalSeconds: parseInt(intervalSecondsInput.value) || 0,
  });

  const toSeconds = (minutes) => minutes * 60;

  const countdown = (totalTime, intervalTime) => {
    if (totalTime <= 0) {
      playBeep(() => {
        updateDisplay(0);
        alert('Time is up!');
        resetFields();
      });

      return;
    }

    if (intervalTime <= 0) {
      playBeep();
      intervalTime = parseInt(document.querySelector('#intervalSeconds').value); // Reinicia o intervalo
    }

    updateDisplay(intervalTime);

    countdownTimeout = setTimeout(
      () => countdown(totalTime - 1, intervalTime - 1),
      1000
    );
  };

  const startCountdown = () => {
    const { totalMinutes, intervalSeconds } = getInputs();

    if (countdownTimeout) {
      clearTimeout(countdownTimeout);
    }

    if (totalMinutes === 0 && intervalSeconds === 0) {
      alert('Please input a valid time!');
      return;
    }

    // Configuração do tempo total e intervalo
    if (intervalSeconds > 0) {
      // Divide o tempo em intervalos
      totalRemainingTime = toSeconds(totalMinutes) + intervalSeconds;
      currentIntervalTime = intervalSeconds;
      countdown(totalRemainingTime, currentIntervalTime);
    } else {
      // Apenas minutos como intervalo único
      totalRemainingTime = toSeconds(totalMinutes);
      countdown(totalRemainingTime, totalRemainingTime);
    }
  };

  const stopCountdown = () => {
    clearTimeout(countdownTimeout);
    updateDisplay(0);
    resetFields();
  };

  startButton.addEventListener('click', startCountdown);
  stopButton.addEventListener('click', stopCountdown);
};

startTimer();

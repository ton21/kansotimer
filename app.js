let countdownTimeout;
let totalRemainingTime;
let currentIntervalTime;

const playBeep = () => {
  const beep = new Audio('./beep.mp3');
  beep.play();
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

// startTimer
const startTimer = () => {
  const totalMinutesInput = document.querySelector('#totalMinutes');
  const intervalSecondsInput = document.querySelector('#intervalSeconds');
  const startButton = document.querySelector('#startButton');
  const stopButton = document.querySelector('#stopButton');

  const getInputs = () => ({
    totalMinutes: parseInt(totalMinutesInput.value),
    intervalSeconds: parseInt(intervalSecondsInput.value),
  });

  const toSeconds = (minutes) => minutes * 60;

  // countdown
  const countdown = (totalTime, intervalTime) => {
    if (totalTime <= 0) {
      updateDisplay(0);
      alert('Time is up!');
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

  // startCountdown
  const startCountdown = () => {
    const { totalMinutes, intervalSeconds } = getInputs();
    totalRemainingTime = toSeconds(totalMinutes); // Tempo total restante
    currentIntervalTime = intervalSeconds; // Tempo restante no intervalo atual

    if (countdownTimeout) {
      clearTimeout(countdownTimeout);
    }

    if (totalRemainingTime > 0 && currentIntervalTime > 0) {
      countdown(totalRemainingTime, currentIntervalTime); // Inicia o contador
    } else {
      alert('Please, input valid values!');
    }
  };

  const stopCountdown = () => {
    clearTimeout(countdownTimeout);
    updateDisplay(0); // Zera a exibição
    resetFields();
    // alert('Timer interrompido!');
  };

  startButton.addEventListener('click', startCountdown);
  stopButton.addEventListener('click', stopCountdown);
};

startTimer();

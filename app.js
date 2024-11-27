let countdownTimeout;
let totalRemainingTime;
let currentIntervalTime;
let totalIntervals;
let intervalsRemaining;
const beep = new Audio('./beep.mp3');

const playBeep = (callback) => {
  beep.play();
  if (callback) callback();
};

const updateDisplay = (timeInSeconds) => {
  const displayElement = document.querySelector('#timeDisplay');
  displayElement.textContent = `${timeInSeconds}`;
};

const updateIntervalsDisplay = () => {
  const intervalsElement = document.querySelector('#intervalsRemaining');
  intervalsElement.textContent = `Rounds: ${intervalsRemaining}`;
};

const resetFields = () => {
  document
    .querySelectorAll('input[type="number"]')
    .forEach((item) => (item.value = 0));
  document.querySelector('#timeDisplay').textContent = '0';
  document.querySelector('#intervalsRemaining').textContent = 'Rounds: 0';
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
      intervalsRemaining--; // Reduz o número de intervalos restantes
      updateIntervalsDisplay(); // Atualiza a exibição dos intervalos
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
      totalRemainingTime = toSeconds(totalMinutes);
      currentIntervalTime = intervalSeconds;

      // Calcula o número total de intervalos
      totalIntervals = Math.floor(totalRemainingTime / intervalSeconds);
      intervalsRemaining = totalIntervals;
      updateIntervalsDisplay();

      countdown(totalRemainingTime, currentIntervalTime);
    } else {
      totalRemainingTime = toSeconds(totalMinutes);
      intervalsRemaining = 1; // Apenas 1 intervalo grande
      updateIntervalsDisplay();

      countdown(totalRemainingTime, totalRemainingTime);
    }
  };

  const stopCountdown = () => {
    clearTimeout(countdownTimeout);
    resetFields();
  };

  startButton.addEventListener('click', startCountdown);
  stopButton.addEventListener('click', stopCountdown);
};

startTimer();

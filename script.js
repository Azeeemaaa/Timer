let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let addMaterialsButton = document.getElementById('addMaterials');
let timeDisplay = document.getElementById('time');
let amountDisplay = document.getElementById('amount');
let materialInput = document.getElementById('materials');
let materialCostDisplay = document.getElementById('materialCost');
let totalDisplay = document.getElementById('total');
let rateInput = document.getElementById('rate');

let timer;
let startTime = null;
let elapsed = 0; // Прошедшее время в секундах
let fixedMaterials = 0;
let isRunning = false;

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;
  return [hrs, mins, secs].map(v => v < 10 ? "0" + v : v).join(":");
}

function calculateWorkAmount(seconds) {
  let rate = parseFloat(rateInput.value) || 0;
  let hours = seconds / 3600;
  return rate * hours;
}

function updateDisplay() {
  let totalElapsed = elapsed;

  if (isRunning && startTime) {
    totalElapsed += Math.floor((Date.now() - startTime) / 1000);
  }

  timeDisplay.textContent = formatTime(totalElapsed);
  amountDisplay.textContent = calculateWorkAmount(totalElapsed).toFixed(2);
  materialCostDisplay.textContent = fixedMaterials.toFixed(2);
  totalDisplay.textContent = (calculateWorkAmount(totalElapsed) + fixedMaterials).toFixed(2);
}

function saveState() {
  localStorage.setItem('startTime', startTime);
  localStorage.setItem('elapsed', elapsed);
  localStorage.setItem('rate', rateInput.value);
  localStorage.setItem('materials', fixedMaterials);
  localStorage.setItem('isRunning', isRunning);
}

function loadState() {
  startTime = localStorage.getItem('startTime') ? parseInt(localStorage.getItem('startTime')) : null;
  elapsed = parseInt(localStorage.getItem('elapsed')) || 0;
  rateInput.value = localStorage.getItem('rate') || '';
  fixedMaterials = parseFloat(localStorage.getItem('materials')) || 0;
  isRunning = localStorage.getItem('isRunning') === 'true';

  updateDisplay();

  if (isRunning) {
    startRealTimer();
  }
}

function startRealTimer() {
  if (!timer) {
    timer = setInterval(() => {
      updateDisplay();
      saveState();
    }, 1000);
  }
}

function stopRealTimer() {
  clearInterval(timer);
  timer = null;
}

startButton.addEventListener('click', function() {
  if (!isRunning) {
    startTime = Date.now();
    isRunning = true;
    startRealTimer();
    saveState();
  }
});

stopButton.addEventListener('click', function() {
  if (isRunning && startTime) {
    elapsed += Math.floor((Date.now() - startTime) / 1000);
    startTime = null;
    isRunning = false;
    stopRealTimer();
    saveState();
    updateDisplay();
  }
});

resetButton.addEventListener('click', function() {
  stopRealTimer();
  startTime = null;
  elapsed = 0;
  fixedMaterials = 0;
  isRunning = false;
  rateInput.value = '';
  materialInput.value = '';
  localStorage.clear();
  updateDisplay();
});

addMaterialsButton.addEventListener('click', function() {
  let inputMaterials = parseFloat(materialInput.value) || 0;
  fixedMaterials = inputMaterials;
  updateDisplay();
  saveState();
});

window.onload = function() {
  loadState();
};
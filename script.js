const rateInput = document.getElementById('rate');
const materialInput = document.getElementById('materialCost');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const addMaterialBtn = document.getElementById('addMaterialBtn');
const timeDisplay = document.getElementById('timeDisplay');
const workCostDisplay = document.getElementById('workCost');
const materialsCostDisplay = document.getElementById('materialsCost');
const totalCostDisplay = document.getElementById('totalCost');

let timerInterval = null;
let running = false;
let startTime = 0;
let storedElapsed = 0;
let materialsTotal = 0;

function saveState() {
  localStorage.setItem('rate', rateInput.value);
  localStorage.setItem('materialsTotal', materialsTotal);
  localStorage.setItem('timerRunning', running);
  localStorage.setItem('startTime', startTime);
  localStorage.setItem('storedElapsed', storedElapsed);
}

function loadState() {
  rateInput.value = localStorage.getItem('rate') || '';
  materialsTotal = parseFloat(localStorage.getItem('materialsTotal')) || 0;
  storedElapsed = parseInt(localStorage.getItem('storedElapsed')) || 0;
  running = localStorage.getItem('timerRunning') === 'true';
  startTime = parseInt(localStorage.getItem('startTime')) || 0;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  let currentElapsed = storedElapsed;
  if (running && startTime) {
    currentElapsed += Date.now() - startTime;
  }

  timeDisplay.textContent = formatTime(currentElapsed);
  const rate = parseFloat(rateInput.value) || 0;
  const hoursWorked = currentElapsed / 3600000;
  const workCost = hoursWorked * rate;
  workCostDisplay.textContent = workCost.toFixed(2);
  materialsCostDisplay.textContent = materialsTotal.toFixed(2);
  totalCostDisplay.textContent = (workCost + materialsTotal).toFixed(2);
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now();
    saveState();
    timerInterval = setInterval(updateDisplay, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
}

function stopTimer() {
  if (running) {
    running = false;
    storedElapsed += Date.now() - startTime;
    startTime = 0;
    saveState();
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

function resetTimer() {
  running = false;
  storedElapsed = 0;
  startTime = 0;
  materialsTotal = 0;
  localStorage.clear();
  clearInterval(timerInterval);
  rateInput.value = '';
  materialInput.value = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  updateDisplay();
}

function addMaterials() {
  const materialValue = parseFloat(materialInput.value);
  if (!isNaN(materialValue) && materialValue > 0) {
    materialsTotal += materialValue;
    materialsTotal = Math.round(materialsTotal * 100) / 100;
    materialInput.value = '';
    saveState();
    updateDisplay();
  }
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
addMaterialBtn.addEventListener('click', addMaterials);

window.onload = () => {
  loadState();
  updateDisplay();
  if (running) {
    startTimer();
  }
};

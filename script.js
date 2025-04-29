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

let savedRate = localStorage.getItem('hourlyRate');
let savedMaterials = localStorage.getItem('materialsTotal');
let savedRunning = localStorage.getItem('timerRunning');
let savedStart = localStorage.getItem('timerStart');
let savedElapsed = localStorage.getItem('timerElapsed');

if (savedRate !== null) {
  rateInput.value = savedRate;
}
if (savedMaterials !== null) {
  materialsTotal = parseFloat(savedMaterials) || 0;
} else {
  materialsTotal = 0;
}
if (savedElapsed !== null) {
  storedElapsed = parseInt(savedElapsed) || 0;
} else {
  storedElapsed = 0;
}

if (savedRunning === 'true') {
  running = true;
} else {
  running = false;
}

if (running && savedStart) {
  startTime = parseInt(savedStart);
  storedElapsed = storedElapsed || 0;
  timerInterval = setInterval(updateDisplay, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
} else {
  running = false;
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

updateDisplay();

rateInput.addEventListener('input', () => {
  localStorage.setItem('hourlyRate', rateInput.value);
  updateDisplay();
});

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    storedElapsed = storedElapsed || 0;
    startTime = Date.now();
    localStorage.setItem('timerStart', startTime.toString());
    localStorage.setItem('timerRunning', 'true');
    localStorage.setItem('timerElapsed', storedElapsed.toString());
    timerInterval = setInterval(updateDisplay, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    storedElapsed += Date.now() - startTime;
    localStorage.setItem('timerElapsed', storedElapsed.toString());
    localStorage.setItem('timerRunning', 'false');
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    updateDisplay();
  }
});

resetBtn.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  running = false;
  startTime = 0;
  storedElapsed = 0;
  materialsTotal = 0;
  localStorage.setItem('timerRunning', 'false');
  localStorage.setItem('timerElapsed', '0');
  localStorage.setItem('materialsTotal', '0');
  localStorage.removeItem('timerStart');
  materialInput.value = '';
  startBtn.disabled = false;
  stopBtn.disabled = true;
  updateDisplay();
});

addMaterialBtn.addEventListener('click', () => {
  let newCost = parseFloat(materialInput.value);
  if (!isNaN(newCost) && newCost > 0) {
    materialsTotal += newCost;
    materialsTotal = Math.round(materialsTotal * 100) / 100;
    localStorage.setItem('materialsTotal', materialsTotal.toString());
    materialInput.value = '';
    updateDisplay();
  }
});

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');
  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function updateDisplay() {
  let currentTimeMs;
  if (running) {
    currentTimeMs = storedElapsed + (Date.now() - startTime);
  } else {
    currentTimeMs = storedElapsed;
  }
  timeDisplay.textContent = formatTime(currentTimeMs);
  const rate = parseFloat(rateInput.value) || 0;
  const hours = currentTimeMs / 3600000;
  const workCost = hours * rate;
  workCostDisplay.textContent = workCost.toFixed(2);
  materialsCostDisplay.textContent = materialsTotal.toFixed(2);
  const totalCost = workCost + materialsTotal;
  totalCostDisplay.textContent = totalCost.toFixed(2);
  animateValueChange(timeDisplay);
  animateValueChange(workCostDisplay);
  animateValueChange(materialsCostDisplay);
  animateValueChange(totalCostDisplay);
}

function animateValueChange(element) {
  if (!element) return;
  element.style.opacity = '0.5';
  setTimeout(() => {
    element.style.opacity = '1';
  }, 100);
}
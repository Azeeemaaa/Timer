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
let seconds = 0;
let fixedMaterials = 0;
let isRunning = false;

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;
  return [hrs, mins, secs].map(v => v < 10 ? "0" + v : v).join(":");
}

function calculateWorkAmount() {
  let rate = parseFloat(rateInput.value) || 0;
  let hours = seconds / 3600;
  return rate * hours;
}

function updateDisplay() {
  let workAmount = calculateWorkAmount();
  let total = workAmount + fixedMaterials;

  timeDisplay.textContent = formatTime(seconds);
  amountDisplay.textContent = workAmount.toFixed(2);
  materialCostDisplay.textContent = fixedMaterials.toFixed(2);
  totalDisplay.textContent = total.toFixed(2);
}

function saveState() {
  localStorage.setItem('seconds', seconds);
  localStorage.setItem('rate', rateInput.value);
  localStorage.setItem('materials', fixedMaterials);
  localStorage.setItem('isRunning', isRunning);
}

function loadState() {
  seconds = parseInt(localStorage.getItem('seconds')) || 0;
  rateInput.value = localStorage.getItem('rate') || '';
  fixedMaterials = parseFloat(localStorage.getItem('materials')) || 0;
  isRunning = localStorage.getItem('isRunning') === 'true';

  updateDisplay();

  if (isRunning) {
    startTimer();
  }
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
      saveState();
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

startButton.addEventListener('click', function() {
  isRunning = true;
  startTimer();
  saveState();
});

stopButton.addEventListener('click', function() {
  isRunning = false;
  stopTimer();
  saveState();
});

addMaterialsButton.addEventListener('click', function() {
  let inputMaterials = parseFloat(materialInput.value) || 0;
  fixedMaterials = inputMaterials;
  updateDisplay();
  saveState();
});

resetButton.addEventListener('click', function() {
  stopTimer();
  seconds = 0;
  fixedMaterials = 0;
  rateInput.value = '';
  materialInput.value = '';
  isRunning = false;
  localStorage.clear();
  updateDisplay();
});

window.onload = function() {
  loadState();
};
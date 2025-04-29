let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let addMaterialsButton = document.getElementById('addMaterials');
let timeDisplay = document.getElementById('time');
let amountDisplay = document.getElementById('amount');
let materialInput = document.getElementById('materials');
let materialCostDisplay = document.getElementById('materialCost');
let totalDisplay = document.getElementById('total');
let rateInput = document.getElementById('rate');

let timer;
let seconds = 0;
let fixedMaterials = 0; // зафиксированная стоимость материалов

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;
  return [hrs, mins, secs]
    .map(v => v < 10 ? "0" + v : v)
    .join(":");
}

function calculateWorkAmount() {
  let rate = parseFloat(rateInput.value) || 0;
  let hours = seconds / 3600;
  return rate * hours;
}

function updateDisplay() {
  let workAmount = calculateWorkAmount();
  let total = workAmount + fixedMaterials;

  amountDisplay.textContent = workAmount.toFixed(2);
  materialCostDisplay.textContent = fixedMaterials.toFixed(2);
  totalDisplay.textContent = total.toFixed(2);
}

// Нажатие на кнопку Старт
startButton.addEventListener('click', function() {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      timeDisplay.textContent = formatTime(seconds);
      updateDisplay();
    }, 1000);
  }
});

// Нажатие на кнопку Стоп
stopButton.addEventListener('click', function() {
  clearInterval(timer);
  timer = null;
});

// Нажатие на кнопку Добавить материалы
addMaterialsButton.addEventListener('click', function() {
  let inputMaterials = parseFloat(materialInput.value) || 0;
  fixedMaterials = inputMaterials; // Зафиксировать стоимость материалов
  updateDisplay(); // Пересчитать итог
});

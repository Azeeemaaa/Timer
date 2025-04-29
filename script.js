let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let timeDisplay = document.getElementById('time');
let amountDisplay = document.getElementById('amount');
let materialInput = document.getElementById('materials');
let materialCostDisplay = document.getElementById('materialCost');
let totalDisplay = document.getElementById('total');
let rateInput = document.getElementById('rate');

let timer;
let seconds = 0;

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;
  return [hrs, mins, secs]
    .map(v => v < 10 ? "0" + v : v)
    .join(":");
}

function calculateAmount() {
  let rate = parseFloat(rateInput.value) || 0;
  let hours = seconds / 3600;
  return rate * hours;
}

function calculateTotal() {
  let workAmount = calculateAmount();
  let materials = parseFloat(materialInput.value) || 0;
  return workAmount + materials;
}

startButton.addEventListener('click', function() {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      timeDisplay.textContent = formatTime(seconds);

      let workAmount = calculateAmount();
      let materials = parseFloat(materialInput.value) || 0;
      let total = workAmount + materials;

      amountDisplay.textContent = workAmount.toFixed(2);
      materialCostDisplay.textContent = materials.toFixed(2);
      totalDisplay.textContent = total.toFixed(2);
    }, 1000);
  }
});

stopButton.addEventListener('click', function() {
  clearInterval(timer);
  timer = null;
});

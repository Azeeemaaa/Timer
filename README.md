<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Таймер для расчёта оплаты</title>
</head>
<body>
  <h1>Таймер для расчёта оплаты</h1>

<img src="myphoto.jpg" alt="Моя фотография" style="max-width: 300px; height: auto;">

  <form>
    <label>Почасовая ставка ($):</label>
    <input type="number" id="rate" placeholder="например, 60">
  </form>

  <div>
    <button id="start">Старт</button>
    <button id="stop">Стоп</button>
  </div>

  <p>Прошло времени: <span id="time">00:00:00</span></p>
  <p>Сумма: $<span id="amount">0.00</span></p>

  <script src="script.js"></script>
</body>
</html>

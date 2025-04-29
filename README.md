<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Таймер для расчёта оплаты</title>
</head>
<body>
  <h1>Таймер для расчёта оплаты</h1>

  <!-- Картинка -->
  <img src="myphoto.jpg" alt="Моя фотография" style="max-width: 300px; height: auto; display: block; margin: 20px auto;">

  <!-- Форма -->
  <form>
    <label>Почасовая ставка ($/час):</label><br>
    <input type="number" id="rate" placeholder="например, 60"><br><br>

    <label>Стоимость материалов ($):</label><br>
    <input type="number" id="materials" placeholder="например, 50"><br><br>
  </form>

  <!-- Кнопки -->
  <div>
    <button id="start">Старт</button>
    <button id="stop">Стоп</button>
  </div>

  <!-- Вывод данных -->
  <p>Прошло времени: <span id="time">00:00:00</span></p>
  <p>Сумма за работу: $<span id="amount">0.00</span></p>
  <p>Стоимость материалов: $<span id="materialCost">0.00</span></p>
  <h2>Итоговая сумма: $<span id="total">0.00</span></h2>

  <!-- Скрипт -->
  <script src="script.js"></script>
</body>
</html>

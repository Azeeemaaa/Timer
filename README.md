<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Таймер для расчёта оплаты</title>
</head>
<body>
  <h1>Таймер для расчёта оплаты</h1>
  
  <img src="myphoto.jpg" alt="Моя фотография" style="max-width: 300px; height: auto; display: block; margin: 10px auto;">

  <form>
    <!-- 1. Почасовая ставка -->
    <label>Почасовая ставка ($/час):</label><br>
    <input type="number" id="rate" placeholder="например, 60"><br><br>

    <!-- 2. Кнопки Старт / Стоп / Сброс -->
    <button id="start" type="button">Старт</button>
    <button id="stop" type="button">Стоп</button>
    <button id="reset" type="button">Сброс</button><br><br>

    <!-- 3. Стоимость материалов -->
    <label>Стоимость материалов ($):</label><br>
    <input type="number" id="materials" placeholder="например, 50"><br><br>

    <!-- 4. Кнопка Добавить материалы -->
    <button id="addMaterials" type="button">Добавить стоимость материалов</button>
  </form>

  <p>Прошло времени: <span id="time">00:00:00</span></p>
  <p>Сумма за работу: $<span id="amount">0.00</span></p>
  <p>Стоимость материалов: $<span id="materialCost">0.00</span></p>
  <h2>Итоговая сумма: $<span id="total">0.00</span></h2>

<style>
  /* ... (твои существующие стили) ... */

  /* Добавляем плавную анимацию для цифр */
  span, p, h2 {
    transition: all 0.4s ease-in-out;
  }
</style>

  <script src="script.js"></script>
</body>
</html>
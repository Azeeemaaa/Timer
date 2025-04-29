<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Таймер оплаты</title>
  <link rel="shortcut icon" href="favicon.png" type="image/png">
  <style>
    body {
      background: #fff;
      color: #333;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin: 10px 0;
    }
    .user-photo {
  display: block;
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin: 20px auto;
  background: #f0f0f0;
  border-radius: 0; /* Обязательно убираем округление */
    }
    .input-field, .materials-input {
      margin: 10px 0;
      text-align: left;
    }
    label {
      font-weight: 600;
    }
    input[type="number"] {
      width: 100%;
      padding: 8px;
      margin: 8px 0;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .timer-controls, .materials-input {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }
    button {
      background: #007BFF;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      width: 100%;
      transition: background-color 0.3s ease;
    }
    button:hover {
      background: #0056b3;
    }
    p, h2 {
      text-align: center;
      margin: 5px 0;
      transition: opacity 0.3s ease;
    }
    @media (max-width: 600px) {
      .timer-controls, .materials-input {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

<div class="container">
  <h1>Таймер оплаты</h1>

  <!-- Фото -->
  <img src="myphoto.jpg" alt="Фото пользователя" class="user-photo">

  <!-- Ввод ставки -->
  <div class="input-field">
    <label for="rate">Почасовая ставка ($/час):</label><br>
    <input type="number" id="rate" placeholder="Например, 60">
  </div>

  <!-- Кнопки управления -->
  <div class="timer-controls">
    <button id="startBtn">Старт</button>
    <button id="stopBtn" disabled>Стоп</button>
    <button id="resetBtn">Сброс</button>
  </div>

  <!-- Ввод стоимости материалов -->
  <div class="materials-input">
    <label for="materialCost">Стоимость материалов ($):</label><br>
    <input type="number" id="materialCost" placeholder="Например, 50">
    <button id="addMaterialBtn">Добавить стоимость материалов</button>
  </div>

  <!-- Отображение результата -->
  <div class="output">
    <p>Время: <span id="timeDisplay">00:00:00</span></p>
    <p>Стоимость работы: $<span id="workCost">0.00</span></p>
    <p>Стоимость материалов: $<span id="materialsCost">0.00</span></p>
    <h2>Итого: $<span id="totalCost">0.00</span></h2>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>

const appEl = document.getElementById("appStart");

// Объявляем переменные для хранения загаданного числа, количества попыток, минимального и максимального диапазонов
let secretNumber;
let attempts;
let minRange;
let maxRange;

// Функция для начала игры
const startGame = () => {
  // Получаем значения минимального и максимального диапазонов из элементов ввода и преобразуем их в числа
  minRange = parseInt(document.getElementById("minRange").value, 10);
  maxRange = parseInt(document.getElementById("maxRange").value, 10);

  // Генерируем случайное число в заданном диапазоне и сохраняем его в переменной secretNumber
  secretNumber = generateRandomNumber(minRange, maxRange);

  // Обнуляем счетчик попыток
  attempts = 0;

  // Вызываем функцию для отображения игры
  appGame();
};

// Функция для валидации ввода и обновления стилей
const validateInputAndUpdateStyles = () => {
  // Получаем значения минимального и максимального диапазонов из элементов ввода
  const minInput = document.getElementById("minRange").value;
  const maxInput = document.getElementById("maxRange").value;
  const startButton = document.getElementById("start");

  // Преобразуем введенные значения в числа, обрезаем возможные пробелы
  const minRangeValue = parseInt(minInput.trim(), 10);
  const maxRangeValue = parseInt(maxInput.trim(), 10);

  // Проверяем условия валидации
  if (
    minInput !== "" &&
    maxInput !== "" &&
    minRangeValue < maxRangeValue &&
    minRangeValue > 0 &&
    maxRangeValue > 0
  ) {
    // Если условия выполняются, делаем кнопку активной и обновляем стили
    startButton.disabled = false;
    startButton.classList.remove("button__not-active");
    startButton.classList.add("button");
  } else {
    // Если условия не выполняются, делаем кнопку неактивной и обновляем стили
    startButton.disabled = true;
    startButton.classList.remove("button");
    startButton.classList.add("button__not-active");
  }
};

// Функция для начальной настройки приложения
const appStart = () => {
  // Устанавливаем значения по умолчанию для минимального и максимального диапазонов
  minRange = 1;
  maxRange = 100;

  // Генерируем HTML для начального экрана
  const appHTML = `
        <p>Укажите диапазон</p>
        <div class="game-range">
        <label  for="minRange">От:</label>
        <input type="number" id="minRange" placeholder="1" value="1">
        <label for="maxRange">До:</label>
        <input type="number" id="maxRange" placeholder="1000" value="100">
        <div>
            <button class="button" id="start">Начать игру</button>
        </div>`;
  // Вставляем HTML в элемент с идентификатором "appStart"
  appEl.innerHTML = appHTML;

  // Получаем ссылку на кнопку "Начать игру"
  const startButton = document.getElementById("start");

  // Устанавливаем обработчики событий на изменение значений ввода и клик по кнопке "Начать игру"
  document
    .getElementById("minRange")
    .addEventListener("input", validateInputAndUpdateStyles);
  document
    .getElementById("maxRange")
    .addEventListener("input", validateInputAndUpdateStyles);

  startButton.addEventListener("click", () => {
    // При клике на кнопку "Начать игру" вызываем функцию начала игры
    startGame();
  });
};

// Вызываем функцию начальной настройки приложения
appStart();

// Функция для отображения игры
const appGame = () => {
  // Генерируем HTML для экрана игры
  const appHTML = `<div class="game-reset">
        <button id="reset"><img src="images/icon-reset.png" alt="Начать заново" /></button>
        </div>
        <p id="message">Введите число в диапазоне от ${minRange} до ${maxRange}</p>
        <div class="game-range">
        <label for="userInput">Ваше предположение:</label>
        <input type="number" id="userInput" placeholder="1" required />
        </div>
        
        <button class="button" id="sendGuess">Отправить предположение</button>
        <p id="hint"></p>
        <p>Попытки: <span id="attemptCount">0</span></p>`;
  // Вставляем HTML в элемент с идентификатором "appStart"
  appEl.innerHTML = appHTML;

  // Получаем ссылки на кнопку "Сброс" и кнопку "Отправить предположение"
  const resetButton = document.getElementById("reset");
  const sendGuessButton = document.getElementById("sendGuess");

  // Устанавливаем обработчики событий на клик по кнопке "Сброс" и клик по кнопке "Отправить предположение"
  resetButton.addEventListener("click", () => {
    // При клике на кнопку "Сброс" обнуляем счетчик попыток, сбрасываем загаданное число и вызываем функцию начальной настройки
    attempts = 0;
    secretNumber = null;
    appStart();
  });

  sendGuessButton.addEventListener("click", guessNumber);

  // Устанавливаем обработчик события для поля ввода числа
  document.getElementById("userInput").addEventListener("input", checkNumber);
};

// Функция для сброса игры
const resetGame = () => {
  // Получаем ссылки на элементы сообщения и кнопки "Отправить предположение"
  const messageElement = document.getElementById("message");
  const sendGuessButton = document.getElementById("sendGuess");

  // Устанавливаем текст сообщения и делаем кнопку "Отправить предположение" неактивной
  messageElement.textContent = `Введите число в диапазоне от ${minRange} до ${maxRange}`;
  sendGuessButton.disabled = true;
};

// Функция для генерации случайного числа в заданном диапазоне
const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция для проверки введенного числа
const checkNumber = () => {
  // Получаем введенное пользователем число из поля ввода
  const userInput = parseInt(document.getElementById("userInput").value);
  const messageElement = document.getElementById("message");
  const sendGuessButton = document.getElementById("sendGuess");

  // Проверяем, является ли введенное значение числом и находится ли в заданном диапазоне
  if (isNaN(userInput) || userInput < minRange || userInput > maxRange) {
    // Если не соответствует условиям, выводим сообщение и делаем кнопку "Отправить предположение" неактивной
    messageElement.textContent = `Соблюдайте диапазон от ${minRange} до ${maxRange}`;
    sendGuessButton.disabled = true;
    sendGuessButton.classList.remove("button");
    sendGuessButton.classList.add("button__not-active");
  } else {
    // Если соответствует условиям, делаем кнопку "Отправить предположение" активной и обновляем стили
    sendGuessButton.disabled = false;
    sendGuessButton.classList.remove("button__not-active");
    sendGuessButton.classList.add("button");
    messageElement.textContent = `Введите число в диапазоне от ${minRange} до ${maxRange}`;
  }
};

// Функция для обработки предположения пользователя
const guessNumber = () => {
  // Получаем введенное пользователем число из поля ввода
  const userInput = parseInt(document.getElementById("userInput").value);
  const messageElement = document.getElementById("message");
  const hintElement = document.getElementById("hint");
  const attemptCountElement = document.getElementById("attemptCount");
  const sendGuessButton = document.getElementById("sendGuess");

  // Увеличиваем счетчик попыток
  attempts++;

  // Проверяем, угадал ли пользователь число
  if (userInput === secretNumber) {
    // Если угадал, выводим поздравление и делаем кнопку "Отправить предположение" неактивной
    messageElement.textContent = "Поздравляю! Вы угадали число!";
    messageElement.style.color = "#e1b0e5";
    hintElement.textContent = "";
    sendGuessButton.classList.remove("button");
    sendGuessButton.classList.add("button__not-active");

    // Делаем кнопку "Отправить предположение" неактивной
    sendGuessButton.disabled = true;
  } else {
    // Если не угадал, выводим подсказку и обновляем текст сообщения
    messageElement.textContent = `Число ${userInput} ${
      userInput < secretNumber ? "меньше" : "больше"
    } загаданного`;

    // Выводим подсказку после каждой третьей попытки
    if (attempts % 3 === 0) {
      hintElement.textContent = `Подсказка: загаданное число ${
        secretNumber % 2 === 0 ? "четное" : "нечетное"
      }`;
    } else {
      hintElement.textContent = "";
    }
  }

  // Обновляем отображение счетчика попыток
  attemptCountElement.textContent = attempts;
};

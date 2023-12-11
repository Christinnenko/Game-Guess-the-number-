const appEl = document.getElementById("appStart");

let secretNumber;
let attempts;
let minRange;
let maxRange;

const startGame = () => {
  const startButton = document.getElementById("start");
  minRange = document.getElementById("minRange").value.trim();
  maxRange = document.getElementById("maxRange").value.trim();

  if (
    isNaN(parseInt(minRange)) ||
    isNaN(parseInt(maxRange)) ||
    parseInt(minRange) >= parseInt(maxRange) ||
    minRange === "" ||
    maxRange === ""
  ) {
    startButton.disabled = true;
    startButton.classList.remove("button");
    startButton.classList.add("button__not-active");
  } else {
    startButton.disabled = false;
    startButton.classList.remove("button__not-active");
    startButton.classList.add("button");
  }

  secretNumber = generateRandomNumber(parseInt(minRange), parseInt(maxRange));
  attempts = 0;
  console.log("Загаданное число:", secretNumber);

  appGame();
};

const appStart = () => {
  const appHTML = `
        <p>Укажите диапазон</p>
        <div class="game-range">
        <label  for="minRange">От:</label>
        <input type="number" id="minRange" placeholder="1">
        <label for="maxRange">До:</label>
        <input type="number" id="maxRange" placeholder="1000">
        <div>
            <button class="button" id="start">Начать игру</button>
        </div>`;
  appEl.innerHTML = appHTML;

  const startButton = document.getElementById("start");

  startButton.addEventListener("click", () => {
    startGame();
  });
};

appStart();

const appGame = () => {
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
  appEl.innerHTML = appHTML;

  const resetButton = document.getElementById("reset");
  const sendGuessButton = document.getElementById("sendGuess");

  resetButton.addEventListener("click", () => {
    attempts = 0;
    secretNumber = null;
    appStart();
  });

  sendGuessButton.addEventListener("click", guessNumber);

  // Обработчик события для поля ввода числа
  document.getElementById("userInput").addEventListener("input", checkNumber);
};

const resetGame = () => {
  const messageElement = document.getElementById("message");
  const sendGuessButton = document.getElementById("sendGuess");

  messageElement.textContent = `Введите число в диапазоне от ${minRange} до ${maxRange}`;
  sendGuessButton.disabled = true;
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkNumber = () => {
  const userInput = parseInt(document.getElementById("userInput").value);
  const messageElement = document.getElementById("message");
  const sendGuessButton = document.getElementById("sendGuess");

  if (isNaN(userInput) || userInput < minRange || userInput > maxRange) {
    messageElement.textContent = `Соблюдайте диапазон от ${minRange} до ${maxRange}`;
    sendGuessButton.disabled = true;
    sendGuessButton.classList.remove("button");
    sendGuessButton.classList.add("button__not-active");
  } else {
    sendGuessButton.disabled = false;
    sendGuessButton.classList.remove("button__not-active");
    sendGuessButton.classList.add("button");
    messageElement.textContent = `Введите число в диапазоне от ${minRange} до ${maxRange}`;
  }
};

const guessNumber = () => {
  const userInput = parseInt(document.getElementById("userInput").value);
  const messageElement = document.getElementById("message");
  const hintElement = document.getElementById("hint");
  const attemptCountElement = document.getElementById("attemptCount");
  const sendGuessButton = document.getElementById("sendGuess");

  attempts++;

  if (userInput === secretNumber) {
    messageElement.textContent = "Поздравляю! Вы угадали число!";
    messageElement.style.color = "#e1b0e5";
    hintElement.textContent = "";

    // Делаем кнопку неактивной
    sendGuessButton.disabled = true;
  } else {
    messageElement.textContent = `Число ${userInput} ${
      userInput < secretNumber ? "меньше" : "больше"
    } загаданного`;

    if (attempts % 3 === 0) {
      hintElement.textContent = `Подсказка: загаданное число ${
        secretNumber % 2 === 0 ? "четное" : "нечетное"
      }`;
    } else {
      hintElement.textContent = "";
    }
  }

  // Обновляем отображение счетчика
  attemptCountElement.textContent = attempts;
};

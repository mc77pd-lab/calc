const intro = document.querySelector("#intro");
const calculatorScreen = document.querySelector("#calculatorScreen");
const calculator = document.querySelector("#calculator");
const instructionModal = document.querySelector("#instructionModal");
const warning = document.querySelector("#warning");
const display = document.querySelector("#display");
const startButton = document.querySelector("#startButton");
const understoodButton = document.querySelector("#understoodButton");
const numberKeys = [...document.querySelectorAll("[data-number]")];
const operatorKeys = [...document.querySelectorAll("[data-action='operator']")];
const allKeys = [...document.querySelectorAll(".key")];

let displayValue = "0";
let firstValue = null;
let forcedDivisionMode = false;

function updateDisplay() {
  display.textContent = displayValue;
}

function addNumber(value) {
  if (forcedDivisionMode && value !== "0") {
    return;
  }

  if (value === "." && displayValue.includes(".")) {
    return;
  }

  if (displayValue === "0" && value !== ".") {
    displayValue = value;
  } else {
    displayValue += value;
  }

  updateDisplay();
}

function clearAll() {
  displayValue = "0";
  firstValue = null;
  forcedDivisionMode = false;
  operatorKeys.forEach((key) => key.classList.remove("is-selected"));
  numberKeys.forEach((key) => {
    key.disabled = false;
  });
  updateDisplay();
}

function deleteLast() {
  displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
  updateDisplay();
}

function forceDivision() {
  const currentNumber = displayValue.replace(/\s*÷$/, "");
  firstValue = Number(currentNumber);
  forcedDivisionMode = true;
  displayValue = `${currentNumber} ÷`;
  updateDisplay();

  operatorKeys.forEach((key) => {
    key.classList.toggle("is-selected", key.dataset.operator === "/");
  });

  numberKeys.forEach((key) => {
    key.disabled = key.dataset.number !== "0";
  });
}

function showWarning() {
  calculator.classList.add("is-blurred");
  warning.classList.remove("hidden");
}

startButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  calculatorScreen.classList.remove("hidden");
});

understoodButton.addEventListener("click", () => {
  instructionModal.classList.add("hidden");
  calculator.classList.remove("is-blurred");
});

allKeys.forEach((key) => {
  key.addEventListener("click", () => {
    const number = key.dataset.number;
    const action = key.dataset.action;

    if (number !== undefined) {
      addNumber(number);
      return;
    }

    if (action === "clear") {
      clearAll();
      return;
    }

    if (action === "delete") {
      deleteLast();
      return;
    }

    if (action === "operator") {
      forceDivision();
      return;
    }

    if (action === "equals") {
      showWarning();
    }
  });
});

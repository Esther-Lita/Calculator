const buttons = document.querySelectorAll("button");
let displayedValue = "0";
let firstNumber = null;
let secondNumber = null;
let firstOperator = null;
let secondOperator = null;
let result = "";

function updateDisplay() {
  const displayScreen = document.getElementById("display");
  displayScreen.innerText = displayedValue;
}

updateDisplay();

function clickHandler() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const btnInput = button.value;

      if (button.classList.contains("number")) {
        numberHandler(btnInput);
      } else if (button.classList.contains("operator")) {
        operatorHandler(btnInput);
      } else if (button.classList.contains("decimal")) {
        decimalHandler(btnInput);
      } else if (button.classList.contains("equals")) {
        equalsHandler();
      } else if (button.classList.contains("delete")) {
        deleteHandler(displayedValue);
      } else if (button.classList.contains("clear")) clearHandler();
      updateDisplay();
    });
  });
}

clickHandler();

function numberHandler(btnInput) {
  if (firstNumber === null) {
    if (displayedValue === "0" || displayedValue === 0) {
      displayedValue = btnInput;
    } else if (displayedValue === firstNumber) {
      displayedValue = btnInput;
    } else {
      displayedValue += btnInput;
    }
  } else {
    if (displayedValue === firstNumber) {
      displayedValue = btnInput;
    } else {
      displayedValue += btnInput;
    }
  }
}

function operatorHandler(btnInput) {
  if (firstOperator != null && secondOperator === null) {
    secondOperator = btnInput;
    secondNumber = displayedValue;
    result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
    displayedValue = result;
    firstNumber = displayedValue;
    result = null;
  } else if (firstOperator != null && secondOperator != null) {
    secondNumber = displayedValue;
    result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
    secondOperator = btnInput;
    displayedValue = result;
    firstNumber = displayedValue;
    result = null;
  } else {
    firstOperator = btnInput;
    firstNumber = displayedValue;
  }
}

function decimalHandler(btnInput) {
  if (displayedValue === firstNumber || displayedValue === secondNumber) {
    displayedValue = "0";
    displayedValue += btnInput;
  } else if (!displayedValue.includes(btnInput)) {
    displayedValue += btnInput;
  }
}

function equalsHandler() {
  if (firstOperator === null) {
    displayedValue = displayedValue;
  } else if (secondOperator != null) {
    secondNumber = displayedValue;
    result = operate(Number(firstNumber), Number(secondNumber), secondOperator);
    if (result === "ERROR") {
      displayedValue = "ERROR";
    } else {
      result = roundedDecimal(result);
      displayedValue = result;
      firstNumber = displayedValue;
      secondNumber = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  } else {
    secondNumber = displayedValue;
    result = operate(Number(firstNumber), Number(secondNumber), firstOperator);
    if (result === "ERROR") {
      displayedValue = "ERROR";
    } else {
      result = roundedDecimal(result);
      displayedValue = result;
      firstNumber = displayedValue;
      secondNumber = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  }
  updateDisplay();
}

// function deleteLast(displayedValue) {
//   let deletedValue = Math.floor(displayedValue / 10);
//   displayedValue = deletedValue;
//   updateDisplay(displayedValue);
//   return deletedValue;
// }

function deleteHandler(displayedValue) {
  if (displayedValue.length == 1) {
    clearHandler();
  } else {
    let value = deleteLast(displayedValue);
    displayedValue = value;
  }
}

function clearHandler() {
  displayedValue = "0";
  firstNumber = null;
  secondNumber = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function operate(x, y, operator) {
  if (operator === "+") {
    return x + y;
  } else if (operator === "-") {
    return x - y;
  } else if (operator === "*") {
    return x * y;
  } else if (operator === "/") {
    if (y === 0) {
      return "ERROR";
    } else {
      return x / y;
    }
  }
}

document.addEventListener("keydown", function (event) {
  var name = event.key;
  var code = event.code;

  let numbersPattern = /[0-9]/g;

  if (name.match(numbersPattern)) {
    numberHandler(name);
  } else if (name === ".") {
    decimalHandler(name);
  } else if (name === "/") {
    operatorHandler(name);
  } else if (name === "+") {
    operatorHandler(name);
  } else if (name === "-") {
    operatorHandler(name);
  } else if (name === "*") {
    operatorHandler(name);
  } else if (name === "Enter") {
    equalsHandler(name);
  } else if (code == "Space") {
    clearHandler();
  } else if (name == "Backspace") {
    deleteHandler();
  }
  updateDisplay();
});

function roundedDecimal(result) {
  return (result = result.toFixed(2));
}

// Global Constants and Assets
const operatorsArray = ["-", "÷", "×", "+"];
const bracketsArray = ["(", ")"];
const numbersArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
// Get Buttons
const buttons = document.querySelectorAll(".interface__button");
const operatorButtons = document.querySelectorAll(
  ".interface__button--operator"
);
// Get display
const topDisplayHTML = document.querySelector(".display__input");
const bottomDisplayHTML = document.querySelector(".display__output");
// Get additional button option
const clickForMore = document.querySelector(".additional");
const additionalButtonsContainer = document.querySelector(
  ".additional-buttons"
);
const closeAdditionalButtons = document.querySelector(
  ".close-additional-buttons"
);
const additionalButtons = document.querySelectorAll(
  ".additional-buttons__button"
);

// Functions
// Check Buttons
const checkButtonType = (event) => {
  const value = event.target.innerText;

  if (event.target.classList.contains("interface__button--number")) {
    dealWithNumber(value);
  } else if (event.target.classList.contains("interface__button--clear")) {
    dealWithRemover(value);
  } else if (event.target.classList.contains("interface__button--calculate")) {
    calculate();
  } else if (event.target.classList.contains("interface__button--operator")) {
    dealWithOperator(value);
  }
};

const checkAdditionalButtonType = (event) => {
  const value = event.target.innerText;

  if (value === "Ans") {
    dealWithAns();
  } else if (value === "π") {
    dealWithPi();
  } else if (value === "%") {
    dealWithPercent();
  } else if (value === "(" || value === ")") {
    dealWithBracket(value);
  } else if (value === "√") {
    dealWithRoot();
  }
};

// Deal with different inputs
const dealWithNumber = (number) => {
  if (
    bottomDisplayHTML.innerText !== "0" &&
    !checkContained(topDisplayHTML.innerText, operatorsArray)
  ) {
    operatorButtons.forEach((button) => {
      button.classList.add("alert");
    });
    setTimeout(removeAlert, 250);
  } else if (
    number === "." &&
    checkLastNumberForDecimal(topDisplayHTML.innerText)
  ) {
    return;
  } else {
    appendCharacter(number);
  }
};

const dealWithOperator = (operator) => {
  if (
    !checkContained(topDisplayHTML.innerText, numbersArray) &&
    !checkContained(topDisplayHTML.innerText, operatorsArray)
  ) {
    appendCharacter(operator);
  } else if (
    !checkContained(topDisplayHTML.innerText, operatorsArray) &&
    bottomDisplayHTML.innerText === "0" &&
    !checkContained(topDisplayHTML.innerText, bracketsArray)
  ) {
    bottomDisplayHTML.innerText = topDisplayHTML.innerText;
    topDisplayHTML.innerText = `${operator}`;
  } else if (
    checkContained(topDisplayHTML.innerText, bracketsArray) &&
    !checkBracketsClosed()
  ) {
    appendCharacter(operator);
  } else if (checkContained(topDisplayHTML.innerText, operatorsArray)) {
    calculate();
    appendCharacter(operator);
  } else {
    alert("new condition - fix bug");
  }
};

const dealWithRemover = (remover) => {
  if (remover === "C") {
    clear();
  } else if (remover === "D") {
    deleteLastItem();
  }
};

const dealWithAns = () => {
  if (
    checkContained(
      topDisplayHTML.innerText.charAt(topDisplayHTML.length - 1),
      operatorsArray
    )
  ) {
    appendCharacter(bottomDisplayHTML.innerText);
  } else {
    return;
  }
};

const dealWithPi = () => {
  const pi = `${Math.PI}`;
  appendCharacter(pi);
};
const dealWithPercent = () => {
  let currentNumber = "";
  let equation = topDisplayHTML.innerText;

  if (equation.length === 0) {
    return;
  }

  for (let i = equation.length - 1; i >= 0; i--) {
    if (operatorsArray.includes(`${equation.charAt(i)}`)) {
      break;
    } else {
      currentNumber = equation.charAt(i) + currentNumber;
    }
  }

  topDisplayHTML.innerText = topDisplayHTML.innerText.substring(
    0,
    topDisplayHTML.innerText.length - currentNumber.length
  );
  currentNumber = currentNumber * 0.01;
  appendCharacter(`${currentNumber}`);
};

const dealWithRoot = () => {
  const root = "sqrt(";
  appendCharacter(root);
};

const dealWithBracket = (bracket) => {
  if (
    operatorsArray.includes(
      topDisplayHTML.innerText.charAt(topDisplayHTML.innerText.length - 1)
    ) &&
    bracket === ")"
  ) {
    return;
  } else {
    appendCharacter(bracket);
  }
};

// Calculation Function
const calculateSqrt = (equation) => {
  let sqrtLocation = [];
  sqrtLocation.push(equation.indexOf("sqrt"));
  sqrtLocation.push(sqrtLocation[0] + 3);
  sqrtLocation.push(sqrtLocation[1] + 1);

  let endIndex = sqrtLocation[2];

  for (let i = sqrtLocation[2]; i < equation.length; i++) {
    if (!isNaN(Number(equation.charAt(i))) || equation.charAt(i) === ".") {
      endIndex = i;
    } else {
      break;
    }
  }

  sqrtLocation.push(endIndex);
  const numberToRoot = Number(
    equation.substring(sqrtLocation[2], sqrtLocation[3] + 1)
  );

  let newDisplay =
    equation.substring(0, sqrtLocation[0]) +
    `${Math.sqrt(numberToRoot)}` +
    equation.substring(sqrtLocation[3] + 1);
  return newDisplay;
};

const calculateInsideBrackets = (equation) => {
  let equationArray = [...equation];

  for (let i = 1; i < equationArray.length; i++) {
    if (equationArray[i - 1] === "(" && equationArray[i] === ")") {
      equationArray.splice(i - 1, 2);
    }
  }

  const complexOperator = (operator) => {
    while (equationArray.includes(operator)) {
      let opperand = [];
      opperand.push(equationArray.indexOf(operator));
      for (let i = opperand[0] - 1; i >= 0; i--) {
        if (/[^0-9.]/.test(equationArray[i])) {
          opperand.push(i + 1);
          opperand.push(opperand[0] - 1);
          opperand.push(opperand[0] + 1);
          break;
        }
      }
      for (let i = opperand[3]; i < equationArray.length; i++) {
        if (!/\d/.test(equationArray[i]) && equationArray[i] !== ".") {
          opperand.push(i - 1);
          break;
        }
      }

      let opperand1 = equationArray
        .slice(opperand[1], opperand[2] + 1)
        .join("");
      let opperand2 = equationArray
        .slice(opperand[3], opperand[4] + 1)
        .join("");

      opperand1 = Number(opperand1);
      opperand2 = Number(opperand2);

      equationArray.splice(
        opperand[1],
        opperand[4] - opperand[1] + 1,
        basicOperator(operator, opperand1, opperand2)
      );
    }
  };

  complexOperator("÷");
  complexOperator("×");
  complexOperator("+");
  complexOperator("-");

  if (
    equationArray[0] === "(" &&
    equationArray[equationArray.length - 1] === ")"
  ) {
    equationArray.shift();
    equationArray.pop();
  }

  equation = equationArray.join("");
  return equation;
};

const calculate = () => {
  if (
    (bottomDisplayHTML.innerText === "0" &&
      topDisplayHTML.innerText !== "" &&
      !checkContained(topDisplayHTML.innerText, operatorsArray) &&
      !topDisplayHTML.innerText.includes("sqrt")) ||
    !checkBracketsClosed()
  ) {
    return;
  }

  while (checkContained(topDisplayHTML.innerText, bracketsArray)) {
    const smallestNest = checkNestLocation(topDisplayHTML.innerText);
    const stringToPass = topDisplayHTML.innerText.substring(
      smallestNest[0],
      smallestNest[1] + 1
    );
    topDisplayHTML.innerText =
      topDisplayHTML.innerText.substring(0, smallestNest[0]) +
      calculateInsideBrackets(stringToPass) +
      topDisplayHTML.innerText.substring(
        smallestNest[1] + 1,
        topDisplayHTML.length
      );
  }

  if (topDisplayHTML.innerText.includes("sqrt")) {
    topDisplayHTML.innerText = calculateSqrt(topDisplayHTML.innerText);
  }

  if (!checkContained(topDisplayHTML.innerText, operatorsArray)) {
    return;
  }

  bottomDisplayHTML.innerText = basicOperator(
    checkOperator(topDisplayHTML.innerText),
    Number(bottomDisplayHTML.innerText),
    Number(topDisplayHTML.innerText.substring(1))
  );
  topDisplayHTML.innerText = "";
};

// Check functions
const checkNestLocation = (equation) => {
  let nestArray = [];
  nestArray.push(equation.indexOf(")"));
  for (let i = nestArray[0] - 1; i >= 0; i--) {
    if (equation.charAt(i) === "(") {
      nestArray.unshift(i);
      break;
    }
  }
  return nestArray;
};

const checkContained = (string, arrayOfSubstrings, countMax) => {
  countMax = countMax || 0;
  let operatorCount = 0;
  for (let i = 0; i < arrayOfSubstrings.length; i++) {
    if (string.includes(`${arrayOfSubstrings[i]}`)) {
      operatorCount++;
    }
  }

  if (operatorCount > countMax) {
    return true;
  } else {
    return false;
  }
};

const checkLastNumberForDecimal = (equation) => {
  let decimalCount = 0;
  let currentNumber = "";
  let breakCommand = "";

  for (let i = equation.length - 1; i >= 0; i--) {
    if (operatorsArray.includes(`${equation.charAt(i)}`)) {
      break;
    } else {
      currentNumber = equation.charAt(i) + currentNumber;
    }
  }
  return currentNumber.includes(".");
};

const checkBracketsClosed = () => {
  equation = topDisplayHTML.innerText;
  bracketCount = 0;
  for (let i = 0; i < equation.length; i++) {
    if (equation.charAt(i) === "(") {
      bracketCount++;
    } else if (equation.charAt(i) === ")") {
      bracketCount--;
    }
  }
  if (bracketCount === 0) {
    return true;
  } else {
    return false;
  }
};

const checkOperator = (equation) => {
  let toReturn;
  operatorsArray.forEach((operator) => {
    if (equation.includes(operator)) {
      toReturn = operator;
    }
  });
  return toReturn;
};

// Class-change Functions
const removeAlert = () => {
  operatorButtons.forEach((button) => {
    button.classList.remove("alert");
  });
};

const showAdditionalButtons = () => {
  additionalButtonsContainer.classList.add("show-additional-buttons");
  clickForMore.classList.add("hide-additional");
};

const hideAdditionalButtons = () => {
  additionalButtonsContainer.classList.remove("show-additional-buttons");
  clickForMore.classList.remove("hide-additional");
};

// Basic Functions
const appendCharacter = (character) => (topDisplayHTML.innerText += character);

const clear = () => {
  topDisplayHTML.innerText = "";
  bottomDisplayHTML.innerText = "0";
};

const deleteLastItem = () =>
  (topDisplayHTML.innerText = topDisplayHTML.innerText.substring(
    0,
    topDisplayHTML.innerHTML.length - 1
  ));

const basicOperator = (operator, term1, term2) => {
  switch (operator) {
    case "-":
      return term1 - term2;
    case "÷":
      return term1 / term2;
    case "×":
      return term1 * term2;
    case "+":
      return term1 + term2;
  }
};
// Logic
buttons.forEach((button) => {
  button.addEventListener("click", checkButtonType);
});

additionalButtons.forEach((button) => {
  button.addEventListener("click", checkAdditionalButtonType);
});

clickForMore.addEventListener("click", showAdditionalButtons);
closeAdditionalButtons.addEventListener("click", hideAdditionalButtons);

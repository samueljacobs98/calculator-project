// Global Constants and Assets
const operatorsArray = ["-", "÷", "×", "+"]
    // Get Buttons
const buttons = document.querySelectorAll(".interface__button")
const operatorButtons = document.querySelectorAll(".interface__button--operator")
    // Get display
const topDisplayHTML = document.querySelector(".display__input")
const bottomDisplayHTML = document.querySelector(".display__output")

// Functions
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
}

const appendCharacter = (character) => {
     topDisplayHTML.innerText += character;
}

const dealWithNumber = (number) => {
    if (bottomDisplayHTML.innerText !== "0" && !containsOperator(topDisplayHTML.innerText, operatorsArray)) {
        operatorButtons.forEach((button) => {
            button.classList.add("alert")
        });
        setTimeout(removeAlert, 250)
    } else if(number === "." && checkLastNumberForDecimal(topDisplayHTML.innerText)){
        return;
    } else {
        appendCharacter(number)
    }
}

const dealWithOperator = (operator) => {
    if (topDisplayHTML.innerText === "") {
        appendCharacter(operator)
    } else if (!containsOperator(topDisplayHTML.innerText, operatorsArray) && 
    bottomDisplayHTML.innerText === "0") {
        bottomDisplayHTML.innerText = topDisplayHTML.innerText
        topDisplayHTML.innerText = `${operator}`
    } else if (containsOperator(topDisplayHTML.innerText, operatorsArray)) {
        calculate()
        appendCharacter(operator)
    }
}

const dealWithRemover = (remover) => {

    if (remover === "C") {
        clear()
    } else if (remover === "D") {
        deleteLastItem()
    }
}

const clear = () => {
    topDisplayHTML.innerText = ""
    bottomDisplayHTML.innerText = "0"
}

const deleteLastItem = () => {
    topDisplayHTML.innerText = topDisplayHTML.innerText.substring(0, topDisplayHTML.innerHTML.length - 1);
}

const calculate = () => {
    if (bottomDisplayHTML.innerText === "0" &&
    topDisplayHTML.innerText !== "" &&
    !containsOperator(topDisplayHTML.innerText, operatorsArray)) {
        return
    }

    let solution = 0;
    let stringOperator = topDisplayHTML.innerText.charAt(0);
    operand1 = Number(bottomDisplayHTML.innerText)
    operand2 = Number(topDisplayHTML.innerText.substring(1))

    switch(stringOperator) {
        case "-":
            solution = operand1 - operand2;
            break
        case "÷":
            solution = operand1 / operand2;
            break
        case "×":
            solution = operand1 * operand2;
            break
        case "+":
            solution = operand1 + operand2;
            break
    }
    
    topDisplayHTML.innerText = "";
    bottomDisplayHTML.innerText = solution.toString();
}

const containsOperator = (string, arrayOfSubstrings, countMax) => {
    countMax = countMax || 0;
    let operatorCount = 0;
    for (let i = 0; i < arrayOfSubstrings.length; i++) {
        if (string.includes(`${arrayOfSubstrings[i]}`)) {
            operatorCount++    
        }
    }

    if (operatorCount > countMax) {
        return true
    } else {
        return false
    }
}

const removeAlert = () => {
    operatorButtons.forEach((button) => {
        button.classList.remove("alert")
    })
}

const checkLastNumberForDecimal = (equation) => {
    let decimalCount = 0;
    let currentNumber = ""
    let breakCommand = ""
    
    for (let i = equation.length-1; i >= 0; i--) {
        if (operatorsArray.includes(`${equation.charAt(i)}`)) {
            break
        } else {
            currentNumber = equation.charAt(i) + currentNumber
        }
    }
    return currentNumber.includes('.')
}

// Logic
buttons.forEach(button => {
    button.addEventListener("click", checkButtonType)
})


const operatorsArray = ["-", "÷", "×", "+"]

// Get Buttons
const buttons = document.querySelectorAll(".interface__button")

// Get display
const topDisplayHTML = document.querySelector(".display__input")
const bottomDisplayHTML = document.querySelector(".display__output")

// Functions
// Check Button Type - number, operator, remover, calculate
const checkButtonType = (event) => {
    // console.log(event.target)
    // console.log(event.target.innerText)
    // console.log(typeof event.target.innerText)

    const value = event.target.innerText;

    // If event.target.classList.contains "interface__button--number"
        // call dealWithNumber(value)
    // If event.target.classList.contains "interface__button--clear"
        // call dealWithRemover(value)

    if (event.target.classList.contains("interface__button--number")) {
        dealWithNumber(value);
    } else if (event.target.classList.contains("interface__button--clear")) {
        dealWithRemover(value);
    }
    // If event.target.classList.contains "interface__button--calculate"
        // call calculate()
    // If event.target.classList.contains "interface__button--operator"
        // call dealWithOperator(value)
}

const appendCharacter = (input) => {
     topDisplayHTML.innerText += input;
}

const dealWithNumber = (number) => {
    appendCharacter(number)
}

const dealWithOperator = (operator) => {
    // appendCharacter(operator)
    // Switch (operator)
    // case "-"
}

const dealWithRemover = (remover) => {
    // console.log(remover)
    // If remover === "C"
        // call clear()
    // If remover === "D"
        // call deleteLastNumber()
    if (remover === "C") {
        clear()
    } else if (remover === "D") {
        deleteLastItem()
    }
}

const clear = () => {
    topDisplayHTML.innerText = ""
    bottomDisplayHTML.innerText = ""
}

const deleteLastItem = () => {
    topDisplayHTML.innerText = topDisplayHTML.innerText.substring(0, topDisplayHTML.innerHTML.length - 1);
}

// Logic
buttons.forEach(button => {
    button.addEventListener("click", checkButtonType)
})


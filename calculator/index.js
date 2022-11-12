const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operation");
const equalButton = document.querySelector("[data-equal");
const allClearButton = document.querySelector("[data-all-clear");
const deleteButton = document.querySelector("[data-delete");
const currentTextContant = document.querySelector("[data-cureent-operand");
const previousTextContant = document.querySelector("[data-previous-operand");

class Calculator {
  constructor(pText, cText) {
    this.previousOperand = pText;
    this.currentOperand = cText;
    this.clear();
    // console.log(this.currentOperand)
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
      console.log("compute");
      console.log("choose");
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const cureent = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(cureent)) return;
    console.log(this.operation);
    switch (this.operation) {
      case "+":
        computation = prev + cureent;
        // console.log(this.computation);
        // console.log(this.previousOperand);
        // return computation;
        break
      case "-":
        computation = prev - cureent;
        break;
      case "/":
        computation = prev / cureent;
        break;
      case "*":
        computation = prev * cureent;
        break;
    }
    console.log(computation);
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
    console.log(this.currentOperand);
  }
  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDisits = parseFloat(stringNumber.split(".")[0]);
    const decimalDisits = stringNumber.split(".")[1];
    let integerDisplay;
    if(isNaN(integerDisits)){
      integerDisplay = "";
    } else {
      integerDisplay = integerDisits.toLocaleString("en",{maximumFractionDigits: 0});
    }
    if(decimalDisits != null){
      return `${integerDisplay}.${decimalDisits}`
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    currentTextContant.innerHTML = this.getDisplayNumber(this.currentOperand);
    if(this.operation !== undefined){
      previousTextContant.innerHTML = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      previousTextContant.innerHTML = "";
    }
  }
}

const calculator = new Calculator(previousTextContant, currentTextContant);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// let currentDisplay = "";
// document.querySelector("#display").value = currentDisplay;
class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {

    }

    appendNumber(number) {
        console.log("current " + this.currentOperand);
        if (number === "." && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    operationClick(operation) {
        if (this.operation === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;

        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }
    updateDisplay() {

        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
        console.log("Update 2: " + this.currentOperand);


    }
}


const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector(`[data-delete]`);
const clearButton = document.querySelector(`[data-clear]`);
const previousOperandText = document.querySelector(`[data-previousOperand]`);
const currentOperandText = document.querySelector(`[data-currentOperand]`);

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        console.log(button.textContent);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationClick(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    console.log("equal click");
    calculator.compute();
    calculator.updateDisplay();
})

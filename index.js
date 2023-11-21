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
        this.currentOperand = this.currentOperand.toString().slice(0, -1);

    }

    appendNumber(number) {
        console.log("current " + this.currentOperand);
        if (number === "." && this.currentOperand.toString().includes('.')) {
            return;
        }

        //console.log(this.currentOperand.split(""));
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    operationClick(operation) {
        if (this.operation === '' || this.currentOperand === '') return;
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
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;

        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    specialCase() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = current / 100;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        let text = this.currentOperand.toString();
        console.log(text);

        let other = "0000komal".replace(/^0+/, "");
        console.log("checking : ", other);
        this.currentOperandText.innerText = this.currentOperand.toString().replace(/^0+/, "");

        console.log(this.previousOperand);
        //this.previousOperandText.innerText = this.previousOperand;
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.previousOperand.toString().replace(/^0+/, "")} ${this.operation}`;
        }
        else {
            this.previousOperandText.innerText = '';
        }

        console.log("Update 2: " + this.currentOperand);


    }
}


const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector(`[data-delete]`);
const clearButton = document.querySelector(`[data-all-clear]`);
const previousOperandText = document.querySelector(`[data-previousOperand]`);
const currentOperandText = document.querySelector(`[data-currentOperand]`);

const calculator = new Calculator(previousOperandText, currentOperandText);

const special = document.getElementById("specialCase");

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

clearButton.addEventListener('click', button => {
    console.log("equal click");
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    console.log("equal click");
    calculator.delete();
    calculator.updateDisplay();
})

special.addEventListener('click', button => {
    console.log("equal click");
    calculator.specialCase();
    calculator.updateDisplay();
})
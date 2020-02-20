class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = undefined;
    }
    delete() {
        if (this.currentValue === '0') return;
        this.currentValue = this.currentValue.toString().substring(0, this.currentValue.length - 1);
    }
    appendNumber(number) {
        if(number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    }
    compute() {
        let result;
        const prev = parseFloat(this.previousValue);
        const curr = parseFloat(this.currentValue);

        if(isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '÷':
                result = prev / curr;
                break
            case 'x':
                result = prev * curr;
                break
            case '+': 
                result = prev + curr;
                break
            case '-':
                result = prev - curr;
                break
            default:
                return
        }
        this.currentValue = result;
        this.operation = undefined;
        this.previousValue = '';
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
        const floatNumber = parseFloat(number);
        if(isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentValue);
        this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousValue);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`;
        }
    }
};

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allclear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
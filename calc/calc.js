// Add functionality to the calculator
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.grid-item');

let currentValue = '0';
let operator = null;
let previousValue = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        handleInput(value);
    });
});

function handleInput(value) {
    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperator(value);
            break;
        default:
            inputNumber(value);
            break;
    }
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    operator = null;
    previousValue = null;
}

function calculate() {
    if (operator && previousValue !== null) {
        const current = parseFloat(currentValue);
        const previous = parseFloat(previousValue);
        let result;

        switch (operator) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '/':
                result = current !== 0 ? previous / current : 'Error';
                break;
            default:
                return;
        }

        currentValue = result.toString();
        operator = null;
        previousValue = null;
    }
}

function setOperator(op) {
    if (operator && previousValue !== null) {
        calculate();
    }
    operator = op;
    previousValue = currentValue;
    currentValue = '0';
}

function inputNumber(num) {
    if (currentValue === '0') {
        currentValue = num;
    } else {
        currentValue += num;
    }
}

function updateDisplay() {
    display.textContent = currentValue;
}

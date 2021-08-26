const calculator = {
  displayValue: '',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  sci: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else{
    calculator.displayValue = displayValue === '' ? digit : displayValue + digit;
  }

  console.log(calculator);
}

function inputDecimal(dot) {

  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function inputPi(){
  const { displayValue, waitingForSecondOperand, firstOperand } = calculator;
  if(calculator.displayValue === '' && calculator.firstOperand === null){
    calculator.displayValue = `${parseFloat(Math.PI.toFixed(7))}`
  }

  if (calculator.waitingForSecondOperand === true && calculator.displayValue == '') {
    calculator.displayValue = `${Math.PI}`
    calculator.waitingForSecondOperand = false;
    return;
  }
}


function handleOperator(nextOperator) {
  const {firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue);

  if(operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function handleSci(newOperator) {
  const {displayValue, sci} = calculator;

  console.log(displayValue);

  const inputValue = parseFloat(displayValue);
    calculator.waitingForSecondOperand = true;

    const answer = solve(inputValue, newOperator);
    calculator.displayValue = `${parseFloat(answer.toFixed(7))}`;
    calculator.firstOperand = answer;
  

  console.log(calculator);
}

function solve(inputValue, sci){
  if (sci == 'x^2'){
    return inputValue*inputValue;
  } else if (sci == 'root'){
    return Math.sqrt(inputValue);
  } else if (sci == 'negative'){
    return -1*inputValue;
  } else if (sci == 'sin'){
    return Math.sin(inputValue);
  } else if (sci == 'cos'){
    return Math.cos(inputValue);
  } else if (sci == 'tan'){
    return Math.tan(inputValue);
  } else if (sci == 'log'){
    return Math.log10(inputValue);
  } else if (sci == 'x!'){
    return factorialize(inputValue);
  } else if (sci == '%'){
    return inputValue/100;
  }
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/'){
    return firstOperand / secondOperand;
  }
  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.sci = null;
  console.log(calculator);
}

function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {

  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case 'root':
    case 'x^2':
    case 'negative':
    case 'sin':
    case 'cos':
    case 'tan':
    case 'log':
    case 'x!':
    case '%':
      handleSci(value);
      break;
    case 'pi':
      inputPi();
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    default:
      if(Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }

  }
  updateDisplay();

});





document.getElementById('toggle').style.visibility = 'hidden';    
var hidden = false;
function action() {
    if(hidden) {
        document.getElementById('toggle').style.visibility = 'hidden';
    } else {
        document.getElementById('toggle').style.visibility = 'visible';
    }
    hidden = !hidden;
} 

function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}
factorialize(5);
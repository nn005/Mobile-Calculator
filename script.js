/*Const that consist of variables that are used for the calculator. displayValue is set to empty as it is what is displayed on
the screen of the calculator. Firstoperand is null as it is the first part of the calculator operation. Waitingforsecondoperand indicates
whether the calculator is waiting for a second number to be inputted. Operator represents the operation between the two inputted values.
Sci indicates the scientificate operation to be used.*/
const calculator = {
  displayValue: '',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  sci: null,
};

/* Takes in digit when number button clicked. Const takes values from calculator object. Uses them to determine whther to add
another digit to the calculator screen or to replace the previous one with the one that has just been clicked*/

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

/* Function adds decimal to the display value dependent on whether there already is one or if it is the first or second operand*/
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

/* Function inputs the bumber pi when its button is clicked. Takes in values from the calculator object. Inputs the number pi
only if there is already no other number that has previously been inputted in the display value.*/
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

/* This function is called when an operation button is clicked. Takes in values from the calculator object */
function handleOperator(nextOperator) {
  const {firstOperand, displayValue, operator } = calculator;

  //converts the display value into a float
  const inputValue = parseFloat(displayValue);

  //Allows the operator to change if two different ones are clicked
  if(operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  //Stes first operand to the display value if the displayvalue is a number and the firstoperand is still null
  if (firstOperand === null && !isNaN(inputValue)){
    calculator.firstOperand = inputValue;
  } 
  //In all other cases, this takes values from teh calculator object and calls the calculator function to take them
  // and receives the updated result. It then sets the displayValue to the result to display the answer and sets the result to first
  // operand if more calculations wish to be carried out with that result.
  else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

//Takes im values from calculator object
function handleSci(newOperator) {
  const {displayValue, sci} = calculator;

  console.log(displayValue);
  // Converts value in display to float and pases it to solve function with the inputted sci function value and
  // receives the answer of that upon which it is displayed and set to the first operand if more calculations wuish
  // to be carried out with that answer
  const inputValue = parseFloat(displayValue);
    calculator.waitingForSecondOperand = true;

    const answer = solve(inputValue, newOperator);
    calculator.displayValue = `${parseFloat(answer.toFixed(7))}`;
    calculator.firstOperand = answer;
  

  console.log(calculator);
}

//Solve function which uses math operations dependent on input and returns the result of the calculation
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

//Calculate function which uses basic calculation operations dependent on input and returns the result of the calculation
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

//resets values of the calculator object to what they were at the start when called
function resetCalculator() {
  calculator.displayValue = '';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  calculator.sci = null;
  console.log(calculator);
}

//Updates display of calculator when called. Display is set to element with calculator-screen class and
//the value of the display is set to the value in the calculator object
function updateDisplay() {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();

/* Declaring constant of keys for all buttons and adding a listener to listen for clicks. Then, using a switch,
depending on which value the clicked button has, its value is passed into a function. Display is updated at the end. */

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



/*Sets visibility of sci function buttons depending on whether the sci button is clicked. action() function called on click of
sci button in html and switches the visibility dependent on whther the variable hidden is true or false, then switches it ath the end
to be ready for the next click.*/

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

/* factorialize function used to return value in the solve() function above when the x! button is cilcked. Uses for loop and
if conditions to factorialize the inputted variable dependent on its value. */
function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);
let lastInputIsOperator = false;
let lastOperator = null;
let decimalAdded = false;
arr.forEach((button) => {
  button.addEventListener('click', (e) => {
    const currentInput = e.target.innerHTML;
    if (currentInput === '.') {
      // If a decimal point is already added, don't allow another one
      if (decimalAdded) {
        return;
      }
      decimalAdded = true;
    }
    if (isOperator(currentInput)) {
        decimalAdded = false;
    }
    if (currentInput === '=') {
      if (!lastInputIsOperator) {
        string = eval(string);
        input.value = string;
      }
    } else if (currentInput === 'AC') {
      string = "";
      input.value = string;
      lastInputIsOperator = false;
      decimalAdded = false;
      lastOperator = null;
    } else if (currentInput === 'DEL') {
      if(string[string.length - 1] ==='.'){
          decimalAdded = false;
      }
      string = string.substring(0, string.length - 1);
      input.value = string;
      lastInputIsOperator = isOperator(string[string.length - 1]);
      lastOperator = null;
    } else {
      if (lastInputIsOperator && isOperator(currentInput)){
        // Do not add consecutive operators or start with an operator
        lastOperator = currentInput;
        if (string.length - 1 >= 0) {
          string = string.substring(0,string.length-1) + currentInput;
          decimalAdded = false;
        }
      }
      else if(string === "" && isOperator(currentInput)){
        return ;
      }
      else {
        string += currentInput;
        lastOperator = null;
      }
      
      input.value = string;
      lastInputIsOperator = isOperator(currentInput);
    }
  });
});
function isOperator(value) {
  // Define the list of operators
  const operators = ['+', '-', '*', '/', '%'];
  return operators.includes(value);
}
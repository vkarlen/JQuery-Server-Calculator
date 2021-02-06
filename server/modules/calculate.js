const equationList = [];

function doCalculation(equation) {
  console.log('in doCalculation');
  const firstNum = Number(equation.num1);
  const secondNum = Number(equation.num2);
  // do calculation and add answer
  if (equation.operator === '+') {
    equation.answer = firstNum + secondNum;
  } else if (equation.operator === '-') {
    equation.answer = firstNum - secondNum;
  } else if (equation.operator === '*') {
    equation.answer = firstNum * secondNum;
  } else if (equation.operator === '/') {
    equation.answer = firstNum / secondNum;
  }

  // add to equation list
  equationList.push(equation);

  console.log(equationList);

  return 'OK';
} // end doCalculation

function clearHistory() {
  equationList = [];
  return 'OK';
}

module.exports = { equationList, doCalculation, clearHistory };

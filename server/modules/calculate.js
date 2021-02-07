let equationList = [];
let index = 0;

function doCalculation(equation) {
  //console.log('in doCalculation');
  const firstNum = Number(equation.num1);
  const secondNum = Number(equation.num2);
  // do calculation and add answer
  if (equation.operator === '+') {
    equation.answer = firstNum + secondNum;
  } else if (equation.operator === '-') {
    equation.answer = firstNum - secondNum;
  } else if (equation.operator === 'x') {
    equation.answer = firstNum * secondNum;
  } else if (equation.operator === '/') {
    equation.answer = firstNum / secondNum;
  }

  equation.index = index;
  index++;
  // add to equation list
  equationList.push(equation);

  console.log(equationList);

  return 'OK';
} // end doCalculation

function clearHistory() {
  //console.log('calculate.js clearHistory');
  equationList.length = 0;

  index = 0;
  //console.log(equationList);
  return 'OK';
}

module.exports = { equationList, doCalculation, clearHistory };

const equationList = [];

function doCalculation(equation) {
  console.log('in doCalculation');

  // do calculation and add answer

  // add to equation list
  equationList.push(equation);

  console.log(equationList);

  return 'OK';
}

module.exports = { equationList, doCalculation };

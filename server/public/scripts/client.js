console.log('JS');

$(document).ready(onReady);

let operator = '';

function onReady() {
  console.log('JQ');

  // create button calls
  $('.operator').on('click', changeOperator);
  $('#calcForm').on('submit', doCalculation);
}

function changeOperator() {
  console.log('in changeOp', this.value);
  operator = this.value;
}

function doCalculation(event) {
  event.preventDefault();
  console.log('in doCalc', operator);
}

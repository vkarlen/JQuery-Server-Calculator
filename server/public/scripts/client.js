$(document).ready(onReady);

let operator = '';

function onReady() {
  // create button calls
  $('.operator').on('click', changeOperator);
  $('#calcForm').on('submit', sendEquation);
  $('#clear').on('click', clearCalculator);
} // end onReady

function changeOperator() {
  console.log('in changeOp', this.value);
  operator = this.value;
} // end changeOperator

function sendEquation(event) {
  event.preventDefault();
  console.log('in sendEq');

  //make sure an operator is selected
  // || $('#num1').val('') || $('#num2').val('')
  if (!operator) {
    console.log('Missing inputs!');
  } else {
    console.log('we are good to go');
    // create new equation object
    const newEquation = {
      num1: Number($('#num1').val()),
      num2: Number($('#num2').val()),
      operator: operator,
    };
    console.log(newEquation);
    // send it to the server
    $.ajax({
      method: 'POST',
      url: '/calculate',
      data: {
        equation_sent: newEquation,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });

    //clear inputs
    clearCalculator();
  }
} // end sendEquation

function clearCalculator() {
  $('#num1').val('');
  $('#num2').val('');
  operator = '';
} // end clearCalc

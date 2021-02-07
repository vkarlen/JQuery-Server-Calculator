$(document).ready(onReady);

let operator = '';
let currentNum = '';
let firstNum = '';

function onReady() {
  // create button calls
  $('.operator').on('click', changeOperator);
  $('.number').on('click', grabNumber);
  $('#calcForm').on('submit', sendEquation);
  $('#clear').on('click', clearCalculator);
  //$('#clearHistory').on('click', clearHistory);

  updateDOM();
} // end onReady

function changeOperator() {
  //console.log('in changeOp', this.value);

  if (operator) {
    alert('Sorry we can only do two numbers!');
  } else {
    // reset operator to the one clicked
    operator = this.value;

    // store first number and start a new number
    firstNum = currentNum;
    currentNum = '';
    updateInput();
  }
} // end changeOperator

function grabNumber() {
  //console.log('in grabNumber', this.value);

  // concatinate the number
  currentNum += this.value;

  updateInput();
  //console.log(currNumber);
} // end grabNumber

function updateInput() {
  $('#calcScreen').empty();
  $('#calcScreen').append(`${firstNum} ${operator} ${currentNum}`);
}

function sendEquation(event) {
  event.preventDefault();
  //console.log('in sendEq');

  //make sure all inputs are filled
  if (!operator || !firstNum || !currentNum) {
    alert('Missing inputs! Please try again');
  } else {
    // console.log('we are good to go');

    // create new equation object
    const newEquation = {
      num1: Number(firstNum),
      num2: Number(currentNum),
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
        //console.log(response);

        //clear inputs & update DOM
        clearCalculator();
        updateDOM();
      })
      .catch(function (err) {
        console.log(err);
      });
  }
} // end sendEquation

function clearCalculator() {
  currentNum = '';
  firstNum = '';
  operator = '';

  updateInput();
} // end clearCalc

function updateDOM() {
  // empty DOMs
  $('#historyList').empty();
  $('#calcScreen').empty();

  // GET equation list back from server
  $.ajax({
    method: 'GET',
    url: '/calculate',
  })
    .then(function (history) {
      //console.log('response', history);

      // Post last answer in #answer
      // skip if there is no data to display yet
      if (history.length) {
        let lastEquation = history[history.length - 1];
        $('#calcScreen').append(lastEquation.answer);

        // loop through array and append history to list
        for (const equation of history) {
          $('#historyList').append(`
        <li>${equation.num1} ${equation.operator} ${equation.num2} = ${equation.answer}</li>
        `);
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
} // end updateDOM

function clearHistory() {
  console.log('in clear history');

  // $.ajax({
  //   url: '/calculate',
  //   type: 'DELETE',
  // })
  //   .then(function () {
  //     console.log('heard back');
  //     updateDOM();
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
} // end clearHistory

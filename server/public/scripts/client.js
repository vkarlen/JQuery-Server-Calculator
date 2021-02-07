$(document).ready(onReady);

let operator = '';
let currentNum = '';
let firstNum = '';
let lastAnswer = '';

function onReady() {
  // create button calls
  $('.operator').on('click', changeOperator);
  $('.number').on('click', grabNumber);
  $('#calcForm').on('submit', sendEquation);
  $('#clear').on('click', clearCalculator);
  $('#clearHistory').on('click', clearHistory);
  $(document).on('click', 'li', rerunEquation);

  updateDOM();
} // end onReady

function changeOperator() {
  console.log('in changeOp', this.value);

  if (operator) {
    alert('Sorry we can only do two numbers!');
  } else {
    // reset operator to the one clicked
    operator = this.value;

    // store first number and start a new number
    if (!currentNum) {
      firstNum = lastAnswer;
    } else {
      firstNum = currentNum;
      currentNum = '';
    }
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
      console.log('response', history);
      console.log('response', history.length);

      // Post last answer in #answer
      // skip if there is no data to display yet
      if (history.length) {
        lastAnswer = history[history.length - 1].answer;
        $('#calcScreen').append(lastAnswer);

        // loop through array and append history to list
        for (const equation of history) {
          $('#historyList').append(`
        <li data-id="${equation.index}">${equation.num1} ${equation.operator} ${equation.num2} = ${equation.answer}</li>
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
  /*
   * I tried & it messed up the whole path. I think I
   * need to pass in data? But I don't know how I'm
   * supposed to format that data at the moment.
   */
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

  // work around POST method
  $.ajax({
    method: 'POST',
    url: '/clearhistory',
  })
    .then(function (response) {
      //console.log('back from the server');
      updateDOM();
    })
    .catch(function (err) {
      console.log(err);
    });
} // end clearHistory

function rerunEquation() {
  // get index stored on clicked element
  let index = $(this).data('id');
  //console.log('this:', index);

  //
  $.ajax({
    method: 'GET',
    url: '/calculate',
  })
    .then(function (response) {
      //get the equation at the index clicked
      let oldEquation = response[index];

      // set working values to old values
      firstNum = oldEquation.num1;
      currentNum = oldEquation.num2;
      operator = oldEquation.operator;

      //update DOM
      updateInput();
    })
    .catch(function (err) {
      console.log(err);
    });
} // end rerunHistory

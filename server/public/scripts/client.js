$(document).ready(onReady);

let operator = '';

function onReady() {
  // create button calls
  $('.operator').on('click', changeOperator);
  $('#calcForm').on('submit', sendEquation);
  $('#clear').on('click', clearCalculator);
  //$('#clearHistory').on('click', clearHistory);

  updateDOM();
} // end onReady

function changeOperator() {
  //console.log('in changeOp', this.value);

  // reset operator to the one clicked
  operator = this.value;
} // end changeOperator

function sendEquation(event) {
  event.preventDefault();
  console.log('in sendEq');

  //make sure all inputs are filled
  if (!operator || !$('#num1').val() || !$('#num2').val()) {
    alert('Missing inputs! Please try again');
  } else {
    // console.log('we are good to go');

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
  $('#num1').val('');
  $('#num2').val('');
  operator = '';
} // end clearCalc

function updateDOM() {
  // empty DOMs
  $('#historyList').empty();
  $('#answer').empty();

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
        $('#answer').append(
          `${lastEquation.num1} ${lastEquation.operator} ${lastEquation.num2} = ${lastEquation.answer}`
        );

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
}

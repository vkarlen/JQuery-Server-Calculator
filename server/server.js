const express = require('express');
const calculate = require('./modules/calculate');

const app = express();
let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}

// Config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static
app.use(express.static('server/public'));

app.listen(port, () => {
  console.log("*hacker voice* We're in...", port);
});

app.get('/calculate', (req, res) => {
  //console.log('in GET');
  res.send(calculate.equationList);
});

app.post('/calculate', (req, res) => {
  let equation = req.body.equation_sent;
  console.log(equation);

  // add to calculate
  calculate.doCalculation(equation);

  // respond
  res.sendStatus(200);
});

app.post('/clearhistory', (req, res) => {
  //console.log('in clear history');

  // call function to clear history
  calculate.clearHistory();

  res.sendStatus(200);
});

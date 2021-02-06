const express = require('express');
const calculate = require('./modules/calculate');

const app = express();
const port = 5000;

// Config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static
app.use(express.static('server/public'));

app.listen(port, () => {
  console.log("*hacker voice* We're in...", port);
});

app.get('/calculate', (req, res) => {
  console.log('in GET');
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

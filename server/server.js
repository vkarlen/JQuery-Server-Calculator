const express = require('express');

const app = express();
const port = 5000;

// Config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('server/public'));

//Turn it ON
app.listen(port, () => {
  console.log("*hacker voice* We're in...", port);
});

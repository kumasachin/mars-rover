const express = require('express');
const marsJsonResponse = require('./src/data/mars-robot.json')
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/mars-robot', (req, res) => {
  res.send(marsJsonResponse);
});
require('./dbConnect.js');
require('./services/slack.js');
const express = require('express');

const app = express();

app.listen(5000, () => {
  console.log('listen to port -> ', 5000);
});

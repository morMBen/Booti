require('./dbConnect.js');
require('./services/slack.js');
const express = require('express');

const app = express();

app.listen(8000, () => {
  console.log('listen to port -> ', 8000);
});

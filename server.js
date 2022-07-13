require('./dbConnect.js');
require('./services/slack.js');
const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
  console.log('listen to port ->', process.env.PORT);
});

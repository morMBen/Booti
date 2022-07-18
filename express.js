const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());
// app.get('/', (req, res) => {
//   res.send('<h1>Hello</h1>');
// });

app.listen(8000, () => {
  console.log('listen to port -> ', 8000);
});

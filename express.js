const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const route = require('./routers/index');
const port = process.env.PORT || 8000;
const publicDirectoryPath = path.join(__dirname, 'client/build');

app.use(express.json());
app.use(cors());
app.use(express.static(publicDirectoryPath));
app.use('/api', route);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'index.html'));
});

app.listen(port, () => {
  console.log('listen to port -> ', port);
});

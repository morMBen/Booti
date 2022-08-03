const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const route = require('./routers/index');
const port = process.env.PORT || 80;
const publicDirectoryPath = path.join(__dirname, 'client/build');

app.use(express.json());
app.use(cors());
app.use(express.static(publicDirectoryPath));
app.use('/api', route);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicDirectoryPath, 'index.html'));
});

app.listen(port, () => {
  console.log('process1', process.env.NODE_ENV);
  console.log('listen to port -> ', port);
});

if (process.env.NODE_ENV === 'production') {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    },
    app
  );

  httpsServer.listen(443);
}

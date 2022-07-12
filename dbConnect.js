const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.pylih7i.mongodb.net/?retryWrites=true&w=majority`,
  (error, mongoConnectionInstance) => {
    if (error) throw Error('Mongoose Connection!!, Error: ' + error);
    if (!process.env.NODE_ENV) {
      const { host, port, name } = mongoConnectionInstance;
      console.log({ host, port, name });
    }
  }
);

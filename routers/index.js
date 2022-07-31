const express = require('express');
const Message = require('../models/message.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    res.send('hola');
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

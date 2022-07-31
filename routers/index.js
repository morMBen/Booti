const express = require('express');
const Message = require('../models/message.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    console.log('/users  req', req.body);
    const user = User.find({ _id: new ObjectId(req.body.id) });
    console.log('/users  user', user);
    res.send(user);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

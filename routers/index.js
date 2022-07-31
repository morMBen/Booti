const express = require('express');
const Message = require('../models/message.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    const user = User.findById(req.body.id);
    console.log('/users  right_answers', user.right_answers);
    console.log('/users  reactions', user.reactions);
    res.send(user.right_answers);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

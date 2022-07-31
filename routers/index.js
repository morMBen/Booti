const express = require('express');
const Message = require('../models/message.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    console.log('/users  user', user);
    // console.log('/users  right_answers', await user.right_answers);
    console.log('/users  reactions', await user.reactions);
    res.send(await user.reactions);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

const express = require('express');
const Message = require('../models/message.js');
const Reaction = require('../models/reaction.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    console.log('/users  user', req.body.name);
    const user = await User.find({ slack_display_name: req.body.name });
    console.log('/users  user', user);
    // console.log('/users  right_answers', await user.right_answers);
    console.log('/users  reactions', await user.reactions);
    res.send(await user.reactions);
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

route.get('/reset', async (req, res) => {
  try {
    await Message.remove({});
    await User.remove({});
    await Reaction.remove({});
    res.send('Done!');
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

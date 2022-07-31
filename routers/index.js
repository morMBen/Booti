const express = require('express');
const Message = require('../models/message.js');
const Reaction = require('../models/reaction.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/anyreaction', async (req, res) => {
  try {
    const user = await User.findOne({ slack_display_name: req.body.name });
    const anyReactions = await user.any_reactions;
    console.log('anyReaction', anyReactions);

    res.send({ anyReactions: anyReactions });
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});
route.get('/goodreaction', async (req, res) => {
  try {
    const user = await User.findOne({ slack_display_name: req.body.name });
    const goodReactions = await user.good_reaction;
    console.log('goodreaction', goodReactions);

    res.send({ goodreaction: goodReactions });
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

route.get('/reset', async (req, res) => {
  try {
    await Message.deleteMany({});
    await User.deleteMany({});
    await Reaction.deleteMany({});
    res.send('Done!');
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

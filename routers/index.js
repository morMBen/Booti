const express = require('express');
const { findOne } = require('../models/message.js');
const Message = require('../models/message.js');
const Reaction = require('../models/reaction.js');
const User = require('../models/user.js');

const route = express.Router();

route.get('/users', async (req, res) => {
  try {
    const allUsers = User.find({}, async function (err, users) {
      var usersArr = [];

      for (let i = 0; i < users.length; i++) {
        const rating = await users[i].getAllRating();
        const data = {
          slack_display_name: users[i].slack_display_name,
          slack_user_id: users[i].slack_user_id,
          image: users[i].image,
          ...rating,
        };
        usersArr.push(data);
      }

      res.send(usersArr);
    });
  } catch (e) {
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
route.get('/messages', async (req, res) => {
  let messages = await Message.find({});
  messages = messages.map((message) => {
    return message;
  });
  res.send(messages);
});
(async () => {
  // let mes = await Message.findOne({ _id: '62eba86c3ecc1b3d836c7eba' });
  // console.log(await mes.any_reactions);
  // console.log(await mes.good_reaction);
  // console.log(await mes.getAllReactionOfThread());
})();
module.exports = route;

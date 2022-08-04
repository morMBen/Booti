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
      // console.log(usersArr);

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
(async () => {
  // let user = await User.findOne({ slack_display_name: 'Mordi' });
  // console.log(await user.answers);
  // try {
  //   const mes = await Message.findOne({ slack_user: '62eb999e0cd4a9613149c7f6' });
  //   const message = await Message.create({
  //     text: 'fasd',
  //     slack_channel_id: 'C03S8TCT5L4',
  //     slack_message_id: '1659597215.207409',
  //     slack_user: '62eb999e0cd4a9613149c7f6',
  //     slack_parent: '62eb9ee20cd4a9613149c82f',
  //     __v: 0,
  //   });
  //   mes.Answers_to_question.push(message._id);
  //   mes.save();
  //   console.log(mes);
  // } catch (err) {
  //   console.log(err);
  // }
})();
module.exports = route;

// const obj = {
//   _id: new ObjectId('62eb719f04e6882b7b63e329'),
//   text: 'fasd',
//   slack_channel_id: 'C03S8TCT5L4',
//   slack_message_id: '1659597215.207409',
//   slack_user: '62eb6c1b04e6882b7b63e234',
//   slack_parent: null,
//   __v: 0,
// };

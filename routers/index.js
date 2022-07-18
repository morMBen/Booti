const express = require('express');
const Message = require('../models/message.js');
const User = require('../models/user.js');

const route = express.Router();

(async () => {
  const m = await (await (await Message.findOne({})).populate('slack_user')).slack_user;

  console.log(m);
  //   console.log(await (await m.populate('slack_user')));
  //   const user = await User.findOne({
  //     slack_display_name: 'Mordi',
  //   });
  //   console.log(await user.right_answers);
})();

route.get('/users', async (req, res) => {
  try {
    res.send('hola');
  } catch (e) {
    console.log(e.message);
    res.send(e.message);
  }
});

module.exports = route;

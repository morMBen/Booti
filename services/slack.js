require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');
const express = require('express');
// const Message = require('../models/message.js');

const User = require('../models/user.js');

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

app.message('', async ({ message, say }) => {
  // console.log(User);\
  // const user = await new User({ slack_display_name: 'Bob', slack_user_id: 'ID' });
  // user.save();

  let user = await User.find({ slack_user_id: message.user });

  if (!user) {
    const userData = await app.client.users.info({ token: process.env.TOKEN, user: message.user });
    const {
      user: {
        profile: { display_name },
      },
    } = userData;

    user = await new User({ slack_display_name: display_name, slack_user_id: message.user });
    await user.save();
  }
  console.log(user);
  say(`thanks <@${user.slack_user_id}>`);
  try {
  } catch (e) {
    console.log(e);
  }
});

app.event('reaction_added', async ({ event, client }) => {
  try {
    console.log('event →', event);
    // console.log('client →', clsient);
  } catch (e) {
    console.error(e);
  }
});
app.event('reaction_removed', async ({ event, client }) => {
  try {
    console.log('event →', event);
    // console.log('client →', clsient);
  } catch (e) {
    console.error(e);
  }
});

(async () => {
  await app.start(5000);
  console.log('* bolt app is running!');
})();

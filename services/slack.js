require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');
const express = require('express');
const Message = require('../models/message.js');

const User = require('../models/user.js');

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

app.message('', async ({ message, say }) => {
  try {
    const user = await User.setUser(message.user, app);
    const oldMessage = await Message.findOne({ slack_message_id: message.thread_ts });

    const mes = await Message.create({
      text: message.text,
      slack_channel_id: message.channel,
      slack_message_id: message.event_ts, //!! check letter
      slack_user: user._id,
      slack_parent: (oldMessage && oldMessage._id) || null,
    });
    console.log(user);
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

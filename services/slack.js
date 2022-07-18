require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');
const express = require('express');
const Message = require('../models/message.js');

const User = require('../models/user.js');
const Reaction = require('../models/reaction.js');

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

app.message('sa', async ({ message, say }) => {
  // app.client.conversations.list({ token: process.env.TOKEN });
  // app.client.chat.postMessage({
  //   token: process.env.TOKEN,
  //   channel: 'C03PJDWV5Q9',
  //   blocks: [{ type: 'section', text: { type: 'plain_text', text: 'Hello world' } }],
  // });
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
    console.log('message →', message);
    console.log('mes from mongoose →', mes);
  } catch (e) {
    console.log(e);
  }
});

app.event('reaction_removed', async ({ event, client }) => {
  try {
    const reaction = await Reaction.deleteOne({
      slack_message_id: event.item.ts,
      type: event.reaction,
    });
    console.log('reaction →', reaction);
  } catch (e) {
    console.error(e);
  }
});
app.event('reaction_added', async ({ event, client }) => {
  try {
    const sender = await User.setUser(event.user, app);
    const receiver = await User.setUser(event.item_user, app);
    const message = await Message.findOne({ slack_message_id: event.item.ts });
    const reaction_id = event.event_ts;

    const getCurrentUser = async () => {
      let mes = message;
      if (message.slack_parent) {
        mes = await message.populate('slack_parent').slack_parent;
      }
      return await mes.populate('slack_user');
    };

    const reaction = await Reaction.create({
      parent_user: await getCurrentUser().slack_user,
      reaction_id,
      type: event.reaction,
      sender,
      receiver,
      message,
    });
  } catch (e) {
    console.error(e);
  }
});

(async () => {
  await app.start(5000);
  console.log('* bolt app is running!');
})();

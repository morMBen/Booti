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
    const oldReactionToSame = await Reaction.findOne({
      slack_message_id: event.item.ts,
      sender,
    });

    const receiver = await User.setUser(event.item_user, app);
    const message = await Message.findOne({ slack_message_id: event.item.ts });
    const reaction_id = event.event_ts;
    const reaction = await Reaction.create({
      reaction_id,
      type: event.reaction,
      sender,
      receiver,
      message,
    });
    if (oldReactionToSame) {
      console.log(oldReactionToSame);
      console.log(message);
      const userData = await app.client.reactions.remove({
        token: process.env.TOKEN,
        name: oldReactionToSame.type,
        timestamp: message.slack_message_id,
        channel: message.slack_channel_id,
      });
    }
    // } else {
    //    remove reaction here
    // throw Error('All ready got a reaction to this message');
    // }
    console.log('reaction →', reaction);
    console.log('event added →', event);
  } catch (e) {
    console.error(e);
  }
});

(async () => {
  await app.start(5000);
  console.log('* bolt app is running!');
})();

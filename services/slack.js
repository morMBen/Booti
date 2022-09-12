require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');
const express = require('express');
const Message = require('../models/message.js');

const User = require('../models/user.js');
const Reaction = require('../models/reaction.js');
const { ConsoleLogger } = require('@slack/logger');

const bootcampsArr = JSON.parse(process.env.BOOTCAMPS);

bootcampsArr.forEach((bootcamp, index) => {
  observeBootcamp(bootcamp, index);
});

function observeBootcamp(bootcampObj, index) {
  const app = new App({
    token: bootcampObj.TOKEN,
    signingSecret: bootcampObj.SIGNIN_SECRET,
  });

  app.message('', async ({ message, say }) => {
    console.log('my message → ', message);
    try {
      const user = await User.setUser(message.user, app, bootcampObj.NAME, bootcampObj.TOKEN);
      const channelData = await app.client.conversations.info({
        token: bootcampObj.TOKEN,
        channel: message.channel,
      });
      console.log('My channel → ', channelData);
      const oldMessage = await Message.findOne({ slack_message_id: message.thread_ts });
      const mes = await Message.create({
        bootcamp: bootcampObj.NAME,
        text: message.text,
        slack_channel_id: message.channel,
        slack_message_id: message.event_ts, //!! check letter
        slack_user: user._id,
        slack_parent: (oldMessage && oldMessage._id) || null,
      });

      if (oldMessage) {
        console.log(mes);
        console.log(mes._id);
        oldMessage.answers_to_question.push(mes._id);
        oldMessage.save();
      }
    } catch (e) {
      console.log(e);
    }
  });

  app.event('message', async ({ event, client }) => {
    if (event.subtype && event.subtype === 'message_deleted') {
      let mes = await Message.findOneAndDelete({ slack_message_id: event.previous_message.ts });
      // mes = await mes.remove();
    }
  });
  app.event('reaction_removed', async ({ event, client }) => {
    try {
      // console.log('event →', event);
      let reaction = await Reaction.findOne({
        slack_message_id: event.item.ts,
        type: event.reaction,
      });
      reaction = await reaction.remove();
      console.log('reaction →', reaction);
    } catch (e) {
      console.error(e);
    }
  });

  const getParentUser = async (message) => {
    let mes = message;
    if (mes && mes.slack_parent) {
      mes = await mes.populate('slack_parent');
      mes = await mes.slack_parent;
    }

    mes = await mes.populate('slack_user');
    const user = await mes.slack_user;
    return user;
  };

  app.event('reaction_added', async ({ event, client }) => {
    try {
      const sender = await User.setUser(event.user, app, bootcampObj.NAME, bootcampObj.TOKEN);
      const receiver = await User.setUser(
        event.item_user,
        app,
        bootcampObj.NAME,
        bootcampObj.TOKEN
      );
      const message = await Message.findOne({ slack_message_id: event.item.ts });
      const reaction_id = event.event_ts;
      const parent_user = await getParentUser(message);

      if (parent_user._id.toString() === sender._id.toString()) {
        let parentMessage = await message.populate('slack_parent');
        parentMessage = await parentMessage.slack_parent;
        parentMessage.solved_user = receiver;
        parentMessage.save();
      }

      const reaction = await Reaction.create({
        bootcamp: bootcampObj.NAME,
        parent_user,
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
    await app.start(5000 - index);
    console.log(`*Bootcamp: ${bootcampObj.NAME} bolt app is running! on port ${5000 - index}`);
  })();
}

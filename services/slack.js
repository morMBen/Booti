require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');
const express = require('express');

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

app.message('', async ({ message, say }) => {
  console.log(message);
  const temp = await app.client.users.info({ token: process.env.TOKEN, user: message.user });
  const {
    user: {
      profile: { real_name_normalized, display_name, display_name_normalized },
    },
  } = temp;

  console.log('first_name →', first_name);
  console.log(' last_name →', last_name);
  console.log('real_name_normalized →', real_name_normalized);
  console.log('real_name_normalized →', real_name_normalized);
  console.log('display_name →', display_name);
  console.log('display_name_normalized →', display_name_normalized);

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

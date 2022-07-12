const { App, logLevel } = require('@slack/bolt');
const express = require('express');
const app2 = express();

console.log('adslfaksjdfalsk');

app2.listen(5050, () => {
  console.log('listening to port ' + 5050);
});

require('dotenv').config();
const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

// https://099b-2a02-ed0-6f2c-8c00-e124-56f6-e10b-b6a0.eu.ngrok.io/slack/events

//./node_modules/.bin/slack-verify --secret f9d0e6a487bcf452a5ffc350eba86645  --port=5000
(async () => {
  await app.start(5000);
  console.log('* bolt app is running!');
})();

app.event('app_mention', async ({ event, client }) => {
  try {
    const result = await client.chat.postMessage({
      text: `אני בטירוף איך אתה <@${event.user}>?`,
      channel: event.channel,
    });
  } catch (e) {
    console.error(e);
  }
});

//https://f744-2a02-ed0-6f2c-8c00-c0b7-e4db-58df-6011.eu.ngrok.io//slack/events

app.message('שווארמה', async ({ message, say }) => {
  console.log(message);
  try {
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `וואלה אני דואג לך <@${message.user}>, עליי...`,
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'רק תלחץ פה',
              emoji: true,
            },
            value: 'click_me_123',
            action_id: 'first_button',
          },
        },
      ],
    });
  } catch (e) {
    console.log(e);
  }
});

app.event('reaction_added', async ({ event, client }) => {
  try {
    console.log(event);
  } catch (e) {
    console.error(e);
  }
});
app.action('first_button', async ({ action, ack, say }) => {
  try {
    await ack();
    await say('איזה גבר שאשכרה לחצת');
  } catch (e) {
    console.log(e);
  }
});

app.shortcut('launch_shortcut', async ({ shortcut, ack, client }) => {
  try {
    await ack();
    console.log(client.views.open);
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'My App',
        },
        close: {
          type: 'plain_text',
          text: 'Close',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'מודל פשוט שנמצא ב...',
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: 'שששש המודל הזה סודי ביותר',
              },
            ],
          },
        ],
      },
    });
  } catch (e) {
    console.error(e);
  }
});

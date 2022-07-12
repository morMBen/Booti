require('dotenv').config();
const { App, logLevel } = require('@slack/bolt');

const app = new App({
  token: process.env.TOKEN,
  signingSecret: process.env.SIGNIN_SECRET,
});

// app.event('app_mention', async ({ event, client }) => {
//   try {
//     const result = await client.chat.postMessage({
//       text: `אני בטירוף איך אתה <@${event.user}>?`,
//       channel: event.channel,
//     });
//   } catch (e) {
//     console.error(e);
//   }
// });

//https://f744-2a02-ed0-6f2c-8c00-c0b7-e4db-58df-6011.eu.ngrok.io//slack/events

app.message('', async ({ message, say }) => {
  console.log(message);

  const temp = await app.client.users.info({ token: process.env.TOKEN, user: message.user });

  try {
    // await say({
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: `וואלה אני דואג לך <@${message.user}>, עליי...`,
    //       },
    //       accessory: {
    //         type: 'button',
    //         text: {
    //           type: 'plain_text',
    //           text: 'רק תלחץ פה',
    //           emoji: true,
    //         },
    //         value: 'click_me_123',
    //         action_id: 'first_button',
    //       },
    //     },
    //   ],
    // });
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

(async () => {
  await app.start(5000);
  console.log('* bolt app is running!');
})();

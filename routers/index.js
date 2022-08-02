const express = require('express');
const Message = require('../models/message.js');
const Reaction = require('../models/reaction.js');
const User = require('../models/user.js');

const route = express.Router();

const calculateRating = (scores) => {
  const { questions, answers, right_answers, reactions, any_reactions } = scores;
  let score = 0;
  score += questions * 10;
  score += answers * 7;
  score += (any_reactions - reactions) * 2;
  score += right_answers * 25;
  score += (reactions - right_answers) * 10;

  let rating = 0;
  switch (true) {
    case score >= 20:
      rating = 0.5;
      break;
    case score >= 540:
      rating = 1;
      break;
    case score >= 1080:
      rating = 1.5;
      break;
    case score >= 1620:
      rating = 2;
      break;
    case score >= 2160:
      rating = 2.5;
      break;
    case score >= 2700:
      rating = 3;
      break;
    case score >= 3240:
      rating = 3.5;
      break;
    case score >= 3780:
      rating = 4;
      break;
    case score >= 4320:
      rating = 4.5;
      break;
    case score >= 4860:
      rating = 5;
      break;
  }
  return rating;
};

const getScores = async (user) => {
  return {
    questions: await user.questions,
    answers: await user.answers,
    right_answers: await user.solved_reaction,
    reactions: await user.any_reactions,
    any_reactions: await user.any_reactions,
  };
};

route.get('/users', async (req, res) => {
  try {
    const allUsers = User.find({}, async function (err, users) {
      var usersArr = [];

      for (let i = 0; i < users.length; i++) {
        const rating = await users[i].getAllRating();
        const data = {
          slack_display_name: users[i].slack_display_name,
          slack_user_id: users[i].slack_user_id,
          slack_user_id: users[i].slack_user_id,
          ...rating,
        };
        usersArr.push(data);
      }
      console.log(usersArr);

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
  let user = await User.findOne({ slack_display_name: 'Mordi 2' });
  console.log(await user.getAllRating());
})();
module.exports = route;

const express = require('express');
const Message = require('../models/message.js');
const Reaction = require('../models/reaction.js');
const User = require('../models/user.js');

const route = express.Router();

function round(value, step) {
  step || (step = 1.0);
  var inv = 1.0 / step;
  return Math.round(value * inv) / inv;
}

const calculateRating = (scores) => {
  const { questions, answers, right_answers, reactions, any_reactions } = scores;
  let score = 0;
  score += questions * 10;
  score += answers * 7;
  score += (any_reactions - reactions) * 2;
  score += right_answers * 25;
  score += (reactions - right_answers) * 10;
  score = score / 480;
  return round(score, 0.5);
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
        const scores = await getScores(users[i]);
        const rating = calculateRating(scores);
        const data = {
          slack_display_name: users[i].slack_display_name,
          slack_user_id: users[i].slack_user_id,
          slack_user_id: users[i].slack_user_id,
          rating,
          ...scores,
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

module.exports = route;

require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./message');
const Reaction = require('./reaction');

const userSchema = new mongoose.Schema({
  slack_display_name: 'string',
  slack_user_id: 'string',
});

userSchema.statics.setUser = async (id, app) => {
  try {
    let user = await User.findOne({ slack_user_id: id });
    const userData = await app.client.users.info({ token: process.env.TOKEN, user: id });
    const {
      user: {
        profile: { display_name },
      },
    } = userData;

    if (!user) {
      user = new User({ slack_display_name: display_name, slack_user_id: id });
      await user.save();
    } else {
      await user.updateOne({
        slack_display_name: display_name,
        slack_user_id: id,
      });
    }
    return user;
  } catch (e) {
    console.log(e);
  }
};

userSchema.virtual('any_reactions').get(async function () {
  return await Reaction.find({
    receiver: this._id,
    sender: { $ne: this._id },
  }).count();
});

userSchema.virtual('good_reaction').get(async function () {
  return await Reaction.find({
    receiver: this._id,
    type: 'white_check_mark',
    sender: { $ne: this._id },
  }).count();
});

userSchema.virtual('solved_reaction').get(async function () {
  return await Message.find({
    solved_user: this._id,
  }).count();
});
userSchema.virtual('answers').get(async function () {
  return await Message.find({
    slack_user: this._id,
    slack_parent: { $ne: null },
  }).count();
});

userSchema.virtual('questions').get(async function () {
  return await Message.find({
    slack_user: this._id,
    slack_parent: null,
  }).count();
});

userSchema.methods.getAllRating = async function () {
  const ratings = {
    questions: await this.questions,
    answers: await this.answers,
    right_answers: await this.solved_reaction,
    reactions: await this.any_reactions,
    any_reactions: await this.any_reactions,
  };
  const { rating, score } = calculateRating(ratings);
  ratings.rating = rating;
  ratings.score = score;
  return ratings;
};

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
  return { rating, score };
};

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./message');
const Reaction = require('./reaction');
const calculateRating = require('../utils/calculateRating');
const userSchema = new mongoose.Schema({
  bootcamp: 'string',
  slack_display_name: 'string',
  slack_user_id: 'string',
  image: 'string',
});

userSchema.statics.setUser = async (id, app, bootcampName, token) => {
  try {
    let user = await User.findOne({ slack_user_id: id });
    const userData = await app.client.users.info({ token: token, user: id });
    const {
      user: {
        profile: { display_name, image_48, real_name },
      },
    } = userData;

    if (!user) {
      user = new User({
        slack_display_name: real_name,
        slack_user_id: id,
        image: image_48,
        bootcamp: bootcampName,
      });
      await user.save();
    } else {
      await user.updateOne({
        slack_display_name: display_name,
        image: image_48,
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

userSchema.methods.getAllQuestions = async function () {
  const messages = await Message.find({
    slack_user: this._id,
    slack_parent: null,
  });
  let res = [];
  for (let i = 0; i < messages.length; i++) {
    res.push(messages[i].answers);
  }
  res = await Promise.all(res);

  res = res.map((e, i) => {
    return { ...messages[i]._doc, num_of_answers: e };
  });

  return res;
};
userSchema.methods.getAllRating = async function () {
  const ratings = {
    questions: await this.questions,
    answers: await this.answers,
    right_answers: await this.solved_reaction,
    reactions: await this.good_reaction,
    any_reactions: await this.any_reactions,
  };
  const { rating, score } = calculateRating(ratings);
  ratings.rating = rating;
  ratings.score = score;
  return ratings;
};

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

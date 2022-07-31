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

const User = mongoose.model('User', userSchema);

module.exports = User;

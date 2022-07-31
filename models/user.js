require('dotenv').config();
const mongoose = require('mongoose');
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
  return await Reaction.find({
    receiver: this._id,
    type: 'white_check_mark',
    solved_user: true,
    sender: { $ne: this._id },
  }).count();
});
// userSchema.virtual('reactions').get(async function () {
//   return await Reaction.find({
//     receiver: this._id,
//     type: 'white_check_mark',
//   })
//     .where('this.sender===this.parent_user')
//     .where('sender')
//     .ne(this._id)
//     .count();
// });

// userSchema.virtual('right_answers').get(async function () {
//   return await Reaction.find({
//     sender: this._id,
//     type: 'white_check_mark',
//   })
//     .where('sender')
//     .ne(this._id)
//     .count();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;

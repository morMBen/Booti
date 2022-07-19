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
      user = await new User({ slack_display_name: display_name, slack_user_id: id });
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

userSchema.virtual('right_answers').get(async function () {
  console.log(this);
  return await Reaction.count({ receiver: this._id, type: '' });
});

const User = mongoose.model('User', userSchema);

module.exports = User;

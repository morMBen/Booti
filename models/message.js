const mongoose = require('mongoose');
const Reaction = require('./reaction');

const messageSchema = new mongoose.Schema({
  text: 'string',
  slack_channel_id: 'string',
  slack_message_id: 'string',
  solved_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  slack_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  slack_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  answers_to_question: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

messageSchema.virtual('answers').get(async function () {
  return await Message.find({
    slack_parent: this._id,
  }).count();
});

messageSchema.virtual('any_reactions').get(async function () {
  return await Reaction.find({
    message: this._id,
  }).count();
});

messageSchema.virtual('good_reaction').get(async function () {
  return await Reaction.find({
    message: this._id,
    type: 'white_check_mark',
  }).count();
});

messageSchema.methods.getAllReactionOfThread = async function () {
  const allMessages = await Message.find({ _id: { $in: this.answers_to_question } });
  console.log(this);
  const promisesObj = { good: [this.good_reaction], all: [this.any_reactions] };
  for (let i = 0; i < allMessages.length; i++) {
    promisesObj.good.push(allMessages[i].good_reaction);
    promisesObj.all.push(allMessages[i].any_reactions);
  }
  let good = await Promise.all(promisesObj.good);
  good = good.reduce((a, b) => a + b, 0);
  let all = await Promise.all(promisesObj.all);
  all = all.reduce((a, b) => a + b, 0) - good;

  return { thread_good_reactions: good, thread_any_reactions: all };
};

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

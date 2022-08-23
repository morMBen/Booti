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

messageSchema.statics.getFullThread = async function (message_id) {
  const mes = await Message.findOne({ _id: message_id });
  let ans = await mes.populate('answers_to_question');
  ans = await mes.answers_to_question;
  let user = await mes.populate('slack_user');
  user = await mes.slack_user;

  const response = { ...mes._doc };

  response.good_reaction = await mes.good_reaction;
  response.any_reactions = await mes.any_reactions;

  const answers_to_question_arr = [];
  for (let i = 0; i < response.answers_to_question.length; i++) {
    let u = await mes.answers_to_question[i].populate('slack_user');
    u = await mes.answers_to_question[i].slack_user;
    const a = { ...mes.answers_to_question[i]._doc };
    a.good_reaction = await mes.answers_to_question[i].good_reaction;
    a.any_reactions = await mes.answers_to_question[i].any_reactions;
    answers_to_question_arr.push(a);
  }
  response.answers_to_question = answers_to_question_arr;
  return response;
};

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

const Message = mongoose.model('Message', messageSchema);

Message.pre('remove', async (next) => {
  await Reaction.deleteMany({ message: this._id });
  await Message.deleteMany({ slack_parent: this._id });
  next();
});

module.exports = Message;

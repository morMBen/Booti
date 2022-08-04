const mongoose = require('mongoose');

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

messageSchema.set('toObject', { virtuals: true });
messageSchema.set('toJSON', { virtuals: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

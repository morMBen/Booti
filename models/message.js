const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: 'string',
  slack_channel_id: 'string',
  slack_message_id: 'string',
  slack_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  slack_parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;

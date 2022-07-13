const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reaction_id: 'string',
  type: 'string',
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

// all kind of static or instances

const Reaction = mongoose.model('reactions', reactionSchema);

module.exports = Reaction;

const mongoose = require('mongoose');
const Message = require('./message');
const User = require('./user');

const reactionSchema = new mongoose.Schema({
  reaction_id: 'string', //* event_ts
  type: 'string', //* reaction
  parent_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  sender: {
    //* user
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  receiver: {
    //* item_user
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  message: {
    //* ts → ObjectId
    type: mongoose.Schema.Types.ObjectId,
    ref: Message,
  },
});

// all kind of static or instances

const Reaction = mongoose.model('reactions', reactionSchema);

module.exports = Reaction;

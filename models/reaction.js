const mongoose = require('mongoose');
require('./message');

const reactionSchema = new mongoose.Schema({
  reaction_id: 'string', //* event_ts
  type: 'string', //* reaction
  parent_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sender: {
    //* user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  receiver: {
    //* item_user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    //* ts → ObjectId
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
});

// all kind of static or instances

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

const mongoose = require('mongoose');
const Message = require('./message');
require('./message');

const reactionSchema = new mongoose.Schema({
  reaction_id: 'string', //* event_ts
  type: 'string', //* reaction
  // solved_user: 'boolean',
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

reactionSchema.pre('remove', async function (next) {
  const re = this;
  console.log('im here', re);
  if (this.type === 'white_check_mark') {
    let mes = await this.populate('message');
    mes = await mes.message;
    mes = await this.populate('slack_parent');
    mes = await mes.slack_parent;
    console.log('mes →', mes);
    if (mes.solved_user.toString() === this.receiver.toString()) {
      console.log('im good');
    }
  }
  next();
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

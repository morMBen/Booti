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

reactionSchema.pre('deleteOne', async function (next) {
  console.log('im here', this.model);
  if (this.type === 'white_check_mark') {
    let mes = await this.populate('message');
    mes = await mes.message;
    console.log('mes →', mes);
    if (mes.solved_user === this.receiver) {
      console.log('im good');
    }
  }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;

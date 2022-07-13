const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  slack_display_name: 'string',
  slack_user_id: 'string',
});

// all kind of static or instances

const User = mongoose.model('users', userSchema);

exports.module = { User };

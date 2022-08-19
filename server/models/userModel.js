const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  name: {
    type: 'string',
    required: true
  },

  email: {
    type: 'string',
    required: true,
    unique: true
  },

  password: {
    type: 'string',
    required: true
  }
});

const User = mongoose.model('User', userModel);
module.exports = User;
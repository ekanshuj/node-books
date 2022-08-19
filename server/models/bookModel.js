const mongoose = require('mongoose');

const bookModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  title: {
    type: 'string',
    required: true
  },

  description: {
    type: 'string',
    required: true
  },

  author: {
    type: 'string',
    required: true
  },

  tag: {
    type: 'string',
    default: 'General'
  },
});

const Book = mongoose.model('User', bookModel);
module.exports = Book;
const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')
// const getToken = require('../config/getToken');


class bookController {
  static showBooks = asyncHandler(async, { LOGIN_TODO }, (req, res) => {
    const books = await Book.find({ user: req.user.id });

    if (!books) res.status(201).json({ message: "No books yet" });
    res.status(200).json(books);
  })

  static createBooks = asyncHandler(async, { LOGIN_TODO }, (req, res) => {
    try {
      const { title, description, author, tag } = req.body;

      if (!title, !description, !author) res.status(201).json({ message: 'Please enter all fields' });
      const book = await Book.create({
        user: req.user.id,
        title,
        description,
        author,
        tag
      });

      if (book) res.status(200).json({ book })
      else {
        res.status(501).json({ message: 'Internal Server Error' });
      }
      res.status(200).json(book);

    } catch (err) {
      res.status(501).json({ message: 'Internal Server Error' });
      console.log(err.message);
    }
  })

  static updateBooks = asyncHandler(async, { LOGIN_TODO }, (req, res) => {
    const { title, description, author, tag } = req.body;
    try {
      const newBook = {};
      if (title) newBook.title = title;
      if (description) newBook.description = description;
      if (author) newBook.author = author;
      if (tag) newBook.tag = tag;

      let book = await Book.findById(req.params.id);

      if (!book) res.status(401).json({ messsage: 'No book found to update' });
      if (book.user?.toString() !== req.user.id) res.status(501).json({ message: 'Error updating book' });

      book = await Book.findByIdAndUpdate(req.params.id, { $set: newBook }, { new: true });
      if (book) res.status(200).json({ book });

    } catch (err) {
      res.status(501).json({ message: 'Internal Server Error' });
      console.log(err.message);
    }
  })

  static deleteBooks = asyncHandler(async, { LOGIN_TODO }, (req, res) => {
    try {
      let book = await Book.findById(req.params.id)

      if (!book) res.status(401).json({ message: 'No book found to delete' });
      if (book.user?.toString() !== req.user.id) res.status(501).json({ message: 'Error deleting book' });

      book = await Book.findByIdAndDelete(req.params.id);
      if (!book) res.status(201).json({ message: 'Book deleted successfully', book: book });

    } catch (err) {
      res.status(501).json({ message: 'Internal Server Error' });
      console.log(err.message);
    }
  })
};

module.exports = bookController;
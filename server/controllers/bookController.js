const asyncHandler = require('express-async-handler')
const Book = require('../models/bookModel')


class bookController {
  static showBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({ user: req.user.id });
    if (!books) return res.status(201).json({ message: "No books yet" });
    return res.status(200).json({ books, status: true });
  })

  static createBooks = asyncHandler(async (req, res) => {
    try {
      const { title, description, author, tag } = req.body;
      if (!title, !description, !author) return res.status(201).json({ message: 'Please enter all fields' });
      const book = await Book.create({
        user: req.user.id,
        title,
        description,
        author,
        tag
      });

      if (!book) return res.status(501).json({ message: 'Internal Server Error' });
      return res.status(200).json({ book, status: true });
    } catch (er) {
      return res.status(501).json({ message: 'Internal Server Error', error: er.message });
    }
  })

  static updateBooks = asyncHandler(async (req, res) => {
    const { title, description, author, tag } = req.body;
    const { id } = req.params
    try {
      const newBook = {};
      if (title) newBook.title = title;
      if (description) newBook.description = description;
      if (author) newBook.author = author;
      if (tag) newBook.tag = tag;

      let book = await Book.findById(id);
      if (!book) res.status(401).json({ messsage: 'No book found to update' });
      if (book.user?.toString() !== req.user.id) return res.status(501).json({ message: 'Error updating book' });

      book = await Book.findByIdAndUpdate(id, { $set: newBook }, { new: true });
      if (book) return res.status(200).json({ book });
    } catch (er) {
      return res.status(501).json({ message: 'Internal Server Error', er: er.message });
    }
  })

  static deleteBooks = asyncHandler(async (req, res) => {
    const { id } = req.params.id;
    try {
      let book = await Book.findById(id)
      if (!book) res.status(401).json({ message: 'No book found to delete' });
      if (book.user?.toString() !== req.user.id) return res.status(501).json({ message: 'Error deleting book' });

      book = await Book.findByIdAndDelete(id);
      if (!book) return res.status(201).json({ message: 'Book deleted successfully', book: book, status: true });

    } catch (er) {
      return res.status(501).json({ message: 'Internal Server Error', error: er.message });
    }
  })
};

module.exports = bookController;
const Book = require('../models/books')

async function addBook(req, res) {
  try {
    const {
      title,
      author,
      description,
      isbn,
      subject,
      gradeLevel,
      addedBy,
      fileUrl,
      coverImageUrl,
    } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      isbn,
      subject,
      gradeLevel,
      addedBy,
      fileUrl,
      coverImageUrl,
    });

    const savedBook = await newBook.save();
    res.status(201).json( savedBook );
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book", error: error.message });
  }
};

async function getAllBooks(req, res) {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books );
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books", error: error.message });
  }
};


async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book fetched successfully", data: book });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Failed to fetch book", error: error.message });
  }
};



async function updateBook(req, res){
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBook = await Book.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book", error: error.message });
  }
};

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book", error: error.message });
  }
};

async function getBooksByGradeLevel(req, res) {
  const { gradeLevel } = req.params;

  try {
    const books = await Book.find({ gradeLevel });

    if (books.length === 0) {
      return res.status(404).json({ message: `No books found for grade level: ${gradeLevel}` });
    }

    res.status(200).json( books );
  } catch (error) {
    console.error('Error fetching books by grade level:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {addBook, getAllBooks, getBookById, updateBook, deleteBook, getBooksByGradeLevel}
const express = require('express');
const app = express();

// Sample book data (in-memory)
let books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction" },
  { id: 2, title: "1984", author: "George Orwell", genre: "Fiction" },
  { id: 3, title: "Moby-Dick", author: "Herman Melville", genre: "Fiction" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction" },
  { id: 5, title: "Pride and Prejudice", author: "Jane Austen", genre: "Fiction" },
];

// Middleware to parse JSON bodies
app.use(express.json());

// GET all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST to add a new book
app.post('/api/books', (req, res) => {
  const { title, author, genre } = req.body;

  // Create new book with a new ID
  const newBook = {
    id: books.length + 1, // Automatically generate the next ID
    title,
    author,
    genre
  };

  books.push(newBook); // Add the book to the array
  res.status(201).json({
    message: 'Book created successfully',
    book: newBook
  });
});

// PUT to update a book by ID
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, genre } = req.body;

  // Find the book by ID
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex !== -1) {
    // Update the book if found
    books[bookIndex] = { id, title, author, genre };
    res.json({
      message: 'Book updated successfully',
      book: books[bookIndex]
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// DELETE route to remove a book by ID
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Find the index of the book by ID
  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex !== -1) {
    // Remove the book from the array
    books.splice(bookIndex, 1);
    res.json({
      message: 'Book deleted successfully'
    });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Vercel requires an export for serverless functions
module.exports = app;

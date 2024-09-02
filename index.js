const express = require("express");
const cors = require("cors");
const { getAllBooks, getBookById } = require("./controllers/books");
const app = express();

app.use(cors());
app.use(express.json());

// home route
app.get('/', (req, res) => {
  res.send(`<h1>This is BD6.6 - HW - 3 </h1>`);
});

// Exercise 1: Retrieve All Books
// Objective: Retrieve all books from the database.
// Query Parameters: None
// Tasks: Implement a function to return all books and ensure the correct data format is returned.
app.get('/books', async (req, res) => {
  let books = await getAllBooks();
  return res.status(200).json({books})
});

// Exercise 2: Retrieve Book by ID
// Objective: Retrieve a book by its ID from the database.
// Query Parameters: id - The ID of the book to retrieve.
// Tasks: Implement a function to return a book based on its ID and ensure the correct data format is returned.
app.get('/books/details/:id', async (req, res) => {
    let id = parseInt(req.params.id); 
    let book = await getBookById(id);

    return res.status(200).json({ book });
});


module.exports = { app }
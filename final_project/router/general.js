const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const booklist = JSON.stringify(books,null,2);
  return res.type('json').send(books)
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  });
    
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];
    for (const book of Object.values(books)) {
      if (book.author === author) {
        matchingBooks.push(book);
      }
    }
    if (matchingBooks.length > 0) {
      return res.json(matchingBooks);
    } else {
      return res.status(404).json({message: "No books found for author"});
    }
  });

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const book = Object.values(books).find(b => b.title.toLowerCase() === title.toLowerCase());
    if (book) {
      return res.json(book);
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  });
  
//  Get book review
public_users.get('/reviews/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(b => b.isbn === isbn);
    if (book) {
      const reviews = book.reviews;
      return res.json(reviews);
    } else {
      return res.status(404).json({message: "Book not found"});
    }
  });
  
module.exports.general = public_users;

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 8080;

// MongoDB connection URL with new data path
const url = 'mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1';
const dbName = 'bookstore';

app.use(cors());
app.use(express.json());

let db;

// Connect to MongoDB
MongoClient.connect(url)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
  });

// Get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await db.collection('books').find().toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get book by ID
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await db.collection('books').findOne({ _id: req.params.id });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get books by category
app.get('/api/books/category/:category', async (req, res) => {
  try {
    const books = await db.collection('books')
      .find({ category: req.params.category })
      .toArray();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get best sellers
app.get('/api/books/bestsellers', async (req, res) => {
  try {
    const books = await db.collection('books')
      .find({ rating: { $exists: true } })  // Only get books with rating field
      .sort({ rating: -1 })
      .limit(5)
      .toArray();
    
    if (!books || books.length === 0) {
      // If no books with ratings, return all books
      const allBooks = await db.collection('books').find().limit(5).toArray();
      return res.json(allBooks);
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get new releases
app.get('/api/books/newreleases', async (req, res) => {
  try {
    const books = await db.collection('books')
      .find({ publishedDate: { $exists: true } })  // Only get books with publishedDate field
      .sort({ publishedDate: -1 })
      .limit(5)
      .toArray();
    
    if (!books || books.length === 0) {
      // If no books with publishedDate, return all books
      const allBooks = await db.collection('books').find().limit(5).toArray();
      return res.json(allBooks);
    }
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update book by ID
app.put('/api/books/:id', async (req, res) => {
  try {
    const result = await db.collection('books').updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
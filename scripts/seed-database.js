const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'bookstore';

const books = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 24.99,
    imageUrl: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
    rating: 4.9,
    discount: 15,
    description: "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    category: "Self-Help",
    language: "English",
    pages: 320,
    publisher: "Penguin Random House",
    publishedDate: "2024-01-01",
    isbn: "978-0735211292",
    format: "Hardcover",
    stock: 100,
    tags: ["self-help", "productivity", "psychology"],
    reviews: [
      {
        userId: "user3",
        userName: "Mike Johnson",
        rating: 5,
        comment: "Life-changing book about habit formation",
        date: "2024-03-01"
      }
    ]
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 19.99,
    imageUrl: "/src/assets/pic/fumo.jfif",
    rating: 4.7,
    discount: 10,
    description: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave.",
    category: "Finance",
    language: "English",
    pages: 256,
    publisher: "Harriman House",
    publishedDate: "2020-09-08",
    isbn: "978-0857197689",
    format: "Hardcover",
    stock: 45,
    tags: ["finance", "psychology", "self-help"],
    reviews: [
      {
        userId: "user4",
        userName: "Emily White",
        rating: 5,
        comment: "Changed my perspective on money",
        date: "2024-02-15"
      }
    ]
  }
  // Add other books here
];

async function seedDatabase() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    
    // Clear existing books
    await db.collection('books').deleteMany({});
    console.log('Cleared existing books');

    // Insert new books
    const result = await db.collection('books').insertMany(books);
    console.log(`Added ${result.insertedCount} books to the database`);

    await client.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase(); 
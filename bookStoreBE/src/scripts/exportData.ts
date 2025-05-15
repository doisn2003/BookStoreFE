import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Book } from '../models/book.model';
import { Category } from '../models/category.model';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';
import { Comment } from '../models/comment.model';

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/bookstore';

async function exportData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Export data from each collection
    const books = await Book.find({});
    const categories = await Category.find({});
    const users = await User.find({});
    const orders = await Order.find({});
    const carts = await Cart.find({});
    const comments = await Comment.find({});

    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    // Write data to JSON files
    fs.writeFileSync(path.join(dataDir, 'books.json'), JSON.stringify(books, null, 2));
    fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));
    fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));
    fs.writeFileSync(path.join(dataDir, 'orders.json'), JSON.stringify(orders, null, 2));
    fs.writeFileSync(path.join(dataDir, 'carts.json'), JSON.stringify(carts, null, 2));
    fs.writeFileSync(path.join(dataDir, 'comments.json'), JSON.stringify(comments, null, 2));

    console.log('Data exported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
}

exportData(); 
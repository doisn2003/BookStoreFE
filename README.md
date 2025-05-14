# Bookstore Application

A full-stack bookstore application built with React, Express, and MongoDB.

## Quick Start Guide

1. **Install Required Software**
   - Install Node.js from: https://nodejs.org/
   - Install MongoDB Community Server from: https://www.mongodb.com/try/download/community
     - Choose "Complete" installation
     - Install MongoDB Compass when prompted
     - Let it run as a Windows Service (default)

2. **Clone and Setup Project**
   ```powershell
   # Clone repository (replace with your repo URL)
   git clone <your-repository-url>
   cd CNPM  # or your project folder name

   # Install backend dependencies (in project root)
   npm install express mongodb cors

   # Install frontend dependencies
   cd BookStoreFE
   npm install
   ```

3. **Verify MongoDB is Running**
   - Open MongoDB Compass
   - Connect to: `mongodb://localhost:27017`
   - You should see "Connected to MongoDB" in Compass

4. **Seed the Database**
   ```powershell
   # Go back to project root
   cd ..
   
   # Run the seed script
   node scripts/seed-database.js
   # Should see: "Connected to MongoDB" and "Added X books to the database"
   ```

5. **Start Backend Server**
   ```powershell
   # Make sure you're in project root (CNPM folder)
   node server.js
   # Should see: 
   # "Server running at http://localhost:8080"
   # "Connected to MongoDB"
   ```

6. **Start Frontend (in a new terminal)**
   ```powershell
   # Open new terminal
   cd D:/Bai-nhom/CNPM/BookStoreFE  # adjust to your path
   npm run dev
   # Should see: "Local: http://localhost:5173"
   ```

7. **Access the Application**
   - Open browser and go to: http://localhost:5173
   - You should see the bookstore homepage with books

## Common Startup Issues

1. **"cd server" fails or server.js not found**
   - The `server.js` file is in the root folder (CNPM), not in a server folder
   - Make sure you're in the correct directory before running `node server.js`

2. **"mongod not recognized"**
   - This is normal if using MongoDB as Windows Service
   - Just use MongoDB Compass to verify the database is running

3. **No books showing on frontend**
   - Make sure backend is running (`node server.js`)
   - Check http://localhost:8080/api/books in browser
   - Try running seed script again

4. **Module not found errors**
   - Check you're in the right directory
   - Run `npm install` in both root and BookStoreFE folders

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Community Server (v4.4 or higher)
- MongoDB Compass (recommended for database management)

## Project Structure

```
bookstore/
├── BookStoreFE/        # Frontend React application
│   ├── src/
│   │   ├── assets/
│   │   │   └── pic/   # Book images (including fumo.jfif)
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server.js          # Backend Express server (in root directory)
├── scripts/
│   └── seed-database.js # Database seeding script
└── package.json
```

## Detailed Setup Instructions

1. **Install Prerequisites**
   ```bash
   # Download and install MongoDB Community Server from:
   https://www.mongodb.com/try/download/community

   # During MongoDB installation:
   # - Choose "Complete" installation
   # - Install MongoDB Compass when prompted
   # - Let it run as a Windows Service (default option)
   ```

2. **Clone and Setup Project**
   ```bash
   # Clone repository
   git clone <your-repository-url>
   cd bookstore

   # Install backend dependencies (in project root)
   npm install express mongodb cors

   # Install frontend dependencies
   cd BookStoreFE
   npm install
   ```

3. **Database Setup**
   ```bash
   # Verify MongoDB is running
   # Open MongoDB Compass and connect to:
   mongodb://localhost:27017

   # From project root, seed the database
   cd ..  # if you're in BookStoreFE
   node scripts/seed-database.js
   # You should see: "Connected to MongoDB" and "Added X books to the database"
   ```

4. **Start the Application**

   You'll need two terminal windows:

   Terminal 1 - Backend:
   ```bash
   # Make sure you're in project root directory
   cd D:/Bai-nhom/CNPM  # adjust path to your location
   node server.js
   # You should see: "Server running at http://localhost:8080" and "Connected to MongoDB"
   ```

   Terminal 2 - Frontend:
   ```bash
   # In a new terminal
   cd D:/Bai-nhom/CNPM/BookStoreFE  # adjust path to your location
   npm run dev
   # You should see: "Local: http://localhost:5173"
   ```

5. **Access the Application**
   - Open your browser and go to: http://localhost:5173
   - You should see the bookstore homepage with books displayed

## Troubleshooting

### Common Issues:

1. **"mongod not recognized" or MongoDB errors**
   - Ensure MongoDB is installed properly
   - Verify MongoDB service is running:
     ```bash
     # In Windows PowerShell (Admin):
     Get-Service MongoDB
     # If stopped:
     Start-Service MongoDB
     ```

2. **No books displaying**
   - Verify backend is running (http://localhost:8080/api/books should show book data)
   - Check MongoDB connection in Compass
   - Try running the seed script again

3. **Module not found errors**
   - Ensure you're in the correct directory when running commands
   - Verify all dependencies are installed
   - Check package.json exists in both root and BookStoreFE directories

### Database Management

1. **Using MongoDB Compass**
   - Connect to: `mongodb://localhost:27017`
   - Select `bookstore` database
   - View/edit books in the `books` collection

2. **Reset Database**
   ```bash
   # From project root
   node scripts/seed-database.js
   ```

## Development Notes

- Backend runs on port 8080
- Frontend runs on port 5173
- MongoDB runs on port 27017
- All book images should be placed in `BookStoreFE/src/assets/pic/`
- Edit `scripts/seed-database.js` to modify book data

## API Endpoints

- GET `/api/books` - Get all books
- GET `/api/books/:id` - Get book by ID
- GET `/api/books/category/:category` - Get books by category
- GET `/api/books/bestsellers` - Get best-selling books
- GET `/api/books/newreleases` - Get new releases

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 
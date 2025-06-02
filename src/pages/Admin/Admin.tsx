import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';
import './Admin.scss';

interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  discount?: number;
  rating?: number;
  language?: string;
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  stock: number;
  isbn?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  isPopular?: boolean;
  salesCount?: number;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    console.log('Admin component mounted');
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      console.log('Fetching books...');
      const response = await api.get(API_ENDPOINTS.BOOKS.LIST);
      console.log('Books response:', response.data);
      setBooks(response.data.books);
      setError('');
    } catch (err: unknown) {
      console.error('Error fetching books:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error loading books';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (bookId: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`${API_ENDPOINTS.BOOKS.DELETE}/${bookId}`);
        await fetchBooks();
        setError('');
      } catch (err: unknown) {
        console.error('Error deleting book:', err);
        const errorMessage = err instanceof Error ? err.message : 'Error deleting book';
        setError(errorMessage);
      }
    }
  };

  const handleUpdateBook = async (updatedBook: Book) => {
    try {
      await api.put(`${API_ENDPOINTS.BOOKS.UPDATE}/${updatedBook._id}`, updatedBook);
      await fetchBooks();
      setIsEditModalOpen(false);
      setSelectedBook(null);
      setError('');
    } catch (err: unknown) {
      console.error('Error updating book:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error updating book';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <Navbar />
        <div className="admin-content">
          <h1>Loading books...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Book Management</h1>
          <div className="header-buttons">
            <button className="orders-button" onClick={() => navigate('/admin/orders')}>
              Orders Management
            </button>
            <button className="add-book-button" onClick={() => navigate('/admin/add-book')}>
              Add New Book
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="books-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img src={book.imageUrl} alt={book.title} className="book-image" />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>${book.price.toFixed(2)}</td>
                  <td>{book.stock}</td>
                  <td>{book.category}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditModalOpen && selectedBook && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Edit Book</h2>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBook(selectedBook);
              }}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={selectedBook.title}
                    onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={selectedBook.author}
                    onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={selectedBook.price}
                    onChange={(e) => setSelectedBook({ ...selectedBook, price: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input
                    type="number"
                    value={selectedBook.stock}
                    onChange={(e) => setSelectedBook({ ...selectedBook, stock: Number(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={selectedBook.category}
                    onChange={(e) => setSelectedBook({ ...selectedBook, category: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={selectedBook.description}
                    onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    value={selectedBook.imageUrl}
                    onChange={(e) => setSelectedBook({ ...selectedBook, imageUrl: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    value={selectedBook.discount || 0}
                    onChange={(e) => setSelectedBook({ ...selectedBook, discount: Number(e.target.value) })}
                  />
                </div>
                <div className="modal-buttons">
                  <button type="submit" className="save-button">Save Changes</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setSelectedBook(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 
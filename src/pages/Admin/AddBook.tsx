import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';
import './Admin.scss';

interface BookFormData {
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  discount?: number;
  language?: string;
  pages?: number;
  publisher?: string;
  publishedDate?: string;
  isbn?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  isPopular?: boolean;
}

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stock: 0,
    discount: 0,
    language: '',
    pages: 0,
    publisher: '',
    publishedDate: '',
    isbn: '',
    isFeatured: false,
    isBestSeller: false,
    isNewRelease: false,
    isPopular: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post(API_ENDPOINTS.BOOKS.CREATE, formData);
      navigate('/admin');
    } catch (err: unknown) {
      console.error('Error creating book:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error creating book';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Add New Book</h1>
          <button className="back-button" onClick={() => navigate('/admin')}>
            Back to Book List
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label>Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Pages</label>
            <input
              type="number"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Published Date</label>
            <input
              type="date"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleCheckboxChange}
              />
              Featured Book
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleCheckboxChange}
              />
              Best Seller
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isNewRelease"
                checked={formData.isNewRelease}
                onChange={handleCheckboxChange}
              />
              New Release
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleCheckboxChange}
              />
              Popular Book
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/admin')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook; 
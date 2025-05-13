import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating, Chip, Snackbar, Alert, Tooltip } from '@mui/material';
import BookReviews from '@/components/BookReviews/BookReviews';
import './BookDetail.scss';
import Navbar from '@/components/Navbar/Navbar';

// Import all book data
import featuredBooks from '@/data/featuredBooks.json';
import bestSellers from '@/data/bestSellers.json';
import newReleases from '@/data/newReleases.json';
import mockReviews from '@/data/mockReviews.json';
import categories from '@/data/categories.json';

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    rating: number;
    discount?: number;
    description: string;
    category: string;
    language: string;
    pages: number;
    publisher: string;
    publishedDate: string;
}

interface Category {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [book, setBook] = useState<Book | null>(null);
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
    const [bookCategory, setBookCategory] = useState<Category | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        // Combine all books data
        const allBooks = [...featuredBooks, ...bestSellers, ...newReleases];
        
        // Find the book by id
        const foundBook = allBooks.find(b => b.id === id);
        if (foundBook) {
            setBook(foundBook);
            // Find related books based on category
            const related = allBooks
                .filter(b => b.id !== id && b.category === foundBook.category)
                .slice(0, 4);
            setRelatedBooks(related);

            // Find category details
            const categoryDetails = categories.find(c => c.name === foundBook.category);
            if (categoryDetails) {
                setBookCategory(categoryDetails);
            }
        }
    }, [id]);

    const handleAddToCart = () => {
        setSnackbar({
            open: true,
            message: `${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book?.title}" added to cart`,
            severity: 'success'
        });
    };

    const handleAddToWishlist = () => {
        setSnackbar({
            open: true,
            message: `"${book?.title}" added to wishlist`,
            severity: 'success'
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    if (!book) {
        return <div className="book-detail-page">Book not found</div>;
    }

    return (
        <div className="book-detail-page">
            <Navbar />
            <div className="book-detail-content">
                <div className="book-main">
                    <div className="book-image">
                        <img src={book.imageUrl} alt={book.title} />
                    </div>
                    <div className="book-info">
                        <h1>{book.title}</h1>
                        <p className="author">by {book.author}</p>
                        <div className="rating">
                            <Rating value={book.rating} precision={0.5} readOnly />
                            <span className="rating-value">{book.rating}</span>
                        </div>
                        {bookCategory && (
                            <Tooltip title={bookCategory.description}>
                                <div className="category">
                                    <Chip
                                        label={bookCategory.name}
                                        size="small"
                                        className="category-chip"
                                        onClick={() => navigate(`/category/${bookCategory.id}`)}
                                    />
                                </div>
                            </Tooltip>
                        )}
                        <div className="price">
                            {book.discount ? (
                                <>
                                    <span className="original-price">${book.price.toFixed(2)}</span>
                                    <span className="discounted-price">
                                        ${(book.price * (1 - book.discount / 100)).toFixed(2)}
                                    </span>
                                    <span className="discount-badge">-{book.discount}%</span>
                                </>
                            ) : (
                                <span className="current-price">${book.price.toFixed(2)}</span>
                            )}
                        </div>
                        <div className="quantity-selector">
                            <button
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button 
                                className="add-to-cart" 
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                            <button className="add-to-wishlist" onClick={handleAddToWishlist}>
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>

                <div className="book-details">
                    <h2>Book Details</h2>
                    <div className="details-grid">
                        <div className="detail-item">
                            <span className="label">Publisher:</span>
                            <span className="value">{book.publisher}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Published Date:</span>
                            <span className="value">{new Date(book.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Pages:</span>
                            <span className="value">{book.pages}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Language:</span>
                            <span className="value">{book.language}</span>
                        </div>
                        {bookCategory && (
                            <div className="detail-item">
                                <span className="label">Category:</span>
                                <span className="value">{bookCategory.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="book-description">
                    <h2>Description</h2>
                    <p>{book.description}</p>
                </div>

                <div className="book-reviews">
                    <BookReviews 
                        reviews={mockReviews}
                        onAddReview={(review) => {
                            console.log('New review:', review);
                            // Implement review submission logic here
                        }}
                    />
                </div>

                {relatedBooks.length > 0 && (
                    <div className="related-books">
                        <h2>You May Also Like</h2>
                        <div className="related-books-grid">
                            {relatedBooks.map(relatedBook => (
                                <div
                                    key={relatedBook.id}
                                    className="related-book-card"
                                    onClick={() => navigate(`/book/${relatedBook.id}`)}
                                >
                                    <img src={relatedBook.imageUrl} alt={relatedBook.title} />
                                    <h3>{relatedBook.title}</h3>
                                    <p className="author">by {relatedBook.author}</p>
                                    <div className="book-meta">
                                        <Rating value={relatedBook.rating} size="small" readOnly />
                                        <span className="price">
                                            {relatedBook.discount ? (
                                                <>
                                                    <span className="original-price">
                                                        ${relatedBook.price.toFixed(2)}
                                                    </span>
                                                    <span className="discounted-price">
                                                        ${(relatedBook.price * (1 - relatedBook.discount / 100)).toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="current-price">
                                                    ${relatedBook.price.toFixed(2)}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default BookDetail; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Rating, Chip, Snackbar, Alert } from '@mui/material';
import BookReviews from '@/components/BookReviews/BookReviews';
import { mockBooks, Book } from '@/data/mockBooks';
import './BookDetail.scss';
import Navbar from '@/components/Navbar/Navbar';

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [book, setBook] = useState<Book | null>(null);
    const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    useEffect(() => {
        // In a real app, this would be an API call
        const foundBook = mockBooks.find(b => b.id === id);
        if (foundBook) {
            setBook(foundBook);
            // Find related books based on category and tags
            const related = mockBooks
                .filter(b => b.id !== id && 
                    (b.category === foundBook.category || 
                     b.tags.some(tag => foundBook.tags.includes(tag))))
                .slice(0, 4);
            setRelatedBooks(related);
        }
    }, [id]);

    const handleAddToCart = () => {
        // In a real app, this would call an API
        setSnackbar({
            open: true,
            message: `${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book?.title}" added to cart`,
            severity: 'success'
        });
    };

    const handleAddToWishlist = () => {
        // In a real app, this would call an API
        setSnackbar({
            open: true,
            message: `"${book?.title}" added to wishlist`,
            severity: 'success'
        });
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (book && newQuantity >= 1 && newQuantity <= book.stock) {
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
                        <div className="tags">
                            {book.tags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    className="tag-chip"
                                />
                            ))}
                        </div>
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
                        <div className="stock-info">
                            {book.stock > 0 ? (
                                <span className="in-stock">In Stock ({book.stock} available)</span>
                            ) : (
                                <span className="out-of-stock">Out of Stock</span>
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
                                disabled={quantity >= book.stock}
                            >
                                +
                            </button>
                        </div>
                        <div className="action-buttons">
                            <button 
                                className="add-to-cart" 
                                onClick={handleAddToCart}
                                disabled={book.stock === 0}
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
                        <div className="detail-item">
                            <span className="label">ISBN:</span>
                            <span className="value">{book.isbn}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Format:</span>
                            <span className="value">{book.format}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Dimensions:</span>
                            <span className="value">{book.dimensions}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Weight:</span>
                            <span className="value">{book.weight}</span>
                        </div>
                    </div>
                </div>

                <div className="book-description">
                    <h2>Description</h2>
                    <p>{book.description}</p>
                </div>

                <div className="book-reviews">
                    <BookReviews bookId={id || ''} reviews={book.reviews} />
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
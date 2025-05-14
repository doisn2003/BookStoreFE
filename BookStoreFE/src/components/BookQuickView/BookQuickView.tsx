import React from 'react';
import Modal from 'react-modal';
import { Rating } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './BookQuickView.scss';

interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    rating?: number;
    discount?: number;
    description?: string;
    category?: string;
    language?: string;
    pages?: number;
    publisher?: string;
    publishedDate?: string;
}

interface BookQuickViewProps {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
    onAddToWishlist: (bookId: string) => void;
    onAddToCart: (bookId: string) => void;
}

const BookQuickView: React.FC<BookQuickViewProps> = ({
    book,
    isOpen,
    onClose,
    onAddToWishlist,
    onAddToCart,
}) => {
    const discountedPrice = book.discount ? book.price * (1 - book.discount / 100) : book.price;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="book-quick-view-modal"
            overlayClassName="book-quick-view-overlay"
        >
            <div className="book-quick-view">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="book-content">
                    <div className="book-image">
                        <img src={book.imageUrl} alt={book.title} />
                        {book.discount > 0 && (
                            <div className="discount-badge">-{book.discount}%</div>
                        )}
                    </div>
                    <div className="book-details">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">by {book.author}</p>
                        
                        {book.rating && (
                            <div className="book-rating">
                                <Rating value={book.rating} precision={0.5} readOnly />
                                <span>({book.rating})</span>
                            </div>
                        )}

                        <div className="book-price">
                            {book.discount > 0 && (
                                <span className="original-price">${book.price.toFixed(2)}</span>
                            )}
                            <span className="current-price">${discountedPrice.toFixed(2)}</span>
                        </div>

                        {book.description && (
                            <div className="book-description">
                                <h3>Description</h3>
                                <p>{book.description}</p>
                            </div>
                        )}

                        <div className="book-meta">
                            {book.category && (
                                <div className="meta-item">
                                    <span>Category:</span> {book.category}
                                </div>
                            )}
                            {book.language && (
                                <div className="meta-item">
                                    <span>Language:</span> {book.language}
                                </div>
                            )}
                            {book.pages && (
                                <div className="meta-item">
                                    <span>Pages:</span> {book.pages}
                                </div>
                            )}
                            {book.publisher && (
                                <div className="meta-item">
                                    <span>Publisher:</span> {book.publisher}
                                </div>
                            )}
                            {book.publishedDate && (
                                <div className="meta-item">
                                    <span>Published:</span> {book.publishedDate}
                                </div>
                            )}
                        </div>

                        <div className="book-actions">
                            <button
                                className="action-button wishlist"
                                onClick={() => onAddToWishlist(book.id)}
                            >
                                <FavoriteIcon /> Add to Wishlist
                            </button>
                            <button
                                className="action-button cart"
                                onClick={() => onAddToCart(book.id)}
                            >
                                <ShoppingCartIcon /> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BookQuickView; 
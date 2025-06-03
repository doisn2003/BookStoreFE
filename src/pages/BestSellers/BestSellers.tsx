import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating, Chip } from '@mui/material';
import Navbar from '@/components/Navbar/Navbar';
import bestSellers from '@/data/bestSellers.json';
import './BestSellers.scss';

const BestSellers: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="best-sellers-page">
            <Navbar />
            <div className="best-sellers-content">
                <div className="page-header">
                    <h1>Best Sellers</h1>
                    <p>Discover our most popular and highly-rated books</p>
                </div>

                <div className="books-grid">
                    {bestSellers.map(book => (
                        <div
                            key={book.id}
                            className="book-card"
                            onClick={() => navigate(`/book/${book.id}`)}
                        >
                            <div className="book-image">
                                <img src={book.imageUrl} alt={book.title} />
                                {book.discount && (
                                    <div className="discount-badge">
                                        -{book.discount}%
                                    </div>
                                )}
                            </div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author}</p>
                                <div className="rating">
                                    <Rating value={book.rating} precision={0.5} readOnly size="small" />
                                    <span className="rating-value">{book.rating}</span>
                                </div>
                                <Chip
                                    label={book.category}
                                    size="small"
                                    className="category-chip"
                                />
                                <div className="price">
                                    {book.discount ? (
                                        <>
                                            <span className="original-price">
                                                ${book.price.toFixed(2)}
                                            </span>
                                            <span className="discounted-price">
                                                ${(book.price * (1 - book.discount / 100)).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="current-price">
                                            ${book.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellers; 
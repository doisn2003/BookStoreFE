import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import './BookCard.scss';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';

interface BookCardProps {
    id: string;
    title: string;
    author: string;
    price: number;
    imageUrl: string;
    rating: number;
    discount?: number;
    onAddToCart?: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
    id,
    title,
    author,
    price,
    imageUrl,
    rating,
    discount,
    onAddToCart
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/book/${id}`);
    };

    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [error, setError] = useState('');

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            setIsAddingToCart(true);
            setError('');
            await api.post(API_ENDPOINTS.CART.ADD, { bookId: id, quantity: 1 });
            if (onAddToCart) {
                onAddToCart(id);
            }
        } catch (err: any) {
            console.error('Error adding to cart:', err);
            setError(err.response?.data?.message || 'Error adding to cart');
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div className="book-card" onClick={handleClick}>
            <div className="book-image">
                <img src={imageUrl} alt={title} />
                {discount && (
                    <div className="discount-badge">
                        -{discount}%
                    </div>
                )}
            </div>
            <div className="book-info">
                <h3>{title}</h3>
                <p className="author">{author}</p>
                <div className="rating">
                    <Rating value={rating} precision={0.5} readOnly size="small" />
                    <span className="rating-value">({rating})</span>
                </div>
                <div className="price">
                    {discount ? (
                        <>
                            <span className="original-price">${price.toFixed(2)}</span>
                            <span className="discounted-price">
                                ${(price * (1 - discount / 100)).toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className="current-price">${price.toFixed(2)}</span>
                    )}
                </div>
                <button 
                    className={`add-to-cart ${isAddingToCart ? 'loading' : ''} ${error ? 'error' : ''}`} 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                >
                    {isAddingToCart ? 'Adding...' : error ? 'Failed' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default BookCard;
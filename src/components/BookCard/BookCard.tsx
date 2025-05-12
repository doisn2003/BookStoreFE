import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import './BookCard.scss';

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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(id);
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
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default BookCard; 
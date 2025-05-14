import React, { useState } from 'react';
import { Rating, TextField, Button, Avatar } from '@mui/material';
import './BookReviews.scss';

interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
}

interface BookReviewsProps {
    reviews: Review[];
    onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

const BookReviews: React.FC<BookReviewsProps> = ({ reviews, onAddReview }) => {
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.rating === 0 || !newReview.comment.trim()) return;

        onAddReview({
            userId: 'current-user-id', // This should come from auth context
            userName: 'Current User', // This should come from auth context
            rating: newReview.rating,
            comment: newReview.comment.trim(),
        });

        setNewReview({ rating: 0, comment: '' });
    };

    const averageRating = reviews.length
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

    return (
        <div className="book-reviews">
            <div className="reviews-header">
                <h3>Customer Reviews</h3>
                <div className="average-rating">
                    <Rating value={averageRating} precision={0.5} readOnly />
                    <span>({reviews.length} reviews)</span>
                </div>
            </div>

            <form className="review-form" onSubmit={handleSubmit}>
                <h4>Write a Review</h4>
                <div className="rating-input">
                    <Rating
                        value={newReview.rating}
                        onChange={(_event, value) => setNewReview(prev => ({ ...prev, rating: value || 0 }))}
                        precision={0.5}
                    />
                </div>
                <TextField
                    multiline
                    rows={4}
                    placeholder="Write your review here..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={newReview.rating === 0 || !newReview.comment.trim()}
                >
                    Submit Review
                </Button>
            </form>

            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                        <div className="review-header">
                            <div className="reviewer-info">
                                <Avatar src={review.userAvatar} alt={review.userName}>
                                    {review.userName[0]}
                                </Avatar>
                                <div>
                                    <h4>{review.userName}</h4>
                                    <span className="review-date">{review.date}</span>
                                </div>
                            </div>
                            <Rating value={review.rating} readOnly />
                        </div>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookReviews; 
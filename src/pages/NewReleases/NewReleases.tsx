import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import newReleasesData from '../../data/newReleases.json';
import './NewReleases.scss';
import Navbar from '@/components/Navbar/Navbar';

const NewReleases: React.FC = () => {
    const navigate = useNavigate();

    const handleBookClick = (bookId: string) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div className="new-releases-page">
            <Navbar />
            <div className="new-releases-content">
                <div className="page-header">
                    <h1>New Releases</h1>
                    <p>Discover the latest books that have just hit the shelves</p>
                </div>

                <div className="books-grid">
                    {newReleasesData.map((book) => (
                        <div
                            key={book.id}
                            className="book-card"
                            onClick={() => handleBookClick(book.id)}
                        >
                            <div className="book-image">
                                <img src={book.imageUrl} alt={book.title} />
                                {book.discount && (
                                    <div className="discount-badge">
                                        {book.discount}% OFF
                                    </div>
                                )}
                            </div>
                            <div className="book-info">
                                <h3>{book.title}</h3>
                                <div className="author">{book.author}</div>
                                <div className="rating">
                                    <Rating
                                        value={book.rating}
                                        precision={0.5}
                                        readOnly
                                        size="small"
                                        emptyIcon={
                                            <StarIcon
                                                style={{ opacity: 0.55 }}
                                                fontSize="inherit"
                                            />
                                        }
                                    />
                                    <span className="rating-value">
                                        {book.rating}
                                    </span>
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
                                                $
                                                {(
                                                    book.price *
                                                    (1 - book.discount / 100)
                                                ).toFixed(2)}
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

export default NewReleases; 
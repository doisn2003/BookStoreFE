import React from 'react';
import BookCard from '@/components/BookCard/BookCard';
import './Wishlist.scss';
import Navbar from '@/components/Navbar/Navbar';

// Mock wishlist data
const wishlistItems = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.5,
        discount: 20,
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
        category: 'Fiction',
        language: 'English',
        pages: 180,
        publisher: 'Scribner',
        publishedDate: '2004-09-30'
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.8,
        description: 'The story of racial injustice and the loss of innocence in the American South.',
        category: 'Fiction',
        language: 'English',
        pages: 281,
        publisher: 'Grand Central Publishing',
        publishedDate: '1988-10-11'
    },
    // Add more wishlist items...
];

const Wishlist: React.FC = () => {
    const handleRemoveFromWishlist = (bookId: string) => {
        console.log('Removed from wishlist:', bookId);
        // Implement remove from wishlist logic here
    };

    const handleAddToCart = (bookId: string) => {
        console.log('Added to cart:', bookId);
        // Implement add to cart logic here
    };

    return (
        <div className="wishlist-page">
            <Navbar />
            <div className="wishlist-header">
                <h1>My Wishlist</h1>
                <p>Save books you want to read later</p>
            </div>

            {wishlistItems.length > 0 ? (
                <div className="wishlist-content">
                    <div className="wishlist-grid">
                        {wishlistItems.map(book => (
                            <div key={book.id} className="wishlist-item">
                                <BookCard {...book} />
                                <div className="wishlist-actions">
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemoveFromWishlist(book.id)}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        className="add-to-cart-button"
                                        onClick={() => handleAddToCart(book.id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty</p>
                    <button className="browse-books-button">Browse Books</button>
                </div>
            )}
        </div>
    );
};

export default Wishlist; 
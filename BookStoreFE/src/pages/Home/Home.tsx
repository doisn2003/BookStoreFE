import React, { useState, useEffect } from 'react';
import './Home.scss';
import Navbar from '@/components/Navbar/Navbar';
import BookSlider from '@/components/BookSlider/BookSlider';
import BookQuickView from '@/components/BookQuickView/BookQuickView';
import BookReviews from '@/components/BookReviews/BookReviews';
import { mongoService } from '@/services/mongoService';
import type { Book, Review } from '@/data/mockBooks';

const popularCategories = [
    { id: '1', name: 'Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '2', name: 'Non-Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '3', name: 'Science Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '4', name: 'Biography', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
];

const Home: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
    const [bestSellers, setBestSellers] = useState<Book[]>([]);
    const [newReleases, setNewReleases] = useState<Book[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                // Fetch all books for featured section
                console.log('Fetching all books...');
                const allBooks = await mongoService.getAllBooks();
                console.log('Fetched books:', allBooks);
                
                if (allBooks && allBooks.length > 0) {
                    setFeaturedBooks(allBooks.slice(0, 2));
                    
                    // Use the first book's reviews if available
                    if (allBooks[0].reviews) {
                        setReviews(allBooks[0].reviews);
                    }
                    
                    // Since we have issues with bestsellers/new releases endpoints,
                    // let's use the same books for now
                    setBestSellers(allBooks);
                    setNewReleases(allBooks);
                } else {
                    setError('No books found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch books');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddToWishlist = (bookId: string) => {
        console.log('Added to wishlist:', bookId);
        // Implement wishlist logic here
    };

    const handleAddToCart = (bookId: string) => {
        console.log('Added to cart:', bookId);
        // Implement cart logic here
    };

    const handleAddReview = (review: Omit<Review, 'id' | 'date'>) => {
        console.log('New review:', review);
        // Implement review submission logic here
    };

    return (
        <div className='home-container'>
            <Navbar />
            <main className="home">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Discover Your Next Favorite Book</h1>
                        <p>Explore our vast collection of books across all genres</p>
                        <button className="cta-button">Shop Now</button>
                    </div>
                </section>

                {isLoading ? (
                    <div className="loading">Loading books...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <>
                        {/* Featured Books Section */}
                        <BookSlider title="Featured Books" books={featuredBooks} />

                        {/* Best Sellers Section */}
                        <BookSlider title="Best Sellers" books={bestSellers} />

                        {/* New Releases Section */}
                        <BookSlider title="New Releases" books={newReleases} />
                    </>
                )}

                {/* Popular Categories Section */}
                <section className="section">
                    <h2 className="section-title">Popular Categories</h2>
                    <div className="categories-grid">
                        {popularCategories.map(category => (
                            <div key={category.id} className="category-card">
                                <img src={category.imageUrl} alt={category.name} />
                                <h3>{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Book Reviews Section */}
                <section className="section">
                    <BookReviews
                        reviews={reviews}
                        onAddReview={handleAddReview}
                    />
                </section>

                {/* Newsletter Section */}
                <section className="newsletter-section">
                    <div className="newsletter-content">
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Get updates on new releases, special offers, and more!</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </section>

                {/* Quick View Modal */}
                {selectedBook && (
                    <BookQuickView
                        book={selectedBook}
                        isOpen={!!selectedBook}
                        onClose={() => setSelectedBook(null)}
                        onAddToWishlist={handleAddToWishlist}
                        onAddToCart={handleAddToCart}
                    />
                )}
            </main>
        </div>
    );
};

export default Home; 
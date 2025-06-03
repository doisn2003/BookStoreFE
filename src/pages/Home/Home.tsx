import React, { useState } from 'react';
import './Home.scss';
import Navbar from '@/components/Navbar/Navbar';
import BookSlider from '@/components/BookSlider/BookSlider';
import BookQuickView from '@/components/BookQuickView/BookQuickView';
import BookReviews from '@/components/BookReviews/BookReviews';
import Footer from '@/components/Footer/Footer';

// Import data from JSON files
import featuredBooks from '@/data/featuredBooks.json';
import bestSellers from '@/data/bestSellers.json';
import newReleases from '@/data/newReleases.json';
import popularCategories from '@/data/popularCategories.json';
import mockReviews from '@/data/mockReviews.json';

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

interface Review {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    rating: number;
    comment: string;
    date: string;
}

const Home: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
        <div className="home-page">
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

                {/* Featured Books Section */}
                <BookSlider title="Featured Books" books={featuredBooks} />

                {/* Best Sellers Section */}
                <BookSlider title="Best Sellers" books={bestSellers} />

                {/* New Releases Section */}
                <BookSlider title="New Releases" books={newReleases} />

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
                        reviews={mockReviews}
                        onAddReview={handleAddReview}
                    />
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
            <Footer />
        </div>
    );
};

export default Home; 
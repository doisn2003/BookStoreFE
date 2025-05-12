import React, { useState } from 'react';
import './Home.scss';
import Navbar from '@/components/Navbar/Navbar';
import BookSlider from '@/components/BookSlider/BookSlider';
import BookQuickView from '@/components/BookQuickView/BookQuickView';
import BookReviews from '@/components/BookReviews/BookReviews';

// Temporary mock data
const featuredBooks = [
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
    // Add more books...
];

const bestSellers = [
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.7,
        discount: 15,
        description: 'A dystopian social science fiction novel and cautionary tale.',
        category: 'Science Fiction',
        language: 'English',
        pages: 328,
        publisher: 'Signet Classic',
        publishedDate: '1961-01-01'
    },
    {
        id: '4',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 12.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.6,
        description: 'A romantic novel of manners.',
        category: 'Fiction',
        language: 'English',
        pages: 279,
        publisher: 'Penguin Classics',
        publishedDate: '2002-12-31'
    },
    // Add more books...
];

const newReleases = [
    {
        id: '5',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.4,
        description: 'A dazzling novel about all the choices that go into a life well lived.',
        category: 'Fiction',
        language: 'English',
        pages: 304,
        publisher: 'Viking',
        publishedDate: '2020-09-29'
    },
    {
        id: '6',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        price: 18.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.9,
        discount: 10,
        description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller.',
        category: 'Science Fiction',
        language: 'English',
        pages: 496,
        publisher: 'Ballantine Books',
        publishedDate: '2021-05-04'
    },
    // Add more books...
];

const popularCategories = [
    { id: '1', name: 'Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '2', name: 'Non-Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '3', name: 'Science Fiction', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
    { id: '4', name: 'Biography', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
];

// Mock reviews data
const mockReviews = [
    {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        comment: 'Great book! I couldn\'t put it down.',
        date: '2024-03-15'
    },
    {
        id: '2',
        userId: 'user2',
        userName: 'Jane Smith',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        rating: 4,
        comment: 'Very well written and engaging.',
        date: '2024-03-14'
    },
];

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
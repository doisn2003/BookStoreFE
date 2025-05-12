import React, { useState } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import './BestSellers.scss';
import Navbar from '@/components/Navbar/Navbar';
// Mock best sellers data
const bestSellers = [
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
    // Add more best sellers...
];

const BestSellers: React.FC = () => {
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    const handleFilterChange = (newFilters: BookFilters) => {
        setFilters(newFilters);
        // Implement filtering logic here
    };

    return (
        <div className="best-sellers-page">
            <Navbar />
            <div className="best-sellers-header">
                <h1>Best Sellers</h1>
                <p>Discover our most popular and highly-rated books</p>
            </div>

            <div className="best-sellers-content">
                <div className="books-filter">
                    <BookFilter onFilterChange={handleFilterChange} />
                </div>

                <div className="books-grid">
                    {bestSellers.map(book => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellers; 
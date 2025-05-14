import React, { useState, useEffect } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import type { Book } from '@/data/mockBooks';
import { mongoService } from '@/services/mongoService';
import './BestSellers.scss';
import Navbar from '@/components/Navbar/Navbar';

const BestSellers: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const bestSellers = await mongoService.getBestSellers();
                setBooks(bestSellers);
            } catch (error) {
                console.error('Error fetching best sellers:', error);
            }
        };

        fetchBestSellers();
    }, []);

    // Apply filters to books
    const filteredBooks = books.filter(book => {
        const matchesPrice = book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1];
        const matchesCategory = filters.category === 'All Categories' || book.category === filters.category;
        const matchesRating = book.rating >= filters.rating;
        const matchesLanguage = filters.language === 'All Languages' || book.language === filters.language;
        
        return matchesPrice && matchesCategory && matchesRating && matchesLanguage;
    });

    const handleFilterChange = (newFilters: BookFilters) => {
        setFilters(newFilters);
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
                    {filteredBooks.map(book => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BestSellers; 
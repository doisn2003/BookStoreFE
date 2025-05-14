import React, { useState, useEffect } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import type { Book } from '@/data/mockBooks';
import { mongoService } from '@/services/mongoService';
import './NewReleases.scss';
import Navbar from '@/components/Navbar/Navbar';

const NewReleases: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    useEffect(() => {
        const fetchNewReleases = async () => {
            try {
                const newReleases = await mongoService.getNewReleases();
                setBooks(newReleases);
            } catch (error) {
                console.error('Error fetching new releases:', error);
            }
        };

        fetchNewReleases();
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
        <div className="new-releases-page">
            <Navbar />
            <div className="new-releases-header">
                <h1>New Releases</h1>
                <p>Discover the latest books that have just hit our shelves</p>
            </div>

            <div className="new-releases-content">
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

export default NewReleases; 
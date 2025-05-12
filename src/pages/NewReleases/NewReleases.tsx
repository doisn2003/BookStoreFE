import React, { useState } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import './NewReleases.scss';
import Navbar from '@/components/Navbar/Navbar';

// Mock new releases data
const newReleases = [
    {
        id: '1',
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
        id: '2',
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
    // Add more new releases...
];

const NewReleases: React.FC = () => {
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
                    {newReleases.map(book => (
                        <BookCard key={book.id} {...book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewReleases; 
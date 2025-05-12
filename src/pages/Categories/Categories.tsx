import React, { useState } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import './Categories.scss';
import Navbar from '@/components/Navbar/Navbar';

// Mock categories data
const categories = [
    {
        id: '1',
        name: 'Fiction',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        bookCount: 150
    },
    {
        id: '2',
        name: 'Non-Fiction',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        bookCount: 120
    },
    {
        id: '3',
        name: 'Science Fiction',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        bookCount: 80
    },
    {
        id: '4',
        name: 'Mystery',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        bookCount: 90
    },
    // Add more categories...
];

// Mock books data
const books = [
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
    // Add more books...
];

const Categories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleFilterChange = (newFilters: BookFilters) => {
        setFilters(newFilters);
        // Implement filtering logic here
    };

    return (
        <div className="categories-page">
            <Navbar />
            <div className="categories-header">
                <h1>Book Categories</h1>
                <p>Explore our wide range of book categories</p>
            </div>

            <div className="categories-content">
                <div className="categories-grid">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(category.id)}
                        >
                            <div className="category-image">
                                <img src={category.imageUrl} alt={category.name} />
                            </div>
                            <div className="category-info">
                                <h3>{category.name}</h3>
                                <p className="book-count">{category.bookCount} books</p>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="category-books">
                        <div className="books-header">
                            <h2>{categories.find(c => c.id === selectedCategory)?.name}</h2>
                            <div className="books-filter">
                                <BookFilter onFilterChange={handleFilterChange} />
                            </div>
                        </div>
                        <div className="books-grid">
                            {books.map(book => (
                                <BookCard key={book.id} {...book} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Categories; 
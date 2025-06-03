import React, { useState, useEffect } from 'react';
import newReleases from '@/data/newReleases.json';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import './Categories.scss';
import Navbar from '@/components/Navbar/Navbar';

const Categories: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(newReleases.map(book => book.category)));
        const categorizedBooks = uniqueCategories.map(category => ({
            name: category,
            books: newReleases.filter(book => book.category === category)
        }));
        setCategories(categorizedBooks);
    }, []);

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
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
                            key={category.name}
                            className={`category-card ${selectedCategory === category.name ? 'selected' : ''}`}
                            onClick={() => handleCategorySelect(category.name)}
                        >
                            <div className="category-info">
                                <h3>{category.name}</h3>
                                <p className="book-count">{category.books.length} books</p>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedCategory && (
                    <div className="category-books">
                        <div className="books-header">
                            <h2>{selectedCategory}</h2>
                        </div>
                        <div className="books-grid">
                            {categories.find(c => c.name === selectedCategory)?.books.map(book => (
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
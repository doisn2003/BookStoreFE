import React, { useState, useEffect } from 'react';
import BookFilter from '@/components/BookFilter/BookFilter';
import BookCard from '@/components/BookCard/BookCard';
import type { BookFilters } from '@/components/BookFilter/BookFilter';
import type { Book } from '@/data/mockBooks';
import { mongoService } from '@/services/mongoService';
import './Categories.scss';
import Navbar from '@/components/Navbar/Navbar';

interface Category {
    id: string;
    name: string;
    imageUrl: string;
    bookCount: number;
}

const Categories: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    // Fetch all books and derive categories
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await mongoService.getAllBooks();
                
                // Derive categories from books
                const categoryMap = allBooks.reduce((acc, book) => {
                    if (!acc[book.category]) {
                        acc[book.category] = {
                            id: book.category.toLowerCase().replace(/\s+/g, '-'),
                            name: book.category,
                            imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
                            bookCount: 1
                        };
                    } else {
                        acc[book.category].bookCount++;
                    }
                    return acc;
                }, {} as Record<string, Category>);

                setCategories(Object.values(categoryMap));
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    // Fetch books when category is selected
    useEffect(() => {
        const fetchCategoryBooks = async () => {
            if (!selectedCategory) return;

            try {
                const selectedCategoryName = categories.find(c => c.id === selectedCategory)?.name;
                if (selectedCategoryName) {
                    const categoryBooks = await mongoService.getBooksByCategory(selectedCategoryName);
                    setBooks(categoryBooks);
                }
            } catch (error) {
                console.error('Error fetching category books:', error);
            }
        };

        fetchCategoryBooks();
    }, [selectedCategory, categories]);

    // Apply filters to books
    const filteredBooks = books.filter(book => {
        const matchesPrice = book.price >= filters.priceRange[0] && book.price <= filters.priceRange[1];
        const matchesRating = book.rating >= filters.rating;
        const matchesLanguage = filters.language === 'All Languages' || book.language === filters.language;
        
        return matchesPrice && matchesRating && matchesLanguage;
    });

    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleFilterChange = (newFilters: BookFilters) => {
        setFilters(newFilters);
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
                            {filteredBooks.map(book => (
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
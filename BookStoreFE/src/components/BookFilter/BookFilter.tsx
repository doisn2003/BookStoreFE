import React, { useState } from 'react';
import { Slider, FormControl, Select, MenuItem, Rating, SelectChangeEvent } from '@mui/material';
import './BookFilter.scss';

interface BookFilterProps {
    onFilterChange: (filters: BookFilters) => void;
}

export interface BookFilters {
    priceRange: [number, number];
    category: string;
    rating: number;
    language: string;
}

const categories = [
    'All Categories',
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Biography',
    'History',
    'Self-Help',
    'Business',
    'Technology',
];

const languages = [
    'All Languages',
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
];

const BookFilter: React.FC<BookFilterProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<BookFilters>({
        priceRange: [0, 100],
        category: 'All Categories',
        rating: 0,
        language: 'All Languages',
    });

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        const newFilters = { ...filters, priceRange: newValue as [number, number] };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const newFilters = { ...filters, category: event.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
        const newFilters = { ...filters, rating: newValue || 0 };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        const newFilters = { ...filters, language: event.target.value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="book-filter">
            <h3>Filter Books</h3>
            
            <div className="filter-section">
                <h4>Price Range</h4>
                <Slider
                    value={filters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={100}
                    marks={[
                        { value: 0, label: '$0' },
                        { value: 100, label: '$100' },
                    ]}
                />
            </div>

            <div className="filter-section">
                <h4>Category</h4>
                <FormControl fullWidth>
                    <Select
                        value={filters.category}
                        onChange={handleCategoryChange}
                        size="small"
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="filter-section">
                <h4>Rating</h4>
                <Rating
                    value={filters.rating}
                    onChange={handleRatingChange}
                    precision={0.5}
                />
            </div>

            <div className="filter-section">
                <h4>Language</h4>
                <FormControl fullWidth>
                    <Select
                        value={filters.language}
                        onChange={handleLanguageChange}
                        size="small"
                    >
                        {languages.map((language) => (
                            <MenuItem key={language} value={language}>
                                {language}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default BookFilter; 
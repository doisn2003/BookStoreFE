import { Book } from '@/data/mockBooks';

const API_URL = 'http://localhost:8080/api';

export const mongoService = {
    async getAllBooks(): Promise<Book[]> {
        try {
            const response = await fetch(`${API_URL}/books`);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                id: item._id,
                title: item.title,
                author: item.author,
                price: item.price,
                imageUrl: item.imageUrl,
                rating: item.rating,
                discount: item.discount,
                description: item.description,
                category: item.category,
                language: item.language,
                pages: item.pages,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                isbn: item.isbn || '',
                format: item.format || 'Paperback',
                dimensions: item.dimensions || '',
                weight: item.weight || '',
                stock: item.stock || 0,
                tags: item.tags || [],
                reviews: item.reviews || []
            }));
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    },

    async getBookById(id: string): Promise<Book | null> {
        try {
            const response = await fetch(`${API_URL}/books/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const item = await response.json();
            return {
                id: item._id,
                title: item.title,
                author: item.author,
                price: item.price,
                imageUrl: item.imageUrl,
                rating: item.rating,
                discount: item.discount,
                description: item.description,
                category: item.category,
                language: item.language,
                pages: item.pages,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                isbn: item.isbn || '',
                format: item.format || 'Paperback',
                dimensions: item.dimensions || '',
                weight: item.weight || '',
                stock: item.stock || 0,
                tags: item.tags || [],
                reviews: item.reviews || []
            };
        } catch (error) {
            console.error('Error fetching book:', error);
            return null;
        }
    },

    async getBooksByCategory(category: string): Promise<Book[]> {
        try {
            const response = await fetch(`${API_URL}/books/category/${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch books by category');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                id: item._id,
                title: item.title,
                author: item.author,
                price: item.price,
                imageUrl: item.imageUrl,
                rating: item.rating,
                discount: item.discount,
                description: item.description,
                category: item.category,
                language: item.language,
                pages: item.pages,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                isbn: item.isbn || '',
                format: item.format || 'Paperback',
                dimensions: item.dimensions || '',
                weight: item.weight || '',
                stock: item.stock || 0,
                tags: item.tags || [],
                reviews: item.reviews || []
            }));
        } catch (error) {
            console.error('Error fetching books by category:', error);
            return [];
        }
    },

    async getBestSellers(): Promise<Book[]> {
        try {
            const response = await fetch(`${API_URL}/books/bestsellers`);
            if (!response.ok) {
                throw new Error('Failed to fetch best sellers');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                id: item._id,
                title: item.title,
                author: item.author,
                price: item.price,
                imageUrl: item.imageUrl,
                rating: item.rating,
                discount: item.discount,
                description: item.description,
                category: item.category,
                language: item.language,
                pages: item.pages,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                isbn: item.isbn || '',
                format: item.format || 'Paperback',
                dimensions: item.dimensions || '',
                weight: item.weight || '',
                stock: item.stock || 0,
                tags: item.tags || [],
                reviews: item.reviews || []
            }));
        } catch (error) {
            console.error('Error fetching best sellers:', error);
            return [];
        }
    },

    async getNewReleases(): Promise<Book[]> {
        try {
            const response = await fetch(`${API_URL}/books/newreleases`);
            if (!response.ok) {
                throw new Error('Failed to fetch new releases');
            }
            const data = await response.json();
            return data.map((item: any) => ({
                id: item._id,
                title: item.title,
                author: item.author,
                price: item.price,
                imageUrl: item.imageUrl,
                rating: item.rating,
                discount: item.discount,
                description: item.description,
                category: item.category,
                language: item.language,
                pages: item.pages,
                publisher: item.publisher,
                publishedDate: item.publishedDate,
                isbn: item.isbn || '',
                format: item.format || 'Paperback',
                dimensions: item.dimensions || '',
                weight: item.weight || '',
                stock: item.stock || 0,
                tags: item.tags || [],
                reviews: item.reviews || []
            }));
        } catch (error) {
            console.error('Error fetching new releases:', error);
            return [];
        }
    }
}; 
export interface Book {
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
    isbn: string;
    format: string;
    dimensions: string;
    weight: string;
    stock: number;
    tags: string[];
    reviews: Review[];
}

export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export const mockBooks: Book[] = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.5,
        discount: 20,
        description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
        category: 'Fiction',
        language: 'English',
        pages: 180,
        publisher: 'Scribner',
        publishedDate: '2004-09-30',
        isbn: '978-0743273565',
        format: 'Paperback',
        dimensions: '5.5 x 0.5 x 8.25 inches',
        weight: '0.5 pounds',
        stock: 50,
        tags: ['Classic', 'American Literature', 'Drama'],
        reviews: [
            {
                id: '1',
                userId: 'user1',
                userName: 'John Doe',
                rating: 5,
                comment: 'A timeless classic that captures the essence of the American Dream.',
                date: '2024-01-15'
            },
            {
                id: '2',
                userId: 'user2',
                userName: 'Jane Smith',
                rating: 4,
                comment: 'Beautifully written with vivid imagery.',
                date: '2024-02-01'
            }
        ]
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.8,
        description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960.',
        category: 'Fiction',
        language: 'English',
        pages: 281,
        publisher: 'Grand Central Publishing',
        publishedDate: '1988-10-11',
        isbn: '978-0446310789',
        format: 'Paperback',
        dimensions: '5.2 x 0.8 x 8 inches',
        weight: '0.6 pounds',
        stock: 75,
        tags: ['Classic', 'American Literature', 'Drama'],
        reviews: [
            {
                id: '3',
                userId: 'user3',
                userName: 'Mike Johnson',
                rating: 5,
                comment: 'A powerful story that everyone should read.',
                date: '2024-01-20'
            }
        ]
    },
    {
        id: '3',
        title: '1984',
        author: 'George Orwell',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.7,
        discount: 15,
        description: 'A dystopian social science fiction novel and cautionary tale. The novel is set in Airstrip One, formerly Great Britain, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation.',
        category: 'Science Fiction',
        language: 'English',
        pages: 328,
        publisher: 'Signet Classic',
        publishedDate: '1961-01-01',
        isbn: '978-0451524935',
        format: 'Paperback',
        dimensions: '4.2 x 0.8 x 6.8 inches',
        weight: '0.4 pounds',
        stock: 100,
        tags: ['Dystopian', 'Classic', 'Political Fiction'],
        reviews: [
            {
                id: '4',
                userId: 'user4',
                userName: 'Sarah Wilson',
                rating: 5,
                comment: 'A chilling and prophetic masterpiece.',
                date: '2024-02-10'
            }
        ]
    },
    {
        id: '4',
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.6,
        description: 'A philosophical novel that follows the journey of an Andalusian shepherd boy named Santiago who believes that recurring dreams are prophetic.',
        category: 'Fiction',
        language: 'English',
        pages: 208,
        publisher: 'HarperOne',
        publishedDate: '2014-04-15',
        isbn: '978-0062315007',
        format: 'Paperback',
        dimensions: '5.3 x 0.5 x 8 inches',
        weight: '0.4 pounds',
        stock: 60,
        tags: ['Philosophy', 'Adventure', 'Spiritual'],
        reviews: [
            {
                id: '5',
                userId: 'user5',
                userName: 'David Brown',
                rating: 4,
                comment: 'An inspiring journey of self-discovery.',
                date: '2024-02-15'
            }
        ]
    },
    {
        id: '5',
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        price: 13.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        rating: 4.3,
        discount: 10,
        description: 'The story of Holden Caulfield, a teenager who has been expelled from prep school and is wandering through New York City, trying to make sense of the world.',
        category: 'Fiction',
        language: 'English',
        pages: 277,
        publisher: 'Little, Brown and Company',
        publishedDate: '1991-05-01',
        isbn: '978-0316769488',
        format: 'Paperback',
        dimensions: '5.5 x 0.8 x 8.2 inches',
        weight: '0.5 pounds',
        stock: 45,
        tags: ['Classic', 'Coming of Age', 'American Literature'],
        reviews: [
            {
                id: '6',
                userId: 'user6',
                userName: 'Emily Davis',
                rating: 4,
                comment: 'A classic coming-of-age story that still resonates today.',
                date: '2024-02-20'
            }
        ]
    }
]; 
import axios from 'axios';

// Import local data (fallback)
import localBooks from '../../data/books.json';
import localCategories from '../../data/categories.json';
import localUsers from '../../data/users.json';
import localOrders from '../../data/orders.json';
import localCarts from '../../data/carts.json';
import localComments from '../../data/comments.json';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Helper function to handle API calls with fallback
async function apiCallWithFallback(endpoint: string, fallbackData: any) {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(`API call failed, using local data for ${endpoint}`);
    return fallbackData;
  }
}

// API functions
export const bookApi = {
  getAll: () => apiCallWithFallback('/books', localBooks),
  getById: (id: string) => apiCallWithFallback(`/books/${id}`, localBooks.find(b => b._id === id)),
  getByCategory: (category: string) => apiCallWithFallback(`/books/category/${category}`, 
    localBooks.filter(b => b.category === category)
  ),
  search: (query: string) => apiCallWithFallback(`/books/search?q=${query}`,
    localBooks.filter(b => 
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase())
    )
  ),
};

export const categoryApi = {
  getAll: () => apiCallWithFallback('/categories', localCategories),
  getById: (id: string) => apiCallWithFallback(`/categories/${id}`, 
    localCategories.find(c => c._id === id)
  ),
};

export const userApi = {
  getAll: () => apiCallWithFallback('/users', localUsers),
  getById: (id: string) => apiCallWithFallback(`/users/${id}`, 
    localUsers.find(u => u._id === id)
  ),
};

export const orderApi = {
  getAll: () => apiCallWithFallback('/orders', localOrders),
  getById: (id: string) => apiCallWithFallback(`/orders/${id}`, 
    localOrders.find(o => o._id === id)
  ),
};

export const cartApi = {
  getAll: () => apiCallWithFallback('/carts', localCarts),
  getById: (id: string) => apiCallWithFallback(`/carts/${id}`, 
    localCarts.find(c => c._id === id)
  ),
};

export const commentApi = {
  getAll: () => apiCallWithFallback('/comments', localComments),
  getById: (id: string) => apiCallWithFallback(`/comments/${id}`, 
    localComments.find(c => c._id === id)
  ),
}; 
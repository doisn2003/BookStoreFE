export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  BOOKS: {
    LIST: '/books',
    DETAIL: (id: string) => `/books/${id}`,
    CATEGORIES: '/books/categories',
    NEW_RELEASES: '/books/new-releases',
    BESTSELLERS: '/books/bestsellers',
    UPDATE: '/books/update',
    DELETE: '/books/delete',
    CREATE: '/books/create',
  },
  CART: {
    LIST: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update',
    REMOVE: '/cart/remove',
  },
  ORDERS: {
    LIST: '/orders/my-orders',
    CREATE: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
  },
  WISHLIST: {
    GET: '/wishlist',
    ADD: `/wishlist/add`,
    REMOVE: `/wishlist/remove`,
    CLEAR: '/wishlist'
  },
};

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  CATEGORIES: '/categories',
  NEW_RELEASES: '/new-releases',
  BESTSELLERS: '/bestsellers',
  WISHLIST: '/wishlist',
  CART: '/cart',
  ACCOUNT: '/account',
  BOOK_DETAIL: (id: string) => `/book/${id}`,
  ADMIN: '/admin',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
};
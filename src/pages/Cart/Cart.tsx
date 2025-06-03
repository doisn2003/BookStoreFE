import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';

interface CartItem {
    _id: string;
    book: {
        _id: string;
        title: string;
        author: string;
        price: number;
        imageUrl: string;
        discount?: number;
        stock: number;
    };
    quantity: number;
}

interface Cart {
    _id: string;
    items: CartItem[];
    totalAmount: number;
}

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCart();
    }, []);

    interface ApiError {
        response?: {
            data?: {
                message?: string;
            };
        };
        message: string;
    }

    const fetchCart = async () => {
        try {
            const response = await api.get(API_ENDPOINTS.CART.LIST);
            setCart(response.data);
            setError('');
        } catch (err: ApiError) {
            setError(err.response?.data?.message || 'Error loading cart');
            console.error('Error fetching cart:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        try {
            await api.put(API_ENDPOINTS.CART.UPDATE, { itemId, quantity: newQuantity });
            await fetchCart(); // Refresh cart data
            setError('');
        } catch (err: ApiError) {
            setError(err.response?.data?.message || 'Error updating quantity');
            console.error('Error updating quantity:', err);
        }
    };

    const handleRemoveItem = async (itemId: string) => {
        try {
            await api.delete(`${API_ENDPOINTS.CART.REMOVE}/${itemId}`);
            await fetchCart(); // Refresh cart data
            setError('');
        } catch (err: ApiError) {
            setError(err.response?.data?.message || 'Error removing item');
            console.error('Error removing item:', err);
        }
    };

    const calculateSubtotal = () => {
        if (!cart?.items) return 0;
    
        return cart.items.reduce((total, item) => {
            if (!item.book) return total; // Bỏ qua item nếu book null
    
            const itemPrice = item.book.discount
                ? item.book.price * (1 - item.book.discount / 100)
                : item.book.price;
    
            return total + itemPrice * item.quantity;
        }, 0);
    };
    

    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const total = subtotal + shipping;

    if (loading) {
        return (
            <div className="cart-page">
                <Navbar />
                <div className="cart-header">
                    <h1>Loading cart...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-page">
                <Navbar />
                <div className="cart-header">
                    <h1>Error</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <Navbar />
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>Review your items and proceed to checkout</p>
            </div>

            {cart?.items.length ? (
                <div className="cart-content">
                    <div className="cart-items">
                        {cart.items.map(item => (
                            <div key={item._id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.book.imageUrl || 'https://via.placeholder.com/150'} alt={item.book.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.book.title}</h3>
                                    <p className="author">by {item.book.author}</p>
                                    <div className="price">
                                        {item.book.discount ? (
                                            <>
                                                <span className="original-price">
                                                    ${item.book.price.toFixed(2)}
                                                </span>
                                                <span className="discounted-price">
                                                    ${(item.book.price * (1 - item.book.discount / 100)).toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="current-price">
                                                ${item.book.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="item-quantity">
                                    <button
                                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                        disabled={item.quantity >= item.book.stock}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    ${((item.book.discount ? item.book.price * (1 - item.book.discount / 100) : item.book.price) * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveItem(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-item">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-item total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button 
                            className="checkout-button"
                            onClick={() => navigate('/payment')}
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            className="continue-shopping-button"
                            onClick={() => navigate('/home')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            ) : (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button
                        className="browse-books-button"
                        onClick={() => navigate('/home')}
                    >
                        See more books
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.scss';
import Navbar from '@/components/Navbar/Navbar';

// Mock cart data
const cartItems = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        quantity: 1,
        discount: 20,
    },
    {
        id: '2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 15.99,
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        quantity: 2,
    },
    // Add more cart items...
];

const Cart: React.FC = () => {
    const navigate = useNavigate();

    const handleQuantityChange = (bookId: string, newQuantity: number) => {
        console.log('Quantity changed:', bookId, newQuantity);
        // Implement quantity change logic here
    };

    const handleRemoveItem = (bookId: string) => {
        console.log('Removed item:', bookId);
        // Implement remove item logic here
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
            return total + itemPrice * item.quantity;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const shipping = 5.99;
    const total = subtotal + shipping;

    return (
        <div className="cart-page">
            <Navbar />
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <p>Review your items and proceed to checkout</p>
            </div>

            {cartItems.length > 0 ? (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img src={item.imageUrl} alt={item.title} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p className="author">by {item.author}</p>
                                    <div className="price">
                                        {item.discount ? (
                                            <>
                                                <span className="original-price">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                                <span className="discounted-price">
                                                    ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="current-price">
                                                ${item.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="item-quantity">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemoveItem(item.id)}
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
                        <button className="checkout-button">Proceed to Checkout</button>
                        <button
                            className="continue-shopping-button"
                            onClick={() => navigate('/')}
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
                        onClick={() => navigate('/')}
                    >
                        Browse Books
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart; 
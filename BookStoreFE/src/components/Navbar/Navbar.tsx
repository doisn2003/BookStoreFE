import React, { useState } from 'react';
import './Navbar.scss';
import bookLogo from '@assets/book-logo.jpg';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bookstore-navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <a href="/home" className="logo">
                        <img src={bookLogo} alt="BookNook Logo" className="logo-image" />
                        <span className="logo-text">BookNook</span>
                    </a>
                </div>

                <div className="navbar-center">
                    <div className="search-bar">
                        <input type="text" placeholder="Search for books, authors, or genres..." />
                        <button className="search-button">
                            <span>🔍</span>
                        </button>
                    </div>
                </div>

                <div className="navbar-right">
                    <div className="nav-links">
                        <a href="/categories" className="nav-link">Categories</a>
                        <a href="/new-releases" className="nav-link">New Releases</a>
                        <a href="/bestsellers" className="nav-link">Bestsellers</a>
                    </div>
                    <div className="nav-actions">
                        <a href="/wishlist" className="action-link">
                            <span className="action-icon">❤️</span>
                        </a>
                        <a href="/cart" className="action-link cart-link">
                            <span className="action-icon">🛒</span>
                            <span className="cart-count">0</span>
                        </a>
                        <a href="/account" className="action-link">
                            <span className="action-icon">👤</span>
                        </a>
                    </div>
                    <button 
                        className={`mobile-menu-button ${isMenuOpen ? 'open' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="/categories">Categories</a>
                <a href="/new-releases">New Releases</a>
                <a href="/bestsellers">Bestsellers</a>
                <a href="/wishlist">Wishlist</a>
                <a href="/cart">Cart</a>
                <a href="/account">Account</a>
            </div>
        </nav>
    );
};

export default Navbar; 
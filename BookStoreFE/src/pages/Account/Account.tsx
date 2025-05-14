import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.scss';
import Navbar from '@/components/Navbar/Navbar';

// Mock user data
const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    joinDate: '2024-01-01',
};

// Mock order history
const orderHistory = [
    {
        id: '1',
        date: '2024-03-15',
        status: 'Delivered',
        total: 35.98,
        items: [
            {
                id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                price: 19.99,
                quantity: 1,
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
            },
            {
                id: '2',
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                price: 15.99,
                quantity: 1,
                imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
            },
        ],
    },
    // Add more orders...
];

const Account: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

    const handleLogout = () => {
        // Implement logout logic here
        navigate('/login');
    };

    return (
        <div className="account-page">
            <Navbar />
            <div className="account-header">
                <h1>My Account</h1>
            </div>

            <div className="account-content">
                <div className="account-sidebar">
                    <div className="user-info">
                        <div className="avatar">
                            <img src={userData.avatar} alt={userData.name} />
                        </div>
                        <h2>{userData.name}</h2>
                        <p>{userData.email}</p>
                        <p className="join-date">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
                    </div>

                    <nav className="account-nav">
                        <button
                            className={activeTab === 'profile' ? 'active' : ''}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={activeTab === 'orders' ? 'active' : ''}
                            onClick={() => setActiveTab('orders')}
                        >
                            Order History
                        </button>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                </div>

                <div className="account-main">
                    {activeTab === 'profile' ? (
                        <div className="profile-section">
                            <h2>Profile Information</h2>
                            <form className="profile-form">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" defaultValue={userData.name} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" defaultValue={userData.email} />
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" placeholder="Enter new password" />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" placeholder="Confirm new password" />
                                </div>
                                <button type="submit" className="save-button">Save Changes</button>
                            </form>
                        </div>
                    ) : (
                        <div className="orders-section">
                            <h2>Order History</h2>
                            {orderHistory.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-info">
                                            <h3>Order #{order.id}</h3>
                                            <p className="order-date">
                                                {new Date(order.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="order-status">
                                            <span className={`status ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="order-items">
                                        {order.items.map(item => (
                                            <div key={item.id} className="order-item">
                                                <img src={item.imageUrl} alt={item.title} />
                                                <div className="item-details">
                                                    <h4>{item.title}</h4>
                                                    <p>by {item.author}</p>
                                                    <p className="item-price">
                                                        ${item.price.toFixed(2)} x {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account; 
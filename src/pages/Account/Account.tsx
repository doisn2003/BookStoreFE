import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.scss';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';

interface UserData {
    name: string;
    email: string;
    avatar?: string;
    joinDate?: string;
}

interface OrderItem {
    id: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface Order {
    id: string;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
}


const Account: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            console.log('Token:', localStorage.getItem('token')); // Debug token
            try {
                const response = await api.get('/auth/profile');
                console.log('User Profile Response:', response.data); // Debug response
                setUserData(response.data);
            } catch (err) {
                console.log('User Profile Error:', err.response?.data); // Debug error response
                setError('Failed to load user profile');
                console.error('Error fetching user profile:', err);
            }
        };

        const fetchOrderHistory = async () => {
            console.log('Fetching orders from:', API_ENDPOINTS.ORDERS.LIST); // Debug endpoint
            try {
                const response = await api.get(API_ENDPOINTS.ORDERS.LIST);
                console.log('Order History Response:', response.data); // Debug response
                setOrderHistory(response.data);
            } catch (err) {
                console.log('Order History Error:', err.response?.data); // Debug error response
                setError('Failed to load order history');
                console.error('Error fetching order history:', err);
            }
        };

        Promise.all([fetchUserProfile(), fetchOrderHistory()])
            .finally(() => setLoading(false));
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedData = {
            name: formData.get('name'),
            email: formData.get('email'),
        };

        try {
            const response = await api.put('/auth/profile', updatedData);
            setUserData(response.data.user);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
            console.error('Error updating profile:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return (
            <div className="account-page">
                <Navbar />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="account-page">
                <Navbar />
                <div className="error">{error}</div>
            </div>
        );
    }

    return (
        <div className="account-page">
            <Navbar />
            <div className="account-header">
                <h1>My Account</h1>
                {error && <div className="error-message">{error}</div>}
            </div>

            <div className="account-content">
                <div className="account-sidebar">
                    <div className="user-info">
                        <div className="avatar">
                            <img src={userData?.avatar || 'https://i.pravatar.cc/150?img=1'} alt={userData?.name} />
                        </div>
                        <h2>{userData?.name}</h2>
                        <p>{userData?.email}</p>
                        {userData?.joinDate && (
                            <p className="join-date">Member since {new Date(userData.joinDate).toLocaleDateString()}</p>
                        )}
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
                            <form className="profile-form" onSubmit={handleUpdateProfile}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" defaultValue={userData?.name || ''} />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" defaultValue={userData?.email || ''} />
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
                            {orderHistory.length === 0 ? (
                                <div className="no-orders">No orders found</div>
                            ) : (
                                orderHistory.map(order => (
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
                                                    <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.title} />
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
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
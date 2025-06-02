import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';
import './OrdersManagement.scss';

interface OrderItem {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

// Sample data
const sampleOrders: Order[] = [
  {
    _id: 'sample-1',
    userId: 'user-1',
    items: [
      {
        bookId: 'book-1',
        title: 'The Great Gatsby',
        quantity: 2,
        price: 15.99
      },
      {
        bookId: 'book-2',
        title: 'To Kill a Mockingbird',
        quantity: 1,
        price: 12.99
      }
    ],
    totalAmount: 44.97,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'USA'
    },
    createdAt: '2024-03-15T10:30:00Z'
  },
  {
    _id: 'sample-2',
    userId: 'user-2',
    items: [
      {
        bookId: 'book-3',
        title: '1984',
        quantity: 1,
        price: 9.99
      }
    ],
    totalAmount: 9.99,
    status: 'pending',
    paymentStatus: 'pending',
    shippingAddress: {
      fullName: 'Jane Smith',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      postalCode: '90001',
      country: 'USA'
    },
    createdAt: '2024-03-16T14:20:00Z'
  },
  {
    _id: 'sample-3',
    userId: 'user-3',
    items: [
      {
        bookId: 'book-4',
        title: 'Pride and Prejudice',
        quantity: 3,
        price: 8.99
      },
      {
        bookId: 'book-5',
        title: 'The Hobbit',
        quantity: 1,
        price: 14.99
      }
    ],
    totalAmount: 41.96,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'Robert Johnson',
      address: '789 Pine Rd',
      city: 'Chicago',
      postalCode: '60601',
      country: 'USA'
    },
    createdAt: '2024-03-17T09:15:00Z'
  }
];

const OrdersManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.ORDERS.LIST);
      // Combine API data with sample data
      const allOrders = [...response.data, ...sampleOrders];
      setOrders(allOrders);
      
      // Calculate total revenue from paid orders
      const revenue = allOrders
        .filter((order: Order) => order.paymentStatus === 'paid')
        .reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
      setTotalRevenue(revenue);
      
      setError('');
    } catch (err: unknown) {
      console.error('Error fetching orders:', err);
      // If API fails, use sample data
      setOrders(sampleOrders);
      const revenue = sampleOrders
        .filter((order: Order) => order.paymentStatus === 'paid')
        .reduce((sum: number, order: Order) => sum + order.totalAmount, 0);
      setTotalRevenue(revenue);
      const errorMessage = err instanceof Error ? err.message : 'Error loading orders';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleRefund = (orderId: string) => {
    // Placeholder for refund functionality
    alert('Refund functionality will be implemented later');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'failed':
        return '#F44336';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <div className="orders-management">
        <Navbar />
        <div className="admin-content">
          <h1>Loading orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-management">
      <Navbar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Orders Management</h1>
          <button className="back-button" onClick={() => navigate('/admin')}>
            Back to Admin
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="revenue-summary">
          <h2>Total Revenue: ${totalRevenue.toFixed(2)}</h2>
        </div>

        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.shippingAddress.fullName}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.paymentStatus) }}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-button"
                        onClick={() => handleViewOrder(order)}
                      >
                        View Details
                      </button>
                      {order.paymentStatus === 'paid' && (
                        <button
                          className="refund-button"
                          onClick={() => handleRefund(order._id)}
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Order Details</h2>
              <div className="order-details">
                <div className="detail-group">
                  <h3>Order Information</h3>
                  <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {selectedOrder.status}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                </div>

                <div className="detail-group">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.shippingAddress.fullName}</p>
                  <p><strong>Address:</strong> {selectedOrder.shippingAddress.address}</p>
                  <p><strong>City:</strong> {selectedOrder.shippingAddress.city}</p>
                  <p><strong>Postal Code:</strong> {selectedOrder.shippingAddress.postalCode}</p>
                  <p><strong>Country:</strong> {selectedOrder.shippingAddress.country}</p>
                </div>

                <div className="detail-group">
                  <h3>Order Items</h3>
                  <table className="items-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3}><strong>Total Amount:</strong></td>
                        <td><strong>${selectedOrder.totalAmount.toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  className="close-button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedOrder(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement; 
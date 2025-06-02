import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar/Navbar';
import Payment from '@/components/Payment/Payment';
import api from '@/services/api';
import { API_ENDPOINTS } from '@/constants';
import './Payment.scss';

interface OrderSummary {
  _id: string;
  totalAmount: number;
  items: Array<{
    book: {
      title: string;
      price: number;
      discount?: number;
    };
    quantity: number;
  }>;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get order summary from cart
    const fetchOrderSummary = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.CART.LIST);
        setOrderSummary(response.data);
        setError('');
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error loading order summary';
        setError(errorMessage);
        console.error('Error fetching order summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  const handlePaymentSuccess = () => {
    // Show success message and redirect to order confirmation
    navigate('/order-confirmation');
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="payment-page">
        <Navbar />
        <div className="payment-content">
          <h1>Loading payment details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-page">
        <Navbar />
        <div className="payment-content">
          <h1>Error</h1>
          <p>{error}</p>
          <button onClick={() => navigate('/cart')}>Return to Cart</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <Navbar />
      <div className="payment-content">
        <h1>Complete Your Purchase</h1>
        {orderSummary && (
          <Payment
            orderId={orderSummary._id}
            totalAmount={orderSummary.totalAmount}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={handlePaymentError}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentPage; 
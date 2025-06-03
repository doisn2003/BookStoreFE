import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';
import './Payment.css';

interface PaymentProps {
  orderId: string;
  totalAmount: number;
  onPaymentSuccess: () => void;
  onPaymentError: (error: string) => void;
}

const Payment: React.FC<PaymentProps> = ({
  orderId,
  totalAmount,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'cod' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingFee = 5.99;
  const finalTotal = totalAmount + shippingFee;

  const handlePayment = async () => {
    if (!selectedMethod) {
      onPaymentError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    try {
      let response;
      if (selectedMethod === 'bank') {
        response = await paymentService.processBankTransfer(orderId);
      } else {
        response = await paymentService.processCOD(orderId);
      }

      if (response.success) {
        onPaymentSuccess();
      } else {
        onPaymentError(response.message || 'Payment failed');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during payment';
      onPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-summary">
        <h2>Order Summary</h2>
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Fee</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="payment-methods">
        <h2>Select Payment Method</h2>
        <div className="method-options">
          <div
            className={`method-option ${selectedMethod === 'bank' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('bank')}
          >
            <div className="method-icon">
              <i className="fas fa-university"></i>
            </div>
            <div className="method-details">
              <h3>Bank Transfer</h3>
              <p>Pay directly from your bank account</p>
            </div>
            <div className="method-radio">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === 'bank'}
                onChange={() => setSelectedMethod('bank')}
              />
            </div>
          </div>

          <div
            className={`method-option ${selectedMethod === 'cod' ? 'selected' : ''}`}
            onClick={() => setSelectedMethod('cod')}
          >
            <div className="method-icon">
              <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="method-details">
              <h3>Cash on Delivery (COD)</h3>
              <p>Pay when you receive your order</p>
            </div>
            <div className="method-radio">
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedMethod === 'cod'}
                onChange={() => setSelectedMethod('cod')}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className="payment-button"
        onClick={handlePayment}
        disabled={isProcessing || !selectedMethod}
      >
        {isProcessing ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
      </button>
    </div>
  );
};

export default Payment; 
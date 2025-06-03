import api from './api';

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const paymentService = {
  // Get all payments
  getAllPayments: async () => {
    const response = await api.get('/payments');
    return response.data;
  },

  // Process bank transfer payment
  processBankTransfer: async (orderId: string) => {
    const response = await api.post(`/payments/bank-transfer/${orderId}`);
    return response.data;
  },

  // Process COD payment
  processCOD: async (orderId: string) => {
    const response = await api.post(`/payments/cod/${orderId}`);
    return response.data;
  }
}; 
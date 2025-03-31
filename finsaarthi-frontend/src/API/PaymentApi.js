import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for making API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a new payment
export const addPayment = async (paymentData) => {
  try {
    const response = await api.post('/payments', paymentData);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    throw error;
  }
};

// Get all payments
export const getAllPayments = async () => {
  try {
    const response = await api.get('/payments');
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

// Get payment by ID
export const getPaymentByCompanyName = async (CompanyName) => {
  try {
    const response = await api.get(`/payments/${CompanyName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
};

// Update payment by ID
export const updatePayment = async (id, paymentData) => {
  try {
    const response = await api.put(`/payments/${id}`, paymentData);
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};


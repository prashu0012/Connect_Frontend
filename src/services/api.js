import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getShippingMethods = async (addressData) => {
  try {
    const response = await api.post('/shipping-methods', addressData);
    return response.data;
  } catch (error) {
    console.error('Error fetching shipping methods:', error);
    throw error;
  }
};

export const applyDiscountCode = async (code, subtotal) => {
  try {
    const response = await api.post('/apply-discount', { code, subtotal });
    return response.data;
  } catch (error) {
    console.error('Error applying discount code:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
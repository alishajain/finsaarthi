import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for making API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a new deal
export const addDeal = async (dealData) => {
  try {
    const response = await api.post('/deals', dealData);
    return response.data;
  } catch (error) {
    console.error("Error adding deal:", error);
    throw error;
  }
};

// Get all deals
export const getAllDeals = async () => {
  try {
    const response = await api.get('/deals');
    return response.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }
};

// Get deal by DealNo
export const getDealByDealNo = async (dealNo) => {
  try {
    const response = await api.get(`/deals/${dealNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deal:", error);
    throw error;
  }
};

// Get deal by Company Name
export const getDealByCompanyName = async (CompanyName) => {
  try {
    const response = await api.get(`/deal/${CompanyName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deal:", error);
    throw error;
  }
};

// Update deal by DealNo
export const updateDeal = async (dealNo, dealData) => {
  try {
    const response = await api.put(`/deals/${dealNo}`, dealData);
    return response.data;
  } catch (error) {
    console.error("Error updating deal:", error);
    throw error;
  }
};

// Get latest DealNo
export const latestDealNo = async() => {
  try {
    const response = await api.get('/dealNo');
    return response.data;
  } catch (error) {
    console.error('Error fetching deal no:', error);
    throw error;
  }
};
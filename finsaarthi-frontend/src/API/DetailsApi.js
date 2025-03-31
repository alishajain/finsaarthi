import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for making API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add deal details
export const addDealDetails = async (dealDetails) => {
  try {
    console.log(dealDetails);
    const response = await api.post('/details', dealDetails);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get all deal details
export const getAllDealDetails = async () => {
  try {
    const response = await api.get('/details');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get deal details by DealNo
export const getDealDetailsByDealNo = async (dealNo) => {
  try {
    const response = await api.get(`/details/${dealNo}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get total by DealNo
export const getTotalByDealNo = async (dealNo) => {
  try {
    const response = await api.get(`/total/${dealNo}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update deal details by DealNo
export const updateDealDetails = async (dealNo, dealDetails) => {
  try {
    const response = await api.put(`/details/${dealNo}`, dealDetails);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

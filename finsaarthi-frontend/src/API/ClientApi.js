import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create an Axios instance for making API calls
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a new client
export const addClient = async (clientData) => {
  try {
    const response = await api.post('/client', clientData);
    return response.data;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
};

// Update an existing client
export const updateClient = async (clientData) => {
  try {
    const response = await api.put('/client', clientData);
    return response.data;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
};

// Get all clients
export const getAllClients = async () => {
  try {
    const response = await api.get('/client');
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Get all clients
export const getNames = async () => {
  try {
    const response = await api.get('/names');
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to check if an EmpID already exists
export const checkIfUserExists = async (userName) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    // Check if any user has the same EmpID
    const userExists = users.some(user => user.UserName === userName);
    return userExists;
  } catch (error) {
    console.error("Error checking UserName:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    
    // Assuming the backend now returns both token and role
    const { token, role } = response.data;
    
    if (token && role) {
      localStorage.setItem('token', token); // Store token
      localStorage.setItem('role', role);   // Store role
    }
    
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get all users (admin functionality)
export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response ? error.response.data : error.message);
    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Unauthorized access. Please log in again.');
    }

    throw error.response ? error.response.data : error.message;
  }
};

// Additional example to call a protected route (e.g., updating a record)
export const updateRecord = async (recordId, updatedData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await axios.put(`${API_URL}/update-record/${recordId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`  // Attach the JWT token to the request header
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error updating record:", error.response ? error.response.data : error.message);

    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      throw new Error('Unauthorized access. Please log in again.');
    }

    throw error.response ? error.response.data : error.message;
  }
};

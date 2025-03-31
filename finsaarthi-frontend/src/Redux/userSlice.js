import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../API/UserApi';

// Async action for logging in
export const login = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async action for signing up
export const signup = createAsyncThunk(
  'user/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create the user slice of the state
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: '',
    role: '', // New state to store the role (user or admin)
    loading: false,
    error: '',
  },
  reducers: {
    // Action to set userId
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // Action to set role
    setRole: (state, action) => {
      state.role = action.payload;
    },
    // Action to clear userId and role (for logout functionality)
    logout: (state) => {
      state.userId = '';
      state.role = ''; // Clear role on logout
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.UserID;
        state.role = action.payload.role || 'user'; // Set role on successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      })

      // Handle signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.UserID;
        state.role = action.payload.role || 'user'; // Set role on successful signup
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Signup failed';
      });
  },
});

// Export the action creators
export const { setUserId, setRole, logout, setError, clearError } = userSlice.actions;

// Export the reducer to be included in the store
export default userSlice.reducer;

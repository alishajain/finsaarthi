import React, { useState } from 'react';
import { registerUser, checkIfUserExists } from '../API/UserApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!userID || !userName || !password) {
      setMessage('All fields are required!');
      return;
    }

    try {
      setLoading(true);

      // Check if the EmpID already exists
      const userNameExists = await checkIfUserExists(userName);
      if (userNameExists) {
        setMessage('An account with this User name already exists.');
        return;
      }

      // Register the user if EmpID is unique
      const userData = { UserId: userID, UserName: userName, Password: password };
      const data = await registerUser(userData);

      if (data.success) {
        setMessage('Signup successful!');
        navigate('/');
      } else {
        setMessage(data.message || 'Signup failed!');
      }
    } catch (error) {
      setMessage('An error occurred during signup!');
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Welcome to FinSaarthi</h1>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>UserID:</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;

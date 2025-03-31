const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const tableRoutes = require('./routes/tableRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the routes for table-related APIs
app.use('/api', tableRoutes);

// Global error handler
app.use(errorHandler);

// Basic route for home or health-check
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

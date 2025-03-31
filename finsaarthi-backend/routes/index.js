const express = require('express');
const tableRoutes = require('./tableRoutes');

const router = express.Router();

// Attach the table-related routes under /api
router.use('/api', tableRoutes);

module.exports = router;

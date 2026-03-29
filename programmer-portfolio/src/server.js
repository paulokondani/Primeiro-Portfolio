const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const databaseConfig = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Database connection
databaseConfig();

// API routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
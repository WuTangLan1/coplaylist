// server.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware to handle CORS and JSON data
app.use(cors());
app.use(express.json());

// Mount the API routes
app.use('/api', apiRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

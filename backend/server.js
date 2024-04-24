// backend/server.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080', // or wherever your frontend is hosted
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

// Mount the API routes
app.use('/api', apiRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const connectDB = require('./config/Database')
const path = require('path'); 

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes'); // Adjust path as needed
const contactRoutes = require('./routes/contactRoutes'); // Adjust path as needed
const activityRoutes = require('./routes/activityRoutes'); // Adjust path as needed

const app = express();
const PORT = process.env.PORT || 5000;



// Use the CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));



//Connect DB
connectDB()

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));



// Use User Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/activity', activityRoutes);



// Basic route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

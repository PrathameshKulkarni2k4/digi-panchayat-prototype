const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const grievanceRoutes = require('./routes/grievanceRoutes');
const schemeRoutes = require('./routes/schemeRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Database Connection
connectDB();

// Routes
app.use('/api/users', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/applications', applicationRoutes);

app.get('/', (req, res) => {
    res.send('AIRGSS API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

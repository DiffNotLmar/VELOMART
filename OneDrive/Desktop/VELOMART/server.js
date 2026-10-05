const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files

// Import routes
const vehicleRoutes = require('./api/vehicles');
const orderRoutes = require('./api/orders');
const cartRoutes = require('./api/cart');

// Use routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'VELOMART API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ VELOMART Server running on port ${PORT}`);
    console.log(`🌐 API: http://localhost:${PORT}/api`);
});

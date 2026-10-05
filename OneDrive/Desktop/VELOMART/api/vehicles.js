const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Get all vehicles
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        
        let query = 'SELECT * FROM vehicles WHERE status = $1';
        let params = ['active'];
        let paramCount = 1;

        if (category && category !== 'all') {
            paramCount++;
            query += ` AND category = $${paramCount}`;
            params.push(category);
        }

        if (minPrice) {
            paramCount++;
            query += ` AND price >= $${paramCount}`;
            params.push(minPrice);
        }

        if (maxPrice) {
            paramCount++;
            query += ` AND price <= $${paramCount}`;
            params.push(maxPrice);
        }

        if (search) {
            paramCount++;
            query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
            params.push(`%${search}%`);
        }

        query += ' ORDER BY created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching vehicle:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle' });
    }
});

// Get featured vehicles (first 4)
router.get('/featured/list', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM vehicles WHERE status = $1 ORDER BY created_at DESC LIMIT 4',
            ['active']
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching featured vehicles:', error);
        res.status(500).json({ error: 'Failed to fetch featured vehicles' });
    }
});

// Create new vehicle (admin)
router.post('/', async (req, res) => {
    try {
        const { name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location } = req.body;
        
        const result = await pool.query(
            `INSERT INTO vehicles (name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
             RETURNING *`,
            [name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location, 'active']
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ error: 'Failed to create vehicle' });
    }
});

// Update vehicle (admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location, status } = req.body;
        
        const result = await pool.query(
            `UPDATE vehicles 
             SET name = $1, category = $2, type = $3, price = $4, year = $5, mileage = $6, 
                 transmission = $7, fuel_type = $8, color = $9, image = $10, images = $11, 
                 description = $12, features = $13, seller = $14, location = $15, status = $16
             WHERE id = $17
             RETURNING *`,
            [name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location, status, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ error: 'Failed to update vehicle' });
    }
});

// Delete vehicle (admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM vehicles WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ error: 'Failed to delete vehicle' });
    }
});

module.exports = router;

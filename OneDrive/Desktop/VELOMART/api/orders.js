const express = require('express');
const router = express.Router();
const pool = require('../database/db');

// Generate unique order number
function generateOrderNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${timestamp}-${random}`;
}

// Create new order
router.post('/', async (req, res) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        const { customerName, customerEmail, customerPhone, customerAddress, paymentMethod, items, totalAmount } = req.body;
        
        // Create order
        const orderNumber = generateOrderNumber();
        const orderResult = await client.query(
            `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, customer_address, payment_method, total_amount, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [orderNumber, customerName, customerEmail, customerPhone, customerAddress, paymentMethod, totalAmount, 'pending']
        );
        
        const order = orderResult.rows[0];
        
        // Create order items
        for (const item of items) {
            await client.query(
                `INSERT INTO order_items (order_id, vehicle_id, vehicle_name, vehicle_price, quantity)
                 VALUES ($1, $2, $3, $4, $5)`,
                [order.id, item.vehicleId, item.vehicleName, item.vehiclePrice, item.quantity || 1]
            );
        }
        
        await client.query('COMMIT');
        
        res.status(201).json({ 
            success: true,
            order: order,
            message: 'Order created successfully'
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    } finally {
        client.release();
    }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        
        const orderResult = await pool.query(
            'SELECT * FROM orders WHERE order_number = $1',
            [orderNumber]
        );
        
        if (orderResult.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        const order = orderResult.rows[0];
        
        const itemsResult = await pool.query(
            'SELECT * FROM order_items WHERE order_id = $1',
            [order.id]
        );
        
        order.items = itemsResult.rows;
        
        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM orders ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update order status (admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        
        const result = await pool.query(
            'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;

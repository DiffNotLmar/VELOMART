const pool = require('./db');
const fs = require('fs');
const path = require('path');

// Read and execute schema
async function initializeDatabase() {
    try {
        console.log('📋 Initializing database...');
        
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
        await pool.query(schema);
        
        console.log('✅ Database schema created successfully');
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    }
}

// Seed vehicles data
async function seedVehicles() {
    try {
        console.log('🌱 Seeding vehicles...');
        
        const vehicles = [
            ['Toyota Corolla Altis 2022', 'cars', 'Sedan', 980000, 2022, '35,000 km', 'Automatic', 'Gasoline', 'White', 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500', '{"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800","https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800"}', 'Well-maintained Toyota Corolla Altis 2022. Smooth drive, very fuel efficient.', '{"Air Conditioning","Power Steering","Power Windows","Bluetooth","Backup Camera"}', 'Verified Seller', 'Metro Manila', 'active'],
            ['Honda Click 150i 2023', 'motorcycles', 'Scooter', 125000, 2023, '8,500 km', 'Automatic', 'Gasoline', 'Red', 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=500', '{"https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800"}', 'Almost brand new Honda Click 150i. Very economical.', '{"LED Lights","Digital Display","USB Charging"}', 'Verified Seller', 'Quezon City', 'active'],
            ['Ford Ranger 2021', 'trucks', 'Pickup', 1250000, 2021, '28,000 km', 'Automatic', 'Diesel', 'Black', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500', '{"https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"}', 'Powerful Ford Ranger 2021. Perfect for both work and adventure.', '{"4x4 Drive","Turbo Diesel","Leather Seats"}', 'Verified Seller', 'Cavite', 'active'],
            ['Tesla Model 3 2023', 'electric', 'Sedan', 2450000, 2023, '8,000 km', 'Automatic', 'Electric', 'Pearl White', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500', '{"https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"}', 'Premium Tesla Model 3 Long Range. Autopilot enabled.', '{"Autopilot","Premium Audio","Glass Roof","Heated Seats"}', 'Verified Seller', 'BGC, Taguig', 'active'],
            ['Caterpillar 320D Excavator 2019', 'heavy', 'Excavator', 3500000, 2019, '2,800 hours', 'Automatic', 'Diesel', 'Yellow', 'images/komatsu-pc200.jpg', '{"images/komatsu-pc200.jpg"}', 'Heavy-duty Caterpillar 320D Excavator.', '{"Hydraulic System","Air Conditioned Cabin","GPS Tracking"}', 'Verified Seller', 'Batangas', 'active']
        ];

        const checkQuery = 'SELECT COUNT(*) FROM vehicles';
        const result = await pool.query(checkQuery);
        
        if (parseInt(result.rows[0].count) > 0) {
            console.log('⚠️  Vehicles already seeded, skipping...');
            return;
        }

        const insertQuery = `
            INSERT INTO vehicles (name, category, type, price, year, mileage, transmission, fuel_type, color, image, images, description, features, seller, location, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        `;

        for (const vehicle of vehicles) {
            await pool.query(insertQuery, vehicle);
        }

        console.log(`✅ Seeded ${vehicles.length} vehicles successfully`);
    } catch (error) {
        console.error('❌ Error seeding vehicles:', error);
        throw error;
    }
}

// Main seed function
async function seed() {
    try {
        await initializeDatabase();
        await seedVehicles();
        console.log('🎉 Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    seed();
}

module.exports = { initializeDatabase, seedVehicles };

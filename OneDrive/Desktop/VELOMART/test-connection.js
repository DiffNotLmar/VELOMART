require('dotenv').config();
const { Pool } = require('pg');

console.log('Testing Railway Database Connection...\n');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set ✓' : 'Not Set ✗');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function test() {
    try {
        console.log('\n🔄 Connecting to database...');
        const result = await pool.query('SELECT NOW() as time, version()');
        console.log('✅ Connection successful!');
        console.log('📅 Server time:', result.rows[0].time);
        console.log('🗄️  PostgreSQL version:', result.rows[0].version.split('\n')[0]);
        
        // Check if tables exist
        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log('\n📋 Tables in database:', tables.rows.length);
        tables.rows.forEach(row => {
            console.log('   -', row.table_name);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
}

test();

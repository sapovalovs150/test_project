const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'user_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4',
    timezone: '+03:00'
});

const testConnection = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('✅ Connected to MySQL database');
        
        // Устанавливаем все параметры кодировки
        await connection.query('SET NAMES utf8mb4');
        await connection.query('SET CHARACTER SET utf8mb4');
        await connection.query('SET character_set_client = utf8mb4');
        await connection.query('SET character_set_connection = utf8mb4');
        await connection.query('SET character_set_results = utf8mb4');
        await connection.query('SET collation_connection = utf8mb4_unicode_ci');
        
        console.log('✅ Character set configured successfully');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        if (connection) connection.release();
        return false;
    }
};

module.exports = { pool, testConnection };
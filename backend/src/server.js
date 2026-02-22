const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Настройка CORS и кодировок
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Важно: устанавливаем правильный Content-Type для всех ответов
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

testConnection().then((connected) => {
    if (connected) {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📝 API available at http://localhost:${PORT}/api/users`);
        });
    } else {
        console.error('❌ Server not started due to database connection error');
        process.exit(1);
    }
});
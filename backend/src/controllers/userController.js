const User = require('../models/User');

const userController = {
    // GET /api/users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(users);
        } catch (error) {
            console.error('Error in getAllUsers:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },

    // GET /api/users/:id
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(user);
        } catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },

    // POST /api/users
    createUser: async (req, res) => {
        try {
            const { name, email, birth_date, phone, position, description } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({ error: 'Имя обязательно' });
            }
            if (!email || email.trim() === '') {
                return res.status(400).json({ error: 'Email обязателен' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Неверный формат email' });
            }

            // Проверка даты рождения (не должна быть в будущем)
            if (birth_date) {
                const birthDateObj = new Date(birth_date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (birthDateObj > today) {
                    return res.status(400).json({ error: 'Дата рождения не может быть в будущем' });
                }
            }

            const user = await User.create({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                birth_date: birth_date || null,
                phone: phone || null,
                position: position || null,
                description: description || null
            });

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.status(201).json(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
            }
            console.error('Error in createUser:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },

    // PUT /api/users/:id
    updateUser: async (req, res) => {
        try {
            const { name, email, birth_date, phone, position, description } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({ error: 'Имя обязательно' });
            }
            if (!email || email.trim() === '') {
                return res.status(400).json({ error: 'Email обязателен' });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ error: 'Неверный формат email' });
            }

            if (birth_date) {
                const birthDateObj = new Date(birth_date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (birthDateObj > today) {
                    return res.status(400).json({ error: 'Дата рождения не может быть в будущем' });
                }
            }

            const user = await User.update(req.params.id, {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                birth_date: birth_date || null,
                phone: phone || null,
                position: position || null,
                description: description || null
            });

            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json(user);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
            }
            console.error('Error in updateUser:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    },

    // DELETE /api/users/:id
    deleteUser: async (req, res) => {
        try {
            const deleted = await User.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Пользователь не найден' });
            }
            res.status(204).send();
        } catch (error) {
            console.error('Error in deleteUser:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' });
        }
    }
};

module.exports = userController;
const { pool } = require('../config/database');

class User {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(userData) {
        const { name, email, birth_date, phone, position, description } = userData;
        const [result] = await pool.query(
            'INSERT INTO users (name, email, birth_date, phone, position, description) VALUES (?, ?, ?, ?, ?, ?)',
            [name, email, birth_date, phone, position, description]
        );
        return { id: result.insertId, ...userData };
    }

    static async update(id, userData) {
        const { name, email, birth_date, phone, position, description } = userData;
        await pool.query(
            'UPDATE users SET name = ?, email = ?, birth_date = ?, phone = ?, position = ?, description = ? WHERE id = ?',
            [name, email, birth_date, phone, position, description, id]
        );
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = User;
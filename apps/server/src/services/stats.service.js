const pool = require('../utils/pg');

const getStatsService = async (user) => {
    try {
        console.log('Getting stats');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        let expenses = await pool.query('SELECT * FROM expense WHERE user_id = $1', [userId?.rows[0]?.id]);
        expenses = expenses?.rows;

        let total = 0.00;
        for (expense of expenses) {
            total += parseFloat(expense.amount);
        }

        const message = {
            total: total,
        }
        return message;

    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getStatsService
}

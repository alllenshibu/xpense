const pool = require('../utils/pg');

const getStatsService = async (user) => {
    try {
        console.log('Getting stats');
        const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        let expenses = await pool.query('SELECT SUM(amount) FROM expense WHERE user_id = $1', [userId?.rows[0]?.id]);
        // console.log(expenses.rows[0].sum );
        // expenses = expenses?.rows;

        // let total = 0.00;
        // for (expense of expenses) {
        //     total += parseFloat(expense.amount);
        // }

        const message = {
            total: expenses?.rows[0]?.sum ,
        }
        console.log(message);
        return message;

    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getStatsService
}

const pool = require('../utils/pg');

const getAllExpensesService = async (user) => {
    try {
        console.log('Getting all expenses');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM expense WHERE user_id = $1', [userId?.rows[0]?.id]);

        // Doesn't work if there are no expenses
        // if (result?.rows?.length > 0) {
        //     return result?.rows;
        // } else {
        //     throw new Error('Something went wrong');
        // }
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}


const getExpenseByIdService = async (user, expenseId) => {
    try {
        console.log('Getting expenses by id');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('SELECT * FROM expense WHERE user_id = $1 AND id = $2', [userId?.rows[0]?.id, expenseId]);
        if (result?.rows?.length > 0) {
            return result?.rows[0];
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        throw new Error(err.message);
    }
}


const addNewExpenseService = async (user, title, amount, categoryId, timestamp) => {
    try {
        console.log('Adding expense');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('INSERT INTO expense (title, amount, category_id, timestamp, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [title, amount, categoryId, timestamp, userId?.rows[0]?.id]);
        if (result?.rows?.length > 0) {
            return result?.rows[0]?.id;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {

        throw new Error(err.message);
    }
}


const editExpenseService = async (user, title, amount, categoryId, timestamp) => {
    try {
        console.log('Editing expense');
        const userId = await pool.query('SELECT id FROM "user" WHERE username = $1', [user]);

        if (userId?.rows?.length === 0) {
            throw new Error('User not found');
        }

        const result = await pool.query('UPDATE expense SET title = $1, amount = $2, category_id = $3, timestamp = $4 WHERE user_id = $5 RETURNING id', [title, amount, categoryId, timestamp, userId?.rows[0]?.id]);
        if (result?.rows?.length > 0) {
            return result?.rows[0]?.id;
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {

        throw new Error(err.message);
    }
}


module.exports = {
    getAllExpensesService,
    getExpenseByIdService,
    addNewExpenseService,
    editExpenseService
}
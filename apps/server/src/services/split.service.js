const pool = require('../utils/pg');

const split = [
    {
        email: "alapanoski",
        percentage: 50
    }, {
        email: "vaib",
        percentage: 25
    }, {
        email: "jzf",
        percentage: 25
    }
]

const createNewSplitService = async (expenseId, split) => {
    try {
        // Checking percentage
        // let totalPercentage = 0;
        // for (user of split) {
        //     totalPercentage += user.percentage;
        // }
        // if (totalPercentage !== 100) {
        //     throw new Error('Total percentage must be 100');
        // }


        // TODO: change
        let n = split.length
        for (let payer of split)
            payer.percentage = 100 / n

        // Checking if user exists
        for (user of split) {
            const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user.email]);
            if (userId?.rows?.length === 0) {
                throw new Error('User not found');
            }
        }


        // Checking if expense exists
        let result = await pool.query('SELECT id FROM expense WHERE id = $1', [expenseId]);
        if (result?.rows?.length === 0) {
            throw new Error('Expense not found');
        }

        // Checking if split exists
        const splitId = await pool.query('SELECT id FROM split WHERE expense_id = $1', [expenseId]);
        if (splitId?.rows?.length !== 0) {
            throw new Error('Split already exists');
        }


        // Creating split
        for (payer of split) {
            const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [payer.email]);
            result = await pool.query('INSERT INTO split (expense_id, user_id, percentage) VALUES ($1, $2, $3)', [expenseId, userId?.rows[0]?.id, payer.percentage]);
        }

        result = await pool.query('SELECT * FROM split WHERE expense_id = $1', [expenseId]);
        return result?.rows;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createNewSplitService
}
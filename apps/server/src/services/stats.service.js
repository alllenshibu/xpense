const pool = require('../utils/pg');

const getStatsService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new Error('User not found');
    }

    let result = await pool.query(
      `
    SELECT 
      amount as target
    FROM 
      budget
    WHERE 
      user_id = $1 
    AND
      EXTRACT(MONTH FROM period) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM period) = EXTRACT(YEAR FROM CURRENT_DATE)
    `,
      [userId?.rows[0]?.id],
    );

    let message = {
      budget: {
        target: result?.rows[0].target,
      },
    };

    result = await pool.query(
      `
    SELECT 
      SUM(amount)
    FROM 
      expense
    WHERE 
      user_id = $1
    AND
      EXTRACT(MONTH FROM timestamp) = EXTRACT(MONTH FROM CURRENT_DATE)
      AND EXTRACT(YEAR FROM timestamp) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [userId?.rows[0]?.id],
    );

    message.budget.spent = result?.rows[0]?.sum;

    message.budget.left = parseFloat(message.budget.target) - parseFloat(message.budget.spent);

    result = await pool.query(
      'SELECT *, category_id as categoryId, payment_id as paymentOptionId FROM expense WHERE user_id = $1 ORDER BY timestamp DESC LIMIT 5',
      [userId?.rows[0]?.id],
    );

    message.expenses = result?.rows;

    result = await pool.query(
      'SELECT c.*, COALESCE(SUM(e.amount), 0) as total FROM category c LEFT JOIN expense e ON c.id = e.category_id WHERE c.user_id = $1 GROUP BY c.id ORDER BY total DESC LIMIT 5',
      [userId?.rows[0]?.id],
    );

    message.categories = result?.rows;

    result = await pool.query(
      'SELECT p.*, COALESCE(SUM(e.amount), 0) as total FROM payment_option p LEFT JOIN expense e ON p.id = e.payment_id WHERE p.user_id = $1 GROUP BY p.id ORDER BY total DESC LIMIT 5',
      [userId?.rows[0]?.id],
    );

    message = { ...message, paymentOptions: result?.rows };

    console.log({ message });

    return message;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getStatsService,
};

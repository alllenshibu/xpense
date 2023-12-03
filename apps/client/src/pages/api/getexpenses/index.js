// Import your database pool or connection logic
import authorize from '../middleware';
import { pool } from '../pg'; // Adjust the path accordingly

const getAllExpensesService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      console.log('User does not exist');
    }

    const result = await pool.query(
      'SELECT *,category.name FROM expense inner join category on expense.category_id=category.id and expense.user_id=$1;',
      [userId?.rows[0]?.id],
    );

    const expenses = result?.rows;

    return expenses;
  } catch (err) {
    throw err;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Use the authorize middleware before processing the API route logic

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader === '' || authHeader === undefined) {
      return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === '' || token === undefined) {
      return res.status(401).send('Unauthorized');
    }

    const user = await pool.query('SELECT * FROM "user" WHERE id = $1', [token]);
    console.log(user.rows[0].email);

    const expenses = await getAllExpensesService(user.rows[0].email);
    console.log(expenses);
    return res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

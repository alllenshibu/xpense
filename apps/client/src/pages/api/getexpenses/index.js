// Import your database pool or connection logic
import { pool } from '../pg';
import authorize from '../middleware/middleware';// Adjust the path accordingly

const getAllExpensesService = async (user) => {
  try {
    const userId = await pool.query('SELECT id FROM "user" WHERE email = $1', [user]);

    if (userId?.rows?.length === 0) {
      throw new UserDoesNotExistError('User does not exist');
    }

    const result = await pool.query('SELECT * FROM expense WHERE user_id = $1', [
      userId?.rows[0]?.id,
    ]);

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
  await authorize(req, res);

  const { user } = req.query;

  try {
    const expenses = await getAllExpensesService(user);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

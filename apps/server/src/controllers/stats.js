import prisma from '../utils/database.js';

export const getStats = async (req, res) => {
  try {
    const { user } = req;

    let currentMonthExpense = await prisma.expense.aggregate({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
        userId: user.id,
      },
      _sum: {
        amount: true,
      },
    });

    let topExpensesForCurrentMonth = await prisma.expense.findMany({
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
        },
        userId: user.id,
      },
      orderBy: {
        amount: 'desc',
      },
      take: 5,
    });

    currentMonthExpense = currentMonthExpense._sum.amount || 0;
    topExpensesForCurrentMonth = topExpensesForCurrentMonth.map((expense) => ({
      name: expense.name,
      amount: expense.amount,
    }));

    return res.status(200).json({ currentMonthExpense, topExpensesForCurrentMonth });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

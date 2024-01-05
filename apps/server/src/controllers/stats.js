const prisma = require('../utils/database');

const computeStats = async (req, res) => {
  try {
    const expenses = await prisma.expense.aggregate({
      where: {
        userId: req.user.id,
      },
      _sum: {
        amount: true,
      },
    });

    const incomes = await prisma.income.aggregate({
      where: {
        userId: req.user.id,
      },
      _sum: {
        amount: true,
      },
    });

    let categories = await prisma.category.findMany({
      where: {
        userId: req.user.id,
      },
    });

    for (let i = 0; i < categories.length; i++) {
      const categoryExpenses = await prisma.expense.aggregate({
        where: {
          categoryId: categories[i].id,
        },
        _sum: {
          amount: true,
        },
        _count: true,
      });

      categories[i] = {
        name: categories[i]?.name,
        total: categoryExpenses._sum.amount || 0,
        count: categoryExpenses._count,
      };
    }

    let paymentOptions = await prisma.paymentOption.findMany({
      where: {
        userId: req.user.id,
      },
    });

    for (let i = 0; i < paymentOptions.length; i++) {
      const paymentOptionExpenses = await prisma.expense.aggregate({
        where: {
          paymentOptionId: paymentOptions[i].id,
        },
        _sum: {
          amount: true,
        },
        _count: true,
      });

      paymentOptions[i] = {
        name: paymentOptions[i]?.name,
        total: paymentOptionExpenses._sum.amount || 0,
        count: paymentOptionExpenses._count,
      };
    }

    return res.status(200).json({
      message: 'Stats fetched successfully',
      stats: {
        expenses: {
          ...expenses,
          total: expenses._sum.amount,
        },
        incomes: {
          ...expenses,
          total: incomes._sum.amount,
        },
        categories,
        paymentOptions,
        balance: incomes._sum.amount - expenses._sum.amount,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  computeStats,
};

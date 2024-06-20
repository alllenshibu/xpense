import prisma from '../utils/database.js';

import { DEFAULT_CATEGORY, DEFAULT_PAYMENT_OPTION } from '../constants.js';

export const addExpense = async (req, res) => {
  try {
    const { user } = req;

    const { name, amount, date, categoryId, paymentOptionId } = req.body;

    if (!name || !amount || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let category;
    if (categoryId) {
      category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId: user.id,
        },
      });

      if (!category) {
        return res.status(400).json({ error: 'Category not found' });
      }
    } else {
      category = await prisma.category.findFirst({
        where: {
          name: DEFAULT_CATEGORY,
          userId: user.id,
        },
      });
    }

    let paymentOption;
    if (paymentOptionId) {
      paymentOption = await prisma.paymentOption.findFirst({
        where: {
          id: paymentOptionId,
          userId: user.id,
        },
      });

      if (!paymentOption) {
        return res.status(400).json({ error: 'Payment Option not found' });
      }
    } else {
      paymentOption = await prisma.paymentOption.findFirst({
        where: {
          name: DEFAULT_PAYMENT_OPTION,
          userId: user.id,
        },
      });
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
        date,
        categoryId: category.id,
        paymentOptionId: paymentOption.id,
        userId: user.id,
      },
    });

    if (!expense) {
      return res.status(500).json({ error: 'Failed to create expense' });
    }

    return res.status(200).json({ expense });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { user } = req;

    const expenses = await prisma.expense.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({ expenses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getExpenseById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const expense = await prisma.expense.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        category: true,
        paymentOption: true,
      },
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    return res.status(200).json({ expense });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

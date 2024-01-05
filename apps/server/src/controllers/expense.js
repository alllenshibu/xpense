const prisma = require('../utils/database');

const addNewExpense = async (req, res) => {
  try {
    const { name, amount, category, paymentOption } = req.body;

    if (!name || !amount || !category || !paymentOption) {
      return res.status(400).json({
        message: 'Name, amount, category and paymentOption are required',
      });
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: category,
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const paymentOptionExists = await prisma.paymentOption.findUnique({
      where: {
        id: paymentOption,
      },
    });

    if (!paymentOptionExists) {
      return res.status(404).json({
        message: 'Payment Option not found',
      });
    }

    const newExpense = await prisma.expense.create({
      data: {
        name,
        amount: parseFloat(amount),
        category: {
          connect: {
            id: category,
          },
        },
        paymentOption: {
          connect: {
            id: paymentOption,
          },
        },
        createdAt: new Date(),
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Expense added successfully',
      expense: newExpense,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        category: true,
        paymentOption: true,
      },
    });

    return res.status(200).json({
      message: 'Expenses fetched successfully',
      expenses,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        paymentOption: true,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    return res.status(200).json({
      message: 'Expense fetched successfully',
      expense,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, category, paymentOption } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    if (!name || !amount || !category || !paymentOption) {
      return res.status(400).json({
        message: 'Name, amount, category and paymentOption are required',
      });
    }

    const categoryExists = await prisma.category.findUnique({
      where: {
        id: category,
      },
    });

    if (!categoryExists) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    const paymentOptionExists = await prisma.paymentOption.findUnique({
      where: {
        id: paymentOption,
      },
    });

    if (!paymentOptionExists) {
      return res.status(404).json({
        message: 'Payment Option not found',
      });
    }

    const expense = await prisma.expense.update({
      where: {
        id,
      },
      data: {
        name,
        amount: parseFloat(amount),
        category: {
          connect: {
            id: category,
          },
        },
        paymentOption: {
          connect: {
            id: paymentOption,
          },
        },
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      message: 'Expense updated successfully',
      expense,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    await prisma.expense.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Expense deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  addNewExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};

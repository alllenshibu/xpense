const prisma = require('../utils/database');

const addNewIncome = async (req, res) => {
  try {
    const { name, amount } = req.body;

    if (!name || !amount) {
      return res.status(400).json({
        message: 'Name and amount are required',
      });
    }

    const newIncome = await prisma.income.create({
      data: {
        name,
        amount: parseFloat(amount),
        createdAt: new Date(),
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Income added successfully',
      income: newIncome,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getAllIncomes = async (req, res) => {
  try {
    const incomes = await prisma.income.findMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.status(200).json({
      message: 'Incomes fetched successfully',
      incomes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const income = await prisma.income.findUnique({
      where: {
        id,
      },
    });

    if (!income) {
      return res.status(404).json({
        message: 'Income not found',
      });
    }

    return res.status(200).json({
      message: 'Income fetched successfully',
      income,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    if (!name || !amount) {
      return res.status(400).json({
        message: 'Name and amount are required',
      });
    }

    const income = await prisma.income.update({
      where: {
        id,
      },
      data: {
        name,
        amount: parseFloat(amount),
      },
    });

    return res.status(200).json({
      message: 'Income updated successfully',
      income,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const income = await prisma.income.findUnique({
      where: {
        id,
      },
    });

    if (!income) {
      return res.status(404).json({
        message: 'Income not found',
      });
    }

    await prisma.income.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Income deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  addNewIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
};

const prisma = require('../utils/database');

const addNewPaymentOption = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const existingPaymentOption = await prisma.paymentOption.findFirst({
      where: {
        name,
        userId: req.user.id,
      },
    });

    if (existingPaymentOption) {
      return res.status(400).json({
        message: 'Payment option already exists',
      });
    }

    const newPaymentOption = await prisma.paymentOption.create({
      data: {
        name,
        createdAt: new Date(),
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: 'Payment option added successfully',
      paymentOption: newPaymentOption,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getAllPaymentOptions = async (req, res) => {
  try {
    let paymentOptions = await prisma.paymentOption.findMany({
      where: {
        userId: req.user.id,
      },
    });

    for (let i = 0; i < paymentOptions.length; i++) {
      const totalAmount = await prisma.expense.aggregate({
        where: {
          paymentOptionId: paymentOptions[i].id,
        },
        _sum: {
          amount: true,
        },
      });
      paymentOptions[i] = {
        ...paymentOptions[i],
        total: totalAmount._sum.amount || 0,
      };
    }

    return res.status(200).json({
      message: 'Payment options fetched successfully',
      paymentOptions,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getPaymentOptionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const paymentOption = await prisma.paymentOption.findUnique({
      where: {
        id,
      },
    });

    if (!paymentOption) {
      return res.status(404).json({
        message: 'Payment option not found',
      });
    }

    return res.status(200).json({
      message: 'Payment option fetched successfully',
      paymentOption,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

const updatePaymentOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const existingPaymentOption = await prisma.paymentOption.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });

    if (existingPaymentOption && existingPaymentOption?.id !== id) {
      return res.status(400).json({
        message: 'Payment option already exists',
      });
    }

    const paymentOption = await prisma.paymentOption.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({
      message: 'Payment option updated successfully',
      paymentOption,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deletePaymentOption = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const paymentOption = await prisma.paymentOption.findUnique({
      where: {
        id,
      },
    });

    if (!paymentOption) {
      return res.status(404).json({
        message: 'Payment option not found',
      });
    }

    await prisma.paymentOption.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Payment option deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  addNewPaymentOption,
  getAllPaymentOptions,
  getPaymentOptionById,
  updatePaymentOption,
  deletePaymentOption,
};

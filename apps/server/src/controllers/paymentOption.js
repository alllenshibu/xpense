import prisma from '../utils/database.js';

export const addPaymentOption = async (req, res) => {
  try {
    const { user } = req;

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const paymentOptionExists = await prisma.paymentOption.findFirst({
      where: {
        name,
        userId: user.id,
      },
    });

    if (paymentOptionExists) {
      return res.status(400).json({ error: 'Payment option already exists' });
    }

    const paymentOption = await prisma.paymentOption.create({
      data: {
        name,
        userId: user.id,
      },
    });

    if (!paymentOption) {
      return res.status(500).json({ error: 'Failed to add payment option' });
    }

    return res.status(200).json({ paymentOption });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPaymentOptions = async (req, res) => {
  try {
    const { user } = req;

    let paymentOptions = await prisma.paymentOption.findMany({
      where: {
        userId: user.id,
      },
      include: {
        expenses: true,
      },
    });

    paymentOptions = paymentOptions.map((paymentOption) => {
      const total = paymentOption.expenses.reduce((acc, expense) => acc + expense.amount, 0);
      return {
        ...paymentOption,
        total,
      };
    });

    return res.status(200).json({ paymentOptions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPaymentOptionById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const paymentOption = await prisma.paymentOption.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        expenses: true,
      },
    });

    if (!paymentOption) {
      return res.status(404).json({ error: 'Payment option not found' });
    }

    return res.status(200).json({ paymentOption });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

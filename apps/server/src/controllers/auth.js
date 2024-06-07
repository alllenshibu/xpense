import prisma from '../utils/database.js';

import { DEFAULT_CATEGORY, DEFAULT_PAYMENT_OPTION } from '../constants.js';

const createDefaults = async ({ tx, userId }) => {
  const defaultPaymentOption = await tx.paymentOption.create({
    data: {
      name: DEFAULT_PAYMENT_OPTION,
      userId,
    },
  });

  if (!defaultPaymentOption) {
    throw new Error('Failed to create default payment option');
  }

  const defaultCategory = await tx.category.create({
    data: {
      name: DEFAULT_CATEGORY,
      userId,
    },
  });

  if (!defaultCategory) {
    throw new Error('Failed to create default category');
  }

  return { defaultPaymentOption, defaultCategory };
};

export const signupController = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          password,
          firstName,
          lastName,
        },
      });

      if (!newUser) {
        return res.status(500).json({ error: 'Failed to create user' });
      }

      const { defaultCategory, defaultPaymentOption } = await createDefaults({
        tx,
        userId: newUser.id,
      });

      if (!defaultCategory || !defaultPaymentOption) {
        return res.status(500).json({ error: 'Failed to create defaults' });
      }

      return res.status(200).json({ user: newUser });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ token: user.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

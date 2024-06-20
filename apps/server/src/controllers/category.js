import prisma from '../utils/database.js';

export const addCategory = async (req, res) => {
  try {
    const { user } = req;

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await prisma.category.findFirst({
      where: {
        name,
        userId: user.id,
      },
    });

    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId: user.id,
      },
    });

    if (!category) {
      return res.status(500).json({ error: 'Failed to create category' });
    }

    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { user } = req;

    let categories = await prisma.category.findMany({
      where: {
        userId: user.id,
      },
      include: {
        expenses: true,
      },
    });

    categories = categories.map((category) => {
      const total = category.expenses.reduce((acc, expense) => acc + expense.amount, 0);
      return {
        ...category,
        total,
      };
    });

    return res.status(200).json({ categories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    let category = await prisma.category.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        expenses: true,
      },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    return res.status(200).json({ category });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

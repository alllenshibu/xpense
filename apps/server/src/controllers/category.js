const prisma = require('../utils/database');

const addNewCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const existingCategory = await prisma.category.findFirst({
      where: {
        name,
        userId: req.user.id,
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: 'Category already exists',
      });
    }

    const newCategory = await prisma.category.create({
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
      message: 'Category added successfully',
      category: newCategory,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    let categories = await prisma.category.findMany({
      where: {
        userId: req.user.id,
      },
    });

    for (let i = 0; i < categories.length; i++) {
      const totalAmount = await prisma.expense.aggregate({
        where: {
          categoryId: categories[i].id,
        },
        _sum: {
          amount: true,
        },
      });
      categories[i] = {
        ...categories[i],
        total: totalAmount._sum.amount || 0,
      };
    }

    return res.status(200).json({
      message: 'Categories fetched successfully',
      categories,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      message: 'Category fetched successfully',
      category,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

const updateCategory = async (req, res) => {
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

    const existingCategory = await prisma.category.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });

    if (existingCategory && existingCategory?.id !== id) {
      return res.status(400).json({
        message: 'Category already exists',
      });
    }

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: 'Category not found',
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Category deleted successfully',
    });
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

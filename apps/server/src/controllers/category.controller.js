const {
  getAllCategoriesService,
  getCategoryByIdService,
  addNewCategoryService,
  editCategoryService,
  deleteCategoryService,
  getSumCategoriesService,
} = require('../services/category.service');
const { CategoryNotFoundError } = require('../utils/errors');

const getAllCategoriesController = async (req, res) => {
  const user = req?.user;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  try {
    const categories = await getAllCategoriesService({ user });

    if (!categories) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ categories: categories });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getCategoryByIdController = async (req, res) => {
  const user = req?.user;
  const categoryId = req?.params?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !categoryId ||
    categoryId === '' ||
    categoryId === undefined ||
    categoryId === 'undefined' ||
    categoryId === null
  ) {
    return res.status(400).json({ message: 'Category ID is missing' });
  }

  try {
    const category = await getCategoryByIdService({ user, categoryId });

    if (!category) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ category: category });
  } catch (err) {
    if (err instanceof CategoryNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const addNewCategoryController = async (req, res) => {
  const user = req?.user;
  const name = req?.body?.category?.name;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!name || name === '' || name === undefined || name === 'undefined' || name === null) {
    return res.status(400).json({ message: 'Category name is missing' });
  }

  try {
    const category = await addNewCategoryService({ user, name });

    if (!category) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(201).json({ category: category });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const editCategoryController = async (req, res) => {
  const user = req?.user;
  const id = req?.body?.category?.id;
  const name = req?.body?.category?.name;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (!id || id === '' || id === undefined || id === 'undefined' || id === null) {
    return res.status(400).json({ message: 'Category ID is missing' });
  }

  if (!name || name === '' || name === undefined || name === 'undefined' || name === null) {
    return res.status(400).json({ message: 'Category name is missing' });
  }

  try {
    const category = await editCategoryService({ user, id, name });

    if (!category) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ category: category });
  } catch (err) {
    if (err instanceof UserDoesNotExistError) return res.status(401).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const deleteCategoryController = async (req, res) => {
  const user = req?.user;
  const categoryId = req?.body?.category?.id;

  // User is missing due to some error in authentication middleware
  if (!user || user === '' || user === undefined || user === 'undefined' || user === null) {
    return res.status(500).json({ message: 'Something went wrong' });
  }

  if (
    !categoryId ||
    categoryId === '' ||
    categoryId === undefined ||
    categoryId === 'undefined' ||
    categoryId === null
  ) {
    return res.status(400).json({ message: 'Category ID is missing' });
  }

  try {
    const deleted = await deleteCategoryService({ user, categoryId });

    if (!deleted) return res.status(500).json({ message: 'Something went wrong' });

    return res.status(200).json({ message: 'Successfully deleted category' });
  } catch (err) {
    if (err instanceof CategoryNotFoundError) return res.status(404).json({ message: err.message });
    return res.status(500).send({ message: 'Something went wrong' });
  }
};

const getbyCategory = async (req, res) => {
  try {
    const user = req?.user;
    const result=await getSumCategoriesService({ user });
    if (result) {
      return res.status(200).json(result);
    }
  
    
  } catch (error) {
    return res.status(401).send(error.message);
    
  }
};
module.exports = {
  getAllCategoriesController,
  getCategoryByIdController,
  addNewCategoryController,
  editCategoryController,
  deleteCategoryController,
  getbyCategory
};

import axiosInstance from '@/lib/axiosInstance';

const fetchAllCategories = async () => {
  try {
    const r = await axiosInstance.get('/category');
    if (r.status === 200) {
      return r.data.categories;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchCategoryById = async (categoryId, getExpenses = false) => {
  try {
    const r = await axiosInstance.get('/category/' + categoryId, {
      params: {
        getExpenses: getExpenses,
      },
    });
    if (r?.status === 200) {
      return r?.data?.category;
    }
  } catch (e) {
    console.log(e);
  }
};

const editCategory = async (categoryId, category) => {
  try {
    const r = await axiosInstance.put('/category/' + categoryId, {
      category: category,
    });

    if (r.status === 200) {
      return r.data.category;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchCategorysum = async () => {
  return await axiosInstance.get('/categorysum');
};

const addNewCategory = async (category) => {
  return await axiosInstance.post('/category', {
    category: category,
  });
};

const deleteCategory = async (categoryId) => {
  return await axiosInstance.delete('/category/', {
    category: {
      id: categoryId,
    },
  });
};

export {
  fetchAllCategories,
  fetchCategoryById,
  addNewCategory,
  editCategory,
  deleteCategory,
  fetchCategorysum,
};

import axiosInstance from '@/lib/axiosInstance';

const fetchAllExpenses = async (limit = 20) => {
  try {
    const r = await axiosInstance.get('/expense', {
      params: {
        limit: limit,
      },
    });
    if (r.status === 200) {
      return r.data.expenses;
    }
  } catch (e) {
    console.error(e);
  }
};

const fetchExpenseById = async (expenseId) => {
  try {
    const r = await axiosInstance.get('/expense/' + expenseId);
    if (r.status === 200) {
      return r.data.expense;
    }
  } catch (e) {
    console.error(e);
  }
};

const addNewExpense = async (expense) => {
  try {
    const r = await axiosInstance.post('/expense', {
      expense: expense,
    });
    if (r.status === 200) {
      return r.data.expense;
    }
  } catch (e) {
    console.error(e);
  }
};

const editExpense = async (expenseId, expense) => {
  try {
    const r = await axiosInstance.put('/expense/' + expenseId, {
      expense: expense,
    });
    if (r.status === 200) {
      return r.data.expense;
    }
  } catch (e) {
    console.error(e);
  }
};
const addNewIncome = async (income) => {
  return await axiosInstance.post('/income', {
    income: income,
  });
};
const deleteExpense = async (expenseId) => {
  return await axiosInstance.delete('/expense/' + expenseId);
};

export {
  fetchAllExpenses,
  fetchExpenseById,
  addNewExpense,
  editExpense,
  deleteExpense,
  addNewIncome,
};

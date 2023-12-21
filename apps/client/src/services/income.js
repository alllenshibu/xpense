import axiosInstance from '@/lib/axiosInstance';

const fetchAllIncomes = async (limit = 20) => {
  try {
    const r = await axiosInstance.get('/income', {
      params: {
        limit: limit,
      },
    });
    if (r.status === 200) {
      return r.data.incomes;
    }
  } catch (e) {
    console.error(e);
  }
};

const fetchIncomeById = async (incomeId) => {
  try {
    const r = await axiosInstance.get('/income/' + incomeId);
    if (r.status === 200) {
      return r.data.income;
    }
  } catch (e) {
    console.error(e);
  }
};

const addNewIncome = async (income) => {
  try {
    const r = await axiosInstance.post('/income', {
      income: income,
    });
    if (r.status === 200) {
      return r.data.income;
    }
  } catch (e) {
    console.error(e);
  }
};

const editIncome = async (incomeId, income) => {
  try {
    const r = await axiosInstance.put('/income/' + incomeId, {
      income: income,
    });
    if (r.status === 200) {
      return r.data.income;
    }
  } catch (e) {
    console.error(e);
  }
};

const deleteIncome = async (incomeId) => {
  return await axiosInstance.delete('/income/' + incomeId);
};

export { fetchAllIncomes, fetchIncomeById, addNewIncome, editIncome, deleteIncome };

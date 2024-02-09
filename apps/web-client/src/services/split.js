import axiosInstance from '@/lib/axiosInstance';

const fetchAllSplits = async () => {
  try {
    const r = await axiosInstance.get('/split');
    if (r.status === 200) {
      return r.data.splits;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchSplitByExpenseId = async (splitId) => {
  try {
    const r = await axiosInstance.get('/category/' + categoryId, {
      params: {
        getExpenses: getExpenses,
      },
    });
    if (r?.status === 200) {
      return r?.data?.split;
    }
  } catch (e) {
    console.log(e);
  }
};

export { fetchAllSplits, fetchSplitByExpenseId };

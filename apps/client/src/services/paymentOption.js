import axiosInstance from '@/lib/axiosInstance';

const fetchAllPaymentOptions = async () => {
  try {
    const r = await axiosInstance.get('/paymentoption');
    if (r.status === 200) {
      return r.data.paymentOptions;
    }
  } catch (e) {
    console.log(e);
  }
};

const fetchPaymentOptionById = async (paymentOptionId, getExpenses = false) => {
  try {
    const r = await axiosInstance.get('/paymentoption/' + paymentOptionId, {
      params: {
        getExpenses: getExpenses,
      },
    });
    if (r?.status === 200) {
      return r?.data?.paymentOption;
    }
  } catch (e) {
    console.log(e);
  }
};

const addNewPaymentOption = async (paymentOption) => {
  return await axiosInstance.post('/paymentoption', {
    paymentOption: paymentOption,
  });
};

const editPaymentOptionById = async (paymentOptionId, paymentOption) => {
  return await axiosInstance.put('/paymentoption/', {
    paymentOption: paymentOption,
  });
};

const deletePaymentOption = async (paymentOptionId) => {
  return await axiosInstance.delete('/paymentoption/', {
    paymentOption: {
      id: paymentOptionId,
    },
  });
};

export {
  fetchAllPaymentOptions,
  fetchPaymentOptionById,
  addNewPaymentOption,
  editPaymentOptionById,
  deletePaymentOption,
};

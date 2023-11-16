import axiosInstance from '@/lib/axiosInstance';

const fetchAllPaymentOptions = async () => {
  return await axiosInstance.get('/paymentoption');
};

const fetchPaymentOptionById = async (paymentOptionId) => {
  return await axiosInstance.get('/paymentoption/' + paymentOptionId);
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

export { fetchAllPaymentOptions, fetchPaymentOptionById, addNewPaymentOption, editPaymentOptionById, deletePaymentOption };

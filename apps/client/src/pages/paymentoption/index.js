import React, { useEffect, useState } from 'react';

import { fetchAllPaymentOptions } from '@/services/paymentOption';

import DashboardLayout from '@/layouts/DashboardLayout';
import PaymentOption from '@/components/PaymentOption';

export default function AddNewExpense() {
  const [PaymentOptions, setPaymentOptions] = useState([]);

  const fetchPaymentOptions = async () => {
    const res = await fetchAllPaymentOptions();
    if (res.status === 200) {
      setPaymentOptions(res?.data?.paymentOptions);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  return (
    <DashboardLayout>
      <h2 className='text-4xl font-bold'>Payment Options</h2>
      <div className="h-full w-full flex items-center justify-center">
        {PaymentOptions.map((paymentOption) => (
          <PaymentOption key={paymentOption.id} paymentOption={paymentOption} />
        ))}
      </div>
    </DashboardLayout>
  );
}

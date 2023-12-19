import React, { useEffect, useState } from 'react';

import DashboardLayout from '@/layouts/DashboardLayout';
import Category from '@/components/Category';
import { fetchAllPaymentOptions } from '@/services/paymentOption';
import PaymentOption from '@/components/PaymentOption';

export default function AddNewExpense() {
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchPaymentOptions = async () => {
    let r = await fetchAllPaymentOptions();
    setPaymentOptions(r || []);
  };

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Payment Options</h2>
      <div className="h-full w-full flex items-center justify-center">
        {paymentOptions.map((paymentOption) => (
          <PaymentOption key={paymentOption.id} paymentOption={paymentOption} />
        ))}
      </div>
    </DashboardLayout>
  );
}

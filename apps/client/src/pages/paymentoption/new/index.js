import React, { useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';
import { addNewPaymentOption } from '@/services/paymentOption';
import PaymentOptionEditor from '@/components/PaymentOptionEditor';

export default function AddNewExpense() {
  const router = useRouter();

  const [paymentOption, setPaymentOption] = useState({
    name: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await addNewPaymentOption(paymentOption);
      if (res.status === 201) {
        router.push('/paymentoption');
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">New Payment Option</h2>
      <div className="h-full w-full flex items-center justify-center">
        <PaymentOptionEditor paymentOption={paymentOption} setPaymentOption={setPaymentOption} handleSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
}

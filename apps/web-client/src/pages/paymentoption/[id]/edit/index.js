import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { editPaymentOptionById, fetchPaymentOptionById } from '@/services/paymentOption';

import DashboardLayout from '@/layouts/DashboardLayout';
import PaymentOptionEditor from '@/components/PaymentOptionEditor';

export default function AddNewExpense() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [paymentOption, setPaymentOption] = useState({});

  const fetchPaymentOption = async () => {
    const paymentOptionId = router.query.id;
    if(!paymentOptionId) return;
    
    const res = await fetchPaymentOptionById(paymentOptionId);
    if (res.status === 200) {
      setPaymentOption(res?.data?.paymentOption);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentOptionId = router.query.id;
      const res = await editPaymentOptionById(paymentOptionId, paymentOption);
      if (res.status === 200) {
        router.push('/paymentoption/' + router.query.id);
      } else if (res.status === 500) {
        alert('Something went wrong with the server');
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    fetchPaymentOption();
    setIsLoading(false);
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Edit Payment Option</h2>
      <div className="h-full w-full flex items-center justify-center">
        <PaymentOptionEditor paymentOption={paymentOption} setPaymentOption={setPaymentOption} handleSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
}

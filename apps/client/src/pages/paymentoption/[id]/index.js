import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchPaymentOptionById } from '@/services/paymentOption';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [paymentOption, setPaymentOption] = useState({});

  const fetchPaymentOption = async () => {
    const paymentOptionId = router.query.id;
    if (!paymentOptionId) return;


    const res = await fetchPaymentOptionById(paymentOptionId);
    if (res.status === 200) {
      setPaymentOption(res?.data?.paymentOption);
    } else if (res.status === 404) {
      alert('Payment option not found');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchPaymentOption();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(paymentOption)}
      </div>
    </DashboardLayout>
  );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchPaymentOptionById } from '@/services/paymentOption';

import DashboardLayout from '@/layouts/DashboardLayout';
import Expense from '@/components/Expense';

export default function AddNewExpense() {
  const router = useRouter();

  const [paymentOption, setPaymentOption] = useState({});

  const fetchPaymentOption = async () => {
    const paymentOptionId = router.query.id;
    if (!paymentOptionId) return;

    const r = await fetchPaymentOptionById(paymentOptionId, true);
    setPaymentOption(r || {});
  };

  useEffect(() => {
    fetchPaymentOption();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex flex-col items-start justify-start">
        <div className="h-40 w-full flex flex-row justify-between items-center gap-4">
          <p className="text-3xl font-bold tracking-wide">{paymentOption.name}</p>
          <p className="text-3xl font-bold tracking-wide">₹{paymentOption.total}</p>
        </div>
        <div className="flex flex-row gap-2">
          {paymentOption?.expenses?.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

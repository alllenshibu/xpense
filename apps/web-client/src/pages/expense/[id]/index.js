import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({});

  const fetchExpense = async () => {
    const expenseId = router.query.id;
    const res = await axiosInstance.get('/expense/' + expenseId);
    if (res.status === 200) {
      setExpense(res?.data?.expense);
    } else if (res.statud === 404) {
      alert('Expense not found');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(expense)}
      </div>
    </DashboardLayout>
  );
}

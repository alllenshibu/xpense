import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState({});

  const fetchExpense = async () => {
    const expenseId = router.query.id;
    const res = await axiosInstance.get('/expense/' + expenseId);
    if (res.status === 200) {
      setExpense(res?.data?.expense);
      setExpense(
        { ...expense },
        'timestamp',
        new Date(res?.data?.expense?.timestamp).toISOString().slice(0, 16),
      );
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('/expense/' + router.query.id, {
        expense: expense,
      });
      if (res.status === 200) {
        router.push('/expense/' + router.query.id);
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
    fetchExpense();
    setIsLoading(false);
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {isLoading ? (
          <div className="text-2xl">Loading...</div>
        ) : (
          <ExpenseEditor
            expense={expense}
            setExpense={setExpense}
            submitText={'Edit'}
            handleSubmit={handleSubmit}
          />
        )}
        {JSON.stringify(expense)}
      </div>
    </DashboardLayout>
  );
}

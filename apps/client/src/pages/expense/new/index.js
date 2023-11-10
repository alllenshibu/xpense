import React, { useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axiosInstance.post('/expense', {
        expense: expense,
      });
      if (res.status === 201) {
        router.push('/expense/' + res?.data?.expense?.id);
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
      <div className="h-full w-full flex items-center justify-center">
        <ExpenseEditor
          expense={expense}
          setExpense={setExpense}
          submitText={'Add'}
          handleSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}

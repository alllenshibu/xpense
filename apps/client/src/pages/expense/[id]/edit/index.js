import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllCategories } from '@/services/category';
import { fetchAllPaymentOptions } from '@/services/paymentOption';

export default function AddNewExpense() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState({});
  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchExpense = async () => {
    const expenseId = router.query.id;
    if (expenseId === undefined) return;

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

  const fetchCategories = async () => {
    const res = await fetchAllCategories();
    if (res.status === 200) {
      setCategories(res?.data?.categories);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put('/expense/', {
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
    fetchCategories();
    fetchPaymentOptions();
    setIsLoading(false);
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <ExpenseEditor
          expense={expense}
          setExpense={setExpense}
          categories={categories}
          paymentOptions={paymentOptions}
          submitText={'Edit'}
          handleSubmit={handleSubmit}
        />
        {JSON.stringify(expense)}
      </div>
    </DashboardLayout>
  );
}

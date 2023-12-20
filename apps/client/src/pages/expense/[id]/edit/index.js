import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllCategories } from '@/services/category';
import { fetchAllPaymentOptions } from '@/services/paymentOption';
import { editExpense, fetchExpenseById } from '@/services/expense';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({});
  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const fetchEverything = async () => {
    try {
      let r = await fetchAllCategories();
      setCategories(r || []);
      r = await fetchAllPaymentOptions();
      setPaymentOptions(r || []);
      const expenseId = router.query.id;
      if (!expenseId) return;

      r = await fetchExpenseById(expenseId);
      setExpense(r || {});
      setExpense((prevExpense) => ({
        ...prevExpense,
        timestamp: new Date(r?.timestamp).toISOString().slice(0, 16),
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseId = router?.query?.id;
      const r = await editExpense(expenseId, expense);
      router.push('/');
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    fetchEverything();
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
      </div>
    </DashboardLayout>
  );
}

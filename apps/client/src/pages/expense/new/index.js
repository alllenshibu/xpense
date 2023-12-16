import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllCategories } from '@/services/category';
import { fetchAllPaymentOptions } from '@/services/paymentOption';
import { addNewExpense } from '@/services/expense';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    categoryId: '',
    paymentOptionId: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [categories, setCategories] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ expense });
      const r = await addNewExpense(expense);
      router.push('/');
    } catch (err) {
      alert(err?.message);
    }
  };

  const fetchEverything = async () => {
    try {
      let r = await fetchAllCategories();
      setCategories(r || []);
      r = await fetchAllPaymentOptions();
      setPaymentOptions(r || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg bg-gradient-to-r from-cyan-700 to-cyan-00">
        <div className="h-full w-full flex items-center justify-center">
          <ExpenseEditor
            expense={expense}
            setExpense={setExpense}
            categories={categories}
            paymentOptions={paymentOptions}
            submitText={'Add'}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

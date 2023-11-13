import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import ExpenseEditor from '@/components/ExpenseEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllCategories } from '@/services/category';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    categoryId: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const [categories, setCategories] = useState([]);

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

  const fetchCategories = async () => {
    const res = await fetchAllCategories();
    if (res.status === 200) {
      setCategories(res.data.categories);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <ExpenseEditor
          expense={expense}
          setExpense={setExpense}
          categories={categories}
          submitText={'Add'}
          handleSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}

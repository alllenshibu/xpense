import React, { useEffect, useState } from 'react';

import { fetchAllCategories } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllExpenses } from '@/services/expense';
import Expense from '@/components/Expense';
import { useRouter } from 'next/router';

export default function Expenses() {
  const router = useRouter();

  const [expenses, setExpenses] = useState([]);

  const fetchCategories = async () => {
    let r = await fetchAllExpenses();
    setExpenses(r || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Expenses</h2>
      <div className="h-full w-full flex items-center justify-center">
        {expenses.map((expense) => (
          <Expense
            onClick={(e) => {
              router.push('/expense/' + expense.id);
            }}
            key={expense.id}
            expense={expense}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

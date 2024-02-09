import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchCategoryById } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import Expense from '@/components/Expense';

export default function AddNewExpense() {
  const router = useRouter();

  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    const categoryId = router.query.id;
    if (!categoryId) return;

    let r = await fetchCategoryById(categoryId, true);
    console.log({ r });
    setCategory(r || {});
  };

  useEffect(() => {
    fetchCategory();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex flex-col items-start justify-start">
        <div className="h-40 w-full flex flex-row justify-between items-center gap-4">
          <p className="text-3xl font-bold tracking-wide">{category.name}</p>
          <p className="text-3xl font-bold tracking-wide">₹{category.total}</p>
        </div>
        <div className='flex flex-row gap-2'>
          {category?.expenses?.map((expense) => (
            <Expense key={expense.id} expense={expense} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

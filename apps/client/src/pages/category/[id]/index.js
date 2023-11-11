import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchCategoryById } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    const categoryId = router.query.id;
    const res = await fetchCategoryById(categoryId);
    if (res.status === 200) {
      setCategory(res?.data?.category);
    } else if (res.status === 404) {
      alert('Category not found');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(category)}
        <p>Also show expenses from this category</p>
      </div>
    </DashboardLayout>
  );
}

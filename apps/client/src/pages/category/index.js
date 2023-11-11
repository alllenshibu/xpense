import React, { useEffect, useState } from 'react';

import { fetchAllCategories } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import Category from '@/components/Category';

export default function AddNewExpense() {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <h2 className='text-4xl font-bold'>Categories</h2>
      <div className="h-full w-full flex items-center justify-center">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </DashboardLayout>
  );
}

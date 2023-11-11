import React, { useEffect, useState } from 'react';

import { fetchAllCategories } from '@/lib/category';

import DashboardLayout from '@/layouts/DashboardLayout';

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
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(categories)}
      </div>
    </DashboardLayout>
  );
}

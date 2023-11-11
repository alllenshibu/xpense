import React, { useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';
import { addNewCategory } from '@/services/category';

export default function AddNewExpense() {
  const router = useRouter();

  const [category, setCategory] = useState({
    name: '',
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await addNewCategory(category);
      if (res.status === 201) {
        router.push('/');
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
      <div className="h-full w-full flex items-center justify-center"></div>
    </DashboardLayout>
  );
}

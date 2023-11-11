import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { editCategoryById, fetchCategoryById } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    const categoryId = router.query.id;
    const res = await fetchCategoryById(categoryId);
    if (res.status === 200) {
      setCategory(res?.data?.category);
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryId = router.query.id;
      const res = await editCategoryById(categoryId, category);
      if (res.status === 200) {
        router.push('/category/' + router.query.id);
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
    fetchCategory();
    setIsLoading(false);
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(expense)}
      </div>
    </DashboardLayout>
  );
}

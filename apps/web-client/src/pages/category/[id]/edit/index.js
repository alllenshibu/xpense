import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { editCategory, fetchCategoryById } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import CategoryEditor from '@/components/CategoryEditor';

export default function AddNewExpense() {
  const router = useRouter();

  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    const categoryId = router.query.id;
    if (!categoryId) return;

    let r = await fetchCategoryById(categoryId);
    setCategory(r || {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryId = router.query.id;
      let r = await editCategory(categoryId, category);
      router.push('/category');
    } catch (err) {
      alert(err?.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Edit Category</h2>
      <div className="h-full w-full flex items-center justify-center">
        <CategoryEditor category={category} setCategory={setCategory} handleSubmit={handleSubmit} />
      </div>
    </DashboardLayout>
  );
}

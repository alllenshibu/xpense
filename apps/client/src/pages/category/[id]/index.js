import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { fetchCategoryById } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';

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
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(category)}
      </div>
    </DashboardLayout>
  );
}

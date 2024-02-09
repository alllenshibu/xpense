import React, { useEffect, useState } from 'react';

import { fetchAllCategories } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import Income from '@/components/Income';
import { useRouter } from 'next/router';
import { fetchAllSplits } from '@/services/split';

export default function Expenses() {
  const router = useRouter();

  const [splits, setSplits] = useState([]);

  const fetchCategories = async () => {
    let r = await fetchAllSplits();
    setSplits(r || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Splits</h2>
      <div className="mt-10 w-full flex items-start justify-start flex-wrap gap-4">
        {splits.map((split) => JSON.stringify(split))}
      </div>
    </DashboardLayout>
  );
}

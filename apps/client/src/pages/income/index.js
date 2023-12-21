import React, { useEffect, useState } from 'react';

import { fetchAllCategories } from '@/services/category';

import DashboardLayout from '@/layouts/DashboardLayout';
import { fetchAllIncomes } from '@/services/income';
import Income from '@/components/Income';
import { useRouter } from 'next/router';

export default function Expenses() {
  const router = useRouter();

  const [incomes, setIncomes] = useState([]);

  const fetchCategories = async () => {
    let r = await fetchAllIncomes(100);
    setIncomes(r || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold">Incomes</h2>
      <div className="mt-10 w-full flex items-start justify-start flex-wrap gap-4">
        {incomes.map((income) => (
          <Income
            onClick={(e) => {
              router.push('/income/' + income.id);
            }}
            key={income.id}
            income={income}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

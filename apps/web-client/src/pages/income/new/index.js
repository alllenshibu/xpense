import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import IncomeEditor from '@/components/IncomeEditor';
import DashboardLayout from '@/layouts/DashboardLayout';
import { addNewIncome } from '@/services/income';

export default function AddNewExpense() {
  const router = useRouter();

  const [income, setIncome] = useState({
    title: '',
    amount: '',
    timestamp: new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ income });
      const r = await addNewIncome(income);
      router.push('/');
    } catch (err) {
      alert(err?.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="h-full md:w-2/5 mx-auto flex items-center justify-center">
        <IncomeEditor
          income={income}
          setIncome={setIncome}
          submitText={'Add'}
          handleSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  );
}

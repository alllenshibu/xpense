import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import axiosInstance from '@/lib/axiosInstance';

import DashboardLayout from '@/layouts/DashboardLayout';

export default function AddNewExpense() {
  const router = useRouter();

  const [income, setIncome] = useState({});

  const fetchExpense = async () => {
    const incomeId = router.query.id;
    const res = await axiosInstance.get('/income/' + incomeId);
    if (res.status === 200) {
      setIncome(res?.data?.income);
    } else if (res.status === 404) {
      alert('Income not found');
    } else if (res.status === 500) {
      alert('Something went wrong with the server');
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [router.query.id]);

  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        {JSON.stringify(income)}
      </div>
    </DashboardLayout>
  );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '@/layouts/DashboardLayout';

import MainCard from '@/components/ui/maincard';
import Catcards from '@/components/ui/cat_cards';

export default function AddNewExpense() {
  const router = useRouter();

  const [expense, setExpense] = useState({});

  const fetchExpense = async () => {
    const expenseId = router.query.id;
    const res = await axiosInstance.get('/expense/' + expenseId);
    if (res.status === 200) {
      setExpense(res?.data?.expense);
    } else if (res.statud === 404) {
      alert('Expense not found');
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
      <div className="h-full w-full flex md:grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <MainCard />

          <div className="flex flex-row justify-between gap-4">
            <Catcards />
            <Catcards />
            <Catcards />
          </div>
        </div>
        <div className="bg-[#D9D9D954] h-full rounded-xl "></div>
      </div>
    </DashboardLayout>
  );
}
